# 你应该知道的 JPA

JPA（Java Persistence API）是 Java EE（现为 Jakarta EE）提供的一套 ORM（对象关系映射）规范，旨在简化数据库操作。Spring Data JPA 是基于 JPA 规范的进一步封装，提供了更高级的抽象和便利功能。本章将分为三部分：首先介绍 JPA 规范，然后概述常见的 JPA 实现框架，最后重点介绍 Spring Data JPA 及其特色。

## 1. JPA 规范简介

JPA 是一套标准的 ORM 规范，定义了如何将 Java 对象映射到关系型数据库中的表，并提供了一套统一的 API 来操作数据库。以下是 JPA 规范的核心内容：

1.1 实体类（Entity）

实体类是映射到数据库表的 Java 类，使用 @Entity 注解标记。

```java
import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    // Getters and Setters
}
```

- @Entity：标记类为实体类。

- @Table：指定映射的数据库表。

- @Id：标记主键字段。

- @GeneratedValue：指定主键生成策略。

- @Column：指定字段与数据库列的映射。

1.2 实体管理器（EntityManager）

EntityManager 是 JPA 的核心接口，用于管理实体的生命周期和执行数据库操作。

```java
import javax.persistence.*;

public class UserService {
    @PersistenceContext
    private EntityManager entityManager;

    public User findUserById(Long id) {
        return entityManager.find(User.class, id);
    }

    public void saveUser(User user) {
        entityManager.persist(user);
    }
}
```

- persist()：将实体对象持久化到数据库。

- find()：根据主键查询实体对象。

- merge()：更新实体对象。

- remove()：删除实体对象。

1.3 JPQL（Java Persistence Query Language）

JPQL 是 JPA 提供的面向对象的查询语言，类似于 SQL，但操作的是实体类和属性。

```java
String jpql = "SELECT u FROM User u WHERE u.name = :name";
TypedQuery<User> query = entityManager.createQuery(jpql, User.class);
query.setParameter("name", "Alice");
List<User> users = query.getResultList();
```

1.4 实体生命周期

JPA 实体的生命周期包括以下状态：

- 新建（New）：对象刚创建，未与 EntityManager 关联。

- 托管（Managed）：对象被 EntityManager 管理，处于持久化上下文中。

- 游离（Detached）：对象与 EntityManager 断开连接，但仍存在于数据库中。

- 删除（Removed）：对象被标记为删除，将在事务提交时从数据库中删除。

1.5 关系映射

JPA 支持实体类之间的多种关系映射，包括一对一、一对多、多对一和多对多。

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;
}

@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
```

## 2. JPA 实现框架概览

JPA 规范需要具体的实现框架来提供功能。以下是一些常见的 JPA 实现框架：

2.1 Hibernate

- 最流行的 JPA 实现框架。

- 提供了丰富的功能，如缓存、延迟加载、批量处理等。

- 支持 JPA 规范，同时也提供了自己的扩展功能（如 HQL、Criteria API）。

2.2 EclipseLink

- Eclipse 基金会开发的 JPA 实现。

- 功能强大，支持 JPA 规范以及 EclipseLink 的扩展功能。

- 常用于 Java EE 应用服务器（如 GlassFish）。

2.3 OpenJPA

- Apache 开发的 JPA 实现。

- 提供了对 JPA 规范的支持，适合需要高度定制化的场景。

2.4 DataNucleus

- 支持 JPA 规范，同时也支持 JDO（Java Data Objects）规范。

- 适用于需要同时支持关系型数据库和非关系型数据库的场景。

## 3. Spring Data JPA 及其特色

Spring Data JPA 是基于 JPA 规范的进一步封装，旨在简化数据访问层的开发。以下是 Spring Data JPA 的核心特色：

3.1 Repository 接口

Spring Data JPA 提供了 Repository 接口，开发者只需定义接口即可完成数据库操作。

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
}
```

- JpaRepository：提供了常用的 CRUD 操作方法。

- 方法名自动生成查询：如 findByName(String name)。

3.2 方法名自动生成查询

Spring Data JPA 支持根据方法名自动生成查询，无需编写 SQL 或 JPQL。

```java
List<User> findByNameAndEmail(String name, String email);
```

3.3 分页和排序

Spring Data JPA 提供了对分页和排序的内置支持。

```java
Page<User> findAll(Pageable pageable);
List<User> findAll(Sort sort);
```

3.4 与 Spring 的集成

Spring Data JPA 与 Spring 生态无缝集成，支持依赖注入和事务管理。

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findUsersByName(String name) {
        return userRepository.findByName(name);
    }
}
```

3.5 自定义查询

Spring Data JPA 支持通过 @Query 注解定义自定义查询。

```java
@Query("SELECT u FROM User u WHERE u.email LIKE %:email%")
List<User> findByEmailContaining(@Param("email") String email);
```

## 4. 总结

- JPA 规范：定义了标准的 ORM 接口和注解，旨在简化数据库操作。

- JPA 实现框架：如 Hibernate、EclipseLink 等，提供了对 JPA 规范的具体实现。

- Spring Data JPA：基于 JPA 规范的进一步封装，提供了 Repository 接口、方法名查询、分页排序等高级功能，极大地简化了数据访问层的开发。