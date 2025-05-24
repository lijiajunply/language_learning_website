# **第三章：HTML多媒体与语义化**

## **1. 多媒体标签（`<audio>、<video>、<iframe>`）**

### **1.1 audio 标签（音频）**

HTML5 提供了 `<audio>` 标签，用于在网页中嵌入音频文件。

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg"/>
    <source src="audio.ogg" type="audio/ogg"/>
    您的浏览器不支持 audio 标签。
</audio>
```

#### **常用属性**

| 属性 | 作用 | 
| -- | -- |
| controls | 显示播放控制按钮（播放、暂停、音量） | 
| autoplay | 自动播放（部分浏览器可能需要用户交互） | 
| loop | 循环播放 | 
| muted | 默认静音 | 


### **1.2 video 标签（视频）**

`<video>` 标签用于嵌入视频文件。

```html
<video controls width="500">
    <source src="video.mp4" type="video/mp4"/>
    <source src="video.ogg" type="video/ogg"/>
    您的浏览器不支持 video 标签。
</video>
```

#### **常用属性**

| 属性 | 作用 | 
| -- | -- |
| controls | 显示播放控制按钮 | 
| autoplay | 自动播放 | 
| loop | 循环播放 | 
| muted | 默认静音 | 
| poster="image.jpg" | 指定视频加载前的预览图片 | 


### **1.3 iframe 标签（嵌入网页内容）**

`<iframe>` 可用于嵌入其他网页、地图、视频等内容。

```html
<iframe src="https://www.example.com" width="600" height="400"></iframe>
```

#### **常见应用**

- 嵌入 YouTube 视频：

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/视频ID" frameborder="0" allowfullscreen></iframe>

```

- 嵌入 Google 地图：

```html
<iframe src="https://www.google.com/maps/embed?..."></iframe>
```

## **2. 语义化标签（`<header>、<footer>、<nav>、<article>、<section>`）**

HTML5 引入了**语义化标签**，提高代码可读性和 SEO 友好性。

### **2.1 header（头部）**

定义网页或一个内容块的标题部分。

```html
<header>
    <h1>我的网站</h1>
    <p>欢迎访问我的网站！</p>
</header>
```

### **2.2 footer（底部）**

定义网页的底部信息，如版权声明、联系方式等。

```html
<footer>
    <p>版权所有 © 2025 我的公司</p>
</footer>
```

### **2.3 nav（导航）**

定义页面的导航菜单。

```html
<nav>
    <ul>
        <li><a href="index.html">首页</a></li>
        <li><a href="about.html">关于我们</a></li>
        <li><a href="contact.html">联系我们</a></li>
    </ul>
</nav>
```

### **2.4 article（文章块）**

定义独立的文章或内容块，适用于博客、新闻等。

```html
<article>
    <h2>HTML 语义化标签</h2>
    <p>使用 `article` 标签可以提高可读性和 SEO 友好性。</p>
</article>
```

### **2.5 section（页面分区）**

用于划分网页中的不同部分。

```html
<section>
    <h2>关于我们</h2>
    <p>我们是一家专业的软件开发公司。</p>
</section>

```

## **3. HTML5 新特性（`<canvas>、<svg>`）**

### **3.1 canvas（绘制图形）**

HTML5 的 `<canvas>` 标签用于绘制 2D 图形，如线条、矩形、圆形等。

```html
<canvas id="myCanvas" width="400" height="200" style="border:1px solid #000;"></canvas>

<script>
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 100); // 绘制蓝色矩形
</script>

```

> **特点**：基于 JavaScript 绘制图形，适合游戏开发、数据可视化等。
> E-Charts：
> Antv X6：


### **3.2 svg（矢量图形）**

`<svg>` 用于绘制矢量图形，具有**不失真、可缩放**的特点。

```html
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
```

> **区别**：**Canvas**：基于像素绘制（适用于动画）。**SVG**：基于矢量绘制（适用于图标、图表）。
> bootstrap Icons：


## **4. 课后练习**

### **4.1 实践任务**

1. 创建一个包含音频和视频的网页：

	- 添加 `<audio>` 播放一首音乐。

	- 添加 `<video>` 播放一个视频。

	- 使用 `<iframe>` 嵌入一个 YouTube 视频。

1. 使用 HTML5 语义化标签创建博客页面：

	- 包含 header（标题）。

	- nav（导航菜单）。

	- article（文章）。

	- section（不同部分）。

	- footer（版权信息）。

1. 绘制一个简单的图形：

	- 使用 `<canvas>` 画一个矩形。

	- 使用 `<svg>` 画一个圆形。

## **5. 总结**

✅ **`<audio>` 和 `<video>` 可用于嵌入多媒体文件**

✅ **`<iframe>` 可用于嵌入网页、地图、视频等**

✅ **HTML5 语义化标签提高可读性和 SEO 友好性**

✅ **`<canvas>` 和 `<svg>` 适用于绘制图形，前者基于像素，后者基于矢量**

📌 **下一步**：学习 **HTTP 与 Web 基础**！