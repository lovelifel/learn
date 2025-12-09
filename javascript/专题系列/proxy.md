# Proxy 与 响应式监测

在前端开发中，我们经常需要监听数据的变化来触发某些操作（如视图更新、自动保存等）。ES6 引入的 `Proxy` 对象为我们提供了强大的拦截能力。本文将通过一个渐进式的案例，探讨如何利用 `Proxy` 实现对象的深度监听。

## 1. 基础需求：自动保存

假设我们有一个需求：监听一个 `formData` 对象，每当这个对象的任意属性发生变化时，自动触发一个 `save()` 函数。

### 最初的实现

```javascript
const formData = { name: "User", age: 18 };
const save = () => console.log("正在保存数据...");

const formDataProxy = new Proxy(formData, {
  set(target, key, value, receiver) {
    save();
    return Reflect.set(...arguments);
  },
});

formDataProxy.age = 19; 
// 输出: "正在保存数据..."
console.log(formData); 
// 输出: { name: 'User', age: 19 }
```

这种基础写法对于浅层属性是有效的，但如果 `formData` 包含嵌套对象，直接修改嵌套属性可能无法被拦截。

## 2. 进阶需求：深度监听

如果数据结构变得复杂，包含嵌套对象：

```javascript
const formData = {
  user: {
    info: { age: 18 },
  },
};
```

直接使用上面的 `set` 拦截器无法监听到 `proxy.user.info.age = 20` 这样的深度修改，因为 `set` 只拦截当前对象的属性赋值。为了解决这个问题，我们需要在 `get` 拦截器中对访问到的对象属性也创建 Proxy（递归代理）。

### 递归代理尝试

```javascript
const handler = {
  get(target, key, receiver) {
    const result = Reflect.get(target, key, receiver);
    // 如果属性值是对象，递归创建 Proxy
    if (typeof result === "object" && result !== null) {
      return new Proxy(result, handler);
    }
    return result;
  },
  set(target, key, value, receiver) {
    // 触发保存或其他副作用
    console.log('数据变化', key, value);
    return Reflect.set(target, key, value, receiver);
  },
};

const proxy = new Proxy(formData, handler);
proxy.user.info.age = 20; 
// 能够监听到深度变化
```

### 存在的问题：对象身份不一致

上面的实现有一个隐患：每次访问嵌套对象时，都会返回一个新的 Proxy 实例。

```javascript
const p1 = proxy.user;
const p2 = proxy.user;
console.log(p1 === p2); // false
```

这会导致严重的性能问题（重复创建 Proxy）以及逻辑错误（例如在组件系统中，对象引用变化可能导致不必要的重渲染）。

## 3. 终极优化：使用 WeakMap 缓存

为了解决对象身份不一致的问题，我们需要缓存已经创建过的 Proxy 实例。`WeakMap` 是最佳选择，因为它的键是弱引用，不会阻碍垃圾回收。

### 完善的 reactive 实现

```javascript
const weakMap = new WeakMap();

function reactive(target) {
  // 如果目标对象已经有对应的 Proxy，直接返回
  if (weakMap.has(target)) {
    return weakMap.get(target);
  }

  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 深度监听：访问时懒代理
      if (typeof result === "object" && result !== null) {
        return reactive(result);
      }
      return result;
    },
    set(target, key, value, receiver) {
      console.log(`设置属性: ${key} = ${value}`);
      const res = Reflect.set(target, key, value, receiver);
      return res;
    },
  });

  // 缓存 Proxy 实例
  weakMap.set(target, proxy);
  return proxy;
}
```

### 验证

现在我们可以验证优化的效果：

```javascript
const formData = reactive({
  user: {
    info: { age: 18 },
  },
});

const p1 = formData.user;
const p2 = formData.user;

console.log(p1 === p2); // true -> 解决了身份一致性问题

formData.user.info.age = 30;
// 输出: 设置属性: age = 30
console.log(formData);
```

## 总结

通过这个案例，我们学习了：
1. **Proxy 的基础用法**：利用 `set` 拦截赋值。
2. **深度监听原理**：在 `get` 中递归返回 Proxy。
3. **性能与一致性优化**：利用 `WeakMap` 缓存 Proxy 实例，确保同一对象始终返回相同的代理，这也是 Vue 3 响应式系统的核心原理之一。
