---
layout: page
title: 算法学习概述
description: 系统化的算法学习指南，从基础到进阶的完整路径
---

<script setup>
import { ref, reactive, onMounted } from 'vue'

// 响应式数据
const activePhase = ref(0)
const progress = ref(0)

// 静态数据，使用 reactive 确保响应性
const nodes = reactive(['🌱', '🌿', '🌳', '🍃', '🌺'])

const learningPhases = reactive([
  {
    icon: '🎯',
    title: '基础入门',
    duration: '2-3个月',
    description: '掌握基本数据结构和简单算法，建立编程思维基础',
    topics: ['数组和字符串', '链表基础', '栈和队列', '基础排序算法', '二分查找']
  },
  {
    icon: '🚀',
    title: '进阶提升',
    duration: '3-4个月',
    description: '深入学习经典算法，提升问题解决能力',
    topics: ['树和图算法', '动态规划入门', '贪心算法', '分治算法', '双指针技巧']
  },
  {
    icon: '🎓',
    title: '高级算法',
    duration: '4-6个月',
    description: '掌握复杂算法设计，具备解决困难问题的能力',
    topics: ['高级动态规划', '图论算法', '字符串算法', '数学算法', '并查集']
  },
  {
    icon: '🏆',
    title: '竞赛水平',
    duration: '持续学习',
    description: '达到竞赛级别，能够解决各类复杂算法问题',
    topics: ['网络流', '计算几何', '高级数据结构', '数论算法', '博弈论']
  }
])

const categories = reactive([
  {
    name: '数组与字符串',
    icon: '📝',
    count: 45,
    description: '基础数据操作，双指针、滑动窗口等经典技巧',
    difficulty: { easy: 40, medium: 50, hard: 10 },
    tags: ['双指针', '滑动窗口', '前缀和']
  },
  {
    name: '链表',
    icon: '🔗',
    count: 28,
    description: '链表操作、快慢指针、链表反转等核心技能',
    difficulty: { easy: 35, medium: 55, hard: 10 },
    tags: ['快慢指针', '链表反转', '合并链表']
  },
  {
    name: '树与图',
    icon: '🌳',
    count: 52,
    description: '二叉树遍历、图的搜索算法、最短路径等',
    difficulty: { easy: 25, medium: 60, hard: 15 },
    tags: ['DFS', 'BFS', '最短路径']
  },
  {
    name: '动态规划',
    icon: '🧮',
    count: 38,
    description: '状态转移、背包问题、区间DP等经典问题',
    difficulty: { easy: 20, medium: 50, hard: 30 },
    tags: ['状态转移', '背包问题', '区间DP']
  },
  {
    name: '排序与查找',
    icon: '🔍',
    count: 25,
    description: '各类排序算法、二分查找及其变形',
    difficulty: { easy: 45, medium: 45, hard: 10 },
    tags: ['快速排序', '归并排序', '二分查找']
  },
  {
    name: '数学算法',
    icon: '🔢',
    count: 30,
    description: '数论、组合数学、概率算法等数学相关题目',
    difficulty: { easy: 30, medium: 40, hard: 30 },
    tags: ['数论', '组合数学', '概率']
  }
])

const studyTips = reactive([
  {
    icon: '📚',
    title: '循序渐进',
    content: '从简单题目开始，逐步提升难度，不要急于求成。每个知识点都要扎实掌握。'
  },
  {
    icon: '✍️',
    title: '多练习',
    content: '理论学习后必须大量练习，通过做题来巩固理解，培养编程直觉。'
  },
  {
    icon: '🤝',
    title: '讨论交流',
    content: '加入算法学习社区，与他人讨论问题，分享解题思路，互相学习。'
  },
  {
    icon: '📝',
    title: '总结归纳',
    content: '定期总结学过的算法模板，整理解题思路，建立自己的知识体系。'
  }
])

const progressItems = reactive([
  { label: '基础算法', value: 75 },
  { label: '数据结构', value: 68 },
  { label: '动态规划', value: 45 },
  { label: '图论算法', value: 32 },
  { label: '高级算法', value: 28 }
])

// 方法
const toggleCategory = (category) => {
  if (category?.name) {
    console.log('查看分类:', category.name)
  }
}

// 生命周期
onMounted(() => {
  // 延迟动画，确保DOM已渲染
  setTimeout(() => {
    progress.value = 55
  }, 1000)
})
</script>

<style scoped>
.algorithm-overview {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 60vh;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.subtitle {
  color: var(--vp-c-text-1);
  display: block;
  font-size: 2.5rem;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.algorithm-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 300px;
}

.node {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  animation: float 3s ease-in-out infinite;
  color: white;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Learning Path */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--vp-c-text-1);
}

.learning-path {
  margin-bottom: 4rem;
}

.path-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.path-item {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.path-item:hover,
.path-item.active {
  transform: translateY(-5px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.phase-icon {
  font-size: 2rem;
}

.phase-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
  margin: 0;
}

.phase-duration {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.phase-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.phase-topics {
  list-style: none;
  padding: 0;
  margin: 0;
}

.phase-topics li {
  padding: 0.5rem 0;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.phase-topics li:before {
  content: '✓';
  color: var(--vp-c-brand-1);
  font-weight: bold;
  margin-right: 0.5rem;
}

.phase-topics li:last-child {
  border-bottom: none;
}

/* Algorithm Categories */
.algorithm-categories {
  margin-bottom: 4rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.category-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.category-icon {
  font-size: 1.5rem;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
  margin: 0;
}

.category-badge {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.category-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.category-difficulty {
  margin-bottom: 1rem;
}

.difficulty-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  display: block;
  margin-bottom: 0.5rem;
}

.difficulty-bars {
  display: flex;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  background: var(--vp-c-divider);
}

.difficulty-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.difficulty-bar.easy { background: #10b981; }
.difficulty-bar.medium { background: #f59e0b; }
.difficulty-bar.hard { background: #ef4444; }

.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
}

/* Study Tips */
.study-tips {
  margin-bottom: 4rem;
}

.tips-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.tip-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.tip-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  margin-top: 0;
}

.tip-content {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

/* Progress Section */
.progress-section {
  margin-bottom: 4rem;
}

.progress-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: center;
}

.progress-circle {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.progress-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: var(--vp-c-divider);
  stroke-width: 8;
}

.progress-fill {
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dasharray 1s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.progress-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.progress-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-item-label {
  min-width: 100px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.progress-item-bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.progress-item-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 4px;
  transition: width 1s ease;
}

.progress-item-value {
  min-width: 40px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-align: right;
}

/* Dark Mode Adaptations */
.dark .gradient-text {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .node {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
  box-shadow: 0 4px 15px rgba(129, 140, 248, 0.3);
}

.dark .category-card:hover,
.dark .path-item:hover,
.dark .tip-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Mobile Adaptations */
@media (max-width: 768px) {
  .algorithm-overview {
    padding: 1rem 0.5rem;
  }

  .hero-section {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    min-height: auto;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 2rem;
  }

  .hero-stats {
    justify-content: center;
    gap: 1rem;
  }

  .algorithm-visualization {
    height: 200px;
  }

  .node {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .path-container,
  .categories-grid,
  .tips-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .progress-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .progress-circle {
    width: 150px;
    height: 150px;
  }

  .progress-number {
    font-size: 1.5rem;
  }

  .phase-header {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .phase-duration {
    order: -1;
    margin-left: auto;
  }

  .category-header {
    flex-wrap: wrap;
  }

  .category-tags {
    gap: 0.25rem;
  }

  .progress-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .progress-item-label {
    min-width: auto;
  }

  .progress-item-value {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .algorithm-visualization {
    flex-wrap: wrap;
    height: auto;
    padding: 1rem;
  }

  .node {
    width: 35px;
    height: 35px;
    font-size: 0.875rem;
  }
}
</style>


<div class="algorithm-overview">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">算法学习</span>
          <span class="subtitle">完整指南</span>
        </h1>
        <p class="hero-description">
          从基础数据结构到高级算法设计，打造系统化的编程思维
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">10+</span>
            <span class="stat-label">核心主题</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">200+</span>
            <span class="stat-label">经典题目</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">5</span>
            <span class="stat-label">难度等级</span>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="algorithm-visualization">
          <div class="node" v-for="(node, index) in nodes" :key="`node-${index}`" 
               :style="{ animationDelay: `${index * 0.2}s` }">
            {{ node }}
          </div>
        </div>
      </div>
    </section>
    <!-- Learning Path -->
    <section class="learning-path">
      <h2 class="section-title">学习路径</h2>
      <div class="path-container">
        <div class="path-item" 
             v-for="(phase, index) in learningPhases" 
             :key="`phase-${index}`"
             :class="{ 'active': activePhase === index }"
             @click="activePhase = index">
          <div class="phase-header">
            <div class="phase-icon">{{ phase?.icon || '📚' }}</div>
            <h3 class="phase-title">{{ phase?.title || '' }}</h3>
            <span class="phase-duration">{{ phase?.duration || '' }}</span>
          </div>
          <div class="phase-content">
            <p class="phase-description">{{ phase?.description || '' }}</p>
            <ul class="phase-topics" v-if="phase?.topics">
              <li v-for="(topic, topicIndex) in phase.topics" :key="`topic-${index}-${topicIndex}`">
                {{ topic }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- Algorithm Categories -->
    <section class="algorithm-categories">
      <h2 class="section-title">算法分类</h2>
      <div class="categories-grid">
        <div class="category-card" 
             v-for="(category, index) in categories" 
             :key="`category-${index}`"
             @click="toggleCategory(category)">
          <div class="category-header">
            <div class="category-icon">{{ category?.icon || '📁' }}</div>
            <h3 class="category-name">{{ category?.name || '' }}</h3>
            <div class="category-badge">{{ category?.count || 0 }}题</div>
          </div>
          <p class="category-description">{{ category?.description || '' }}</p>
          <div class="category-difficulty" v-if="category?.difficulty">
            <span class="difficulty-label">难度分布:</span>
            <div class="difficulty-bars">
              <div class="difficulty-bar easy" 
                   :style="{ width: (category.difficulty.easy || 0) + '%' }"></div>
              <div class="difficulty-bar medium" 
                   :style="{ width: (category.difficulty.medium || 0) + '%' }"></div>
              <div class="difficulty-bar hard" 
                   :style="{ width: (category.difficulty.hard || 0) + '%' }"></div>
            </div>
          </div>
          <div class="category-tags" v-if="category?.tags">
            <span class="tag" 
                  v-for="(tag, tagIndex) in category.tags" 
                  :key="`tag-${index}-${tagIndex}`">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>
    <!-- Study Tips -->
    <section class="study-tips">
      <h2 class="section-title">学习建议</h2>
      <div class="tips-container">
        <div class="tip-card" 
             v-for="(tip, index) in studyTips" 
             :key="`tip-${index}`">
          <div class="tip-icon">{{ tip?.icon || '💡' }}</div>
          <h3 class="tip-title">{{ tip?.title || '' }}</h3>
          <p class="tip-content">{{ tip?.content || '' }}</p>
        </div>
      </div>
    </section>
    <!-- Progress Tracker -->
    <section class="progress-section">
      <h2 class="section-title">学习进度</h2>
      <div class="progress-container">
        <div class="progress-circle">
          <div class="progress-text">
            <span class="progress-number">{{ Math.round(progress) }}%</span>
            <span class="progress-label">完成度</span>
          </div>
        </div>
        <div class="progress-details">
          <div class="progress-item" 
               v-for="(item, index) in progressItems" 
               :key="`progress-${index}`">
            <span class="progress-item-label">{{ item?.label || '' }}</span>
            <div class="progress-item-bar">
              <div class="progress-item-fill" 
                   :style="{ width: (item?.value || 0) + '%' }"></div>
            </div>
            <span class="progress-item-value">{{ item?.value || 0 }}%</span>
          </div>
        </div>
      </div>
    </section>
  </div>