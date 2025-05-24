# **第二章：HTML表单与输入**

## **1. 表单标签（`<form>`）**

### **1.1 什么是 HTML 表单？**

HTML 表单（Form）是用于收集用户输入数据的结构，常用于**用户注册、登录、搜索、提交信息等**。表单的核心标签是 `<form>`，它包含多个输入控件，如文本框、按钮、复选框等。

### **1.2 `<form>` 标签的基本语法**

```html
<form action="submit.php" method="POST">
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username">
    <button type="submit">提交</button>
</form>

```

### **1.3 `<form>` 标签的常用属性**

| 属性 | 作用 | 
| -- | -- |
| action | 指定表单提交的目标 URL（如 submit.php） | 
| method | 表单提交方式（GET 或 POST） | 
| enctype | 数据编码方式（文件上传时需设为 multipart/form-data） | 
| target | 目标窗口（如 _blank、_self） | 
| novalidate | 取消 HTML5 原生表单验证 | 


## **2. 输入类型（`<input>、<textarea>、<select>、<button>`）**

HTML 提供多种表单输入控件，用于收集不同类型的数据。

### **2.1 文本输入（`<input type="text">`）**

```html
<label for="name">姓名：</label>
<input type="text" id="name" name="name" placeholder="请输入您的姓名"/>

```

- type="text"：用于输入普通文本。

- placeholder：提供提示文本。

- name：提交数据时的字段名称。

### **2.2 密码输入（`<input type="password">`）**

```html
<label for="password">密码：</label>
<input type="password" id="password" name="password"/>

```

- 输入时文本会被隐藏。

### **2.3 电子邮件输入（`<input type="email">`）**

```html
<label for="email">邮箱：</label>
<input type="email" id="email" name="email" required/>

```

- type="email"：只能输入符合电子邮件格式的数据。

- required：必填项。

### **2.4 数字输入（`<input type="number">`）**

```html
<label for="age">年龄：</label>
<input type="number" id="age" name="age" min="1" max="100"/>

```

- min/max：限制输入范围。

### **2.5 复选框（`<input type="checkbox">`）**

```html
<label>
    <input type="checkbox" name="agree"> 我同意条款</input>
</label>

```

- 适用于**多选**选项。

### **2.6 单选框（`<input type="radio">`）**

```html
<label><input type="radio" name="gender" value="male"> 男</label>
<label><input type="radio" name="gender" value="female"> 女</label>
```

- 多个单选框的 **name 属性相同，保证只能选择一个选项**。

### **2.7 文本区域（`<textarea>`）**

```html
<label for="message">留言：</label>
<textarea id="message" name="message" rows="4" cols="50"></textarea>
```

- rows 和 cols 控制大小，适用于**多行文本输入**。

### **2.8 下拉选择框（`<select>`）**

```html
<label for="city">选择城市：</label>
<select id="city" name="city">
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</select>
```

- `<option>` 定义可选项，**默认选项是第一个**。

### **2.9 提交按钮（`<button>`）**

```html
<button type="submit">提交</button>
<button type="reset">重置</button>
<button type="button">普通按钮</button>
```

| 类型 | 作用 | 
| -- | -- |
| type="submit" | 提交表单 | 
| type="reset" | 重置表单 | 


## **3. 表单属性（action、method、name、placeholder、required）**

### **3.1 action（提交地址）**

```html
<form action="submit.php">
```

- 指定**提交表单的目标 URL**。

### **3.2 method（提交方式）**

```html
<form method="POST">
```

`<form>` 元素默认只支持 GET 和 POST 方法，不支持 PUT、DELETE 等其他 HTTP 方法。这是因为 HTML 表单的设计初衷是为了处理简单的数据提交，而 GET 和 POST 是最常用的两种方法。

| 提交方式 | 作用 | 
| -- | -- |
| GET | 参数显示在 URL 上，适用于查询 | 
| POST | 数据不会显示在 URL 上，适用于敏感数据 | 


### **3.3 name（表单字段名称）**

```html
<input type="text" name="username">
```

- name 用于**表单数据提交时的字段标识**。

### **3.4 placeholder（占位提示文本）**

```html
<input type="text" placeholder="请输入您的姓名">
```

- 显示**提示信息**，但不会提交。

### **3.5 required（必填字段）**

```html
<input type="email" required>
```

- 必须填写才能提交表单。

## **4. 表单验证（HTML5 原生验证）**

HTML5 提供了原生的表单验证机制。

### **4.1 必填验证（required）**

```html
<input type="text" required>
```

- 用户必须输入值才能提交。

### **4.2 最小值/最大值（min / max）**

```html
<input type="number" min="18" max="60">
```

- 限制**数值范围**。

### **4.3 最小长度/最大长度（minlength / maxlength）**

```html
<input type="text" minlength="3" maxlength="10">
```

- 限制**字符长度**。

### **4.4 正则表达式匹配（pattern）**

```html
<input type="text" pattern="[A-Za-z]{3,10}" title="请输入3-10个字母"/>
```

- 只允许**3-10个字母**。

### **4.5 电子邮件格式验证（type="email"）**

```html
<input type="email">
```

- 只能输入符合**邮箱格式**的内容。

### **4.6 URL 格式验证（type="url"）**

```html
<input type="url">
```

- 只能输入符合**URL 格式**的内容。

## **5. 课后练习**

### **5.1 实践任务**

1. 创建一个简单的用户注册表单

，包括：

	- 用户名（text）

	- 密码（password）

	- 性别（radio）

	- 爱好（checkbox）

	- 所在城市（select）

	- 自我介绍（textarea）

	- 提交按钮

1. 修正以下错误代码

```html
<form action=submit.php method=get>
    <input type=text name=username>
    <button type=submit>提交</button>
</form>
```

1. 思考题

	- GET 和 POST 的区别？

	- 什么时候使用 required，什么时候使用 JavaScript 进行验证？

## **6. 总结**

✅ ** `<form>` 结构用于收集用户数据**

✅ **不同类型的 `<input>` 控件适用于不同的数据输入**

✅ **HTML5 提供了简单易用的表单验证机制**

📌 **下一步**：学习 **HTML 多媒体与语义化标签**！