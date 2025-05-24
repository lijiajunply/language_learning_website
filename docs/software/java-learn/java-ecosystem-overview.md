# **第十二章：Java 生态系统概览**

## **12.1 JDK、JRE、JVM 的区别**

Java 生态系统由多个组成部分构成，其中最常见的术语包括 JDK、JRE 和 JVM。了解它们之间的区别对掌握 Java 开发至关重要。

### **12.1.1 JDK (Java Development Kit)**

JDK 是 Java 开发工具包，包含了用于开发 Java 程序所需要的一切工具和库。它是开发者的核心工具，包括：

- 编译器 (javac)：将 Java 源代码 (.java 文件) 编译成字节码 (.class 文件)。

- JRE (Java Runtime Environment)：包含了运行 Java 应用程序所需的核心库和 JVM。

- 工具：例如调试器 (jdb)、打包工具 (jar) 等。

JDK 是开发人员使用的主要工具包，适合编写、编译和调试 Java 程序。

### **12.1.2 JRE (Java Runtime Environment)**

JRE 是 Java 运行时环境，包含了 Java 程序运行时所需的核心库和 JVM。JRE 是运行 Java 程序的基础，包含：

- JVM：用于执行 Java 字节码的虚拟机。

- Java 类库：如 java.util、java.lang、java.io 等。

JRE 不包含开发工具（如编译器），适用于已经编译好的 Java 应用程序的运行环境。

### **12.1.3 JVM (Java Virtual Machine)**

JVM 是 Java 虚拟机，负责执行 Java 字节码。JVM 的作用是使 Java 程序具有“写一次，运行到处”的特性。它的主要功能包括：

- 内存管理：分配堆和栈内存。

- 垃圾回收：自动清理不再使用的对象。

- 字节码执行：执行编译后的 Java 字节码，并将其转换为机器码。

JVM 使得 Java 程序能够在不同平台上运行，而无需修改代码。

## **12.2 Java EE 与 Spring 生态**

Java EE（现在称为 Jakarta EE）和 Spring 是 Java 企业级开发的两大主要生态。虽然它们都用于开发企业级应用，但它们在设计和使用上有显著的区别。

### **12.2.1 Java EE（Jakarta EE）**

Java EE 是一套企业级 Java 应用程序开发的标准，它定义了一个集合的 API 和规范，帮助开发者构建分布式、事务管理和多层架构的企业应用。主要组件包括：

- Servlet 和 **JSP**：用于开发 Web 应用程序。

- EJB（Enterprise JavaBeans）：用于开发事务管理和持久化的组件。

- JPA（Java Persistence API）：用于数据库操作。

- JMS（Java Message Service）：用于消息传递。

- CDI（Contexts and Dependency Injection）：用于依赖注入和管理 Java 对象的生命周期。

Java EE 的目标是提供一个全面、稳定和可扩展的企业级开发平台，但由于其规范庞大且复杂，学习曲线相对较陡。

### **12.2.2 Spring 生态**

Spring 是一个开源框架，致力于简化企业级 Java 应用开发，特别是在面向对象编程、依赖注入、面向切面编程等方面。Spring 通过其模块化的设计，提供了一个灵活的架构，可以满足不同的开发需求。Spring 主要组件包括：

- Spring Core：提供基础的依赖注入功能。

- Spring MVC：用于构建 Web 应用程序，支持 RESTful 风格的服务。

- Spring Boot：简化了 Spring 应用的创建和配置，支持微服务架构。

- Spring Data：简化数据库操作，支持多种数据库。

- Spring Security：提供强大的认证与授权功能。

- Spring Cloud：支持微服务架构的开发，提供服务发现、配置管理等功能。

Spring 相比于 Java EE，采用了更轻量级的设计，开发人员可以灵活地选择需要的模块，并且通过注解和自动配置大大降低了配置的复杂度。

## **12.3 Java 版本演进**

Java 语言的演进通过定期发布新的版本来推动开发者使用最新的语言特性和 API。以下是一些关键版本的介绍：

### **12.3.1 Java 8（2014年发布）**

Java 8 是 Java 语言历史上具有里程碑意义的版本，引入了一些革命性的特性，极大地增强了语言的功能性编程特性。

- Lambda 表达式：简化了函数式编程的实现。

- Streams API：支持对集合对象的声明性操作，如过滤、映射等。

- 新的日期时间 API：提供了更强大的日期和时间处理功能，替代了旧的 Date 和 Calendar 类。

- 默认方法：接口可以包含实现方法，简化了接口的演化。

- Optional 类：用于避免 NullPointerException，支持更安全的操作。

Java 8 的发布，标志着 Java 向函数式编程的转变，并加强了与现代开发实践的融合。

### **12.3.2 Java 11（2018年发布）**

Java 11 是 Java 的一个长期支持版本（LTS），包含了一些重要的更新和性能提升。主要改进包括：

- 模块化系统（Jigsaw）：引入了 Java 平台的模块化系统，增强了 JVM 的模块化功能。

- 去除 Java EE 相关的模块：Java EE 的相关 API 被移除，转交给 Jakarta EE。

- 新特性：如 var 关键字的引入、对 HTTP Client API 的增强等。

Java 11 是 Java 生态中又一个重要的 LTS 版本，广泛用于生产环境中。

### **12.3.3 Java 17（2021年发布）**

Java 17 也是一个 LTS 版本，其主要特性包括：

- 模式匹配：简化了 instanceof 的使用。

- 增强的记录类型（Record）：进一步简化了数据对象的创建和使用。

- 外部内存访问 API：允许 Java 程序直接访问外部内存，优化了性能。

Java 17 是在提升性能和语言简洁性的基础上，引入了更多现代化特性，使得开发者能够编写更少的代码实现更强的功能。

### **12.3.4 Java 21（2023年发布）**

Java 21 继续加强 Java 的现代化特性，尤其在性能和安全性方面进行了一些优化：

- 虚拟线程（Virtual Threads）：极大地简化了并发编程，使得每个线程的创建和管理更轻量。

- 模式匹配增强：进一步简化了类型检查和转换的代码。

- 增强的错误处理：改进了错误堆栈信息的呈现，帮助开发人员更快速地定位问题。

Java 21 通过引入一些更为先进的技术，进一步提升了 Java 在高并发、高性能应用中的表现。

## **总结**

- JDK、JRE 和 JVM 是 Java 生态系统中的核心概念，它们分别为开发和运行 Java 应用提供不同的功能。

- Java EE 与 Spring 是两大主要的企业级开发框架，Java EE 提供全面的规范，而 Spring 更加灵活，适合现代应用开发。

- Java 版本演进：从 Java 8 的 Lambda 到 Java 17 的记录类型，再到 Java 21 的虚拟线程，Java 一直在不断发展，推动着开发者迎接新的编程挑战。

掌握 Java 的生态系统，了解各个版本的演进和主要特性，将帮助开发者更好地选择和使用 Java 工具链，提升开发效率和应用性能。