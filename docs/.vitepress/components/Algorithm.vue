<template>
  <div class="algorithm-guide">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">算法学习计划</h1>
        <p class="hero-subtitle">系统化的算法学习路径与资源指南</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-wrapper">
      <!-- Learning Path Section -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">学习路线</h2>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>前置要求</h3>
          </div>
          <p class="requirement-text">
            学习算法前需要掌握一门编程语言（C++、C、Java、Python、Go等语言均可）
          </p>
        </div>

        <div class="learning-path">
          <div class="path-item foundation">
            <div class="path-icon">📚</div>
            <div class="path-content">
              <h4>算法基础理论和复杂度分析</h4>
              <a href="https://www.bilibili.com/video/BV1nJ411V7bd" target="_blank" class="path-link">
                观看视频教程 →
              </a>
            </div>
          </div>

          <div class="path-grid">
            <a class="path-category" :href="topic.url" v-for="topic in learningTopics" :key="topic.id">
              <div class="category-icon">{{ topic.icon }}</div>
              <h4>{{ topic.name }}</h4>
            </a>
          </div>

          <div class="advanced-resources">
            <h4>进阶学习</h4>
            <div class="resource-links">
              <a href="https://leetcode-cn.com/leetbook/detail/top-interview-questions-easy/" 
                 target="_blank" class="resource-link">
                <span class="link-text">初级算法</span>
                <span class="link-arrow">→</span>
              </a>
              <a href="https://leetcode-cn.com/leetbook/detail/top-interview-questions-medium/" 
                 target="_blank" class="resource-link">
                <span class="link-text">中级算法</span>
                <span class="link-arrow">→</span>
              </a>
            </div>
            <p class="note">学习顺序并不唯一，可以在B站找资源来了解。</p>
          </div>
        </div>
      </section>

      <!-- Practice Websites Section -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">刷题网站</h2>
        </div>

        <div class="websites-grid">
          <div class="website-category">
            <h3 class="category-title">入门推荐</h3>
            <p class="category-desc">适合初学者，简单题较多</p>
            <div class="website-list">
              <a v-for="site in beginnerSites" :key="site.name" 
                 :href="site.url" target="_blank" class="website-card beginner">
                <div class="website-info">
                  <h4>{{ site.name }}</h4>
                  <p>{{ site.description }}</p>
                </div>
                <div class="website-arrow">→</div>
              </a>
            </div>
          </div>

          <div class="website-category">
            <h3 class="category-title">进阶挑战</h3>
            <p class="category-desc">难度偏大，适合提高</p>
            <div class="website-list">
              <a v-for="site in advancedSites" :key="site.name" 
                 :href="site.url" target="_blank" class="website-card advanced">
                <div class="website-info">
                  <h4>{{ site.name }}</h4>
                  <p>{{ site.description }}</p>
                </div>
                <div class="website-arrow">→</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Resources Section -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">资料网站</h2>
        </div>

        <div class="resources-grid">
          <div class="resource-card featured">
            <div class="resource-icon">📖</div>
            <div class="resource-content">
              <h3>代码随想录</h3>
              <p>涵盖基础算法中的大部分内容，系统化学习首选</p>
              <a href="https://programmercarl.com/qita/publish.html" target="_blank" class="resource-btn">
                开始学习
              </a>
            </div>
          </div>

          <div class="resource-card">
            <div class="resource-icon">💻</div>
            <div class="resource-content">
              <h3>CSDN</h3>
              <p>搜索未学算法，完善知识储备的好去处</p>
              <a href="https://www.csdn.net/" target="_blank" class="resource-btn secondary">
                访问网站
              </a>
            </div>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <h4>学习建议</h4>
            <p>其余算法可在刷题过程中看题解，未学到的算法可在CSDN中进行搜索来完善知识储备。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const learningTopics = ref([
  { id: 1, name: '数组和字符串', icon: '📝' },
  { id: 2, name: '链表', icon: '🔗' },
  { id: 3, name: '队列 & 栈', icon: '📚',url: '/software/algorithm-learning/stacks-queues' },
  { id: 4, name: '哈希表', icon: '🗂️' },
  { id: 5, name: '查找表类算法', icon: '🔍' },
  { id: 6, name: '二分查找', icon: '⚡', url: '/software/algorithm-learning/dichotomy' },
  { id: 7, name: '二叉树', icon: '🌳' },
  { id: 8, name: '二叉搜索树', icon: '🌲' },
  { id: 9, name: '前缀树', icon: '🎋' },
  { id: 10, name: 'N 叉树', icon: '🌿' },
  { id: 11, name: '数组类算法', icon: '📊' },
  { id: 12, name: '递归', icon: '🔄' },
  { id: 13, name: '动态规划', icon: '⚙️' }
])

const beginnerSites = ref([
  { name: '洛谷', url: 'https://www.luogu.com.cn/', description: '中文编程竞赛平台' },
  { name: '力扣', url: 'https://leetcode.cn/', description: '全球极客挚爱的技术成长平台' },
  { name: '蓝桥题库', url: 'https://www.lanqiao.cn/problems/?first_category_id=1', description: '蓝桥杯官方题库' }
])

const advancedSites = ref([
  { name: '牛客', url: 'https://ac.nowcoder.com/', description: '信息学编程算法训练平台' },
  { name: 'AcWing', url: 'https://www.acwing.com/', description: '快乐学习生活，尽在AcWing' },
  { name: 'AtCoder', url: 'https://atcoder.jp/', description: '日本编程竞赛平台' },
  { name: 'Codeforces', url: 'https://codeforces.com/', description: '国际编程竞赛平台' }
])
</script>

<style scoped>
/* Variables */
:root {
  --primary-color: #007AFF;
  --secondary-color: #5856D6;
  --success-color: #34C759;
  --warning-color: #FF9500;
  --danger-color: #FF3B30;
  --text-primary: #1D1D1F;
  --text-secondary: #6E6E73;
  --bg-primary: #FFFFFF;
  --bg-secondary: #F2F2F7;
  --bg-tertiary: #FFFFFF;
  --border-color: #D1D1D6;
  --shadow-light: 0 2px 16px rgba(0, 0, 0, 0.06);
  --shadow-medium: 0 4px 24px rgba(0, 0, 0, 0.1);
  --border-radius: 12px;
  --border-radius-large: 16px;
}

/* Dark mode variables */
.dark {
  --text-primary: #F2F2F7;
  --text-secondary: #98989D;
  --bg-primary: #000000;
  --bg-secondary: #1C1C1E;
  --bg-tertiary: #2C2C2E;
  --border-color: #38383A;
  --shadow-light: 0 2px 16px rgba(0, 0, 0, 0.3);
  --shadow-medium: 0 4px 24px rgba(0, 0, 0, 0.4);
  --border-radius: 12px;
}

/* Base styles */
.algorithm-guide {
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: all 0.3s ease;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 4rem 2rem 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.05"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: var(--text-secondary);
  margin: 0;
  font-weight: 400;
  line-height: 1.4;
}

/* Content Wrapper */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  transform: translateY(-2rem);
  position: relative;
  z-index: 2;
}

/* Section Styles */
.section {
  margin-bottom: 4rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.02em;
}

/* Card Styles */
.card {
  background: var(--bg-tertiary);
  border-radius: var(--border-radius-large);
  padding: 2rem;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-2px);
}

.card-header h3 {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem;
}

.requirement-text {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Learning Path Styles */
.learning-path {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.path-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--bg-tertiary);
  padding: 2rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.path-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.path-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.path-content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.path-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.path-link:hover {
  opacity: 0.8;
}

/* Path Grid */
.path-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.path-category {
  background: var(--bg-tertiary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.path-category:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}

.category-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.path-category h4 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
}

/* Advanced Resources */
.advanced-resources {
  background: var(--bg-tertiary);
  padding: 2rem;
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color);
}

.advanced-resources h4 {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.5rem;
}

.resource-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.resource-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.resource-link:hover {
  transform: translateX(8px);
  background: var(--primary-color);
  color: white;
}

.link-text {
  font-weight: 500;
}

.link-arrow {
  font-weight: 600;
  transition: transform 0.3s ease;
}

.resource-link:hover .link-arrow {
  transform: translateX(4px);
}

.note {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-style: italic;
  margin: 0;
  line-height: 1.5;
}

/* Websites Grid */
.websites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.website-category {
  background: var(--bg-tertiary);
  padding: 2rem;
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-light);
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.category-desc {
  color: var(--text-secondary);
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.website-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.website-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.website-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.website-card:hover::before {
  left: 100%;
}

.website-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.website-card.beginner:hover {
  border-color: var(--success-color);
}

.website-card.advanced:hover {
  border-color: var(--warning-color);
}

.website-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem;
}

.website-info p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

.website-arrow {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.website-card:hover .website-arrow {
  color: var(--primary-color);
  transform: translateX(4px);
}

/* Resources Grid */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.resource-card {
  background: var(--bg-tertiary);
  padding: 2rem;
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-light);
  transition: all 0.3s ease;
  position: relative;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.resource-card.featured {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, var(--bg-tertiary), rgba(0, 122, 255, 0.05));
}

.resource-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.resource-content h3 {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
}

.resource-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 1.5rem;
}

.resource-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.resource-btn:hover {
  background: color-mix(in srgb, var(--primary-color) 90%, black);
  transform: translateY(-1px);
}

.resource-btn.secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.resource-btn.secondary:hover {
  background: var(--border-color);
}

/* Tip Card */
.tip-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(52, 199, 89, 0.1), rgba(52, 199, 89, 0.05));
  border: 1px solid rgba(52, 199, 89, 0.2);
  padding: 1.5rem;
  border-radius: 0.75rem;
}

.tip-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tip-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.tip-content p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 1rem;
  }
  
  .hero {
    padding: 3rem 1rem 4rem;
  }
  
  .websites-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .website-category {
    padding: 1.5rem;
  }
  
  .path-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .path-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .card,
  .resource-card,
  .advanced-resources {
    padding: 1.5rem;
  }
  
  .resources-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0 0.75rem;
  }
  
  .section {
    margin-bottom: 3rem;
  }
  
  .path-grid {
    grid-template-columns: 1fr;
  }
  
  .resource-links {
    gap: 0.75rem;
  }
  
  .website-card {
    padding: 1rem;
  }
}

/* Animation for smooth scroll */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Focus states for accessibility */
.resource-link:focus,
.website-card:focus,
.resource-btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .hero {
    background: none !important;
    color: black !important;
    padding: 1rem 0;
  }
  
  .hero-title,
  .hero-subtitle {
    color: black !important;
  }
  
  .card,
  .resource-card,
  .website-card {
    box-shadow: none !important;
    border: 1px solid #ccc !important;
    break-inside: avoid;
  }
}
</style>