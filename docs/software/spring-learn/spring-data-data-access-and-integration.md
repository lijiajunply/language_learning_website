# 第七章：数据访问和集成

## 目标

- 理解并掌握 Spring Boot 提供的各种数据访问方式

- 学习如何通过 Spring Data JPA 操作数据库

- 掌握如何与外部系统进行集成，使用 REST、JMS 和其他协议

## 7.1 数据访问概述

在现代应用中，数据访问是核心任务之一。Spring Boot 提供了多种与数据库、消息队列、Web 服务等进行集成的方式。常见的数据库访问方式有：

- JDBC：通过 JDBC 与关系型数据库进行连接，执行 SQL 语句。

- JPA (Java Persistence API)：使用 JPA 进行 ORM（对象关系映射），简化数据库操作。

- Spring Data：提供了一套简化的 API，用于与关系型数据库、NoSQL 数据库等进行交互。

## 7.2 Spring Data JPA

Spring Data JPA 是 Spring Boot 提供的一种 ORM 解决方案，它使得数据持久化层的开发变得非常简便。通过 Spring Data JPA，我们可以通过声明式的方法来操作数据库，而无需编写复杂的 SQL 语句。

### 7.2.1 配置 Spring Data JPA

首先，在 pom.xml 中添加 Spring Data JPA 相关依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>

```

在 application.properties 中配置数据库连接信息：

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

```

### 7.2.2 创建实体类

在 JPA 中，实体类是与数据库表映射的 Java 类。使用 @Entity 注解来标识实体类，并使用 @Id 注解标识主键。

```java
package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
    
    @Id
    private Long id;
    private String name;
    private String email;

    // Getters and Setters
}

```

### 7.2.3 创建 Repository

Spring Data JPA 提供了一个 JpaRepository 接口，供我们操作数据库中的实体对象。我们只需要继承 JpaRepository 接口即可。

```java
package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);
}

```

### 7.2.4 使用 Repository

可以在服务层通过注入 UserRepository 来执行数据库操作。

```java
package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findUserByName(String name) {
        return userRepository.findByName(name);
    }
}

```

### 7.2.5 数据访问方法

Spring Data JPA 提供了许多内置的方法，如 findAll()、save()、deleteById() 等。我们还可以定义自定义查询方法，Spring Data 会自动根据方法名称生成 SQL。

例如，findByName 方法会自动生成查询条件为 name 的 SQL 查询。

## 7.3 数据库迁移和版本控制

随着应用的持续开发，数据库的结构也会发生变化。Spring Boot 提供了两种常见的数据库版本管理工具：

1. Flyway

1. Liquibase

### 7.3.1 Flyway

Flyway 是一个数据库迁移工具，它通过执行版本化的 SQL 脚本来管理数据库的版本。

**添加依赖：**

```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>

```

**配置 Flyway：**

在 application.properties 中配置 Flyway：

```properties
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration

```

在 src/main/resources/db/migration 文件夹中创建 SQL 脚本文件（如 V1__create_user_table.sql）：

```sql
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

```

当应用启动时，Flyway 会自动检查数据库版本并执行未执行的迁移脚本。

## 7.4 Spring JDBC 模板

Spring 提供了一个 JdbcTemplate 类，它简化了使用传统 JDBC 的过程。我们可以通过 JdbcTemplate 来执行 SQL 查询、更新等操作。

### 7.4.1 配置 JDBC

在 pom.xml 中添加 JDBC 依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

```

在 application.properties 中配置数据库连接信息：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/testdb
spring.datasource.username=root
spring.datasource.password=root

```

### 7.4.2 使用 JdbcTemplate 执行查询

```java
package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createUser(String name, String email) {
        String sql = "INSERT INTO user (name, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, name, email);
    }
}

```

## 7.5 Spring 集成其他外部系统

Spring Boot 提供了很多方式来集成其他系统，比如 RESTful 服务、消息队列、外部服务等。

### 7.5.1 RESTful 集成

Spring Boot 支持通过 RestTemplate 或 WebClient 来集成外部的 RESTful 服务。

**使用 RestTemplate 调用外部 RESTful 服务：**

```java
package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExternalService {

    @Autowired
    private RestTemplate restTemplate;

    public String getExternalData() {
        String url = "https://api.example.com/data";
        return restTemplate.getForObject(url, String.class);
    }
}
```

**使用 WebClient（推荐）：**

```java
package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ExternalService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public String getExternalData() {
        return webClientBuilder.baseUrl("https://api.example.com")
                .build()
                .get()
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
```

### 7.5.2 JMS 集成

Spring Boot 还支持通过 JMS（Java Message Service）来与消息队列进行集成。通过配置 spring-boot-starter-activemq 或其他 JMS 实现，可以轻松发送和接收消息。

## 7.6 课后练习

**练习 1：**使用 Spring Data JPA 创建一个 Product 实体类，并编写一个简单的 Repository 类来执行 CRUD 操作。

**练习 2：**使用 Flyway 管理数据库迁移，创建一个初始表并实现简单的数据插入操作。

**练习 3：**编写一个服务类，通过 JdbcTemplate 进行数据库查询，获取并显示用户信息。

**练习 4：**使用 RestTemplate 或 WebClient 调用外部 API，获取并处理返回的数据。

## 课后练习参考代码

```java
// Product Entity
@Entity
public class Product {
    @Id
    private Long id;
    private String name;
    private Double price;
}

// ProductRepository
public interface ProductRepository extends JpaRepository<Product, Long> {}

// Flyway Migration Script (V1__create_product_table.sql)
CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DOUBLE
);

```