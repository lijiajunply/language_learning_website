# HQL（Hibernate Query Language）

HQL（Hibernate Query Language）是 Hibernate 提供的一种面向对象的查询语言，它的语法类似于 SQL，但操作的是对象和属性，而不是数据库表和列。HQL 是 Hibernate 的核心特性之一，能够帮助开发者以面向对象的方式编写查询语句。以下是 HQL 的详细语法介绍：

## 1. HQL 基本语法

HQL 的基本语法结构与 SQL 类似，主要包括以下几个部分：

- SELECT：指定查询的返回结果。

- FROM：指定查询的实体类。

- WHERE：指定查询条件。

- ORDER BY：指定排序规则。

- GROUP BY：指定分组规则。

- HAVING：指定分组后的过滤条件。

### 1.1 基本查询

```sql
FROM EntityName
```

- 查询所有实体对象。

- 示例：

```sql
FROM User
```

等价于 SQL：

```sql
SELECT * FROM users;
```

### 1.2 指定返回字段

```sql
SELECT property1, property2 FROM EntityName
```

- 查询指定字段。

- 示例：

```sql
SELECT name, email FROM User
```

等价于 SQL：

```sql
SELECT name, email FROM users;
```

### 1.3 条件查询

```sql
FROM EntityName WHERE condition
```

- 根据条件过滤结果。

- 示例：

```sql
FROM User WHERE name = 'Alice'
```

等价于 SQL：

```sql
SELECT * FROM users WHERE name = 'Alice';
```

### 1.4 排序

```sql
FROM EntityName ORDER BY property ASC|DESC
```

- 按指定字段排序。

- 示例：

```sql
FROM User ORDER BY name ASC
```

等价于 SQL：

```sql
SELECT * FROM users ORDER BY name ASC;
```

### 1.5 分页查询

HQL 本身不支持分页语法，但可以通过 Query 接口实现分页：

```java
String hql = "FROM User";
Query<User> query = session.createQuery(hql, User.class);
query.setFirstResult(0); // 起始位置
query.setMaxResults(10); // 每页大小
List<User> users = query.getResultList();
```

## 2. HQL 高级语法

### 2.1 聚合函数

HQL 支持常见的聚合函数，如 COUNT、SUM、AVG、MIN、MAX。

- 示例：

```sql
SELECT COUNT(*) FROM User
```

等价于 SQL：

```sql
SELECT COUNT(*) FROM users;
```

### 2.2 分组查询

```sql
SELECT property, aggregate_function(property)
FROM EntityName
GROUP BY property
```

- 示例：

```sql
SELECT department, COUNT(*) FROM Employee GROUP BY department
```

等价于 SQL：

```sql
SELECT department, COUNT(*) FROM employees GROUP BY department;
```

### 2.3 连接查询

HQL 支持内连接、左外连接和右外连接。

- 内连接：

```sql
FROM Entity1 e JOIN e.entity2
```

示例：

```sql
FROM Order o JOIN o.customer
```

等价于 SQL：

```sql
SELECT * FROM orders o INNER JOIN customers c ON o.customer_id = c.id;
```

- 左外连接：

```sql
FROM Entity1 e LEFT JOIN e.entity2
```

示例：

```sql
FROM Order o LEFT JOIN o.customer
```

等价于 SQL：

```sql
SELECT * FROM orders o LEFT JOIN customers c ON o.customer_id = c.id;
```

### 2.4 子查询

HQL 支持子查询，子查询必须放在括号中。

- 示例：

```sql
FROM User WHERE id IN (SELECT userId FROM Order WHERE amount > 100)
```

等价于 SQL：

```sql
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 100);
```

## 3. HQL 参数绑定

HQL 支持两种参数绑定方式：**位置参数**和**命名参数**。

### 3.1 位置参数

使用 ? 占位符，参数按顺序绑定。

- 示例：

```sql
FROM User WHERE name = ? AND email = ?
```

Java 代码：

```java
Query<User> query = session.createQuery("FROM User WHERE name = ? AND email = ?", User.class);
query.setParameter(0, "Alice");
query.setParameter(1, "alice@example.com");
List<User> users = query.getResultList();
```

### 3.2 命名参数

使用 :paramName 占位符，参数按名称绑定。

- 示例：

```sql
FROM User WHERE name = :name AND email = :email
```

Java 代码：

```java
Query<User> query = session.createQuery("FROM User WHERE name = :name AND email = :email", User.class);
query.setParameter("name", "Alice");
query.setParameter("email", "alice@example.com");
List<User> users = query.getResultList();
```

## 4. HQL 函数

HQL 提供了一些内置函数，可以用于查询中：

- 字符串函数：CONCAT、SUBSTRING、LOWER、UPPER、TRIM。

- 数学函数：ABS、SQRT、MOD。

- 时间函数：CURRENT_DATE、CURRENT_TIME、CURRENT_TIMESTAMP。

示例：

```sql
SELECT CONCAT(name, ' - ', email) FROM User
```

等价于 SQL：

```sql
SELECT CONCAT(name, ' - ', email) FROM users;
```

## 5. HQL 查询示例

### 5.1 查询所有用户

```sql
FROM User
```

### 5.2 查询指定字段

```sql
SELECT name, email FROM User
```

### 5.3 条件查询

```sql
FROM User WHERE age > 18 AND email LIKE '%@example.com'
```

### 5.4 聚合查询

```sql
SELECT COUNT(*) FROM User WHERE age > 18
```

### 5.5 连接查询

```sql
FROM Order o JOIN o.customer WHERE o.amount > 100
```

### 5.6 子查询

```sql
FROM User WHERE id IN (SELECT userId FROM Order WHERE amount > 100)
```

## 6. 总结

HQL 是 Hibernate 提供的面向对象查询语言，语法与 SQL 类似，但操作的是对象和属性。HQL 支持基本查询、条件查询、聚合查询、连接查询和子查询等高级功能。通过参数绑定和内置函数，HQL 可以满足复杂的查询需求。掌握 HQL 是使用 Hibernate 的关键技能之一。