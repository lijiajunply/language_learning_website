# EF Core 保存数据与事务处理

## 1. 基本的 CRUD 操作

### 1.1 创建数据（Create）

```csharp
// 创建单个实体
using var context = new ApplicationDbContext();

var newProduct = new Product
{
    Name = "新产品",
    Price = 99.99m,
    CategoryId = 1,
    IsActive = true,
    CreatedAt = DateTime.Now
};

context.Products.Add(newProduct);
var result = await context.SaveChangesAsync();
Console.WriteLine($"保存成功，影响了 {result} 条记录");
Console.WriteLine($"新创建的产品ID: {newProduct.Id}");  // ID 会被自动回填

// 创建多个实体
var newProducts = new List<Product>
{
    new Product { Name = "产品A", Price = 199.99m, CategoryId = 1 },
    new Product { Name = "产品B", Price = 299.99m, CategoryId = 2 },
    new Product { Name = "产品C", Price = 399.99m, CategoryId = 1 }
};

context.Products.AddRange(newProducts);
await context.SaveChangesAsync();

// 使用实体状态设置
var product = new Product { Name = "手动添加", Price = 499.99m };
context.Entry(product).State = EntityState.Added;
await context.SaveChangesAsync();
```

### 1.2 读取数据（Read）

```csharp
// 根据主键查询
var product = context.Products.Find(1);

// 条件查询
var expensiveProducts = context.Products
    .Where(p => p.Price > 100)
    .ToList();

// 异步查询
var recentProducts = await context.Products
    .Where(p => p.CreatedAt > DateTime.Now.AddDays(-30))
    .ToListAsync();

// 包含相关数据
var productsWithCategories = context.Products
    .Include(p => p.Category)
    .ToList();
```

### 1.3 更新数据（Update）

```csharp
// 方法1：先查询再更新（推荐）
using var context = new ApplicationDbContext();
var product = await context.Products.FindAsync(1);

if (product != null)
{
    product.Name = "更新后的产品名称";
    product.Price = 129.99m;
    product.LastUpdated = DateTime.Now;
    
    // EF Core 会自动跟踪更改
    var result = await context.SaveChangesAsync();
    Console.WriteLine($"更新成功，影响了 {result} 条记录");
}

// 方法2：使用 Update 方法（适用于分离的实体）
var detachedProduct = new Product { Id = 2, Name = "分离实体", Price = 199.99m };
context.Products.Update(detachedProduct);
await context.SaveChangesAsync();

// 方法3：更新多个实体
var productsToUpdate = await context.Products
    .Where(p => p.CategoryId == 1)
    .ToListAsync();

foreach (var p in productsToUpdate)
{
    p.Price *= 1.1m;  // 涨价10%
}

await context.SaveChangesAsync();

// 方法4：使用 Entry API 更新特定属性
var productEntry = context.Entry(product);
productEntry.Property(p => p.Price).CurrentValue = 159.99m;
// 也可以只更新部分属性，其他保持不变
productEntry.State = EntityState.Unchanged;
productEntry.Property(p => p.Price).IsModified = true;
await context.SaveChangesAsync();
```

### 1.4 删除数据（Delete）

```csharp
// 方法1：先查询再删除（推荐）
using var context = new ApplicationDbContext();
var product = await context.Products.FindAsync(1);

if (product != null)
{
    context.Products.Remove(product);
    var result = await context.SaveChangesAsync();
    Console.WriteLine($"删除成功，影响了 {result} 条记录");
}

// 方法2：使用 Remove 方法（适用于分离的实体）
var detachedProduct = new Product { Id = 2 };  // 只需要主键
context.Products.Remove(detachedProduct);
await context.SaveChangesAsync();

// 方法3：删除多个实体
var productsToDelete = await context.Products
    .Where(p => p.IsActive == false && p.LastUpdated < DateTime.Now.AddYears(-1))
    .ToListAsync();

context.Products.RemoveRange(productsToDelete);
await context.SaveChangesAsync();

// 方法4：使用实体状态设置
var productToDelete = new Product { Id = 3 };
context.Entry(productToDelete).State = EntityState.Deleted;
await context.SaveChangesAsync();
```

## 2. 批量操作

### 2.1 批量添加

```csharp
// 添加大量数据
using var context = new ApplicationDbContext();

// 分批添加以避免内存问题
var batchSize = 1000;
var allProducts = GetLargeProductList(); // 假设这是一个返回大量产品的方法

for (int i = 0; i < allProducts.Count; i += batchSize)
{
    var batch = allProducts.Skip(i).Take(batchSize).ToList();
    context.Products.AddRange(batch);
    await context.SaveChangesAsync();
    
    // 重置 DbContext 以释放内存
    context.ChangeTracker.Clear();
}
```

### 2.2 批量更新

```csharp
// 批量更新特定条件的记录
// 方法1：使用循环（适用于中小规模数据）
var products = context.Products
    .Where(p => p.CategoryId == 1)
    .ToList();

foreach (var product in products)
{
    product.Price *= 1.1m;
}

await context.SaveChangesAsync();

// 方法2：使用 ExecuteUpdate（EF Core 7.0+）- 性能更好
var affectedRows = await context.Products
    .Where(p => p.CategoryId == 1)
    .ExecuteUpdateAsync(s => s
        .SetProperty(p => p.Price, p => p.Price * 1.1m)
        .SetProperty(p => p.LastUpdated, DateTime.Now));

Console.WriteLine($"更新了 {affectedRows} 条记录");
```

### 2.3 批量删除

```csharp
// 方法1：使用 RemoveRange（适用于中小规模数据）
var productsToDelete = context.Products
    .Where(p => p.IsActive == false)
    .ToList();

context.Products.RemoveRange(productsToDelete);
await context.SaveChangesAsync();

// 方法2：使用 ExecuteDelete（EF Core 7.0+）- 性能更好
var affectedRows = await context.Products
    .Where(p => p.IsActive == false && p.LastUpdated < DateTime.Now.AddYears(-1))
    .ExecuteDeleteAsync();

Console.WriteLine($"删除了 {affectedRows} 条记录");
```

## 3. 事务管理

### 3.1 自动事务

EF Core 的 `SaveChanges` 方法默认在单个事务中执行所有更改。

```csharp
using var context = new ApplicationDbContext();

// 所有这些操作都在同一个事务中执行
var order = new Order { CustomerId = 1, OrderDate = DateTime.Now };
context.Orders.Add(order);

var orderItem1 = new OrderItem { Order = order, ProductId = 1, Quantity = 2, UnitPrice = 99.99m };
var orderItem2 = new OrderItem { Order = order, ProductId = 2, Quantity = 1, UnitPrice = 199.99m };
context.OrderItems.AddRange(orderItem1, orderItem2);

// 如果任何操作失败，整个事务会回滚
await context.SaveChangesAsync();
```

### 3.2 显式事务

对于更复杂的场景，可以使用显式事务。

```csharp
using var context = new ApplicationDbContext();

// 开始事务
using var transaction = await context.Database.BeginTransactionAsync();

try
{
    // 执行操作
    var product = new Product { Name = "事务中的产品", Price = 299.99m };
    context.Products.Add(product);
    await context.SaveChangesAsync();
    
    var order = new Order { CustomerId = 1, ProductId = product.Id };
    context.Orders.Add(order);
    await context.SaveChangesAsync();
    
    // 提交事务
    await transaction.CommitAsync();
    Console.WriteLine("事务提交成功");
}
catch (Exception ex)
{
    // 回滚事务
    await transaction.RollbackAsync();
    Console.WriteLine($"事务回滚: {ex.Message}");
    throw;
}
```

### 3.3 分布式事务

在需要跨多个数据库或资源进行事务操作时，可以使用分布式事务。

```csharp
// 使用 TransactionScope（需要 .NET 5+）
using var scope = new TransactionScope(
    TransactionScopeOption.Required,
    new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted },
    TransactionScopeAsyncFlowOption.Enabled);

try
{
    // 第一个数据库操作
    using var context1 = new ApplicationDbContext();
    var order = new Order { CustomerId = 1 };
    context1.Orders.Add(order);
    await context1.SaveChangesAsync();
    
    // 第二个数据库操作
    using var context2 = new InventoryDbContext();
    var inventory = new Inventory { ProductId = 1, Quantity = -2 };
    context2.Inventories.Add(inventory);
    await context2.SaveChangesAsync();
    
    // 完成事务
    await scope.CompleteAsync();
    Console.WriteLine("分布式事务完成");
}
catch (Exception ex)
{
    // 自动回滚
    Console.WriteLine($"分布式事务失败: {ex.Message}");
    throw;
}
```

## 4. 并发控制

### 4.1 乐观并发控制

乐观并发控制假设并发冲突很少发生，只有在实际发生冲突时才进行处理。

```csharp
// 1. 在实体中添加并发标记
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    
    [ConcurrencyCheck]  // 标记为并发检查属性
    public DateTime LastUpdated { get; set; }
    
    [Timestamp]  // 时间戳属性（推荐）
    public byte[] RowVersion { get; set; }
}

// 2. 处理并发冲突
using var context = new ApplicationDbContext();
var product = await context.Products.FindAsync(1);

if (product != null)
{
    product.Price = 299.99m;
    product.LastUpdated = DateTime.Now;
    
    try
    {
        await context.SaveChangesAsync();
        Console.WriteLine("更新成功");
    }
    catch (DbUpdateConcurrencyException ex)
    {
        Console.WriteLine("检测到并发冲突");
        
        // 处理并发冲突
        foreach (var entry in ex.Entries)
        {
            if (entry.Entity is Product)
            {
                // 获取数据库中的当前值
                var databaseValues = await entry.GetDatabaseValuesAsync();
                
                if (databaseValues != null)
                {
                    // 将数据库值应用到实体
                    entry.OriginalValues.SetValues(databaseValues);
                    
                    // 现在可以重新尝试保存或提示用户解决冲突
                    Console.WriteLine("已刷新数据，建议重新尝试操作");
                }
                else
                {
                    Console.WriteLine("实体已被删除");
                }
            }
        }
    }
}
```

### 4.2 悲观并发控制

悲观并发控制通过锁定资源来防止并发冲突。

```csharp
// 使用原始 SQL 锁定行
using var context = new ApplicationDbContext();

// 使用 WITH (UPDLOCK) 锁定行
var product = context.Products
    .FromSqlRaw("SELECT * FROM Products WITH (UPDLOCK) WHERE Id = {0}", 1)
    .AsTracking()
    .FirstOrDefault();

if (product != null)
{
    // 处理产品
    product.Price = 399.99m;
    await context.SaveChangesAsync();
    // 事务提交后释放锁
}
```

## 5. 实体状态管理

### 5.1 实体状态

EF Core 中的实体可以有以下几种状态：

- **Added**: 实体是新的，尚未保存在数据库中
- **Unchanged**: 实体已存在于数据库中，且未修改
- **Modified**: 实体已存在于数据库中，且已修改
- **Deleted**: 实体已存在于数据库中，且标记为删除
- **Detached**: 实体不在 DbContext 的跟踪范围内

### 5.2 查看和修改实体状态

```csharp
using var context = new ApplicationDbContext();

// 添加实体
var product = new Product { Name = "测试产品", Price = 99.99m };
context.Products.Add(product);

// 查看实体状态
var entityState = context.Entry(product).State;  // Added

// 保存更改
await context.SaveChangesAsync();
entityState = context.Entry(product).State;  // Unchanged

// 修改实体
product.Price = 199.99m;
entityState = context.Entry(product).State;  // Modified

// 手动设置状态
context.Entry(product).State = EntityState.Unchanged;
entityState = context.Entry(product).State;  // Unchanged

// 将实体标记为已修改（但不跟踪具体哪些属性已更改）
context.Entry(product).State = EntityState.Modified;

// 标记特定属性为已修改
context.Entry(product).Property(p => p.Price).IsModified = true;

// 查看哪些属性已修改
var modifiedProperties = context.Entry(product)
    .Properties
    .Where(p => p.IsModified)
    .Select(p => p.Metadata.Name)
    .ToList();
```

### 5.3 处理分离实体

```csharp
// 获取分离的实体（例如从API接收）
var productDTO = GetProductFromApi(); // 假设这是从外部获取的产品数据
var detachedProduct = new Product
{
    Id = productDTO.Id,
    Name = productDTO.Name,
    Price = productDTO.Price
};

using var context = new ApplicationDbContext();

// 方法1：附加并更新
context.Products.Attach(detachedProduct);
context.Entry(detachedProduct).State = EntityState.Modified;
await context.SaveChangesAsync();

// 方法2：先查询数据库中的实体，然后应用更改
var dbProduct = await context.Products.FindAsync(detachedProduct.Id);
if (dbProduct != null)
{
    // 手动复制属性
    dbProduct.Name = detachedProduct.Name;
    dbProduct.Price = detachedProduct.Price;
    // 或者使用 AutoMapper
    // mapper.Map(detachedProduct, dbProduct);
    
    await context.SaveChangesAsync();
}

// 方法3：使用 Update 方法（自动附加并标记为 Modified）
context.Products.Update(detachedProduct);
await context.SaveChangesAsync();
```

## 6. 优化保存操作

### 6.1 减少跟踪实体数量

```csharp
// 使用 AsNoTracking 查询只读数据
var products = context.Products.AsNoTracking().ToList();

// 查询后清除 ChangeTracker
context.ChangeTracker.Clear();

// 使用新的 DbContext 实例进行保存操作
using var saveContext = new ApplicationDbContext();
saveContext.Products.Add(new Product { Name = "新产品", Price = 99.99m });
await saveContext.SaveChangesAsync();
```

### 6.2 批量保存优化

```csharp
// 批量操作时禁用自动检测更改以提高性能
using var context = new ApplicationDbContext();
context.ChangeTracker.AutoDetectChangesEnabled = false;

try
{
    for (int i = 0; i < 1000; i++)
    {
        context.Products.Add(new Product { Name = $"产品{i}", Price = i * 10m });
        
        // 每 100 个实体保存一次
        if (i % 100 == 99)
        {
            context.ChangeTracker.DetectChanges();  // 手动检测更改
            await context.SaveChangesAsync();
            context.ChangeTracker.Clear();  // 清除跟踪
        }
    }
    
    // 保存剩余的实体
    if (context.ChangeTracker.HasChanges())
    {
        context.ChangeTracker.DetectChanges();
        await context.SaveChangesAsync();
    }
}
finally
{
    // 恢复自动检测更改
    context.ChangeTracker.AutoDetectChangesEnabled = true;
}
```

### 6.3 禁用验证

如果已经在其他地方进行了验证，可以临时禁用 EF Core 的验证以提高性能。

```csharp
using var context = new ApplicationDbContext();

// 禁用验证
context.ValidateOnSaveEnabled = false;

try
{
    // 执行批量保存操作
    // ...
}
finally
{
    // 恢复验证
    context.ValidateOnSaveEnabled = true;
}
```

## 7. 审计日志

### 7.1 实现简单的审计日志

```csharp
public class ApplicationDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }
    
    // 跟踪当前用户
    public string CurrentUserId { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {}
    
    protected override void OnSaveChanges()
    {
        // 创建审计日志
        var auditEntries = OnBeforeSaveChanges();
        
        // 保存更改
        base.OnSaveChanges();
        
        // 保存审计日志
        OnAfterSaveChanges(auditEntries);
    }
    
    private List<AuditEntry> OnBeforeSaveChanges()
    {
        ChangeTracker.DetectChanges();
        var auditEntries = new List<AuditEntry>();
        
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is AuditLog || entry.State == EntityState.Detached || 
                entry.State == EntityState.Unchanged)
                continue;
                
            var auditEntry = new AuditEntry(entry);
            auditEntry.TableName = entry.Entity.GetType().Name;
            auditEntry.UserId = CurrentUserId;
            auditEntries.Add(auditEntry);
            
            foreach (var property in entry.Properties)
            {
                string propertyName = property.Metadata.Name;
                if (property.Metadata.IsPrimaryKey())
                {
                    auditEntry.KeyValues[propertyName] = property.CurrentValue;
                    continue;
                }
                
                switch (entry.State)
                {
                    case EntityState.Added:
                        auditEntry.NewValues[propertyName] = property.CurrentValue;
                        break;
                    
                    case EntityState.Deleted:
                        auditEntry.OldValues[propertyName] = property.OriginalValue;
                        break;
                    
                    case EntityState.Modified:
                        if (property.IsModified && property.OriginalValue?.ToString() != 
                            property.CurrentValue?.ToString())
                        {
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                        }
                        break;
                }
            }
        }
        
        return auditEntries;
    }
    
    private void OnAfterSaveChanges(List<AuditEntry> auditEntries)
    {
        if (auditEntries == null || auditEntries.Count == 0)
            return;
        
        foreach (var auditEntry in auditEntries)
        {
            // 保存审计日志
            AuditLogs.Add(auditEntry.ToAuditLog());
        }
        
        base.SaveChanges();
    }
}

public class AuditEntry
{
    public AuditEntry(EntityEntry entry)
    {
        Entry = entry;
        KeyValues = new Dictionary<string, object>();
        OldValues = new Dictionary<string, object>();
        NewValues = new Dictionary<string, object>();
    }
    
    public EntityEntry Entry { get; }
    public string TableName { get; set; }
    public Dictionary<string, object> KeyValues { get; }
    public Dictionary<string, object> OldValues { get; }
    public Dictionary<string, object> NewValues { get; }
    public string UserId { get; set; }
    
    public AuditLog ToAuditLog()
    {
        return new AuditLog
        {
            TableName = TableName,
            KeyValues = JsonConvert.SerializeObject(KeyValues),
            OldValues = OldValues.Count == 0 ? null : JsonConvert.SerializeObject(OldValues),
            NewValues = NewValues.Count == 0 ? null : JsonConvert.SerializeObject(NewValues),
            UserId = UserId,
            Timestamp = DateTime.Now
        };
    }
}

public class AuditLog
{
    public int Id { get; set; }
    public string TableName { get; set; }
    public string KeyValues { get; set; }
    public string OldValues { get; set; }
    public string NewValues { get; set; }
    public string UserId { get; set; }
    public DateTime Timestamp { get; set; }
}
```

## 8. 常见问题与解决方案

### 8.1 性能问题

- **问题**: 批量保存操作太慢
  **解决方案**: 分批次保存，禁用自动检测更改，使用 EF Core 7.0+ 的 ExecuteUpdate/ExecuteDelete

- **问题**: 内存使用过高
  **解决方案**: 定期清除 ChangeTracker，使用多个小型 DbContext 实例

### 8.2 并发冲突

- **问题**: 多个用户同时修改同一数据
  **解决方案**: 实现乐观并发控制，使用 Timestamp 属性

### 8.3 数据验证

- **问题**: 保存时出现验证错误
  **解决方案**: 在保存前验证数据，使用数据注解或自定义验证器

### 8.4 事务失败

- **问题**: 复杂操作中事务失败
  **解决方案**: 实现适当的异常处理，确保事务正确提交或回滚

## 9. 小结

本章节详细介绍了 EF Core 中的数据保存和事务处理机制，包括：

- 基本的 CRUD 操作：创建、读取、更新和删除数据
- 批量操作技术：批量添加、更新和删除数据
- 事务管理：自动事务、显式事务和分布式事务
- 并发控制策略：乐观并发控制和悲观并发控制
- 实体状态管理：查看和修改实体状态，处理分离实体
- 性能优化技巧：减少跟踪实体、批量保存优化、禁用验证
- 审计日志实现：记录数据变更历史
- 常见问题与解决方案

通过掌握这些技术，你可以有效地管理数据持久化过程，确保数据的完整性和一致性，同时优化应用程序的性能。