# Repository模式理论&实现

## Repository模式概述

### 什么是Repository模式？

Repository模式是一种面向领域驱动设计（DDD）的数据访问模式，它在应用程序与数据源（数据库、API等）之间提供了一个抽象层，封装了数据的存取逻辑。

### Repository模式的核心思想

- 将数据访问逻辑封装到专门的Repository类中，而非直接在业务逻辑代码中操作数据库。

- 通过Repository提供统一的接口，使业务逻辑无需关心底层数据库访问方式。

- 促进单一职责原则（SRP），增强代码的可维护性和可测试性。

## Repository模式的优势

- 降低耦合

：业务逻辑代码无需直接操作数据库，只需与Repository交互。

- 提高可测试性

：可以轻松地使用Mock对象进行单元测试。

- 增强可维护性

：数据库操作代码集中在Repository中，方便维护和替换。

- 支持不同的持久化技术

：可适配JPA、Hibernate、MyBatis、JDBC等多种数据访问技术。

## Repository模式的接口和设计逻辑

### 定义通用的Repository接口

```
public interface Repository<T, ID> {
    T findById(ID id);
    List<T> findAll();
    void save(T entity);
    void update(T entity);
    void delete(ID id);
}
```

该接口定义了基本的数据访问操作，所有具体的Repository实现都可以继承这个接口。

### 创建具体的实体Repository接口

假设我们有一个User实体类，我们可以定义一个UserRepository接口继承通用的Repository接口。

```
public interface UserRepository extends Repository<User, Long> {
    User findByUsername(String username);
}
```

这使得UserRepository不仅继承了基础的CRUD操作，还可以扩展特定于用户的查询方法。

### Repository 模式的实现逻辑

在使用Repository模式时，通常遵循以下设计逻辑：

1. 定义抽象Repository接口

，统一数据访问方法。

1. 创建具体的Repository接口

，根据业务需求添加个性化方法。

1. 实现Repository接口

，具体实现数据访问逻辑（JPA、MyBatis等）。

1. 在业务层使用Repository

，调用方法进行数据操作，而不直接操作数据库。

在此基础上，我们可以使用不同的数据访问技术来实现该模式，如Spring Data JPA和MyBatis。

## 在Spring Data JPA中的Repository实现

### Spring Data JPA简介

Spring Data JPA 是 Spring 提供的一套基于 JPA 规范的持久层框架，它极大地简化了Repository的实现。

### 定义一个基础Repository接口

```
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 自动提供基本的CRUD方法
    User findByUsername(String username);
}
```

### 自定义查询

Spring Data JPA 支持使用方法名称派生查询，也可以使用 @Query 注解自定义SQL：

```java
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmail(@Param("email") String email);
}
```

## 在MyBatis中实现Repository模式

### 使用Mapper接口

```java
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE username = #{username}")
    User findByUsername(String username);
}
```

### 使用XML配置

```xml
<mapper namespace="com.example.mapper.UserMapper">
    <select id="findByUsername" resultType="com.example.entity.User">
        SELECT * FROM users WHERE username = #{username}
    </select>
</mapper>
```

## 造轮子：使用MyBatis实现Repository模式

如果没有Spring Data JPA，我们可以手动实现一个Repository。

### 定义Repository接口

```java
public interface UserRepository {
    User findByUsername(String username);
    void save(User user);
}
```

### 实现Repository

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User findByUsername(String username) {
        return userMapper.findByUsername(username);
    }

    @Override
    public void save(User user) {
        userMapper.insert(user);
    }
}
```

## 结论

Repository模式是一种强大的数据访问模式，在Spring Data JPA和MyBatis等框架中均有成熟的实现。它能够降低代码耦合，提高可维护性，使应用程序的数据访问更加清晰和可测试。