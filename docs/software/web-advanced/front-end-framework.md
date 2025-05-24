# **前端框架简介**

## **1. 为什么需要前端框架？**

前端框架可以**提高开发效率**，帮助开发者更快地构建复杂的交互式 Web 应用。

✅ **前端框架的优势**：

- 组件化开发（代码复用）

- 提高性能（虚拟 DOM、数据绑定）

- 简化状态管理

- 增强可维护性

## **2. 三大主流前端框架**

### **2.1 React**

✅ **由 Facebook 开发**，基于 **组件化** 和 **虚拟 DOM**，适用于**大型单页应用**。

**特点：**

- JSX（类 HTML 语法）

- 虚拟 DOM 提高性能

- 单向数据流（数据管理清晰）

- 支持 Hooks 和状态管理（Redux、MobX）

```jsx
function App() {
    return <h1>Hello, React!</h1>;
}

```

### **2.2 Vue.js**

✅ **由尤雨溪开发**，语法简单，适用于**小型项目和渐进式开发**。

**特点：**

- 双向数据绑定（v-model）

- 指令系统（v-if、v-for）

- 组件化

- Vue Router + Vuex（路由和状态管理）

```
<template>
    <h1>{{ message }}</h1>
</template>
<script>
export default {
    data() {
        return { message: "Hello, Vue!" };
    }
};
</script>

```

### **2.3 Angular**

✅ **由 Google 开发**，基于 **TypeScript**，适用于**大型企业应用**。

**特点：**

- 完整 MVC 结构

- 双向数据绑定

- 内置依赖注入

- 模块化开发

```typescript
@Component({
    selector: "app-root",
    template: `<h1>{{ title }}</h1>`
})
export class AppComponent {
    title = "Hello, Angular!";
}

```

## **3. 前端框架的选择**

| 适用场景 | 推荐框架 | 
| -- | -- |
| 小型项目 | Vue.js | 
| 中型项目 | React | 
| 大型企业项目 | Angular | 
| 单页应用（SPA） | React / Vue | 
| 复杂状态管理 | React（Redux）、Vue（Vuex） | 
