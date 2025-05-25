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

## 告诉EF Core 我们想创建什么样的数据库

对于数据库，我们可以很浅显的把数据库 “解剖” 成这样:

```
数据库 -> 表 -> 字段
```

对于 EF Core 来说，连接和管理数据库的是 DbContext 类，然后在DbContext类中使用 `DbSet<T>` 的属性来表示数据库中的各种表。对于每个表则由一个对应的类来表示。

有点难懂，那不如先来看一个例子：

我们先创建一个储存数据的类（Model）

```csharp
public class Member{
	[Key]
	public int Key{get;set;}
	public string Name{get;set;}
	public string Email{get;set;}
}
```

然后我们还需要写一个继承自DbContext的类来和数据库进行交互:

```csharp
public class MemberContext : DbContext
{
    public DbSet<Member> Members{ get; set; }

    public string DbPath { get; }

    public MemberContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "Member.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}
```

这样我们就可以使用了！但是现在还没完，我们还得进行 **数据迁移**。

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

微软文档：

[入门 - EF Core | Microsoft Learn](https://learn.microsoft.com/zh-cn/ef/core/get-started/overview/first-app?tabs=netcore-cli)