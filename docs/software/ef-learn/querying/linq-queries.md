# EF Core 查询操作与 LINQ

## 1. 基本查询操作

EF Core 使用 LINQ（Language Integrated Query）进行数据查询，这使得我们可以使用 C# 语法来查询数据库。

### 1.1 查询所有数据

```csharp
// 查询所有实体
var allProducts = context.Products.ToList();

// 查询并流式处理（适用于大量数据）
foreach (var product in context.Products)
{
    // 处理每个产品
}

// 获取单个实体（返回第一个匹配项，如果没有则返回 null）
var firstProduct = context.Products.FirstOrDefault();

// 获取单个实体（返回第一个匹配项，如果没有则抛出异常）
var firstProductOrThrow = context.Products.First();
```

### 1.2 延迟加载与即时执行

EF Core 查询具有**延迟执行**特性，这意味着查询在实际迭代结果或调用某些方法时才会执行。

```csharp
// 定义查询但不执行
var query = context.Products.Where(p => p.Price > 100);

// 执行查询并获取结果
var expensiveProducts = query.ToList();  // 执行查询

// 触发执行的方法
ToList()      // 执行并返回列表
ToArray()     // 执行并返回数组
ToDictionary() // 执行并返回字典
ToListAsync() // 异步执行并返回列表
Count()       // 执行并返回元素数量
Any()         // 执行并检查是否存在元素
First()       // 执行并返回第一个元素
Single()      // 执行并返回唯一的元素
```

## 2. 过滤数据

### 2.1 使用 Where 子句

```csharp
// 基本过滤
var expensiveProducts = context.Products
    .Where(p => p.Price > 100)
    .ToList();

// 复合条件
var specificProducts = context.Products
    .Where(p => p.Price > 100 && p.CategoryId == 1)
    .ToList();

// 使用方法组
var activeCustomers = context.Customers
    .Where(CustomerIsActive)
    .ToList();

// 方法定义
private bool CustomerIsActive(Customer c)
{
    return c.IsActive && c.LastLoginDate > DateTime.Now.AddMonths(-3);
}
```

### 2.2 复杂过滤条件

```csharp
// 包含在集合中
var selectedCategories = new[] { 1, 2, 5 };
var productsInCategories = context.Products
    .Where(p => selectedCategories.Contains(p.CategoryId))
    .ToList();

// 字符串操作
var productsWithSpecificName = context.Products
    .Where(p => p.Name.Contains("Premium"))  // 包含
    .ToList();

var productsWithExactName = context.Products
    .Where(p => p.Name == "Premium Product")  // 精确匹配
    .ToList();

var productsWithNameStartingWith = context.Products
    .Where(p => p.Name.StartsWith("Pro"))  // 以...开头
    .ToList();

// 日期比较
var recentOrders = context.Orders
    .Where(o => o.OrderDate >= DateTime.Now.AddDays(-30))
    .ToList();
```

## 3. 排序数据

### 3.1 基本排序

```csharp
// 升序排序
var productsByPrice = context.Products
    .OrderBy(p => p.Price)
    .ToList();

// 降序排序
var productsByPriceDesc = context.Products
    .OrderByDescending(p => p.Price)
    .ToList();

// 多级排序
var sortedProducts = context.Products
    .OrderBy(p => p.CategoryId)
    .ThenByDescending(p => p.Price)
    .ToList();
```

### 3.2 条件排序

```csharp
// 动态排序
string sortBy = "Price";
IQueryable<Product> query = context.Products;

if (sortBy == "Price")
    query = query.OrderBy(p => p.Price);
else if (sortBy == "Name")
    query = query.OrderBy(p => p.Name);
else
    query = query.OrderBy(p => p.Id);

var sortedProducts = query.ToList();
```

## 4. 限制和跳过

### 4.1 分页

```csharp
int pageNumber = 1;
int pageSize = 10;

var pagedProducts = context.Products
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToList();

// 计算总页数
int totalProducts = context.Products.Count();
int totalPages = (int)Math.Ceiling((double)totalProducts / pageSize);
```

### 4.2 获取前 N 个结果

```csharp
// 获取前 10 个最昂贵的产品
var topExpensiveProducts = context.Products
    .OrderByDescending(p => p.Price)
    .Take(10)
    .ToList();
```

## 5. 聚合查询

### 5.1 基本聚合函数

```csharp
// 计数
int totalProducts = context.Products.Count();
int expensiveProductCount = context.Products.Count(p => p.Price > 100);

// 求和
decimal totalValue = context.Products.Sum(p => p.Price);

// 平均值
decimal avgPrice = context.Products.Average(p => p.Price);

// 最大值和最小值
decimal maxPrice = context.Products.Max(p => p.Price);
decimal minPrice = context.Products.Min(p => p.Price);
```

### 5.2 分组和聚合

```csharp
// 按类别分组并计算每个类别的产品数量
var productsByCategory = context.Products
    .GroupBy(p => p.CategoryId)
    .Select(g => new
    {
        CategoryId = g.Key,
        ProductCount = g.Count(),
        AveragePrice = g.Average(p => p.Price),
        TotalValue = g.Sum(p => p.Price)
    })
    .ToList();

// 按多个属性分组
var productsByCategoryAndStatus = context.Products
    .GroupBy(p => new { p.CategoryId, p.IsActive })
    .Select(g => new
    {
        CategoryId = g.Key.CategoryId,
        IsActive = g.Key.IsActive,
        ProductCount = g.Count()
    })
    .ToList();
```

## 6. 连接查询

### 6.1 内连接（Inner Join）

```csharp
// 使用 Join 方法
var productWithCategories = context.Products
    .Join(
        context.Categories,
        product => product.CategoryId,
        category => category.Id,
        (product, category) => new
        {
            ProductName = product.Name,
            CategoryName = category.Name,
            Price = product.Price
        }
    )
    .ToList();

// 使用导航属性（推荐）
var productWithCategoriesViaNav = context.Products
    .Include(p => p.Category)
    .Select(p => new
    {
        ProductName = p.Name,
        CategoryName = p.Category.Name,
        Price = p.Price
    })
    .ToList();
```

### 6.2 左连接（Left Join）

```csharp
// 使用 GroupJoin 和 SelectMany
var allCategoriesWithProducts = context.Categories
    .GroupJoin(
        context.Products,
        category => category.Id,
        product => product.CategoryId,
        (category, products) => new
        {
            CategoryName = category.Name,
            Products = products.DefaultIfEmpty()
        }
    )
    .SelectMany(
        x => x.Products,
        (category, product) => new
        {
            CategoryName = category.CategoryName,
            ProductName = product?.Name ?? "No Products",
            Price = product?.Price ?? 0
        }
    )
    .ToList();

// 使用导航属性（更简单）
var categoriesWithProducts = context.Categories
    .Include(c => c.Products)
    .ToList();
```

### 6.3 多表连接

```csharp
// 三表连接
var orderDetails = context.Orders
    .Join(
        context.OrderItems,
        order => order.Id,
        item => item.OrderId,
        (order, item) => new { order, item }
    )
    .Join(
        context.Products,
        oi => oi.item.ProductId,
        product => product.Id,
        (oi, product) => new
        {
            OrderId = oi.order.Id,
            CustomerId = oi.order.CustomerId,
            ProductName = product.Name,
            Quantity = oi.item.Quantity,
            Price = product.Price
        }
    )
    .ToList();
```

## 7. 投影查询

### 7.1 基本投影

```csharp
// 投影到匿名类型
var productSummaries = context.Products
    .Select(p => new
    {
        Name = p.Name,
        Price = p.Price,
        CategoryName = p.Category.Name
    })
    .ToList();

// 投影到具体类型
var productDTOs = context.Products
    .Select(p => new ProductDTO
    {
        Id = p.Id,
        Name = p.Name,
        Price = p.Price,
        CategoryName = p.Category.Name
    })
    .ToList();

// 定义 DTO 类
public class ProductDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string CategoryName { get; set; }
}
```

### 7.2 嵌套投影

```csharp
// 投影包含嵌套集合
var categoriesWithProductSummaries = context.Categories
    .Select(c => new
    {
        CategoryName = c.Name,
        Products = c.Products.Select(p => new
        {
            ProductName = p.Name,
            Price = p.Price
        }).ToList()
    })
    .ToList();
```

## 8. 跟踪与非跟踪查询

### 8.1 跟踪查询

默认情况下，EF Core 会跟踪查询返回的实体，以便检测和保存更改。

```csharp
// 默认是跟踪查询
var product = context.Products.First();
product.Price = 150;  // EF Core 会检测到此更改
context.SaveChanges();  // 会更新数据库
```

### 8.2 非跟踪查询

对于只读操作，使用非跟踪查询可以提高性能。

```csharp
// 使用 AsNoTracking
var products = context.Products.AsNoTracking().ToList();

// 使用 AsNoTrackingWithIdentityResolution（EF Core 5.0+）
// 适用于有重复实体的查询
var productsWithDuplicates = context.Products
    .AsNoTrackingWithIdentityResolution()
    .ToList();

// 全局配置非跟踪
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer("connection-string");
    optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
}
```

## 9. 加载相关数据

### 9.1 贪婪加载（Eager Loading）

使用 `Include` 和 `ThenInclude` 立即加载相关实体。

```csharp
// 加载单个导航属性
var productsWithCategories = context.Products
    .Include(p => p.Category)
    .ToList();

// 加载多级导航属性
var ordersWithItemsAndProducts = context.Orders
    .Include(o => o.OrderItems)
        .ThenInclude(oi => oi.Product)
            .ThenInclude(p => p.Category)
    .ToList();

// 加载多个导航属性
var customersWithOrdersAndProfiles = context.Customers
    .Include(c => c.Orders)
    .Include(c => c.Profile)
    .ToList();
```

### 9.2 懒加载（Lazy Loading）

配置懒加载后，EF Core 会在首次访问导航属性时自动加载相关数据。

```csharp
// 1. 安装必要的包
// dotnet add package Microsoft.EntityFrameworkCore.Proxies

// 2. 配置懒加载代理
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer("connection-string");
    optionsBuilder.UseLazyLoadingProxies();
}

// 3. 确保导航属性是虚的（virtual）
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public virtual Category Category { get; set; }  // 虚属性
}

// 4. 使用
var product = context.Products.First();
// 在访问时自动加载
var categoryName = product.Category.Name;  // 这里会触发额外的数据库查询
```

### 9.3 显式加载（Explicit Loading）

手动控制何时加载相关数据。

```csharp
// 加载单个实体的导航属性
var order = context.Orders.First();
context.Entry(order).Collection(o => o.OrderItems).Load();

// 加载单个导航属性
var product = context.Products.First();
context.Entry(product).Reference(p => p.Category).Load();

// 条件加载
var customer = context.Customers.First();
context.Entry(customer)
    .Collection(c => c.Orders)
    .Query()
    .Where(o => o.OrderDate > DateTime.Now.AddMonths(-6))
    .Load();
```

## 10. 原始 SQL 查询

对于复杂查询，可以使用原始 SQL。

### 10.1 执行原始 SQL 查询

```csharp
// 返回实体的 SQL 查询
var products = context.Products
    .FromSqlRaw("SELECT * FROM Products WHERE Price > {0}", 100)
    .ToList();

// 参数化查询（更安全）
var minPrice = 100;
var products = context.Products
    .FromSqlInterpolated($"SELECT * FROM Products WHERE Price > {minPrice}")
    .ToList();

// 组合 LINQ 和原始 SQL
var expensiveProducts = context.Products
    .FromSqlRaw("SELECT * FROM Products")
    .Where(p => p.Price > 100)
    .OrderBy(p => p.Name)
    .ToList();
```

### 10.2 执行非查询 SQL

```csharp
// 执行更新操作
int rowsAffected = context.Database.ExecuteSqlRaw(
    "UPDATE Products SET Price = Price * 1.1 WHERE CategoryId = {0}", 1);

// 执行删除操作
int rowsDeleted = context.Database.ExecuteSqlInterpolated(
    $"DELETE FROM Products WHERE IsActive = 0 AND LastUpdated < {DateTime.Now.AddYears(-1)}");
```

## 11. 查询编译与性能

### 11.1 编译查询

对于频繁执行的查询，可以使用编译查询提高性能。

```csharp
// 创建编译查询
private static readonly Func<ApplicationDbContext, int, Product> GetProductById =
    EF.CompileQuery((ApplicationDbContext context, int id) =>
        context.Products.FirstOrDefault(p => p.Id == id));

// 使用编译查询
using var context = new ApplicationDbContext();
var product = GetProductById(context, 1);
```

### 11.2 查询执行计划缓存

EF Core 会自动缓存查询执行计划，但有一些注意事项：

```csharp
// 使用常量参数（会缓存）
var products1 = context.Products.Where(p => p.CategoryId == 1).ToList();

// 使用变量参数（会缓存，但每次使用不同参数时需要重新绑定）
int categoryId = 1;
var products2 = context.Products.Where(p => p.CategoryId == categoryId).ToList();

// 使用动态表达式（可能不会被有效缓存）
Expression<Func<Product, bool>> predicate = p => p.Price > 100;
if (someCondition)
    predicate = p => p.Name.Contains("Premium");
var products3 = context.Products.Where(predicate).ToList();
```

## 12. 高级查询技巧

### 12.1 使用 Any 和 All

```csharp
// 检查是否存在满足条件的元素
bool hasExpensiveProducts = context.Products.Any(p => p.Price > 1000);

// 检查所有元素是否满足条件
bool allProductsActive = context.Products.All(p => p.IsActive);

// 相关实体的 Any
var categoriesWithActiveProducts = context.Categories
    .Where(c => c.Products.Any(p => p.IsActive))
    .ToList();
```

### 12.2 使用 Contains

```csharp
// 单值 Contains
var categoryIds = new[] { 1, 2, 5 };
var productsInCategories = context.Products
    .Where(p => categoryIds.Contains(p.CategoryId))
    .ToList();

// 字符串 Contains
var productsWithSpecificName = context.Products
    .Where(p => p.Name.Contains("Premium"))
    .ToList();
```

### 12.3 使用 DateTime 函数

```csharp
// 日期部分查询
var ordersThisMonth = context.Orders
    .Where(o => o.OrderDate.Month == DateTime.Now.Month &&
                o.OrderDate.Year == DateTime.Now.Year)
    .ToList();

// 日期范围查询
var recentOrders = context.Orders
    .Where(o => o.OrderDate >= DateTime.Now.AddDays(-30))
    .ToList();
```

### 12.4 分组后的过滤（Having 子句）

```csharp
// 查找产品数量大于 10 的类别
var largeCategories = context.Products
    .GroupBy(p => p.CategoryId)
    .Where(g => g.Count() > 10)
    .Select(g => new
    {
        CategoryId = g.Key,
        ProductCount = g.Count()
    })
    .ToList();
```

## 13. 查询性能优化

### 13.1 避免 N+1 查询问题

N+1 查询问题是指加载 N 个实体时，额外执行 N 个查询来加载相关实体。

```csharp
// ❌ 有 N+1 问题
var customers = context.Customers.ToList();
foreach (var customer in customers)
{
    // 每个客户都会执行一个新的查询
    var orderCount = customer.Orders.Count;
}

// ✅ 使用贪婪加载避免 N+1
var customersWithOrders = context.Customers
    .Include(c => c.Orders)
    .ToList();

// ✅ 使用投影避免 N+1
var customerOrderCounts = context.Customers
    .Select(c => new
    {
        CustomerId = c.Id,
        Name = c.Name,
        OrderCount = c.Orders.Count
    })
    .ToList();
```

### 13.2 只查询需要的数据

```csharp
// ❌ 查询所有字段
var products = context.Products.ToList();

// ✅ 只查询需要的字段
var productSummaries = context.Products
    .Select(p => new { p.Id, p.Name, p.Price })
    .ToList();
```

### 13.3 合理使用索引

```csharp
// 在频繁查询的字段上添加索引
// 在 OnModelCreating 中配置
modelBuilder.Entity<Product>()
    .HasIndex(p => p.Name);

modelBuilder.Entity<Order>()
    .HasIndex(o => o.CustomerId);
```

### 13.4 分页查询

```csharp
// 不要一次性加载大量数据
var pagedProducts = context.Products
    .Skip(100)
    .Take(50)
    .ToList();
```

## 14. 查询调试

### 14.1 查看生成的 SQL

```csharp
// 方法 1：使用日志
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer("connection-string");
    optionsBuilder.LogTo(Console.WriteLine);
}

// 方法 2：使用 ToQueryString()（EF Core 5.0+）
var query = context.Products.Where(p => p.Price > 100);
string sql = query.ToQueryString();
Console.WriteLine(sql);
```

### 14.2 分析查询性能

```csharp
// 测量查询执行时间
var stopwatch = new Stopwatch();
stopwatch.Start();

var result = context.Products
    .Include(p => p.Category)
    .Where(p => p.Price > 100)
    .ToList();

stopwatch.Stop();
Console.WriteLine($"查询耗时: {stopwatch.ElapsedMilliseconds}ms");
```

## 15. 小结

本章节详细介绍了 EF Core 中的查询操作，包括：

- 基本查询操作和延迟执行特性
- 过滤、排序、分页和限制结果集
- 聚合和分组查询
- 各种类型的连接查询（内连接、左连接等）
- 投影查询（匿名类型和具体类型）
- 跟踪与非跟踪查询的区别和使用场景
- 三种加载相关数据的方式：贪婪加载、懒加载和显式加载
- 原始 SQL 查询的使用方法
- 查询编译和性能优化技巧
- 高级查询技术和常见问题的解决方案

通过合理使用这些查询技术，可以构建高效、灵活的数据访问层，满足各种复杂的数据查询需求。