# **第八章：JavaScript 基础**

## **1. JavaScript 简介与引入方式**

### **1.1 什么是 JavaScript？**

JavaScript（简称 JS）是一种**基于浏览器的脚本语言**，用于**实现网页交互**，如**动态内容、事件处理、数据操作**等。

✅ **前端三大核心技术**

- HTML：负责网页结构

- CSS：负责网页样式

- JavaScript：负责网页交互

✅ **JavaScript 主要用途**

- 动态修改 HTML 和 CSS（如按钮点击改变颜色）

- 处理用户输入（如表单验证）

- 发送网络请求（如 Ajax 获取数据）

- 实现动画效果（如轮播图）

### **1.2 JavaScript 的引入方式**

#### **1. 内联 JavaScript**

直接在 HTML 标签内使用 onclick 等事件属性。

```html
<button onclick="alert('Hello, JavaScript!')">点击我</button>
```

✅ **适用于简单功能，不推荐大量使用**

#### **2. 内部 JavaScript**

在 HTML 页面中的 `<script>` 标签内编写 JS 代码。

```html
<script>
    alert("欢迎访问我的网站！");
</script>
```

✅ **适用于小型脚本**

#### **3. 外部 JavaScript**

将 JavaScript 代码写在 .js 文件中，并用 `<script>` 引入。

```html
<script src="script.js"></script>
```

**script.js 文件**

```js
alert("这是外部 JavaScript 文件！");
```

✅ **推荐使用，代码结构清晰，可复用**

## **2. 变量与数据类型**

### **2.1 变量的声明**

在 JavaScript 中，可以使用 var、let 和 const 声明变量。

| 关键字 | 作用 | 作用域 | 是否可修改 | 
| -- | -- | -- | -- |
| var | 旧版变量声明方式， | 函数作用域 | ✅ 可修改 | 
| let | 推荐 | 块级作用域 | ✅ 可修改 | 
| const | 常量 | 块级作用域 | ❌ 不能修改 | 


```js
var name = "张三";  // 旧方式（不推荐）
let age = 25;       // 推荐
const PI = 3.1415;  // 常量，不能修改

```

✅ **推荐使用 let 和 const，避免 var 造成作用域问题**

### **2.2 数据类型**

JavaScript 主要有 6 种基本数据类型：

| 数据类型 | 说明 | 示例 | 
| -- | -- | -- |
| String | 字符串 | "Hello" | 
| Number | 数字（整数或小数） | 100, 3.14 | 
| Boolean | 布尔值 | true, false | 
| Undefined | 未定义 | let x; | 
| Null | 空值 | let y = null; | 
| Symbol | 唯一值 | Symbol('id') | 


## **3. 运算符与表达式**

JavaScript 主要有**算术运算符、比较运算符、逻辑运算符**等。

### **3.1 算术运算符**

| 运算符 | 作用 | 示例 | 
| -- | -- | -- |
| + | 加法 | 5 + 3 = 8 | 
| - | 减法 | 10 - 5 = 5 | 
| * | 乘法 | 4 * 2 = 8 | 
| / | 除法 | 8 / 2 = 4 | 
| % | 取余 | 10 % 3 = 1 | 
| ** | 幂运算 | 2 ** 3 = 8 | 


```js
let a = 10;
let b = 3;
console.log(a + b);  // 输出 13
console.log(a % b);  // 输出 1
```

### **3.2 比较运算符**

| 运算符 | 作用 | 示例 | 
| -- | -- | -- |
| == | 等于（值相等） | "5" == 5 ✅ | 
| === | 全等（值和类型相等） | "5" === 5 ❌ | 
| != | 不等于 | 10 != 5 ✅ | 
| < | 小于 | 5 < 10 ✅ | 
| > | 大于 | 20 > 15 ✅ | 


```js
console.log(5 == "5");  // true
console.log(5 === "5"); // false
```

✅ **推荐使用 ===，避免类型转换问题**

### **3.3 逻辑运算符**

| 运算符 | 作用 | 示例 | 
| -- | -- | -- |
| && | 与（AND） | true && false ❌ | 
| || | 或（OR） | true && false ✅ | 
| ! | 非（NOT） | !true ❌ | 


```js
let x = 5;
let y = 10;
console.log(x > 0 && y > 5); // true
console.log(x < 0 || y > 5); // true
console.log(!(x > 0));       // false
```

## **4. 条件语句（if-else、switch）**

### **4.1 if-else 语句**

```js
let score = 85;

if (score >= 90) {
    console.log("优秀");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}

```

✅ **if-else 用于判断不同情况**

### **4.2 switch 语句**

```js
let fruit = "apple";

switch (fruit) {
    case "apple":
        console.log("苹果");
        break;
    case "banana":
        console.log("香蕉");
        break;
    default:
        console.log("未知水果");
}

```

✅ **switch 适用于**多选一**的情况**

## **5. 循环语句（for、while、do-while）**

### **5.1 for 循环**

```js
for (let i = 0; i < 5; i++) {
    console.log("循环次数：" + i);
}

```

✅ **适用于已知循环次数的情况**

### **5.2 while 循环**

```js
let i = 0;
while (i < 5) {
    console.log("while循环：" + i);
    i++;
}
```

✅ **适用于循环次数不确定的情况**

### **5.3 do-while 循环**

```js
let i = 0;
do {
    console.log("do-while 循环：" + i);
    i++;
} while (i < 5);
```

✅ **即使条件不满足，也会至少执行一次！**

## **6. 课后练习**

### **6.1 实践任务**

1. 创建一个 **if-else 语句，判断输入的年龄是否成年**

1. 编写 **for 循环，输出 1 到 10**

1. 用 **switch 语句实现简单的计算器**

1. 使用 **while 计算 1+2+3+...+100 的和**

## **7. 总结**

✅ **JavaScript 可内联、内部、外部引入**

✅ **推荐使用 let 和 const 声明变量**

✅ **逻辑运算符 &&、||、! 处理布尔逻辑**

✅ **if-else 处理条件，switch 处理多选一**

✅ **for、while 适用于不同场景的循环**

📌 **下一步**：学习 **JavaScript 函数与作用域！**