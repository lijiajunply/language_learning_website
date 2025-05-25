# Spring Data JPA 功能全面覆盖

## 1. **Repository 接口**

Spring Data JPA 提供了多种 Repository 接口，开发者可以根据需求选择：

- CrudRepository：提供基本的 CRUD 操作。

- PagingAndSortingRepository：在 CrudRepository 的基础上增加了分页和排序功能。

- JpaRepository：最常用的接口，继承了 CrudRepository 和 PagingAndSortingRepository，并增加了 JPA 特定的功能（如批量删除）。

```java
public interface UserRepository extends JpaRepository<User, Long> {
    // 自定义方法
}
```

## 2. **方法名自动生成查询**

Spring Data JPA 支持根据方法名自动生成查询，无需编写 SQL 或 JPQL。规则如下：

- 基本查询：findBy、readBy、queryBy、getBy。

- 条件查询：findByNameAndEmail、findByAgeGreaterThan 等。

- 排序和分页：findAll(Sort sort)、findAll(Pageable pageable)。

```java
List<User> findByName(String name);
List<User> findByNameAndEmail(String name, String email);
Page<User> findByAgeGreaterThan(int age, Pageable pageable);
```

## 3. **自定义查询**

通过 @Query 注解，开发者可以定义复杂的 JPQL 或原生 SQL 查询。

3.1 JPQL 查询

```java
@Query("SELECT u FROM User u WHERE u.email LIKE %:email%")
List<User> findByEmailContaining(@Param("email") String email);
```

3.2 原生 SQL 查询

```java
@Query(value = "SELECT * FROM users WHERE email LIKE %:email%", nativeQuery = true)
List<User> findByEmailContainingNative(@Param("email") String email);
```

3.3 修改查询

通过 @Modifying 注解标记修改操作（如 UPDATE、DELETE）。

```java
@Modifying
@Query("UPDATE User u SET u.name = :name WHERE u.id = :id")
int updateUserName(@Param("id") Long id, @Param("name") String name);
```

## 4. **分页和排序**

Spring Data JPA 提供了对分页和排序的内置支持。

4.1 分页查询

```
Page<User> findAll(Pageable pageable);
```

4.2 排序查询

```
List<User> findAll(Sort sort);
```

4.3 分页和排序结合

```
Page<User> findByName(String name, Pageable pageable);
```

## 5. **动态查询**

Spring Data JPA 支持通过 Specification 和 Querydsl 实现动态查询。

5.1 使用 Specification

```java
public class UserSpecifications {
    public static Specification<User> nameLike(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }
}

List<User> users = userRepository.findAll(UserSpecifications.nameLike("Alice"));
```

5.2 使用 Querydsl

Querydsl 提供了类型安全的查询方式，适合复杂查询场景。

```
QUser user = QUser.user;
List<User> users = userRepository.findAll(user.name.eq("Alice"));
```

## 6. **事务管理**

Spring Data JPA 与 Spring 的事务管理无缝集成，支持声明式事务管理。

```
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void updateUser(Long id, String name) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(name);
        userRepository.save(user);
    }
}
```

## 7. **审计功能**

Spring Data JPA 提供了审计功能，可以自动记录实体的创建时间、修改时间等。

7.1 启用审计

```
@Configuration
@EnableJpaAuditing
public class JpaConfig {
    @Bean
    public AuditorAware<String> auditorAware() {
        return () -> Optional.of("System"); // 返回当前用户或系统标识
    }
}
```

7.2 实体类配置

```
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

## 8. **投影（Projection）**

Spring Data JPA 支持投影功能，允许只查询部分字段。

8.1 接口投影

```
public interface UserNameOnly {
    String getName();
}

List<UserNameOnly> findByName(String name);
```

8.2 类投影

```
public class UserDTO {
    private String name;
    private String email;

    public UserDTO(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters and Setters
}

@Query("SELECT new com.example.UserDTO(u.name, u.email) FROM User u WHERE u.name = :name")
List<UserDTO> findUserDTOByName(@Param("name") String name);
```

## 9. **多数据源支持**

Spring Data JPA 支持配置多个数据源，适用于需要连接多个数据库的场景。

9.1 配置多数据源

```
@Configuration
@EnableJpaRepositories(
    basePackages = "com.example.primary",
    entityManagerFactoryRef = "primaryEntityManagerFactory",
    transactionManagerRef = "primaryTransactionManager"
)
public class PrimaryDataSourceConfig {
    // 配置主数据源
}

@Configuration
@EnableJpaRepositories(
    basePackages = "com.example.secondary",
    entityManagerFactoryRef = "secondaryEntityManagerFactory",
    transactionManagerRef = "secondaryTransactionManager"
)
public class SecondaryDataSourceConfig {
    // 配置从数据源
}
```

## 10. **总结**

Spring Data JPA 的功能非常丰富，涵盖了从基础的 CRUD 操作到高级的动态查询、审计、投影等特性。通过合理使用这些功能，开发者可以极大地简化数据访问层的开发，并提高代码的可维护性和性能。