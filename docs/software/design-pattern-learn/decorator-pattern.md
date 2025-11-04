# 装饰器模式 (Decorator Pattern)

## 概述

装饰器模式是一种结构型设计模式，它允许向一个现有对象动态地添加新的功能，同时又不改变其结构。装饰器模式是继承关系的一个替代方案，它通过组合而非继承的方式扩展对象的功能。

装饰器模式的核心思想是将对象的功能增强与对象的基本功能分离，使它们可以独立变化。装饰器模式通过创建一个包装类，将原始对象包装起来，从而在不改变原始对象的情况下，为其添加新的功能。

## 核心要点

- **动态扩展**：动态地向对象添加新的功能，而不需要修改原始类
- **组合优于继承**：通过组合而非继承的方式扩展对象功能
- **保持接口一致**：装饰器类和被装饰类实现相同的接口
- **透明性**：客户端不需要知道对象是被装饰过的，就可以使用它
- **递归组合**：装饰器可以嵌套，从而实现多层装饰

## 应用场景

- **动态添加功能**：当需要动态地向对象添加功能，而又不想修改原始类时
- **功能扩展**：当需要扩展一个类的功能，但又不想使用继承时
- **多层功能增强**：当需要为对象添加多层功能增强时
- **避免类爆炸**：当使用继承会导致类爆炸时，如一个有多个可选功能的类，使用继承会产生2^n个类，而使用装饰器模式只需要n个装饰器类

## 结构

装饰器模式包含以下角色：

1. **组件（Component）**：定义装饰器和被装饰对象的共同接口
2. **具体组件（Concrete Component）**：实现组件接口，是被装饰的原始对象
3. **装饰器（Decorator）**：实现组件接口，持有一个组件对象的引用
4. **具体装饰器（Concrete Decorator）**：实现装饰器接口，向组件添加新的功能

## 实现示例

### 1. 基本装饰器模式实现

```java
// 组件接口
public interface Component {
    void operation();
}

// 具体组件
public class ConcreteComponent implements Component {
    @Override
    public void operation() {
        System.out.println("执行基本操作");
    }
}

// 装饰器
public abstract class Decorator implements Component {
    protected Component component; // 持有组件对象的引用
    
    public Decorator(Component component) {
        this.component = component;
    }
    
    @Override
    public void operation() {
        // 调用被装饰对象的方法
        component.operation();
    }
}

// 具体装饰器A
public class ConcreteDecoratorA extends Decorator {
    public ConcreteDecoratorA(Component component) {
        super(component);
    }
    
    @Override
    public void operation() {
        // 在调用被装饰对象的方法前后添加新功能
        addedFunctionA();
        super.operation();
    }
    
    // 添加的新功能
    private void addedFunctionA() {
        System.out.println("添加功能A");
    }
}

// 具体装饰器B
public class ConcreteDecoratorB extends Decorator {
    public ConcreteDecoratorB(Component component) {
        super(component);
    }
    
    @Override
    public void operation() {
        // 在调用被装饰对象的方法前后添加新功能
        super.operation();
        addedFunctionB();
    }
    
    // 添加的新功能
    private void addedFunctionB() {
        System.out.println("添加功能B");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 创建原始对象
        Component component = new ConcreteComponent();
        System.out.println("使用原始对象:");
        component.operation();
        
        // 使用装饰器A装饰原始对象
        Component decoratorA = new ConcreteDecoratorA(component);
        System.out.println("\n使用装饰器A装饰:");
        decoratorA.operation();
        
        // 使用装饰器B装饰原始对象
        Component decoratorB = new ConcreteDecoratorB(component);
        System.out.println("\n使用装饰器B装饰:");
        decoratorB.operation();
        
        // 使用装饰器A和B嵌套装饰原始对象
        Component decoratorAB = new ConcreteDecoratorB(new ConcreteDecoratorA(component));
        System.out.println("\n使用装饰器A和B嵌套装饰:");
        decoratorAB.operation();
    }
}
```

### 2. 另一个装饰器示例

```java
// 具体装饰器C，在装饰器中添加状态
public class ConcreteDecoratorC extends Decorator {
    private String addedState; // 添加的状态
    
    public ConcreteDecoratorC(Component component, String addedState) {
        super(component);
        this.addedState = addedState;
    }
    
    @Override
    public void operation() {
        super.operation();
        System.out.println("添加状态: " + addedState);
        addedFunctionC();
    }
    
    private void addedFunctionC() {
        System.out.println("添加功能C");
    }
}

// 更新客户端代码
public class Client {
    public static void main(String[] args) {
        // 创建原始对象
        Component component = new ConcreteComponent();
        
        // 使用装饰器C装饰原始对象，并添加状态
        Component decoratorC = new ConcreteDecoratorC(component, "装饰状态");
        System.out.println("使用装饰器C装饰:");
        decoratorC.operation();
        
        // 三层嵌套装饰
        Component decoratorABC = new ConcreteDecoratorC(
                new ConcreteDecoratorB(
                        new ConcreteDecoratorA(component)),
                "最终状态");
        System.out.println("\n三层嵌套装饰:");
        decoratorABC.operation();
    }
}
```

## 实际应用示例：咖啡店订单系统

下面是一个实际应用的例子，展示如何使用装饰器模式实现咖啡店订单系统：

```java
// 组件接口：饮料
public interface Beverage {
    String getDescription(); // 获取描述
    double cost(); // 计算价格
}

// 具体组件：浓缩咖啡
public class Espresso implements Beverage {
    @Override
    public String getDescription() {
        return "浓缩咖啡";
    }
    
    @Override
    public double cost() {
        return 1.99; // 浓缩咖啡价格
    }
}

// 具体组件：拿铁咖啡
public class Latte implements Beverage {
    @Override
    public String getDescription() {
        return "拿铁咖啡";
    }
    
    @Override
    public double cost() {
        return 2.99; // 拿铁咖啡价格
    }
}

// 具体组件：美式咖啡
public class Americano implements Beverage {
    @Override
    public String getDescription() {
        return "美式咖啡";
    }
    
    @Override
    public double cost() {
        return 2.49; // 美式咖啡价格
    }
}

// 装饰器：配料装饰器
public abstract class CondimentDecorator implements Beverage {
    protected Beverage beverage; // 持有饮料对象的引用
    
    public CondimentDecorator(Beverage beverage) {
        this.beverage = beverage;
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription(); // 委托给被装饰对象
    }
    
    @Override
    public abstract double cost(); // 子类必须实现
}

// 具体装饰器：牛奶
public class Milk extends CondimentDecorator {
    public Milk(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription() + ", 牛奶";
    }
    
    @Override
    public double cost() {
        return beverage.cost() + 0.5; // 牛奶价格
    }
}

// 具体装饰器：糖
public class Sugar extends CondimentDecorator {
    public Sugar(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription() + ", 糖";
    }
    
    @Override
    public double cost() {
        return beverage.cost() + 0.2; // 糖价格
    }
}

// 具体装饰器：巧克力
public class Chocolate extends CondimentDecorator {
    private int count; // 巧克力份数
    
    public Chocolate(Beverage beverage) {
        this(beverage, 1); // 默认1份
    }
    
    public Chocolate(Beverage beverage, int count) {
        super(beverage);
        this.count = count;
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription() + ", 巧克力×" + count;
    }
    
    @Override
    public double cost() {
        return beverage.cost() + 0.8 * count; // 每份巧克力价格
    }
}

// 具体装饰器：奶泡
public class Whip extends CondimentDecorator {
    public Whip(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getDescription() {
        return beverage.getDescription() + ", 奶泡";
    }
    
    @Override
    public double cost() {
        return beverage.cost() + 0.7; // 奶泡价格
    }
}

// 客户端：咖啡店订单系统
public class CoffeeOrderSystem {
    public static void main(String[] args) {
        // 创建一个简单的浓缩咖啡
        Beverage espresso = new Espresso();
        System.out.println(espresso.getDescription() + " ¥" + espresso.cost());
        
        // 创建一个加牛奶和糖的拿铁咖啡
        Beverage latteWithMilkAndSugar = new Sugar(new Milk(new Latte()));
        System.out.println(latteWithMilkAndSugar.getDescription() + " ¥" + latteWithMilkAndSugar.cost());
        
        // 创建一个加双份巧克力和奶泡的美式咖啡
        Beverage fancyAmericano = new Whip(new Chocolate(new Americano(), 2));
        System.out.println(fancyAmericano.getDescription() + " ¥" + fancyAmericano.cost());
        
        // 创建一个复杂的咖啡：浓缩咖啡加牛奶、糖、双份巧克力和奶泡
        Beverage fancyCoffee = new Whip(new Chocolate(new Sugar(new Milk(new Espresso())), 2));
        System.out.println(fancyCoffee.getDescription() + " ¥" + fancyCoffee.cost());
    }
}
```

## 优缺点

### 优点

- **动态扩展**：可以动态地向对象添加新的功能，而不需要修改原始类
- **避免类爆炸**：当需要为一个类添加多种可选功能时，使用装饰器模式可以避免产生大量的子类
- **组合灵活性**：可以任意组合不同的装饰器，实现不同的功能组合
- **符合开闭原则**：添加新的装饰器不需要修改现有代码
- **遵循单一职责原则**：每个装饰器只负责一个功能的增强

### 缺点

- **代码复杂度增加**：引入了多个装饰器类，增加了代码的复杂度
- **调试困难**：对于多层装饰的对象，调试起来比较困难
- **初始化复杂**：创建装饰后的对象需要多次嵌套构造，初始化过程比较复杂

## 与继承的比较

| 特性 | 装饰器模式 | 继承 |
|------|-----------|------|
| 实现方式 | 组合 | 继承 |
| 灵活性 | 高，可以动态组合功能 | 低，功能在编译时确定 |
| 类数量 | 少，每个功能一个装饰器 | 多，每个功能组合一个子类 |
| 运行时 | 可以动态添加/移除功能 | 功能在编译时确定，无法动态改变 |
| 职责单一 | 每个装饰器只负责一个功能 | 一个类可能包含多个功能 |

## 总结

装饰器模式是一种强大的结构型设计模式，它允许通过组合的方式动态地向对象添加新的功能，而不需要修改原始类。装饰器模式是继承关系的一个替代方案，它通过组合而非继承的方式扩展对象的功能，避免了类爆炸问题。装饰器模式在实际应用中广泛用于IO流处理、GUI组件、日志记录等需要动态扩展功能的场景。使用装饰器模式需要注意控制装饰器的层级，避免过多的装饰器导致系统复杂度过高。