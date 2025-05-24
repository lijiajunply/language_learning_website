# Webpack Bundle Analyzer 使用指南

## **1. 什么是 Webpack Bundle Analyzer？**

Webpack Bundle Analyzer 是一个可视化工具，用于分析 Webpack 打包后的文件：

- 生成依赖图：展示每个模块的大小及其依赖关系。

- 优化打包结果：帮助识别冗余代码、未使用的模块以及过大的文件。

## **2. 安装与配置**

### **2.1 安装**

通过 npm 或 yarn 安装：

```
npm install --save-dev webpack-bundle-analyzer
```

或

```
yarn add --dev webpack-bundle-analyzer
```

### **2.2 配置**

在 webpack.config.js 中引入并配置插件：

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 启动本地服务器查看报告
      openAnalyzer: true,     // 打包完成后自动打开浏览器
      generateStatsFile: true, // 生成 stats.json 文件
      statsFilename: 'stats.json', // 指定 stats.json 文件名
    }),
  ],
};
```

### **2.3 运行**

运行 Webpack 打包命令：

```
npx webpack --mode production
```

打包完成后，Webpack Bundle Analyzer 会自动启动一个本地服务器，并在浏览器中打开分析报告。

## **3. 分析报告解读**

### **3.1 报告界面**

- 左侧树状图：展示所有打包文件的依赖关系。

- 右侧矩形图：每个矩形代表一个模块，面积越大表示文件体积越大。

- 颜色区分：

	- 绿色：业务代码。

	- 橙色：第三方库（如 node_modules 中的代码）。

	- 红色：重复代码或未使用的模块。

### **3.2 关键功能**

1. 查看模块大小：

	- 将鼠标悬停在矩形上，显示模块的详细信息（文件名、大小、路径等）。

1. 搜索模块：

	- 在搜索框中输入模块名称，快速定位特定模块。

1. 切换视图：

	- Treemap：默认视图，展示模块的体积和依赖关系。

	- Network：模拟模块加载顺序和依赖关系。

1. 导出报告：

	- 点击右上角的 Export 按钮，导出分析结果为 JSON 文件。

## **4. 高级配置**

### **4.1 自定义端口**

默认情况下，Webpack Bundle Analyzer 会使用 8888 端口。如果端口被占用，可以指定其他端口：

```
new BundleAnalyzerPlugin({
  analyzerPort: 9999, // 使用 9999 端口
});
```

### **4.2 生成静态报告**

如果不希望启动本地服务器，可以生成静态 HTML 报告：

```
new BundleAnalyzerPlugin({
  analyzerMode: 'static', // 生成静态 HTML 文件
  reportFilename: 'report.html', // 指定报告文件名
});
```

### **4.3 仅生成 stats.json 文件**

如果只需要生成 stats.json 文件，可以禁用本地服务器：

```
new BundleAnalyzerPlugin({
  analyzerMode: 'disabled', // 禁用本地服务器
  generateStatsFile: true,  // 生成 stats.json 文件
});
```

## **5. 使用场景**

### **5.1 优化代码分割**

- 识别重复代码：通过分析报告，找到被多个入口引用的模块，提取公共代码。

- 优化动态加载：检查异步加载的模块是否合理。

### **5.2 减少打包体积**

- 删除未使用的模块：通过分析报告，找到未使用的模块并移除。

- 压缩大文件：识别体积过大的模块，优化其加载方式（如懒加载）。

### **5.3 调试依赖关系**

- 分析依赖图：查看模块之间的依赖关系，解决循环依赖问题。

- 验证 Tree Shaking：检查是否成功移除未使用的代码。

## **6. 示例**

### **6.1 配置示例**

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: {
    home: './src/home.js',
    about: './src/about.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true,
    }),
  ],
};
```

### **6.2 分析报告示例**

- 首页入口：home.bundle.js（包含业务代码和部分第三方库）。

- 关于页入口：about.bundle.js（包含业务代码和部分第三方库）。

- 公共代码：vendors.bundle.js（包含 node_modules 中的代码）。

## **7. 总结**

- 作用：Webpack Bundle Analyzer 是一个强大的工具，帮助开发者分析和优化 Webpack 打包结果。

- 核心功能：可视化依赖图、识别冗余代码、优化打包体积。

- 适用场景：代码分割、Tree Shaking、性能优化。

通过合理使用 Webpack Bundle Analyzer，你可以显著提升应用的性能和加载速度！