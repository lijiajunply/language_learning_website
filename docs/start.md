---
layout: page
---

<div class="intro-container">
  <div class="intro-hero">
    <div class="gradient-bg"></div>
    <div class="intro-content">
      <h1 class="intro-title">
        <span>西建大 iOS Club</span>
        <br>新生代培养计划
      </h1>
      <p class="intro-subtitle">
        致力于培养下一代科技人才，打造完整的技术成长体系
      </p>
      <div class="intro-stats">
        <div class="stat-item">
          <div class="stat-number">4</div>
          <div class="stat-label">专业部门</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">∞</div>
          <div class="stat-label">发展可能</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-label">用心培养</div>
        </div>
      </div>
    </div>
  </div>

  <div class="departments-section">
    <h2 class="section-title">专业培养方向</h2>
    <div class="departments-grid">
      <div class="department-card software">
        <div class="card-icon">💻</div>
        <h3>软件部</h3>
        <p>全栈开发技能培养，从前端用户界面到后端服务架构，助你成为技术全才</p>
        <div class="card-features">
          <span class="feature-tag">前端开发</span>
          <span class="feature-tag">后端架构</span>
          <span class="feature-tag">算法竞赛</span>
        </div>
        <a href="/software/start.html" class="card-link">开始学习 →</a>
      </div>
      <div class="department-card hardware">
        <div class="card-icon">🔧</div>
        <h3>硬件部</h3>
        <p>探索硬件世界的奥秘，从电路设计到嵌入式开发，创造有形的科技产品</p>
        <div class="card-features">
          <span class="feature-tag">电路设计</span>
          <span class="feature-tag">嵌入式</span>
          <span class="feature-tag">创新制作</span>
        </div>
        <a href="/hardware/start.html" class="card-link">开始学习 →</a>
      </div>
      <div class="department-card practice">
        <div class="card-icon">🤝</div>
        <h3>交流实践部</h3>
        <p>提升沟通协调能力，积累项目实战经验，培养团队协作和项目管理技能</p>
        <div class="card-features">
          <span class="feature-tag">项目管理</span>
          <span class="feature-tag">团队协作</span>
          <span class="feature-tag">实战训练</span>
        </div>
        <a href="/office/start.html" class="card-link">开始学习 →</a>
      </div>
      <div class="department-card newmedia">
        <div class="card-icon">📱</div>
        <h3>新媒体部</h3>
        <p>融合创意与技术，传播科技之美，掌握现代数字媒体运营和内容创作技能</p>
        <div class="card-features">
          <span class="feature-tag">内容创作</span>
          <span class="feature-tag">视觉设计</span>
          <span class="feature-tag">媒体运营</span>
        </div>
        <a href="/new-media/start.html" class="card-link">开始学习 →</a>
      </div>
    </div>
  </div>

  <div class="vision-section">
    <div class="vision-content">
      <div class="vision-text">
        <h2>我们的愿景</h2>
        <p>西建大 iOS Club 致力于为每一位成员提供专业、系统的技术培养方案。无论你是编程新手还是有一定基础的同学，我们都有适合你的成长路径。</p>
        <p>通过理论学习与实践项目相结合的方式，帮助大家在技术道路上稳步前进，最终成为具备专业技能和创新思维的科技人才。</p>
        <div class="vision-highlights">
          <div class="highlight-item">
            <span class="highlight-icon">🎯</span>
            <span>目标导向的学习路径</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-icon">🚀</span>
            <span>实战项目驱动学习</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-icon">👥</span>
            <span>团队协作共同成长</span>
          </div>
        </div>
      </div>
      <div class="vision-image">
        <div class="floating-elements">
          <div class="float-element" style="--delay: 0s">💡</div>
          <div class="float-element" style="--delay: 1s">⚡</div>
          <div class="float-element" style="--delay: 2s">🚀</div>
          <div class="float-element" style="--delay: 3s">🎯</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.intro-container {
  max-width: 100%;
  margin: 0 auto;
}

.intro-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  margin-bottom: 4rem;
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.1;
  z-index: -1;
}

.intro-content {
  max-width: 800px;
  padding: 2rem;
}

.intro-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.title-highlight {
  display: inline-block;
  animation: fadeInUp 0.2s ease-out;
}

.intro-subtitle {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.intro-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.departments-section {
  max-width: 1200px;
  margin: 0 auto 6rem;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--vp-c-text-1);
}

.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.department-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.department-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.department-card:hover::before {
  transform: scaleX(1);
}

.department-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.department-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.department-card p {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.feature-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.card-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.card-link:hover {
  color: var(--vp-c-brand-2);
}

.vision-section {
  background: var(--vp-c-bg-soft);
  padding: 4rem 2rem;
  margin-bottom: 4rem;
  border-radius: 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.vision-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
}

.vision-text h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.vision-text p {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.vision-highlights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.highlight-icon {
  font-size: 1.25rem;
}

.vision-image {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-elements {
  position: relative;
  width: 200px;
  height: 200px;
}

.float-element {
  position: absolute;
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

.float-element:nth-child(1) { top: 20%; left: 20%; }
.float-element:nth-child(2) { top: 20%; right: 20%; }
.float-element:nth-child(3) { bottom: 20%; left: 20%; }
.float-element:nth-child(4) { bottom: 20%; right: 20%; }

.cta-section {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.cta-section p {
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 0.75rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cta-button.primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.cta-button.primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

.cta-button.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.cta-button.secondary:hover {
  background: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-2px);
}

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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .intro-title {
    font-size: 2.5rem;
  }
  
  .intro-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .departments-grid {
    grid-template-columns: 1fr;
  }
  
  .vision-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 200px;
  }
}
</style>