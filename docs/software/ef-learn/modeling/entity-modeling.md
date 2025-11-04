# EF Core 模型定义与映射

## 1. 实体类基础

### 1.1 创建实体类

在 EF Core 中，实体类通常是简单的 C# 类，代表数据库中的表。以下是创建实体类的基本规则：

```csharp
public class Blog
{
    // 主键属性
    public int Id { get; set; }
    
    // 普通属性
    public string Title { get; set; }
    public string Url { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // 导航属性
    public List<Post> Posts { get; set; } = new List<Post>();
}

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    
    // 外键属性
    public int BlogId { get; set; }
    
    // 导航属性
    public Blog Blog { get; set; }
}
```

### 1.2 约定优于配置

EF Core 遵循"约定优于配置"的原则，通过以下默认约定确定模型：

- **主键识别**：名为 `Id` 或 `<实体名>Id` 的属性会被视为主键
- **表名映射**：实体类名默认映射到同名表
- **列名映射**：属性名默认映射到同名列
- **关系推断**：通过导航属性和外键推断关系
- **数据类型推断**：根据 C# 类型推断数据库类型

## 2. 数据注解

数据注解是一种在实体类和属性上使用特性来配置模型的方式。

### 2.1 基本数据注解

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Product
{
    [Key]  // 指定主键
    public int ProductId { get; set; }
    
    [Required]  // 非空约束
    [MaxLength(100)]  // 最大长度
    public string Name { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]  // 指定列类型
    public decimal Price { get; set; }
    
    [NotMapped]  // 不映射到数据库列
    public string DisplayName => $"{Name} - ${Price}";
    
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  // 自增列
    public DateTime CreatedAt { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]  // 计算列
    public DateTime? LastUpdated { get; set; }
    
    [Timestamp]  // 时间戳并发控制
    public byte[] RowVersion { get; set; }
}
```

### 2.2 关系数据注解

```csharp
public class Order
{
    [Key]
    public int OrderId { get; set; }
    
    // 一对多关系
    [ForeignKey("CustomerId")]  // 指定外键
    public Customer Customer { get; set; }
    public int CustomerId { get; set; }
    
    // 一对多关系
    public List<OrderItem> Items { get; set; } = new List<OrderItem>();
}

public class Customer
{
    [Key]
    public int CustomerId { get; set; }
    
    [InverseProperty("Customer")]  // 指定反向导航属性
    public List<Order> Orders { get; set; } = new List<Order>();
}
```

## 3. Fluent API 配置

Fluent API 提供了更强大、更灵活的模型配置方式，通过重写 DbContext 的 OnModelCreating 方法实现。

### 3.1 基本配置

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 配置实体
    modelBuilder.Entity<Author>(entity =>
    {
        // 设置主键
        entity.HasKey(e => e.AuthorId);
        
        // 配置属性
        entity.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(100);
        
        entity.Property(e => e.Email)
            .IsRequired()
            .HasMaxLength(255)
            .IsUnicode(false);  // 非 Unicode 字符串
        
        entity.Property(e => e.DateOfBirth)
            .HasColumnType("date");  // 指定列类型
        
        // 忽略属性
        entity.Ignore(e => e.Age);
    });
    
    // 配置表名
    modelBuilder.Entity<Book>().ToTable("Books");
    
    // 配置模式
    modelBuilder.Entity<Publisher>().ToTable("Publishers", schema: "dbo");
}
```

### 3.2 关系配置

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 一对多关系配置
    modelBuilder.Entity<Department>()
        .HasMany(d => d.Employees)  // 一个部门有多个员工
        .WithOne(e => e.Department)  // 一个员工属于一个部门
        .HasForeignKey(e => e.DepartmentId)  // 指定外键
        .OnDelete(DeleteBehavior.Cascade);  // 删除级联
    
    // 一对一关系配置
    modelBuilder.Entity<Employee>()
        .HasOne(e => e.EmployeeDetail)  // 一个员工有一个详情
        .WithOne(ed => ed.Employee)  // 一个详情属于一个员工
        .HasForeignKey<EmployeeDetail>(ed => ed.EmployeeId);  // 在 EmployeeDetail 中指定外键
    
    // 多对多关系配置
    modelBuilder.Entity<Student>()
        .HasMany(s => s.Courses)  // 一个学生有多个课程
        .WithMany(c => c.Students)  // 一个课程有多个学生
        .UsingEntity<Enrollment>(  // 使用连接实体
            j => j.HasOne(e => e.Course).WithMany(),
            j => j.HasOne(e => e.Student).WithMany(),
            j =>
            {
                j.HasKey(e => new { e.StudentId, e.CourseId });
                j.ToTable("StudentCourses");
            });
}
```

## 4. 实体关系映射详解

### 4.1 一对多关系

一对多是最常见的关系类型，表示一个实体可以与多个其他实体相关联。

```csharp
public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Product> Products { get; set; } = new List<Product>();
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }  // 外键
    public Category Category { get; set; }  // 导航属性
}

// Fluent API 配置
modelBuilder.Entity<Product>()
    .HasOne(p => p.Category)
    .WithMany(c => c.Products)
    .HasForeignKey(p => p.CategoryId);
```

### 4.2 一对一关系

一对一关系表示两个实体之间的一一对应关系。

```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public UserProfile Profile { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Bio { get; set; }
    public int UserId { get; set; }  // 外键（也是主键）
    public User User { get; set; }
}

// Fluent API 配置
modelBuilder.Entity<User>()
    .HasOne(u => u.Profile)
    .WithOne(p => p.User)
    .HasForeignKey<UserProfile>(p => p.UserId);
```

### 4.3 多对多关系

多对多关系表示一个实体可以与多个其他实体相关联，反之亦然。

#### EF Core 5.0+ 简化多对多配置

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Course> Courses { get; set; } = new List<Course>();
}

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public List<Student> Students { get; set; } = new List<Student>();
}

// EF Core 5.0+ 自动创建连接表
// 如需自定义连接表，仍需使用 UsingEntity
modelBuilder.Entity<Student>()
    .HasMany(s => s.Courses)
    .WithMany(c => c.Students)
    .UsingEntity(j => j.ToTable("StudentCourses"));  // 自定义连接表名
```

#### 使用显式连接实体

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<StudentCourse> StudentCourses { get; set; } = new List<StudentCourse>();
}

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public List<StudentCourse> StudentCourses { get; set; } = new List<StudentCourse>();
}

// 连接实体
public class StudentCourse
{
    public int StudentId { get; set; }
    public Student Student { get; set; }
    
    public int CourseId { get; set; }
    public Course Course { get; set; }
    
    // 可以添加额外的属性
    public DateTime EnrollmentDate { get; set; }
}

// Fluent API 配置
modelBuilder.Entity<StudentCourse>()
    .HasKey(sc => new { sc.StudentId, sc.CourseId });

modelBuilder.Entity<StudentCourse>()
    .HasOne(sc => sc.Student)
    .WithMany(s => s.StudentCourses)
    .HasForeignKey(sc => sc.StudentId);

modelBuilder.Entity<StudentCourse>()
    .HasOne(sc => sc.Course)
    .WithMany(c => c.StudentCourses)
    .HasForeignKey(sc => sc.CourseId);
```

## 5. 高级映射配置

### 5.1 阴影属性

阴影属性是在实体类中未定义但在 EF Core 模型中存在的属性。

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 配置阴影属性
    modelBuilder.Entity<Blog>()
        .Property<DateTime>("LastUpdated");
    
    // 设置阴影属性的值
    modelBuilder.Entity<Blog>()
        .Property<DateTime>("CreatedAt")
        .HasDefaultValueSql("GETDATE()");
}

// 在代码中访问阴影属性
context.Entry(blog).Property("LastUpdated").CurrentValue = DateTime.Now;
```

### 5.2 备用键

备用键是唯一标识符，但不是主键，通常用于关系映射。

```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }  // 将用作备用键
    public string Email { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }
    public string Username { get; set; }  // 外键引用备用键
    public User User { get; set; }
}

// Fluent API 配置
modelBuilder.Entity<User>()
    .HasAlternateKey(u => u.Username);

modelBuilder.Entity<UserProfile>()
    .HasOne(up => up.User)
    .WithOne()
    .HasForeignKey<UserProfile>(up => up.Username);
```

### 5.3 索引

索引可以提高查询性能，特别是对经常用于筛选、排序或连接的列。

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 单列索引
    modelBuilder.Entity<Product>()
        .HasIndex(p => p.Name);
    
    // 唯一索引
    modelBuilder.Entity<Product>()
        .HasIndex(p => p.Code)
        .IsUnique();
    
    // 复合索引
    modelBuilder.Entity<Order>()
        .HasIndex(o => new { o.CustomerId, o.OrderDate });
    
    // 带过滤器的索引（SQL Server）
    modelBuilder.Entity<Product>()
        .HasIndex(p => p.Name)
        .HasFilter("[IsDeleted] = 0");
}
```

### 5.4 复杂类型

复杂类型（Owned Entity Types）用于表示不可独立存在的实体部分。

```csharp
public class ContactInfo
{
    public string Email { get; set; }
    public string Phone { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }
}

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ContactInfo ContactInfo { get; set; }
}

// Fluent API 配置
modelBuilder.Entity<Customer>()
    .OwnsOne(c => c.ContactInfo, ownedNavigationBuilder =>
    {
        ownedNavigationBuilder.OwnsOne(ci => ci.Address);
        
        // 自定义列名
        ownedNavigationBuilder.Property(ci => ci.Email).HasColumnName("EmailAddress");
    });
```

## 6. 继承映射策略

### 6.1 每种类型一个表（TPT）

为基类和每个派生类创建单独的表。

```csharp
public abstract class Person
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class Employee : Person
{
    public string EmployeeId { get; set; }
    public decimal Salary { get; set; }
}

public class Customer : Person
{
    public string CustomerNumber { get; set; }
    public DateTime RegistrationDate { get; set; }
}

// Fluent API 配置（EF Core 5.0+ 支持 TPT）
modelBuilder.Entity<Person>().ToTable("Persons");
modelBuilder.Entity<Employee>().ToTable("Employees");
modelBuilder.Entity<Customer>().ToTable("Customers");
```

### 6.2 每种具体类型一个表（TPC）

只为每个具体的派生类创建表，不创建基类表。

```csharp
// EF Core 7.0+ 支持 TPC
modelBuilder.Entity<Person>()
    .UseTpcMappingStrategy();

modelBuilder.Entity<Employee>().ToTable("Employees");
modelBuilder.Entity<Customer>().ToTable("Customers");
```

### 6.3 单表继承（TPH）

将整个继承层次结构映射到单个表（EF Core 默认策略）。

```csharp
// 默认就是 TPH，无需特殊配置
// 但可以自定义鉴别器列
modelBuilder.Entity<Person>()
    .HasDiscriminator<string>("PersonType")
    .HasValue<Employee>("Employee")
    .HasValue<Customer>("Customer");
```

## 7. 模型配置组织

对于大型项目，推荐使用以下方式组织模型配置：

### 7.1 使用 IEntityTypeConfiguration

```csharp
// 创建配置类
public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Title).IsRequired().HasMaxLength(200);
        builder.Property(b => b.ISBN).IsRequired().HasMaxLength(20);
        // 其他配置...
    }
}

// 在 OnModelCreating 中应用
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 应用单个配置
    modelBuilder.ApplyConfiguration(new BookConfiguration());
    
    // 应用指定程序集中的所有配置
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
}
```

### 7.2 使用扩展方法

```csharp
public static class ModelBuilderExtensions
{
    public static void ConfigureBook(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(b => b.Id);
            entity.Property(b => b.Title).IsRequired().HasMaxLength(200);
            // 其他配置...
        });
    }
}

// 在 OnModelCreating 中使用
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.ConfigureBook();
    // 其他配置...
}
```

## 8. 模型验证与诊断

### 8.1 验证模型配置

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // 配置...
    
    // 构建模型
    var model = modelBuilder.Model;
    
    // 可以在这里添加自定义验证逻辑
    foreach (var entityType in model.GetEntityTypes())
    {
        // 检查实体配置
        Console.WriteLine($"实体: {entityType.Name}");
        foreach (var property in entityType.GetProperties())
        {
            Console.WriteLine($"  属性: {property.Name}, 类型: {property.ClrType.Name}");
        }
    }
}
```

### 8.2 使用 EF Core 工具检查模型

```bash
# 列出所有实体和它们的配置
dotnet ef dbcontext info

# 生成 SQL 脚本（但不执行）
dotnet ef migrations script --idempotent
```

## 9. 最佳实践

1. **选择配置方式**：
   - 简单配置：使用数据注解
   - 复杂配置或需要集中管理：使用 Fluent API
   - 大型项目：使用 `IEntityTypeConfiguration` 接口

2. **关系配置**：
   - 总是显式配置关系，不要依赖隐式约定
   - 明确设置级联删除行为

3. **性能考虑**：
   - 为常用查询字段添加索引
   - 避免在实体类中使用复杂的计算属性
   - 合理使用阴影属性存储元数据

4. **模型组织**：
   - 将相关实体放在同一命名空间
   - 使用配置类分离关注点
   - 定期审查和优化模型

## 10. 小结

本章节详细介绍了 EF Core 中的模型定义与映射技术，包括：

- 实体类的基础创建和默认约定
- 使用数据注解进行配置
- 使用 Fluent API 进行高级配置
- 各种关系类型（一对一、一对多、多对多）的映射
- 高级特性如阴影属性、备用键、索引和复杂类型
- 不同的继承映射策略
- 模型配置的组织方法和最佳实践

通过掌握这些技术，你可以灵活地设计和配置适合应用需求的数据模型，为后续的数据操作打下坚实基础。