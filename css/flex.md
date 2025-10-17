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

```CSS
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png" alt="" title="">

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

::: info   适用条件
单行/多行都有效
:::
## align-items
<span class="i">align-items</span>属性定义了项目在交叉轴上的对齐方式。  <span  class="i">单行/多行都有效</span>

```CSS
.box {
  flex-start | flex-end | center | baseline | stretch;
}
```
<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png" alt="" title="">

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

::: danger   文字的基线
通常指的是小写字母"x"的下边缘。
:::
::: info   适用条件
单行/多行都有效
:::

## align-content
<span class="i">align-content</span>属性定义了多根轴线(交叉轴)的对齐方式。如果项目只有一根轴线，该属性不起作用。
```CSS
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png" alt="" title="">

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

::: info   适用条件
多行有效
:::

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
