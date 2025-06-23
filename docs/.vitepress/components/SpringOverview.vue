<template>
  <div class="spring-overview">
    <!-- 头部横幅 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.99 5.16-.25 9-4.44 9-9.99V7l-10-5z" />
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
        <div style="font-size: 16px;text-align: center;margin-bottom: 2.5rem;">点击即可查看每周任务</div>
        <div class="roadmap">
          <div class="roadmap-item" v-for="(step, index) in learningPath" :key="step.id" @click="toggleTask(index)">
            <div class="roadmap-marker">
              <span v-if="!step.isChoose" class="step-number">{{ step.id }}</span>
              <span v-else class="step-number">选学</span>
            </div>
            <div class="roadmap-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="topics">
                <span v-for="topic in step.topics" :key="topic" class="topic-tag">
                  {{ topic }}
                </span>
              </div>
              <div class="task-list" v-if="expandedIndex === index">
                <h4>任务</h4>
                <ul>
                  <li v-for="(task, taskIndex) in step.task" :key="taskIndex">
                    {{ task }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { h } from 'vue'

const expandedIndex = ref(null)

const toggleTask = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
}

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
    title: 'Java基础 - 入门与基本语法',
    description: '学习Java概述、环境配置、基本数据类型、变量、运算符、流程控制语句。',
    topics: ['Java概述', '环境配置', '基本数据类型', '变量', '运算符', '流程控制语句'],
    task: [
      "控制台计算器：编写一个简单的Java控制台程序，实现加减乘除四则运算。",
      "用户登录模拟：模拟一个简单的用户登录验证，判断用户名和密码是否正确（硬编码用户名和密码即可）。"
    ],
    isChoose: false
  },
  {
    id: 2,
    title: 'Java基础 - 数组与面向对象（上）',
    description: '学习数组（一维、多维数组），面向对象基础（类与对象、封装、构造方法、`this`关键字）。',
    topics: ['数组', '面向对象基础', '类与对象', '封装', '构造方法', 'this关键字'],
    task: [
      "学生信息管理系统（控制台版-数组）：使用数组存储学生姓名、年龄等信息，实现简单的增删改查功能。",
      "图书类设计：设计一个`Book`类，包含书名、作者、价格等属性和显示图书信息的方法。"
    ],
    isChoose: false
  },
  {
    id: 3,
    title: 'Java基础 - 面向对象（下）与异常',
    description: '学习面向对象特性（继承、多态、`super`关键字、方法重写与重载）、`final`关键字、抽象类与接口、异常处理（try-catch-finally）。',
    topics: ['面向对象特性', '继承', '多态', 'super关键字', '方法重写与重载', 'final关键字', '抽象类', '接口', '异常处理'],
    task: [
      "动物世界模拟：设计`Animal`抽象类，派生出`Dog`、`Cat`等子类，演示继承和多态。",
      "自定义异常与健壮性：在第2周的学生信息管理系统中引入异常处理，例如处理非法输入等，并尝试定义一个简单的自定义异常。"
    ],
    isChoose: false
  },
  {
    id: 4,
    title: 'Java基础 - 常用类与容器初步',
    description: '学习常用Java类（`String`、`StringBuilder`、日期时间API如`Date`、`Calendar`、`LocalDateTime`、包装类）；集合框架基础（`ArrayList`、`HashSet`、`HashMap`的初步使用）。',
    topics: ['常用Java类', 'String', 'StringBuilder', '日期时间API', '包装类', '集合框架基础', 'ArrayList', 'HashSet', 'HashMap'],
    task: [
      "日程管理小工具：使用`LocalDateTime`等处理日期时间，实现添加日程、查询未来日程的功能。",
      "“你画我猜”单词本：使用`HashMap`存储单词及其解释，实现通过单词查询解释的功能（可加入随即抽取单词进行“猜词”）。"
    ],
    isChoose: false
  },
  {
    id: 5,
    title: 'Java基础 - IO流',
    description: '学习IO流概述、字节流（`FileInputStream`、`FileOutputStream`）、字符流（`FileReader`、`FileWriter`）、缓冲流、对象流、文件操作。',
    topics: ['IO流概述', '字节流', '字符流', '缓冲流', '对象流', '文件操作'],
    task: [
      "学生信息持久化：扩展第3周的学生信息管理系统，实现将学生数据保存到文件（例如CSV或txt文件）和从文件加载数据的功能。",
      "简单的文本加密/解密：编写程序读取一个文本文件，对其内容进行简单的加密（例如每个字符ASCII值+1）后写入另一个文件，并实现解密功能。"
    ],
    isChoose: false
  },
  {
    id: 100,
    title: 'Java基础 - 多线程与网络编程',
    description: '学习多线程（创建、生命周期、同步、线程池），网络编程（Socket编程基础：TCP客户端和服务端）。',
    topics: ['多线程', '线程生命周期', '线程同步', '线程池', '网络编程', 'Socket编程', 'TCP客户端通信', 'TCP服务端通信'],
    task: [
      "多线程秒表：编写一个多线程程序，模拟一个秒表，可以启动、暂停、复位。",
      "简易聊天室（单客户端）：实现一个简单的TCP聊天程序，一个服务端可以与一个客户端进行双向通信。"
    ],
    isChoose: true
  },
  {
    id: 6,
    title: 'Java ORM - JDBC与数据库连接池',
    description: '学习数据库基础（SQL复习）、JDBC核心API（`Connection`、`Statement`、`PreparedStatement`、`ResultSet`）、事务管理、主流数据库连接池（Druid或HikariCP）的原理与使用。',
    topics: ['数据库基础', 'SQL', 'JDBC核心API', '事务管理', '数据库连接池', 'Druid', 'HikariCP'],
    task: [
      "JDBC版学生管理系统：将第5周的学生信息管理系统的数据存储层切换为MySQL或PostgreSQL数据库，使用JDBC实现对学生信息的增删改查操作，并引入数据库连接池。"
    ],
    isChoose: false
  },
  {
    id: 7,
    title: 'Java ORM - MyBatis核心',
    description: '学习ORM概念、MyBatis框架概述、MyBatis基本配置（`SqlSessionFactory`）、Mapper接口与XML映射文件、CRUD操作（`select`、`insert`、`update`、`delete`）。',
    topics: ['ORM概念', 'MyBatis框架', 'MyBatis配置', 'Mapper接口', 'XML映射文件', 'CRUD操作'],
    task: [
      "MyBatis版学生管理系统：重构第7周的学生管理系统，用MyBatis取代纯JDBC，实现学生信息的增删改查。体验MyBatis带来的SQL与Java代码分离的便利。"
    ],
    isChoose: false
  },
  {
    id: 8,
    title: 'Java ORM - MyBatis高级',
    description: '学习动态SQL（`if`、`where`、`set`、`foreach`等）、结果映射、关联查询（一对一、一对多、多对多）、缓存机制、枚举类型处理器。',
    topics: ['动态SQL', '结果映射', '关联查询', 'MyBatis缓存机制', '枚举类型处理器'],
    task: [
      "博客系统数据层：设计一个简单的博客系统数据库（用户、文章、评论），使用MyBatis实现用户注册、文章发布、评论发表、文章列表及其作者和评论数量查询（使用关联映射和动态SQL）。"
    ],
    isChoose: false
  },
  {
    id: 9,
    title: 'Spring - IoC与DI',
    description: '学习Spring框架概述、IoC（控制反转）容器、DI（依赖注入）、Bean的定义与配置（XML和注解方式）、Bean的作用域与生命周期。',
    topics: ['Spring框架概述', 'IoC（控制反转）', 'DI（依赖注入）', 'Bean定义', 'XML配置', '注解配置', 'Bean作用域', 'Bean生命周期'],
    task: [
      "Spring版学生服务：将第8周学生管理系统的服务层（如StudentService）改造为Spring管理的Bean，使用依赖注入方式管理DAO层的依赖，体验IoC的便利。"
    ],
    isChoose: false
  },
  {
    id: 10,
    title: 'Spring - AOP与事务管理',
    description: '学习AOP（面向切面编程）概念、代理模式、Spring AOP实现（切点表达式、通知类型）、Spring声明式事务管理（基于XML和注解）。',
    topics: ['AOP（面向切面编程）', '代理模式', 'Spring AOP', '切点表达式', '通知类型', 'Spring事务管理', '声明式事务'],
    task: [
      "日志与事务切面：为第10周的学生服务添加AOP日志切面，记录方法执行时间或参数。为数据库操作方法添加Spring的声明式事务管理。"
    ],
    isChoose: false
  },
  {
    id: 11,
    title: 'Spring MVC - Web开发基础',
    description: '学习MVC设计模式、Spring MVC核心组件（`DispatcherServlet`、`Controller`、`Service`、`Repository`、`ViewResolver`）、请求映射、参数绑定、重定向与转发。',
    topics: ['MVC设计模式', 'Spring MVC', 'DispatcherServlet', 'Controller', 'Service', 'Repository', 'ViewResolver', '请求映射', '参数绑定', '重定向', '转发'],
    task: [
      "Web版学生管理系统：基于Spring MVC搭建一个Web应用，实现学生信息的网页展示、添加、修改和删除功能。使用简单的JSP或Thymeleaf作为视图层。"
    ],
    isChoose: false
  },
  {
    id: 12,
    title: 'Spring Boot - 快速开发',
    description: '学习Spring Boot核心特性（起步依赖、自动配置）、项目结构、配置文件（`application.properties`/`application.yml`）、内嵌Tomcat、打包装。',
    topics: ['Spring Boot', '起步依赖', '自动配置', '项目结构', '配置文件', '内嵌Tomcat', '部署打包'],
    task: [
      "Spring Boot版学生管理系统：将第12周的Spring MVC项目改造为Spring Boot项目，简化配置，并尝试使用Spring Data JPA进行数据访问（或继续使用MyBatis集成）。"
    ],
    isChoose: false
  },
  {
    id: 13,
    title: 'Spring Boot进阶与数据访问',
    description: '学习Spring Data JPA深度（实体、Repository、自定义查询）、MyBatis与Spring Boot集成细节、RESTful API设计原则。',
    topics: ['Spring Data JPA', 'Repository', '自定义查询', 'MyBatis与Spring Boot集成', 'RESTful API设计'],
    task: [
      "RESTful学生管理API：在Spring Boot项目基础上，提供一套符合RESTful规范的学生信息管理API接口。用Postman或其他工具测试接口。"
    ],
    isChoose: false
  },
  {
    id: 15,
    title: 'Spring Security与高级概念',
    description: '学习Spring Security入门（认证与授权）、过滤器链、基于表单的登录、内存用户与数据库用户、角色权限控制。了解微服务概念（Spring Cloud概览）。',
    topics: ['Spring Security', '认证', '授权', '过滤器链', '表单登录', '内存用户', '数据库用户', '角色权限控制', '微服务', 'Spring Cloud'],
    task: [
      "API鉴权与权限控制：为第14周的学生管理API添加Spring Security，实现用户登录、基于角色的API访问控制。例如，只有管理员能添加/删除学生，普通用户只能查看。"
    ],
    isChoose: true
  }
]);
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
  margin-bottom: 1rem;
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
  cursor: pointer;
  transition: all 0.3s ease;
}

.roadmap-item:hover {
  transform: translateY(-2px);
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
  margin-bottom: 1rem;
}

.topic-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.task-list {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.task-list h4 {
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.task-list ul {
  padding-left: 1.5rem;
  color: var(--vp-c-text-2);
}

.task-list li {
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