# 新生代培养计划 网页版

新生代培养计划的网页版： 

原项目地址（软件部新生代培养计划）：https://gitee.com/XAUATiOSClub/language_learning

网址：https://plan.xauat.site/

## 开发指南

1. 确保 Node.js 已经安装
2. 将该项目 clone 到本地
    ```bash
    git clone https://gitee.com/XAUATiOSClub/language_learning_website.git
    cd language_learning
    ```
3. 安装 node 依赖
    ```bash
    npm install
    ```
4. 在本地运行
    ```bash
    npm run docs:dev
    ```
    根据控制台输出的提示，打开浏览器访问计划页面
5. 构建该项目
    ```bash
    npm run docs:build
    ```
    构建完成后，会在 `docs/.vuepress/dist` 文件夹下生成静态页面，通过 `npm run docs:preview` 命令来预览
