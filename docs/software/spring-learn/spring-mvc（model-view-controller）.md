# **第五章：Spring MVC（Model-View-Controller）**

## **1. 什么是 MVC？**

- MVC 的定义

	- MVC（Model-View-Controller）是一种软件设计模式，用于将应用程序的逻辑分为三个核心组件：

		- Model（模型）：负责管理应用程序的数据和业务逻辑。

		- View（视图）：负责数据的展示和用户界面。

		- Controller（控制器）：负责接收用户输入，协调 Model 和 View 之间的交互。

- MVC 的组成

	- Model：

		- 封装应用程序的核心数据。

		- 提供数据的访问和修改方法。

		- 不直接与用户交互。

	- View：

		- 负责将数据渲染为用户可见的界面（如 HTML 页面）。

		- 从 Model 中获取数据，但不直接修改数据。

	- Controller：

		- 接收用户输入（如 HTTP 请求）。

		- 调用 Model 处理业务逻辑。

		- 选择适当的 View 来渲染数据。

## **2. MVC 解决了什么问题？**

- 问题背景

	- 在传统的 Web 应用程序中，业务逻辑、数据访问和用户界面代码通常混杂在一起，导致代码难以维护和扩展。

	- 随着应用程序规模的增长，这种紧耦合的设计会导致代码重复、可读性差、测试困难等问题。

- MVC 的解决方案

	- 分离关注点：将应用程序分为 Model、View 和 Controller，每个部分只关注自己的职责。

	- 提高可维护性：通过清晰的职责划分，使代码更易于理解和修改。

	- 增强可扩展性：可以独立修改 Model、View 或 Controller，而不会影响其他部分。

	- 便于测试：Model 和 Controller 可以单独测试，而不需要依赖用户界面。

## **3. 一个 MVC 框架应该具备哪些功能？**

- 路由映射

	- 将请求 URL 映射到对应的控制器方法。

	- 支持 RESTful 风格的 URL 设计。

- 请求处理

	- 解析请求参数、路径变量、请求体等数据。

	- 支持多种数据格式（如表单数据、JSON、XML）。

- 视图渲染

	- 支持多种视图技术（如 JSP、Thymeleaf、FreeMarker）。

	- 将模型数据动态渲染到视图模板中。

- 数据绑定与验证

	- 自动将请求参数绑定到 Java 对象。

	- 提供数据验证机制，确保输入数据的合法性。

- 异常处理

	- 提供全局异常处理机制，捕获并处理应用程序中的异常。

	- 支持自定义错误页面。

- 拦截器与过滤器

	- 提供拦截器或过滤器机制，用于在请求处理前后执行特定逻辑（如权限检查、日志记录）。

- 国际化支持

	- 支持多语言和区域设置，便于开发国际化应用程序。

- 静态资源处理

	- 提供静态资源（如 CSS、JavaScript、图片）的访问支持。

## **4. Spring MVC 架构与核心组件**

- Spring MVC 是什么

	- Spring MVC 是 Spring 框架中的一个模块，用于构建基于 MVC 设计模式的 Web 应用程序。

	- 它将应用程序分为三个部分：

		- Model：封装应用程序数据。

		- View：负责渲染数据（如 JSP、Thymeleaf 模板）。

		- Controller：处理用户请求并返回响应。

- 核心组件

	- DispatcherServlet：前端控制器，负责接收所有请求并将其分发给相应的处理器。

	- HandlerMapping：映射请求到处理器（Controller）。

	- Controller：处理请求并返回模型和视图。

	- ViewResolver：解析视图名称并渲染视图。

	- ModelAndView：封装模型数据和视图信息。

- 请求处理流程

1. 用户发送请求到 DispatcherServlet。

1. DispatcherServlet 通过 HandlerMapping 找到对应的 Controller。

1. Controller 处理请求并返回 ModelAndView。

1. DispatcherServlet 通过 ViewResolver 解析视图并渲染。

## **5. 路由映射与请求处理**

- 路由映射

	- 使用 @RequestMapping 或 @GetMapping、@PostMapping 等注解将请求 URL 映射到控制器方法。

- 请求处理

	- 控制器方法可以接收请求参数、路径变量、请求体等数据，并返回视图名称或直接返回数据（如 JSON）。

- 代码示例

```java
@Controller
@RequestMapping("/user")
public class UserController {

    // 处理 GET 请求，URL 为 /user/profile
    @GetMapping("/profile")
    public String profile(Model model) {
        model.addAttribute("name", "John Doe");
        return "profile"; // 返回视图名称
    }

    // 处理 POST 请求，URL 为 /user/submit
    @PostMapping("/submit")
    @ResponseBody
    public String submit(@RequestParam String name) {
        return "Hello, " + name;
    }
}
```

## **6. 表单处理与数据绑定**

- 表单处理

	- 使用 @ModelAttribute 注解将表单数据绑定到 Java 对象。

	- 使用 th:object（Thymeleaf）或 form:form（JSP）标签渲染表单。

- 数据绑定

	- Spring MVC 自动将请求参数绑定到方法参数或 Java 对象。

- 代码示例

```java
@Controller
@RequestMapping("/form")
public class FormController {

    // 显示表单页面
    @GetMapping("/show")
    public String showForm(Model model) {
        model.addAttribute("user", new User());
        return "form";
    }

    // 处理表单提交
    @PostMapping("/submit")
    public String submitForm(@ModelAttribute User user, Model model) {
        model.addAttribute("message", "Form submitted successfully!");
        return "result";
    }
}

// User.java
public class User {
    private String name;
    private String email;

    // Getters and Setters
}
```

## **7. 异常处理与错误页面定制**

- 异常处理

	- 使用 @ExceptionHandler 注解处理控制器中的异常。

	- 使用 @ControllerAdvice 全局处理异常。

- 错误页面定制

	- 在 src/main/resources/templates 目录下创建自定义错误页面（如 error.html）。

- 代码示例

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    // 处理特定异常
    @ExceptionHandler(RuntimeException.class)
    public String handleRuntimeException(RuntimeException ex, Model model) {
        model.addAttribute("error", ex.getMessage());
        return "error";
    }
}
```

## **课后练习：Spring MVC 实战**

### **练习目标**

通过编写代码，深入理解 Spring MVC 的使用场景，并掌握如何实现路由映射、表单处理、异常处理等功能。

### **练习步骤**

1. 创建项目

	- 使用 Spring Initializr 创建一个新的 Spring Boot 项目，添加 Spring Web 和 Thymeleaf 依赖。

1. 实现路由映射

	- 创建一个 UserController，定义多个路由映射方法，处理 GET 和 POST 请求。

1. 实现表单处理

	- 创建一个表单页面（使用 Thymeleaf），提交用户信息并显示提交结果。

1. 实现异常处理

	- 在 UserController 中抛出一个自定义异常，并使用 @ControllerAdvice 全局处理该异常。

1. 测试功能

	- 启动应用，访问不同路由，测试表单提交和异常处理功能。

### **参考代码**

```java
// UserController.java
@Controller
@RequestMapping("/user")
public class UserController {

    @GetMapping("/profile")
    public String profile(Model model) {
        model.addAttribute("name", "John Doe");
        return "profile";
    }

    @GetMapping("/form")
    public String showForm(Model model) {
        model.addAttribute("user", new User());
        return "form";
    }

    @PostMapping("/submit")
    public String submitForm(@ModelAttribute User user, Model model) {
        if (user.getName().isEmpty()) {
            throw new RuntimeException("Name cannot be empty!");
        }
        model.addAttribute("message", "Form submitted successfully!");
        return "result";
    }
}

// User.java
public class User {
    private String name;
    private String email;

    // Getters and Setters
}

// GlobalExceptionHandler.java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public String handleRuntimeException(RuntimeException ex, Model model) {
        model.addAttribute("error", ex.getMessage());
        return "error";
    }
}

// form.html (Thymeleaf 模板)
<!DOCTYPE html>
<html xmlns:th="
<head>
    <title>User Form</title>
</head>
<body>
    <h1>User Form</h1>
    <form th:action="@{/user/submit}" th:object="${user}" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" th:field="*{name}">
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" th:field="*{email}">
        <br>
        <button type="submit">Submit</button>
    </form>
</body>
</html>

// result.html (Thymeleaf 模板)
<!DOCTYPE html>
<html xmlns:th="
<head>
    <title>Result</title>
</head>
<body>
    <h1>Result</h1>
    <p th:text="${message}"></p>
</body>
</html>

// error.html (Thymeleaf 模板)
<!DOCTYPE html>
<html xmlns:th="
<head>
    <title>Error</title>
</head>
<body>
    <h1>Error</h1>
    <p th:text="${error}"></p>
</body>
</html>
```

## **练习总结**

通过完成这个练习，你将：

1. 掌握 Spring MVC 的基本架构和核心组件。

1. 学会实现路由映射、表单处理和异常处理。

1. 理解如何使用 Thymeleaf 渲染视图。