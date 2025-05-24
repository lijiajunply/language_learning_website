# **后端基础**

## **1. HTTP 协议与 RESTful API**

✅ **前端与后端的核心交互方式**

### **1.1 HTTP 请求示例**

```http
GET /api/users HTTP/1.1
Host: example.com

```

- GET 获取数据

- POST 发送数据

- PUT 更新数据

- DELETE 删除数据

### **1.2 RESTful API 设计**

```json
{
    "id": 1,
    "name": "张三",
    "email": "zhangsan@example.com"
}

```

✅ **JSON 作为标准数据格式**

## **2. Node.js 简介**

✅ **Node.js 是 JavaScript 运行环境**，可用于后端开发。

```js
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js!");
});

server.listen(3000);
console.log("服务器运行在 

```

✅ **可用于构建 API、服务器端渲染等**

## **3. 前后端分离开发模式**

✅ **前端负责 UI 和交互，后端提供 API**

```txt
前端（React/Vue） → 发送请求 → 后端（Node.js/Python/Java） → 返回 JSON 数据

```

✅ **提升开发效率，便于团队协作**