# EF Core 数据库迁移与版本管理

## 1. 数据库迁移基础

### 1.1 什么是数据库迁移

数据库迁移是一种结构化的方法，用于管理数据库架构随时间的变化。在 EF Core 中，迁移提供了以下功能：

- 跟踪模型与数据库架构之间的差异
- 生成用于更新数据库架构的 SQL 脚本
- 提供数据库架构版本管理
- 支持数据迁移和种子数据管理

### 1.2 迁移的工作原理

EF Core 迁移的基本工作原理如下：

1. 当创建迁移时，EF Core 比较当前模型与之前的模型快照
2. 生成表示架构变更的迁移文件（C# 代码）
3. 应用迁移时，EF Core 执行迁移文件中的 Up 方法，将变更应用到数据库
4. 可以回滚迁移，执行迁移文件中的 Down 方法，撤销变更
5. EF Core 在数据库中维护一个 `__EFMigrationsHistory` 表，用于跟踪已应用的迁移

## 2. 设置迁移

### 2.1 安装必要的工具

首先，需要安装 EF Core 设计和工具包。

```bash
# 安装 EF Core 设计包（项目引用）
dotnet add package Microsoft.EntityFrameworkCore.Design

# 安装 EF Core 工具（全局工具）
dotnet tool install --global dotnet-ef

# 如果你需要特定数据库的提供程序
# SQL Server 示例
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

# SQLite 示例
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

### 2.2 配置 DbContext

在项目中创建一个继承自 `DbContext` 的类，并配置模型和数据库连接。

```csharp
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // 在实际应用中，连接字符串应从配置中获取
        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=MyDb;Trusted_Connection=True;");
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 配置模型
        modelBuilder.Entity<Category>()
            .HasMany(c => c.Products)
            .WithOne(p => p.Category)
            .HasForeignKey(p => p.CategoryId);
    }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Product> Products { get; set; }
}
```

## 3. 创建和管理迁移

### 3.1 创建初始迁移

```bash
# 在项目目录中运行
# 基本语法: dotnet ef migrations add <迁移名称>
dotnet ef migrations add InitialCreate
```

这将生成三个文件：

1. 迁移类文件（包含 Up 和 Down 方法）
2. 模型快照文件（当前模型的快照）
3. 设计文件（用于 EF Core 内部使用）

### 3.2 查看生成的迁移

生成的迁移类文件示例：

```csharp
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourProject.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
```

### 3.3 添加模型变更后的迁移

当修改模型后，可以添加新的迁移来反映这些变更。

```csharp
// 修改 Product 类，添加新属性
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
    
    // 新增属性
    public string Description { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

然后创建新的迁移：

```bash
dotnet ef migrations add AddProductProperties
```

### 3.4 查看所有迁移

```bash
dotnet ef migrations list
```

### 3.5 删除迁移

```bash
# 删除最后一个迁移
dotnet ef migrations remove

# 删除特定迁移（不推荐，可能导致不一致）
# 应该通过添加新迁移来撤销变更
```

### 3.6 重命名迁移

```bash
# 使用标准的文件重命名方式
# 但需要注意更新模型快照中的引用
```

## 4. 应用和管理迁移

### 4.1 应用迁移到数据库

```bash
# 应用所有未应用的迁移
dotnet ef database update

# 应用到特定迁移版本
dotnet ef database update AddProductProperties
```

### 4.2 回滚迁移

```bash
# 回滚到上一个迁移版本
dotnet ef database update PreviousMigrationName

# 回滚到初始状态
dotnet ef database update 0
```

### 4.3 查看数据库状态

```bash
dotnet ef database update --list
```

### 4.4 生成 SQL 脚本

```bash
# 生成所有迁移的 SQL 脚本
dotnet ef migrations script

# 生成特定范围迁移的 SQL 脚本
dotnet ef migrations script InitialCreate AddProductProperties

# 生成脚本并保存到文件
dotnet ef migrations script -o migrations.sql
```

## 5. 高级迁移功能

### 5.1 数据迁移

在迁移中执行数据操作：

```csharp
public partial class AddDefaultCategory : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        // 架构变更
        migrationBuilder.AlterColumn<string>(
            name: "Name",
            table: "Categories",
            type: "nvarchar(100)",
            maxLength: 100,
            nullable: false,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        // 数据操作
        migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('默认类别')");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // 数据操作
        migrationBuilder.Sql("DELETE FROM Categories WHERE Name = '默认类别'");

        // 架构变更撤销
        migrationBuilder.AlterColumn<string>(
            name: "Name",
            table: "Categories",
            type: "nvarchar(max)",
            nullable: false,
            oldClrType: typeof(string),
            oldType: "nvarchar(100)",
            oldMaxLength: 100);
    }
}
```

### 5.2 条件迁移

针对不同数据库提供程序的条件迁移：

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    // 通用操作
    migrationBuilder.AddColumn<string>(
        name: "Description",
        table: "Products",
        nullable: true);

    // SQL Server 特定操作
    if (migrationBuilder.ActiveProvider == "Microsoft.EntityFrameworkCore.SqlServer")
    {
        migrationBuilder.Sql("CREATE INDEX IX_Products_Description ON Products(Description) INCLUDE (Name, Price)");
    }
    // SQLite 特定操作
    else if (migrationBuilder.ActiveProvider == "Microsoft.EntityFrameworkCore.Sqlite")
    {
        migrationBuilder.Sql("CREATE INDEX IX_Products_Description ON Products(Description)");
    }
}
```

### 5.3 迁移中的原始 SQL

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    // 创建计算列（SQL Server）
    migrationBuilder.Sql(@"
        ALTER TABLE Products 
        ADD DiscountedPrice AS (Price * 0.9);
    ");

    // 创建触发器
    migrationBuilder.Sql(@"
        CREATE TRIGGER trg_UpdateProductLastModified
        ON Products
        AFTER UPDATE
        AS
        BEGIN
            UPDATE Products
            SET LastModified = GETDATE()
            WHERE Id IN (SELECT Id FROM inserted);
        END;
    ");
}

protected override void Down(MigrationBuilder migrationBuilder)
{
    migrationBuilder.Sql("DROP TRIGGER trg_UpdateProductLastModified");
    migrationBuilder.Sql("ALTER TABLE Products DROP COLUMN DiscountedPrice");
}
```

## 6. 种子数据

### 6.1 使用 HasData 方法

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 配置种子数据
    modelBuilder.Entity<Category>().HasData(
        new Category { Id = 1, Name = "电子产品" },
        new Category { Id = 2, Name = "家居用品" },
        new Category { Id = 3, Name = "图书" }
    );

    modelBuilder.Entity<Product>().HasData(
        new Product { Id = 1, Name = "笔记本电脑", Price = 5999.99m, CategoryId = 1, IsActive = true },
        new Product { Id = 2, Name = "智能手机", Price = 2999.99m, CategoryId = 1, IsActive = true },
        new Product { Id = 3, Name = "办公椅", Price = 899.99m, CategoryId = 2, IsActive = true },
        new Product { Id = 4, Name = "编程书籍", Price = 89.99m, CategoryId = 3, IsActive = true }
    );
}
```

然后创建迁移：

```bash
dotnet ef migrations add SeedInitialData
```

### 6.2 自定义种子数据方法

```csharp
public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        // 检查是否已存在数据
        if (context.Categories.Any())
        {
            return;   // 数据库已初始化
        }

        // 添加类别
        var categories = new Category[]
        {
            new Category { Name = "电子产品" },
            new Category { Name = "家居用品" },
            new Category { Name = "图书" }
        };
        
        context.Categories.AddRange(categories);
        context.SaveChanges();

        // 添加产品
        var products = new Product[]
        {
            new Product { Name = "笔记本电脑", Price = 5999.99m, CategoryId = categories[0].Id, IsActive = true },
            new Product { Name = "智能手机", Price = 2999.99m, CategoryId = categories[0].Id, IsActive = true },
            new Product { Name = "办公椅", Price = 899.99m, CategoryId = categories[1].Id, IsActive = true },
            new Product { Name = "编程书籍", Price = 89.99m, CategoryId = categories[2].Id, IsActive = true }
        };
        
        context.Products.AddRange(products);
        context.SaveChanges();
    }
}

// 在应用启动时调用
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    using var scope = app.ApplicationServices.CreateScope();
    var services = scope.ServiceProvider;
    
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();  // 应用所有迁移
        DbInitializer.Initialize(context);  // 初始化种子数据
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "数据库初始化过程中出错");
    }
    
    // 其他配置...
}
```

## 7. 迁移中的并发控制

### 7.1 解决迁移冲突

当多个开发者同时修改模型并创建迁移时，可能会发生冲突。解决方法：

1. 定期从版本控制系统更新代码
2. 在添加新迁移前应用最新的迁移
3. 发生冲突时，手动合并迁移文件
4. 考虑使用分支策略减少冲突

### 7.2 锁定迁移文件

在团队开发中，考虑以下策略：

1. 为每个迁移指定负责人
2. 使用代码审查确保迁移正确性
3. 在合并到主分支前测试迁移
4. 考虑使用功能分支隔离大型模型变更

## 8. 高级迁移场景

### 8.1 多上下文迁移

当应用程序使用多个 DbContext 时：

```bash
# 指定上下文进行迁移
dotnet ef migrations add InitialCreate --context ApplicationDbContext
dotnet ef migrations add InitialCreate --context IdentityDbContext

# 应用特定上下文的迁移
dotnet ef database update --context ApplicationDbContext
dotnet ef database update --context IdentityDbContext
```

### 8.2 生产环境迁移策略

生产环境迁移最佳实践：

1. **预先测试**：在开发和测试环境中全面测试迁移
2. **备份**：在应用迁移前备份生产数据库
3. **维护窗口**：在低流量时段执行迁移
4. **生成脚本**：先生成 SQL 脚本并审查，然后手动应用
5. **监控**：迁移过程中监控数据库性能和应用程序响应
6. **回滚计划**：准备回滚方案，以防迁移失败

### 8.3 迁移和部署自动化

将迁移集成到 CI/CD 流程：

```yaml
# 示例 CI/CD 配置（GitHub Actions）
name: Deploy Application

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: '6.0.x'
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --configuration Release
    
    - name: Generate migration script
      run: |
        cd YourProject
        dotnet ef migrations script -o ../migrations.sql --idempotent
    
    - name: Apply migrations
      # 使用数据库工具或自定义脚本应用迁移
      run: |
        # 示例：使用 sqlcmd 应用迁移
        sqlcmd -S ${{ secrets.DB_SERVER }} -d ${{ secrets.DB_NAME }} -U ${{ secrets.DB_USERNAME }} -P ${{ secrets.DB_PASSWORD }} -i migrations.sql
    
    - name: Publish
      run: dotnet publish --configuration Release --output publish
    
    - name: Deploy to production
      # 部署逻辑
```

## 9. 迁移管理工具

### 9.1 EF Core 命令行工具参考

```bash
# 列出所有可用命令
dotnet ef --help

# 迁移相关命令
dotnet ef migrations --help

# 数据库相关命令
dotnet ef database --help
```

### 9.2 常用迁移命令

| 命令 | 描述 |
|------|------|
| `dotnet ef migrations add <名称>` | 创建新迁移 |
| `dotnet ef migrations list` | 列出所有迁移 |
| `dotnet ef migrations remove` | 删除最后一个迁移 |
| `dotnet ef migrations script` | 生成 SQL 脚本 |
| `dotnet ef database update` | 应用迁移到数据库 |
| `dotnet ef database drop` | 删除数据库 |
| `dotnet ef database update 0` | 删除所有迁移 |

## 10. 迁移最佳实践

### 10.1 命名约定

- 使用有意义的迁移名称，描述变更内容
- 遵循一致的命名模式，如 `Add<Entity><Change>` 或 `Update<Entity><Change>`
- 避免使用版本号作为迁移名称

### 10.2 迁移策略

1. **小步快跑**：进行小而频繁的迁移，而不是大型的一次性迁移
2. **保持简单**：每个迁移专注于一个特定的变更
3. **先设计后迁移**：在创建迁移前完成模型设计
4. **跟踪依赖**：确保迁移顺序正确，特别是有数据依赖的迁移

### 10.3 版本控制

1. 将迁移文件纳入版本控制
2. 不要修改已应用到生产环境的迁移
3. 如果需要修改已存在的迁移，添加新的迁移来修正

### 10.4 性能考虑

1. 大型数据迁移应在低流量时段执行
2. 考虑将大型迁移拆分为多个小型迁移
3. 对于数据密集型迁移，考虑使用批处理操作

### 10.5 测试迁移

1. 在开发和测试环境中全面测试迁移
2. 模拟生产环境数据量进行性能测试
3. 测试迁移和回滚操作

## 11. 故障排除

### 11.1 常见问题和解决方案

#### 11.1.1 迁移历史记录不匹配

**问题**：尝试应用迁移时出现错误，提示模型与迁移历史记录不匹配。

**解决方案**：

1. 检查模型是否已更改但未创建新迁移
2. 使用 `dotnet ef migrations add <名称>` 创建新迁移
3. 如果问题仍然存在，考虑重置迁移历史：
   ```bash
   # 从数据库中删除所有迁移
   dotnet ef database update 0
   # 删除所有迁移文件
   # 创建新的初始迁移
   dotnet ef migrations add InitialCreate
   # 应用新迁移
   dotnet ef database update
   ```

#### 11.1.2 数据库对象已存在

**问题**：应用迁移时出现错误，提示表或列已存在。

**解决方案**：

1. 检查数据库是否已手动修改
2. 修改迁移文件，在 Up 方法中添加条件检查
3. 考虑使用 `migrationBuilder.CreateTable` 的 `ifNotExists` 参数

#### 11.1.3 外键约束问题

**问题**：迁移失败，提示外键约束冲突。

**解决方案**：

1. 确保迁移顺序正确，先创建引用的表
2. 在添加外键约束前，确保数据完整性
3. 考虑暂时禁用外键约束，然后重新启用

#### 11.1.4 超时问题

**问题**：大型迁移超时。

**解决方案**：

1. 增加命令超时设置
   ```csharp
   optionsBuilder.UseSqlServer("connection string", 
       options => options.CommandTimeout(60));  // 60秒超时
   ```
2. 将大型迁移拆分为多个小型迁移
3. 在低流量时段执行迁移

## 12. 小结

本章详细介绍了 EF Core 的数据库迁移功能，包括：

- 数据库迁移的基本概念和工作原理
- 如何设置、创建和管理迁移
- 应用和回滚迁移的方法
- 高级迁移功能，如数据迁移、条件迁移和原始 SQL
- 种子数据的添加和管理
- 迁移中的并发控制和冲突解决
- 高级迁移场景，如多上下文迁移和生产环境迁移策略
- 迁移管理工具和命令参考
- 迁移最佳实践，包括命名约定、迁移策略、版本控制和性能考虑
- 常见问题和故障排除方法

通过掌握这些知识，你可以有效地管理数据库架构的演变，确保应用程序和数据库之间的一致性，并在团队环境中安全地进行数据库变更。