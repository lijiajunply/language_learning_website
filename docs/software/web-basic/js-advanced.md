# **第十章：JavaScript 进阶**

## **1. 数组与对象操作**

### **1.1 数组（Array）**

数组是一种**有序的数据集合**，用于存储多个值。

```js
let fruits = ["苹果", "香蕉", "橙子"];
console.log(fruits[0]); // 输出 "苹果"
```

✅ **数组索引从 0 开始**

### **1.2 常见数组方法**

| 方法 | 作用 | 
| -- | -- |
| push() | 添加  | 
| pop() | 删除  | 
| shift() | 删除  | 
| unshift() | 添加   | 
| splice() | 删除/替换/插入  | 
| map() | 遍历数组并返回新数组 | 
| filter() | 筛选符合条件的元素 | 
| reduce() | 数组累加计算 | 


```js
let numbers = [1, 2, 3, 4, 5];
let squared = numbers.map(num => num * num);
console.log(squared); // [1, 4, 9, 16, 25]
```

✅ **map() 适用于转换数组**

### **1.3 对象（Object）**

对象是**键值对的集合**，用于存储复杂数据。

```js
let person = {
    name: "张三",
    age: 25,
    greet: function() {
        console.log("你好，我叫 " + this.name);
    }
};
person.greet(); // 输出 "你好，我叫 张三"

```

✅ **对象属性可包含函数（方法）**

### **1.4 遍历对象**

```js
for (let key in person) {
    console.log(key + ": " + person[key]);
}
```

✅ **for...in 遍历对象属性**

## **2. 异步编程**

JavaScript 是**单线程**的，异步编程用于执行 **耗时任务（网络请求、定时器）**。

### **2.1 setTimeout()**

setTimeout() **延迟执行代码**。

```js
console.log("开始");
setTimeout(() => {
    console.log("延迟 2 秒后执行");
}, 2000);
console.log("结束");

```

✅ **不会阻塞后续代码执行**

### **2.2 Promise**

**Promise** 解决了回调地狱问题，提供**then、catch、finally** 处理异步操作。

```js
let fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        let success = true;
        if (success) resolve("数据加载成功");
        else reject("加载失败");
    }, 2000);
});

fetchData
    .then(data => console.log(data))
    .catch(error => console.log(error));
```

✅ **resolve 触发 then()，reject 触发 catch()**

### **2.3 async/await**

async/await 是 **Promise 的语法糖**，让异步代码更像同步代码。

```js
async function fetchData() {
    try {
        let response = await new Promise(resolve => setTimeout(() => resolve("数据加载成功"), 2000));
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
fetchData();

```

✅ **await 等待 Promise 结果，代码更清晰**

## **3. AJAX 与 Fetch API**

### **3.1 什么是 AJAX？**

AJAX（Asynchronous JavaScript and XML）用于 **在不刷新页面的情况下与服务器通信**。

✅ **主要用途**

- 获取数据（如 JSON）

- 发送表单

- 动态更新页面

### **3.2 fetch() 请求数据**

fetch() 是 ES6 提供的 **现代 AJAX 方式**，替代 XMLHttpRequest。

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json()) // 解析 JSON
    .then(data => console.log(data))
    .catch(error => console.log("请求失败", error));

```

```javascript
// 要发送的数据
const postData = {
    title: "foo",
    body: "bar",
    userId: 1,
};

// 发起 POST 请求
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST", // 请求方法
    headers: {
        "Content-Type": "application/json", // 请求头，指定发送的数据类型为 JSON
    },
    body: JSON.stringify(postData), // 请求体，将数据转换为 JSON 字符串
})
    .then((response) => response.json()) // 解析响应为 JSON
    .then((data) => console.log("请求成功:", data)) // 处理响应数据
    .catch((error) => console.log("请求失败:", error)); // 捕获错误
```

### 代码说明：

✅ **比 XMLHttpRequest 更简单**

```javascript
// 创建一个新的 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();

// 配置请求类型、URL 和异步标志
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

// 设置请求完成时的回调函数
xhr.onload = function () {
    // 检查请求是否成功（状态码 200 表示成功）
    if (xhr.status >= 200 && xhr.status < 300) {
        // 解析响应数据为 JSON
        var data = JSON.parse(xhr.responseText);
        console.log(data);
    } else {
        // 请求失败时输出错误信息
        console.log("请求失败", xhr.statusText);
    }
};

// 设置请求出错时的回调函数
xhr.onerror = function () {
    console.log("请求失败", xhr.statusText);
};

// 发送请求
xhr.send();
```

### 代码说明：

### **3.3 async/await 结合 fetch()**

```js
async function getData() {
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("请求失败", error);
    }
}
getData();

```

✅ **更易读、易维护**

Promise 版本

```javascript
function getData() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => {
            if (!response.ok) {
                throw new Error("网络响应不正常");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log("请求失败", error);
        });
}

getData();
```

### 解释：

## **4. ES6+ 新特性**

### **4.1 模板字符串（Template Literals）**

ES6 允许使用反引号 ` 创建 **多行字符串**，并用 ${} 插入变量。

```js
let name = "张三";
let message = `你好，${name}！欢迎学习 JavaScript。`;
console.log(message);
```

✅ **避免字符串拼接的麻烦**

### **4.2 解构赋值**

**快速提取数组和对象的值**。

```js
let [a, b] = [10, 20];
console.log(a, b); // 输出 10 20

let person = { name: "李四", age: 30 };
let { name, age } = person;
console.log(name, age); // 输出 "李四" 30

```

✅ **代码更简洁**

### **4.3 扩展运算符（...）**

**用于数组合并、克隆对象等**。

```js
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }

```

✅ **避免 concat() 和 Object.assign() 的冗长写法**

### **4.4 模块化（import/export）**

**ES6 支持模块化开发**，可拆分代码，提高可维护性。

#### **导出模块**

```js
// math.js
export function add(a, b) {
    return a + b;
}
export const PI = 3.14;

```

#### **导入模块**

```js
// main.js
import { add, PI } from './math.js';
console.log(add(2, 3)); // 5
console.log(PI); // 3.14

```

✅ **避免全局变量污染，适用于大型项目**

## **5. 课后练习**

### **5.1 实践任务**

1. 创建数组并使用 **map() 计算每个元素的平方**

1. 使用 **Promise 模拟 2 秒后返回数据**

1. 用 **fetch() 获取 **

1. 用 **async/await 发送 AJAX 请求**

1. 使用解构赋值获取对象 **name 和 age**

## **6. 总结**

✅ **数组方法 map()、filter()、reduce() 操作数据**

✅ **Promise 解决异步回调问题，async/await 让代码更直观**

✅ **fetch() 现代化 AJAX 请求，支持 JSON**

✅ **ES6+ 提供模板字符串、解构赋值、扩展运算符**

✅ **模块化 import/export 让代码更结构化**

📌 **下一步**：学习 **DOM 操作，控制网页内容！**