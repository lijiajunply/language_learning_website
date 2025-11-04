# 单例模式 (Singleton Pattern)

## 概述

单例模式是一种创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点来访问这个唯一实例。

单例模式在需要严格控制资源访问、避免多个实例导致的问题，或者需要频繁访问某个共享资源时非常有用。

## 核心要点

- **单一实例**：确保一个类只有一个实例
- **全局访问**：提供一个全局访问点
- **延迟初始化**：通常在第一次使用时才创建实例（懒汉式）
- **线程安全**：在多线程环境中确保实例的唯一性

## 应用场景

- **配置管理**：整个应用程序共享一份配置
- **日志记录**：全局日志记录器
- **数据库连接池**：管理数据库连接
- **缓存系统**：应用程序级别的缓存
- **线程池**：管理线程资源

## 实现方式

### 1. 懒汉式（非线程安全）

```java
public class Singleton {
    private static Singleton instance;
    
    // 私有构造函数，防止外部实例化
    private Singleton() {}
    
    // 全局访问点
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

这种方式在多线程环境下可能会创建多个实例，因此不是线程安全的。

### 2. 懒汉式（线程安全）

```java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {}
    
    // 使用synchronized保证线程安全
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

这种方式通过添加synchronized关键字保证了线程安全，但会降低性能，因为每次获取实例都需要同步。

### 3. 双重检查锁定（Double-Checked Locking）

```java
public class Singleton {
    // 使用volatile确保多线程环境下的可见性
    private static volatile Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) { // 第一次检查
            synchronized (Singleton.class) {
                if (instance == null) { // 第二次检查
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

这种方式结合了懒加载和线程安全的优点，只有在第一次创建实例时才进行同步，提高了性能。

### 4. 饿汉式（立即初始化）

```java
public class Singleton {
    // 在类加载时就创建实例
    private static final Singleton instance = new Singleton();
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        return instance;
    }
}
```

这种方式在类加载时就创建实例，确保了线程安全，但可能会造成资源浪费，因为即使实例不被使用也会被创建。

### 5. 静态内部类方式

```java
public class Singleton {
    // 私有构造函数
    private Singleton() {}
    
    // 静态内部类，包含单例实例
    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }
    
    // 全局访问点
    public static Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

这种方式利用了Java类加载机制来保证线程安全，同时实现了懒加载。静态内部类只有在被引用时才会被加载，因此实例会在第一次调用getInstance()方法时创建。

### 6. 枚举方式

```java
public enum Singleton {
    INSTANCE;
    
    // 可以在这里添加其他方法
    public void doSomething() {
        // 业务逻辑
    }
}
```

枚举方式是实现单例模式的最佳方式，它天然线程安全，防止序列化和反射攻击，代码简洁。这也是Joshua Bloch（《Effective Java》作者）推荐的方式。

## 优缺点

### 优点

- **严格控制实例数量**：确保一个类只有一个实例
- **全局访问点**：方便访问共享资源
- **避免资源浪费**：懒加载方式可以在需要时才创建实例
- **提高性能**：避免频繁创建和销毁实例

### 缺点

- **违反单一职责原则**：单例类既负责创建自己的实例，又负责业务逻辑
- **不利于测试**：单例类难以被模拟，可能导致测试困难
- **可能导致内存泄漏**：如果单例实例持有大量资源且长期不释放
- **多线程环境需要特别处理**：需要确保线程安全

## 注意事项

1. **线程安全**：在多线程环境中需要特别注意线程安全问题
2. **序列化与反序列化**：需要处理好序列化问题，避免创建新的实例
3. **反射攻击**：需要防止通过反射创建新的实例
4. **不要过度使用**：单例模式虽然方便，但也会引入全局状态，可能导致代码耦合度高

## 总结

单例模式是一种常用的设计模式，它确保一个类只有一个实例，并提供一个全局访问点。在实现单例模式时，需要考虑线程安全、懒加载、序列化等问题。枚举方式是实现单例模式的最佳选择，它天然解决了这些问题，代码也更加简洁。