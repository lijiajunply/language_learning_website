---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://foruda.gitee.com/avatar/1731083674504966308/11756229_luckyfishisdashen_1731083674.png',
    name: 'LuckyFish',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/lijiajunply' },
      { icon: 'gitee', link: 'https://gitee.com/luckyfishisdashen' },
      { icon: 'zhihu', link: 'https://www.zhihu.com/people/peopleintheworld' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/8911949' }
    ]
  },
  {
    avatar: '/ios_logo.jpg',
    name: '张帅',
    title: 'Creator',
    links: [
      { icon: 'gitee', link: 'https://gitee.com/zs18031751980' },
    ]
  },
  {
    avatar: '/ios_logo.jpg',
    name: '黄彦淇',
    title: 'Creator',
    links: [
      { icon: 'gitee', link: 'https://gitee.com/huang15963' },
    ]
  },
  {
    avatar: '/ios_logo.jpg',
    name: '妖陌',
    title: 'Creator',
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>制作团队</template>
  </VPTeamPageTitle>
  <VPTeamMembers  size="small"  :members="members" />
</VPTeamPage>