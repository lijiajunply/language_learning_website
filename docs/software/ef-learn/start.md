# EF Core 学习

EF Core 是一个开源的 .NET 数据访问框架，用于在 .NET 应用程序中访问和操作关系数据库。它提供了一种简单的方式来使用数据库，而无需担心底层数据库的细节。

## 先来安装一下 EF Core 吧

在你的项目中添加一下包

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite #  SQLite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

然后还需要安装 `dotnet-ef` 这个工具

```bash
dotnet tool install --global dotnet-ef
```

## 创捷数据上下文

在 Entity Framework Core (EF Core) 中，DbContext（通常称为 DataContext）是核心组件，它代表与数据库的会话，用于查询和保存数据。

我们先创建一个 `DataContext`类。这个类继承 `DbContext` 类，并实现 `OnConfiguring` 方法，指定数据库连接字符串。

```csharp
public class DataContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=database.db");
    
    }
    public DbSet<User> Users { get; set; }
}

public class User{

    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
```

## 数据迁移

在EF Core中，每次数据库结构变更都需要进行数据迁移。从而更新数据库结构。

现在我们先进行一次数据库迁移：

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

当运行完这两个指令之后，项目中会出现一个名为Migrations的文件夹和 `database.db` 数据库文件。而Migrations文件夹中存放的是数据库迁移文件。

我们可以试着打开database.db文件，查看数据库结构，发现已经帮我们创建好了User表。User表的字段也是按照我们定义的User类来生成的。

## 试着进行增删改查

对于数据库操作来说，无非就这么几种：增删改查。

1. 增加数据：

```csharp
var context = new UserContext(); // 创建数据库上下文，这时数据库就会和我们保持连接状态，我们可以对数据库进行操作

var user = new User(){ Name="张三",Email="不知道" };
context.Users.Add(user); // 添加数据
context.SaveChanges(); // 保存到数据库中（方法翻译过来就是保存更改）

var users = context.Users.ToList();
foreach (var item in users){
    Console.WriteLine(item.Name); // 张三
}
```

2. 删除数据

```csharp
var user = context.Users.FirstOrDefault(u => u.Name == "张三");
context.Users.Remove(user);
context.SaveChanges();
var users = context.Users.ToList();
foreach (var item in users){
    Console.WriteLine(item.Name); // 没有数据
}
```

2. 更新数据

```csharp
context.Users.Add(user); // 添加数据
context.SaveChanges(); // 保存到数据库中（方法翻译过来就是保存更改）

var user = context.Users.FirstOrDefault(u => u.Name == "张三");
user.Name = "李四";
context.SaveChanges();

var users = context.Users.ToList();
foreach (var item in users){
    Console.WriteLine(item.Name); // 李四
}
```

4. 查询数据

```csharp
var users = context.Users.ToList();
foreach (var item in users){
    Console.WriteLine(item.Name);
}

var user = context.Users.FirstOrDefault(u => u.Name == "张三"); // 根据条件查询
Console.WriteLine(user.Name);
```

剩下的，我们下面再讲