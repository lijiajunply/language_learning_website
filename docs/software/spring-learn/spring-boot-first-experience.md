# **第二章：Spring Boot 初体验**

## **1. 搭建第一个 Spring Boot 项目**

Spring Boot 的核心目标是简化 Spring 应用的初始搭建和开发过程。以下是搭建第一个 Spring Boot 项目的步骤：

- 使用 Spring Initializr 创建项目

	- 访问 

	- 选择项目类型（Maven 或 Gradle）。

	- 选择 Spring Boot 版本（推荐使用最新稳定版）。

	- 添加依赖（如 Spring Web、Spring Boot DevTools 等）。

	- 生成项目并下载到本地。

- 项目结构

	- src/main/java：Java 源代码目录。

	- src/main/resources：配置文件、静态资源等。

	- src/test/java：测试代码目录。

	- pom.xml 或 build.gradle：项目依赖管理文件。

- 运行项目

	- 使用 IDE（如 IntelliJ IDEA 或 Eclipse）导入项目。

	- 运行 Application 类中的 main 方法，启动 Spring Boot 应用。

## **2. 构建一个简单的 RESTful API**

Spring Boot 提供了快速构建 RESTful API 的能力。以下是一个简单的示例：

- 创建 Controller

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, Spring Boot!";
    }
}
```

- 启动应用并测试

	- 启动应用后，访问 

	- 页面会返回 Hello, Spring Boot!。

- 热部署

	- 添加 spring-boot-devtools 依赖，实现代码修改后自动重启。

- 常用注解说明

	- @RestController：标记一个类为控制器，处理 HTTP 请求，并直接返回数据（通常是 JSON 或 XML）。

	- @RequestMapping：映射 HTTP 请求路径到控制器方法。可以用在类或方法上。

	- @GetMapping：专门用于处理 HTTP GET 请求的快捷注解。

	- @PostMapping、@PutMapping、@DeleteMapping：分别用于处理 POST、PUT、DELETE 请求。

	- @RequestParam：用于从请求参数中提取值。

	- @PathVariable：用于从 URL 路径中提取变量值。

- 对象映射

	- Spring Boot 默认使用 Jackson 库将 Java 对象自动转换为 JSON 格式（或从 JSON 转换为 Java 对象）。

	- 示例：

```java
@GetMapping("/user")
public User getUser() {
    return new User(1, "John", "Doe");
}
```

返回的 JSON 数据：

```json
{
    "id": 1,
    "firstName": "John",
    "lastName": "Doe"
}
```

## **3. 打包与部署**

Spring Boot 支持将应用打包为可执行的 JAR 或 WAR 文件，方便部署。

- 打包为 JAR 文件

	- 使用 Maven 命令：mvn clean package。

	- 打包后会在 target 目录下生成一个可执行的 JAR 文件。

	- 运行 JAR 文件：java -jar target/your-project-name.jar。

- 打包为 WAR 文件

	- 修改 pom.xml，将打包方式改为 war：

```
<packaging>war</packaging>
```

运行 HTML

	- 修改 Application 类，继承 SpringBootServletInitializer：

```java
@SpringBootApplication
public class Application extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

	- 使用 Maven 命令打包：mvn clean package。

	- 将生成的 WAR 文件部署到 Tomcat 或其他 Servlet 容器中。

## **补充：常用注解速查表**

| 注解 | 说明 | 
| -- | -- |
| @SpringBootApplication | 标记主启动类，包含@Configuration、@EnableAutoConfiguration和@ComponentScan | 
| @RestController | 标记类为控制器，处理 HTTP 请求并返回数据。 | 
| @RequestMapping | 映射 HTTP 请求路径到控制器方法。 | 
| @GetMapping | 处理 HTTP GET 请求。 | 
| @PostMapping | 处理 HTTP POST 请求。 | 
| @PutMapping | 处理 HTTP PUT 请求。 | 
| @DeleteMapping | 处理 HTTP DELETE 请求。 | 
| @RequestParam | 从请求参数中提取值。 | 
| @PathVariable | 从 URL 路径中提取变量值。 | 
| @Autowired | 自动注入依赖的 Bean。 | 
| @Component | 标记一个类为 Spring 组件（Bean）。 | 
| @Service | 标记一个类为服务层组件。 | 
| @Repository | 标记一个类为数据访问层组件。 | 


## **本章小结**

通过本章的学习，你应该能够：

1. 使用 Spring Initializr 快速创建 Spring Boot 项目。

1. 编写一个简单的 RESTful API 并运行。

1. 理解 Spring Boot 中常用的注解及其作用。

1. 将 Spring Boot 项目打包为 JAR 或 WAR 文件，并部署到服务器。