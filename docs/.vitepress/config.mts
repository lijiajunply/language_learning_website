// .vitepress/config.js
import { withMermaid } from "vitepress-plugin-mermaid";
import footnote_plugin from "markdown-it-footnote";

var all = {
  text: '部员必学指南',
  items: [
    {
      text: 'Markdown', items: [
        { text: 'Markdown 简单语法', link: '/all/md/start' },
        { text: '社团在线编辑器使用', link: '/all/md/how-to-use-onlinemark' }
      ], collapsed: true,
    },
  ]
};

export default withMermaid({
  lang: 'zh-CN',
  title: "新生代培养计划",
  description: "西建大 iOS Club 新生代培养计划",
  head: [
    ['link', { rel: 'icon', sizes: '32x32', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: '新生代培养计划, 新生培养, 西建大, iOS Club, 西安建筑科技大学, iOS Club of XAUAT, 培养计划' }],
    ['meta', { name: 'description', content: '西建大 iOS Club 新生代培养计划' }],
    ['meta', { name: 'author', content: 'iOS Club of XAUAT' }],
  ],
  sitemap: {
    hostname: 'https://plan.xauat.site'
  },
  themeConfig: {
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    nav: [
      { text: '主页', link: '/' },
      {
        text: '软件部', items: [
          { text: '概要', link: '/software/start' },
          { text: '前端学习计划', link: '/software/front-end-learning-plan' },
          { text: '后端学习计划', link: '/software/backend-learning-plan' },
          { text: '算法学习计划', link: '/software/algorithm-learning-plan' },
          { text: 'App开发学习计划', link: '/software/app-development-learning-plan' },
          { text: '附录', link: '/software/docker-learn/general-outline' },
        ]
      },
      { text: '硬件部', link: '/hardware/start' },
      { text: '交流实践部', link: '/office/start' },
      { text: '新媒体部', link: '/new-media/start' }
    ],

    sidebar: {
      '/software/': [
        {
          text: '软件部学习计划',
          items: [
            { text: '概述', link: '/software/start' },
            {
              text: 'Web前端学习计划',
              collapsed: true,
              items: [
                { text: '前端学习概述', link: '/software/front-end-learning-plan' },
                { text: '导论', link: '/software/web-basic/introduction' },
                {
                  text: 'Web 基础学习',
                  collapsed: true,
                  items: [{ text: '环境搭建', link: '/software/web-basic/environment-construction' },
                  {
                    text: 'HTML 基础',
                    items: [
                      { text: '基础知识', link: '/software/web-basic/html-basics' },
                      { text: '表格和输入', link: '/software/web-basic/forms-and-input' },
                      { text: '多媒体与语义化标签', link: '/software/web-basic/multimedia-and-semanticization' },
                      { text: 'HTTP 与 Web 基础', link: '/software/web-basic/web-basics' },
                    ],
                    collapsed: true
                  },
                  {
                    text: 'CSS 基础',
                    items: [
                      { text: '基础知识', link: '/software/web-basic/css-basics' },
                      { text: 'CSS 布局', link: '/software/web-basic/css-layout' },
                      { text: 'CSS 进阶', link: '/software/web-basic/css-advanced' },
                    ],
                    collapsed: true
                  },
                  {
                    text: 'JavaScript 基础',
                    items: [
                      { text: '基础知识', link: '/software/web-basic/javascript-basics' },
                      { text: '函数与作用域', link: '/software/web-basic/functions-and-scope' },
                      { text: 'JavaScript 进阶', link: '/software/web-basic/js-advanced' },
                      { text: 'DOM 操作', link: '/software/web-basic/dom-manipulation' },
                      { text: 'Web存储与Cookie', link: '/software/web-basic/cookie' },
                    ],
                    collapsed: true
                  },
                  {
                    text: '工具与技巧',
                    items: [
                      { text: '开发工具', link: '/software/web-advanced/dev-tools' },
                      { text: '构建工具', link: '/software/web-advanced/build-tools' },
                      { text: '调试与优化', link: '/software/web-advanced/debug' },
                      { text: 'Webpack 基础配置', link: '/software/web-advanced/webpack-basic-configuration' },
                      { text: 'Webpack 深度教学指南', link: '/software/web-advanced/webpack-in-depth-tutorial' },
                    ],
                    collapsed: true
                  },
                  {
                    text: '附录',
                    items: [
                      { text: 'ES6如何使用', link: '/software/web-advanced/how-to-use-es6' },
                      { text: 'HTTP 与 Web 通信', link: '/software/web-advanced/http-and-communication' },
                      { text: 'JavaScript 模拟类的方式', link: '/software/web-advanced/javascript-emulation-class-approach' },
                      { text: 'JavaScript 中的 Promise', link: '/software/web-advanced/js-promise' },
                      { text: 'JavaScript基础练习环境搭建', link: '/software/web-advanced/js-basic-practice' },
                      { text: 'Web 安全', link: '/software/web-advanced/security' },
                      { text: 'Webpack Bundle Analyzer 使用指南', link: '/software/web-advanced/webpack-bundle-analyzer' },
                      { text: 'Webpack 多页面配置方案', link: '/software/web-advanced/webpack-multi-page-configuration' },
                      { text: '后端基础', link: '/software/web-advanced/backend-foundation' },
                      { text: '基于HTML+CSS的UI框架一览', link: '/software/web-advanced/ui-framework-based-on-html+css' },
                      { text: '前端框架简介', link: '/software/web-advanced/front-end-framework' },
                      { text: '深入理解Chunk', link: '/software/web-advanced/chunk-deep-understanding' },
                    ],
                    collapsed: true
                  },
                  {
                    text: '练习',
                    items: [
                      { text: '练习1：静态网页-个人简历网站', link: '/software/web-advanced/exercise-1' },
                      { text: '练习2：动态网页 - 在线留言板', link: '/software/web-advanced/exercise-2' },
                      { text: '练习3：响应式网页 - 在线商城首页', link: '/software/web-advanced/exercise-3' },
                    ],
                    collapsed: true
                  },
                  {
                    text: '综合项目',
                    items: [
                      { text: '综合项目1：用户管理系统开发（UI部分）', link: '/software/web-advanced/comprehensive-project-1' },
                      { text: '综合项目2：购物车功能开发', link: '/software/web-advanced/comprehensive-project-2' },
                    ],
                    collapsed: true
                  },]
                },
                {
                  text: 'Vue 学习',
                  items: [],
                  collapsed: true,
                },
                {
                  text: '其他框架学习',
                  items: [
                    {
                      text: 'React 学习',
                      items: [
                        { text: '总纲', link: '/software/react-learn/general-outline' },
                        { text: 'React简介', link: '/software/react-learn/introduction-to-react' },
                        { text: '搭建React开发环境', link: '/software/react-learn/build-a-react-development-environment' },
                        { text: 'JSX语法深度解析', link: '/software/react-learn/deep-analysis-of-jsx-syntax' },
                        { text: '组件与 Props', link: '/software/react-learn/components-and-props' },
                        { text: 'State与事件处理', link: '/software/react-learn/state-and-event-processing' },
                        { text: '生命周期与 Hooks', link: '/software/react-learn/lifecycle-and-hooks' },
                        { text: '组件通信', link: '/software/react-learn/component-communication' },
                        { text: '表单处理与复杂状态管理', link: '/software/react-learn/form-processing-and-complex-state-management' },
                        { text: '性能优化', link: '/software/react-learn/performance-optimization' },
                        { text: 'React Router', link: '/software/react-learn/react-router' },
                        { text: '状态管理 - Redux', link: '/software/react-learn/status-management-redux' },
                        { text: '数据获取与API集成', link: '/software/react-learn/data-acquisition-and-api-integration' },
                        { text: '样式与UI库', link: '/software/react-learn/styles-and-ui-libraries' },
                      ],
                      collapsed: true,
                    },
                    {
                      text: 'Tailwind 学习',
                      items: [
                        
                      ],
                      collapsed: true,
                    }
                  ],
                  collapsed: true,
                }
              ]
            },
            {
              text: '后端学习计划',
              collapsed: true,
              items: [
                { text: '后端学习概述', link: '/software/backend-learning-plan' },
                {
                  text: 'Asp.Net Core WebAPI',
                  items: [
                    { text: '概述', link: '/software/aspnetcore-learn/start' },
                    {
                      text: 'C# 基础学习',
                      items: [
                        { text: '导论', link: '/software/csharp-learn/csharp-1' },
                        { text: 'C# 基础', link: '/software/csharp-learn/csharp-2' },
                        { text: '分支与循环', link: '/software/csharp-learn/csharp-3' },
                        { text: '写点复杂的东西', link: '/software/csharp-learn/csharp-4' },
                        { text: 'String的更多用法', link: '/software/csharp-learn/csharp-5' },
                        { text: '函数', link: '/software/csharp-learn/csharp-6' },
                        { text: '结构体，枚举，类', link: '/software/csharp-learn/csharp-7' },
                      ],
                      collapsed: true,
                    },
                    {
                      text: 'Asp.Net Core WebAPI 学习',
                      items: [],
                      collapsed: true,
                    },
                    {
                      text: 'EF Core 学习',
                      items: [
                        { text: '概述', link: '/software/ef-learn/start' }
                      ],
                      collapsed: true,
                    },
                  ],
                  collapsed: true
                },
                {
                  text: 'Spring',
                  items: [
                    { text: '概述', link: '/software/spring-learn/start' },
                    {
                      text: 'Java 学习',
                      items: [
                        { text: '总纲', link: '/software/java-learn/general-outline' },
                        { text: 'Java 基础语法', link: '/software/java-learn/java-basic-syntax' },
                        { text: '控制结构', link: '/software/java-learn/control-structure' },
                        { text: '函数与模块化', link: '/software/java-learn/functions-and-modularity' },
                        { text: '面向对象编程基础', link: '/software/java-learn/basics-of-object-oriented-programming' },
                        { text: '封装、继承、多态', link: '/software/java-learn/encapsulation-inheritance-polymorphism' },
                        { text: '静态与内部类', link: '/software/java-learn/static-and-internal-classes' },
                        { text: '异常处理', link: '/software/java-learn/exception-handling' },
                        { text: '内存管理', link: '/software/java-learn/memory-management' },
                        { text: '并发与并行', link: '/software/java-learn/concurrency-and-parallelism' },
                        { text: 'Java 常用 API', link: '/software/java-learn/common-java-apis' },
                        { text: '元编程（反射与注解）', link: '/software/java-learn/metaprogramming-(reflection-and-annotation)' },
                        { text: 'Java 生态系统概览', link: '/software/java-learn/java-ecosystem-overview' },
                        { text: '跨平台支持', link: '/software/java-learn/cross-platform' },
                        { text: '安全性', link: '/software/java-learn/security' },
                        { text: '可扩展性', link: '/software/java-learn/scalability' },
                        { text: '设计哲学', link: '/software/java-learn/philosophy-of-design' },
                        { text: '社区与生态', link: '/software/java-learn/community-and-ecology' },
                      ],
                      collapsed: true,
                    },
                    {
                      text: 'Java Orm 学习',
                      items: [
                        { text: '导论', link: '/software/javaorm-learn/general-outline' },
                        { text: 'ORM概念', link: '/software/javaorm-learn/orm' },
                        { text: '数据库访问技术速览与比较', link: '/software/javaorm-learn/quick-and-comparison-of-database-access-technology' },
                        { text: 'JDBC', link: '/software/javaorm-learn/jdbc' },
                        { text: 'Hibernate', link: '/software/javaorm-learn/hibernate' },
                        { text: '深入理解 MyBatis', link: '/software/javaorm-learn/mybatis' },
                        { text: '你应该知道的 JPA', link: '/software/javaorm-learn/jpa' },
                        { text: 'Repository模式理论&实现', link: '/software/javaorm-learn/repository' },
                        { text: '事务处理 & Unit Of Work', link: '/software/javaorm-learn/transaction-&-unit-of-work' },
                        { text: '非关系型数据处理', link: '/software/javaorm-learn/non-relational-data-processing' },
                        { text: 'HQL', link: '/software/javaorm-learn/hql' },
                        { text: 'JPA标准', link: '/software/javaorm-learn/jpa-standard' },
                        { text: 'Spring Data JPA详解', link: '/software/javaorm-learn/spring-data-jpa-details' },
                        { text: '方法名自动生成查询的原理', link: '/software/javaorm-learn/the-principle-of-automatic-method-name-generation-query' },
                        { text: '分页和排序', link: '/software/javaorm-learn/pagination-and-sorting' },
                        { text: '综合项目 操作手册', link: '/software/javaorm-learn/comprehensive-project-1' },
                        { text: '综合项目 基于命令行的用户管理系统', link: '/software/javaorm-learn/comprehensive-project-2' },
                      ],
                      collapsed: true,
                    },
                    {
                      text: 'Spring 学习',
                      items: [
                        { text: '总纲', link: '/software/spring-learn/general-outline' },
                        { text: 'Spring 简介', link: '/software/spring-learn/introduction-to-spring' },
                        { text: 'Spring Boot 初体验', link: '/software/spring-learn/spring-boot-first-experience' },
                        { text: 'Spring 核心容器（Core Container）', link: '/software/spring-learn/spring-core-container' },
                        { text: 'Spring AOP（面向切面编程）', link: '/software/spring-learn/spring-aop-(system-oriented-programming)' },

                        { text: 'Spring MVC（Model-View-Controller）', link: '/software/spring-learn/spring-mvc（model-view-controller）' },
                        { text: 'Spring Boot', link: '/software/spring-learn/spring-boot' },
                        { text: 'Spring Data 数据访问和集成', link: '/software/spring-learn/spring-data-data-access-and-integration' },
                        { text: 'Spring Security', link: '/software/spring-learn/spring-security' },
                        { text: 'Spring Batch', link: '/software/spring-learn/spring-batch' },
                        { text: 'Spring Cloud', link: '/software/spring-learn/spring-cloud' },
                        { text: 'Spring Integration', link: '/software/spring-learn/spring-integration' },
                        { text: 'Spring WebFlux', link: '/software/spring-learn/spring-webflux' },
                        { text: 'Spring框架的性能优化', link: '/software/spring-learn/performance-optimization-of-spring-framework' },
                      ],
                      collapsed: true,
                    },
                  ],
                  collapsed: true
                }
              ]
            },
            {
              text: '算法学习计划',
              collapsed: true,
              items: [
                { text: '算法学习概述', link: '/software/algorithm-learning-plan' },
                { text: '二分法', link: '/software/algorithm-learning/dichotomy' },
                { text: '栈与队列', link: '/software/algorithm-learning/stacks-queues' },
              ]
            },
            {
              text: 'App 开发学习计划',
              items: [
                { text: '概述', link: '/software/app-development-learning-plan' },
                {
                  text: 'Flutter 开发',
                  collapsed: true,
                  items: [
                    { text: 'Flutter 概述', link: '/software/flutter-learn/start' },
                    { text: '一些基本概念', link: '/software/flutter-learn/basic-concepts' },
                     { text: '项目一 写一个Todo应用', link: '/software/flutter-learn/tutorial-1' },
                  ]
                },
                {
                  text: 'Avalonia 开发',
                  collapsed: true,
                  items: [
                    { text: 'Avalonia 概述，安装与配置', link: '/software/avalonia-learn/avalonia-1' },
                    { text: '简单介绍一下项目', link: '/software/avalonia-learn/avalonia-2' },
                    { text: '普通架构实战——计算器', link: '/software/avalonia-learn/avalonia-3' },
                    { text: 'MVVM架构实战——文件浏览器', link: '/software/avalonia-learn/avalonia-4' },
                    { text: '使用其他主题来写一个待办事项软件', link: '/software/avalonia-learn/avalonia-5' },
                  ]
                }
              ],
              collapsed: true,
            },
            {
              text: '附录 - Docker教程',
              collapsed: true,
              items: [
                { text: '总纲', link: '/software/docker-learn/general-outline' },
                { text: 'Docker 基础概念', link: '/software/docker-learn/docker-basic-concepts' },
                { text: 'Docker 环境安装与配置', link: '/software/docker-learn/docker-environment-installation-and-configuration' },
                { text: 'Docker 基础命令', link: '/software/docker-learn/docker-basic-commands' },
                { text: 'Docker 数据管理', link: '/software/docker-learn/volumes' },
                { text: 'Dockerfile 与镜像构建', link: '/software/docker-learn/dockerfile-and-image-construction' },
                { text: 'Docker 网络管理', link: '/software/docker-learn/docker-network-management' },
                { text: 'Docker Compose', link: '/software/docker-learn/docker-compose' },
                { text: '实战案例：Jenkins + Docker-in-Docker（DinD）', link: '/software/docker-learn/practical-case' },
                { text: '进阶话题：容器编排与云原生部署', link: '/software/docker-learn/advanced-topics' },
                { text: 'Windows 的 WSL 2 配置', link: '/software/docker-learn/wsl-2-configuration-for-windows' },
              ]
            },
            { text: '附录 - Git使用', link: '/software/git-learn' }
          ]
        }, all
      ],
      '/hardware/': [
        {
          text: '硬件部学习计划',
          items: [
            { text: '概述', link: '/hardware/start' },
          ]
        }, all
      ],
      '/office/': [
        {
          text: '交流实践部学习计划',
          items: [
            { text: '概述', link: '/office/start' },
            {
              text: 'Word技巧', items: [
                { text: '概述', link: '/office/word/start.md' },
              ], collapsed: true,
            }
          ]
        }, all
      ],
      '/new-media/': [
        {
          text: '新媒体部学习计划',
          items: [
            { text: '概述', link: '/new-media/start' },
            {
              text: 'PPT技巧', items: [
                { text: '关于PPT排版问题', link: '/new-media/ppt/start.md' },
              ], collapsed: true,
            }
          ]
        }, all
      ],
      '/all/': [
        all,
        {
          text: '其他学习计划',
          items: [
            { text: '软件部学习计划', link: '/software/start' },
            { text: '硬件部学习计划', link: '/hardware/start' },
            { text: '交流实践部学习计划', link: '/office/start' },
            { text: '新媒体部学习计划', link: '/new-media/start' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/XAUATiOSClub/language_learning' }
    ]
  },
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
      noteLabel: '注意'
    },
    config(md) {
      md.use(footnote_plugin)
    },
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
  mermaid: {

  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container 
  },
});
