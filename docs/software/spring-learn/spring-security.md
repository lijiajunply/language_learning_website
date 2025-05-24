# 第八章：Spring Security

## 目标

- 理解 Spring Security 的基本概念和功能

- 学会如何在 Spring Boot 项目中配置和使用 Spring Security

- 掌握常见的认证与授权机制，如表单登录、JWT、OAuth2 等

- 了解如何通过 Spring Security 强化应用的安全性

## 8.1 Spring Security 概述

Spring Security 是一个功能强大的安全框架，专门为 Java 应用程序提供身份验证和授权功能。它可以帮助开发者轻松实现安全的应用，保护应用免受未经授权的访问。

Spring Security 提供的主要功能包括：

- 认证（Authentication）：验证用户的身份。

- 授权（Authorization）：根据用户的角色或权限，决定是否允许访问特定的资源。

- CSRF 防护：防止跨站请求伪造攻击。

- 会话管理：支持会话并发控制、会话超时等。

## 8.2 Spring Security 的配置

### 8.2.1 添加依赖

首先，向 pom.xml 中添加 Spring Security 相关依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

```

添加该依赖后，Spring Boot 会自动配置 Spring Security，默认启用 HTTP 基本认证。

### 8.2.2 基本认证和自定义配置

默认情况下，Spring Security 会启用 HTTP 基本认证，需要提供用户名和密码才能访问任何受保护的资源。可以通过自定义配置类来修改默认行为。

例如，可以通过创建一个继承 WebSecurityConfigurerAdapter 的配置类来定制安全配置。

```java
package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/login", "/register").permitAll()  // 允许访问登录和注册页面
                .anyRequest().authenticated()  // 其他页面需要认证
            .and()
            .formLogin()  // 启用表单登录
                .loginPage("/login")  // 自定义登录页面
                .permitAll()
            .and()
            .logout()  // 启用登出
                .permitAll();
    }
}

```

在这个配置中，formLogin() 设置了自定义的登录页面，antMatchers() 用来指定哪些页面无需认证，anyRequest().authenticated() 表示其余页面都需要认证。

## 8.3 用户认证

### 8.3.1 内存用户存储

在实际项目中，通常会使用数据库来存储用户数据，但为了快速演示，我们可以使用内存中存储用户信息。

```java
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
            .and()
            .formLogin()
                .permitAll();
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        var user = User.withDefaultPasswordEncoder()
                       .username("user")
                       .password("password")
                       .roles("USER")
                       .build();
        return new InMemoryUserDetailsManager(user);
    }
}

```

在这个示例中，我们使用 InMemoryUserDetailsManager 存储一个内存用户，并通过 withDefaultPasswordEncoder() 生成一个加密密码。

### 8.3.2 基于数据库的用户认证

在实际项目中，通常会通过数据库来存储用户信息。可以使用 JdbcUserDetailsManager 或 UserDetailsService 实现。

```java
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
            .and()
            .formLogin()
                .permitAll();
    }

    @Bean
    public UserDetailsService userDetailsService(DataSource dataSource) {
        JdbcDaoImpl jdbcDao = new JdbcDaoImpl();
        jdbcDao.setDataSource(dataSource);
        return jdbcDao;
    }
}

```

在这种情况下，JdbcDaoImpl 会从数据库中获取用户信息。

## 8.4 用户授权

### 8.4.1 基于角色的访问控制

Spring Security 支持基于角色的访问控制。可以通过 hasRole() 或 hasAuthority() 方法进行配置。

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .antMatchers("/admin/**").hasRole("ADMIN")  // 只有 ADMIN 角色的用户才能访问
            .antMatchers("/user/**").hasAnyRole("USER", "ADMIN")  // 用户或管理员均可访问
            .anyRequest().authenticated();
}

```

### 8.4.2 基于权限的访问控制

除了角色外，Spring Security 还支持基于权限的访问控制。权限通常是细粒度的授权，使用 hasAuthority() 方法进行设置。

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .antMatchers("/admin/**").hasAuthority("ROLE_ADMIN")  // 基于权限控制
            .anyRequest().authenticated();
}

```

## 8.5 CSRF 防护

Spring Security 默认启用 CSRF（跨站请求伪造）防护，它会保护应用免受恶意请求的侵害。对于不需要 CSRF 防护的请求，可以通过禁用 CSRF 来绕过它。

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .csrf().disable()  // 禁用 CSRF 防护
        .authorizeRequests()
            .anyRequest().authenticated();
}

```

> **注意**：禁用 CSRF 防护时，应确保使用其它方式保护应用免受跨站请求伪造攻击。


## 8.6 使用 JWT 实现无状态认证

JWT（JSON Web Token）是一种轻量级的认证机制，它不依赖于服务器的会话状态，因此可以实现无状态认证。

### 8.6.1 JWT 生成与解析

可以使用 jjwt 等库来生成和解析 JWT。

**生成 JWT：**

```java
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtUtil {
    private String secretKey = "mySecretKey";

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))  // 10 hours
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}

```

**解析 JWT：**

```java
import io.jsonwebtoken.Jwts;

public class JwtUtil {

    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey("mySecretKey")
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}

```

### 8.6.2 集成 JWT 到 Spring Security 中

通过自定义过滤器，将 JWT 集成到 Spring Security 中：

```java
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            String username = jwtUtil.extractUsername(token);
            // 进一步验证用户身份，并设置用户信息到 SecurityContext
        }
        filterChain.doFilter(request, response);
    }
}

```

在 Spring Security 配置中注册 JWT 过滤器：

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
        .authorizeRequests()
            .anyRequest().authenticated();
}

@Bean
public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter(jwtUtil);
}

```

## 8.7 其他认证与授权机制

Spring Security 还支持多种其他的认证与授权机制，例如 OAuth2、LDAP、Social Login 等。对于这些高级功能，可以根据具体项目需求进行配置。

## 小结

在本章中，我们学习了如何配置和使用 Spring Security 来保护应用的安全性，包括用户认证、角色与权限管理、CSRF 防护以及如何实现 JWT 无状态认证。Spring Security 提供了一个强大且灵活的框架来确保应用的安全性，并且支持多种认证与授权机制，适应各种应用场景。