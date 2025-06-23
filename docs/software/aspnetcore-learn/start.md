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

// 添加每周学习任务数据
const weeklyTasks = ref([
  {
    week: 1,
    title: "C# 基础入门与环境搭建",
    goal: "搭建好开发环境，掌握C#最基础的语法，能够编写简单的控制台应用程序。",
    content: [
      {
        title: "写在前面",
        items: ["阅读此部分，建立正确的学习心态。"]
      },
      {
        title: "开发环境搭建",
        items: [
          "安装 .NET SDK",
          "安装 Visual Studio 2022 (推荐，社区版免费) 或 VS Code (配合C#插件)。",
          "创建并运行第一个 \"Hello World\" 控制台应用。"
        ]
      },
      {
        title: "基础语法",
        items: [
          "变量、数据类型 (int, string, bool, double 等)。",
          "运算符 (算术、关系、逻辑)。",
          "控制流 (if-else, switch, for, while, do-while)。",
          "数组。",
          "方法/函数的定义与调用。"
        ]
      }
    ],
    practice: [
      "编写一个简单的计算器控制台程序。",
      "编写一个'猜数字'游戏。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 2,
    title: "C# 核心 - 面向对象编程 (OOP)",
    goal: "深刻理解面向对象的思想，并能在C#中应用。这是未来构建复杂系统的基石。",
    content: [
      {
        title: "面向对象",
        items: [
          "类 (Class) 与对象 (Object)。",
          "封装 (Encapsulation): 字段、属性、访问修饰符 (public, private)。",
          "继承 (Inheritance)。",
          "多态 (Polymorphism): virtual, override, abstract。",
          "接口 (Interface)。",
          "构造函数 (Constructor)。",
          "static 关键字。"
        ]
      }
    ],
    practice: [
      "设计并实现一组类来模拟一个场景，例如\"学校\" (包含学生类、教师类、课程类)。",
      "使用接口定义一个\"可攻击\"的行为，让\"战士\"和\"法师\"类都实现它。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 3,
    title: "C# 实用特性 - 集合与LINQ",
    goal: "掌握处理一组数据的常用方法，并学会使用LINQ高效地查询和操作数据。",
    content: [
      {
        title: "集合",
        items: [
          "List<T>: 最常用的动态数组。",
          "Dictionary<TKey, TValue>: 键值对集合。",
          "了解 Array, Queue<T>, Stack<T> 等。"
        ]
      },
      {
        title: "LINQ (语言集成查询)",
        items: [
          "理解其核心思想：像查询数据库一样查询集合。",
          "掌握常用方法: Where, Select, OrderBy, FirstOrDefault, ToList, Count, Any。",
          "学习方法语法 (Method Syntax) 和查询语法 (Query Syntax)。"
        ]
      }
    ],
    practice: [
      "创建一个学生列表 (List<Student>)，每个学生有ID、姓名、年龄、分数等属性。",
      "使用LINQ完成以下查询：",
      "- 找出所有分数及格的学生。",
      "- 按年龄对学生进行排序。",
      "- 只获取所有学生的名字列表。",
      "- 找到第一个姓\"王\"的学生。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 4,
    title: "C# 进阶与 WebAPI 初探",
    goal: "接触C#的异步编程，并创建你的第一个ASP.NET Core WebAPI项目。",
    content: [
      {
        title: "异步编程",
        items: [
          "理解为什么需要异步 (async/await)。",
          "掌握 Task 和 Task<TResult>。",
          "学习 async 和 await 关键字的用法。"
        ]
      },
      {
        title: "第一个WebAPI程序",
        items: [
          "使用 Visual Studio 创建一个新的 \"ASP.NET Core Web API\" 项目。",
          "理解项目结构：Program.cs, Controllers 文件夹, appsettings.json。",
          "运行项目，了解 Swagger UI 的作用。",
          "尝试修改默认的 WeatherForecastController，添加一个新的API接口。"
        ]
      }
    ],
    practice: [
      "将一个模拟耗时操作（如 Task.Delay）的同步方法改写为异步方法。",
      "创建一个 TodoController，提供一个返回静态待办事项列表的GET接口。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 5,
    title: "ASP.NET Core 核心机制",
    goal: "深入理解ASP.NET Core的两个灵魂：中间件和依赖注入。",
    content: [
      {
        title: "中间件 (Middleware)",
        items: [
          "理解请求管道 (Request Pipeline) 的概念。",
          "学习 app.Use() 和 app.Run()。",
          "尝试编写一个简单的自定义中间件（例如，记录请求耗时）。"
        ]
      },
      {
        title: "依赖注入 (DI - Dependency Injection)",
        items: [
          "理解为什么要使用DI (解耦)。",
          "学习三种生命周期: Singleton, Scoped, Transient。",
          "在 Program.cs 中注册服务，并在 Controller 中通过构造函数注入服务。"
        ]
      },
      {
        title: "路由 (Routing)",
        items: [
          "精通特性路由 (Attribute Routing) ([Route], [HttpGet], [HttpPost], etc.)。"
        ]
      }
    ],
    practice: [
      "创建一个 LogService，通过DI注入到 TodoController 中，用来记录操作日志。",
      "自定义一个中间件，用于在请求头中检查是否存在特定的 API-KEY。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 6,
    title: "WebAPI 开发深化",
    goal: "掌握WebAPI开发中的常见任务：配置、模型绑定与验证。",
    content: [
      {
        title: "配置 (Configuration)",
        items: [
          "学习如何从 appsettings.json 读取配置信息。"
        ]
      },
      {
        title: "模型绑定 (Model Binding)",
        items: [
          "理解API如何自动将HTTP请求中的数据 (JSON body, query string, route data) 映射到C#方法的参数上。"
        ]
      },
      {
        title: "模型验证 (Model Validation)",
        items: [
          "使用数据注解 (Data Annotations) 如 [Required], [StringLength], [Range] 来验证输入模型。",
          "理解 ModelState.IsValid 的作用。"
        ]
      },
      {
        title: "过滤器 (Filters)",
        items: [
          "初步了解Action Filter，可以用于处理一些横切关注点。"
        ]
      }
    ],
    practice: [
      "为创建待办事项 (POST /api/todo) 的接口创建一个 CreateTodoDto 模型，并添加验证规则。",
      "在接口方法中检查 ModelState，如果验证失败，返回 400 Bad Request。",
      "将数据库连接字符串配置在 appsettings.json 中并读取。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 7,
    title: "数据访问 - Entity Framework Core",
    goal: "将数据库集成到你的WebAPI项目中，实现数据的持久化。",
    content: [
      {
        title: "数据库基础",
        items: [
          "(如果需要，快速复习SQL基础)"
        ]
      },
      {
        title: "Entity Framework Core (EF Core)",
        items: [
          "安装 EF Core 相关的 NuGet 包。",
          "Code-First 开发模式: 先写C#实体类，再由EF Core生成数据库。",
          "创建 DbContext。",
          "配置实体 (Entity) 和数据库连接。",
          "迁移 (Migrations): 使用命令行工具 (dotnet ef) 创建和应用数据库迁移。",
          "在服务中注入 DbContext 并执行基本的 CRUD (增删改查) 操作。"
        ]
      }
    ],
    practice: [
      "为你的 Todo 应用创建 TodoItem 实体类。",
      "创建 TodoDbContext。",
      "使用 Migrations 在本地数据库 (如 SQL Server LocalDB 或 SQLite) 中生成 TodoItems 表。",
      "重写 TodoController 中的所有接口，使其从操作静态列表改为操作数据库。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 8,
    title: "实战项目启动与核心功能",
    goal: "参照网站的实战项目，从零开始搭建一个结构更合理的项目，并实现核心业务功能。",
    content: [
      {
        title: "实战项目",
        items: [
          "学习分层架构思想 (例如: Domain, Application, Infrastructure, API 四层)。",
          "搭建项目结构，创建不同的类库项目。",
          "设计并实现核心实体（如用户、文章、评论等）。",
          "完成核心业务的CRUD接口开发。"
        ]
      },
      {
        title: "统一格式",
        items: [
          "统一异常处理: 使用中间件捕获全局异常，返回统一的错误信息。",
          "统一返回格式: 封装一个通用的API响应类，让所有接口返回相同结构的JSON。"
        ]
      }
    ],
    practice: [
      "按照分层思想，动手搭建一个简单的博客API项目。",
      "实现文章 (Post) 的增、删、改、查系列接口。",
      "添加全局异常处理中间件。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 9,
    title: "项目功能完善 - 认证与授权",
    goal: "为项目集成安全机制，保护你的API接口。",
    content: [
      {
        title: "认证与授权 (Authentication & Authorization)",
        items: [
          "理解认证（你是谁）和授权（你能做什么）的区别。",
          "学习 JWT (JSON Web Token) 的工作原理。",
          "在项目中集成JWT：",
          "- 用户注册/登录接口，登录成功后颁发Token。",
          "- 配置JWT认证中间件。",
          "- 在需要保护的接口上添加 [Authorize] 特性。"
        ]
      }
    ],
    practice: [
      "为你的博客API项目添加用户注册和登录接口。",
      "\"创建文章\"接口必须是登录用户才能访问。",
      "\"删除文章\" 接口必须是文章作者本人才能访问（权限）。"
    ],
    expanded: false,
    completed: false
  },
  {
    week: 10,
    title: "部署与总结",
    goal: "学习如何将你的WebAPI应用部署到服务器上，并对整个学习过程进行回顾。",
    content: [
      {
        title: "部署 (Deployment)",
        items: [
          "Docker 简介: 理解容器化的优势。",
          "编写 Dockerfile 来容器化你的ASP.NET Core应用。",
          "学习基本的 Docker 命令 (build, run, ps, stop)。",
          "了解部署到 Linux 服务器的基本流程。"
        ]
      },
      {
        title: "总结",
        items: [
          "回顾这10周的学习内容，整理知识体系，形成自己的知识图谱。",
          "思考下一步的学习方向（如：微服务、gRPC、Blazor、分布式系统等）。"
        ]
      }
    ],
    practice: [
      "为你的博客API项目编写一个 Dockerfile。",
      "在本地使用 Docker 构建镜像并运行容器。",
      "通过 localhost:port 访问容器化的API，并用Postman等工具测试。"
    ],
    expanded: false,
    completed: false
  }
])

const toggleTask = (index) => {
  weeklyTasks.value[index].expanded = !weeklyTasks.value[index].expanded
}

const toggleTaskCompletion = (index) => {
  weeklyTasks.value[index].completed = !weeklyTasks.value[index].completed
}
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

.weekly-tasks-section {
  margin: 3rem 0;
}

.weekly-tasks-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.weekly-task-card {
  background: linear-gradient(135deg, var(--card-bg-gradient-start) 0%, var(--card-bg-gradient-end) 100%);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.weekly-task-card:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.dark .weekly-task-card:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.weekly-task-header {
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--card-border);
  position: relative;
}

.weekly-task-header-content {
  flex: 1;
}

.weekly-task-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
}

.weekly-task-week {
  background: #007bff;
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
}

.dark .weekly-task-week {
  background: #63b3ed;
  color: #1a202c;
}

.weekly-task-goal {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.95rem;
}

.weekly-task-toggle {
  color: #007bff;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  background: rgba(0,123,255,0.1);
  margin-left: 1rem;
}

.dark .weekly-task-toggle {
  color: #63b3ed;
  background: rgba(99,179,237,0.1);
}

.weekly-task-toggle:hover {
  background: rgba(0,123,255,0.2);
}

.dark .weekly-task-toggle:hover {
  background: rgba(99,179,237,0.2);
}

.weekly-task-content {
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.5s ease;
}

.weekly-task-content.expanded {
  padding: 1.5rem;
  max-height: 2000px; /* 足够大以适应内容 */
}

.weekly-task-section {
  margin-bottom: 1.5rem;
}

.weekly-task-section:last-child {
  margin-bottom: 0;
}

.weekly-task-section-title {
  font-weight: 600;
  color: #007bff;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.dark .weekly-task-section-title {
  color: #63b3ed;
}

.weekly-task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.weekly-task-list-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.7rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.weekly-task-list-item::before {
  content: '•';
  position: absolute;
  left: 0.3rem;
  color: #007bff;
  font-weight: bold;
}

.dark .weekly-task-list-item::before {
  color: #63b3ed;
}

.weekly-task-list-item:last-child {
  margin-bottom: 0;
}

.content-group {
  margin-bottom: 1.5rem;
}

.content-group:last-child {
  margin-bottom: 0;
}

.content-group-title {
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.7rem 0;
}

.weekly-task-status {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.weekly-task-status.completed {
  background: var(--status-completed-bg);
  color: var(--status-completed-text);
}

.weekly-task-status.pending {
  background: var(--status-pending-bg);
  color: var(--status-pending-text);
}

.weekly-task-status:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .weekly-task-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .weekly-task-toggle {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
  
  .weekly-task-status {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 1rem;
    display: inline-block;
  }
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

<!-- 在正文适当位置添加每周任务组件 -->
<div class="weekly-tasks-section">
  <h2>📝 每周学习任务详情</h2>
  
  <div class="weekly-tasks-grid">
    <div 
      v-for="(task, index) in weeklyTasks" 
      :key="index"
      class="weekly-task-card"
    >
      <div class="weekly-task-header" @click="toggleTask(index)">
        <div class="weekly-task-header-content">
          <h3 class="weekly-task-title">
            <span class="weekly-task-week">{{ task.week }}</span>
            {{ task.title }}
          </h3>
          <p class="weekly-task-goal">{{ task.goal }}</p>
        </div>
        <div 
          class="weekly-task-status" 
          :class="task.completed ? 'completed' : 'pending'"
          @click.stop="toggleTaskCompletion(index)"
        >
          {{ task.completed ? '✅ 已完成' : '🔄 进行中' }}
        </div>
        <div class="weekly-task-toggle">
          <span v-if="!task.expanded">▼</span>
          <span v-else>▲</span>
        </div>
      </div>
      <div class="weekly-task-content" :class="{ expanded: task.expanded }">
        <div class="weekly-task-section">
          <h4 class="weekly-task-section-title">📚 学习内容</h4>
          <div v-for="(section, sIndex) in task.content" :key="sIndex" class="content-group">
            <h5 class="content-group-title">{{ section.title }}</h5>
            <ul class="weekly-task-list">
              <li 
                v-for="(item, iIndex) in section.items" 
                :key="iIndex"
                class="weekly-task-list-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="weekly-task-section">
          <h4 class="weekly-task-section-title">💻 实践任务</h4>
          <ul class="weekly-task-list">
            <li 
              v-for="(practice, pIndex) in task.practice" 
              :key="pIndex"
              class="weekly-task-list-item"
            >
              {{ practice }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

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