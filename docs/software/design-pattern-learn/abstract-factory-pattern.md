# 抽象工厂模式 (Abstract Factory Pattern)

## 概述

抽象工厂模式是一种创建型设计模式，它提供一个接口，用于创建相关或依赖对象的家族，而无需指定它们的具体类。

抽象工厂模式是工厂方法模式的扩展，它不仅创建一个产品，而是创建一系列相关的产品。抽象工厂模式关注的是一个产品家族的创建，确保产品之间的兼容性。

## 核心要点

- **产品家族**：创建一系列相关或相互依赖的产品
- **接口隔离**：客户端不依赖于产品的具体类
- **兼容性保证**：确保创建的产品家族相互兼容
- **开闭原则**：新增产品家族时，不需要修改现有代码

## 应用场景

- **需要创建一系列相关或相互依赖的产品时**
- **系统需要独立于其产品的创建、组合和表示时**
- **系统需要由多个产品系列中的一个来配置时**
- **强调产品家族的一致性，确保相关产品配合使用时**

## 结构

抽象工厂模式包含以下角色：

1. **抽象工厂（Abstract Factory）**：声明创建一系列抽象产品的接口
2. **具体工厂（Concrete Factory）**：实现抽象工厂的接口，负责创建具体产品
3. **抽象产品（Abstract Product）**：声明产品的接口
4. **具体产品（Concrete Product）**：实现抽象产品的接口，由具体工厂创建

## 实现示例

### 1. 抽象产品和具体产品

```java
// 抽象产品A
public interface ProductA {
    void use();
}

// 具体产品A1
public class ConcreteProductA1 implements ProductA {
    @Override
    public void use() {
        System.out.println("使用产品A1");
    }
}

// 具体产品A2
public class ConcreteProductA2 implements ProductA {
    @Override
    public void use() {
        System.out.println("使用产品A2");
    }
}

// 抽象产品B
public interface ProductB {
    void use();
}

// 具体产品B1
public class ConcreteProductB1 implements ProductB {
    @Override
    public void use() {
        System.out.println("使用产品B1");
    }
}

// 具体产品B2
public class ConcreteProductB2 implements ProductB {
    @Override
    public void use() {
        System.out.println("使用产品B2");
    }
}
```

### 2. 抽象工厂和具体工厂

```java
// 抽象工厂
public interface AbstractFactory {
    // 创建产品A
    ProductA createProductA();
    
    // 创建产品B
    ProductB createProductB();
}

// 具体工厂1，生产产品系列1
public class ConcreteFactory1 implements AbstractFactory {
    @Override
    public ProductA createProductA() {
        return new ConcreteProductA1();
    }
    
    @Override
    public ProductB createProductB() {
        return new ConcreteProductB1();
    }
}

// 具体工厂2，生产产品系列2
public class ConcreteFactory2 implements AbstractFactory {
    @Override
    public ProductA createProductA() {
        return new ConcreteProductA2();
    }
    
    @Override
    public ProductB createProductB() {
        return new ConcreteProductB2();
    }
}
```

### 3. 客户端使用

```java
public class Client {
    private ProductA productA;
    private ProductB productB;
    
    // 通过构造函数注入工厂
    public Client(AbstractFactory factory) {
        productA = factory.createProductA();
        productB = factory.createProductB();
    }
    
    // 使用产品
    public void useProducts() {
        productA.use();
        productB.use();
    }
    
    public static void main(String[] args) {
        // 使用工厂1
        System.out.println("使用产品系列1:");
        Client client1 = new Client(new ConcreteFactory1());
        client1.useProducts();
        
        // 使用工厂2
        System.out.println("\n使用产品系列2:");
        Client client2 = new Client(new ConcreteFactory2());
        client2.useProducts();
    }
}
```

## 实际应用示例：UI组件库

下面是一个更贴近实际应用的示例，展示如何使用抽象工厂模式创建不同风格的UI组件库：

### 抽象产品和具体产品

```java
// 按钮抽象产品
public interface Button {
    void paint();
}

// 文本框抽象产品
public interface TextField {
    void paint();
}

// 复选框抽象产品
public interface Checkbox {
    void paint();
}

// Windows风格按钮
public class WindowsButton implements Button {
    @Override
    public void paint() {
        System.out.println("绘制Windows风格按钮");
    }
}

// Windows风格文本框
public class WindowsTextField implements TextField {
    @Override
    public void paint() {
        System.out.println("绘制Windows风格文本框");
    }
}

// Windows风格复选框
public class WindowsCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("绘制Windows风格复选框");
    }
}

// Mac风格按钮
public class MacButton implements Button {
    @Override
    public void paint() {
        System.out.println("绘制Mac风格按钮");
    }
}

// Mac风格文本框
public class MacTextField implements TextField {
    @Override
    public void paint() {
        System.out.println("绘制Mac风格文本框");
    }
}

// Mac风格复选框
public class MacCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("绘制Mac风格复选框");
    }
}
```

### 抽象工厂和具体工厂

```java
// UI组件工厂接口
public interface UIFactory {
    Button createButton();
    TextField createTextField();
    Checkbox createCheckbox();
}

// Windows UI组件工厂
public class WindowsUIFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }
    
    @Override
    public TextField createTextField() {
        return new WindowsTextField();
    }
    
    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}

// Mac UI组件工厂
public class MacUIFactory implements UIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }
    
    @Override
    public TextField createTextField() {
        return new MacTextField();
    }
    
    @Override
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}
```

### 客户端使用

```java
public class Application {
    private Button button;
    private TextField textField;
    private Checkbox checkbox;
    
    // 使用工厂创建UI组件
    public Application(UIFactory factory) {
        createUI(factory);
    }
    
    private void createUI(UIFactory factory) {
        button = factory.createButton();
        textField = factory.createTextField();
        checkbox = factory.createCheckbox();
    }
    
    // 显示UI
    public void paint() {
        button.paint();
        textField.paint();
        checkbox.paint();
    }
    
    public static void main(String[] args) {
        // 根据操作系统选择工厂
        UIFactory factory;
        String os = System.getProperty("os.name").toLowerCase();
        
        if (os.contains("windows")) {
            factory = new WindowsUIFactory();
        } else if (os.contains("mac")) {
            factory = new MacUIFactory();
        } else {
            // 默认使用Windows风格
            factory = new WindowsUIFactory();
        }
        
        // 创建应用并显示UI
        Application app = new Application(factory);
        app.paint();
    }
}
```

## 优缺点

### 优点

- **产品家族一致性**：确保创建的产品家族相互兼容
- **解耦**：客户端与具体产品实现解耦，只依赖抽象接口
- **符合开闭原则**：新增产品家族时，只需要添加新的具体工厂和产品类，不需要修改现有代码
- **易于切换产品家族**：只需要更换具体工厂，就可以切换整个产品家族

### 缺点

- **扩展困难**：添加新产品时，需要修改抽象工厂和所有具体工厂，违反开闭原则
- **增加了系统复杂度**：引入了多个抽象层，增加了理解难度
- **类爆炸**：每增加一个产品系列，就需要增加多个类

## 与工厂方法模式的区别

抽象工厂模式与工厂方法模式的主要区别在于：

1. **产品范围**：工厂方法模式创建单一产品，抽象工厂模式创建产品家族
2. **抽象程度**：抽象工厂模式比工厂方法模式更抽象，层次更高
3. **使用场景**：工厂方法模式适用于创建单一产品，抽象工厂模式适用于创建相关产品家族
4. **扩展性**：工厂方法模式更容易扩展单一产品，抽象工厂模式更容易扩展产品家族

## 总结

抽象工厂模式是一种强大的创建型设计模式，它适用于需要创建一系列相关或相互依赖产品的场景。抽象工厂模式确保了产品家族的一致性，同时将客户端代码与具体产品实现解耦。在实际应用中，抽象工厂模式常用于创建UI组件库、数据库访问层、配置系统等需要保证产品兼容性的场景。使用抽象工厂模式时，需要权衡其优点和缺点，根据实际需求选择合适的设计模式。