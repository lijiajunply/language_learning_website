# **第十五章：调试与优化**

## **1. JavaScript 调试技巧**

### **1.1 使用 debugger**

```js
function test() {
    let a = 10;
    debugger; // 代码在此暂停，可查看变量值
    console.log(a);
}
test();

```

✅ **配合 DevTools 进行代码调试**

### **1.2 设置断点**

1. 打开 DevTools（F12）

1. 进入 **Sources 面板**

1. 找到 **JS 文件，单击行号设置断点**

1. 执行代码，查看变量值

✅ **更精准地调试代码**

## **2. 性能优化**

### **2.1 减少 HTTP 请求**

合并 CSS 和 JS 文件，减少 HTTP 请求次数。

### **2.2 资源压缩**

| 资源 | 工具 | 
| -- | -- |
| JavaScript | UglifyJS | 
| CSS | CSSNano | 
| 图片 | TinyPNG | 


✅ **减少文件大小，提高加载速度**

### **2.3 懒加载**

**按需加载资源，减少首屏加载时间**

```html
<img src="placeholder.jpg" data-src="real-image.jpg" class="lazy">
<script>
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".lazy").forEach(img => {
            img.src = img.dataset.src;
        });
    });
</script>

```

✅ **提高网页首屏加载速度**

### **2.4 使用缓存**

- 启用浏览器缓存

- 使用 **localStorage 存储数据**

- CDN 加速静态资源

## **3. 跨浏览器兼容性**

### **3.1 caniuse.com 查询兼容性**

使用 caniuse.com 检查 CSS/JS 兼容性。

### **3.2 @supports 处理不兼容情况**

```css
@supports (display: grid) {
    .container {
        display: grid;
    }
}

```

✅ **让代码适应不同浏览器**