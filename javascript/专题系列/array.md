---
title: 数组去重
---

# 前言

数组去重方法老生常谈，既然是常谈，我也来谈谈。

## 双重循环

<script setup>
const a1 = [1, 2, 3, 1, 4, 5];

const unique = (array) => {
  let result = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0,resLen = result.length; j <resLen; j++) {
      if (array[i] === result[j]) {
        break;
      }
    }
    if(j===resLen){
        result.push(array[i])
    }

  }
  return result;
};

const mapMethod=(array)=>{
    return [...new Set(array)]
}

const unique1 = (array) => {
  let result = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    if (result.indexOf(array[i] )=== -1) {
      result.push(array[i]);
    }
  }
  return result;
};

const unique2 = (array) => {
  var res = array.filter((item, index, array) => {
      return array.indexOf(item) === index;
  });

  return res;
};

console.log(unique2(a1))

</script>

```JS
const unique = (array) => {
  let result = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0,resLen = result.length; j <resLen; j++) {
      if (array[i] === result[j]) {
        break;
      }
    }
    if(j===resLen){
        result.push(array[i])
    }
  }
  return result;
};
```

## Set

```JS
const mapMethod=(array)=>{
    return [...new Set(array)]
}
```

## indexOf

```JS
// indexOf 会返回元素第一次出现的索引，找不到就返回 -1。
const unique = (array) => {
  let result = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    if (result.indexOf(array[i] )=== -1) {
      result.push(array[i]);
    }
  }
  return result;
};
```

## filter

```JS
const unique = (array) => {
  var res = array.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
  return res;
};
```
