---
title: flex 布局
---

# 前言

布局是网页的基础，常规布局，，依赖 display 属性 + position 属性 + float 属性。它对于那些特殊布局非常不方便,比如垂直布局。
W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。

## Flex 布局是什么？

Flex 是 Flexible Box 的缩写，简单来说是一种布局，意为弹性布局

任何一个容器都可以成为 Flex 布局

```CSS
.box{
  display: flex;
}
```

## 基础概念

采用 flex 布局的元素，称为容器(flex container) , 子元素自动成为容器成员，称为 flex 项目。

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png" alt="" title="">

容器默认有两根轴，水平叫做主轴(main axis) ，垂直的交叉轴(cross axis),主轴的起点为 main start、终点为 main end, 交叉轴起点为 cross start、终点为 cross end,项目占据主轴的大小叫做, main size,占据交叉轴，cross size。

## 容器的属性

以下 6 个属性设置在容器上

```CSS
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
```

## flex-direction

<div class="i">flex-direction</div>决定了主轴的排列方式，也就是项目的排列方式。

```CSS
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png" alt="" title="">

- row : 主轴为水平方向，起点为左端
- row-reverse : 主轴为水平方向，起点在右端
- column : 主轴为垂直方向, 起点在上沿。
- column-reverse : 主轴为垂直方向, 起点在下沿

## flex-wrap
默认情况下，项目都是排在一条线(轴线),<span class="i">flex-wrap</span>属性定义，如果一条轴线排不下，如何换行。

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071006.png" alt="" title="">

```CSS
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
- nowrap : 不换行(默认)
<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png" alt="" title="">
- wrap : 换行，第一行在上方
<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg" alt="" title="">
- wrap-reverse : 换行，第一行正在下方
<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg" alt="" title="">


## flex-flow
<span class="i">flex-flow</span>属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
```CSS
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

## justify-content
<span class="i">justify-content</span>属性定义了项目在主轴上的对齐方式。






<style scoped>
.i{
    display: inline;
    padding:5px;
    background-color: pink;
    border-radius: 5px;
    margin:auto 5px
}

img{
    border: 5px solid #e0dfcc;
    border-radius:5px;
}
</style>
