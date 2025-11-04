# EF Core 高级特性与性能优化

## 1. 索引

### 1.1 索引的基础

索引是提高数据库查询性能的关键。EF Core 允许你在实体类上定义各种类型的索引。

```csharp
// 使用数据注解定义索引
public class Product
{
    public int Id { get; set; }
    
    [Index(nameof(Name))]  // 在 Name 属性上创建索引
    public string Name { get; set; }
    
    [Index(nameof(CategoryId), nameof(Price))]  // 复合索引
    public int CategoryId { get; set; }
    public decimal Price { get; set; }
}

// 使用 Fluent API 定义索引
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>()
        .HasIndex(p => p.Name)  // 单列索引
        .HasDatabaseName("IX_Products_Name")  // 设置索引名称
        .IsUnique();  // 唯一索引
    
    modelBuilder.Entity<Product>()
        .HasIndex(p => new { p.CategoryId, p.Price })  // 复合索引
        .HasFilter($"[{nameof(Product.IsActive)}] = 1");  // 筛选索引
}
```

### 1.2 高级索引配置

```csharp
// 唯一索引
modelBuilder.Entity<Product>()
    .HasIndex(p => p.SerialNumber)
    .IsUnique();

// 包含列的索引（EF Core 5.0+）
modelBuilder.Entity<Product>()
    .HasIndex(p => p.CategoryId)
    .IncludeProperties(p => new { p.Name, p.Price });  // 包含其他列以支持覆盖查询

// 筛选索引
modelBuilder.Entity<Product>()
    .HasIndex(p => p.Price)
    .HasFilter($"[{nameof(Product.IsActive)}] = 1 AND [{nameof(Product.Price)}] > 100");

// 索引排序方向（EF Core 5.0+）
modelBuilder.Entity<Order>()
    .HasIndex(o => new { o.CustomerId, o.OrderDate })
    .IsDescending(false, true);  // CustomerId 升序，OrderDate 降序

// 最大长度索引（适用于字符串列）
modelBuilder.Entity<Product>()
    .HasIndex(p => p.Name)
    .HasDatabaseName("IX_Products_Name")
    .HasMaxLength(100);
```

## 2. 查询优化

### 2.1 使用 IQueryable 延迟执行

```csharp
// 延迟执行查询直到调用 ToListAsync、FirstAsync 等
var query = context.Products.Where(p => p.Price > 100);

// 添加更多条件
query = query.Where(p => p.IsActive);

// 排序
query = query.OrderByDescending(p => p.CreatedAt);

// 现在执行查询
var products = await query.ToListAsync();
```

### 2.2 非跟踪查询

对于只读操作，使用非跟踪查询可以显著提高性能。

```csharp
// 使用 AsNoTracking
var products = await context.Products
    .AsNoTracking()
    .Where(p => p.Price > 100)
    .ToListAsync();

// 全局禁用跟踪（不推荐，除非所有操作都是只读的）
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer("connection string")
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
}

// 条件性使用跟踪或非跟踪
var query = context.Products.AsQueryable();

if (isReadOnly)
    query = query.AsNoTracking();

var result = await query.ToListAsync();
```

### 2.3 选择投影

只检索需要的数据，避免加载不必要的列。

```csharp
// 使用匿名类型
var productSummaries = await context.Products
    .Where(p => p.CategoryId == 1)
    .Select(p => new
    {
        p.Id,
        p.Name,
        p.Price
    })
    .ToListAsync();

// 使用 DTO（数据传输对象）
var productDTOs = await context.Products
    .Where(p => p.CategoryId == 1)
    .Select(p => new ProductDTO
    {
        Id = p.Id,
        Name = p.Name,
        Price = p.Price,
        CategoryName = p.Category.Name  // 包含导航属性的特定列
    })
    .ToListAsync();
```

### 2.4 分页查询

对于大型数据集，始终使用分页。

```csharp
int pageNumber = 1;
int pageSize = 20;

var pagedProducts = await context.Products
    .OrderBy(p => p.Name)
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();

// 计算总数
int totalCount = await context.Products.CountAsync();
int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
```

### 2.5 避免 N+1 查询问题

N+1 查询问题指的是在加载包含导航属性的实体时，EF Core 先执行一个查询获取主实体（1次），然后为每个主实体单独执行查询获取关联实体（N次）。

```csharp
// 问题代码：会导致 N+1 查询
var orders = await context.Orders.ToListAsync();
foreach (var order in orders)
{
    // 每个 order 都会触发单独的查询
    var customer = await context.Entry(order).Reference(o => o.Customer).LoadAsync();
}

// 解决方案1：使用 Include 预先加载
var ordersWithCustomers = await context.Orders
    .Include(o => o.Customer)
    .ToListAsync();

// 解决方案2：使用 ThenInclude 加载多级导航属性
var ordersDetails = await context.Orders
    .Include(o => o.Customer)
    .Include(o => o.OrderItems)
        .ThenInclude(oi => oi.Product)
    .ToListAsync();

// 解决方案3：使用 Select 投影（更灵活）
var orderDTOs = await context.Orders
    .Select(o => new OrderDTO
    {
        OrderId = o.Id,
        OrderDate = o.OrderDate,
        CustomerName = o.Customer.Name,
        Items = o.OrderItems.Select(oi => new OrderItemDTO
        {
            ProductName = oi.Product.Name,
            Quantity = oi.Quantity,
            Price = oi.Price
        }).ToList()
    })
    .ToListAsync();
```

## 3. 变更跟踪优化

### 3.1 禁用和启用变更跟踪

```csharp
// 临时禁用自动检测更改
context.ChangeTracker.AutoDetectChangesEnabled = false;
try
{
    // 批量操作
    for (int i = 0; i < 1000; i++)
    {
        context.Products.Add(new Product { Name = $"产品{i}", Price = i * 10m });
    }
    
    // 手动触发变更检测
    context.ChangeTracker.DetectChanges();
    await context.SaveChangesAsync();
}
finally
{
    // 确保恢复自动检测
    context.ChangeTracker.AutoDetectChangesEnabled = true;
}
```

### 3.2 清除跟踪实体

```csharp
// 清除所有跟踪的实体
context.ChangeTracker.Clear();

// 清除特定类型的实体
context.Products.Local.Clear();

// 批量操作中定期清除以减少内存使用
for (int i = 0; i < 10000; i += 1000)
{
    var batch = products.Skip(i).Take(1000);
    context.Products.AddRange(batch);
    await context.SaveChangesAsync();
    context.ChangeTracker.Clear();  // 清除跟踪以释放内存
}
```

### 3.3 只跟踪必要的属性

```csharp
// 只跟踪特定属性
var product = context.Products.First();
context.Entry(product).State = EntityState.Unchanged;
context.Entry(product).Property(p => p.Name).IsModified = true;
```

## 4. 缓存

### 4.1 内存缓存

EF Core 提供了内存缓存选项来存储频繁查询的结果。

```csharp
// 在 Startup.cs 中配置内存缓存
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options => 
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
    
    services.AddMemoryCache();
    services.AddScoped<IProductService, ProductService>();
}

// 在服务中使用缓存
public class ProductService : IProductService
{
    private readonly ApplicationDbContext _context;
    private readonly IMemoryCache _cache;
    private const string ProductsCacheKey = "products_list";
    private const int CacheDuration = 60;  // 缓存60秒
    
    public ProductService(ApplicationDbContext context, IMemoryCache cache)
    {
        _context = context;
        _cache = cache;
    }
    
    public async Task<List<Product>> GetProductsAsync()
    {
        // 尝试从缓存获取
        if (_cache.TryGetValue(ProductsCacheKey, out List<Product> products))
        {
            return products;
        }
        
        // 缓存未命中，查询数据库
        products = await _context.Products.AsNoTracking().ToListAsync();
        
        // 设置缓存
        _cache.Set(ProductsCacheKey, products, TimeSpan.FromSeconds(CacheDuration));
        
        return products;
    }
    
    // 数据更改时清除缓存
    public async Task<Product> AddProductAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        
        // 清除缓存
        _cache.Remove(ProductsCacheKey);
        
        return product;
    }
}
```

### 4.2 查询标记

EF Core 2.0+ 支持查询标记，可以将查询缓存起来。

```csharp
// 使用查询标记
var products = await context.Products
    .TagWith("获取活跃产品")  // 添加标记，对缓存和日志有用
    .Where(p => p.IsActive)
    .ToListAsync();
```

## 5. 视图映射

### 5.1 将实体映射到数据库视图

```csharp
// 定义视图实体
public class ProductSummary
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string CategoryName { get; set; }
    public decimal AveragePrice { get; set; }
    public int OrderCount { get; set; }
}

// 在 DbContext 中添加 DbSet
public DbSet<ProductSummary> ProductSummaries { get; set; }

// 在 OnModelCreating 中将实体映射到视图
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<ProductSummary>(entity =>
    {
        entity.HasNoKey();  // 视图没有主键
        entity.ToView("ProductSummariesView");  // 指定视图名称
    });
}

// 查询视图
var productSummaries = await context.ProductSummaries
    .Where(ps => ps.OrderCount > 10)
    .OrderByDescending(ps => ps.AveragePrice)
    .ToListAsync();
```

### 5.2 创建数据库视图

通常，你需要在数据库迁移中创建视图。

```csharp
// 在迁移文件中创建视图
protected override void Up(MigrationBuilder migrationBuilder)
{
    // 创建视图
    migrationBuilder.Sql(@"
        CREATE VIEW ProductSummariesView AS
        SELECT 
            p.Id AS ProductId,
            p.Name AS ProductName,
            c.Name AS CategoryName,
            p.Price AS AveragePrice,
            COUNT(oi.OrderId) AS OrderCount
        FROM 
            Products p
            JOIN Categories c ON p.CategoryId = c.Id
            LEFT JOIN OrderItems oi ON p.Id = oi.ProductId
        GROUP BY
            p.Id, p.Name, c.Name, p.Price
    ");
}

protected override void Down(MigrationBuilder migrationBuilder)
{
    // 删除视图
    migrationBuilder.Sql("DROP VIEW ProductSummariesView");
}
```

## 6. 存储过程

### 6.1 调用存储过程

```csharp
// 调用返回实体的存储过程
var products = await context.Products
    .FromSqlRaw("EXEC GetProductsByCategory @CategoryId = {0}", 1)
    .ToListAsync();

// 调用不返回实体的存储过程
await context.Database.ExecuteSqlRawAsync(
    "EXEC UpdateProductPrices @Percentage = {0}, @CategoryId = {1}", 
    10,  // 10% 涨价
    1    // 类别ID
);

// 使用参数化查询（更安全）
var categoryIdParam = new SqlParameter("CategoryId", 1);
var priceParam = new SqlParameter("MinPrice", 100);

var products = await context.Products
    .FromSqlRaw("EXEC GetProductsByCategoryAndPrice @CategoryId, @MinPrice", 
        categoryIdParam, priceParam)
    .ToListAsync();

// 使用 DbSet.FromSqlInterpolated（简化语法）
int categoryId = 1;
decimal minPrice = 100;

var products = await context.Products
    .FromSqlInterpolated($"EXEC GetProductsByCategoryAndPrice {categoryId}, {minPrice}")
    .ToListAsync();
```

### 6.2 使用存储过程进行CRUD操作

```csharp
// 创建实体时使用存储过程
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>()
        .ToTable("Products")
        .HasKey(p => p.Id);
        
    // 使用存储过程进行插入
    modelBuilder.Entity<Product>()
        .HasDataAccessKind(DataAccessKind.ReadWrite)
        .ToFunction("InsertProduct");
}

// 或者使用原始SQL调用存储过程进行插入
var nameParam = new SqlParameter("@Name", "新产品");
var priceParam = new SqlParameter("@Price", 199.99);
var categoryIdParam = new SqlParameter("@CategoryId", 1);
var idParam = new SqlParameter("@Id", SqlDbType.Int) { Direction = ParameterDirection.Output };

await context.Database.ExecuteSqlRawAsync(
    "EXEC InsertProduct @Name, @Price, @CategoryId, @Id OUTPUT", 
    nameParam, priceParam, categoryIdParam, idParam);

int newProductId = (int)idParam.Value;
```

## 7. 表拆分和继承

### 7.1 表拆分

表拆分允许将一个实体类型映射到多个表。

```csharp
// 主实体
public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public int CustomerId { get; set; }
    public OrderDetails Details { get; set; }  // 关联到拆分的表
}

// 拆分实体
public class OrderDetails
{
    public int OrderId { get; set; }
    public string ShippingAddress { get; set; }
    public string BillingAddress { get; set; }
    public string TrackingNumber { get; set; }
    public Order Order { get; set; }  // 反向导航
}

// 配置表拆分
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Order>()
        .HasOne(o => o.Details)
        .WithOne(d => d.Order)
        .HasForeignKey<OrderDetails>(d => d.OrderId);
    
    // 将两个实体映射到不同的表
    modelBuilder.Entity<Order>().ToTable("Orders");
    modelBuilder.Entity<OrderDetails>().ToTable("OrderDetails");
}

// 使用表拆分查询
var orders = await context.Orders
    .Include(o => o.Details)
    .ToListAsync();
```

### 7.2 继承映射

EF Core 支持三种继承映射策略：TPH（每个层次结构一张表）、TPT（每个类型一张表）和 TPC（每个具体类型一张表）。

#### 7.2.1 TPH (Table Per Hierarchy)

所有继承层次结构中的类型都映射到单个表，使用鉴别器列来区分不同的类型。

```csharp
// 基类
public abstract class Payment
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public string PaymentStatus { get; set; }
}

// 派生类
public class CreditCardPayment : Payment
{
    public string CardNumber { get; set; }
    public string CardholderName { get; set; }
    public string ExpirationDate { get; set; }
}

public class PayPalPayment : Payment
{
    public string Email { get; set; }
    public string TransactionId { get; set; }
}

// 配置 TPH 继承（EF Core 默认）
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Payment>()
        .HasDiscriminator<string>("PaymentType")  // 指定鉴别器列
        .HasValue<CreditCardPayment>("CreditCard")  // 指定值
        .HasValue<PayPalPayment>("PayPal");
}

// 查询所有支付
var payments = await context.Payments.ToListAsync();

// 查询特定类型的支付
var creditCardPayments = await context.Payments
    .OfType<CreditCardPayment>()
    .Where(p => p.CardholderName.Contains("Smith"))
    .ToListAsync();
```

#### 7.2.2 TPT (Table Per Type)

每个类型映射到单独的表，基类表包含共享属性，派生类表包含特定属性和外键。

```csharp
// 配置 TPT 继承
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Payment>().ToTable("Payments");
    modelBuilder.Entity<CreditCardPayment>().ToTable("CreditCardPayments");
    modelBuilder.Entity<PayPalPayment>().ToTable("PayPalPayments");
}
```

## 8. 拦截器

### 8.1 查询拦截器

```csharp
// 创建拦截器类
public class LoggingInterceptor : DbCommandInterceptor
{
    private readonly ILogger<LoggingInterceptor> _logger;
    
    public LoggingInterceptor(ILogger<LoggingInterceptor> logger)
    {
        _logger = logger;
    }
    
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command, 
        CommandEventData eventData, 
        InterceptionResult<DbDataReader> result)
    {
        _logger.LogInformation("执行查询: {sql}", command.CommandText);
        return result;
    }
    
    public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(
        DbCommand command, 
        CommandEventData eventData, 
        InterceptionResult<DbDataReader> result, 
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("执行异步查询: {sql}", command.CommandText);
        return ValueTask.FromResult(result);
    }
    
    public override InterceptionResult<int> NonQueryExecuting(
        DbCommand command, 
        CommandEventData eventData, 
        InterceptionResult<int> result)
    {
        _logger.LogInformation("执行非查询命令: {sql}", command.CommandText);
        return result;
    }
}

// 在配置中注册拦截器
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer("connection string")
        .AddInterceptors(new LoggingInterceptor(new Logger<LoggingInterceptor>(new LoggerFactory())));
}

// 或者在 Startup.cs 中注册
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            .AddInterceptors(new LoggingInterceptor(new Logger<LoggingInterceptor>(new LoggerFactory()))));
}
```

### 8.2 事务拦截器

```csharp
public class TransactionInterceptor : DbTransactionInterceptor
{
    private readonly ILogger<TransactionInterceptor> _logger;
    
    public TransactionInterceptor(ILogger<TransactionInterceptor> logger)
    {
        _logger = logger;
    }
    
    public override void TransactionStarting(
        DbConnection connection, 
        TransactionEventData eventData, 
        TransactionStartingEventData interceptionData)
    {
        _logger.LogInformation("开始事务");
    }
    
    public override void TransactionCommitted(
        DbConnection connection, 
        TransactionEndEventData eventData)
    {
        _logger.LogInformation("事务提交成功");
    }
    
    public override void TransactionFailed(
        DbConnection connection, 
        TransactionErrorEventData eventData)
    {
        _logger.LogError(eventData.Exception, "事务失败");
    }
    
    public override void TransactionRolledBack(
        DbConnection connection, 
        TransactionEndEventData eventData)
    {
        _logger.LogInformation("事务回滚");
    }
}
```

## 9. 性能分析工具

### 9.1 使用 EF Core Profiler

EF Core Profiler 是一个商业工具，可以帮助你监控和优化 EF Core 的性能。

### 9.2 使用内置日志

```csharp
// 在配置中启用详细日志
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer("connection string")
        .LogTo(Console.WriteLine, LogLevel.Information)  // 输出到控制台
        .EnableSensitiveDataLogging();  // 启用敏感数据日志（开发环境）
}
```

### 9.3 使用 SQL Server Profiler

对于 SQL Server 数据库，可以使用 SQL Server Profiler 来监控生成的 SQL 查询。

### 9.4 使用 DbContext.Database.GenerateCreateScript()

```csharp
// 生成创建数据库的脚本
using var context = new ApplicationDbContext();
string script = context.Database.GenerateCreateScript();
Console.WriteLine(script);
```

## 10. 最佳实践

### 10.1 性能优化最佳实践

1. **使用异步操作**：优先使用 `Async` 方法，避免阻塞线程
2. **避免加载不必要的数据**：使用投影和 `Select` 只检索需要的列
3. **合理使用索引**：为频繁查询的列添加适当的索引
4. **优化查询**：避免 N+1 查询，使用 `Include` 和 `ThenInclude` 预先加载相关数据
5. **使用非跟踪查询**：对于只读操作，使用 `AsNoTracking`
6. **分页处理大数据集**：始终对大型结果集进行分页
7. **合理配置 DbContext**：避免在长生命周期内保持 DbContext 实例
8. **使用缓存**：缓存频繁访问且变化不频繁的数据
9. **优化批量操作**：对于大量数据操作，考虑使用 ExecuteUpdate/ExecuteDelete 或第三方库
10. **定期监控性能**：使用日志和分析工具监控查询性能

### 10.2 设计最佳实践

1. **合理设计模型**：遵循领域驱动设计原则，保持实体简洁
2. **使用适当的数据类型**：选择合适的数据类型以减少存储空间
3. **避免深层导航**：尽量避免复杂的多级导航属性
4. **考虑并发控制**：在多用户环境中实现适当的并发控制机制
5. **遵循命名约定**：使用一致的命名约定，便于理解和维护

## 11. 小结

本章详细介绍了 EF Core 的高级特性和性能优化技术，包括：

- **索引**：创建和配置各种类型的索引以提高查询性能
- **查询优化**：使用延迟执行、非跟踪查询、投影和分页等技术优化查询
- **变更跟踪优化**：通过禁用自动检测更改、清除跟踪实体等方式优化变更跟踪
- **缓存**：使用内存缓存和查询标记缓存查询结果
- **视图映射**：将实体映射到数据库视图
- **存储过程**：调用和使用存储过程
- **表拆分和继承**：实现表拆分和各种继承映射策略
- **拦截器**：创建和使用查询拦截器和事务拦截器
- **性能分析工具**：使用各种工具分析和监控性能
- **最佳实践**：遵循性能优化和设计最佳实践

通过掌握这些高级特性和优化技术，你可以构建高性能、可伸缩的应用程序，充分发挥 EF Core 的强大功能。