# **4. Docker 数据管理（Volumes）**

## **✅核心内容**

### **1. MySQL 数据持久化示例**

```bash
docker run -d \
  --name mysql-db \
  -p 3306:3306 \
  -v /data/mysql/conf:/etc/mysql/conf.d \    # Bind Mount (配置文件)
  -v /data/mysql/logs:/logs \               # Bind Mount (日志)
  -v mysql_data:/var/lib/mysql \            # Volume (核心数据)
  -e MYSQL_ROOT_PASSWORD=123456 \
  mysql:8.0
  
# 本地可执行版本
docker run -p 3306:3306 `
  --restart=on-failure `
  --name mysql-db `
  -v /c/docker-data/mysql/conf:/etc/mysql/conf.d `
  -v /c/docker-data/mysql/logs:/logs `
  -v /c/docker-data/mysql/data:/var/lib/mysql `
  -e MYSQL_ROOT_PASSWORD=Craftsman@2025 `
  -d mysql:8.0
```

关键点说明：

1. /etc/mysql/conf.d：挂载自定义配置 (如 my.cnf)

1. /logs：持久化错误日志/慢查询日志

1. /var/lib/mysql：使用 Volume 确保数据安全

	- 查看 Volume 位置：

```bash
docker volume inspect mysql_data
```

### **2. Bind Mounts vs Volumes**

| 特性 | Bind Mounts (主机目录挂载) | Volumes (Docker 管理数据卷) | 
| -- | -- | -- |
| 存储位置 | 主机指定路径 (/host/path) | Docker 管理 (/var/lib/docker/volumes/) | 
| 可移植性 | 依赖主机路径 (不可移植) | 与主机无关 (可移植) | 
| 性能 | 直接访问主机文件系统 (快) | 通过 Docker 存储驱动 (稍慢) | 
| 备份/迁移 | 需手动管理 | docker volume | 
| 适用场景 | 开发环境 (代码实时同步) | 生产环境 (数据库数据) | 


#### **语法对比**

```bash
# Bind Mount (主机路径必须存在)
docker run -v /host/path:/container/path ...

# Volume (自动创建卷)
docker run -v volume_name:/container/path ...

```

### **3. 数据备份与恢复**

#### **(1) 备份 Volume 数据**

```bash
# 创建备份容器挂载 Volume
docker run --rm \
  -v mysql_data:/source \          # 挂载待备份的 Volume
  -v $(pwd):/backup \             # 挂载主机备份目录
  alpine \
  tar -czf /backup/mysql_backup_$(date +%Y%m%d).tar.gz -C /source .

```

#### **(2) 恢复数据到 Volume**

```bash
# 创建新 Volume (可选)
docker volume create mysql_new

# 恢复备份
docker run --rm \
  -v mysql_new:/target \          # 挂载目标 Volume
  -v $(pwd):/backup \             # 挂载备份文件
  alpine \
  tar -xzf /backup/mysql_backup_20230501.tar.gz -C /target

```

#### **(3) 迁移到新容器**

```bash
docker run -d \
  --name mysql-new \
  -v mysql_new:/var/lib/mysql \   # 使用恢复的 Volume
  mysql:8.0

```

### **🔹 最佳实践**

1. 生产环境推荐组合：

	- 数据库数据 → Volume (安全、易迁移)

	- 配置文件/日志 → Bind Mount (方便调试)

1. 备份策略：

```bash
# 每天凌晨备份 (添加到 crontab)
0 0 * * * docker run --rm -v mysql_data:/source -v /backups:/backup alpine tar -czf /backup/mysql_$(date +\%Y\%m\%d).tar.gz -C /source .
```

1. Windows 路径注意：

```
# PowerShell 中使用反引号
docker run -v C:\docker-data\mysql:/var/lib/mysql mysql

```