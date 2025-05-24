# 第六章：Spring Boot

## 目标

- 理解并掌握 Spring Boot 的自动配置原理及应用

- 学习如何快速通过 Spring Boot 构建 Web 应用

- 掌握常用注解及配置方式

## 6.1 Spring Boot 简介

**什么是 Spring Boot？**

Spring Boot 是一个基于 Spring 框架的开源项目，旨在简化 Spring 应用的配置和部署。它通过自动配置、嵌入式服务器、起步依赖等机制，让开发者能够更快速地构建 Spring 应用，而无需大量的配置和繁琐的 XML 文件。

**Spring Boot 的主要特点：**

- 自动配置： 自动配置 Spring 应用的各个组件，无需手动配置。

- 内嵌服务器： Spring Boot 提供 Tomcat、Jetty 等嵌入式 Web 服务器，不需要将应用部署到外部服务器。

- 起步依赖（Starters）： 提供预定义的依赖集，帮助开发者快速集成常用功能。

- Actuator： 用于监控和管理应用的健康状态和性能指标。

- 快速开发： 使用约定优于配置的原则，减少了应用的配置复杂度。

## 6.2 搭建第一个 Spring Boot 项目

**使用 Spring Initializr 创建项目：**

Spring Initializr 是一个可以快速生成 Spring Boot 项目的在线工具，可以选择项目构建工具（Maven 或 Gradle）、Spring Boot 版本、依赖项等。

步骤：

1. 访问 

1. 选择项目类型（Maven/Gradle）

1. 输入项目的基本信息（如 Group、Artifact、Name 等）

1. 选择需要的依赖（如 Spring Web、Spring Boot DevTools 等）

生成并下载项目后，可以在 IDE（如 IntelliJ IDEA）中打开。

**项目结构：**

- src/main/java：包含 Java 源代码。

- src/main/resources：存放资源文件（如配置文件、模板文件等）。

- src/test/java：包含测试代码。

**示例代码：一个简单的 Spring Boot 应用**

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
class HelloWorldController {
    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}

```

**运行应用：**

- 运行 DemoApplication 类，访问 

## 6.3 构建一个简单的 RESTful API

**创建 REST 控制器：**

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/users")
    public String getUser(@RequestParam String name) {
        return "Hello, " + name + "!";
    }
}

```

**测试 REST API：**

- 使用 Postman 或浏览器访问 

## 6.4 Spring Boot 自动配置原理

**自动配置：**Spring Boot 的自动配置是基于 @EnableAutoConfiguration 注解的，它会根据应用的类路径、环境配置等信息自动推测应用需要的配置，从而减少开发人员的配置工作。

Spring Boot 通过条件注解（如 @ConditionalOnClass 和 @ConditionalOnMissingBean）决定是否加载特定的 Bean。

**查看自动配置：**

- Spring Boot 提供了 spring-boot-starter-actuator 依赖来监控和管理应用，查看应用的自动配置情况。

在 application.properties 中启用 Actuator：

```properties
management.endpoints.web.exposure.include=*

```

然后访问 `http://localhost:8080/actuator/beans`，查看当前自动配置的 Bean。

## 6.5 Spring Boot 常用注解与应用

**常用注解：**

1. @SpringBootApplication：

	- 该注解是 Spring Boot 应用的入口点，包含了 @Configuration、@EnableAutoConfiguration 和 @ComponentScan，用于启用配置、自动配置和组件扫描。

1. @RestController 和 @RequestMapping：

	- @RestController 用于定义一个控制器，处理 HTTP 请求。

	- @RequestMapping 用于定义请求路径和方法类型（如 GET、POST）。

```java
@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}

```

1. @Value：

	- 用于从配置文件中注入值。

```java
@Value("${app.name}")
private String appName;

```

1. @ConfigurationProperties：

	- 将配置文件的属性绑定到一个 Java Bean 上，简化配置文件的使用。

```java
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private String version;
    // getters and setters
}

```

## 6.6 Spring Boot 与 Spring MVC 整合

**Spring MVC 组件：**Spring Boot 和 Spring MVC 的整合使得 Web 应用的开发变得更加简单。Spring Boot 自动配置了 DispatcherServlet、ViewResolver 和其他必要的 Web 组件。

**简单的 Spring MVC 应用：**

```java
@Controller
public class WebController {
    @RequestMapping("/home")
    public String home() {
        return "index";  // 返回视图名
    }
}

```

**使用 Thymeleaf 作为视图模板：**在 pom.xml 中加入 Thymeleaf 依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

```

创建一个 index.html 文件：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Spring Boot Example</title>
</head>
<body>
    <h1>Welcome to Spring Boot!</h1>
</body>
</html>

```

## 6.7 Spring Boot 应用打包与部署

**打包应用：**Spring Boot 提供了 spring-boot-maven-plugin 来打包应用，将项目打包成一个可执行 JAR 文件。

在 pom.xml 中配置插件：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>

```

执行 mvn clean package 打包项目。

**部署与运行：**

- 通过 java -jar target/demo-0.0.1-SNAPSHOT.jar 启动应用。

## 6.8 Spring Boot 的优势

**Spring Boot 的主要优势：**

1. 简化配置：

自动配置减少了开发者的配置工作，很多配置可以由 Spring Boot 根据应用的依赖自动完成。

1. 快速开发：

使用 Spring Boot 创建一个项目比传统的 Spring 项目要快，避免了繁琐的 XML 配置。

1. 开箱即用：

起步依赖让开发者能够在没有大量配置的情况下集成常用的功能。

1. 嵌入式 Web 服务器：

内嵌的 Tomcat、Jetty 等服务器不需要单独配置，简化了部署过程。

1. 生产就绪：

Spring Boot Actuator 提供了生产环境下必需的监控和管理功能。

## 6.9 课后练习

**练习 1：**

创建一个 Spring Boot 应用，提供一个 RESTful API 接口，实现用户信息查询功能，支持通过 GET 请求传递参数（如用户名、年龄等）。

**练习 2：**

使用 @Value 和 application.properties 配置文件，在 Spring Boot 应用中读取配置项并展示在首页。

**练习 3：**

通过 Spring Boot 构建一个简单的 Web 应用，使用 Thymeleaf 作为视图模板，并创建一个动态表单提交页面。