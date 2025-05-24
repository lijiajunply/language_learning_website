# **第十**三**章：开发工具**

## **1. 浏览器开发者工具（Chrome DevTools）**

### **1.1 什么是开发者工具？**

浏览器开发者工具（DevTools）是 **前端调试、优化、分析网页性能的必备工具**，主要用于：

- 调试 JavaScript 代码

- 检查 HTML 结构

- 修改 CSS 样式

- 分析网页加载性能

✅ **推荐使用**：F12 或 Ctrl + Shift + I 打开 DevTools

### **1.2 DevTools 常用面板**

| 面板 | 作用 | 
| -- | -- |
| Elements | 查看/修改 HTML 结构和 CSS 样式 | 
| Console | 输出日志、调试 JavaScript | 
| Network | 监控 HTTP 请求、分析加载时间 | 
| Sources | 设置断点、调试 JS 代码 | 
| Performance | 分析网页性能 | 
| Application | 管理存储（LocalStorage、Cookies） | 


### **1.3 Console 调试**

**查看错误**

```js
console.error("这是一个错误信息");
```

**警告信息**

```js
console.warn("警告信息");

```

**表格格式化数据**

```js
console.table([{ name: "张三", age: 25 }, { name: "李四", age: 30 }]);

```

✅ **开发者工具让调试 JavaScript 更高效！**

## **2. 代码编辑器（VS Code 使用技巧）**

### **2.1 为什么选择 VS Code？**

VS Code（Visual Studio Code）是目前**最流行的前端开发工具**，提供：

- 轻量级但功能强大

- 丰富的插件生态

- 内置终端

- Git 集成

### **2.2 常用快捷键**

| 快捷键 | 作用 | 
| -- | -- |
| Ctrl + P | 快速打开文件 | 
| Ctrl + Shift + P | 命令面板 | 
| Alt + Shift + ↓ | 复制当前行 | 
| Ctrl + D | 选中多个相同文本 | 
| Ctrl + / | 添加/取消注释 | 
| Ctrl + Shift + K | 删除当前行 | 


### **2.3 必装插件**

| 插件 | 作用 | 
| -- | -- |
| ESLint | 代码规范检查 | 
| Prettier | 自动格式化代码 | 
| Live Server | 本地服务器，自动刷新 | 
| Debugger for Chrome | 浏览器调试 | 
| Path Intellisense | 智能路径补全 | 


✅ **安装这些插件，提高编码效率！**

## **3. 版本控制（Git 基础）**

### **3.1 什么是 Git？**

Git 是**最流行的版本控制系统**，用于：

- 代码管理

- 多人协作

- 版本回滚

✅ **Git 是现代开发必备工具**

### **3.2 Git 常用命令**

| 命令 | 作用 | 
| -- | -- |
| git init | 初始化 Git 仓库 | 
| git clone | 克隆远程仓库 | 
| git add . | 添加所有更改到暂存区 | 
| git commit -m "说明" | 提交更改 | 
| git push origin main | 推送代码到远程仓库 | 
| git pull origin main | 拉取远程最新代码 | 
| git log | 查看提交历史 | 
| git status | 查看当前状态 | 


✅ **推荐使用 GitHub / GitLab 托管代码！**