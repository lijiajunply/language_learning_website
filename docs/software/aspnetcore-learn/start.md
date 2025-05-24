---
layout: doc
title: 学习概要
description: 系统学习C#、ASP.NET Core WebAPI、EF Core，构建现代化后端应用
---

<script setup>
import { ref } from 'vue'

const learningPhases = ref([
  { 
    phase: 'C# 语言基础', 
    period: '第1-3周', 
    completed: false, 
    color: '#239B56',
    topics: ['语法基础', '面向对象', '集合与泛型', '异步编程', 'LINQ']
  },
  { 
    phase: 'ASP.NET Core WebAPI', 
    period: '第4-6周', 
    completed: false, 
    color: '#3498DB',
    topics: ['RESTful API', '控制器与路由', '中间件', '依赖注入', '身份验证']
  },
  { 
    phase: 'Entity Framework Core', 
    period: '第7-8周', 
    completed: false, 
    color: '#E74C3C',
    topics: ['Code First', '数据模型', 'CRUD操作', '关系映射', '迁移管理']
  },
  { 
    phase: '综合实战项目', 
    period: '第9-10周', 
    completed: false, 
    color: '#8E44AD',
    topics: ['项目架构', 'API设计', '数据库设计', '测试', '部署']
  }
])

const togglePhase = (index) => {
  learningPhases.value[index].completed = !learningPhases.value[index].completed
}

const techStack = ref([
  { name: 'C#', icon: '🔷', description: 'Microsoft 强类型编程语言', level: '基础必学' },
  { name: 'ASP.NET Core', icon: '🌐', description: '跨平台 Web 框架', level: '核心技能' },
  { name: 'EF Core', icon: '🗄️', description: '对象关系映射框架', level: '数据访问' },
  { name: 'SQL', icon: '💾', description: '数据库', level: '数据存储' }
])
</script>

<style scoped>
/* CSS 变量定义 */
:root {
  --hero-bg-start: #667eea;
  --hero-bg-end: #764ba2;
  --hero-text: #ffffff;
  --card-bg: #f8f9fa;
  --card-bg-gradient-start: #f8f9fa;
  --card-bg-gradient-end: #e9ecef;
  --card-border: #dee2e6;
  --card-hover-border: #007bff;
  --text-primary: #2c3e50;
  --text-secondary: #6c757d;
  --text-muted: #6c757d;
  --timeline-bg: #dee2e6;
  --phase-content-bg: #ffffff;
  --phase-content-border: #e9ecef;
  --phase-completed-bg: #d4edda;
  --phase-completed-border: #28a745;
  --topic-tag-bg: #f8f9fa;
  --topic-tag-border: #dee2e6;
  --topic-tag-text: #495057;
  --resources-bg: #f8f9fa;
  --resources-border: #007bff;
  --resource-border: #e9ecef;
  --project-bg-start: #74b9ff;
  --project-bg-end: #0984e3;
  --feature-item-bg: rgba(255,255,255,0.2);
  --tips-bg: #ffeaa7;
  --tips-bg-end: #fdcb6e;
  --tips-text: #2d3436;
  --footer-bg: #f8f9fa;
  --footer-text: #495057;
  --status-pending-bg: #fff3cd;
  --status-pending-text: #856404;
  --status-completed-bg: #d4edda;
  --status-completed-text: #155724;
}

/* 暗黑模式变量 */
.dark {
  --hero-bg-start: #2d3748;
  --hero-bg-end: #4a5568;
  --hero-text: #f7fafc;
  --card-bg: #2d3748;
  --card-bg-gradient-start: #2d3748;
  --card-bg-gradient-end: #4a5568;
  --card-border: #4a5568;
  --card-hover-border: #63b3ed;
  --text-primary: #f7fafc;
  --text-secondary: #a0aec0;
  --text-muted: #718096;
  --timeline-bg: #4a5568;
  --phase-content-bg: #1a202c;
  --phase-content-border: #4a5568;
  --phase-completed-bg: #22543d;
  --phase-completed-border: #38a169;
  --topic-tag-bg: #2d3748;
  --topic-tag-border: #4a5568;
  --topic-tag-text: #e2e8f0;
  --resources-bg: #2d3748;
  --resources-border: #63b3ed;
  --resource-border: #4a5568;
  --project-bg-start: #2b6cb0;
  --project-bg-end: #2c5282;
  --feature-item-bg: rgba(255,255,255,0.1);
  --tips-bg: #744210;
  --tips-bg-end: #975a16;
  --tips-text: #fef5e7;
  --footer-bg: #2d3748;
  --footer-text: #a0aec0;
  --status-pending-bg: #744210;
  --status-pending-text: #fef5e7;
  --status-completed-bg: #22543d;
  --status-completed-text: #c6f6d5;
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

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tech-card {
  background: linear-gradient(135deg, var(--card-bg-gradient-start) 0%, var(--card-bg-gradient-end) 100%);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.6s ease;
}

.dark .tech-card::before {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
}

.tech-card:hover::before {
  left: 100%;
}

.tech-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  border-color: var(--card-hover-border);
}

.dark .tech-card:hover {
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}

.tech-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.tech-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.tech-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.tech-level {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #007bff;
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.dark .tech-level {
  background: #63b3ed;
  color: #1a202c;
}

.learning-timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline-connector {
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #007bff, var(--timeline-bg));
}

.dark .timeline-connector {
  background: linear-gradient(to bottom, #63b3ed, var(--timeline-bg));
}

.phase-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 4.5rem;
}

.phase-marker {
  position: absolute;
  left: 0.8rem;
  top: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--phase-color);
  border: 4px solid var(--phase-content-bg);
  box-shadow: 0 0 0 3px var(--phase-color);
  z-index: 2;
}

.phase-content {
  background: var(--phase-content-bg);
  border: 2px solid var(--phase-content-border);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.phase-content:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  transform: translateX(5px);
}

.dark .phase-content:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.phase-content.completed {
  background: var(--phase-completed-bg);
  border-color: var(--phase-completed-border);
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.phase-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.phase-period {
  background: var(--text-secondary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.dark .phase-period {
  background: #4a5568;
  color: #e2e8f0;
}

.phase-status {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: 1rem;
}

.status-pending {
  background: var(--status-pending-bg);
  color: var(--status-pending-text);
  border: 1px solid var(--status-pending-bg);
}

.status-completed {
  background: var(--status-completed-bg);
  color: var(--status-completed-text);
  border: 1px solid var(--phase-completed-border);
}

.topics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.topic-tag {
  background: var(--topic-tag-bg);
  border: 1px solid var(--topic-tag-border);
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--topic-tag-text);
  transition: all 0.2s ease;
}

.topic-tag:hover {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.dark .topic-tag:hover {
  background: #63b3ed;
  color: #1a202c;
  border-color: #63b3ed;
}

.resources-section {
  background: var(--resources-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  border-left: 5px solid var(--resources-border);
}

.resource-category {
  margin-bottom: 1.5rem;
}

.resource-category h4 {
  color: var(--resources-border);
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.resource-list {
  list-style: none;
  padding: 0;
}

.resource-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--resource-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  color: var(--text-primary);
}

.resource-list li:last-child {
  border-bottom: none;
}

.resource-list a {
  color: var(--resources-border);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.resource-list a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.resource-icon {
  font-size: 1.2rem;
}

.project-showcase {
  background: linear-gradient(135deg, var(--project-bg-start) 0%, var(--project-bg-end) 100%);
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  text-align: center;
}

.project-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.project-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.feature-item {
  background: var(--feature-item-bg);
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.tips-section {
  background: linear-gradient(135deg, var(--tips-bg) 0%, var(--tips-bg-end) 100%);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.tips-section h4 {
  color: var(--tips-text);
  margin-bottom: 1rem;
}

.tips-section ul {
  color: var(--tips-text);
  margin: 0;
  padding-left: 1.5rem;
}

.tips-section li {
  margin-bottom: 0.5rem;
}

.footer-section {
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background: var(--footer-bg);
  border-radius: 8px;
}

.footer-section h3 {
  color: var(--footer-text);
  margin-bottom: 1rem;
}

.footer-section p {
  color: var(--text-muted);
  margin: 0;
}

.footer-section p:last-child {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .tech-stack-grid {
    grid-template-columns: 1fr;
  }
  
  .phase-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .phase-status {
    margin-left: 0;
    margin-top: 0.5rem;
  }
  
  .project-features {
    grid-template-columns: 1fr;
  }

  /* .resource-list li{
    justify-content: flex-start;
  } */
}
</style>

<div class="hero-section">
  <h1 class="hero-title">⚡ C# 后端学习概要</h1>
  <p class="hero-subtitle">掌握C#、ASP.NET Core WebAPI、EF Core，构建企业级后端应用</p>
</div>

## 🛠️ 技术栈概览

<div class="tech-stack-grid">
  <div 
    v-for="tech in techStack" 
    :key="tech.name"
    class="tech-card"
  >
    <span class="tech-icon">{{ tech.icon }}</span>
    <h3 class="tech-name">{{ tech.name }}</h3>
    <p class="tech-description">{{ tech.description }}</p>
    <span class="tech-level">{{ tech.level }}</span>
  </div>
</div>

## 📚 学习资源推荐

<div class="resources-section">
  <div class="resource-category">
    <h4>📖 官方文档</h4>
    <ul class="resource-list">
      <li>
        <span>
          <span class="resource-icon">🔷</span>
          <a href="https://docs.microsoft.com/zh-cn/dotnet/csharp/" target="_blank">C# 官方文档</a>
        </span>
        最权威的语言参考
      </li>
      <li>
        <span>
          <span class="resource-icon">🌐</span>
          <a href="https://docs.microsoft.com/zh-cn/aspnet/core/" target="_blank">ASP.NET Core 文档</a>
        </span>
        完整的框架指南
      </li>
      <li>
        <span>
          <span class="resource-icon">🗄️</span>
          <a href="https://docs.microsoft.com/zh-cn/ef/core/" target="_blank">EF Core 文档</a>
        </span>
        数据访问技术详解
      </li>
    </ul>
  </div>

  <div class="resource-category">
    <h4>🔧 开发工具</h4>
    <ul class="resource-list">
      <li>
        <span>
          <span class="resource-icon">💻</span>
          <a href="https://visualstudio.microsoft.com/zh-hans/vs/" target="_blank">Visual Studio 2022 Community </a> 
        </span>
        免费强大的IDE
      </li>
      <li>
        <span>
          <span class="resource-icon">⚡</span>
          <a href="https://code.visualstudio.com/download" target="_blank">Visual Studio Code </a> 
        </span>
        轻量级编辑器
      </li>
      <li>
        <span>
          <span class="resource-icon">🔄</span>
          <a href="https://www.jetbrains.com/zh-cn/rider/download/" target="_blank">Rider</a> 
        </span>
        JetBrains 团队的 IDE 
      </li>
    </ul>
  </div>
</div>

## 🗓️ 学习路径规划

<div class="learning-timeline">
  <div class="timeline-connector"></div>
  <div 
    v-for="(phase, index) in learningPhases" 
    :key="index"
    class="phase-item"
    :style="{ '--phase-color': phase.color }"
    @click="togglePhase(index)"
  >
    <div class="phase-marker"></div>
    <div class="phase-content" :class="{ completed: phase.completed }">
      <div class="phase-header">
        <h3 class="phase-title">{{ phase.phase }}</h3>
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <span class="phase-period">{{ phase.period }}</span>
          <span 
            class="phase-status"
            :class="phase.completed ? 'status-completed' : 'status-pending'"
          >
            {{ phase.completed ? '✅ 已完成' : '🔄 学习中' }}
          </span>
        </div>
      </div>
      <div class="topics-list">
        <span 
          v-for="topic in phase.topics" 
          :key="topic"
          class="topic-tag"
        >
          {{ topic }}
        </span>
      </div>
      <p v-if="!phase.completed" style="margin: 1rem 0 0 0; color: var(--text-muted); font-size: 0.9rem;">
        💡 点击标记完成进度，跟踪学习状态
      </p>
    </div>
  </div>
</div>

## 🚀 实战项目：个人博客管理系统

<div class="project-showcase">
  <h2 class="project-title">🎯 综合实战项目</h2>
  <p>运用所学技术栈，构建一个完整的个人博客管理系统</p>
  
  <div class="project-features">
    <div class="feature-item">
      <h4>🔐 用户认证</h4>
      <p>JWT身份验证与授权</p>
    </div>
    <div class="feature-item">
      <h4>📝 内容管理</h4>
      <p>博客文章CRUD操作</p>
    </div>
    <div class="feature-item">
      <h4>🗄️ 数据存储</h4>
      <p>EF Core + SQL Server</p>
    </div>
    <div class="feature-item">
      <h4>🌐 RESTful API</h4>
      <p>标准化接口设计</p>
    </div>
  </div>
</div>

## 💡 学习建议

<div class="tips-section">
  <h4>🎯 高效学习策略</h4>
  <ul>
    <li><strong>理论与实践结合：</strong>每学习一个概念立即编写代码验证</li>
    <li><strong>循序渐进：</strong>先掌握C#基础，再学习框架应用</li>
    <li><strong>项目驱动：</strong>通过实际项目巩固所学知识</li>
    <li><strong>社区交流：</strong>积极参与技术社区讨论，解决问题</li>
    <li><strong>版本管理：</strong>使用Git管理代码，养成良好习惯</li>
  </ul>
</div>

## 📈 学习成果检验

- ✅ 能够使用C#编写面向对象程序
- ✅ 熟练创建和配置ASP.NET Core WebAPI项目
- ✅ 掌握EF Core进行数据库操作
- ✅ 能够设计和实现RESTful API
- ✅ 理解依赖注入和中间件概念
- ✅ 完成一个完整的后端项目

---

<div class="footer-section">
  <h3>🌟 开启后端开发之旅</h3>
  <p>持续学习，不断实践，成为优秀的.NET后端开发者！</p>
  <p>有疑问记得及时在群里讨论交流 💬</p>
</div>