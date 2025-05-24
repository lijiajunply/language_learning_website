# **第五章：CSS 基础**

## **1. CSS 简介与引入方式**

### **1.1 什么是 CSS？**

CSS（Cascading Style Sheets，层叠样式表）用于**控制网页的外观和布局**，使 HTML 结构更加美观和易读。

### **1.2 CSS 的作用**

✅ **美化网页**（颜色、字体、背景等）

✅ **布局控制**（位置、大小、间距）

✅ **提升用户体验**（动画、响应式设计）

### **1.3 CSS 的三种引入方式**

#### **1.3.1 内联样式（Inline CSS）**

直接在 HTML 标签内使用 style 属性定义 CSS。

```html
<p style="color: red; font-size: 20px;">这是一个红色的段落</p>
```

✅ **优点**：简单、适用于单个元素

❌ **缺点**：难以维护，代码冗余

#### **1.3.2 内部样式（Internal CSS）**

在 HTML 的 `<head>` 部分使用 `<style>` 标签定义样式。

```html
<head>
    <style>
        p {
            color: blue;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <p>这是一个蓝色的段落</p>
</body>

```

✅ **优点**：适用于单个页面的样式定义

❌ **缺点**：样式无法复用，影响代码结构

#### **1.3.3 外部样式（External CSS）**

将样式写在独立的 .css 文件中，并通过 `<link>` 引入。

**CSS 文件（styles.css）：**

```css
p {
    color: green;
    font-size: 16px;
}
```

**HTML 文件（index.html）：**

```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <p>这是一个绿色的段落</p>
</body>

```

✅ **优点**：样式**可复用**，维护方便

❌ **缺点**：**需额外的 HTTP 请求**加载 CSS 文件

## **2. 选择器（Selectors）**

选择器用于**匹配 HTML 元素**，以应用 CSS 样式。

**CSS 核心选择器详解** —— 精准定位页面元素的工具

**1. 基础选择器（核心三要素）**

- Type Selectors 标签选择器
- Class Selectors 类选择器
- ID Selectors ID选择器
- Descendant Selector 后代选择器

**2. 扩展选择器（复杂场景利器）**

- Pseudo Selectors 伪类选择器a:hover { color: blue; }*定义元素特定状态（如悬停、焦点）*
- Attribute Selectors 属性选择器

### **2.1 标签选择器（Element Selector）**

直接选中 HTML 标签，应用样式到所有相同标签。

```css
p {
    color: blue;
}
```

作用：**所有 `<p>` 元素都会变蓝**

### **2.2 类选择器（Class Selector）**

使用 . 选择具有特定 class 属性的元素。

```css
.title {
    font-weight: bold;
    color: red;
}
```

```html
<p class="title">这是一个加粗的红色标题</p>
```

> 多个元素可共享同一个 class
> 可重复使用

### **2.3 ID 选择器（ID Selector）**

使用 # 选择具有特定 id 的元素。

```css
#main-title {
    font-size: 24px;
    text-align: center;
}

```

```html
<h1 id="main-title">这是页面的主标题</h1>
```

❌ **注意**：id 在页面中应该是**唯一的**。

### **2.4 后代选择器（Descendant Selector）**

匹配 **某个元素内的特定子元素**。

```css
div p {
    color: purple;
}

```

```html
<div>
    <p>这个段落是紫色的</p>
</div>
<p>这个段落不会受影响</p>

```

### **2.5 伪类选择器（Pseudo-classes）**

用于选择**特定状态**的元素，如鼠标悬停、选中状态等。

| 伪类         | 作用                       |
| ------------ | -------------------------- |
| :hover       | 鼠标悬停时触发             |
| :focus       | 输入框获得焦点时触发       |
| :first-child | 选中父元素的第一个子元素   |
| :last-child  | 选中父元素的最后一个子元素 |

#### **示例：鼠标悬停变色**

```css
a:hover {
    color: orange;
}
```

```html
<a href="#">鼠标悬停我会变色</a>
```

### **2.6 属性选择器（Attribute Selectors）**

**一、基础类型**

1. 存在性选择器

匹配具有指定属性的元素，不限制属性值

语法：[attribute]

```css
[disabled] { 
    opacity: 0.5;  /* 所有带disabled属性的元素变半透明 */
}

```

1. 精确匹配选择器

属性值必须完全等于目标值

语法：[attribute="value"]

```css
input[type="text"] {
    border: 2px solid red;  /* 精确匹配type为text的输入框 */
}

```

**二、模糊匹配类型**

属性值中包含指定字符串即可

语法：[attribute*="value"]

```css
img[src*="logo"] {
    filter: grayscale(100%);  /* 图片路径包含logo的变灰 */
}

```

1. 开头匹配选择器

属性值以指定字符串开头

语法：[attribute^="value"]

```css
a[href^="tel:"]::after {
    content: "☎";  /* 电话链接添加电话图标 */
}

```

1. 结尾匹配选择器

属性值以指定字符串结尾

语法：[attribute$="value"]

```css
a[href$=".pdf"] {
    color: red;  /* PDF链接显示为红色 */
}

```

**三、特殊场景类型**

属性值为多个空格分隔的单词时匹配

语法：[attribute~="value"]

```css
[data-tags~="urgent"] {
    background: #ffeb3b;  /* 标签含urgent的元素高亮 */
}

```

1. 连字符前缀匹配

匹配属性值以连字符分隔且前缀符合的情况（常用于语言代码）

语法：[attribute|="value"]

```css
[lang|="zh"] {
    font-family: "PingFang SC";  /* 中文语言版本特殊字体 */
}

```

**四、组合使用技巧**

```css
input[type="email"][required] {
    border: 2px solid #4CAF50;  /* 必填的邮箱输入框 */
}

```

• 伪类联动：结合交互状态

```css
a[href^="http"]:hover::after {
    content: "（外部链接）";  /* 鼠标悬停时提示外部链接 */
}

```

**五、实际应用场景**

1. 表单验证增强

```css
input:invalid[required] {
    box-shadow: 0 0 8px red;  /* 必填项未填时显示红框 */
}

```

1. 国际化适配

```css
[lang|="en"] { quotes: '"' '"'; }  /* 英文引号样式 */

```

1. 动态数据标记

```css
tr[data-status="expired"] td {
    text-decoration: line-through;  /* 过期数据划除显示 */
}

```

优先级注意：属性选择器优先级与类选择器相同，低于ID选择器。建议结合浏览器开发者工具验证样式覆盖关系。

## **3. 常用样式属性**

### **3.1 颜色（Color）**

```css
h1 {
    color: red; /* 颜色名称 */
    color: #ff0000; /* 十六进制颜色 */
    color: rgb(255, 0, 0); /* RGB 颜色 */
}

```

### **3.2 字体（Font）**

| 属性        | 作用                     |
| ----------- | ------------------------ |
| font-size   | 字体大小                 |
| font-weight | 字体粗细（bold、normal） |
| font-style  | 斜体（italic）           |
| font-family | 字体                     |

#### **示例**

```css
p {
    font-size: 18px;
    font-weight: bold;
    font-style: italic;
    font-family: Arial, sans-serif;
}

```

### **3.3 背景（Background）**

| 属性             | 作用                       |
| ---------------- | -------------------------- |
| background-color | 背景颜色                   |
| background-image | 背景图片                   |
| background-size  | 背景大小（cover、contain） |

#### **示例**

```css
body {
    background-color: #f0f0f0;
    background-image: url('background.jpg');
    background-size: cover;
  
}

```

### **3.4 边框（Border）**

```css
div {
    border: 2px solid black;
    border-radius: 10px; /* 圆角 */
}

```

| 关键字 | 作用   |
| ------ | ------ |
| solid  | 实线   |
| dashed | 虚线   |
| dotted | 点状线 |

### **3.5 内外边距（Margin & Padding）**

| 属性    | 作用       |
| ------- | ---------- |
| margin  | 设置外边距 |
| padding | 设置内边距 |

#### **示例**

```css
div {
    margin: 20px;
    padding: 10px;
}

```

## **4. 课后练习**

### **4.1 实践任务**

1. 创建一个 HTML 页面并使用 CSS 样式

：

    - 让`<h1>` 变红色

    - 让`<p>` 变蓝色

    - 添加一个带背景图片的`<div>`

    - 给`<a>` 添加鼠标悬停变色效果

1. 选择器练习

   - 使用 **类选择器** 让多个元素共享样式
   - 使用 **ID 选择器** 定义唯一样式
   - 使用 **后代选择器** 让 div 内的 p 变紫色
2. 思考题

   - 为什么建议使用外部 CSS 而不是内联 CSS？
   - 类选择器和 ID 选择器的区别是什么？
   - 伪类 **:hover 可以用于哪些 HTML 元素？**

## **5. 总结**

✅ **CSS 通过不同方式引入，外部 CSS 最推荐**

✅ **使用选择器可以灵活地应用样式**

✅ **常用样式包括颜色、字体、背景、边框、内外边距**

✅ **伪类可以用于用户交互，如 :hover 和 :focus**

📌 **下一步**：学习 **CSS 布局（盒模型、浮动、定位、Flexbox）**！
