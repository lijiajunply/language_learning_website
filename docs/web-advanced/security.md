# **Web 安全**

## **1. 常见 Web 攻击**

✅ **防止数据泄露，确保用户信息安全**

| 攻击类型 | 说明 | 解决方案 | 
| -- | -- | -- |
| XSS（跨站脚本攻击） | 插入恶意 JS | 输入过滤、CSP | 
| CSRF（跨站请求伪造） | 伪造用户操作 | CSRF Token 验证 | 
| SQL 注入 | 通过输入框执行 SQL | 使用预处理语句 | 
| DDoS 攻击 | 短时间大量请求导致服务器崩溃 | 限流、CDN 防护 | 


## **2. 防御措施**

### **2.1 防止 XSS**

```html
<input type="text" oninput="alert('XSS 攻击！')">

```

✅ **禁止直接执行用户输入的 HTML**

```js
element.innerText = userInput; // 而不是 innerHTML

```

### **2.2 防止 CSRF**

✅ **使用 CSRF Token**

```html
<input type="hidden" name="csrf_token" value="安全的 token">

```

### **2.3 使用 HTTPS**

✅ **数据加密，防止中间人攻击**

```txt
HTTP → 明文传输（不安全）
HTTPS → 加密传输（安全）

```