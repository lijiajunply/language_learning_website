# **Windows 的 WSL 2 配置（Docker 必备环境）**

## **1. 为什么 Docker Desktop 需要 WSL 2？**

- 性能更好：相比传统 Hyper-V 虚拟化，WSL 2 提供接近原生 Linux 的性能

- 资源占用更低：轻量级虚拟化，启动更快

- 直接访问文件系统：Windows 和 Linux 文件系统互通

## **2. 安装前检查**

### **系统要求**

- Windows 10 版本 2004 或更高（内部版本 19041+）

- Windows 11 所有版本

- 64位系统，支持虚拟化

### **检查虚拟化是否启用**

1. 打开任务管理器 → "性能" 选项卡

1. 查看 "虚拟化" 是否显示 "已启用"

> 如果未启用，需要：进入 BIOS 开启 VT-x (Intel) 或 SVM (AMD)关闭 Hyper-V（如果已安装）


## **3. 分步安装配置 WSL 2**

### **步骤 1：启用 WSL 功能**

以管理员身份运行 PowerShell：

```bash
# 启用 WSL 功能
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# 启用虚拟机平台功能
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# 重启计算机
Restart-Computer

```

### **步骤 2：安装 WSL 2 内核更新**

下载并安装：[WSL2 Linux 内核更新包 x64](https://aka.ms/wsl2kernel)

### **步骤 3：设置 WSL 2 为默认版本**

```bash
wsl --set-default-version 2
```

### **步骤 4：安装 Linux 发行版**

1. 打开 Microsoft Store

1. 搜索并安装 Ubuntu（推荐 20.04/22.04）

1. 安装后从开始菜单启动，完成初始化设置（创建用户名/密码）

### **步骤 5：验证 WSL 2**

```bash
wsl -l -v
```

正常输出应类似：

```bash
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

## **4. Docker Desktop 集成 WSL 2**

### **配置 Docker 使用 WSL 2 后端**

1. 打开 Docker Desktop → Settings

1. 选择 General → 勾选 "Use WSL 2 based engine"

1. 选择 Resources → WSL Integration

	- 启用已安装的 Linux 发行版（如 Ubuntu）

	- 可勾选 "Enable integration with my default WSL distro"

### **验证 Docker 与 WSL 2 集成**

```bash
# 在 Windows PowerShell 中测试
docker run --rm hello-world

# 在 WSL 终端中测试
wsl
docker run --rm alpine uname -a
```

## **5. 常见问题解决**

### **问题 1：WSL 2 安装后无法启动**

```bash
# 重置 WSL
wsl --shutdown
wsl --unregister Ubuntu
```

### **问题 2：Docker 无法连接到 WSL**

```bash
# 确保 Docker 服务运行
net start com.docker.service

# 重置 Docker-WSL 集成
dism.exe /online /disable-feature /featurename:Microsoft-Windows-Subsystem-Linux
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

```

### **问题 3：文件系统性能慢**

```
# 将项目文件放在 WSL 文件系统中（如 /home/username/project）
# 而不是 Windows 挂载的 /mnt/c/...
```

## **6. 高级配置（可选）**

### **调整 WSL 2 资源限制**

在 %USERPROFILE%\.wslconfig 中添加：

```bash
[wsl2]
memory=6GB    # 限制内存使用
processors=4  # CPU 核心数
swap=2GB      # 交换空间

```

### **使用 GPU 加速（需要 NVIDIA 显卡）**

```
# 安装 NVIDIA CUDA on WSL 驱动
# 下载地址：

```

## **🔹 最佳实践建议**

1. 项目文件位置：将代码放在 WSL 文件系统内（如 ~/project）而非 /mnt/c/

1. 终端选择：使用 Windows Terminal + WSL 2 组合

1. Docker 数据：大容量数据卷建议放在 WSL 文件系统

> 测试 WSL 2 性能：# 在 WSL 终端中运行time docker run --rm -it ubuntu bash -c "for i in {1..1000}; do echo $i; done"
