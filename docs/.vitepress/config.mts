import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "新生代培养计划",
  description: "西建大 iOS Club 新生代培养计划",
  head: [
    ['link', { rel: 'icon', sizes: '32x32', href: '/favicon.ico' }],
  ],
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '软件部学习计划', link: '/software/start' },
      { text: '硬件部学习计划', link: '/hardware/start' }
    ],

    sidebar: {
      '/software/': [
        {
          text: '软件部学习计划',
          items: [
            { text: '概述', link: '/software/start' },
            {
              text: '前端学习计划',
              collapsed: true,
              items: [
                { text: '前端学习概述', link: '/software/front-end-learning-plan' },
                { text: '导论', link: '/software/web-basic/introduction' },
                { text: '环境搭建', link: '/software/web-basic/environment-construction' },
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
                },
              ]
            },
            {
              text: '后端学习计划',
              items: [
                { text: '后端学习概述', link: '/software/backend-learning-plan' },
                {
                  text: 'Asp.Net Core WebAPI',
                  items: [
                    { text: '概述', link: '/software/aspnetcore-learn/start' },
                    {
                      text: 'C# 基础学习',
                      items: [],
                      collapsed: true,
                    },
                    {
                      text: 'Asp.Net Core WebAPI 学习',
                      items: [],
                      collapsed: true,
                    },
                    {
                      text: 'EF Core 学习',
                      items: [],
                      collapsed: true,
                    },
                  ],
                  collapsed: true
                },
                {
                  text: 'Spring',
                  items: [
                    { text: '概述', link: '/software/spring-learn/start' }
                  ],
                  collapsed: true
                }
              ]
            },
            {
              text: '算法学习计划',
              items: [
                { text: '算法学习概述', link: '/software/algorithm-learning-plan' },
              ]
            },
          ]
        }
      ],
      '/hardware/': [
        {
          text: '硬件部学习计划',
          items: [
            { text: '概述', link: '/hardware/start' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/XAUATiOSClub/language_learning' }
    ]
  }
})
