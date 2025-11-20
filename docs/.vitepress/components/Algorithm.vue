<template>
  <div class="algorithm-learning-container">
    <!-- 页面标题 -->
    <div class="hero-section">
      <h1 class="hero-title">
        <span class="gradient-text">算法学习计划</span>
      </h1>
      <br />
      <p class="hero-subtitle">系统化的算法学习路径与资源整合</p>
    </div>

    <!-- 学习路线部分 -->
    <section class="content-section">
      <h2 class="section-title">
        <span class="section-icon">🎯</span>
        学习路线
      </h2>

      <div class="info-card">
        <p class="prerequisite">
          学习算法前需要掌握一门编程语言（C++、C、Java、Python、Go 等语言均可）
        </p>
      </div>

      <div class="learning-path">
        <div class="path-item">
          <span class="path-number">1</span>
          <div class="path-content">
            <h3>算法基础理论和复杂度分析</h3>
            <a href="https://www.bilibili.com/video/BV1nJ411V7bd" target="_blank" class="resource-link">
              📺 B站视频教程
            </a>
          </div>
        </div>

        <div class="path-grid">
          <div class="path-card" v-for="(plan, index) in learningPlans" :key="index">
            <h4>{{ plan.text }}</h4>
            <ul class="topic-list">
              <li v-for="topic in plan.content">
                <span v-if="!topic.link">{{ topic.text }}</span>
                <a v-else :href="topic.link" class="internal-link">{{ topic.text }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="difficulty-levels">
          <a href="https://leetcode-cn.com/leetbook/detail/top-interview-questions-easy/" target="_blank"
            class="difficulty-link easy">
            <span class="difficulty-icon">🌱</span>
            初级算法
          </a>
          <a href="https://leetcode-cn.com/leetbook/detail/top-interview-questions-medium/" target="_blank"
            class="difficulty-link medium">
            <span class="difficulty-icon">🌿</span>
            中级算法
          </a>
        </div>

        <p class="note">
          💡 学习顺序并不唯一，可以在B站找资源来了解
        </p>
      </div>
    </section>

    <!-- 刷题网站部分 -->
    <section class="content-section">
      <h2 class="section-title">
        <span class="section-icon">💻</span>
        刷题网站
      </h2>

      <div class="websites-container">
        <div class="website-group">
          <h3 class="group-title">入门推荐</h3>
          <p class="group-desc">简单题较多，适合初学者</p>
          <div class="website-cards">
            <a href="https://www.luogu.com.cn/" target="_blank" class="website-card beginner">
              <div class="website-icon">🟢</div>
              <h4>洛谷</h4>
              <span class="website-url">luogu.com.cn</span>
            </a>
            <a href="https://leetcode.cn/" target="_blank" class="website-card beginner">
              <div class="website-icon">🟡</div>
              <h4>力扣</h4>
              <span class="website-url">leetcode.cn</span>
            </a>
            <a href="https://www.lanqiao.cn/problems/?first_category_id=1" target="_blank"
              class="website-card beginner">
              <div class="website-icon">🔵</div>
              <h4>蓝桥题库</h4>
              <span class="website-url">lanqiao.cn</span>
            </a>
          </div>
        </div>

        <div class="website-group">
          <h3 class="group-title">进阶挑战</h3>
          <p class="group-desc">难度偏大，适合进阶学习</p>
          <div class="website-cards">
            <a href="https://ac.nowcoder.com/" target="_blank" class="website-card advanced">
              <div class="website-icon">🟣</div>
              <h4>牛客</h4>
              <span class="website-url">nowcoder.com</span>
            </a>
            <a href="https://www.acwing.com/" target="_blank" class="website-card advanced">
              <div class="website-icon">🟠</div>
              <h4>AcWing</h4>
              <span class="website-url">acwing.com</span>
            </a>
            <a href="https://atcoder.jp/" target="_blank" class="website-card advanced">
              <div class="website-icon">⚫</div>
              <h4>AtCoder</h4>
              <span class="website-url">atcoder.jp</span>
            </a>
            <a href="https://codeforces.com/" target="_blank" class="website-card advanced">
              <div class="website-icon">🔴</div>
              <h4>Codeforces</h4>
              <span class="website-url">codeforces.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 资料网站部分 -->
    <section class="content-section">
      <h2 class="section-title">
        <span class="section-icon">📖</span>
        资料网站
      </h2>

      <div class="resources-container">
        <div class="resource-card">
          <h3>
            <a href="https://programmercarl.com/qita/publish.html" target="_blank" class="resource-title-link">
              代码随想录
            </a>
          </h3>
          <p class="resource-desc">
            涵盖基础算法中的大部分内容，系统化的算法学习资料
          </p>
          <div class="resource-tags">
            <span class="tag">基础算法</span>
            <span class="tag">系统学习</span>
          </div>
        </div>

        <div class="resource-card">
          <h3>
            <a href="https://www.csdn.net/" target="_blank" class="resource-title-link">
              CSDN
            </a>
          </h3>
          <p class="resource-desc">
            专业开发者社区，可搜索未学到的算法来完善知识储备
          </p>
          <div class="resource-tags">
            <span class="tag">技术社区</span>
            <span class="tag">问题解答</span>
          </div>
        </div>
      </div>

      <div class="tips-box">
        <h4>💡 学习建议</h4>
        <p>在刷题过程中遇到不会的算法，可以查看题解学习。未学到的算法可在 CSDN 中搜索相关资料来完善知识储备。</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const learningPlans = [
  {
    text: '基础数据结构',
    content: [
      {
        text: '前置内容',
        link: '/software/algorithm-learning/prerequisites'
      },
      {
        text: '链表',
        link: '/software/algorithm-learning/linked-list'
      },
      {
        text: '队列 & 栈',
        link: '/software/algorithm-learning/stacks-queues'
      },
      {
        text: '哈希表',
        link: '/software/algorithm-learning/hashtable'
      },
      {
        text: '单调栈',
        link: '/software/algorithm-learning/monotonic-stack'
      },
      {
        text: '单调队列',
        link: '/software/algorithm-learning/monotonic-queue'
      },
    ]
  },
  {
    text: '查找和树',
    content: [
      {
        text: '查找表类算法',
      },
      {
        text: '二分查找',
        link: '/software/algorithm-learning/dichotomy'
      },
      {
        text: '二叉树',
        link: '/software/algorithm-learning/binary-tree'
      },
      {
        text: '二叉搜索树'
      },
      {
        text: '前缀树'
      },
      {
        text: 'N 叉树'
      },
      {
        text: '双指针',
        link: '/software/algorithm-learning/two-pointers'
      },
    ]
  },
  {
    text: '其他',
    content: [
      {
        text: '数组类算法',
      },
      {
        text: '递归',
        link: '/software/algorithm-learning/recursion'
      },
      {
        text: '动态规划',
        link: '/software/algorithm-learning/dynamic-programming'
      },
      {
        text: '快速幂',
        link: '/software/algorithm-learning/quick-power'
      },
      {
        text: '滑动窗口',
        link: '/software/algorithm-learning/sliding-window'
      },
      {
        text: '线性基',
        link: '/software/algorithm-learning/linear-basis'
      },
      {
        text: '贪心',
        link: '/software/algorithm-learning/greedy'
      },
      {
        text: '最小公倍数 最大公约数',
        link: '/software/algorithm-learning/greatest-common-divisor'
      },
    ]
  }
]
</script>

<style scoped>
/* 基础样式和CSS变量 */
.algorithm-learning-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* 页面标题样式 */
.hero-section {
    margin-top: 2rem;
    text-align: center;
    margin-bottom: 4rem;
    animation: fadeInDown 0.8s ease-out;
}

.hero-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 1rem;
    font-weight: 800;
}

.gradient-text {
    background: linear-gradient(120deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
}

.hero-subtitle {
    margin-top: 2rem;
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--vp-c-text-2);
    margin: 0;
}

/* 内容区块样式 */
.content-section {
  margin-bottom: 4rem;
  animation: fadeInUp 0.6s ease-out;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  font-size: 1.5rem;
}

/* 信息卡片 */
.info-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.prerequisite {
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  margin: 0;
}

/* 学习路径样式 */
.learning-path {
  position: relative;
}

.path-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}

.path-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.path-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.resource-link:hover {
  color: var(--vp-c-brand-dark);
  transform: translateX(5px);
}

/* 路径网格 */
.path-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.path-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.path-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.path-card h4 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-brand);
}

.topic-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.topic-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--vp-c-text-2);
}

.topic-list li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
}

.internal-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.internal-link:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

/* 难度等级 */
.difficulty-levels {
  display: flex;
  gap: 1.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.difficulty-link {
  flex: 1;
  min-width: 200px;
  padding: 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.difficulty-link.easy {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: #1a5f3f;
}

.difficulty-link.medium {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: #7a3f00;
}

.difficulty-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.difficulty-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.note {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand);
  padding: 1rem 1.5rem;
  margin-top: 2rem;
  border-radius: 8px;
  color: var(--vp-c-text-2);
}

/* 网站卡片 */
.websites-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.website-group {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.group-title {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.group-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.website-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.website-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.website-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.website-card:hover::before {
  transform: translateY(0);
}

.website-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.beginner {
  background: var(--vp-c-brand-soft);
}

.advanced {
  background: var(--vp-c-gray-soft);
}

.website-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.website-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.website-url {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

/* 资源卡片 */
.resources-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.resource-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.resource-title-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.3s ease;
}

.resource-title-link:hover {
  color: var(--vp-c-brand);
}

.resource-desc {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 1rem 0;
}

.resource-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.tips-box {
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-brand);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.tips-box h4 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-brand);
  font-size: 1.2rem;
}

.tips-box p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* 动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .algorithm-learning-container {
    padding: 1.5rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .path-grid {
    grid-template-columns: 1fr;
  }

  .difficulty-levels {
    flex-direction: column;
  }

  .difficulty-link {
    min-width: auto;
  }

  .website-cards {
    grid-template-columns: 1fr;
  }

  .resources-container {
    grid-template-columns: 1fr;
  }

  .website-group {
    padding: 1.5rem;
  }

  .path-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .path-content {
    width: 100%;
  }
}

/* 暗黑模式支持 */
.dark .path-card {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

.dark .website-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.dark .resource-card {
  background: var(--vp-c-bg-soft);
}

.dark .tips-box {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, var(--vp-c-bg-soft) 100%);
}

.dark .difficulty-link.easy {
  background: linear-gradient(135deg, rgba(132, 250, 176, 0.2) 0%, rgba(143, 211, 244, 0.2) 100%);
  color: #84fab0;
}

.dark .difficulty-link.medium {
  background: linear-gradient(135deg, rgba(250, 112, 154, 0.2) 0%, rgba(254, 225, 64, 0.2) 100%);
  color: #fee140;
}

/* 平滑过渡 */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>