---
layout: doc
title: App 开发学习计划
description: 掌握跨平台应用开发，从桌面到移动端的全栈解决方案
---

<script setup>
import { ref } from 'vue'

const frameworks = ref([
  {
    name: 'Avalonia',
    icon: '🖥️',
    description: '跨平台桌面应用框架',
    features: ['基于 .NET', 'XAML UI', '高性能渲染'],
    duration: '2-3个月',
    difficulty: '中级',
    color: '#5B21B6'
  },
  {
    name: 'Flutter',
    icon: '📱',
    description: '谷歌跨平台移动开发框架',
    features: ['Dart 语言', '热重载', '丰富组件库'],
    duration: '3-4个月',
    difficulty: '中级',
    color: '#02569B'
  },
  {
    name: '微信小程序',
    icon: '💬',
    description: '微信生态应用开发',
    features: ['类Vue语法', '实时更新', '快速使用'],
    duration: '1-2个月',
    difficulty: '初级',
    color: '#07C160'
  }
])

const learningPath = ref([
  { phase: '基础阶段', weeks: '1-2周', content: '编程基础、开发环境搭建' },
  { phase: '框架学习', weeks: '4-8周', content: '框架核心概念、组件系统' },
  { phase: '实战项目', weeks: '4-6周', content: '完整应用开发、最佳实践' },
  { phase: '进阶优化', weeks: '2-4周', content: '性能优化、发布部署' }
])
</script>

<style scoped>
.hero-section {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(135deg, var(--vp-c-brand-light) 0%, var(--vp-c-brand) 100%);
  border-radius: 16px;
  margin-bottom: 3rem;
  color: white;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.frameworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.framework-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.framework-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-color);
}

.framework-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--card-color);
}

.dark .framework-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.framework-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.framework-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.framework-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.framework-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.framework-features {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.framework-features li {
  padding: 0.5rem 0;
  color: var(--vp-c-text-2);
  position: relative;
  padding-left: 1.5rem;
}

.framework-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--card-color);
  font-weight: bold;
}

.framework-meta {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.meta-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.meta-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.learning-timeline {
  margin: 4rem 0;
}

.timeline-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--vp-c-text-1);
}

.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
}

.timeline-marker {
  width: 40px;
  height: 40px;
  background: var(--vp-c-brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.timeline-content {
  margin-left: 2rem;
  flex: 1;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.timeline-phase {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.timeline-duration {
  color: var(--vp-c-brand);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.timeline-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  margin: 4rem 0;
  padding: 3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.cta-description {
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .frameworks-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .timeline-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .timeline-content {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>

<div class="hero-section">
  <h1 class="hero-title">掌握跨平台应用开发</h1>
  <p class="hero-description">从桌面到移动，从原生到小程序，构建无处不在的应用体验</p>
</div>

## 🚀 学习框架

<div class="frameworks-grid">
  <div 
    v-for="framework in frameworks" 
    :key="framework.name"
    class="framework-card"
    :style="`--card-color: ${framework.color}`"
  >
    <div class="framework-header">
      <span class="framework-icon">{{ framework.icon }}</span>
      <h3 class="framework-name">{{ framework.name }}</h3>
    </div>
    <p class="framework-description">{{ framework.description }}</p>
    <ul class="framework-features">
      <li v-for="feature in framework.features" :key="feature">
        {{ feature }}
      </li>
    </ul>
    <div class="framework-meta">
      <div class="meta-item">
        <span class="meta-label">学习周期</span>
        <span class="meta-value">{{ framework.duration }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">难度等级</span>
        <span class="meta-value">{{ framework.difficulty }}</span>
      </div>
    </div>
  </div>
</div>

## 📚 学习路径

<div class="learning-timeline">
  <h2 class="timeline-title">循序渐进的学习计划</h2>
  <div class="timeline-container">
    <div v-for="(item, index) in learningPath" :key="index" class="timeline-item">
      <div class="timeline-marker">{{ index + 1 }}</div>
      <div class="timeline-content">
        <h3 class="timeline-phase">{{ item.phase }}</h3>
        <div class="timeline-duration">{{ item.weeks }}</div>
        <p class="timeline-description">{{ item.content }}</p>
      </div>
    </div>
  </div>
</div>

## 🎯 核心技能树

### Avalonia 技能要点
- **C# 与 .NET 基础**：掌握面向对象编程
- **XAML 界面设计**：声明式 UI 构建
- **MVVM 架构模式**：数据绑定与命令模式
- **跨平台部署**：Windows、macOS、Linux 发布

### Flutter 技能要点
- **Dart 语言基础**：异步编程、空安全
- **Widget 体系**：StatelessWidget 与 StatefulWidget
- **状态管理**：Provider、Riverpod、GetX
- **平台集成**：原生功能调用、插件开发

### 微信小程序技能要点
- **小程序架构**：理解生命周期、组件化开发
- **WXML 与 WXSS**：小程序专属标记语言
- **云开发能力**：云函数、云数据库
- **微信生态集成**：支付、分享、登录

## 🛠️ 推荐工具与资源

### 开发工具
- **Avalonia**: Visual Studio / JetBrains Rider
- **Flutter**: Android Studio / VS Code + Flutter 插件
- **微信小程序**: 微信开发者工具