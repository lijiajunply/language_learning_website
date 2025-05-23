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
        text: '开始',
        items: [
          { text: '概述', link: '/start' },
        ]
      },
      {
        text: '前端学习计划',
        items: [
          { text: '概述', link: '/front-end-learning-plan' },
        ]
      },
      {
        text: '后端学习计划',
        items: [
          { text: '概述', link: '/backend-learning-plan' },
        ]
      },
      {
        text: '算法学习计划',
        items: [
          { text: '概述', link: '/algorithm-learning-plan' },
        ]
      },
      {
        text: '其他学习计划',
        items: [
          { text: '概述', link: '/other-learning-plan' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/XAUATiOSClub/language_learning' }
    ]
  }
})
