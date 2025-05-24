# **Docker 常用命令速查表（带示例）**

| 类别 | 命令 | 说明 | 示例 | 
| -- | -- | -- | -- |
| 镜像管理 | docker pull | 下载镜像 | docker pull nginx:1.23.3 | 
| | docker images | 查看本地镜像 | docker images -q |
| | docker rmi | 删除镜像 | docker rmi -f ubuntu:22.04 | 
| | docker build | 构建镜像 | docker build -t myapp:v1 . | 
| 容器管理 | docker run | 创建并运行容器 | docker run -d -p 80:80 --name web nginx | 
| | docker ps | 查看容器 | docker ps -a | 
| | docker stop | 停止容器 | docker stop web | 
| | docker start | 启动容器 | docker start web | 
| | docker restart | 重启容器 | docker restart web | 
| | docker rm | 删除容器 | docker rm -f web | 
| 日志调试 | docker logs | 查看日志 | docker logs -f --tail 100 web | 
| | docker exec | 进入容器 | docker exec -it web bash | 
| | docker inspect | 查看详情 | docker inspect -f web | 
| 数据管理 | docker volume create | 创建数据卷 | docker volume create myvol | 
| | docker volume ls | 列出数据卷 | docker volume ls | 
| | docker volume rm | 删除数据卷 | docker volume rm myvol | 
| 网络管理 | docker network create | 创建网络 | docker network create mynet | 
| | docker network ls | 列出网络 | docker network ls | 
| | docker network connect | 连接容器到网络 | docker network connect mynet web | 
| 系统管理 | docker system df | 查看磁盘使用 | docker system df -v | 
| | docker system prune | 清理无用数据 | docker system prune -a | 
| 组合命令 | 批量停止容器 | 停止所有运行中的容器 | docker stop $(docker ps -q) | 
| | 批量删除容器 | 删除所有停止的容器 | docker rm $(docker ps -aq) | 
| | 批量删除镜像 | 删除所有镜像 | docker rmi $(docker images -q) | 


## **✅ 核心命令详解**

### **1. 镜像管理命令**

#### (1) docker pull - 下载镜像

```bash
docker pull [选项] <镜像名:标签>
```

**常用示例**：

```bash
# 下载官方最新版Ubuntu
docker pull ubuntu:latest

# 下载指定版本的Nginx
docker pull nginx:1.23.3-alpine

# 从私有仓库下载
docker pull registry.example.com/myapp:v1.2
```

**关键选项**：

- --platform：指定平台（如 linux/amd64）

- --quiet：只显示镜像ID

#### (2) docker images - 查看本地镜像

```bash
docker images [选项]
```

**示例输出**：

```bash
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    2b7d6430f78d   2 weeks ago    142MB
ubuntu       22.04     3f5ef9003c2b   3 weeks ago    77.8MB
```

**常用选项**：

- -q：只显示镜像ID

- --digests：显示摘要信息

- --no-trunc：显示完整信息

#### docker rmi - 删除镜像

```bash
docker rmi [选项] <镜像名/ID>
```

**实际案例**：

```bash
# 删除单个镜像
docker rmi nginx:1.23.3

# 强制删除（即使有容器使用）
docker rmi -f ubuntu:22.04

# 删除所有镜像（危险！）
docker rmi $(docker images -q)
```

### 2. 容器管理命令

#### docker run - 创建并运行容器

```bash
docker run [选项] <镜像> [命令]
```

**核心选项**：

| 选项 | 说明 | 
| -- | -- |
| -d | 后台运行 | 
| -it | 交互式终端 | 
| --name | 指定容器名称 | 
| -p | 端口映射（主机:容器） | 
| -v | 数据卷挂载 | 
| --rm | 退出后自动删除 | 
| -e | 设置环境变量 | 


**典型用例**：

```bash
# 运行Nginx并映射端口
docker run -d --name my-nginx -p 8080:80 nginx

# 运行交互式Ubuntu容器
docker run -it --rm ubuntu bash

# 带环境变量的MySQL
docker run -d -e MYSQL_ROOT_PASSWORD=123456 mysql:8.0
```

#### docker ps - 查看容器

```bash
docker ps [选项]
```

**常用组合**：

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 显示容器ID和状态
docker ps -aq --format "{{.ID}}: {{.Status}}"

# 按名称过滤
docker ps -f "name=my-nginx"
```

#### docker stop/start/restart - 生命周期管理

```bash
# 停止容器
docker stop my-nginx

# 启动已停止的容器
docker start my-nginx

# 重启容器
docker restart my-nginx
```

#### docker rm - 删除容器

```bash
# 删除已停止的容器
docker rm my-nginx

# 强制删除运行中的容器
docker rm -f my-nginx

# 删除所有停止的容器
docker container prune
```

### **3. 日志与调试命令**

#### docker logs - 查看容器日志

```bash
docker logs [选项] <容器>
```

**实用技巧**：

```bash
# 查看最新日志
docker logs my-nginx

# 实时跟踪日志（类似tail -f）
docker logs -f my-nginx

# 显示最后20行
docker logs --tail 20 my-nginx

# 显示时间戳
docker logs -t my-nginx

# 过滤特定时间段的日志
docker logs --since 2023-05-01 --until 2023-05-02 my-nginx
```

#### docker exec - 进入运行中的容器

```bash
docker exec [选项] <容器> <命令>
```

**典型场景**：

```bash
# 进入容器bash终端
docker exec -it my-nginx bash

# 在容器内执行命令
docker exec my-nginx ls /etc/nginx

# 以root身份进入
docker exec -u 0 -it my-nginx bash

# 在容器内创建文件
docker exec my-nginx touch /tmp/test.txt
```

#### docker inspect - 查看容器详情

```bash
docker inspect [选项] <容器/镜像>
```

**高级用法**：

```bash
# 查看容器所有信息
docker inspect my-nginx

# 提取特定信息（JSON路径查询）
docker inspect -f '{{.NetworkSettings.IPAddress}}' my-nginx

# 查看挂载点信息
docker inspect -f '{{.Mounts}}' my-nginx

# 查看容器启动命令
docker inspect -f '{{.Config.Cmd}}' my-nginx
```

### **🔹 命令速查表**

| 类别 | 常用命令 | 说明 | 
| -- | -- | -- |
| 镜像 | pull | 下载镜像 | 
|   | images | 查看镜像 | 
|   | rmi | 删除镜像 | 
| 容器 | run | 创建容器 | 
|   | ps | 查看容器 | 
|   | stop/start | 启停容器 | 
|   | rm | 删除容器 | 
| 调试 | logs | 查看日志 | 
|   | exec | 进入容器 | 
|   | inspect | 查看详情 | 


### **💡 最佳实践建议**

1. 容器命名：始终使用 --name 指定有意义的名称

1. 自动清理：测试时使用 --rm 选项避免垃圾容器

1. 日志管理：生产环境建议配置日志驱动（如json-file大小限制）

1. 安全注意：避免在容器内直接修改数据，应使用数据卷