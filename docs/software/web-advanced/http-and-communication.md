# **HTTP 与 Web 通信**

## **1. HTTP 协议的作用**

✅ **客户端（浏览器）和服务器之间的通信标准**

## **2. 请求-响应模型**

```http
GET /index.html HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0

```

✅ **请求头包含 User-Agent、Accept 等信息**

## **3. RESTful API 简介**

| 方法 | 作用 | 示例 | 
| -- | -- | -- |
| GET | 获取资源 | /users/1 | 
| POST | 创建资源 | /users | 
| PUT | 更新资源 | /users/1 | 
| DELETE | 删除资源 | /users/1 | 


✅ **JSON 是 API 主要数据格式**

```json
{
    "id": 1,
    "name": "张三"
}

```

## **4. HTTPS 与安全性**

### **4.1 HTTPS 如何工作？**

1. 浏览器请求 HTTPS 站点

1. 服务器返回 SSL 证书

1. 浏览器验证证书，并建立加密连接

1. 数据加密传输，防止窃听

✅ **HTTPS 保护用户隐私，防止攻击**

# **总结**

✅ **前端框架（React、Vue、Angular）提升开发效率**

✅ **后端基础（RESTful API、Node.js）实现前后端分离**

✅ **Web 安全（XSS、CSRF、HTTPS）保护数据**

✅ **HTTP 让前后端通信更加标准化**

📌 **下一步**：持续学习，迈向全栈开发！