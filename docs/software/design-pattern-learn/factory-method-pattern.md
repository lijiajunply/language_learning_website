# 工厂方法模式 (Factory Method Pattern)

## 概述

工厂方法模式是一种创建型设计模式，它定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类的实例化推迟到子类中进行。

工厂方法模式通过将对象的创建与使用分离，提供了一种更灵活、更可扩展的方式来创建对象，特别适合那些需要根据不同条件创建不同类型对象的场景。

## 核心要点

- **创建与使用分离**：客户端代码不需要知道具体产品的创建细节
- **封装变化**：将对象创建的变化封装在工厂类中
- **符合开闭原则**：新增产品类型时，只需要新增对应的工厂子类，不需要修改现有代码
- **多态性**：通过抽象接口实现不同产品的创建

## 应用场景

- **当一个类不知道它所必须创建的对象的类的时候**
- **当一个类希望由子类来指定它所创建的对象的时候**
- **当类将创建对象的职责委托给多个帮助子类中的某一个，并且希望将哪一个帮助子类是代理者这一信息局部化的时候**
- **需要系统独立于产品的创建、组合和表示时**

## 结构

工厂方法模式包含以下角色：

1. **产品（Product）**：定义工厂方法所创建的对象的接口
2. **具体产品（Concrete Product）**：实现产品接口
3. **创建者（Creator）**：声明工厂方法，该方法返回一个产品类型的对象
4. **具体创建者（Concrete Creator）**：实现工厂方法，返回具体产品的实例

## 实现示例

### 1. 产品接口和具体产品

```java
// 产品接口
public interface Product {
    void use();
}

// 具体产品A
public class ConcreteProductA implements Product {
    @Override
    public void use() {
        System.out.println("使用产品A");
    }
}

// 具体产品B
public class ConcreteProductB implements Product {
    @Override
    public void use() {
        System.out.println("使用产品B");
    }
}
```

### 2. 创建者接口和具体创建者

```java
// 创建者抽象类
public abstract class Creator {
    // 工厂方法
    public abstract Product factoryMethod();
    
    // 其他业务方法
    public void someOperation() {
        // 创建产品
        Product product = factoryMethod();
        // 使用产品
        product.use();
    }
}

// 具体创建者A
public class ConcreteCreatorA extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProductA();
    }
}

// 具体创建者B
public class ConcreteCreatorB extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProductB();
    }
}
```

### 3. 客户端使用

```java
public class Client {
    public static void main(String[] args) {
        // 创建具体创建者A
        Creator creatorA = new ConcreteCreatorA();
        creatorA.someOperation(); // 输出: 使用产品A
        
        // 创建具体创建者B
        Creator creatorB = new ConcreteCreatorB();
        creatorB.someOperation(); // 输出: 使用产品B
    }
}
```

## 实际应用示例：日志记录器

下面是一个更贴近实际应用的示例，展示如何使用工厂方法模式创建不同类型的日志记录器：

### 产品接口和具体产品

```java
// 日志记录器接口
public interface Logger {
    void log(String message);
}

// 文件日志记录器
public class FileLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("写入日志到文件: " + message);
    }
}

// 控制台日志记录器
public class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("打印日志到控制台: " + message);
    }
}

// 数据库日志记录器
public class DatabaseLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("存储日志到数据库: " + message);
    }
}
```

### 创建者接口和具体创建者

```java
// 日志记录器工厂抽象类
public abstract class LoggerFactory {
    // 工厂方法
    public abstract Logger createLogger();
}

// 文件日志记录器工厂
public class FileLoggerFactory extends LoggerFactory {
    @Override
    public Logger createLogger() {
        // 可能有一些初始化工作，如创建文件、设置权限等
        return new FileLogger();
    }
}

// 控制台日志记录器工厂
public class ConsoleLoggerFactory extends LoggerFactory {
    @Override
    public Logger createLogger() {
        return new ConsoleLogger();
    }
}

// 数据库日志记录器工厂
public class DatabaseLoggerFactory extends LoggerFactory {
    @Override
    public Logger createLogger() {
        // 可能有一些初始化工作，如建立数据库连接等
        return new DatabaseLogger();
    }
}
```

### 客户端使用

```java
public class Client {
    public static void main(String[] args) {
        // 可以根据配置或运行时条件选择不同的工厂
        LoggerFactory factory;
        String config = "file"; // 可以从配置文件读取
        
        if (config.equals("file")) {
            factory = new FileLoggerFactory();
        } else if (config.equals("console")) {
            factory = new ConsoleLoggerFactory();
        } else {
            factory = new DatabaseLoggerFactory();
        }
        
        // 创建日志记录器
        Logger logger = factory.createLogger();
        logger.log("这是一条测试日志");
    }
}
```

## 优缺点

### 优点

- **符合开闭原则**：新增产品时，只需要添加对应的具体产品类和具体工厂类，不需要修改现有代码
- **解耦**：客户端代码与具体产品的实现解耦，只依赖于抽象接口
- **灵活**：可以根据不同条件创建不同类型的对象
- **便于扩展**：系统更容易扩展，新增产品不会影响现有功能

### 缺点

- **增加了类的数量**：每增加一个产品，就需要增加一个具体产品类和一个具体工厂类
- **增加了系统的复杂度**：引入了抽象层，可能增加理解难度

## 与简单工厂模式的区别

工厂方法模式与简单工厂模式的主要区别在于：

1. **职责单一**：工厂方法模式将对象创建的职责分散到不同的工厂子类中，每个工厂只负责创建一种产品
2. **开闭原则**：工厂方法模式符合开闭原则，而简单工厂模式在新增产品时需要修改工厂类
3. **扩展性**：工厂方法模式更易于扩展，可以通过继承来创建新的产品类型

简单工厂模式适用于产品种类较少且变化不大的场景，而工厂方法模式适用于产品种类较多或变化较大的场景。

## 总结

工厂方法模式是一种灵活、可扩展的创建型设计模式，它通过将对象的创建与使用分离，提供了一种更灵活的方式来创建对象。工厂方法模式符合开闭原则，便于系统扩展，特别适合那些需要根据不同条件创建不同类型对象的场景。在实际应用中，工厂方法模式常被用于创建复杂对象、配置管理、依赖注入等场景。