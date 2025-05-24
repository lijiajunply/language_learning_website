# 第十二章：Spring WebFlux（响应式编程）

## 1. Spring WebFlux概述

**Spring WebFlux** 是 Spring Framework 提供的一个响应式编程模块，旨在支持异步和非阻塞的 web 应用程序开发。它基于反应式编程模型，使用了 **Reactive Streams** 规范，允许开发者构建高效、可扩展的 web 应用程序，能够处理大量的并发请求，而不需要创建大量的线程。

响应式编程是一种基于数据流和变化传播的编程范式，它通常用于需要高并发和低延迟的场景，如实时消息、流媒体处理和大规模数据处理。

Spring WebFlux 的核心概念是“响应式流”，即可以异步地处理数据流并对变化做出响应。WebFlux 提供了 **Mono** 和 **Flux** 两种核心类型，用于表示单个元素和多个元素的数据流。

## 2. 响应式编程与传统编程的区别

在传统的阻塞式编程中，每个请求通常都需要一个独立的线程来处理，如果请求量较大，线程池可能会很快耗尽。相对而言，响应式编程通过非阻塞 I/O 和事件驱动模型，能够更高效地使用系统资源，减少线程的开销。

- 阻塞模型：每个请求都需要一个线程，线程在处理 I/O 操作时会被阻塞。

- 非阻塞模型：请求会被立即返回，不需要等待 I/O 操作完成。数据处理过程是基于事件驱动的。

## 3. 核心概念：Mono 和 Flux

在响应式编程中，Spring WebFlux 使用了两个重要的类：**Mono** 和 **Flux**，它们是 **Reactive Streams** 的实现。

- Mono：表示 0 或 1 个元素的异步序列。常用于表示单个值的异步操作，例如 HTTP 请求的响应、数据库查询等。

- Flux：表示 0 到 N 个元素的异步序列。常用于处理多个数据元素，例如返回多个结果的查询。

这两个类都继承自 Publisher 接口，支持订阅机制，能够在数据流变化时进行回调。

## 4. Spring WebFlux架构

Spring WebFlux 的架构基于 **反应式编程** 和 **非阻塞 I/O**，它支持两种运行模式：

- 基于 Servlet 的模式：WebFlux 通过使用 Servlet 容器（如 Tomcat）来提供异步支持。这种模式仍然是基于传统的 Servlet 容器，但引入了异步非阻塞的支持。

- 基于非 Servlet 的模式：WebFlux 使用 **Netty**、**Undertow** 等服务器来提供更底层的非阻塞支持。在这种模式下，应用程序完全不依赖 Servlet 容器，能够发挥非阻塞 I/O 的优势。

Spring WebFlux 支持两种主要的编程风格：

1. 注解驱动的编程风格：使用 @Controller、@RequestMapping 等注解来定义 Web 层的响应式处理逻辑。

1. 函数式编程风格：通过 RouterFunction 和 HandlerFunction 定义请求路由和处理器。该方式强调更简洁和灵活的编程风格。

## 5. 处理 HTTP 请求与响应

在 Spring WebFlux 中，处理 HTTP 请求和响应是通过 Mono 和 Flux 来实现的。可以使用这些类型来表示请求的输入和输出，并通过事件驱动机制进行异步处理。

**示例 1：使用 Mono 处理单个请求**

```java
@RestController
public class ReactiveController {

    @GetMapping("/hello")
    public Mono<String> sayHello() {
        return Mono.just("Hello, Spring WebFlux!");
    }
}

```

在上面的代码中，Mono.just() 方法表示返回一个包含字符串的异步序列，响应会在 Mono 完成时返回。

**示例 2：使用 Flux 处理多个请求**

```java
@RestController
public class ReactiveController {

    @GetMapping("/items")
    public Flux<String> getItems() {
        return Flux.just("Item1", "Item2", "Item3");
    }
}

```

在这个例子中，Flux.just() 方法返回一个包含多个项的异步序列，客户端会接收到这三个字符串的响应。

## 6. 响应式数据访问

Spring WebFlux 提供了对响应式数据库访问的支持，特别是通过 **Spring Data Reactive** 模块。它支持与响应式数据库进行交互，如 **MongoDB**、**Cassandra** 等，以及对传统关系型数据库（如 MySQL）提供响应式支持。

Spring WebFlux 中的响应式数据库访问通常使用 **Reactor** 提供的异步、非阻塞 API，数据操作如查询和插入将返回 **Mono** 或 **Flux**。

**示例 3：响应式查询数据库**

```java
@Repository
public interface ItemRepository extends ReactiveCrudRepository<Item, String> {

    Flux<Item> findByCategory(String category);
}

```

在这个例子中，ReactiveCrudRepository 提供了对数据库的响应式访问，findByCategory 返回一个 Flux，表示一个异步的查询结果流。

## 7. WebFlux 与 Spring MVC 的对比

虽然 Spring WebFlux 和传统的 Spring MVC 都可以用于构建 web 应用程序，但它们在处理请求的方式上有所不同。

- Spring MVC 是基于 Servlet 和阻塞 I/O 的，它采用传统的请求-响应模型，每个请求都需要一个独立的线程进行处理。

- Spring WebFlux 是基于响应式编程的，它采用非阻塞 I/O，能够更高效地处理大量并发请求，尤其是在 I/O 密集型操作时。

| 特性 | Spring MVC | Spring WebFlux | 
| -- | -- | -- |
| 编程模型 | 基于 Servlet 和阻塞 I/O | 响应式编程和非阻塞 I/O | 
| 适用场景 | I/O 较少的应用（如简单的 CRUD） | 高并发和低延迟的应用，如流媒体处理、实时数据等 | 
| 性能（高并发） | 限制较多（需要更多线程） | 高效处理并发请求（使用少量线程） | 


## 8. Spring WebFlux的性能和可扩展性

Spring WebFlux 使用异步和非阻塞 I/O，这意味着它能够在同样的硬件资源下支持更多的并发请求。WebFlux 基于 **Reactor**，这是一个高效的响应式编程框架，能够处理大量的请求而不消耗过多的系统资源。

在高并发环境中，WebFlux 可以通过少量的线程池来处理大量请求，避免了传统的阻塞式处理带来的线程切换开销。这样，WebFlux 可以更好地应对大流量、I/O 密集型的场景。

## 9. 测试响应式应用

Spring WebFlux 提供了对响应式应用程序进行测试的支持。可以使用 WebTestClient 来模拟客户端请求并验证响应。

**示例 4：使用 WebTestClient 测试响应式端点**

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ReactiveControllerTests {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    public void testSayHello() {
        webTestClient.get().uri("/hello")
                     .exchange()
                     .expectStatus().isOk()
                     .expectBody(String.class).isEqualTo("Hello, Spring WebFlux!");
    }
}

```

WebTestClient 是一个非阻塞的 HTTP 客户端，允许我们异步地发送请求并验证响应。

## 10. 小结

Spring WebFlux 是一种高效的异步和响应式编程框架，专门用于构建可扩展的 web 应用程序。它通过支持异步 I/O、反应式流（Mono 和 Flux）和响应式数据库访问，提供了比传统 Spring MVC 更高的并发性能和更低的资源消耗。WebFlux 对比传统编程模型的优势在于能够处理更多并发请求，尤其适用于高并发和低延迟的场景。

## 课后练习

1. 基本应用： 创建一个简单的 Spring WebFlux 应用，提供一个 /hello 路径，返回 "Hello, Spring WebFlux!"。

1. Flux 示例： 实现一个返回多个字符串项的端点，例如 /items，使用 Flux 返回一组数据。

1. 数据库访问： 使用 Spring Data Reactive 和 MongoDB 创建一个响应式应用，查询某个类别的商品信息。

1. 性能测试： 使用 WebTestClient 编写测试，验证你应用的响应性和正确性。

## 补充内容：

✅ **在使用 Spring WebFlux 时，底层基础设施（HTTP调用、数据库访问、消息中间件等）应该尽量选用非阻塞的实现。**

❌ 如果用阻塞的组件，会破坏整个 WebFlux 的异步、非阻塞模型，导致性能下降，失去 WebFlux 的优势。

### WebFlux 环境下：基础设施选择对比表格

| 基础设施类别 | 阻塞式（❌ 不推荐） | 非阻塞式（✅ 推荐） | 备注 | 
| -- | -- | -- | -- |
| HTTP 客户端 | RestTemplate | WebClient | WebClient | 
| MongoDB 访问 | Spring Data MongoDB | Spring Data Reactive MongoDB | 使用Reactive Streams Driver | 
| 关系型数据库访问 | Spring Data JPA | R2DBC | 支持 PostgreSQL、MySQL 等 | 
| Redis 访问 | Lettuce | Lettuce | 使用Lettuce的Reactive API | 
| 消息队列 | RabbitTemplate | Reactive RabbitMQ | 支持异步发送和消费 | 
| 文件处理 | 传统文件IO | AsynchronousFileChannel | 需要手动处理异步文件读写 | 
| Web服务器 | Tomcat | Netty | WebFlux 默认使用 Netty | 
| 事务管理 | 传统事务（同步事务） | 基于  | 注意事务模型不同 | 
| 认证授权 | Spring Security（传统模式） | Spring Security for WebFlux（Reactive模式） | 配合ReactiveUserDetailsService等组件 | 


### 总结一句话

> **在 WebFlux 体系下，一切能非阻塞的，都应该选非阻塞的！**
> —— 否则就需要用 Schedulers.boundedElastic() 额外保护阻塞代码，不然破坏性能。


### 小提示：

- **HTTP调用**、**数据库访问**、**缓存读写**，是最最需要关注的三大重点。

- **RabbitMQ/Kafka消息中间件**：如果未来你有异步消息需求，也要选支持 Reactive 的库。

- **如果一时找不到替代方案**，记得用 .subscribeOn(Schedulers.boundedElastic()) 包住。