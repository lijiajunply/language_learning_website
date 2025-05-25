# 分页和排序

**分页和排序** 是 Spring Data JPA 中非常实用的功能，特别适合处理大量数据时的分页显示和排序需求。Spring Data JPA 通过 Pageable 和 Sort 参数，提供了对分页和排序的内置支持。以下是一个详细的示例说明：

## 1. **分页和排序的核心类**

- Pageable：用于分页查询，包含分页信息（如页码、每页大小）和排序信息。

- Page：分页查询的结果，包含数据列表、总页数、总记录数等信息。

- Sort：用于排序查询，指定排序字段和排序方向（升序或降序）。

## 2. **分页和排序的示例**

### 2.1 实体类

假设我们有一个 User 实体类：

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private int age;

    // Getters and Setters
}
```

### 2.2 Repository 接口

在 Repository 接口中，定义一个支持分页和排序的查询方法：

```java
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // 分页查询所有用户
    Page<User> findAll(Pageable pageable);

    // 根据名称分页查询用户
    Page<User> findByName(String name, Pageable pageable);

    // 根据年龄分页查询用户，并按照名称排序
    Page<User> findByAge(int age, Pageable pageable);
}
```

### 2.3 使用分页和排序

在 Service 层中，使用 Pageable 和 Sort 实现分页和排序。

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /**
     * 分页查询所有用户
     *
     * @param page 页码（从 0 开始）
     * @param size 每页大小
     * @return 分页结果
     */
    public Page<User> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    /**
     * 根据名称分页查询用户
     *
     * @param name 名称
     * @param page 页码（从 0 开始）
     * @param size 每页大小
     * @return 分页结果
     */
    public Page<User> getUsersByName(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findByName(name, pageable);
    }

    /**
     * 根据年龄分页查询用户，并按照名称升序排序
     *
     * @param age  年龄
     * @param page 页码（从 0 开始）
     * @param size 每页大小
     * @return 分页结果
     */
    public Page<User> getUsersByAgeWithSort(int age, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.ASC, "name"); // 按照名称升序排序
        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findByAge(age, pageable);
    }

    /**
     * 根据年龄分页查询用户，并按照多个字段排序
     *
     * @param age  年龄
     * @param page 页码（从 0 开始）
     * @param size 每页大小
     * @return 分页结果
     */
    public Page<User> getUsersByAgeWithMultiSort(int age, int page, int size) {
        Sort sort = Sort.by(Sort.Direction.ASC, "name") // 按照名称升序排序
                       .and(Sort.by(Sort.Direction.DESC, "age")); // 按照年龄降序排序
        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findByAge(age, pageable);
    }
}
```

### 2.4 控制器层（Controller）

在控制器层中调用 Service 方法，并返回分页结果。

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public Page<User> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return userService.getAllUsers(page, size);
    }

    @GetMapping("/search")
    public Page<User> getUsersByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return userService.getUsersByName(name, page, size);
    }

    @GetMapping("/age")
    public Page<User> getUsersByAgeWithSort(
            @RequestParam int age,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return userService.getUsersByAgeWithSort(age, page, size);
    }

    @GetMapping("/age/multi-sort")
    public Page<User> getUsersByAgeWithMultiSort(
            @RequestParam int age,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return userService.getUsersByAgeWithMultiSort(age, page, size);
    }
}
```

## 3. **分页和排序的结果**

### 3.1 分页结果（Page 对象）

Page 对象包含以下信息：

- content：当前页的数据列表。

- totalPages：总页数。

- totalElements：总记录数。

- number：当前页码（从 0 开始）。

- size：每页大小。

- sort：排序信息。

### 3.2 示例输出

假设数据库中有 100 条用户记录，每页显示 10 条，查询第 2 页的结果如下：

```json
{
  "content": [
    { "id": 11, "name": "User11", "email": "user11@example.com", "age": 25 },
    { "id": 12, "name": "User12", "email": "user12@example.com", "age": 30 },
    ...
  ],
  "totalPages": 10,
  "totalElements": 100,
  "number": 1,
  "size": 10,
  "sort": [
    { "property": "name", "direction": "ASC" }
  ]
}
```

## 4. **总结**

- 分页：通过 Pageable 和 PageRequest 实现分页查询。

- 排序：通过 Sort 指定排序字段和方向。

- 分页结果：Page 对象包含分页数据和元信息（如总页数、总记录数）。

- 多字段排序：可以通过 Sort.by() 链式调用实现多字段排序。

Spring Data JPA 的分页和排序功能非常强大且易于使用，适合处理大量数据的分页显示和排序需求。