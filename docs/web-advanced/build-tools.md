# **第十四章：构建工具**

## **1. 包管理工具（npm、yarn）**

### **1.1 什么是包管理器？**

包管理器用于**安装、管理 JavaScript 依赖**，主流工具：

- npm（Node.js 自带）

- yarn（Facebook 开发，更快）

### **1.2 常用命令**

| 命令 | 作用 | 
| -- | -- |
| npm init | 初始化项目 | 
| npm install package | 安装包 | 
| npm uninstall package | 卸载包 | 
| npm update | 更新依赖 | 


✅ **推荐使用 yarn 提高速度**

## **2. 模块打包工具（Webpack）**

### **2.1 什么是 Webpack？**

Webpack 是**前端打包工具**，用于：

- 合并 JavaScript 文件

- 压缩 CSS 和 JS

- 加载图片、字体等静态资源

✅ **适用于大型前端项目**

### **2.2 Webpack 基本配置**

```js
module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'bundle.js', // 输出文件
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    }
};

```

✅ **安装 webpack 并运行**

```sh
npm install webpack webpack-cli --save-dev
npx webpack

```

## **3. 自动化工具（Gulp、Grunt）**

### **3.1 Gulp**

Gulp 是**前端自动化构建工具**，用于：

- 压缩 CSS/JS

- 自动刷新浏览器

- 图片优化

✅ **Gulp 配置示例**

```js
const { src, dest, watch, series } = require("gulp");
const cssnano = require("gulp-cssnano");

function minifyCSS() {
    return src("src/*.css")
        .pipe(cssnano())
        .pipe(dest("dist"));
}

exports.default = series(minifyCSS);

```

✅ **运行 Gulp**

```sh
npm install gulp gulp-cssnano --save-dev
npx gulp

```

# **总结**

✅ **开发工具：VS Code、DevTools、Git 提高效率**

✅ **调试技巧：debugger、断点、console.log 解决问题**

✅ **优化：减少 HTTP 请求、懒加载、缓存**

✅ **构建工具：Webpack、Gulp 自动化开发**

📌 **下一步**：进入 **第五篇：实战与创新 - 从零到一的蜕变！**