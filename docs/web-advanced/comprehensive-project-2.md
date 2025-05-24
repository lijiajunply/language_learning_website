# **综合项目：购物车功能开发**

## 目标

1. 使用 Webpack 打包模块化代码

1. 通过 fetch() 模拟异步获取商品数据

1. 实现购物车添加/删除/计算总价功能

1. 应用 ES6+ 特性（解构、模板字符串、箭头函数）

## 1. 项目结构

```
webpack-demo/
├── src/
│   ├── index.js       # 入口文件
│   ├── api.js         # 模拟数据请求
│   ├── cart.js        # 购物车逻辑
│   └── styles.css     # 样式
├── public/
│   └── index.html     # HTML 模板
├── package.json
└── webpack.config.js
```

空文件创建好之后，请执行：

```bash
npm init -y
npm install webpack webpack-cli --save-dev
```

## 2. 核心代码实现

### 2.**1 api.js - 模拟异步请求**

```javascript
// 模拟获取商品数据（使用 Promise）
export const fetchProducts = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "苹果", price: 5 },
        { id: 2, name: "香蕉", price: 3 },
        { id: 3, name: "橙子", price: 4 }
      ]);
    }, 1000);
  });
};
```

### **2.2 cart.js - 购物车逻辑**

```javascript
export class Cart {
  constructor() {
    this.items = [];
  }

  // 添加商品（使用数组操作）
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
  }

  // 删除商品（使用 filter）
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  // 计算总价（使用 reduce）
  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // 获取商品列表（返回副本避免直接修改）
  getItems() {
    return [...this.items];
  }
}
```

### **2.3 index.js - 主入口**

```javascript
import { fetchProducts } from './api';
import { Cart } from './cart';
import './styles.css';

// 初始化购物车
const cart = new Cart();
// 全局变量（注意：实际项目中应避免过多全局变量，这里为简化示例）
let products = [];
// DOM 操作
const renderProducts = async () => {
  products = await fetchProducts();
  const productList = document.getElementById('product-list');
  
  // 使用模板字符串生成 HTML
  productList.innerHTML = products.map(product => `
    <div class="product">
      <h3>${product.name}</h3>
      <p>价格：¥${product.price}</p>
      <button onclick="addToCart(${product.id})">加入购物车</button>
    </div>
  `).join('');
};

// 全局函数（实际项目应避免，这里简化演示）
window.addToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  cart.addItem(product);
  updateCartDisplay();
};

const updateCartDisplay = () => {
  const cartItems = document.getElementById('cart-items');
  const total = document.getElementById('total-price');
  
  // 使用解构和 map
  cartItems.innerHTML = cart.getItems().map(({ id, name, price, quantity }) => `
    <li>
      ${name} × ${quantity} 
      <button onclick="removeFromCart(${id})">删除</button>
    </li>
  `).join('');
  
  total.textContent = `总价：¥${cart.calculateTotal()}`;
};

window.removeFromCart = (productId) => {
  cart.removeItem(productId);
  updateCartDisplay();
};

// 初始化渲染
renderProducts();
```

## 3. Webpack 配**置 (webpack.config.js)**

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devServer: {
    static: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

## 4. 配套文件

### **public/index.html**

```html
<!DOCTYPE html>
<html>
<head>
  <title>购物车练习</title>
</head>
<body>
  <h1>商品列表</h1>
  <div id="product-list"></div>
  
  <h2>购物车</h2>
  <ul id="cart-items"></ul>
  <p id="total-price">总价：¥0</p>
</body>
</html>
```

运行 HTML

### **src/styles.css**

```css
.product {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
```

## 5. 运行流程

1. 安装依赖：

```shell
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader babel-loader @babel/core @babel/preset-env --save-dev

or

npm install webpack webpack-cli webpack-dev-server --save-dev
npm install html-webpack-plugin --save-dev
npm install style-loader css-loader --save-dev
npm install babel-loader @babel/core @babel/preset-env --save-dev

or

npm install webpack --save-dev
npm install webpack-cli --save-dev
npm install webpack-dev-server --save-dev
npm install html-webpack-plugin --save-dev
npm install style-loader --save-dev
npm install css-loader --save-dev
npm install babel-loader --save-dev
npm install @babel/core --save-dev
npm install @babel/preset-env --save-dev
```

1. 启动开发服务器：

```shell
npx webpack serve
```

1. 访问 

## 6. 关键知识点验证

1. 模块化：import/export 分割代码

1. 异步操作：fetchProducts 使用 Promise 模拟

1. Webpack 打包：CSS 和 JS 合并到 bundle.js

1. ES6+ 特性：箭头函数、模板字符串、解构赋值

1. 数据操作：数组方法 map/filter/reduce 的应用

通过这个练习，你可以直观看到 Webpack 如何整合模块、Babel 如何转译代码、以及现代 JavaScript 如何组织复杂功能。