# Docker 网络管理

## **1. 默认网络模式**

Docker 提供三种内置网络驱动：

| 网络模式 | 命令示例 | 特点 | 适用场景 | 
| -- | -- | -- | -- |
| bridge | docker run --network bridge | • 默认模式 | • 单主机环境 | 
| host | docker run --network host | • 直接使用主机网络栈 | • 高性能应用 | 
| none | docker run --network none | • 完全无网络 | • 安全敏感应用 | 


查看现有网络：

```bash
docker network ls
```

## **2. 自定义网络**

### **创建自定义bridge网络**

```bash
docker network create --driver bridge \
  --subnet 172.18.0.0/16 \
  --gateway 172.18.0.1 \
  my-bridge-net

```

优势：

- 自动DNS解析（容器名即主机名）

- 更好的隔离性

- 自定义子网和IP范围

### **容器加入自定义网络**

```bash
docker run -d --name web --network my-bridge-net nginx
docker run -it --network my-bridge-net alpine ping web  # 可直接通过容器名访问
```

## **3. 容器间通信方案对比**

### **方案1：--link (已废弃)**

```bash
# 旧方式（不推荐）
docker run -d --name mysql --network bridge mysql:5.7
docker run --link mysql:dbalias app
```

缺点：

- 单向连接

- 容易导致" spaghetti"式网络

- 官方已标记废弃

### **方案2：自定义网络（推荐）**

```bash
# 创建共享网络
docker network create app-net

# 容器加入同一网络
docker run -d --name mysql --network app-net mysql:8.0
docker run -d --name app --network app-net my-app
```

优势：

- 自动双向通信

- 内置服务发现

- 支持网络隔离

## **4. Selenium Grid 多容器网络示例**

### **完整部署流程**

下载镜像

```bash
docker pull selenium/hub:4.9.0
docker pull selenium/node-chrome:4.9.0
docker pull selenium/node-edge:4.9.0
docker pull selenium/node-firefox:4.9.0
```

启动单独的服务（不推荐）

```bash

docker run -d -p 4444:4444 -p 7900:7900 --shm-size 2g selenium/standalone-chrome:dev
docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-firefox:4.9.0
```

Gird部署方式 ： Hub - Node

```bash
# 1. 创建专用网络
docker network create grid

# 2. 启动Hub
docker run -d `
    --restart=on-failure `
    -p 4442-4444:4442-4444 `
    --net grid `
    --name selenium-hub `
    selenium/hub:4.9.0

# 3. 启动 Node
docker run -d --net grid -e SE_EVENT_BUS_HOST=selenium-hub `
    --restart=on-failure `
    --shm-size="2g" `
	--name node-chrome `
    -e SE_EVENT_BUS_PUBLISH_PORT=4442 `
    -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 `
    selenium/node-chrome:4.9.0
	
docker run -d --net grid -e SE_EVENT_BUS_HOST=selenium-hub `
    --restart=on-failure `
    --shm-size="2g" `
	--name node-edge `
    -e SE_EVENT_BUS_PUBLISH_PORT=4442 `
    -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 `
    selenium/node-edge:4.9.0
	
docker run -d --net grid -e SE_EVENT_BUS_HOST=selenium-hub `
    --restart=on-failure `
    --shm-size="2g" `
	--name node-firefox `
    -e SE_EVENT_BUS_PUBLISH_PORT=4442 `
    -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 `
    selenium/node-firefox:4.9.0

# 4. 验证
curl http://localhost:4444/wd/hub/status

# 5.Removes the grid network
$ docker network rm grid

```

### **网络架构图解**

```
[主机] 
│
├─ 4444端口 → [selenium-hub容器] 
│               │
│               ├─ [chrome-node容器]
│               └─ [firefox-node容器]
└─ 其他服务...

```

## **🔹 最佳实践建议**

1. 生产环境必用自定义网络

```bash
docker network create --driver bridge prod-net
```

1. 避免使用默认bridge网络的隐患

	- 容器间需要通过IP通信（无法用容器名）

	- 存在端口冲突风险

1. 跨主机通信方案

	- Overlay网络（Swarm/Kubernetes）

	- 第三方网络插件（Calico、Weave）

1. 网络诊断命令

```bash
# 查看容器IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 容器名

# 测试网络连通性
docker exec -it 容器名 ping 目标IP
```