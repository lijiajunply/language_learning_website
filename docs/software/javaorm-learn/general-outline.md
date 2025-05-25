# 导论

## 第一篇：先导篇：为什么有数据库访问技术？他给我们带来了什么好处？

本篇介绍数据库访问技术的背景、发展及其对开发效率和软件架构的影响。

### 第一章：ORM概述

- 介绍ORM（对象关系映射）的概念和原理。

- 为什么需要ORM？它如何简化数据库操作？

- 传统SQL操作 vs ORM方式。

### 第二章：数据库访问技术速览与比较

- 概览JDBC、Hibernate、MyBatis、Spring Data JPA等主流数据访问技术。

- 介绍各个框架的特点、适用场景和优缺点。

## **第二篇：实战篇：深入理解Java世界中的主流数据访问框架**

本篇专注于实践，深入讲解JDBC和三大主流ORM框架的实现方式和用法。

### 第三章：JDBC 主要对象

- 讲解JDBC的核心组件，如Connection、Statement、ResultSet等。

- 介绍如何使用JDBC进行数据库操作。

### 第四章：深入理解Hibernate

- 详细介绍Hibernate的配置、实体映射、查询语言（HQL）、事务管理等。

- 讨论Hibernate的缓存机制和优化策略。

### 第五章：深入理解MyBatis

- 介绍MyBatis的XML配置、注解方式、动态SQL等。

- 讲解MyBatis与Spring的集成。

### 第六章：你应该知道的JPA

- 讲解JPA的核心概念和规范。

- 介绍JPA的查询语言（JPQL）、实体生命周期和关系映射。

## **第三篇：进阶篇：与框架设计结合、深入实现原理**

本篇从架构设计的角度，深入探讨数据库访问技术的高级主题和实现原理。

### 第七章：Repository模式理论&实现

- 介绍Repository模式的设计思想。

- 讲解如何在Spring Data JPA和其他框架中实现Repository模式。

- 造轮子：使用MyBatis实现Repository模式

### 第八章：事务处理&Unit Of Work

- 介绍事务的基本概念（ACID）。

- 讲解Unit Of Work模式及其在Spring/Hibernate中的应用。

### 第九章：非关系型数据处理

- 介绍NoSQL数据库（MongoDB、Redis等）的数据访问方式。

- 讲解如何在Spring和Java环境中操作NoSQL数据。

说明：前两篇是初级人员必学内容。