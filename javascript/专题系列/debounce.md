---
title: 防抖
---

# 前言

在前端开发中会遇到一些频繁的事件触发，比如：

- window 的 resize、scroll
- mousedown、mousemove
- keyup、keydown
- ……

一个事件会触发多次，但这并不是我们实际开发想要的，例如当鼠标移动，从屏幕左边滑动到屏幕右侧过程，事件回调可能触发了上百次，想要优化这个回调次数，那么防抖的作用就体现出来了。

## 防抖

防抖的原理是，事件触发后的 n 秒，才去执行我们想要执行的函数，当 n 秒内，再次触发，那么就会重新计算 n 秒后在执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!

### 场景

<div
    @mousemove="debounce(increment, 1000)()"
    style="padding: 20px; border: 1px solid #ccc; margin: 20px 0"
  >
    <div>
      鼠标移动计数:
      <p style="color: red">{{ count }}</p>
    </div>
    <p>在这个区域移动鼠标，计数会增加</p>
</div>

<script setup>
import { ref } from "vue";

const count = ref(0);
let timeout;
function debounce(func, wait) {
  let content = this; // 绑定正确this指向
  let args = arguments; // 传递参数
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(content, args);
    }, wait);
  };
}
function increment() {
    count.value++;
}
</script>

```JS
let timeout;
function debounce(func, wait) {
  let content = this;
  let args = arguments;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(content, args);
    }, wait);
  };
}
```
