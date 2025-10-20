---
title: flex 布局
---

# 前言

布局是网页的基础，常规布局依赖 `display` 属性 + `position` 属性 + `float` 属性。它对于那些特殊布局非常不方便，比如垂直布局。

W3C 提出了一种新的方案——**Flex 布局**，可以简便、完整、响应式地实现各种页面布局。

## Flex 布局是什么？

Flex 是 **Flexible Box** 的缩写，简单来说是一种布局，意为**弹性布局**。

任何一个容器都可以成为 Flex 布局：

```css
.box {
  display: flex;
}
```

## 基础概念

采用 flex 布局的元素，称为**容器**（flex container），子元素自动成为容器成员，称为 **flex 项目**。

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png" alt="" title="">

容器默认有两根轴：
- **主轴**（main axis）：水平方向
- **交叉轴**（cross axis）：垂直方向

主轴的起点为 `main start`、终点为 `main end`，交叉轴起点为 `cross start`、终点为 `cross end`。

项目占据主轴的大小叫做 `main size`，占据交叉轴的大小叫做 `cross size`。

## 容器的属性

以下 **6 个属性**设置在容器上：

```css
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
```

## flex-direction

<div class="i">flex-direction</div>决定了主轴的排列方式，也就是项目的排列方式。

```css
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

```css
.box {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- **nowrap**：不换行（默认）
  <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png" alt="" title="">
- **wrap**：换行，第一行在上方
  <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg" alt="" title="">
- **wrap-reverse**：换行，第一行在下方
  <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg" alt="" title="">

## flex-flow

<span class="i">flex-flow</span>属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

## justify-content

<span class="i">justify-content</span>属性定义了项目在主轴上的对齐方式。

```css
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

::: info 适用条件
单行/多行都有效
:::

## align-items

<span class="i">align-items</span>属性定义了项目在交叉轴上的对齐方式。 <span  class="i">单行/多行都有效</span>

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png" alt="" title="">

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。

::: danger 文字的基线
通常指的是小写字母"x"的下边缘。
:::
::: info 适用条件
单行/多行都有效
:::

## align-content

<span class="i">align-content</span>属性定义了多根轴线(交叉轴)的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
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

::: info 适用条件
多行有效
:::

## 项目的属性

```css
order
flex-grow
flex-shrink
flex-basis
flex
align-self
```

## order

<span class="i">order</span>属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

```css
.item {
  order: <integer>;
}
```

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071013.png" alt="" title="">

## flex-grow

<span class="i">flex-grow</span>属性定义项目的放大比例，默认为<span class="i">0</span>，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 >=0 */
}
```

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png" alt="" title="">

::: info 计算公式

1. 计算将多少剩余空间拿来分配。 公式 : 剩余空间 \* ( 所有项目的 flex-grow 之和 1 ? 1: 所有项目的 flex-grow 之和)

2. 计算每个项目分配到多少剩余空间。 公式 ：要分配的剩余空间 \* (单个项目 flex-grow / 所有项目的 flex-grow 之和)
   :::

## flex-shrink

<span class="i">flex-shrink</span>属性定义项目的缩小比例，默认为<span class="i">1</span>，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 >=0 */
}
```

<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg" alt="" title="">

如果所有项目的<span class="i">flex-shrink</span>属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的<span class="i">flex-shrink</span>属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

::: info 计算公式
1. 计算每个项目的“可收缩空间”。 公式 : 可收缩空间 = (项目的 flex-basis 值) × (项目的 flex-shrink 值)

2. 计算总的“可收缩空间”。 公式 ：总可收缩空间 = Σ (每个项目的可收缩空间)

3. 计算每个项目实际收缩的像素值。 公式：项目收缩的像素值 = (父容器超出的总像素值) × (项目的可收缩空间 / 总可收缩空间)

### 举例说明

假设一个父容器宽度为 500px，内部有三个项目：

| 项目 | 初始宽度 (flex-basis) | flex-shrink 值 |
|------|---------------------|----------------|
| A    | 200px               | 1              |
| B    | 200px               | 2              |
| C    | 200px               | 1              |

**计算步骤：**

1. **计算溢出空间：**
   - 所有项目的总宽度是 200 + 200 + 200 = 600px
   - 父容器宽度是 500px，所以超出的空间是 600 - 500 = 100px

2. **计算每个项目的可收缩空间：**
   - 项目 A: 200px × 1 = 200
   - 项目 B: 200px × 2 = 400
   - 项目 C: 200px × 1 = 200

3. **计算总可收缩空间：**
   - 总和 = 200 + 400 + 200 = 800

4. **计算每个项目收缩的像素值：**
   - 项目 A 收缩值: 100px × (200 / 800) = 25px
   - 项目 B 收缩值: 100px × (400 / 800) = 50px
   - 项目 C 收缩值: 100px × (200 / 800) = 25px

5. **计算最终宽度：**
   - 项目 A 最终宽度: 200px - 25px = 175px
   - 项目 B 最终宽度: 200px - 50px = 150px
   - 项目 C 最终宽度: 200px - 25px = 175px
:::

## flex-basis

<span class="i">flex-basis</span>属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为<span class="i">auto</span>，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```
它可以设为跟<span class="i">width</span>或<span class="i">height</span>属性一样的值（比如350px），则项目将占据固定空间。

## flex属性
<span class="i">flex</span>属性是<span class="i">flex-grow</span>, <span class="i">flex-shrink</span> 和 <span class="i">flex-basis</span>的简写，默认值为0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

## align-self

<span class="i">align-self</span>属性允许单个项目有与其他项目不一样的对齐方式，可覆盖<span class="i">align-items</span>属性。默认值为<span class="i">auto</span>，表示继承父元素的<span class="i">align-items</span>属性，如果没有父元素，则等同于<span class="i">stretch</span>。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
<img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071016.png" alt="" title="">

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

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
