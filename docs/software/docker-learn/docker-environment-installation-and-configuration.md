# Docker 环境安装与配置

## 在 Linux / Windows / macOS 上安装 Docker

### Linux 安装 Docker（以 Ubuntu 为例）

```bash
# 1. 卸载旧版本（如有）
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. 安装依赖工具
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 3. 添加 Docker 官方 GPG 密钥
curl -fsSL 

# 4. 设置稳定版仓库
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] 
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. 安装 Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# 6. 启动 Docker 并设置开机自启
sudo systemctl enable docker
sudo systemctl start docker

# 7. 验证安装
docker --version

```

适用系统：Ubuntu / Debian / CentOS（CentOS 需使用 yum 安装）

### Windows 安装 Docker

要求：

- Windows 10/11 64位（专业版/企业版/教育版）

- 启用 Hyper-V 和 WSL 2（Windows Subsystem for Linux）

步骤：

1. 下载 

1. 安装时勾选 "Use WSL 2 instead of Hyper-V"（推荐）

1. 安装完成后，启动 Docker Desktop

1. 在 PowerShell 验证：

```shell
docker --version
```

### macOS 安装 Docker

要求：

- macOS 10.15+（Catalina 或更高版本）

- Intel 或 Apple Silicon（M1/M2）芯片

步骤：

1. 下载 

1. 拖拽安装到 Applications 文件夹

1. 启动 Docker，在终端验证：

```bash
docker --version

```

## 配置 Docker 镜像加速（阿里云、腾讯云）

**为什么需要镜像加速？**

- Docker Hub 在国外，国内拉取镜像慢。

- 使用国内镜像源（如阿里云、腾讯云）加速下载。

### Linux / macOS 配置

```bash
# 编辑 Docker 配置文件
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://<你的ID>.mirror.aliyuncs.com",  # 阿里云
    "https://mirror.ccs.tencentyun.com"      # 腾讯云
  ]
}
EOF

# 重启 Docker 生效
sudo systemctl daemon-reload
sudo systemctl restart docker
```

获取阿里云加速地址：

1. 登录 

1. 进入「镜像加速器」获取专属地址（需替换 <你的ID>）。

### Windows 配置

1. 右键 Docker 托盘图标 → Settings → Docker Engine

1. 修改 

daemon.json，添加镜像源：

```json
{
  "registry-mirrors": [
    "https://<你的ID>.mirror.aliyuncs.com"
  ]
}

```

1. 点击 Apply & Restart

## 验证安装：docker version、docker info

### 检查 Docker 版本

```bash
docker version

```

输出示例：

```
Client: Docker Engine - Community
 Version:           24.0.5
 API version:       1.43
 Go version:        go1.20.6
 ...

Server: Docker Engine - Community
 Engine:
  Version:          24.0.5
  API version:      1.43 (minimum version 1.12)
  Go version:       go1.20.6
  ...

```

- Client：Docker 命令行工具版本。

- Server：Docker 引擎版本（确认是否正常运行）。

### 查看 Docker 系统信息

```bash
docker info

```

关键信息：

- Containers：运行的容器数量。

- Images：本地镜像数量。

- Registry Mirrors：是否配置了镜像加速。

- Docker Root Dir：Docker 数据存储路径（如 /var/lib/docker）。

## **🔹 总结**

1. 安装 Docker：

	- Linux 使用 apt-get / yum，Windows/macOS 用 Docker Desktop。

1. 配置镜像加速：

	- 修改 daemon.json，添加阿里云/腾讯云镜像源。

1. 验证安装：

	- docker version 检查版本，docker info 查看系统状态。

下一步建议：

- Docker 基础命令实战（拉取镜像、运行容器、查看日志）。

- 数据卷挂载实践（如何持久化 MySQL 数据）。