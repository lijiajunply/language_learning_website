---
layout: page
title: 后端开发学习路径
description: Java Spring 与 C# ASP.NET Core WebAPI 完整学习指南
---

<script setup>
import { ref, onMounted } from 'vue'

const frameworks = ref([
  {
    id: 'spring',
    name: 'Java Spring',
    logo: '☕',
    color: '#6DB33F',
    description: '企业级Java开发框架',
    popularity: '95%',
    difficulty: '中等',
    learningTime: '3-6个月',
    keyFeatures: [
      '依赖注入 (DI)',
      'Spring Boot 快速开发',
      'Spring Security 安全框架',
      'Spring Data JPA 数据访问',
      'Spring Cloud 微服务'
    ],
    roadmap: [
      { phase: '基础', topics: ['Java基础', 'Maven/Gradle', 'Spring Core'], duration: '4-6周' },
      { phase: '进阶', topics: ['Spring Boot', 'Spring MVC', 'REST API'], duration: '6-8周' },
      { phase: '高级', topics: ['微服务', 'Spring Cloud', '性能优化'], duration: '8-12周' }
    ]
  },
  {
    id: 'aspnet',
    name: 'C# ASP.NET Core',
    logo: '🔷',
    color: '#512BD4',
    description: '微软跨平台Web框架',
    popularity: '88%',
    difficulty: '中等',
    learningTime: '2-5个月',
    keyFeatures: [
      '跨平台支持',
      '高性能 Web API',
      'Entity Framework Core',
      '内置依赖注入',
      'SignalR 实时通信'
    ],
    roadmap: [
      { phase: '基础', topics: ['C#基础', '.NET Core', 'Web API基础'], duration: '3-5周' },
      { phase: '进阶', topics: ['Entity Framework', '认证授权', '中间件'], duration: '5-7周' },
      { phase: '高级', topics: ['微服务', 'Docker部署', '性能调优'], duration: '6-10周' }
    ]
  }
])

const activeFramework = ref('spring')
const currentPhase = ref({})

onMounted(() => {
  // 初始化动画
  const cards = document.querySelectorAll('.framework-card')
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
  })
})

const selectFramework = (id) => {
  activeFramework.value = id
}

const setCurrentPhase = (frameworkId, phase) => {
  currentPhase.value = { ...currentPhase.value, [frameworkId]: phase }
}
</script>

<div class="backend-overview">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="gradient-text">后端开发</span>
        学习路径
      </h1>
      <p class="hero-description">
        掌握现代后端开发技术栈，从Java Spring到C# ASP.NET Core，
        构建高性能、可扩展的企业级应用程序
      </p>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-number">2</span>
          <span class="stat-label">主流框架</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">6+</span>
          <span class="stat-label">学习月数</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">100+</span>
          <span class="stat-label">技能点</span>
        </div>
      </div>
    </div>
  </section>
  <!-- Framework Comparison -->
  <section class="comparison-section">
    <h2 class="section-title">框架对比分析</h2>
    <div class="framework-grid">
      <div 
        v-for="framework in frameworks" 
        :key="framework.id"
        class="framework-card"
        :class="{ active: activeFramework === framework.id }"
        @click="selectFramework(framework.id)"
      >
        <div class="card-header">
          <span class="framework-logo">{{ framework.logo }}</span>
          <h3 class="framework-name">{{ framework.name }}</h3>
          <div class="popularity-badge">
            热度 {{ framework.popularity }}
          </div>
        </div>
        <p class="framework-description">{{ framework.description }}</p>
        <div class="framework-metrics">
          <div class="metric">
            <span class="metric-label">难度</span>
            <span class="metric-value">{{ framework.difficulty }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">学习时间</span>
            <span class="metric-value">{{ framework.learningTime }}</span>
          </div>
        </div>
        <div class="key-features">
          <h4>核心特性</h4>
          <ul>
            <li v-for="feature in framework.keyFeatures" :key="feature">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Learning Roadmap -->
  <section class="roadmap-section">
    <h2 class="section-title">学习路线图</h2>
    <div class="framework-tabs">
      <button 
        v-for="framework in frameworks"
        :key="framework.id"
        class="tab-button"
        :class="{ active: activeFramework === framework.id }"
        @click="selectFramework(framework.id)"
      >
        <span class="tab-logo">{{ framework.logo }}</span>
        {{ framework.name }}
      </button>
    </div>
    <div class="roadmap-content">
      <div 
        v-for="framework in frameworks" 
        :key="framework.id"
        v-show="activeFramework === framework.id"
        class="roadmap-phases"
      >
        <div 
          v-for="(phase, index) in framework.roadmap" 
          :key="index"
          class="phase-card"
          :class="{ expanded: currentPhase[framework.id] === index }"
          @click="setCurrentPhase(framework.id, currentPhase[framework.id] === index ? null : index)"
        >
          <div class="phase-header">
            <div class="phase-number">{{ index + 1 }}</div>
            <div class="phase-info">
              <h4>{{ phase.phase }}阶段</h4>
              <span class="phase-duration">{{ phase.duration }}</span>
            </div>
            <div class="expand-icon">
              <span>{{ currentPhase[framework.id] === index ? '−' : '+' }}</span>
            </div>
          </div>
          <div class="phase-content">
            <div class="topics-grid">
              <div 
                v-for="topic in phase.topics" 
                :key="topic"
                class="topic-tag"
              >
                {{ topic }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style scoped>
.backend-overview {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 4rem 0 6rem;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border-radius: 2rem;
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, #6DB33F 0%, #512BD4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

/* Framework Grid */
.comparison-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--vp-c-text-1);
}

.framework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.framework-card {
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 1.5rem;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.framework-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.framework-card.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-1), 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.framework-logo {
  font-size: 2rem;
}

.framework-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.popularity-badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.framework-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.framework-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 0.75rem;
}

.metric-label {
  display: block;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.metric-value {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.key-features h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.key-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.key-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.key-features li:last-child {
  border-bottom: none;
}

.key-features li::before {
  content: '✓';
  color: var(--vp-c-brand-1);
  font-weight: bold;
  margin-right: 0.5rem;
}

/* Roadmap Section */
.roadmap-section {
  margin-bottom: 4rem;
}

.framework-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-button:hover {
  border-color: var(--vp-c-brand-1);
}

.tab-button.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
}

.tab-logo {
  font-size: 1.2rem;
}

.roadmap-phases {
  max-width: 800px;
  margin: 0 auto;
}

.phase-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.phase-card:hover {
  border-color: var(--vp-c-brand-1);
}

.phase-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
}

.phase-number {
  width: 3rem;
  height: 3rem;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
}

.phase-info {
  flex: 1;
}

.phase-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.phase-duration {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.expand-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}

.phase-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.phase-card.expanded .phase-content {
  max-height: 200px;
}

.topics-grid {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.topic-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Quick Start Section */
.quickstart-section {
  margin-bottom: 4rem;
}

.quickstart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.quickstart-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 1.5rem;
  padding: 2rem;
  overflow: hidden;
}

.quickstart-card h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
}

.code-snippet {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.code-snippet pre {
  margin: 0;
  padding: 1.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.code-snippet code {
  color: var(--vp-c-text-1);
  font-family: 'Fira Code', monospace;
}

.quickstart-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.link-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  flex: 1;
  min-width: 120px;
}

.link-button:not(.secondary) {
  background: var(--vp-c-brand-1);
  color: white;
}

.link-button:not(.secondary):hover {
  background: var(--vp-c-brand-2);
}

.link-button.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
}

.link-button.secondary:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

/* 暗黑模式适配 */
.dark .framework-card:hover {
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
}

.dark .code-snippet {
  background: #1a1a1a;
  border-color: #333;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .backend-overview {
    padding: 1rem 0.5rem;
  }
  
  .hero-section {
    padding: 2rem 1rem 3rem;
    margin-bottom: 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .hero-stats {
    gap: 1.5rem;
  }
  
  .framework-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .framework-card {
    padding: 1.5rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .framework-metrics {
    grid-template-columns: 1fr;
  }
  
  .framework-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .phase-header {
    padding: 1rem;
  }
  
  .phase-number {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
  
  .quickstart-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .quickstart-card {
    padding: 1.5rem;
  }
  
  .code-snippet pre {
    padding: 1rem;
    font-size: 0.8rem;
  }
  
  .link-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
  
  .topics-grid {
    padding: 0 1rem 1rem;
  }
  
  .topic-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .quickstart-links {
    flex-direction: column;
  }
}
</style>