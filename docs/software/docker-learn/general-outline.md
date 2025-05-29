# **Docker 教学完整目录**

> 本系列为网络资源，仅供学习参考，版权归原作者所有。

## **1. Docker 基础概念**

✅ **讨论内容**：

- 什么是 Docker？与虚拟机的区别

- Docker 架构（Docker Engine、Images、Containers、Registry）

- Docker 核心概念：镜像、容器、数据卷、网络

## **2. Docker 环境安装与配置**

✅ **讨论内容**：

- 在 Linux / Windows / macOS 上安装 Docker

- 配置 Docker 镜像加速（阿里云、腾讯云）

- 验证安装：docker version、docker info

## **3. Docker 基础命令**

✅ **讨论内容**：

- 镜像管理：docker pull、docker images、docker rmi

- 容器管理：docker run、docker ps、docker stop、docker rm

- 日志与调试：docker logs、docker exec、docker inspect

## **4. Docker 数据管理（Volumes）**

✅ **讨论内容**：

- Bind Mounts（主机目录挂载） vs **Volumes**（Docker 管理的数据卷）

- MySQL 数据持久化示例（-v /data/mysql:/var/lib/mysql）

- 数据备份与恢复

## **5. Dockerfile 与镜像构建**

✅ **讨论内容**：

- Dockerfile 指令（FROM、COPY、RUN、CMD、ENTRYPOINT）

- 多阶段构建（减少镜像体积）

- Jira 镜像定制示例（添加 MySQL 驱动、破解代理）

## **6. Docker 网络管理**

✅ **讨论内容**：

- 默认网络模式（bridge、host、none）

- 自定义网络（docker network create）

- 容器间通信（--link vs 自定义网络）

- Selenium Grid 多容器网络示例

## **7. Docker Compose（多容器编排）**

✅ **讨论内容**：

- docker-compose.yml 文件结构

- 服务定义（services、networks、volumes）

- 一键部署 MySQL + Jira + Jenkins

## **8. 实战案例：Jenkins + Docker-in-Docker（DinD）**

✅ **讨论内容**：

- 为什么需要 DinD（在容器内运行 Docker 命令）

- Jenkins Pipeline 集成 Docker

- CI/CD 示例（构建镜像并推送到 Registry）

## **9. 进阶话题**

✅ **讨论内容**：

- Kubernetes 简介（与 Docker 的关系）

- Docker Swarm vs Kubernetes

- 云原生部署（AWS ECS / Azure ACI）