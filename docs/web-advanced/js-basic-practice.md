# JavaScript 基础练习环境设置文档

## 1. 基础开发环境准备

### 1.1 安装 Node.js

JavaScript 运行环境，推荐安装 LTS 版本：

- Node.js 官网下载

- 安装后验证：

```bash
node -v
npm -v
```

### 1.2 安装代码编辑器

推荐使用：

- Visual Studio Code (免费)

- WebStorm (付费)

### 1.3 浏览器

推荐 Chrome 或 Firefox，用于前端调试

## 2. 项目初始化

### 2.1 创建项目目录

```bash
mkdir js-basics-practice
cd js-basics-practice
```

### 2.2 初始化 npm 项目

```bash
npm init -y
```

### 2.3 创建基础文件结构

```
js-basics-practice/
├── index.html       # HTML 入口文件
├── script.js        # JavaScript 主文件
├── style.css        # 可选样式文件
└── exercises/       # 练习文件目录
    ├── variables.js
    ├── functions.js
    ├── arrays.js
    └── objects.js

```

## 3. HTML 基础模板

在 index.html 中添加：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 基础练习</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>JavaScript 基础练习</h1>
    <div id="output"></div>
    
    <!-- 引入你的 JavaScript 文件 -->
    <script src="script.js"></script>
    
    <!-- 练习文件按需引入 -->
    <!-- <script src="exercises/variables.js"></script> -->
</body>
</html>
```

## 4. JavaScript 基础测试代码

在 script.js 中添加：

```javascript
console.log("JavaScript 环境已准备好！");

// 简单的 DOM 操作测试
document.getElementById('output').innerHTML = 
    '<p>环境已设置完成，打开开发者工具(Console)查看日志。</p>';

// 练习区域
// 在这里或单独的练习文件中编写你的代码
```

## 5. 运行和测试

### 5.1 浏览器中测试

1. 直接在文件管理器中双击打开 index.html

1. 或使用 VS Code 的 Live Server 扩展

### 5.2 使用 Node.js 运行纯 JavaScript 文件

```bash
node exercises/variables.js
```

## 6. 可选工具安装

### 6.1 安装 ESLint (代码风格检查)

```bash
npm install eslint --save-dev
npx eslint --init
```

### 6.2 安装 Prettier (代码格式化)

```bash
npm install --save-dev prettier
```

### 6.3 安装 nodemon (自动重启)

```bash
npm install -g nodemon
```

使用方式：

```bash
nodemon exercises/functions.js
```

## 7. 练习建议

1. 从 exercises/variables.js 开始，逐步练习

1. 每个练习文件顶部添加练习说明

1. 使用 console.log() 输出结果

1. 完成后在浏览器控制台或终端查看输出

示例练习文件 (exercises/variables.js):

```javascript
/*
 * 变量与数据类型练习
 * 1. 声明不同数据类型的变量
 * 2. 进行类型转换练习
 * 3. 模板字符串使用
 */

// 1. 变量声明
let name = "Alice";
const age = 25;
var isStudent = true;

// 2. 类型转换
let strToNumber = Number("123");
let boolToStr = String(true);

// 3. 模板字符串
console.log(`姓名: ${name}, 年龄: ${age}, 学生: ${isStudent ? '是' : '否'}`);

// 更多练习...

```