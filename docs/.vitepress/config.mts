import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "软件部新生代培养计划",
  description: "西建大 iOS Club 软件部新生代培养计划",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '学习计划', link: '/start' }
    ],

    sidebar: [
      {
        text: '软件部学习计划',
        items: [
          { text: '概述', link: '/start' },
          {
            text: '前端学习计划',
            items: [
              { text: '前端学习概述', link: '/front-end-learning-plan' },
              { text: '导论', link: '/web-basic/introduction' },
              { text: '环境搭建', link: '/web-basic/environment-construction' },
              {
                text: 'HTML 基础',
                items: [
                  { text: '基础知识', link: '/web-basic/html-basics' },
                  { text: '表格和输入', link: '/web-basic/forms-and-input' },
                  { text: '多媒体与语义化标签', link: '/web-basic/multimedia-and-semanticization' },
                  { text: 'HTTP 与 Web 基础', link: '/web-basic/web-basics' },
                ],
                collapsed: true
              },
              {
                text: 'CSS 基础', 
                items: [
                  { text: '基础知识', link: '/web-basic/css-basics' },
                  { text: 'CSS 布局', link: '/web-basic/css-layout' },
                  { text: 'CSS 进阶', link: '/web-basic/css-advanced' },
                ],
                collapsed: true
              },
              {
                text: 'JavaScript 基础', 
                items: [
                  { text: '基础知识', link: '/web-basic/javascript-basics' },
                  { text: '函数与作用域', link: '/web-basic/functions-and-scope' },
                  { text: 'JavaScript 进阶', link: '/web-basic/js-advanced' },
                ],
                collapsed: true
              },
            ]
          },
          {
            text: '后端学习计划',
            items: [
              { text: '后端学习概述', link: '/backend-learning-plan' },
            ]
          },
          {
            text: '算法学习计划',
            items: [
              { text: '算法学习概述', link: '/algorithm-learning-plan' },
            ]
          },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/XAUATiOSClub/language_learning' }
    ]
  }
})
