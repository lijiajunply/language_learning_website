<template>
    <div class="learning-resources">
        <!-- 页面标题 -->
        <div class="hero-section">
            <h1 class="hero-title">
                <span class="gradient-text">软件部学习计划</span>
            </h1>
            <br/>
            <p class="hero-subtitle">开启你的编程学习之旅</p>
        </div>

        <!-- 资源卡片区域 -->
        <div class="resources-container">
            <!-- Web前端 -->
            <div class="resource-card frontend-card">
                <div class="card-header">
                    <div class="icon-wrapper frontend-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                            <path d="M12 22V12m0 0L8 8m4 4l4-4" />
                        </svg>
                    </div>
                    <h2>Web前端</h2>
                </div>
                <div class="card-content">
                    <div class="link-group">
                        <span class="link-label">学习计划和教程：</span>
                        <a href="/software/front-end-learning-plan.html" target="_blank"
                            class="resource-link">
                            查看教程 →
                        </a>
                    </div>
                    <div class="link-group">
                        <span class="link-label">实践任务仓库：</span>
                        <a href="https://gitee.com/XAUATiOSClub/language_learning" target="_blank"
                            class="resource-link">
                            前往仓库 →
                        </a>
                    </div>
                </div>
            </div>

            <!-- Web后端 -->
            <div class="resource-card backend-card">
                <div class="card-header">
                    <div class="icon-wrapper backend-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path
                                d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                    </div>
                    <h2>Web后端</h2>
                </div>
                <div class="card-content">
                    <!-- Java -->
                    <div class="backend-section">
                        <h3 class="tech-title">
                            <span class="tech-badge java">Java</span>
                        </h3>
                        <div class="link-group">
                            <span class="link-label">学习计划和教程：</span>
                            <a href="/software/spring-learn/start.html" target="_blank"
                                class="resource-link">
                                Spring教程 →
                            </a>
                        </div>
                        <div class="link-group">
                            <span class="link-label">实践任务仓库：</span>
                            <a href="https://gitee.com/XAUATiOSClub/learn-java" target="_blank" class="resource-link">
                                Java仓库 →
                            </a>
                        </div>
                    </div>

                    <!-- C# -->
                    <div class="backend-section">
                        <h3 class="tech-title">
                            <span class="tech-badge csharp">C#</span>
                        </h3>
                        <div class="link-group">
                            <span class="link-label">学习计划和教程：</span>
                            <a href="/software/aspnetcore-learn/start.html" target="_blank"
                                class="resource-link">
                                ASP.NET Core教程 →
                            </a>
                        </div>
                        <div class="link-group">
                            <span class="link-label">实践任务仓库：</span>
                            <a href="https://gitee.com/XAUATiOSClub/learn-aspnetcore" target="_blank"
                                class="resource-link">
                                C#仓库 →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- App开发 -->
            <div class="resource-card app-card">
                <div class="card-header">
                    <div class="icon-wrapper app-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                    </div>
                    <h2>App开发</h2>
                </div>
                <div class="card-content">
                    <div class="link-group">
                        <span class="link-label">学习计划和教程：</span>
                        <a href="/software/app-development-learning-plan.html" target="_blank"
                            class="resource-link">
                            查看教程 →
                        </a>
                    </div>
                    <div class="link-group">
                        <span class="link-label">实践任务仓库：</span>
                        <a href="https://gitee.com/XAUATiOSClub/learn-app" target="_blank" class="resource-link">
                            前往仓库 →
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 提交说明 -->
        <div class="submission-info">
            <div class="info-card">
                <h3>📝 提交方式</h3>
                <p>实践任务的提交方式为，在仓库中开分支/Fork一个，然后在上面提交即可（不要破坏主分支）。</p>

                <div class="tips-section">
                    <h3>💡 学习提示</h3>
                    <ul>
                        <li>每周六会at全体成员进行提醒</li>
                        <li>遇到问题请在群里积极讨论</li>
                        <li>可以尝试使用AI辅助学习</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 基础样式和CSS变量 */
.learning-resources {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
}

/* 英雄区域 */
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

/* 资源容器 */
.resources-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

/* 资源卡片 */
.resource-card {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
    animation: fadeInUp 0.8s ease-out;
    animation-fill-mode: both;
}

.resource-card:nth-child(1) {
    animation-delay: 0.1s;
}

.resource-card:nth-child(2) {
    animation-delay: 0.2s;
}

.resource-card:nth-child(3) {
    animation-delay: 0.3s;
}

.resource-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: var(--vp-c-brand);
}

/* 卡片头部 */
.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.card-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--vp-c-text-1);
}

/* 图标样式 */
.icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.icon-wrapper svg {
    width: 24px;
    height: 24px;
}

.frontend-icon {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.backend-icon {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

.app-icon {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
}

/* 卡片内容 */
.card-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.backend-section {
    padding: 1rem 0;
    border-bottom: 1px solid var(--vp-c-divider);
}

.backend-section:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.tech-title {
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
}

.tech-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
}

.tech-badge.java {
    background: linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
    color: #333;
}

.tech-badge.csharp {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

/* 链接组 */
.link-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.link-label {
    font-size: 0.875rem;
    color: var(--vp-c-text-2);
}

.resource-link {
    color: var(--vp-c-brand);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}

.resource-link:hover {
    color: var(--vp-c-brand-dark);
    transform: translateX(4px);
}

/* 提交信息区域 */
.submission-info {
    animation: fadeInUp 0.8s ease-out 0.4s both;
}

.info-card {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 16px;
    padding: 2rem;
}

.info-card h3 {
    margin: 0 0 1rem 0;
    color: var(--vp-c-text-1);
}

.info-card p {
    color: var(--vp-c-text-2);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.tips-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--vp-c-divider);
}

.tips-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.tips-section li {
    padding: 0.5rem 0;
    color: var(--vp-c-text-2);
    position: relative;
    padding-left: 1.5rem;
}

.tips-section li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--vp-c-brand);
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

/* 暗黑模式适配 */
.dark .resource-card {
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-divider);
}

.dark .resource-card:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.dark .gradient-text {
    background: linear-gradient(120deg, #818cf8 0%, #c084fc 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .learning-resources {
        padding: 1rem;
    }

    .hero-section {
        margin-bottom: 2rem;
    }

    .resources-container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .resource-card {
        padding: 1.5rem;
    }

    .card-header {
        flex-direction: column;
        text-align: center;
    }

    .link-group {
        text-align: center;
    }

    .resource-link {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .icon-wrapper {
        width: 40px;
        height: 40px;
    }

    .icon-wrapper svg {
        width: 20px;
        height: 20px;
    }

    .card-header h2 {
        font-size: 1.25rem;
    }

    .info-card {
        padding: 1.5rem;
    }
}
</style>