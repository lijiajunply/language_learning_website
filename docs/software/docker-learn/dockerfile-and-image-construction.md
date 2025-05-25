# Dockerfile 与镜像构建

## **练习示例：Jira 镜像定制示例**

### **(1) 完整Dockerfile**

```shell
#Dockerfile-Begin
FROM atlassian/jira-software:9.2
USER root
# 将代理破解包加入容器
COPY "atlassian-agent.jar" /opt/atlassian/jira/
# 设置启动加载代理包
RUN echo 'export CATALINA_OPTS="-javaagent:/opt/atlassian/jira/atlassian-agent.jar ${CATALINA_OPTS}"' >> /opt/atlassian/jira/bin/setenv.sh

# 将MySQL驱动包加入容器
COPY "mysql-connector-java-8.0.30.jar" /opt/atlassian/jira/atlassian-jira/WEB-INF/lib/
#Dockerfile-End
```

### **(2) 构建与运行**

构建镜像

```shell
# 构建镜像
docker build -t craftsman/jira:9.2 .
```

```shell
# 构建镜像
docker build -t my-jira:9.2 .

# 运行容器
docker run -d \
  --name jira \
  -p 8080:8080 \
  -v /data/jira:/var/atlassian/application-data/jira \
  my-jira:9.2
  
local
docker run --name jira-instance `
  --restart=on-failure `
  -p 9001:8080 `
  -v /c/docker-data/jira:/var/atlassian/application-data/jira `
  -d `
  craftsman/jira:9.2
```

### **(3) 初始化数据库配置**

```sql

CREATE DATABASE jiradb CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE USER 'jiradb'@'%' IDENTIFIED BY 'Jira#123';
GRANT all privileges ON jiradb.* TO 'jiradb'@'%';
flush privileges;
```

Jira破解命令（需要在atlassian-agent.jar 所在的目录执行）

```shell
java -jar atlassian-agent.jar -d -m test@test.com -n BAT -p jira -o http://192.168.100.4 -s BM3R-LOP0-JXE2-YCLV
```

## **1. Dockerfile 核心指令详解**

### **(1) 基础指令**

| 指令 | 作用 | 示例 | 最佳实践 | 
| -- | -- | -- | -- |
| FROM | 指定基础镜像 | FROM ubuntu:22.04 | 使用官方镜像+明确版本号 | 
| COPY | 复制文件到镜像 | COPY ./app /app | 对敏感文件使用 | 
| RUN | 执行命令 | RUN apt-get update && apt-get install -y curl | 合并命令减少镜像层 | 
| WORKDIR | 设置工作目录 | WORKDIR /app | 替代 | 


### **(2) 入口点指令对比**

| 指令 | 特点 | 示例 | 适用场景 | 
| -- | -- | -- | -- |
| CMD | 默认启动命令 | CMD ["nginx", "-g", "daemon off;"] | 单命令应用 | 
| ENTRYPOINT | 固定入口命令 | ENTRYPOINT ["java", "-jar"] | 需要固定前缀的命令 | 


**组合使用示例**：

```dockerfile
ENTRYPOINT ["/entrypoint.sh"]
CMD ["--help"]  # 作为默认参数
```

## **2. 多阶段构建实战**

### **(1) 传统构建问题**

```dockerfile
FROM golang:1.19
WORKDIR /app
COPY . .
RUN go build -o myapp  # 包含编译环境和源码 → 镜像臃肿
CMD ["./myapp"]
```

### **(2) 多阶段优化方案**

```dockerfile
# 阶段1：构建环境
FROM golang:1.19 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

# 阶段2：运行环境
FROM alpine:3.16
WORKDIR /app
COPY --from=builder /app/myapp .
CMD ["./myapp"]
```

**效果对比**：

- 原始镜像：~900MB

- 多阶段镜像：~12MB

## **🔹 最佳实践指南**

1. 镜像瘦身技巧：

	- 使用Alpine基础镜像

	- 删除缓存文件（apt-get purge -y --auto-remove）

	- 合并RUN指令

1. 安全建议：

```dockerfile
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser  # 避免root运行
```

1. 构建优化：

```bash
# 利用缓存加速构建
docker build --cache-from my-image:latest -t my-image:new .
```