<template>
  <div class="learning-plan-container">
    <!-- 标题区域 -->
    <header class="plan-header">
      <h1 class="plan-title">技术学习路线图</h1>
      <p class="plan-subtitle">选择你感兴趣的技术栈，开始系统化学习之旅</p>
    </header>

    <!-- 技术栈选择器 -->
    <nav class="tech-selector">
      <button
        v-for="(plan, key) in learningPlans"
        :key="key"
        :class="['tech-tab', { active: activeTech === key }]"
        @click="setActiveTech(key)"
      >
        <span class="tech-icon">{{ getTechIcon(key) }}</span>
        <span class="tech-name">{{ getTechName(key) }}</span>
        <span class="tech-weeks">{{ plan.length }}周</span>
      </button>
    </nav>

    <!-- 学习计划内容 -->
    <main class="plan-content">
      <div class="plan-overview">
        <div class="overview-stats">
          <div class="stat-item">
            <span class="stat-number">{{ currentPlan.length }}</span>
            <span class="stat-label">总周数</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ getTotalProjects() }}</span>
            <span class="stat-label">实战项目</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ getPhaseCount() }}</span>
            <span class="stat-label">学习阶段</span>
          </div>
        </div>
      </div>

      <!-- 学习阶段 -->
      <div class="learning-phases">
        <div
          v-for="(week, index) in currentPlan"
          :key="index"
          class="week-card"
          :data-phase="getPhase(index)"
        >
          <!-- 周次标识 -->
          <div class="week-header">
            <div class="week-number">
              <span class="week-text">第</span>
              <span class="week-num">{{ week.week }}</span>
              <span class="week-text">周</span>
            </div>
            <div class="phase-badge">{{ getPhase(index) }}</div>
          </div>

          <!-- 主题内容 -->
          <div class="week-body">
            <h3 class="week-topic">{{ week.topic }}</h3>
            
            <div class="content-section">
              <h4 class="section-title">
                <span class="section-icon">📚</span>
                学习内容
              </h4>
              <ul class="content-list">
                <li
                  v-for="(item, i) in week.content"
                  :key="i"
                  class="content-item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="project-section">
              <h4 class="section-title">
                <span class="section-icon">🚀</span>
                实战项目
              </h4>
              <div class="project-card">
                {{ week.project }}
              </div>
            </div>
          </div>

          <!-- 进度连接线 -->
          <div v-if="index < currentPlan.length - 1" class="week-connector"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const learningPlans = {
  flutter: [
    // Flutter 阶段1: 开发环境与基础组件 (2周)
    {
      week: 1,
      topic: "开发环境搭建与基础组件",
      content: [
        "安装 Android Studio/VSCode",
        "配置 Flutter SDK",
        "热重载调试与依赖管理 (pubspec.yaml)",
        "熟悉 Material Design 组件（按钮/输入框/卡片等）"
      ],
      project: "天气预报 App（静态 UI 搭建）"
    },
    {
      week: 2,
      topic: "布局与导航",
      content: [
        "Flex 布局与响应式设计",
        "路由与导航（命名路由/参数传递）",
        "TabBar 与 BottomNavigationBar"
      ],
      project: "新闻阅读 App（多页面切换）"
    },
    
    // Flutter 阶段2: 状态管理与网络请求 (6周)
    {
      week: 3,
      topic: "状态管理（Provider）",
      content: [
        "Provider 基础与全局状态管理",
        "结合 ChangeNotifier 实现复杂状态"
      ],
      project: "购物车功能（跨页面状态同步）"
    },
    {
      week: 4,
      topic: "状态管理（Riverpod/Bloc）",
      content: [
        "Riverpod 进阶用法",
        "Bloc 模式与事件驱动"
      ],
      project: "用户登录与权限管理"
    },
    {
      week: 5,
      topic: "网络请求与数据解析",
      content: [
        "Dio 库的使用与封装",
        "JSON 解析与 Model 类生成"
      ],
      project: "GitHub 用户信息查询"
    },
    {
      week: 6,
      topic: "动画与交互",
      content: [
        "隐式动画（AnimatedContainer）",
        "显式动画（AnimationController）"
      ],
      project: "自定义 Loading 动画"
    },
    {
      week: 7,
      topic: "本地存储与数据库",
      content: [
        "SharedPreferences 存储",
        "SQLite 与 Hive 数据库"
      ],
      project: "离线笔记 App"
    },
    {
      week: 8,
      topic: "混合开发与原生功能",
      content: [
        "平台通道（MethodChannel）",
        "相机/相册权限与调用"
      ],
      project: "二维码扫描工具"
    },
    
    // Flutter 阶段3: 实战项目 (4周)
    {
      week: 9,
      topic: "完整项目开发（一）",
      content: [
        "社交类 App（动态发布/点赞/评论）",
        "技术栈：Firebase + Provider + 动画"
      ],
      project: "社交 App 开发"
    },
    {
      week: 10,
      topic: "完整项目开发（二）",
      content: [
        "电商类 App（商品列表/购物车/支付模拟）",
        "技术栈：Bloc + Dio + SQLite"
      ],
      project: "电商 App 开发"
    },
    {
      week: 11,
      topic: "性能优化",
      content: [
        "Widget 重建优化",
        "内存泄漏检测与解决"
      ],
      project: "优化现有项目性能"
    },
    {
      week: 12,
      topic: "发布与跨平台",
      content: [
        "iOS/Android 打包与上架",
        "Flutter Desktop 适配"
      ],
      project: "跨平台笔记 App"
    },
    
    // Flutter 阶段4: 进阶专题 (2周)
    {
      week: 13,
      topic: "国际化与插件开发",
      content: [
        "多语言支持（intl 库）",
        "自定义插件开发"
      ],
      project: "多语言翻译插件"
    },
    {
      week: 14,
      topic: "测试与 CI/CD",
      content: [
        "单元测试与 Widget 测试",
        "GitHub Actions 自动化部署"
      ],
      project: "为现有项目添加测试"
    }
  ],

  avalonia: [
    // Avalonia 阶段1: C#基础强化 (2周)
    {
      week: 1,
      topic: "面向对象编程",
      content: [
        "类/继承/多态",
        "接口与泛型"
      ],
      project: "学生管理系统模型层"
    },
    {
      week: 2,
      topic: ".NET 生态熟悉",
      content: [
        "NuGet 包管理",
        "LINQ 数据处理"
      ],
      project: "图书管理系统后端"
    },
    
    // Avalonia 阶段2: 入门基础 (4周)
    {
      week: 3,
      topic: "XAML 基础",
      content: [
        "数据绑定语法",
        "视图与 ViewModel 分离"
      ],
      project: "登录界面开发"
    },
    {
      week: 4,
      topic: "布局系统",
      content: [
        "DockPanel/Grid/StackPanel",
        "响应式布局设计"
      ],
      project: "自适应仪表盘界面"
    },
    {
      week: 5,
      topic: "样式与模板",
      content: [
        "控件样式复用",
        "数据模板应用"
      ],
      project: "主题切换功能"
    },
    {
      week: 6,
      topic: "事件处理",
      content: [
        "命令模式绑定",
        "触控手势识别"
      ],
      project: "绘图板应用"
    },
    
    // Avalonia 阶段3: 高级特性 (4周)
    {
      week: 7,
      topic: "跨平台部署",
      content: [
        "Windows 桌面应用打包",
        "Linux/MacOS 编译"
      ],
      project: "跨平台文本编辑器"
    },
    {
      week: 8,
      topic: "性能优化",
      content: [
        "虚拟化技术应用",
        "内存池管理"
      ],
      project: "大数据量表格优化"
    },
    {
      week: 9,
      topic: "插件扩展",
      content: [
        "原生功能调用",
        "C++/C# 互操作"
      ],
      project: "摄像头集成"
    },
    {
      week: 10,
      topic: "企业级应用",
      content: [
        "MVVM 框架搭建",
        "数据库 ORM 集成"
      ],
      project: "进销存管理系统"
    },
    
    // Avalonia 阶段4: 实战项目 (2周)
    {
      week: 11,
      topic: "完整商业应用",
      content: [
        "CRM 客户管理系统（Avalonia 版）",
        "客户管理/订单跟踪/报表统计"
      ],
      project: "CRM 系统开发"
    },
    {
      week: 12,
      topic: "发布与维护",
      content: [
        "应用商店上架",
        "自动化更新机制"
      ],
      project: "持续集成部署流水线"
    }
  ],

  weapp: [
    // 微信小程序 阶段1: 环境搭建 (1周)
    {
      week: 1,
      topic: "开发工具配置",
      content: [
        "微信开发者工具安装",
        "模拟器调试技巧"
      ],
      project: "Hello World 小程序"
    },
    
    // 微信小程序 阶段2: 基础能力 (3周)
    {
      week: 2,
      topic: "WXML/WXSS",
      content: [
        "数据绑定语法",
        "Flex 布局应用"
      ],
      project: "九宫格图片展示"
    },
    {
      week: 3,
      topic: "页面生命周期",
      content: [
        "生命周期函数",
        "页面跳转传参"
      ],
      project: "商品详情页"
    },
    {
      week: 4,
      topic: "API 与云开发",
      content: [
        "wx.request 调用",
        "云函数部署"
      ],
      project: "天气查询小程序"
    },
    
    // 微信小程序 阶段3: 进阶功能 (3周)
    {
      week: 5,
      topic: "组件化开发",
      content: [
        "自定义组件封装",
        "组件间通信"
      ],
      project: "可复用的卡片组件"
    },
    {
      week: 6,
      topic: "支付与登录",
      content: [
        "微信支付集成",
        "小程序登录态管理"
      ],
      project: "电商购物车支付"
    },
    {
      week: 7,
      topic: "性能优化",
      content: [
        "WXS 脚本优化",
        "数据懒加载"
      ],
      project: "长列表滚动优化"
    },
    
    // 微信小程序 阶段4: 实战项目 (1周)
    {
      week: 8,
      topic: "完整项目开发",
      content: [
        "个人博客小程序（含评论/点赞/收藏）",
        "发布上线与版本迭代"
      ],
      project: "博客小程序开发"
    }
  ]
}

const activeTech = ref('flutter')

const currentPlan = computed(() => {
  return learningPlans[activeTech.value] || []
})

const setActiveTech = (tech) => {
  activeTech.value = tech
}

const getTechName = (key) => {
  const names = {
    flutter: 'Flutter',
    avalonia: 'Avalonia',
    weapp: '微信小程序'
  }
  return names[key] || key
}

const getTechIcon = (key) => {
  const icons = {
    flutter: '📱',
    avalonia: '💻',
    weapp: '🔧'
  }
  return icons[key] || '📖'
}

const getTotalProjects = () => {
  return currentPlan.value.length
}

const getPhaseCount = () => {
  const flutterPhases = 4
  const avaloniaPhases = 4
  const weappPhases = 4
  
  const phases = {
    flutter: flutterPhases,
    avalonia: avaloniaPhases,
    weapp: weappPhases
  }
  
  return phases[activeTech.value] || 1
}

const getPhase = (index) => {
  if (activeTech.value === 'flutter') {
    if (index < 2) return '阶段一：基础入门'
    if (index < 8) return '阶段二：进阶应用'
    if (index < 12) return '阶段三：实战项目'
    return '阶段四：进阶专题'
  } else if (activeTech.value === 'avalonia') {
    if (index < 2) return '阶段一：C#强化'
    if (index < 6) return '阶段二：入门基础'
    if (index < 10) return '阶段三：高级特性'
    return '阶段四：实战项目'
  } else if (activeTech.value === 'weapp') {
    if (index < 1) return '阶段一：环境搭建'
    if (index < 4) return '阶段二：基础能力'
    if (index < 7) return '阶段三：进阶功能'
    return '阶段四：实战项目'
  }
  return '学习阶段'
}
</script>

<style scoped>
/* CSS 变量定义 */
.learning-plan-container {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --secondary-color: #6366f1;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 暗黑模式 */
@media (prefers-color-scheme: dark) {
  .learning-plan-container {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-muted: #94a3b8;
    --border-color: #334155;
  }
}

/* 标题区域 */
.plan-header {
  text-align: center;
  margin-bottom: 3rem;
}

.plan-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.plan-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* 技术栈选择器 */
.tech-selector {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.tech-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  position: relative;
  overflow: hidden;
}

.tech-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.tech-tab:hover::before {
  left: 100%;
}

.tech-tab:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.tech-tab.active {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.tech-icon {
  font-size: 2rem;
}

.tech-name {
  font-weight: 600;
  font-size: 1rem;
}

.tech-weeks {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* 概览统计 */
.plan-overview {
  margin-bottom: 3rem;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 学习阶段 */
.learning-phases {
  position: relative;
}

.week-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  position: relative;
}

.week-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.week-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.week-number {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-lg);
  font-weight: 600;
}

.week-num {
  font-size: 1.25rem;
  font-weight: 700;
}

.phase-badge {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
}

.week-topic {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 2rem 0;
}

.content-section,
.project-section {
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.section-icon {
  font-size: 1.25rem;
}

.content-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.content-item {
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-color);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.content-item:hover {
  background: var(--bg-tertiary);
  transform: translateX(4px);
}

.project-card {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--success-color), #059669);
  color: white;
  border-radius: var(--radius-lg);
  font-weight: 600;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '🎯';
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  opacity: 0.7;
}

/* 进度连接线 */
.week-connector {
  position: absolute;
  left: 50%;
  bottom: -2rem;
  width: 2px;
  height: 2rem;
  background: linear-gradient(to bottom, var(--primary-color), transparent);
  transform: translateX(-50%);
  z-index: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .learning-plan-container {
    padding: 1rem 0.5rem;
  }
  
  .plan-title {
    font-size: 2rem;
  }
  
  .tech-selector {
    gap: 0.75rem;
  }
  
  .tech-tab {
    min-width: 120px;
    padding: 1rem 1.5rem;
  }
  
  .overview-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .week-card {
    padding: 1.5rem;
  }
  
  .week-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .week-topic {
    font-size: 1.25rem;
  }
  
  .content-list {
    gap: 0.5rem;
  }
  
  .content-item {
    padding: 0.5rem 0.75rem;
  }
}

@media (max-width: 480px) {
  .tech-selector {
    flex-direction: column;
    align-items: center;
  }
  
  .tech-tab {
    width: 100%;
    max-width: 280px;
  }
  
  .week-number {
    flex-direction: column;
    gap: 0;
    text-align: center;
  }
  
  .overview-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.week-card {
  animation: fadeInUp 0.6s ease forwards;
}

.week-card:nth-child(even) {
  animation-delay: 0.1s;
}

.week-card:nth-child(odd) {
  animation-delay: 0.2s;
}

/* 高级交互效果 */
.tech-tab {
  position: relative;
  isolation: isolate;
}

.tech-tab::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.tech-tab.active::after {
  opacity: 1;
}

/* 滚动指示器 */
.learning-phases {
  position: relative;
}

.learning-phases::before {
  content: '';
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
  opacity: 0.3;
  z-index: 0;
}

@media (max-width: 768px) {
  .learning-phases::before {
    left: 1rem;
  }
}
</style>