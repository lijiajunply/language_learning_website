<template>
  <div class="spring-overview">
    <!-- 头部横幅 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.99 5.16-.25 9-4.44 9-9.99V7l-10-5z"/>
          </svg>
        </div>
        <h1 class="hero-title">Spring Framework</h1>
        <p class="hero-subtitle">企业级Java应用开发的首选框架</p>
        <div class="hero-badges">
          <span class="badge">依赖注入</span>
          <span class="badge">面向切面</span>
          <span class="badge">企业级</span>
        </div>
      </div>
    </section>

    <!-- 核心特性 -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">核心特性</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon">
              <component :is="feature.icon" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 学习路径 -->
    <section class="roadmap-section">
      <div class="container">
        <h2 class="section-title">学习路径</h2>
        <div class="roadmap">
          <div class="roadmap-item" v-for="(step, index) in learningPath" :key="step.id">
            <div class="roadmap-marker">
              <span class="step-number">{{ index + 1 }}</span>
            </div>
            <div class="roadmap-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="topics">
                <span v-for="topic in step.topics" :key="topic" class="topic-tag">
                  {{ topic }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 模块介绍 -->
    <section class="modules-section">
      <div class="container">
        <h2 class="section-title">Spring生态系统</h2>
        <div class="modules-grid">
          <div class="module-card" v-for="module in modules" :key="module.name">
            <div class="module-header">
              <h3>{{ module.name }}</h3>
              <span class="module-version">{{ module.version }}</span>
            </div>
            <p class="module-description">{{ module.description }}</p>
            <div class="module-features">
              <span v-for="feature in module.features" :key="feature" class="feature-tag">
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="quickstart-section">
      <div class="container">
        <h2 class="section-title">快速开始</h2>
        <div class="quickstart-content">
          <div class="code-example">
            <h3>创建第一个Spring应用</h3>
            <pre><code class="language-java">@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring!";
    }
}</code></pre>
          </div>
          <div class="quickstart-steps">
            <h3>开始步骤</h3>
            <ol>
              <li>安装Java 8+和Maven/Gradle</li>
              <li>使用Spring Initializr创建项目</li>
              <li>添加必要的依赖</li>
              <li>编写第一个Controller</li>
              <li>运行应用程序</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {h} from 'vue'

// 图标组件
const DatabaseIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z' })
])

const SecurityIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z' })
])

const ComponentIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z' })
])

const WebIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' })
])

// 数据
const features = ref([
  {
    id: 1,
    icon: ComponentIcon,
    title: '依赖注入',
    description: '通过IoC容器管理对象生命周期，降低组件间耦合度'
  },
  {
    id: 2,
    icon: SecurityIcon,
    title: '面向切面编程',
    description: 'AOP支持，轻松实现横切关注点如日志、安全、事务等'
  },
  {
    id: 3,
    icon: DatabaseIcon,
    title: '数据访问',
    description: '统一的数据访问抽象，支持JDBC、JPA、NoSQL等多种数据源'
  },
  {
    id: 4,
    icon: WebIcon,
    title: 'Web开发',
    description: '完整的MVC框架，支持RESTful API和传统Web应用开发'
  }
])

const learningPath = ref([
  {
    id: 1,
    title: 'Spring基础',
    description: '学习Spring核心概念和基本使用方法',
    topics: ['IoC容器', 'Bean管理', '依赖注入', '配置方式']
  },
  {
    id: 2,
    title: 'Spring AOP',
    description: '掌握面向切面编程的理念和实践',
    topics: ['切面概念', '通知类型', '切点表达式', '代理机制']
  },
  {
    id: 3,
    title: 'Spring MVC',
    description: '学习Web应用开发和RESTful API设计',
    topics: ['控制器', '视图解析', '数据绑定', 'REST API']
  },
  {
    id: 4,
    title: 'Spring Boot',
    description: '快速构建生产级Spring应用',
    topics: ['自动配置', '起步依赖', '监控管理', '部署打包']
  },
  {
    id: 5,
    title: '微服务架构',
    description: '使用Spring Cloud构建分布式系统',
    topics: ['服务发现', '配置中心', '熔断器', '网关路由']
  }
])

const modules = ref([
  {
    name: 'Spring Framework',
    version: '6.x',
    description: 'Spring核心框架，提供IoC、AOP等基础功能',
    features: ['IoC容器', 'AOP支持', 'Web MVC', '数据访问']
  },
  {
    name: 'Spring Boot',
    version: '3.x',
    description: '简化Spring应用的创建和部署',
    features: ['自动配置', '内嵌服务器', '监控指标', '开发工具']
  },
  {
    name: 'Spring Security',
    version: '6.x',
    description: '提供认证和授权安全框架',
    features: ['身份认证', '权限控制', 'OAuth2', 'JWT']
  },
  {
    name: 'Spring Data',
    version: '3.x',
    description: '统一的数据访问API',
    features: ['JPA支持', 'MongoDB', 'Redis', '查询方法']
  }
])
</script>

<style scoped>
.spring-overview {
  min-height: 100vh;
}

/* 英雄区域 */
.hero-section {
  background: linear-gradient(135deg, 
    var(--vp-c-brand-1) 0%, 
    var(--vp-c-brand-2) 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-badges {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 区域标题 */
.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

/* 特性区域 */
.features-section {
  padding: 5rem 0;
  background: var(--vp-c-bg);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  color: var(--vp-c-brand-1);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.feature-card p {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* 学习路径 */
.roadmap-section {
  padding: 5rem 0;
  background: var(--vp-c-bg-alt);
}

.roadmap {
  max-width: 800px;
  margin: 0 auto;
}

.roadmap-item {
  display: flex;
  margin-bottom: 3rem;
  position: relative;
}

.roadmap-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 20px;
  top: 60px;
  height: calc(100% + 1rem);
  width: 2px;
  background: var(--vp-c-brand-1);
  opacity: 0.3;
}

.roadmap-marker {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin-right: 2rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 50%;
  font-weight: 600;
}

.roadmap-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.roadmap-content p {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
}

/* 模块区域 */
.modules-section {
  padding: 5rem 0;
  background: var(--vp-c-bg);
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.module-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.module-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.module-header h3 {
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
  margin: 0;
}

.module-version {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.module-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.module-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

/* 快速开始 */
.quickstart-section {
  padding: 5rem 0;
  background: var(--vp-c-bg-alt);
}

.quickstart-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.code-example h3,
.quickstart-steps h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.code-example pre {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
}

.quickstart-steps ol {
  color: var(--vp-c-text-2);
  line-height: 1.8;
  padding-left: 1.5rem;
}

.quickstart-steps li {
  margin-bottom: 0.5rem;
}

/* 暗黑模式适配 */
.dark .hero-section {
  background: linear-gradient(135deg, 
    var(--vp-c-brand-dark) 0%, 
    var(--vp-c-brand-darker) 100%);
}

.dark .feature-card:hover,
.dark .module-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .features-section,
  .roadmap-section,
  .modules-section,
  .quickstart-section {
    padding: 3rem 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .modules-grid {
    grid-template-columns: 1fr;
  }
  
  .quickstart-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .roadmap-marker {
    margin-right: 1rem;
  }
  
  .roadmap-item:not(:last-child)::after {
    left: 15px;
  }
  
  .hero-badges {
    gap: 0.5rem;
  }
  
  .badge {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .roadmap-item {
    flex-direction: column;
  }
  
  .roadmap-marker {
    margin-bottom: 1rem;
    margin-right: 0;
  }
  
  .roadmap-item:not(:last-child)::after {
    display: none;
  }
}
</style>