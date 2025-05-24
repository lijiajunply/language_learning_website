# **第十二章：Web 存储与 Cookie**

## **1. Web 存储概述**

在 JavaScript 中，有 3 种主要的 Web 存储方式：

| 存储方式 | 特点 | 适用场景 | 
| -- | -- | -- |
| localStorage | 长期存储 | 存储用户偏好、持久化数据（如 JWT 令牌、用户设置等） | 
| sessionStorage | 会话级存储 | 临时存储数据（如表单数据、当前登录状态） | 
| Cookie | 可设置过期时间 | 用于存储登录凭证、跨页面数据传输 | 


## **2. localStorage（本地存储）**

- 数据存储在浏览器本地，不会随页面关闭而丢失。

- 存储容量：最大 5MB，适合存储 **非敏感** 持久化数据。

### **📌 操作 localStorage**

```js
// 存储数据
localStorage.setItem("username", "张三");
// 读取数据
console.log(localStorage.getItem("username")); // 输出 "张三"
// 删除单个数据
localStorage.removeItem("username");
// 清空所有数据
localStorage.clear();
```

✅ **应用场景**：

- 持久化存储用户偏好（如深色模式）

- 存储 JWT 令牌（但建议使用 HttpOnly Cookie 代替）

- 存储前端缓存数据（如搜索历史）

## **3. sessionStorage（会话存储）**

- 数据仅在当前页面会话中有效，页面关闭后数据清除。

- 适合存储临时数据（如用户输入的表单数据）。

### **📌 操作 sessionStorage**

```js
// 存储数据
sessionStorage.setItem("sessionKey", "临时数据");
// 读取数据
console.log(sessionStorage.getItem("sessionKey"));
// 删除数据
sessionStorage.removeItem("sessionKey");
// 清空所有 sessionStorage 数据
sessionStorage.clear();
```

✅ **应用场景**：

- 临时存储表单数据，避免页面刷新丢失数据。

- 临时存储搜索结果、筛选条件等会话信息。

## **4. Cookie（用于服务器通信）**

- 数据可以在前端 & 服务器之间传输，支持设置过期时间。

- 大小限制：每个 cookie 最大 4KB。

- 可设置 HttpOnly，使 JavaScript 无法访问，提升安全性。

### **📌 操作 Cookie**

```js
// 设置 cookie（expires 过期时间，path 适用路径）
document.cookie = "username=张三; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// 读取 cookie
console.log(document.cookie);

// 删除 cookie（设置过期时间为过去）
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

```

✅ **应用场景**：

- 存储登录状态（如 session ID）

- 跨页面共享数据（如用户偏好设置）

- 用于服务器身份认证（如 token）

## **5. localStorage vs sessionStorage vs Cookie 对比**

| 特性 | localStorage | sessionStorage | Cookie | 
| -- | -- | -- | -- |
| 生命周期 | 永久存储 | 会话存储 | 可自定义过期时间 | 
| 存储大小 | 约  | 约  | 仅  | 
| 数据作用范围 | 整个网站 | 当前页面会话 | 同源共享，可与服务器交互 | 
| 是否随请求发送 | ❌  | ❌  | ✅  | 
| 适用场景 | 持久化数据（如用户偏好） | 临时数据（如搜索结果） | 服务器身份验证、跨页面数据 | 


## **📌 课后练习**

✅ **练习 1**：使用 localStorage 存储深色模式开关状态，并在页面刷新后保持用户选择的模式。

✅ **练习 2**：使用 sessionStorage 记录当前页面的表单输入，刷新后仍能恢复数据。

✅ **练习 3**：使用 JavaScript 操作 Cookie，存储一个用户登录状态，并在控制台读取它。

## **📌 总结**

✅ **localStorage** 适合长期存储数据，不会随页面关闭丢失。

✅ **sessionStorage** 适合临时存储数据，页面关闭后自动清除。

✅ **Cookie** 适用于跨页面存储 & 服务器通信，但大小有限。

📌 **建议更新你的 JavaScript 大纲，加入这个新章节！** 🚀