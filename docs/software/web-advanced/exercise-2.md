# **练习二：动态网页项目 - 在线留言板**

## **项目简介**

**目标**：开发一个**在线留言板**，用户可以提交留言，留言将动态显示在页面上，并且可以存储在本地存储（LocalStorage）。

**主要功能**：

- 用户输入留言并提交

- JavaScript 处理表单验证

- 使用 **AJAX/Fetch API** 发送留言

- 在页面上 **动态显示留言**

- 使用 **LocalStorage** 存储留言（页面刷新后仍然存在）

## **技术栈**

✅ **HTML + CSS**（页面结构与样式）

✅ **JavaScript（DOM 操作、事件监听）**

✅ **AJAX + JSON（异步提交留言）**

✅ **LocalStorage（本地存储数据）**

## **任务拆解**

✅ **任务 1**：创建留言表单

✅ **任务 2**：使用 JavaScript 处理表单验证

✅ **任务 3**：用 AJAX 发送留言数据（模拟）

✅ **任务 4**：在页面上动态显示留言

✅ **任务 5**：使用 LocalStorage 存储留言，刷新页面后数据仍存在

## **代码示例**

### **📌 HTML 结构**

```html
html复制编辑<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>在线留言板</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>留言板</h1>
    <form id="messageForm">
        <input type="text" id="username" placeholder="输入你的名字" required>
        <textarea id="message" placeholder="输入你的留言" required></textarea>
        <button type="submit">提交</button>
    </form>
    <h2>留言列表</h2>
    <ul id="messageList"></ul>

    <script src="script.js"></script>
</body>
</html>

```

### **📌 JavaScript 处理留言**

```js
    document.getElementById("messageForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止默认提交

    let username = document.getElementById("username").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!username || !message) {
        alert("请填写完整信息！");
        return;
    }

    let newMessage = { username, message };

    // 读取 LocalStorage 中的留言列表
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    displayMessages();
    document.getElementById("messageForm").reset();
});

// 显示留言
function displayMessages() {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let messageList = document.getElementById("messageList");
    messageList.innerHTML = messages.map(msg => `<li><strong>${msg.username}：</strong>${msg.message}</li>`).join("");
}

// 页面加载时显示已存储的留言
displayMessages();

```

✅ **提交留言后，数据存储到 LocalStorage，并实时显示！**

### **📌 CSS 美化**

```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
}

form {
    margin: 20px auto;
    max-width: 400px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
}

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

## **课后挑战**

✅ **挑战 1**：添加“删除留言”功能

✅ **挑战 2**：使用 fetch() 发送留言到后端 API（可以使用 JSONPlaceholder 模拟）

✅ **挑战 3**：增加点赞功能

📌 **下一步**：练习 **响应式网页项目 - 在线商城首页**！