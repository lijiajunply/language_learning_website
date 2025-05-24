# **静态网页项目：个人简历网站**

## **项目简介**

**目标**：创建一个**个人简历网站**，展示个人信息、技能、项目经验等，适用于求职或作品展示。

**功能**：

- 个人简介

- 技能列表

- 教育 & 工作经历

- 项目展示

- 联系方式

- 响应式布局（适配 PC & 移动端）

## **技术栈**

✅ **HTML**：网页结构

✅ **CSS（Flexbox/Grid）**：布局 & 样式

✅ **FontAwesome**：图标库（如社交媒体图标）

✅ **Google Fonts**：美化字体

✅ **CSS 动画**：增强交互体验

## **任务拆解**

✅ **任务 1**：搭建 HTML 页面结构

✅ **任务 2**：使用 CSS 美化页面

✅ **任务 3**：添加个人信息、技能、经历等内容

✅ **任务 4**：优化排版 & 适配移动端

✅ **任务 5**：添加 CSS 过渡效果，让页面更美观

## **代码示例**

### **📌 HTML 结构**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人简历</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header>
        <h1>张三</h1>
        <p>前端开发工程师</p>
    </header>

    <section class="about">
        <h2>关于我</h2>
        <p>热爱编程，擅长 HTML、CSS、JavaScript，喜欢学习新技术。</p>
    </section>

    <section class="skills">
        <h2>技能</h2>
        <ul>
            <li><i class="fa-brands fa-html5"></i> HTML</li>
            <li><i class="fa-brands fa-css3-alt"></i> CSS</li>
            <li><i class="fa-brands fa-js"></i> JavaScript</li>
            <li><i class="fa-brands fa-react"></i> React</li>
        </ul>
    </section>

    <section class="experience">
        <h2>工作经历</h2>
        <div class="job">
            <h3>前端工程师 - ABC 公司</h3>
            <p>2021 - 现在</p>
            <ul>
                <li>负责公司官网开发与维护</li>
                <li>优化前端性能，提高加载速度</li>
            </ul>
        </div>
    </section>

    <section class="projects">
        <h2>项目经验</h2>
        <div class="project">
            <h3>个人博客</h3>
            <p>基于 HTML + CSS + JavaScript 开发的个人博客网站。</p>
            <button>查看项目</button>
        </div>
    </section>

    <section class="contact">
        <h2>联系方式</h2>
        <p>Email: zhangsan@example.com</p>
        <p>GitHub: <a href="#">github.com/zhangsan</a></p>
        <p>LinkedIn: <a href="#">linkedin.com/in/zhangsan</a></p>
    </section>

    <footer>
        <p>© 2025 张三 | 个人简历</p>
    </footer>
</body>
</html>
```

### **📌 CSS 样式**

```css
/* 通用样式 */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    background-color: #f4f4f4;
    color: #333;
}

header {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 20px;
}

h1, h2 {
    margin-bottom: 10px;
}

section {
    max-width: 800px;
    margin: 20px auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

ul {
    list-style: none;
    padding: 0;
}

ul li {
    display: flex;
    align-items: center;
    margin: 5px 0;
}

ul li i {
    margin-right: 10px;
    color: #007BFF;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: white;
}

/* 响应式布局 */
@media (max-width: 600px) {
    body {
        font-size: 16px;
    }
}
```

✅ **添加 @media 适配移动端，确保手机上显示良好**

### **📌 进阶优化**

✅ **添加 CSS 过渡效果**：

```css
button {
    background: #007BFF;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
}

button:hover {
    background: #0056b3;
}
```

✅ **使用动画增强用户体验**

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

section {
    animation: fadeIn 1s ease-in-out;
}
```

## **课后挑战**

✅ **挑战 1**：为每个项目添加图片和更多详情

✅ **挑战 2**：使用 Flexbox 或 Grid 重新布局

✅ **挑战 3**：添加“下载 PDF 简历”按钮

✅ **挑战 4**：制作夜间模式，使用 JavaScript 切换 dark mode

## **总结**

✅ **通过本项目掌握 HTML + CSS 基础**

✅ **学习 Flexbox/Grid 布局**

✅ **掌握 CSS 动画 & 过渡效果**

✅ **使用 @media 适配移动端**

📌 **下一步**：将静态简历升级为**动态页面**，加入 JavaScript 交互！