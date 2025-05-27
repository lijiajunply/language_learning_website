---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://foruda.gitee.com/avatar/1731083674504966308/11756229_luckyfishisdashen_1731083674.png',
    name: 'LuckyFish',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/lijiajunply' },
    ]
  },
  {
    avatar: '/ios_logo.jpg',
    name: '张帅',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://gitee.com/zs18031751980' },
    ]
  },
  {
    avatar: '/ios_logo.jpg',
    name: '黄彦淇',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://gitee.com/huang15963' },
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>制作团队</template>
  </VPTeamPageTitle>
  <VPTeamMembers  size="small"  :members="members" />
</VPTeamPage>