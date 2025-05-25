# 深入理解 MyBatis

MyBatis 是一个半自动的 ORM 框架，它将 SQL 语句与 Java 对象进行映射，开发者需要编写 SQL，但 MyBatis 会自动处理结果集与对象的映射。MyBatis 以其灵活性和对 SQL 的精细控制而著称，适合需要直接操作 SQL 的场景。本章将深入探讨 MyBatis 的核心特性，包括 XML 配置、注解方式、动态 SQL，以及如何与 Spring 集成。

## 1. MyBatis 的 XML 配置

MyBatis 的核心配置文件是 mybatis-config.xml，用于配置数据源、事务管理、映射文件等。

1.1 基本配置示例

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 环境配置 -->
    <environments default="development">
        <environment id="development">
            <!-- 事务管理器 -->
            <transactionManager type="JDBC"/>
            <!-- 数据源 -->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mydatabase"/>
                <property name="username" value="root"/>
                <property name="password" value="password"/>
            </dataSource>
        </environment>
    </environments>

    <!-- 映射文件配置 -->
    <mappers>
        <mapper resource="com/example/UserMapper.xml"/>
    </mappers>
</configuration>
```

运行 HTML

1.2 映射文件配置

映射文件（如 UserMapper.xml）用于定义 SQL 语句和结果映射。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.UserMapper">
    <!-- 查询用户 -->
    <select id="selectUser" resultType="com.example.User">
        SELECT * FROM users WHERE id = #{id}
    </select>

    <!-- 插入用户 -->
    <insert id="insertUser" parameterType="com.example.User">
        INSERT INTO users (name, email) VALUES (#{name}, #{email})
    </insert>

    <!-- 更新用户 -->
    <update id="updateUser" parameterType="com.example.User">
        UPDATE users SET name = #{name}, email = #{email} WHERE id = #{id}
    </update>

    <!-- 删除用户 -->
    <delete id="deleteUser" parameterType="int">
        DELETE FROM users WHERE id = #{id}
    </delete>
</mapper>
```

运行 HTML

## 2. MyBatis 的注解方式

MyBatis 支持通过注解方式定义 SQL 语句，无需编写 XML 映射文件。

2.1 基本注解示例

```java
import org.apache.ibatis.annotations.*;

public interface UserMapper {
    @Select("SELECT * FROM users WHERE id = #{id}")
    User selectUser(int id);

    @Insert("INSERT INTO users (name, email) VALUES (#{name}, #{email})")
    void insertUser(User user);

    @Update("UPDATE users SET name = #{name}, email = #{email} WHERE id = #{id}")
    void updateUser(User user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    void deleteUser(int id);
}
```

2.2 注解与 XML 的对比

- 注解方式：适合简单的 SQL 语句，代码简洁，但复杂 SQL 不易维护。

- XML 方式：适合复杂的 SQL 语句，易于维护，但需要额外的 XML 文件。

## 3. MyBatis 的动态 SQL

MyBatis 提供了强大的动态 SQL 功能，可以根据条件动态生成 SQL 语句。

3.1 常用动态 SQL 标签

- `<if>`：根据条件判断是否包含某段 SQL。

- `<choose>、<when>、<otherwise>`：类似于 Java 的 switch-case 语句。

- `<where>`：自动处理 WHERE 子句的前缀。

- `<set>`：自动处理 UPDATE 语句中的逗号

- `<foreach>`：遍历集合，生成 IN 子句。

3.2 动态 SQL 示例

```xml
<select id="selectUsers" resultType="com.example.User">
    SELECT * FROM users
    <where>
        <if test="name != null">
            AND name = #{name}
        </if>
        <if test="email != null">
            AND email = #{email}
        </if>
    </where>
</select>

<update id="updateUser" parameterType="com.example.User">
    UPDATE users
    <set>
        <if test="name != null">name = #{name},</if>
        <if test="email != null">email = #{email},</if>
    </set>
    WHERE id = #{id}
</update>

<select id="selectUsersByIds" resultType="com.example.User">
    SELECT * FROM users
    WHERE id IN
    <foreach collection="ids" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</select>
```

运行 HTML

## 4. MyBatis 与 Spring 的集成

MyBatis 可以与 Spring 无缝集成，简化配置和管理。

4.1 添加依赖

在 pom.xml 中添加 MyBatis 和 Spring 的依赖：

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.7</version>
</dependency>
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.6</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.10</version>
</dependency>
```

运行 HTML

4.2 Spring 配置

在 Spring 配置文件中配置 MyBatis 的数据源和 SqlSessionFactory。

```xml
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mydatabase"/>
    <property name="username" value="root"/>
    <property name="password" value="password"/>
</bean>

<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="mapperLocations" value="classpath*:com/example/*Mapper.xml"/>
</bean>

<bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
    <property name="mapperInterface" value="com.example.UserMapper"/>
    <property name="sqlSessionFactory" ref="sqlSessionFactory"/>
</bean>
```

运行 HTML

4.3 在 Spring 中使用 MyBatis

通过 Spring 注入 Mapper 接口，直接调用数据库操作。

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public User getUserById(int id) {
        return userMapper.selectUser(id);
    }

    public void addUser(User user) {
        userMapper.insertUser(user);
    }
}
```

#### 5. 总结

- MyBatis 通过 XML 或注解方式定义 SQL 语句，提供了灵活的数据库操作方式。

- 动态 SQL 功能可以根据条件动态生成 SQL 语句，适合复杂查询。

- MyBatis 与 Spring 的集成简化了配置和管理，适合在 Spring 项目中使用。