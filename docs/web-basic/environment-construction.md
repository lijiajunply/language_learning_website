# 环境搭建

## **1. 安装 Visual Studio Code (VS Code)**

VS Code 是一个轻量级且功能强大的代码编辑器，适合前端开发。

### 下载与安装

1. 访问 

1. 根据你的操作系统（Windows、macOS 或 Linux）下载安装包。

1. 安装完成后，启动 VS Code。

## **2. 安装必要插件**

在 VS Code 中安装以下插件，以提升开发效率：

### 核心插件

1. Auto Close Tag: 自动闭合 HTML 标签。

1. Auto Rename Tag: 自动重命名配对的 HTML 标签。

1. IntelliSense for CSS class names in HTML: 在 HTML 中智能提示 CSS 类名。

1. CSS Peek: 快速查看和跳转到 CSS 定义。

1. ESLint: JavaScript 代码的静态分析工具。

1. Prettier - Code formatter: 自动格式化代码（支持 HTML、CSS、JavaScript）。

1. Live Server: 启动本地服务器并实时预览页面。

### 安装步骤

1. 打开 VS Code。

1. 点击左侧扩展图标（或按 Ctrl+Shift+X）。

1. 在搜索栏中输入插件名称，点击安装。

## **3. 配置 VS Code**

### 启用格式化工具

1. 打开 VS Code 设置（Ctrl+, 或 Cmd+,）。

1. 搜索 Format On Save，勾选该选项。

1. 搜索 Default Formatter，选择 Prettier。

### 配置 ESLint

1. 在项目根目录下创建 .eslintrc.json 文件，配置 ESLint 规则。例如：

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

1. 安装 ESLint 依赖（如果使用 npm）：

```
npm install eslint --save-dev
```

## **4. 创建项目结构**

在本地创建一个项目文件夹，并按照以下结构组织文件：

```
my-project/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── images/
    └── fonts/
```

### 示例文件内容

1. index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <script src="script.js"></script>
</body>
</html>
```

运行 HTML

1. style.css

```
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  text-align: center;
}
h1 {
  color: #333;
}
```

1. script.js

```
console.log("Hello from JavaScript!");
```

## **5. 使用 Live Server 预览页面**

1. 在 VS Code 中打开项目文件夹。

1. 右键点击 index.html 文件，选择 Open with Live Server。

1. 浏览器会自动打开并显示页面，且支持实时刷新。

## **6. 安装浏览器开发者工具**

- Chrome DevTools: 按 F12 或 Ctrl+Shift+I 打开，用于调试 HTML、CSS 和 JavaScript。

- Firefox Developer Tools: 功能类似，适合 Firefox 用户。

## **7. 可选：版本控制（Git）**

1. 安装 

1. 在项目根目录初始化 Git：

```
git init
```

1. 创建 .gitignore 文件，忽略不必要的文件（如 node_modules）：

```
node_modules/
.DS_Store
```

1. 提交代码：

```
git add .
git commit -m "Initial commit"
```

## **8. 总结**

通过以上步骤，你已经成功搭建了一个高效的 HTML + CSS + JavaScript 开发环境：

1. 安装了 VS Code 和核心插件。

1. 配置了代码格式化和 ESLint。

1. 创建了标准的项目结构。

1. 使用 Live Server 进行实时预览。

1. 可选地配置了 Git 版本控制。