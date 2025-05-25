# Docker Compose（多容器编排）

## docker-compose.yml 文件结构

### **基础结构**

```yaml
version: '3.8'  # 版本声明
services:       # 容器服务定义
  service1:     # 服务1配置
    image: ...
    ports: ...
  service2:     # 服务2配置
    build: ...
    depends_on: ...

volumes:        # 数据卷定义
  volume1:

networks:       # 网络定义
  network1:

```

### **版本选择指南**

| 版本 | 适用场景 | 
| -- | -- |
| 2.x | 单机简单部署 | 
| 3.x | 生产环境推荐（支持更多功能） | 


## 核心组件详解

### services 定义

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      - TZ=Asia/Shanghai
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M

```

### networks 配置

```yaml
networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24
  backend:
    driver: bridge

```

### volumes 管理

```yaml
volumes:
  db_data:
    driver: local
    driver_opts:
      type: none
      device: /data/mysql
      o: bind

```

## 一键部署 MySQL + Jira + Jenkins

### **完整 compose 文件**

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-db
    environment:
      MYSQL_ROOT_PASSWORD: Craftsman@2024
      MYSQL_DATABASE: jiradb
      MYSQL_USER: jira
      MYSQL_PASSWORD: Jira@123
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql-conf:/etc/mysql/conf.d
    networks:
      - app-net
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 3

  jira:
    image: craftsman/jira:9.2
    container_name: jira-instance
    depends_on:
      mysql:
        condition: service_healthy
    ports:
      - "9001:8080"
    volumes:
      - jira_data:/var/atlassian/application-data/jira
    networks:
      - app-net
    environment:
      - JIRA_DATABASE_URL=jdbc:mysql://mysql-db/jiradb
      - JIRA_DB_PASSWORD=Jira@123

  jenkins:
    image: craftsman/jenkins-blueocean:2.440.2-1
    container_name: jenkins-master
    ports:
      - "9002:8080"
      - "50000:50000"
    volumes:
      - jenkins_data:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - app-net

volumes:
  mysql_data:
  jira_data:
  jenkins_data:

networks:
  app-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.22.0.0/24

```

### **部署命令**

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 停止服务
docker-compose down

```

### **架构说明**

```
用户访问
│
├─ 9001端口 → Jira
├─ 9002端口 → Jenkins
│
└─ 容器间通信通过app-net网络
   │
   ├─ jira → mysql:3306
   └─ jenkins 独立运行

```

## **🔹 最佳实践**

1. 依赖管理

```yaml
depends_on:
  db:
    condition: service_healthy

```

1. 资源限制

```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 1G

```

1. 环境变量管理

```bash
# 使用.env文件
echo "MYSQL_PASSWORD=123456" > .env

```

1. 生产环境建议

	- 使用 docker-compose -f production.yml config 验证配置

	- 为每个服务单独设置网络策略