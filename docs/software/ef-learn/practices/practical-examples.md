# EF Core 实战示例与最佳实践

## 1. 架构设计模式

### 1.1 仓储模式

仓储模式是一种常见的数据访问层设计模式，可以提供更好的代码组织和可测试性。

```csharp
// 通用仓储接口
public interface IRepository<TEntity> where TEntity : class
{
    Task<TEntity> GetByIdAsync(int id);
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);
    Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
    Task AddAsync(TEntity entity);
    Task AddRangeAsync(IEnumerable<TEntity> entities);
    void Remove(TEntity entity);
    void RemoveRange(IEnumerable<TEntity> entities);
    Task<int> CountAsync();
    Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate);
    Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate);
    // 支持查询构建器模式
    IQueryable<TEntity> Query();
}

// 通用仓储实现
public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    protected readonly DbContext Context;
    protected readonly DbSet<TEntity> DbSet;

    public Repository(DbContext context)
    {
        Context = context;
        DbSet = context.Set<TEntity>();
    }

    public async Task<TEntity> GetByIdAsync(int id)
    {
        return await DbSet.FindAsync(id);
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await DbSet.ToListAsync();
    }

    public async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await DbSet.Where(predicate).ToListAsync();
    }

    public async Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await DbSet.SingleOrDefaultAsync(predicate);
    }

    public async Task AddAsync(TEntity entity)
    {
        await DbSet.AddAsync(entity);
    }

    public async Task AddRangeAsync(IEnumerable<TEntity> entities)
    {
        await DbSet.AddRangeAsync(entities);
    }

    public void Remove(TEntity entity)
    {
        DbSet.Remove(entity);
    }

    public void RemoveRange(IEnumerable<TEntity> entities)
    {
        DbSet.RemoveRange(entities);
    }

    public async Task<int> CountAsync()
    {
        return await DbSet.CountAsync();
    }

    public async Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await DbSet.CountAsync(predicate);
    }

    public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await DbSet.AnyAsync(predicate);
    }

    public IQueryable<TEntity> Query()
    {
        return DbSet.AsQueryable();
    }
}

// 特定实体的仓储接口（如果需要扩展通用接口）
public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId);
    Task<IEnumerable<Product>> GetTopSellingProductsAsync(int count);
    Task<IEnumerable<Product>> GetProductsWithLowStockAsync(int threshold);
}

// 特定实体的仓储实现
public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context) : base(context)
    {}

    public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId)
    {
        return await DbSet
            .Where(p => p.CategoryId == categoryId && p.IsActive)
            .Include(p => p.Category)
            .ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetTopSellingProductsAsync(int count)
    {
        return await DbSet
            .OrderByDescending(p => p.SalesCount)
            .Take(count)
            .Include(p => p.Category)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetProductsWithLowStockAsync(int threshold)
    {
        return await DbSet
            .Where(p => p.StockQuantity <= threshold && p.IsActive)
            .AsNoTracking()
            .ToListAsync();
    }
}

// 在 Startup.cs 中注册
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
    
    services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
    services.AddScoped<IProductRepository, ProductRepository>();
    services.AddScoped<ICategoryRepository, CategoryRepository>();
    // 注册其他仓储...
}
```

### 1.2 工作单元模式

工作单元模式用于协调多个仓储操作，确保它们在单个事务中完成。

```csharp
// 工作单元接口
public interface IUnitOfWork : IDisposable
{
    IProductRepository Products { get; }
    ICategoryRepository Categories { get; }
    IOrderRepository Orders { get; }
    // 添加其他仓储属性...
    
    Task<int> CompleteAsync();
}

// 工作单元实现
public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    
    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        Products = new ProductRepository(context);
        Categories = new CategoryRepository(context);
        Orders = new OrderRepository(context);
        // 初始化其他仓储...
    }
    
    public IProductRepository Products { get; private set; }
    public ICategoryRepository Categories { get; private set; }
    public IOrderRepository Orders { get; private set; }
    // 其他仓储实现...
    
    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }
    
    public void Dispose()
    {
        _context.Dispose();
    }
}

// 在 Startup.cs 中注册
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
    
    services.AddScoped<IUnitOfWork, UnitOfWork>();
}

// 在服务层使用
public class OrderService : IOrderService
{
    private readonly IUnitOfWork _unitOfWork;
    
    public OrderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public async Task<Order> CreateOrderAsync(OrderCreateDto orderDto)
    {
        // 验证产品库存
        foreach (var item in orderDto.Items)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId);
            if (product == null || !product.IsActive)
                throw new NotFoundException($"产品 ID {item.ProductId} 不存在或已停用");
            
            if (product.StockQuantity < item.Quantity)
                throw new InsufficientStockException($"产品 {product.Name} 库存不足");
            
            // 更新库存
            product.StockQuantity -= item.Quantity;
            _unitOfWork.Products.Update(product);
        }
        
        // 创建订单
        var order = new Order
        {
            CustomerId = orderDto.CustomerId,
            OrderDate = DateTime.Now,
            Status = OrderStatus.Pending,
            Items = orderDto.Items.Select(item => new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice
            }).ToList()
        };
        
        await _unitOfWork.Orders.AddAsync(order);
        
        // 保存所有更改（原子操作）
        await _unitOfWork.CompleteAsync();
        
        // 加载关联数据以返回完整的订单信息
        return await _unitOfWork.Orders.GetOrderWithDetailsAsync(order.Id);
    }
}
```

## 2. 实战示例：电商平台

### 2.1 数据模型设计

```csharp
// 用户相关
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; }
    
    // 导航属性
    public ICollection<Order> Orders { get; set; }
    public ShoppingCart Cart { get; set; }
    public UserProfile Profile { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    
    // 外键
    public int UserId { get; set; }
    public User User { get; set; }
}

// 产品相关
public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int? ParentCategoryId { get; set; }
    
    // 自引用关系
    public Category ParentCategory { get; set; }
    public ICollection<Category> SubCategories { get; set; }
    
    // 导航属性
    public ICollection<Product> Products { get; set; }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // 外键
    public int CategoryId { get; set; }
    
    // 导航属性
    public Category Category { get; set; }
    public ICollection<ProductImage> Images { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; }
    public ICollection<CartItem> CartItems { get; set; }
    public ICollection<ProductReview> Reviews { get; set; }
}

public class ProductImage
{
    public int Id { get; set; }
    public string ImageUrl { get; set; }
    public bool IsMain { get; set; }
    
    // 外键
    public int ProductId { get; set; }
    public Product Product { get; set; }
}

public class ProductReview
{
    public int Id { get; set; }
    public int Rating { get; set; } // 1-5星
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // 外键
    public int ProductId { get; set; }
    public int UserId { get; set; }
    
    // 导航属性
    public Product Product { get; set; }
    public User User { get; set; }
}

// 购物车相关
public class ShoppingCart
{
    public int Id { get; set; }
    
    // 外键
    public int UserId { get; set; }
    
    // 导航属性
    public User User { get; set; }
    public ICollection<CartItem> Items { get; set; }
}

public class CartItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    
    // 外键
    public int CartId { get; set; }
    public int ProductId { get; set; }
    
    // 导航属性
    public ShoppingCart Cart { get; set; }
    public Product Product { get; set; }
}

// 订单相关
public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime? ShipDate { get; set; }
    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; }
    public string ShippingAddress { get; set; }
    public string PaymentMethod { get; set; }
    public string PaymentTransactionId { get; set; }
    
    // 外键
    public int UserId { get; set; }
    
    // 导航属性
    public User User { get; set; }
    public ICollection<OrderItem> Items { get; set; }
}

public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled,
    Returned
}

public class OrderItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; } // 订单时的价格，避免后续价格变化影响
    
    // 外键
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    
    // 导航属性
    public Order Order { get; set; }
    public Product Product { get; set; }
}

// 在 DbContext 中配置
public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<ProductReview> ProductReviews { get; set; }
    public DbSet<ShoppingCart> ShoppingCarts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {}
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 配置索引
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username).IsUnique();
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email).IsUnique();
            
        modelBuilder.Entity<Product>()
            .HasIndex(p => new { p.CategoryId, p.IsActive });
        modelBuilder.Entity<Product>()
            .HasIndex(p => new { p.IsActive, p.Price });
            
        modelBuilder.Entity<Order>()
            .HasIndex(o => new { o.UserId, o.OrderDate });
        modelBuilder.Entity<Order>()
            .HasIndex(o => o.Status);
        
        // 配置关系
        modelBuilder.Entity<User>()
            .HasOne(u => u.Profile)
            .WithOne(p => p.User)
            .HasForeignKey<UserProfile>(p => p.UserId);
            
        modelBuilder.Entity<User>()
            .HasOne(u => u.Cart)
            .WithOne(c => c.User)
            .HasForeignKey<ShoppingCart>(c => c.UserId);
            
        modelBuilder.Entity<Category>()
            .HasMany(c => c.SubCategories)
            .WithOne(c => c.ParentCategory)
            .HasForeignKey(c => c.ParentCategoryId)
            .OnDelete(DeleteBehavior.Restrict);
            
        modelBuilder.Entity<Product>()
            .HasMany(p => p.Images)
            .WithOne(i => i.Product)
            .OnDelete(DeleteBehavior.Cascade);
        
        // 配置实体约束
        modelBuilder.Entity<ProductReview>()
            .Property(r => r.Rating)
            .HasCheckConstraint("CK_ProductReview_Rating", "[Rating] >= 1 AND [Rating] <= 5");
        
        // 配置值转换
        modelBuilder.Entity<Order>()
            .Property(o => o.Status)
            .HasConversion(
                v => v.ToString(),
                v => (OrderStatus)Enum.Parse(typeof(OrderStatus), v));
        
        // 配置默认值
        modelBuilder.Entity<Product>()
            .Property(p => p.CreatedAt)
            .HasDefaultValueSql("GETDATE()");
        
        modelBuilder.Entity<User>()
            .Property(u => u.CreatedAt)
            .HasDefaultValueSql("GETDATE()");
        
        modelBuilder.Entity<Order>()
            .Property(o => o.OrderDate)
            .HasDefaultValueSql("GETDATE()");
    }
}
```

### 2.2 高级查询示例

```csharp
// 产品搜索和过滤
public async Task<ProductListResult> SearchProductsAsync(ProductSearchCriteria criteria)
{
    var query = _context.Products.AsQueryable();
    
    // 应用过滤条件
    if (!string.IsNullOrEmpty(criteria.Keyword))
    {
        query = query.Where(p => p.Name.Contains(criteria.Keyword) || 
                                p.Description.Contains(criteria.Keyword));
    }
    
    if (criteria.CategoryId.HasValue)
    {
        query = query.Where(p => p.CategoryId == criteria.CategoryId.Value);
    }
    
    if (criteria.MinPrice.HasValue)
    {
        query = query.Where(p => p.Price >= criteria.MinPrice.Value);
    }
    
    if (criteria.MaxPrice.HasValue)
    {
        query = query.Where(p => p.Price <= criteria.MaxPrice.Value);
    }
    
    if (criteria.IsActive.HasValue)
    {
        query = query.Where(p => p.IsActive == criteria.IsActive.Value);
    }
    
    // 计算总数
    var totalCount = await query.CountAsync();
    
    // 应用排序
    switch (criteria.SortBy)
    {
        case ProductSortBy.PriceLowHigh:
            query = query.OrderBy(p => p.Price);
            break;
        case ProductSortBy.PriceHighLow:
            query = query.OrderByDescending(p => p.Price);
            break;
        case ProductSortBy.Newest:
            query = query.OrderByDescending(p => p.CreatedAt);
            break;
        case ProductSortBy.Popularity:
            // 假设有一个计算受欢迎程度的方法
            query = query.OrderByDescending(p => p.Reviews.Count);
            break;
        default:
            query = query.OrderBy(p => p.Name);
            break;
    }
    
    // 应用分页
    var items = await query
        .Skip((criteria.Page - 1) * criteria.PageSize)
        .Take(criteria.PageSize)
        .Include(p => p.Category)
        .Include(p => p.Images.Where(i => i.IsMain))
        .AsNoTracking()
        .ToListAsync();
    
    return new ProductListResult
    {
        Items = items,
        TotalCount = totalCount,
        Page = criteria.Page,
        PageSize = criteria.PageSize,
        TotalPages = (int)Math.Ceiling(totalCount / (double)criteria.PageSize)
    };
}

// 获取订单统计数据
public async Task<OrderStatisticsDto> GetOrderStatisticsAsync(DateTime startDate, DateTime endDate)
{
    var query = _context.Orders.Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate);
    
    var result = await query.GroupBy(o => 1).Select(g => new
    {
        TotalOrders = g.Count(),
        TotalRevenue = g.Sum(o => o.TotalAmount),
        AverageOrderValue = g.Average(o => o.TotalAmount),
        CompletedOrders = g.Count(o => o.Status == OrderStatus.Delivered),
        CancelledOrders = g.Count(o => o.Status == OrderStatus.Cancelled)
    }).FirstOrDefaultAsync();
    
    // 按天统计订单数量
    var dailyStats = await query
        .GroupBy(o => new { Date = o.OrderDate.Date })
        .Select(g => new DailyOrderStat
        {
            Date = g.Key.Date,
            OrderCount = g.Count(),
            Revenue = g.Sum(o => o.TotalAmount)
        })
        .OrderBy(d => d.Date)
        .ToListAsync();
    
    // 按产品统计销量
    var topSellingProducts = await _context.OrderItems
        .Where(oi => oi.Order.OrderDate >= startDate && oi.Order.OrderDate <= endDate)
        .GroupBy(oi => new { oi.ProductId, oi.Product.Name })
        .Select(g => new ProductSalesStat
        {
            ProductId = g.Key.ProductId,
            ProductName = g.Key.Name,
            QuantitySold = g.Sum(oi => oi.Quantity),
            Revenue = g.Sum(oi => oi.Quantity * oi.UnitPrice)
        })
        .OrderByDescending(p => p.QuantitySold)
        .Take(10)
        .ToListAsync();
    
    return new OrderStatisticsDto
    {
        TotalOrders = result?.TotalOrders ?? 0,
        TotalRevenue = result?.TotalRevenue ?? 0,
        AverageOrderValue = result?.AverageOrderValue ?? 0,
        CompletedOrderPercentage = result != null && result.TotalOrders > 0 
            ? (double)result.CompletedOrders / result.TotalOrders * 100 
            : 0,
        DailyStats = dailyStats,
        TopSellingProducts = topSellingProducts
    };
}
```

### 2.3 性能优化示例

```csharp
// 批量订单处理
public async Task ProcessBulkOrdersAsync(List<OrderDto> orderDtos)
{
    // 禁用自动检测更改以提高性能
    _context.ChangeTracker.AutoDetectChangesEnabled = false;
    
    try
    {
        // 批量处理，每 100 个订单处理一次
        const int batchSize = 100;
        
        for (int i = 0; i < orderDtos.Count; i += batchSize)
        {
            var batch = orderDtos.Skip(i).Take(batchSize).ToList();
            
            // 预先加载所有需要的产品数据，避免 N+1 查询
            var productIds = batch.SelectMany(o => o.Items.Select(i => i.ProductId)).Distinct().ToList();
            var products = await _context.Products
                .Where(p => productIds.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);
            
            // 处理每个订单
            foreach (var orderDto in batch)
            {
                // 检查库存
                foreach (var item in orderDto.Items)
                {
                    if (!products.TryGetValue(item.ProductId, out var product) || 
                        product.StockQuantity < item.Quantity)
                    {
                        throw new InsufficientStockException($"产品 {item.ProductId} 库存不足");
                    }
                }
                
                // 更新库存
                foreach (var item in orderDto.Items)
                {
                    products[item.ProductId].StockQuantity -= item.Quantity;
                }
                
                // 创建订单
                var order = new Order
                {
                    CustomerId = orderDto.CustomerId,
                    OrderDate = DateTime.Now,
                    Status = OrderStatus.Pending,
                    ShippingAddress = orderDto.ShippingAddress,
                    PaymentMethod = orderDto.PaymentMethod,
                    TotalAmount = orderDto.Items.Sum(i => i.Quantity * i.UnitPrice),
                    Items = orderDto.Items.Select(item => new OrderItem
                    {
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice
                    }).ToList()
                };
                
                _context.Orders.Add(order);
            }
            
            // 手动触发更改检测
            _context.ChangeTracker.DetectChanges();
            
            // 保存更改
            await _context.SaveChangesAsync();
            
            // 清除更改跟踪器以释放内存
            _context.ChangeTracker.Clear();
        }
    }
    finally
    {
        // 恢复自动检测更改
        _context.ChangeTracker.AutoDetectChangesEnabled = true;
    }
}

// 使用二级缓存优化查询性能
public async Task<CategoryNavigationDto> GetCategoryNavigationAsync()
{
    const string cacheKey = "CategoryNavigation";
    var cacheEntryOptions = new MemoryCacheEntryOptions()
        .SetSlidingExpiration(TimeSpan.FromHours(1))
        .SetAbsoluteExpiration(TimeSpan.FromHours(24));
    
    // 尝试从缓存获取
    if (_memoryCache.TryGetValue(cacheKey, out CategoryNavigationDto cachedResult))
    {
        return cachedResult;
    }
    
    // 缓存未命中，构建导航结构
    var categories = await _context.Categories
        .Include(c => c.SubCategories)
        .AsNoTracking()
        .ToListAsync();
    
    // 构建树形结构
    var rootCategories = categories.Where(c => c.ParentCategoryId == null).ToList();
    
    var result = new CategoryNavigationDto
    {
        Categories = rootCategories.Select(c => MapToCategoryDto(c, categories)).ToList()
    };
    
    // 设置缓存
    _memoryCache.Set(cacheKey, result, cacheEntryOptions);
    
    return result;
}

private CategoryDto MapToCategoryDto(Category category, List<Category> allCategories)
{
    return new CategoryDto
    {
        Id = category.Id,
        Name = category.Name,
        SubCategories = allCategories
            .Where(c => c.ParentCategoryId == category.Id)
            .Select(c => MapToCategoryDto(c, allCategories))
            .ToList()
    };
}
```

## 3. 实战示例：企业应用

### 3.1 多租户设计

```csharp
// 租户实体
public class Tenant
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ConnectionString { get; set; } // 可以为空，表示使用共享数据库
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}

// 定义一个接口标记需要多租户支持的实体
public interface ITenantEntity
{
    int TenantId { get; set; }
}

// 修改实体以支持多租户
public class Product : ITenantEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    
    // 多租户字段
    public int TenantId { get; set; }
    public Tenant Tenant { get; set; }
}

// 创建租户特定的 DbContext
public class TenantDbContext : DbContext
{
    private readonly int _tenantId;
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    // 其他 DbSet...
    
    public TenantDbContext(DbContextOptions<TenantDbContext> options, ITenantProvider tenantProvider)
        : base(options)
    {
        _tenantId = tenantProvider.GetCurrentTenantId();
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 为所有实现 ITenantEntity 的实体应用全局查询筛选器
        var entityTypes = modelBuilder.Model.GetEntityTypes()
            .Where(t => typeof(ITenantEntity).IsAssignableFrom(t.ClrType));
            
        foreach (var entityType in entityTypes)
        {
            var method = SetTenantFilterMethod.MakeGenericMethod(entityType.ClrType);
            method.Invoke(this, new object[] { modelBuilder });
        }
    }
    
    private static readonly MethodInfo SetTenantFilterMethod = typeof(TenantDbContext)
        .GetMethod(nameof(SetTenantFilter), BindingFlags.NonPublic | BindingFlags.Static);
    
    private static void SetTenantFilter<TEntity>(ModelBuilder modelBuilder) where TEntity : class, ITenantEntity
    {
        // 使用 EF Core 的全局查询筛选器
        modelBuilder.Entity<TEntity>().HasQueryFilter(e => e.TenantId == _tenantId);
    }
}

// 租户提供者接口和实现
public interface ITenantProvider
{
    int GetCurrentTenantId();
    Tenant GetCurrentTenant();
}

public class HttpContextTenantProvider : ITenantProvider
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ApplicationDbContext _dbContext;
    
    public HttpContextTenantProvider(IHttpContextAccessor httpContextAccessor, ApplicationDbContext dbContext)
    {
        _httpContextAccessor = httpContextAccessor;
        _dbContext = dbContext;
    }
    
    public int GetCurrentTenantId()
    {
        // 从 HttpContext 中获取租户 ID
        // 可能从请求头、URL 参数或认证用户信息中获取
        var tenantId = _httpContextAccessor.HttpContext?.Items["TenantId"];
        
        if (tenantId is int id)
        {
            return id;
        }
        
        throw new InvalidOperationException("无法确定当前租户");
    }
    
    public Tenant GetCurrentTenant()
    {
        var tenantId = GetCurrentTenantId();
        return _dbContext.Tenants.Find(tenantId);
    }
}

// 在 Startup.cs 中注册
public void ConfigureServices(IServiceCollection services)
{
    services.AddHttpContextAccessor();
    services.AddScoped<ITenantProvider, HttpContextTenantProvider>();
    
    // 注册共享数据库的 DbContext
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("SharedDb")));
    
    // 为每个租户注册特定的 DbContext（如果使用独立数据库）
    services.AddDbContext<TenantDbContext>((provider, options) =>
    {
        var tenantProvider = provider.GetRequiredService<ITenantProvider>();
        var tenant = tenantProvider.GetCurrentTenant();
        
        if (!string.IsNullOrEmpty(tenant.ConnectionString))
        {
            // 使用租户特定的连接字符串
            options.UseSqlServer(tenant.ConnectionString);
        }
        else
        {
            // 使用共享数据库
            options.UseSqlServer(Configuration.GetConnectionString("SharedDb"));
        }
    });
}
```

### 3.2 审计日志实现

```csharp
// 审计日志实体
public class AuditLog
{
    public int Id { get; set; }
    public string TableName { get; set; }
    public string Action { get; set; } // Insert, Update, Delete
    public int? EntityId { get; set; }
    public string OldValues { get; set; }
    public string NewValues { get; set; }
    public string AffectedColumns { get; set; }
    public string UserId { get; set; }
    public DateTime CreatedAt { get; set; }
    public string IPAddress { get; set; }
    public string UserAgent { get; set; }
}

// 审计日志拦截器
public class AuditInterceptor : SaveChangesInterceptor
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<AuditInterceptor> _logger;
    
    public AuditInterceptor(IHttpContextAccessor httpContextAccessor, ILogger<AuditInterceptor> logger)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }
    
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        if (eventData.Context is null)
            return result;
            
        // 获取审计日志所需信息
        var httpContext = _httpContextAccessor.HttpContext;
        var userId = httpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "System";
        var ipAddress = httpContext?.Connection?.RemoteIpAddress?.ToString() ?? "Unknown";
        var userAgent = httpContext?.Request?.Headers["User-Agent"].ToString() ?? "Unknown";
        
        // 捕获更改并创建审计日志
        var auditEntries = OnBeforeSaveChanges(eventData.Context, userId, ipAddress, userAgent);
        
        // 继续保存更改
        return result;
    }
    
    public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        if (eventData.Context is null)
            return result;
            
        // 获取审计日志所需信息
        var httpContext = _httpContextAccessor.HttpContext;
        var userId = httpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "System";
        var ipAddress = httpContext?.Connection?.RemoteIpAddress?.ToString() ?? "Unknown";
        var userAgent = httpContext?.Request?.Headers["User-Agent"].ToString() ?? "Unknown";
        
        // 捕获更改并创建审计日志
        var auditEntries = OnBeforeSaveChanges(eventData.Context, userId, ipAddress, userAgent);
        
        // 继续保存更改
        return result;
    }
    
    public override void SavedChanges(SaveChangesCompletedEventData eventData, int result)
    {
        if (eventData.Context is null)
            return;
            
        // 获取保存前创建的审计条目
        var auditEntries = eventData.Context.Items["AuditEntries"] as List<AuditEntry>;
        
        if (auditEntries != null && auditEntries.Count > 0)
        {
            // 保存审计日志
            OnAfterSaveChanges(eventData.Context, auditEntries);
        }
    }
    
    public override async ValueTask SavedChangesAsync(SaveChangesCompletedEventData eventData, int result, CancellationToken cancellationToken = default)
    {
        if (eventData.Context is null)
            return;
            
        // 获取保存前创建的审计条目
        var auditEntries = eventData.Context.Items["AuditEntries"] as List<AuditEntry>;
        
        if (auditEntries != null && auditEntries.Count > 0)
        {
            // 保存审计日志
            await OnAfterSaveChangesAsync(eventData.Context, auditEntries, cancellationToken);
        }
    }
    
    private List<AuditEntry> OnBeforeSaveChanges(DbContext context, string userId, string ipAddress, string userAgent)
    {
        context.ChangeTracker.DetectChanges();
        var auditEntries = new List<AuditEntry>();
        
        foreach (var entry in context.ChangeTracker.Entries())
        {
            // 跳过审计日志实体自身和未更改的实体
            if (entry.Entity is AuditLog || entry.State == EntityState.Detached || entry.State == EntityState.Unchanged)
                continue;
                
            // 创建审计条目
            var auditEntry = new AuditEntry(entry)
            {
                TableName = entry.Metadata.GetTableName(),
                UserId = userId,
                IPAddress = ipAddress,
                UserAgent = userAgent,
                CreatedAt = DateTime.Now
            };
            
            // 根据实体状态设置操作类型
            switch (entry.State)
            {
                case EntityState.Added:
                    auditEntry.Action = "Insert";
                    auditEntry.NewValues = GetEntityValues(entry.CurrentValues);
                    break;
                    
                case EntityState.Deleted:
                    auditEntry.Action = "Delete";
                    auditEntry.OldValues = GetEntityValues(entry.OriginalValues);
                    break;
                    
                case EntityState.Modified:
                    auditEntry.Action = "Update";
                    auditEntry.OldValues = GetEntityValues(entry.OriginalValues);
                    auditEntry.NewValues = GetEntityValues(entry.CurrentValues);
                    
                    // 记录哪些列被修改了
                    var modifiedColumns = new List<string>();
                    foreach (var property in entry.Properties)
                    {
                        if (property.IsModified && property.OriginalValue?.ToString() != property.CurrentValue?.ToString())
                        {
                            modifiedColumns.Add(property.Metadata.Name);
                        }
                    }
                    
                    auditEntry.AffectedColumns = JsonSerializer.Serialize(modifiedColumns);
                    break;
            }
            
            // 尝试获取实体 ID
            var idProperty = entry.Properties.FirstOrDefault(p => p.Metadata.IsPrimaryKey());
            if (idProperty != null)
            {
                auditEntry.EntityId = idProperty.CurrentValue as int?;
            }
            
            auditEntries.Add(auditEntry);
        }
        
        // 存储审计条目以便在保存后使用
        context.Items["AuditEntries"] = auditEntries;
        
        return auditEntries;
    }
    
    private string GetEntityValues(PropertyValues values)
    {
        var dictionary = new Dictionary<string, object>();
        
        foreach (var property in values.Properties)
        {
            // 排除敏感信息，如密码哈希
            if (property.Name.Equals("PasswordHash", StringComparison.OrdinalIgnoreCase))
                continue;
                
            dictionary[property.Name] = values[property.Name];
        }
        
        return JsonSerializer.Serialize(dictionary);
    }
    
    private void OnAfterSaveChanges(DbContext context, List<AuditEntry> auditEntries)
    {
        try
        {
            var auditLogs = auditEntries.Select(entry => new AuditLog
            {
                TableName = entry.TableName,
                Action = entry.Action,
                EntityId = entry.EntityId,
                OldValues = entry.OldValues,
                NewValues = entry.NewValues,
                AffectedColumns = entry.AffectedColumns,
                UserId = entry.UserId,
                IPAddress = entry.IPAddress,
                UserAgent = entry.UserAgent,
                CreatedAt = entry.CreatedAt
            }).ToList();
            
            // 禁用审计拦截器，避免递归
            context.AddRange(auditLogs);
            context.SaveChanges();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "保存审计日志失败");
        }
    }
    
    private async Task OnAfterSaveChangesAsync(DbContext context, List<AuditEntry> auditEntries, CancellationToken cancellationToken)
    {
        try
        {
            var auditLogs = auditEntries.Select(entry => new AuditLog
            {
                TableName = entry.TableName,
                Action = entry.Action,
                EntityId = entry.EntityId,
                OldValues = entry.OldValues,
                NewValues = entry.NewValues,
                AffectedColumns = entry.AffectedColumns,
                UserId = entry.UserId,
                IPAddress = entry.IPAddress,
                UserAgent = entry.UserAgent,
                CreatedAt = entry.CreatedAt
            }).ToList();
            
            // 禁用审计拦截器，避免递归
            context.AddRange(auditLogs);
            await context.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "保存审计日志失败");
        }
    }
}

// 审计条目辅助类
public class AuditEntry
{
    public AuditEntry(EntityEntry entry)
    {
        Entry = entry;
    }
    
    public EntityEntry Entry { get; }
    public string TableName { get; set; }
    public string Action { get; set; }
    public int? EntityId { get; set; }
    public string OldValues { get; set; }
    public string NewValues { get; set; }
    public string AffectedColumns { get; set; }
    public string UserId { get; set; }
    public string IPAddress { get; set; }
    public string UserAgent { get; set; }
    public DateTime CreatedAt { get; set; }
}

// 在 Startup.cs 中注册拦截器
public void ConfigureServices(IServiceCollection services)
{
    services.AddHttpContextAccessor();
    services.AddScoped<AuditInterceptor>();
    
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            .AddInterceptors(services.BuildServiceProvider().GetRequiredService<AuditInterceptor>()));
}
```

## 4. 最佳实践指南

### 4.1 DbContext 管理

1. **使用依赖注入**：始终通过依赖注入来获取 DbContext 实例。
   ```csharp
   public class ProductService
   {
       private readonly ApplicationDbContext _context;
       
       public ProductService(ApplicationDbContext context)
       {
           _context = context;
       }
   }
   ```

2. **使用适当的生命周期**：在 ASP.NET Core 中，DbContext 默认注册为 Scoped 生命周期，这通常是正确的选择。

3. **避免长时间运行的 DbContext**：不要在静态字段或单例服务中存储 DbContext 实例。

4. **使用工作单元模式**：对于复杂操作，考虑使用工作单元模式来协调多个仓储操作。

5. **使用异步操作**：优先使用异步方法（如 SaveChangesAsync、ToListAsync 等）。

### 4.2 查询优化

1. **使用 AsNoTracking**：对于只读查询，使用 AsNoTracking 来提高性能。
   ```csharp
   var products = await _context.Products.AsNoTracking().ToListAsync();
   ```

2. **避免 N+1 查询问题**：使用 Include 和 ThenInclude 预加载相关实体，或使用 Select 投影。

3. **限制返回数据量**：使用 Take 方法限制返回的记录数，并实现分页。

4. **使用投影**：只选择需要的列，而不是整个实体。
   ```csharp
   var productNames = await _context.Products
       .Where(p => p.IsActive)
       .Select(p => new { p.Id, p.Name, p.Price })
       .ToListAsync();
   ```

5. **使用索引**：为频繁查询的列添加适当的索引。

6. **避免在循环中进行数据库操作**：收集所有需要处理的项，然后批量处理。

### 4.3 性能优化

1. **批量操作**：对于大量数据操作，考虑使用 EF Core 7.0+ 的 ExecuteUpdate/ExecuteDelete，或第三方库（如 Entity Framework Plus）。

2. **禁用自动检测更改**：在进行批量操作时，临时禁用自动检测更改以提高性能。
   ```csharp
   _context.ChangeTracker.AutoDetectChangesEnabled = false;
   try
   {
       // 批量操作
   }
   finally
   {
       _context.ChangeTracker.AutoDetectChangesEnabled = true;
   }
   ```

3. **定期清除 ChangeTracker**：处理大量实体时，定期清除 ChangeTracker 以释放内存。
   ```csharp
   _context.ChangeTracker.Clear();
   ```

4. **使用合理的缓存策略**：缓存频繁访问且变化不频繁的数据。

5. **避免不必要的验证**：如果数据已经在其他层验证过，可以临时禁用 EF Core 的验证。
   ```csharp
   _context.ValidateOnSaveEnabled = false;
   ```

### 4.4 安全性考虑

1. **参数化查询**：始终使用 EF Core 的参数化查询，避免 SQL 注入。

2. **数据验证**：在保存数据前验证用户输入，不要依赖数据库约束来捕获所有错误。

3. **防止敏感数据泄露**：不要在日志或错误消息中包含敏感信息。

4. **行级安全性**：对于多租户应用，使用全局查询筛选器或其他机制确保租户只能访问自己的数据。

5. **使用适当的身份验证和授权**：确保只有授权用户才能访问和修改数据。

### 4.5 设计最佳实践

1. **实体设计**：
   - 遵循单一责任原则
   - 使用有意义的名称
   - 避免深层嵌套的导航属性：深层嵌套的导航属性会导致EF Core生成复杂的SQL查询，增加数据库负载，并且在序列化时可能导致循环引用问题。同时，深层嵌套也会使代码更难维护和测试。通常建议导航属性深度不超过2-3层。

以下是深层嵌套导航属性的反例：

```csharp
// 深层嵌套的实体设计示例（不推荐）
public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    
    // 导航属性
    public List<OrderItem> OrderItems { get; set; }
}

public class OrderItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    
    // 导航属性
    public Product Product { get; set; }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // 导航属性
    public Category Category { get; set; }
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // 导航属性
    public Department Department { get; set; }
}

public class Department
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // 导航属性
    public Company Company { get; set; }
}

// 深层嵌套查询（不推荐）
var orderDetails = await _context.Orders
    .Include(o => o.OrderItems)
        .ThenInclude(oi => oi.Product)
            .ThenInclude(p => p.Category)
                .ThenInclude(c => c.Department)
                    .ThenInclude(d => d.Company)
    .FirstOrDefaultAsync(o => o.Id == orderId);
```

### 优化方案和最佳实践

1. **使用DTO（数据传输对象）**

```csharp
// 定义扁平化的DTO
public class OrderDetailDto
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public List<OrderItemDto> Items { get; set; }
}

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public string CategoryName { get; set; } // 直接包含所需信息，不进行深层导航
}

// 使用投影查询获取所需数据
var orderDetail = await _context.Orders
    .Where(o => o.Id == orderId)
    .Select(o => new OrderDetailDto
    {
        OrderId = o.Id,
        OrderDate = o.OrderDate,
        Items = o.OrderItems.Select(oi => new OrderItemDto
        {
            ProductId = oi.Product.Id,
            ProductName = oi.Product.Name,
            Quantity = oi.Quantity,
            CategoryName = oi.Product.Category.Name
        }).ToList()
    })
    .FirstOrDefaultAsync();
```

2. **按需加载，限制导航深度**

```csharp
// 只加载必要的关联数据
var orderWithItems = await _context.Orders
    .Include(o => o.OrderItems)
        .ThenInclude(oi => oi.Product)
    .FirstOrDefaultAsync(o => o.Id == orderId);

// 如果需要分类信息，单独获取
if (orderWithItems != null)
{
    var productIds = orderWithItems.OrderItems.Select(oi => oi.ProductId).ToList();
    var productCategories = await _context.Products
        .Where(p => productIds.Contains(p.Id))
        .Select(p => new { p.Id, p.Category.Name })
        .ToDictionaryAsync(p => p.Id, p => p.Name);
    
    // 将分类信息关联到订单项目
    foreach (var item in orderWithItems.OrderItems)
    {
        if (productCategories.TryGetValue(item.ProductId, out var categoryName))
        {
            item.Product.Category.Name = categoryName;
        }
    }
}
```

3. **使用仓储模式封装复杂查询**

```csharp
public class OrderRepository
{
    private readonly ApplicationDbContext _context;
    
    public OrderRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    // 封装获取订单详情的方法，内部处理数据加载
    public async Task<OrderDetailDto> GetOrderDetailAsync(int orderId)
    {
        // 使用投影查询获取扁平化数据
        return await _context.Orders
            .Where(o => o.Id == orderId)
            .Select(o => new OrderDetailDto
            {
                OrderId = o.Id,
                OrderDate = o.OrderDate,
                Items = o.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.Product.Id,
                    ProductName = oi.Product.Name,
                    Quantity = oi.Quantity,
                    CategoryName = oi.Product.Category.Name
                }).ToList()
            })
            .FirstOrDefaultAsync();
    }
}
```

4. **考虑使用数据库视图**

对于复杂的关联查询，可以考虑在数据库中创建视图，然后通过EF Core映射到只读实体。

```csharp
// 映射到数据库视图的实体
[Keyless]
public class OrderDetailView
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public int OrderItemId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public string CategoryName { get; set; }
    public string DepartmentName { get; set; }
}

// 在DbContext中注册
public DbSet<OrderDetailView> OrderDetailViews { get; set; }

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<OrderDetailView>().ToView("OrderDetailsView");
}
    - 使用适当的数据类型

2. **关系设计**：
   - 明确定义主键和外键
   - 选择适当的关系类型（一对一、一对多、多对多）
   - 考虑级联删除行为

3. **配置组织**：
   - 使用 IEntityTypeConfiguration<T> 接口分离模型配置
   - 在 OnModelCreating 方法中组织配置
   ```csharp
   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
       // 加载所有配置
       modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
   }
   ```

4. **代码组织**：
   - 将实体类放在单独的文件夹中
   - 使用仓储模式和服务层分离关注点
   - 遵循一致的命名约定

### 4.6 测试最佳实践

1. **使用内存数据库进行单元测试**：
   ```csharp
   public class ProductServiceTests
   {
       [Fact]
       public async Task GetProducts_ShouldReturnActiveProducts()
       {
           // 配置内存数据库
           var options = new DbContextOptionsBuilder<ApplicationDbContext>()
               .UseInMemoryDatabase(databaseName: "TestDb")
               .Options;
           
           // 创建测试数据
           using (var context = new ApplicationDbContext(options))
           {
               context.Products.AddRange(
                   new Product { Id = 1, Name = "产品1", IsActive = true },
                   new Product { Id = 2, Name = "产品2", IsActive = false },
                   new Product { Id = 3, Name = "产品3", IsActive = true }
               );
               await context.SaveChangesAsync();
           }
           
           // 测试服务
           using (var context = new ApplicationDbContext(options))
           {
               var service = new ProductService(context);
               var result = await service.GetActiveProductsAsync();
               
               Assert.Equal(2, result.Count);
               Assert.All(result, p => Assert.True(p.IsActive));
           }
       }
   }
   ```

2. **集成测试**：使用真实数据库或测试容器进行集成测试。

3. **测试迁移**：编写测试确保迁移能够正确应用和回滚。

## 5. 部署与维护

### 5.1 数据库部署策略

1. **生成迁移脚本**：在部署前生成 SQL 脚本并审查。
   ```bash
   dotnet ef migrations script -o migrations.sql
   ```

2. **使用 CI/CD 集成**：将数据库迁移集成到持续集成和部署流程中。

3. **数据库版本管理**：使用迁移历史记录表跟踪已应用的迁移。

4. **蓝绿部署**：对于大型更新，考虑使用蓝绿部署策略减少停机时间。

### 5.2 监控与日志

1. **启用 EF Core 日志**：配置 EF Core 日志记录生成的 SQL 查询。
   ```csharp
   optionsBuilder.UseSqlServer("connection string")
       .LogTo(Console.WriteLine, LogLevel.Information);
   ```

2. **性能监控**：监控慢查询和数据库连接。

3. **错误日志**：记录所有数据库错误，并设置适当的告警机制。

### 5.3 备份与恢复

1. **定期备份**：建立定期数据库备份计划。

2. **备份验证**：定期验证备份的可恢复性。

3. **灾难恢复计划**：制定并测试数据库灾难恢复计划。

## 6. 小结

本章提供了 EF Core 的实战示例和最佳实践指南，包括：

- 架构设计模式，如仓储模式和工作单元模式
- 电商平台数据模型设计和高级查询示例
- 性能优化技术，如批量操作和二级缓存
- 多租户应用设计和实现
- 审计日志系统的实现
- 全面的最佳实践指南，涵盖 DbContext 管理、查询优化、性能优化、安全性考虑和设计最佳实践
- 测试、部署和维护策略

通过应用这些实战示例和最佳实践，你可以构建高性能、可维护、安全的应用程序，充分发挥 EF Core 的强大功能，同时避免常见的陷阱和性能问题。