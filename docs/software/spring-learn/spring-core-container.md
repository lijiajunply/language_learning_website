# **第三章：Spring 核心容器（Core Container）**

## **1. 依赖注入（DI）与控制反转（IoC）**

- 控制反转（IoC）

	- IoC 是一种设计原则，将对象的创建和依赖关系的管理交给容器，而不是由开发者手动管理。

	- Spring 通过 IoC 容器（如 ApplicationContext）实现这一原则。

- 依赖注入（DI）

	- DI 是 IoC 的一种实现方式，容器负责将依赖关系注入到对象中。

	- 常见的注入方式：

		- 构造器注入：通过构造函数注入依赖。

		- Setter 注入：通过 Setter 方法注入依赖。

		- 字段注入：通过 @Autowired 注解直接注入字段（不推荐，因为不利于测试）。

- 代码示例

```java
// 定义一个服务类
@Service
public class UserService {
    private final UserRepository userRepository;

    // 构造器注入
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void printUser() {
        System.out.println("User: " + userRepository.getUser());
    }
}

// 定义一个仓库类
@Repository
public class UserRepository {
    public String getUser() {
        return "John Doe";
    }
}
```

## **2. Bean 管理、生命周期与作用域**

- Bean 是什么

	- Bean 是 Spring 容器管理的对象，通常通过注解（如 @Component、@Service）或 XML 配置定义。

- Bean 的生命周期

	- 实例化：容器创建 Bean 实例。

	- 属性赋值：容器注入依赖。

	- 初始化：调用 @PostConstruct 注解的方法或实现 InitializingBean 接口。

	- 使用：Bean 可以被应用程序使用。

	- 销毁：调用 @PreDestroy 注解的方法或实现 DisposableBean 接口。

- Bean 的作用域

	- Singleton（默认）：每个 Spring 容器中只有一个 Bean 实例。

	- Prototype：每次请求时都会创建一个新的 Bean 实例。

	- Request：每个 HTTP 请求创建一个 Bean 实例（仅适用于 Web 应用）。

	- Session：每个 HTTP Session 创建一个 Bean 实例（仅适用于 Web 应用）。

	- Global Session：用于 Portlet 应用。

- 代码示例

```java
@Component
@Scope("prototype") // 指定作用域为 Prototype
public class PrototypeBean {
    private static int count = 0;

    public PrototypeBean() {
        count++;
        System.out.println("PrototypeBean created: " + count);
    }
}

@Component
public class SingletonBean {
    private static int count = 0;

    public SingletonBean() {
        count++;
        System.out.println("SingletonBean created: " + count);
    }
}
```

## **3. ApplicationContext 与 BeanFactory 的区别与应用**

- BeanFactory

	- 是 Spring 最基础的 IoC 容器，提供基本的依赖注入功能。

	- 懒加载（Lazy Loading）：Bean 在第一次使用时才会被创建。

- ApplicationContext

	- 是 BeanFactory 的扩展，提供了更多企业级功能（如国际化、事件发布、AOP 等）。

	- 立即加载（Eager Loading）：容器启动时就会创建所有单例 Bean。

- 常用实现类

	- AnnotationConfigApplicationContext：基于注解配置的 ApplicationContext。

	- ClassPathXmlApplicationContext：基于 XML 配置的 ApplicationContext。

- 代码示例

```java
// 使用 AnnotationConfigApplicationContext
public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        UserService userService = context.getBean(UserService.class);
        userService.printUser();
    }
}
```

## **练习：Spring 核心容器实战**

### **练习目标**

通过编写代码，深入理解 Spring 核心容器的功能，包括依赖注入、Bean 生命周期和作用域。

### **练习步骤**

1. 创建项目

	- 使用 Spring Initializr 创建一个新的 Spring Boot 项目，添加 Spring Web 依赖。

1. 实现依赖注入

	- 创建一个 UserService 类和一个 UserRepository 类，使用构造器注入实现依赖注入。

	- 在 UserService 中调用 UserRepository 的方法，并输出结果。

1. 测试 Bean 作用域

	- 创建一个 PrototypeBean 和一个 SingletonBean，分别设置作用域为 prototype 和 singleton。

	- 在 MainApp 中多次获取这两个 Bean，观察输出结果。

1. 测试 Bean 生命周期

	- 在 PrototypeBean 和 SingletonBean 中添加 @PostConstruct 和 @PreDestroy 方法，观察它们的调用时机。

1. 使用 ApplicationContext

	- 在 MainApp 中使用 AnnotationConfigApplicationContext 获取 Bean 并调用方法。

### **参考代码**

```java
// UserService.java
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void printUser() {
        System.out.println("User: " + userRepository.getUser());
    }
}

// UserRepository.java
@Repository
public class UserRepository {
    public String getUser() {
        return "John Doe";
    }
}

// PrototypeBean.java
@Component
@Scope("prototype")
public class PrototypeBean {
    private static int count = 0;

    public PrototypeBean() {
        count++;
        System.out.println("PrototypeBean created: " + count);
    }

    @PostConstruct
    public void init() {
        System.out.println("PrototypeBean initialized");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("PrototypeBean destroyed");
    }
}

// SingletonBean.java
@Component
public class SingletonBean {
    private static int count = 0;

    public SingletonBean() {
        count++;
        System.out.println("SingletonBean created: " + count);
    }

    @PostConstruct
    public void init() {
        System.out.println("SingletonBean initialized");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("SingletonBean destroyed");
    }
}

// MainApp.java
public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        // 测试依赖注入
        UserService userService = context.getBean(UserService.class);
        userService.printUser();

        // 测试 Bean 作用域
        PrototypeBean prototypeBean1 = context.getBean(PrototypeBean.class);
        PrototypeBean prototypeBean2 = context.getBean(PrototypeBean.class);

        SingletonBean singletonBean1 = context.getBean(SingletonBean.class);
        SingletonBean singletonBean2 = context.getBean(SingletonBean.class);

        // 关闭容器，观察 Bean 销毁
        ((AnnotationConfigApplicationContext) context).close();
    }
}
```

## **练习总结**

通过完成这个练习，你将：

1. 掌握 Spring 的依赖注入和控制反转机制。

1. 理解 Bean 的生命周期和作用域。

1. 学会使用 ApplicationContext 管理 Bean。