# **第七章：CSS 进阶**

## **1. 响应式设计（媒体查询 @media）**

### **1.1 什么是响应式设计？**

响应式设计（Responsive Design）让网页在**不同设备**（桌面、平板、手机）上都能良好显示，**核心技术是 CSS 的 @media 媒体查询**。

✅ **适应不同屏幕尺寸**

✅ **提升用户体验**

✅ **减少维护多套代码的需求**

### **1.2 @media 语法**

```css
@media 条件 {
    /* CSS 规则 */
}

```

#### **示例：不同屏幕大小的样式**

```css
/* 桌面端（默认样式） */
body {
    background-color: white;
}
/* 平板端（屏幕宽度 ≤ 768px） */
@media (max-width: 768px) {
    body {
        background-color: lightblue;
    }
}
/* 手机端（屏幕宽度 ≤ 480px） */
@media (max-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
```

✅ **页面背景色会根据设备屏幕大小变化！**

### **1.3 @media 断点推荐**

| 设备 | 屏幕宽度（px） | 
| -- | -- |
| 超小屏幕（手机） | max-width: 480px | 
| 小屏幕（平板） | max-width: 768px | 
| 中等屏幕（笔记本） | max-width: 1024px | 
| 大屏幕（桌面） | min-width: 1025px | 


## **2. 动画与过渡（transition、animation）**

### **2.1 transition 过渡效果**

transition 让元素在**属性变化时**产生平滑动画。

#### **示例：鼠标悬停变色**

```css
.button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    transition: background-color 0.5s ease;
}

.button:hover {
    background-color: red;
}

```

✅ **鼠标悬停时背景色从蓝色渐变为红色！**

### **2.2 animation 关键帧动画**

animation 让元素可以执行**复杂动画**。

#### **示例：文本闪烁**

```css
@keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
}

.text {
    animation: blink 1s infinite;
}

```

✅ **文本每秒闪烁一次！**

### **2.3 animation 语法**

```css
@keyframes 动画名称 {
    0% { 初始状态 }
    100% { 结束状态 }
}

.元素 {
    animation: 动画名称 时长 速度 无限循环;
}

```

#### **示例：移动盒子**

```css
@keyframes move-box {
    from { transform: translateX(0); }
    to { transform: translateX(100px); }
}

.box {
    animation: move-box 2s ease-in-out infinite;
}

```

✅ **盒子会左右移动！**

## **3. 变量与自定义属性（var()）**

### **3.1 CSS 变量**

CSS 变量（Custom Properties）使样式更加灵活、可复用。

#### **定义变量**

```css
:root {
    --primary-color: blue;
    --text-size: 18px;
}

button {
    background-color: var(--primary-color);
    font-size: var(--text-size);
}

```

✅ **修改 --primary-color 即可统一改变所有按钮颜色！**

### **3.2 var() 语法**

```css
var(--变量名, 默认值)

```

#### **示例：按钮颜色切换**

```css
:root {
    --btn-color: green;
}

button {
    background-color: var(--btn-color, gray);
}

```

✅ **如果 --btn-color 未定义，则使用默认值 gray。**

## **4. ****CSS 预处理器（Sass/SCSS 简介）**

### **4.1 什么是 CSS 预处理器？**

CSS 预处理器（Sass/SCSS）是**增强版 CSS**，提供 **变量、嵌套、函数** 等高级功能，提高开发效率。

✅ **更易维护**（支持变量、模块化）

✅ **减少代码重复**（支持 mixin）

✅ **增强可读性**（支持嵌套规则）

### **4.2 Sass vs SCSS**

| 语法 | 说明 | 
| -- | -- |
| Sass | 无 {} 和 ;，简洁但不兼容 CSS | 
| SCSS | 兼容 CSS 语法，更流行 | 


### **4.3 变量**

```scss
$primary-color: blue;

button {
    background-color: $primary-color;
}

```

✅ **Sass 变量类似 CSS 变量，但支持更多功能！**

### **4.4 嵌套**

```scss
nav {
    ul {
        list-style: none;
        
        li {
            display: inline-block;
            a {
                text-decoration: none;
            }
        }
    }
}
```

✅ **避免重复书写选择器，提高代码结构清晰度！**

### **4.5 Mixin（代码复用）**

```scss
@mixin button-style {
    padding: 10px;
    border-radius: 5px;
    background-color: red;
}

button {
    @include button-style;
}

```

✅ **@mixin 定义代码块，@include 复用样式！**

## **5. 课后练习**

### **5.1 实践任务**

1. 使用 **@media 让网页在不同屏幕尺寸下自适应**

1. 给按钮添加 **transition 过渡动画**

1. 实现 **animation 让元素来回移动**

1. 定义 **CSS 变量 统一管理颜色**

1. 用 **Sass 创建 mixin 复用按钮样式**

## **6. 总结**

✅ **@media 让网页适配不同设备**

✅ **transition 让样式变化更平滑**

✅ **animation 让网页更具动感**

✅ **CSS 变量减少重复代码，提高可维护性**

✅ **Sass/SCSS 提供变量、嵌套、复用功能，增强 CSS 能力**

📌 **下一步**：学习 **JavaScript，赋予网页交互功能！**