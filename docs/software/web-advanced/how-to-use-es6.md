# ES6 如何使用

### **一、基础条件**

1. JavaScript 运行环境支持

	- 浏览器：现代浏览器（如 Chrome、Edge、Firefox、Safari）已原生支持大部分 ES6 特性。

		- 检查兼容性：

	- Node.js：Node.js 6+ 开始支持部分 ES6 特性，建议使用 Node.js 12+ 或更高版本以获得完整支持。

1. 开发工具支持

	- 代码编辑器/IDE：如 VS Code、WebStorm 等需支持 ES6 语法高亮和提示（现代编辑器默认支持）。

### **二、兼容旧环境的额外条件**

如果代码需在**不支持 ES6 的旧环境**（如 IE11、旧版移动浏览器）中运行，需通过以下工具链处理：

#### 1. **转译器（Transpiler）**

- Babel：将 ES6+ 代码转换为 ES5 代码。

	- 安装 Babel 核心包和预设：

```shell
npm install @babel/core @babel/preset-env --save-dev
```

	- 配置 .babelrc：

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### 2. **打包工具（Bundler）**

- Webpack/Rollup/Parcel：配合 Babel 实现代码打包和转译。

	- 示例（Webpack + Babel）：

1. 安装依赖：

```shell
npm install webpack webpack-cli babel-loader --save-dev
```

1. 配置 webpack.config.js：

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' }
    }]
  }
};
```

#### 3. **Polyfill**

- core-js 或 **@babel/polyfill**：为旧环境提供 ES6+ 新 API（如 Promise、Array.from）。

	- 安装并引入：

```shell
npm install core-js --save
```

```javascript
import "core-js/stable";
```

### **三、开发流程条件**

1. 模块化语法支持

	- 使用 import/export 模块化语法时，需通过打包工具（Webpack 等）处理，或在浏览器中声明 type="module"：

```xml
<script type="module" src="app.js"></script>
```

运行 HTML

1. 严格模式

	- ES6 模块和 class 默认启用严格模式，需避免使用非严格模式语法（如未声明的变量）。

### **四、其他注意事项**

1. 浏览器特性支持

	- 部分 ES6+ 特性（如 Proxy、Web Workers）可能依赖浏览器 API，需单独测试兼容性。

1. Node.js 的特殊配置

	- 在 Node.js 中使用 ES6 模块需：

		- 将文件扩展名改为 .mjs，或在 package.json 中设置 "type": "module"。

1. TypeScript 支持

	- 如果使用 TypeScript，需配置 tsconfig.json 的 target 为 ES6 或更高：

```
{
  "compilerOptions": {
    "target": "ES6"
  }
}
```

### **五、总结**

- 现代环境：直接使用 ES6，无需额外条件。

- 旧环境：需通过 **Babel + 打包工具 + Polyfill** 实现兼容。

- Node.js：建议使用 Node.js 12+，并通过 package.json 配置模块类型。

合理配置工具链后，ES6 可安全用于生产环境，提升代码可读性和开发效率。