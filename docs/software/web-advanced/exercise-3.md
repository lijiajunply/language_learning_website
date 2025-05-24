# **练习三：响应式网页项目 - 在线商城首页**

## **项目简介**

**目标**：开发一个**响应式在线商城首页**，展示商品列表，适配移动端，支持搜索和筛选功能。

**主要功能**：

- 商品卡片展示（图片 + 价格 + 购买按钮）

- 响应式布局（适配 PC & 手机）

- CSS Flexbox/Grid 布局

- 媒体查询 **@media** 适配不同设备

- JavaScript 实现搜索功能

## **技术栈**

✅ **HTML + CSS**（页面结构与样式）

✅ **CSS Flexbox/Grid**（实现响应式布局）

✅ **媒体查询 @media**（适配不同设备）

✅ **JavaScript（搜索 & 过滤商品）**

## **任务拆解**

✅ **任务 1**：设计商城首页，包含商品列表

✅ **任务 2**：使用 Flexbox / Grid 布局

✅ **任务 3**：使用 @media 实现自适应

✅ **任务 4**：添加搜索栏，实现商品筛选

✅ **任务 5**：优化性能（懒加载）

## **代码示例**

### **📌 HTML 结构**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>在线商城</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>商城</h1>
        <input type="text" id="search" placeholder="搜索商品...">
    </header>
    <section class="products">
        <div class="product" data-name="苹果">🍎 苹果 - ¥10</div>
        <div class="product" data-name="香蕉">🍌 香蕉 - ¥5</div>
        <div class="product" data-name="橙子">🍊 橙子 - ¥8</div>
    </section>

    <script src="script.js"></script>
</body>
</html>

```

### **📌 CSS 响应式布局**

```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
}

header {
    background: #007BFF;
    color: white;
    padding: 10px;
}

input {
    padding: 5px;
    width: 80%;
    margin-top: 10px;
}

.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    padding: 20px;
}

.product {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
    .products { grid-template-columns: 1fr; }
}

```

### **📌 JavaScript 搜索功能**

```js
document.getElementById("search").addEventListener("input", function() {
    let filter = this.value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let name = product.dataset.name.toLowerCase();
        product.style.display = name.includes(filter) ? "block" : "none";
    });
});

```

✅ **输入关键词，商品列表会动态筛选！**

## **课后挑战**

✅ **挑战 1**：增加“加入购物车”功能

✅ **挑战 2**：使用 localStorage 记录购物车数据

✅ **挑战 3**：加载更多商品（滚动分页）

📌 **下一步**：整合动态数据，升级为 **完整在线商城**！

## **总结**

✅ **留言板练习 JavaScript 交互 & LocalStorage**

✅ **在线商城练习 响应式布局 & 搜索筛选**

✅ **结合 JavaScript，使网页更加动态化**

🚀 **下一步**：综合前后端，开发完整 Web 应用！