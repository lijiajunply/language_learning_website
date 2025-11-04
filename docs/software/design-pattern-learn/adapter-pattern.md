# 适配器模式 (Adapter Pattern)

## 概述

适配器模式是一种结构型设计模式，它允许将一个类的接口转换成客户端所期望的另一个接口。适配器模式使得原本因为接口不兼容而不能一起工作的那些类可以一起工作。

适配器模式就像是日常生活中的电源适配器，可以将220V的电压转换成设备所需的5V或12V电压，使得不同电压要求的设备能够正常工作。在软件开发中，适配器模式可以将一个已存在的类的接口转换成客户端期望的另一种接口，从而使原本不匹配的接口能够一起工作。

## 核心要点

- **接口转换**：将一个接口转换成另一个接口
- **兼容性**：解决接口不兼容的问题
- **复用现有代码**：可以复用已有的类，而不需要修改其源代码
- **单一职责原则**：适配器负责接口转换，原类负责业务逻辑

## 应用场景

- **使用已有类，但接口不符合要求**：当需要使用一个已经存在的类，但它的接口不符合当前系统的需要时
- **创建可复用组件**：当需要创建一个可以与其他不相关或不可预见的类协同工作的可复用组件时
- **系统升级**：当系统升级时，需要兼容旧系统的接口
- **集成第三方库**：当需要集成第三方库，但它的接口与系统不一致时

## 结构

适配器模式包含以下角色：

1. **目标接口（Target）**：客户端期望的接口，适配器将原接口转换为此接口
2. **适配器（Adapter）**：将原接口转换为目标接口的类
3. **被适配者（Adaptee）**：需要被适配的类，它有一个不兼容的接口
4. **客户端（Client）**：使用目标接口的类

适配器模式有两种实现方式：

1. **类适配器**：通过继承实现，适配器继承被适配者并实现目标接口
2. **对象适配器**：通过组合实现，适配器持有被适配者的引用并实现目标接口

## 实现示例

### 1. 类适配器（通过继承实现）

```java
// 目标接口
public interface Target {
    void request();
}

// 被适配者类
public class Adaptee {
    public void specificRequest() {
        System.out.println("被适配者的特定请求");
    }
}

// 类适配器，通过继承被适配者并实现目标接口
public class ClassAdapter extends Adaptee implements Target {
    @Override
    public void request() {
        // 调用被适配者的方法，转换为目标接口的方法
        specificRequest();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 使用适配器
        Target target = new ClassAdapter();
        target.request(); // 客户端调用目标接口的方法，但实际执行的是被适配者的方法
    }
}
```

### 2. 对象适配器（通过组合实现）

```java
// 目标接口
public interface Target {
    void request();
}

// 被适配者类
public class Adaptee {
    public void specificRequest() {
        System.out.println("被适配者的特定请求");
    }
}

// 对象适配器，通过组合被适配者并实现目标接口
public class ObjectAdapter implements Target {
    private Adaptee adaptee; // 持有被适配者的引用
    
    public ObjectAdapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }
    
    @Override
    public void request() {
        // 调用被适配者的方法，转换为目标接口的方法
        adaptee.specificRequest();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 创建被适配者
        Adaptee adaptee = new Adaptee();
        
        // 创建适配器并传入被适配者
        Target target = new ObjectAdapter(adaptee);
        
        // 使用适配器
        target.request();
    }
}
```

## 实际应用示例：支付系统集成

下面是一个更贴近实际应用的例子，展示如何使用适配器模式集成不同的支付系统：

```java
// 目标接口：统一的支付接口
public interface PaymentProcessor {
    void processPayment(double amount);
    boolean verifyPayment();
    String getPaymentStatus();
}

// 被适配者1：支付宝支付系统
public class Alipay {
    public void pay(double money) {
        System.out.println("使用支付宝支付：" + money + "元");
    }
    
    public boolean confirmPay() {
        System.out.println("支付宝支付确认");
        return true;
    }
    
    public String getPayResult() {
        return "支付宝支付成功";
    }
}

// 被适配者2：微信支付系统
public class WechatPay {
    public void makePayment(double value) {
        System.out.println("使用微信支付：" + value + "元");
    }
    
    public boolean checkPayment() {
        System.out.println("微信支付检查");
        return true;
    }
    
    public String getResult() {
        return "微信支付成功";
    }
}

// 被适配者3：银联支付系统
public class UnionPay {
    public void doTransaction(double amount) {
        System.out.println("使用银联支付：" + amount + "元");
    }
    
    public boolean validateTransaction() {
        System.out.println("银联支付验证");
        return true;
    }
    
    public String getTransactionStatus() {
        return "银联支付成功";
    }
}

// 支付宝适配器
public class AlipayAdapter implements PaymentProcessor {
    private Alipay alipay;
    
    public AlipayAdapter() {
        this.alipay = new Alipay();
    }
    
    @Override
    public void processPayment(double amount) {
        alipay.pay(amount);
    }
    
    @Override
    public boolean verifyPayment() {
        return alipay.confirmPay();
    }
    
    @Override
    public String getPaymentStatus() {
        return alipay.getPayResult();
    }
}

// 微信支付适配器
public class WechatPayAdapter implements PaymentProcessor {
    private WechatPay wechatPay;
    
    public WechatPayAdapter() {
        this.wechatPay = new WechatPay();
    }
    
    @Override
    public void processPayment(double amount) {
        wechatPay.makePayment(amount);
    }
    
    @Override
    public boolean verifyPayment() {
        return wechatPay.checkPayment();
    }
    
    @Override
    public String getPaymentStatus() {
        return wechatPay.getResult();
    }
}

// 银联支付适配器
public class UnionPayAdapter implements PaymentProcessor {
    private UnionPay unionPay;
    
    public UnionPayAdapter() {
        this.unionPay = new UnionPay();
    }
    
    @Override
    public void processPayment(double amount) {
        unionPay.doTransaction(amount);
    }
    
    @Override
    public boolean verifyPayment() {
        return unionPay.validateTransaction();
    }
    
    @Override
    public String getPaymentStatus() {
        return unionPay.getTransactionStatus();
    }
}

// 支付工厂，用于创建不同的支付适配器
public class PaymentAdapterFactory {
    public static PaymentProcessor createPaymentProcessor(String paymentType) {
        switch (paymentType.toLowerCase()) {
            case "alipay":
                return new AlipayAdapter();
            case "wechat":
                return new WechatPayAdapter();
            case "unionpay":
                return new UnionPayAdapter();
            default:
                throw new IllegalArgumentException("不支持的支付方式: " + paymentType);
        }
    }
}

// 客户端：支付系统
public class PaymentSystem {
    public static void main(String[] args) {
        // 使用支付宝支付
        processPayment("alipay", 100.0);
        
        // 使用微信支付
        processPayment("wechat", 200.0);
        
        // 使用银联支付
        processPayment("unionpay", 300.0);
    }
    
    private static void processPayment(String paymentType, double amount) {
        System.out.println("\n开始处理" + paymentType + "支付...");
        
        // 通过工厂获取支付适配器
        PaymentProcessor processor = PaymentAdapterFactory.createPaymentProcessor(paymentType);
        
        // 统一的支付流程
        processor.processPayment(amount);
        if (processor.verifyPayment()) {
            String status = processor.getPaymentStatus();
            System.out.println("支付结果: " + status);
        } else {
            System.out.println("支付验证失败");
        }
    }
}
```

## 优缺点

### 优点

- **解决接口不兼容问题**：适配器模式可以解决两个接口不兼容的问题，使它们能够一起工作
- **复用现有代码**：可以复用已有的类，而不需要修改其源代码
- **符合开闭原则**：添加新的适配器不需要修改现有代码
- **单一职责原则**：适配器只负责接口转换，原类负责业务逻辑

### 缺点

- **增加系统复杂度**：引入适配器会增加系统的复杂度，使代码结构变得复杂
- **性能损耗**：由于需要进行接口转换，可能会有一定的性能损耗
- **过多的适配器会导致系统混乱**：如果系统中存在过多的适配器，可能会使系统变得难以维护

## 类适配器与对象适配器的比较

| 特性 | 类适配器 | 对象适配器 |
|------|---------|-----------|
| 实现方式 | 继承被适配者，实现目标接口 | 组合被适配者，实现目标接口 |
| 灵活性 | 较低，不能适配被适配者的子类 | 较高，可以适配被适配者的任意子类 |
| 遵循设计原则 | 违反组合优于继承原则 | 符合组合优于继承原则 |
| 重写方法 | 可以重写被适配者的方法 | 不能重写被适配者的方法 |
| Java支持 | 由于Java不支持多重继承，只能适配一个类 | 可以适配多个类 |

## 总结

适配器模式是一种常用的结构型设计模式，它可以解决接口不兼容的问题，使原本不能一起工作的类能够协同工作。适配器模式有两种实现方式：类适配器和对象适配器。在实际应用中，对象适配器更为常用，因为它符合组合优于继承的设计原则，具有更高的灵活性。适配器模式在系统集成、第三方库使用、系统升级等场景中广泛应用，是解决接口不兼容问题的有效方案。