# JavaScript 原型详解

## 前言

在 JavaScript 的世界中，有一句经典的话："万物皆对象"。这句话揭示了 JavaScript 基于原型的面向对象特性。本篇将深入探讨 JavaScript 的原型机制，帮助大家理解这句名言的真正含义。

## 构造函数创建对象

让我们从一个简单的例子开始：

```js
function Person() {}

var person = new Person();
person.name = "Kevin";
console.log(person.name); // Kevin
console.log(Person.prototype); // 输出原型对象
```

> **说明**：我们声明了一个构造函数 `Person`，通过 `new` 关键字实例化一个对象 `person`。这是 JavaScript 中创建对象的基本方式。

## prototype 属性

每个函数都有一个 `prototype` 属性，这个属性指向一个对象，我们称之为**原型对象**。

![构造函数和实例原型的关系图](https://camo.githubusercontent.com/b19e3eb08a5245c14dfdf6b5ce8121f2925376e2599f37476a7d56c7ce48a9a4/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065312e706e67)

> **关键点**：`prototype` 是函数特有的属性，普通对象没有这个属性。

## `__proto__` 属性

每个对象都有一个 `__proto__` 属性，它指向该对象的原型：

```js
function Person() {}

var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

![实例与实例原型的关系图](https://camo.githubusercontent.com/4487e9c7d28005ae559aa428b430bc5a439bad923638aba4306dea69d30b33ce/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065322e706e67)

> **重要**：`person.__proto__` 指向 `Person.prototype`，这是 JavaScript 原型链的基础。

## constructor 属性

原型对象上有一个 `constructor` 属性，它指向创建该原型的构造函数：

![实例原型与构造函数的关系图](https://camo.githubusercontent.com/3f59a2dc7212f240472eae7736271c1ef9f02525edaf0d7039bd16128d475d5b/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065332e706e67)

> **理解**：`Person.prototype.constructor` 指向 `Person` 构造函数，形成了一个完整的循环引用。

### 总结关系

通过以上分析，我们得出以下重要关系：

```js
function Person() {}

var person = new Person();

// 实例的 __proto__ 指向构造函数的 prototype
console.log(person.__proto__ === Person.prototype); // true

// 原型的 constructor 指向构造函数
console.log(Person.prototype.constructor === Person); // true

// ES5 标准方法获取对象原型
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
```

现在我们了解了构造函数、实例原型和实例之间的关系。接下来探讨**实例和原型**的关系：

## 实例与原型

当读取实例的属性时，JavaScript 会按照以下顺序查找：

1. **实例自身属性** → 2. **原型对象属性** → 3. **原型的原型属性** → ... → **直到顶层**

### 属性查找示例

```js
function Person() {}

// 在原型上添加属性
Person.prototype.name = 'Kevin';

var person = new Person();

// 实例自身属性优先
person.name = 'Daisy';
console.log(person.name); // Daisy

// 删除实例属性后，查找原型
delete person.name;
console.log(person.name); // Kevin
```

**查找过程分析**：
- 第一次输出 `Daisy`：实例自身有 `name` 属性，直接返回
- 第二次输出 `Kevin`：实例自身没有 `name` 属性，从原型 `Person.prototype` 中查找

> **思考**：如果原型中也没有找到该属性，会继续查找原型的原型，那么原型的原型又是什么呢？

## 原型的原型

既然原型也是一个对象，那么它也有自己的原型。让我们用最原始的方式创建对象：

```js
var obj = new Object();
obj.name = 'Kevin';
console.log(obj.name); // Kevin
```

![原型的原型关系图](https://camo.githubusercontent.com/3acceedcacdbab0b4ad2fff77667c971078ceb76a9f673f55eb69534a63e4730/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065342e706e67)

> **关键理解**：`Person.prototype` 也是一个对象，它是由 `Object` 构造函数创建的，所以 `Person.prototype.__proto__` 指向 `Object.prototype`。

## 原型链

### Object.prototype 的原型

`Object.prototype` 的原型是什么呢？

```js
console.log(Object.prototype.__proto__ === null); // true
```

答案是 `null`！这意味着 `Object.prototype` 是原型链的顶端。

### 完整的原型链

![原型链示意图](https://camo.githubusercontent.com/08a50fb0cf1cfdbae849f0827ecc5761899805c2ca7b0232264b622d4f1c04bb/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065352e706e67)

**原型链的完整路径**：
```
person → Person.prototype → Object.prototype → null
```

> **重要**：图中由相互关联的原型组成的链状结构就是**原型链**（蓝色线条）。当查找属性时，会沿着这条链向上查找，直到找到属性或到达 `null`。


## 关于 `__proto__` 的补充说明

::: info 重要提示
`__proto__` 是绝大部分浏览器都支持的非标准方法访问原型。它并不存在于 `Person.prototype` 中，实际上来自于 `Object.prototype`。

与其说是一个属性，不如说是一个 getter/setter。当使用 `obj.__proto__` 时，可以理解成返回了 `Object.getPrototypeOf(obj)`。

**推荐使用**：`Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 是 ES5/ES6 标准方法。
:::

## 总结

JavaScript 的原型机制是一个精妙的设计，它让我们能够：

1. **共享属性和方法**：所有实例可以共享原型上的属性和方法
2. **实现继承**：通过原型链实现类似传统面向对象的继承
3. **节省内存**：避免每个实例都复制相同的方法

### 核心概念回顾

- **`prototype`**：函数特有的属性，指向原型对象
- **`__proto__`**：对象指向其原型的属性
- **`constructor`**：原型指向构造函数的属性
- **原型链**：由 `__proto__` 连接形成的查找链

![JavaScript 原型机制神图](/assets/image/prototype.webp)

> **"万物皆对象"** 的真正含义：在 JavaScript 中，几乎所有东西都是对象，都通过原型链连接，这就是 JavaScript 基于原型的面向对象特性！