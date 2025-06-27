// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import SpringOverview from '../components/SpringOverview.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import './style.css'
import AppLearnPlan from '../components/AppLearnPlan.vue'
import Algorithm from '../components/Algorithm.vue'
import SoftwarePlan from '../components/SoftwarePlan.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
     app.component('SpringOverview', SpringOverview)
     app.component('AppLearnPlan', AppLearnPlan)
     app.component('Algorithm', Algorithm)
     app.component('SoftwarePlan', SoftwarePlan)
  },
  setup() {
    const route = useRoute() 
    const initZoom = () => {
      // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  },
} satisfies Theme
