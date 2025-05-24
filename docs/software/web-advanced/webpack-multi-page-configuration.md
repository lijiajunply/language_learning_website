# **教学目标**

1. 理解 Webpack 多页面应用（MPA）的配置方法。

1. 掌握如何为每个 HTML 页面单独引用对应的入口 JS 文件。

1. 学会提取公共代码，优化打包结果。

## **教学内容**

### **1. 问题背景**

默认情况下，HtmlWebpackPlugin 会将所有入口的 JS 文件注入到每个 HTML 页面中。但在多页面应用中，我们希望每个 HTML 页面只引用其对应的入口 JS 文件。

### **2. 解决方案**

通过配置 HtmlWebpackPlugin 的 chunks 选项，为每个页面指定需要注入的 JS 文件。

### **3. 具体步骤**

#### **3.1 项目结构**

```bash
src/
├── pages/
│   ├── home/
│   │   ├── index.html     # 首页模板
│   │   └── index.js       # 首页入口
│   └── about/
│       ├── index.html     # 关于页模板
│       └── index.js       # 关于页入口
public/                    # 静态资源（图片等）
webpack.config.js
```

#### **3.2 修改**** webpack.config.js**

在 HtmlWebpackPlugin 中为每个页面指定 chunks，确保只注入相关的 JS 文件。

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: './src/pages/home/index.js', // 首页入口
    about: './src/pages/about/index.js', // 关于页入口
  },
  output: {
    filename: '[name].bundle.js', // 动态生成文件名
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    // 首页配置
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: 'home.html',
      chunks: ['home'], // 只注入 home 入口的 JS
    }),
    // 关于页配置
    new HtmlWebpackPlugin({
      template: './src/pages/about/index.html',
      filename: 'about.html',
      chunks: ['about'], // 只注入 about 入口的 JS
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    static: './dist',
    hot: true,
    open: ['/home.html'], // 默认打开首页
  },
};
```

#### **3.3 示例代码**

src/pages/home/index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>首页</title>
</head>
<body>
  <h1>这是首页</h1>
  <div id="app"></div>
</body>
</html>
```

运行 HTML

src/pages/home/index.js

```
console.log('这是首页的 JS 文件');
```

src/pages/about/index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>关于我们</title>
</head>
<body>
  <h1>这是关于页</h1>
  <div id="app"></div>
</body>
</html>
```

运行 HTML

src/pages/about/index.js

```javascript
console.log('这是关于页的 JS 文件');
```

#### **3.4 运行结果**

- 打包后生成 dist/home.html 和 dist/about.html。

- home.html 只引用 home.bundle.js。

- about.html 只引用 about.bundle.js。

### **4. 高级配置**

#### **4.1 提取公共代码**

如果多个页面共享某些代码（如公共库），可以使用 optimization.splitChunks 提取公共代码：

```
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
      },
    },
  },
},
```

然后在 HtmlWebpackPlugin 中注入公共代码：

```
chunks: ['vendors', 'home'] // 首页注入 vendors 和 home
```

#### **4.2 动态生成配置**

如果页面较多，可以通过动态生成配置减少重复代码：

```javascript
const pages = [
  { name: 'home', title: '首页' },
  { name: 'about', title: '关于我们' },
];

module.exports = {
  entry: pages.reduce((entries, page) => {
    entries[page.name] = `./src/pages/${page.name}/index.js`;
    return entries;
  }, {}),
  plugins: pages.map(page => 
    new HtmlWebpackPlugin({
      template: `./src/pages/${page.name}/index.html`,
      filename: `${page.name}.html`,
      chunks: [page.name], // 动态注入对应入口
      title: page.title,
    })
  ),
};
```

### **5. 总结**

- 核心配置：通过 HtmlWebpackPlugin 的 chunks 选项控制每个 HTML 页面引用的 JS 文件。

- 优化建议：

	- 提取公共代码，减少重复加载。

	- 动态生成配置，简化多页面管理。

- 适用场景：多页面应用（MPA）或需要独立入口的复杂项目。

## **课后练习**

1. 创建一个包含 3 个页面的项目，分别为 home、about 和 contact，每个页面引用不同的入口 JS 文件。

1. 配置 optimization.splitChunks，提取 node_modules 中的代码到 vendors.bundle.js。

1. 使用 Webpack Bundle Analyzer 分析打包结果，验证公共代码是否被正确提取。

## **参考资料**

- Webpack 官方文档：

- HtmlWebpackPlugin 文档：

- Webpack Bundle Analyzer：