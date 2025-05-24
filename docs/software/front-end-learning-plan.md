---
layout: doc
title: 前端学习计划
description: 系统化的前端学习路径，从零基础到实战应用
---

<script setup>
import { ref } from 'vue'

const learningProgress = ref([
  { phase: 'HTML基础', period: '5.24 - 6.1', completed: false, color: '#ff6b6b', darkColor: '#ff8a8a' },
  { phase: 'CSS样式', period: '6.1 - 6.21', completed: false, color: '#4ecdc4', darkColor: '#5cdbd3' },
  { phase: 'JavaScript', period: '6.22 - 暑假前', completed: false, color: '#45b7d1', darkColor: '#64c5e8' }
])

const toggleProgress = (index) => {
  learningProgress.value[index].completed = !learningProgress.value[index].completed
}
</script>

<style scoped>
/* 基础变量定义 */
:root {
  --hero-bg-light: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --hero-bg-dark: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  --card-bg-light: #f8f9fa;
  --card-bg-dark: #2d3748;
  --card-border-light: #e9ecef;
  --card-border-dark: #4a5568;
  --text-primary-light: #495057;
  --text-primary-dark: #e2e8f0;
  --text-secondary-light: #6c757d;
  --text-secondary-dark: #a0aec0;
  --timeline-bg-light: #dee2e6;
  --timeline-bg-dark: #4a5568;
  --content-bg-light: white;
  --content-bg-dark: #1a202c;
  --shadow-light: rgba(0,0,0,0.1);
  --shadow-dark: rgba(0,0,0,0.3);
  --tips-bg-light: #e3f2fd;
  --tips-bg-dark: #2a4365;
  --tips-border-light: #2196f3;
  --tips-border-dark: #63b3ed;
  --tips-text-light: #1976d2;
  --tips-text-dark: #90cdf4;
}

.hero-section {
  background: linear-gradient(135deg, var(--hero-bg-start) 0%, var(--hero-bg-end) 100%);
  color: var(--hero-text);
  padding: 3rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
  animation: float 20s linear infinite;
}

@keyframes float {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}

.resource-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.resource-card {
  background: var(--card-bg-light);
  border: 1px solid var(--card-border-light);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.dark .resource-card {
  background: var(--card-bg-dark);
  border-color: var(--card-border-dark);
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px var(--shadow-light);
}

.dark .resource-card:hover {
  box-shadow: 0 8px 25px var(--shadow-dark);
}

.resource-card h4 {
  color: var(--text-primary-light);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.dark .resource-card h4 {
  color: var(--text-primary-dark);
}

.resource-card ul {
  margin: 0;
  padding-left: 1.2rem;
}

.resource-card li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: var(--text-secondary-light);
  transition: color 0.3s ease;
}

.dark .resource-card li {
  color: var(--text-secondary-dark);
}

.resource-card a {
  color: #007acc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.resource-card a:hover {
  color: #005999;
  text-decoration: underline;
}

.dark .resource-card a {
  color: #63b3ed;
}

.dark .resource-card a:hover {
  color: #90cdf4;
}

.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--timeline-bg-light);
  transition: background 0.3s ease;
}

.dark .timeline::before {
  background: var(--timeline-bg-dark);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 4rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--phase-color);
  border: 3px solid var(--content-bg-light);
  box-shadow: 0 0 0 3px var(--phase-color);
  transition: border-color 0.3s ease;
}

.dark .timeline-item::before {
  border-color: var(--content-bg-dark);
}

.timeline-content {
  background: var(--content-bg-light);
  border: 1px solid var(--card-border-light);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px var(--shadow-light);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark .timeline-content {
  background: var(--content-bg-dark);
  border-color: var(--card-border-dark);
  box-shadow: 0 2px 10px var(--shadow-dark);
}

.timeline-content:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.dark .timeline-content:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

.timeline-content.completed {
  background: #d4edda;
  border-color: #c3e6cb;
}

.dark .timeline-content.completed {
  background: #1a4731;
  border-color: #2f855a;
}

.phase-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.phase-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary-light);
  transition: color 0.3s ease;
}

.dark .phase-title {
  color: var(--text-primary-dark);
}

.phase-period {
  color: var(--text-secondary-light);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.dark .phase-period {
  color: var(--text-secondary-dark);
}

.phase-status {
  margin-left: auto;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.dark .status-pending {
  background: #744210;
  color: #faf089;
}

.status-completed {
  background: #d4edda;
  color: #155724;
}

.dark .status-completed {
  background: #1a4731;
  color: #9ae6b4;
}

.learning-modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.module-card {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.3);
  transition: all 0.3s ease;
}

.dark .module-card {
  background: linear-gradient(135deg, #4299e1, #2b6cb0);
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.4);
}

.module-card:hover {
  transform: translateY(-2px);
}

.module-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.module-card p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.tips-box {
  background: var(--tips-bg-light);
  border-left: 4px solid var(--tips-border-light);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.dark .tips-box {
  background: var(--tips-bg-dark);
  border-color: var(--tips-border-dark);
}

.tips-box h4 {
  color: var(--tips-text-light);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.dark .tips-box h4 {
  color: var(--tips-text-dark);
}

.tips-box p {
  margin: 0;
  color: var(--text-primary-light);
  transition: color 0.3s ease;
}

.dark .tips-box p {
  color: var(--text-primary-dark);
}

.tips-box.goal-box {
  background: #f3e5f5;
  border-color: #9c27b0;
}

.dark .tips-box.goal-box {
  background: #322659;
  border-color: #b794f6;
}

.tips-box.goal-box h4 {
  color: #7b1fa2;
}

.dark .tips-box.goal-box h4 {
  color: #d6bcfa;
}

.footer-text {
  text-align: center;
  margin-top: 3rem;
  color: var(--text-secondary-light);
  transition: color 0.3s ease;
}

.dark .footer-text {
  color: var(--text-secondary-dark);
}

/* 进度指示器特殊处理 */
.timeline-item {
  --phase-color: v-bind('learningProgress[0].color');
}

.timeline-item:nth-child(1) {
  --phase-color: v-bind('learningProgress[0].color');
}

.timeline-item:nth-child(2) {
  --phase-color: v-bind('learningProgress[1].color');
}

.timeline-item:nth-child(3) {
  --phase-color: v-bind('learningProgress[2].color');
}

.dark .timeline-item:nth-child(1) {
  --phase-color: v-bind('learningProgress[0].darkColor');
}

.dark .timeline-item:nth-child(2) {
  --phase-color: v-bind('learningProgress[1].darkColor');
}

.dark .timeline-item:nth-child(3) {
  --phase-color: v-bind('learningProgress[2].darkColor');
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--card-bg-light);
}

.dark ::-webkit-scrollbar-track {
  background: var(--card-bg-dark);
}

::-webkit-scrollbar-thumb {
  background: var(--card-border-light);
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: var(--card-border-dark);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary-light);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary-dark);
}
</style>

<div class="hero-section">
  <h1 class="hero-title">🚀 前端学习计划</h1>
  <p class="hero-subtitle">系统化学习HTML、CSS、JavaScript，踏上前端开发之路</p>
</div>

## 📚 学习资源

<div class="resource-cards">
  <div class="resource-card">
    <h4>📖 主要学习资源</h4>
    <ul>
      <li><a href="https://www.w3school.com.cn/" target="_blank">W3School 中文教程</a> - 系统全面的前端基础教程</li>
      <li><a href="https://note.youdao.com/ynoteshare/index.html?id=064133a2038f20eb8d4eaf07d25a0e3a&type=notebook&_time=1748014775160" target="_blank">李哥分享笔记</a> - 实战经验总结</li>
      <li>💡 建议跟随文档学习，前端基础知识容易理解，比视频学习更高效</li>
    </ul>
  </div>

  <div class="resource-card">
    <h4>🛠️ 开发环境配置</h4>
    <ul>
      <li><a href="https://code.visualstudio.com/" target="_blank">下载 VS Code</a> - 强大的代码编辑器</li>
      <li>📹 搜索"VS Code插件配置"视频完成环境搭建</li>
      <li>🎯 配置完成后即可开始实战练习</li>
      <li>💻 学习过程中务必动手实践操作</li>
    </ul>
  </div>
</div>

<div class="tips-box">
  <h4>💡 学习建议</h4>
  <p>前端学习重在实践！建议边学边做，每学完一个知识点就立即编写代码验证，这样能更深入地理解概念并培养编程思维。</p>
</div>

## 🎯 学习模块

<div class="learning-modules">
  <a href="/software/web-basic/html-basics.html">
    <div class="module-card">
      <h3>HTML</h3>
      <p>网页结构基础</p>
    </div>
  </a>
  <a href="/software/web-basic/css-basics.html">
    <div class="module-card">
      <h3>CSS</h3>
      <p>样式与布局设计</p>
    </div>
  </a>
  <a href="/software/web-basic/javascript-basics.html">
    <div class="module-card">
      <h3>JavaScript</h3>
      <p>交互逻辑编程</p>
    </div>
  </a>

  <div class="module-card">
    <h3>Vue</h3>
    <p>基本框架学习</p>
  </div>
  <div class="module-card">
    <h3>Tailwind</h3>
    <p>其他框架学习</p>
  </div>
  <div class="module-card">
    <h3>React</h3>
    <p>其他框架学习</p>
  </div>
</div>

## 📅 学习时间线

<div class="timeline">
  <div 
    v-for="(item, index) in learningProgress" 
    :key="index"
    class="timeline-item"
    @click="toggleProgress(index)"
  >
    <div class="timeline-content" :class="{ completed: item.completed }">
      <div class="phase-header">
        <div>
          <h3 class="phase-title">{{ item.phase }}</h3>
          <span class="phase-period">{{ item.period }}</span>
        </div>
        <span 
          class="phase-status"
          :class="item.completed ? 'status-completed' : 'status-pending'"
        >
          {{ item.completed ? '✅ 已完成' : '⏳ 进行中' }}
        </span>
      </div>
      <p v-if="!item.completed" style="margin: 0.5rem 0 0 0; color: var(--text-secondary-light); transition: color 0.3s ease;">
        点击标记完成进度
      </p>
    </div>
  </div>
</div>

## 🏆 学习目标

::: tip 🎯 阶段目标
在暑假开始前完成前端基础知识学习，为暑假期间的后端学习做好准备。掌握HTML页面结构、CSS样式设计、JavaScript交互编程三大核心技能。
:::

---

<div class="footer-text">
  <p>💪 坚持学习，持续进步！有问题随时在群里讨论交流。</p>
</div>