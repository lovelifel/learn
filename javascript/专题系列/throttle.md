---
title: 节流
---

# 前言

在前端开发中会遇到一些频繁的事件触发，比如：

- window 的 resize、scroll
- mousedown、mousemove
- keyup、keydown
- ……

一个事件会触发多次，但这并不是我们实际开发想要的，例如当鼠标移动，从屏幕左边滑动到屏幕右侧过程，事件回调可能触发了上百次，想要优化这个回调次数，那么防抖的作用就体现出来了。

## 节流

节流的原理很简单：

如果你持续触发事件，每隔一段时间，只执行一次事件。

根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。

关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

适用建议：

- 需要“先响一次”的场景用时间戳版；
- 需要“窗口末尾补一次”的场景用定时器版。

### 场景

避免在模板中每次事件触发都创建新的函数实例，应该先生成一个可复用的节流函数。

<div
  @mousemove="throttledIncrement"
  style="padding: 20px; border: 1px solid #ccc; margin: 20px 0"
>
  <div>
    鼠标移动计数:
    <p style="color: red">{{ count }}</p>
  </div>
  <p>在这个区域移动鼠标，计数会增加</p>
</div>

<script setup>
import { ref, onBeforeUnmount } from "vue";

const count = ref(0);
const throttledIncrement = throttleTimestamp(increment, 5000)

function increment() {
  count.value++;
}

function throttleTimestamp(func, wait) {
  let previous = 0;
  return function (...args) {
    const now = Date.now();
    if (now - previous >= wait) {
      previous = now;
      func.apply(this, args);
    }
  };
}
</script>

```js
// 简单：时间戳版（立即执行，忽略窗口内多余调用）
function throttleTimestamp(func, wait) {
  let previous = 0;
  return function (...args) {
    const now = Date.now();
    if (now - previous >= wait) {
      previous = now;
      func.apply(this, args);
    }
  };
}

// 简单：定时器版（窗口结束再执行一次，首次不会立刻执行）
function throttleTimer(func, wait) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      func.apply(this, args);
    }, wait);
  };
}
```
