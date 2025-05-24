# **第九章：函数与作用域**

## **1. 函数定义与调用**

### **1.1 什么是函数？**

**函数（Function）** 是一组**可复用的代码块**，用于执行特定任务，提高代码复用性。

✅ **函数的作用**

- 封装代码逻辑，避免重复代码

- 提高代码可读性

- 降低维护成本

### **1.2 定义函数的方式**

JavaScript 提供 **三种** 定义函数的方式：

#### **1.2.1 传统函数（function 关键字）**

```js
function greet() {
    console.log("Hello, JavaScript!");
}
greet(); // 调用函数

```

#### **1.2.2 函数表达式（匿名函数）**

```js
let greet = function() {
    console.log("Hello, JavaScript!");
};
greet();
```

✅ **区别：函数表达式不会被提升（hoisting）**

#### **1.2.3 箭头函数（ES6）**

```js
const greet = () => {
    console.log("Hello, JavaScript!");
};
greet();
```

✅ **箭头函数语法更简洁（后面详细讲解）**

## **2. 参数与返回值**

### **2.1 传递参数**

**函数可以接收参数，用于动态计算结果。**

```js
function add(a, b) {
    console.log(a + b);
}
add(5, 3); // 输出 8

```

### **2.2 返回值**

**return 语句可返回计算结果。**

```js
function multiply(a, b) {
    return a * b;
}
let result = multiply(4, 5);
console.log(result); // 输出 20

```

### **2.3 默认参数**

ES6 允许给参数指定默认值：

```js
function greet(name = "Guest") {
    console.log("Hello, " + name);
}
greet();        // 输出 Hello, Guest
greet("Alice"); // 输出 Hello, Alice

```

✅ **适用于未传递参数的情况**

## **3. 作用域与闭包**

### **3.1 作用域**

**作用域（Scope）** 指**变量的可见范围**，分为：

| 类型 | 说明 | 
| -- | -- |
| 全局作用域 | 在任何地方都能访问 | 
| 函数作用域 | 变量仅在函数内部可用 | 
| 块级作用域 | 仅在 {} 内部有效（let、const） | 


```js
let globalVar = "我是全局变量";

function test() {
    let localVar = "我是函数内变量";
    console.log(globalVar); // ✅ 可访问
}
test();
console.log(localVar); // ❌ 报错（超出作用域）
```

✅ **全局变量在任何地方都能访问，而局部变量仅限于函数内**

### **3.2 闭包（Closure）**

**闭包是指**：**函数内部可以访问外部函数的变量，即使外部函数已执行完毕**。

```js
function outer() {
    let count = 0;
    return function inner() {
        count++;
        console.log(count);
    };
}
let counter = outer();
counter(); // 输出 1
counter(); // 输出 2

```

✅ **闭包特性**

1. 能访问外部函数变量

1. 变量不会被销毁

1. 适用于计数器、数据缓存等场景

## **4. 箭头函数**

### **4.1 箭头函数的语法**

ES6 引入 **箭头函数（Arrow Function）**，语法更简洁。

```js
// 传统函数
function add(a, b) {
    return a + b;
}

// 箭头函数
const add = (a, b) => a + b;

console.log(add(5, 3)); // 输出 8

```

✅ **箭头函数特点**

1. 省略 **function 关键字**

1. 参数只有一个时，括号可省略

1. 只有一行返回值时，**return 可省略**

### **4.2 this 指向问题**

**箭头函数不会创建自己的 this，而是继承外部作用域的 this。**

#### **示例 1：普通函数的 this**

```js
const obj = {
    name: "Alice",
    greet: function() {
        console.log(this.name);
    }
};
obj.greet(); // 输出 Alice

```

#### **示例 2：箭头函数的 this**

```js
const obj = {
    name: "Alice",
    greet: () => {
        console.log(this.name);
    }
};
obj.greet(); // 输出 undefined（`this` 不是 `obj`）

```

✅ **箭头函数适合 setTimeout 等回调函数**

```js
setTimeout(() => {
    console.log("1 秒后执行");
}, 1000);

```

## **5. 课后练习**

### **5.1 实践任务**

1. 创建一个函数 **sum，计算两个数的和，并返回结果**

1. 使用函数表达式定义一个 **square，计算平方**

1. 写一个 **factorial(n) 递归函数，计算 n!**

1. 使用闭包创建一个计数器函数

1. 用箭头函数改写 **sum 和 square**

## **6. 总结**

✅ **JavaScript 函数支持三种定义方式**（普通、表达式、箭头）

✅ **return 语句可返回计算结果**

✅ **作用域决定变量可见范围，闭包可保持变量状态**

✅ **箭头函数语法简洁，但 this 继承外部作用域**

📌 **下一步**：学习 **JavaScript 进阶（数组、对象、异步编程）！**