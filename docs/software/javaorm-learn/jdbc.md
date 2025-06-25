# JDBC（Java Database Connectivity）

JDBC（Java Database Connectivity）是 Java 提供的一套用于与数据库进行交互的 API。它是 Java 数据库访问的基础，开发者可以通过 JDBC 直接操作数据库。本章将介绍 JDBC 的核心组件、基本用法以及一些常见的优化技巧。

## 1. JDBC 核心组件

JDBC 的核心组件包括以下几个类或接口：

1. DriverManager：用于管理数据库驱动，负责建立与数据库的连接。

	- 常用方法：getConnection(url, user, password)。

1. Connection：表示与数据库的连接，用于创建 Statement 对象并管理事务。

	- 常用方法：createStatement()、prepareStatement(sql)、setAutoCommit(boolean)、commit()、rollback()。

1. Statement：用于执行静态 SQL 语句并返回结果。

	- 常用方法：executeQuery(sql)、executeUpdate(sql)、execute(sql)。

1. PreparedStatement：是 Statement 的子接口，用于执行预编译的 SQL 语句，支持参数化查询，防止 SQL 注入。

	- 常用方法：setXxx(int parameterIndex, Xxx value)、executeQuery()、executeUpdate()。

1. ResultSet：表示 SQL 查询的结果集，提供了遍历和获取数据的方法。

	- 常用方法：next()、getXxx(int columnIndex)、getXxx(String columnName)。

1. SQLException：JDBC 操作中可能抛出的异常，用于处理数据库访问中的错误。

## 2. JDBC 基础操作示例

以下是一个简单的 JDBC 操作示例，展示了如何连接数据库、执行查询和更新操作。

```java
import java.sql.*;

public class JDBCExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "root";
        String password = "password";

        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            // 1. 创建 Statement 对象
            Statement statement = connection.createStatement();

            // 2. 执行查询
            String query = "SELECT id, name FROM users";
            ResultSet resultSet = statement.executeQuery(query);

            // 3. 遍历结果集
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                System.out.println("ID: " + id + ", Name: " + name);
            }

            // 4. 执行更新
            String update = "UPDATE users SET name = 'John Doe' WHERE id = 1";
            int rowsAffected = statement.executeUpdate(update);
            System.out.println("Rows affected: " + rowsAffected);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

> [!TIP]
> JDBC 需要使用各数据库的驱动，你需要配置一下 (这里展示的是MySql的)：

```xml
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.28</version>
    </dependency>
</dependencies>
```

## 3. JDBC 优化技巧

### 使用连接池

频繁创建和关闭数据库连接会消耗大量资源，使用连接池可以复用连接，提升性能。常见的连接池有：

- HikariCP：高性能的连接池。

- Apache DBCP：Apache 提供的连接池。

- C3P0：老牌连接池，功能丰富。

以下是使用 HikariCP 的示例：

```java
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class HikariExample {
    public static void main(String[] args) {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost:3306/mydatabase");
        config.setUsername("root");
        config.setPassword("password");

        try (HikariDataSource dataSource = new HikariDataSource(config);
             Connection connection = dataSource.getConnection()) {
            System.out.println("Connection obtained from pool!");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

### 使用 PreparedStatement

PreparedStatement 可以预编译 SQL 语句，提升性能并防止 SQL 注入。

```java
String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    preparedStatement.setString(1, "Alice");
    preparedStatement.setString(2, "alice@example.com");
    preparedStatement.executeUpdate();
} catch (SQLException e) {
    e.printStackTrace();
}
```

### 批量处理

对于大量数据操作，使用批量处理可以显著提升性能。

```java
String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
    for (int i = 1; i <= 1000; i++) {
        preparedStatement.setString(1, "User" + i);
        preparedStatement.setString(2, "user" + i + "@example.com");
        preparedStatement.addBatch(); // 添加到批处理
    }
    preparedStatement.executeBatch(); // 执行批处理
} catch (SQLException e) {
    e.printStackTrace();
}
```

### 事务管理

通过 Connection 对象管理事务，确保数据一致性。

```java
try {
    connection.setAutoCommit(false); // 关闭自动提交

    // 执行多个操作
    statement.executeUpdate("UPDATE account SET balance = balance - 100 WHERE id = 1");
    statement.executeUpdate("UPDATE account SET balance = balance + 100 WHERE id = 2");

    connection.commit(); // 提交事务
} catch (SQLException e) {
    connection.rollback(); // 回滚事务
    e.printStackTrace();
} finally {
    connection.setAutoCommit(true); // 恢复自动提交
}
```

## 4. 总结

- JDBC 是 Java 数据库访问的基础，核心组件包括 DriverManager、Connection、Statement、PreparedStatement 和 ResultSet。

- 通过连接池、PreparedStatement、批量处理和事务管理，可以显著提升 JDBC 的性能和可靠性。

- 虽然 JDBC 提供了最大的灵活性，但在实际开发中，通常会结合 ORM 框架（如 Hibernate、MyBatis）来简化操作。