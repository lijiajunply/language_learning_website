# 策略模式 (Strategy Pattern)

## 概述

策略模式是一种行为型设计模式，它定义了算法族，分别封装起来，让它们之间可以互相替换。策略模式让算法的变化独立于使用算法的客户。

策略模式的核心思想是将算法的定义与使用分离，通过组合而非继承的方式来实现算法的动态切换。这样，客户端可以根据需要选择不同的算法，而不需要修改代码。

## 核心要点

- **算法族**：定义一系列可以互相替换的算法
- **封装变化**：将每个算法封装在独立的类中
- **组合优于继承**：通过组合而非继承的方式使用算法
- **运行时切换**：可以在运行时动态地切换算法
- **开闭原则**：添加新算法不需要修改现有代码，只需要添加新的策略类

## 应用场景

- **多种算法选择**：当一个问题有多种解决方案，需要根据不同情况选择不同的解决方法时
- **算法动态切换**：当需要在运行时动态地切换算法时
- **避免条件语句**：当代码中存在大量的条件判断语句，用于选择不同的算法时
- **算法复用**：当多个类需要使用相同的算法，且算法可能会变化时

## 结构

策略模式包含以下角色：

1. **策略（Strategy）**：定义所有支持算法的公共接口
2. **具体策略（Concrete Strategy）**：实现策略接口，提供具体的算法实现
3. **上下文（Context）**：持有一个策略对象的引用，使用策略对象来执行算法

## 实现示例

### 1. 基本策略模式实现

```java
// 策略接口
public interface Strategy {
    int doOperation(int num1, int num2); // 执行操作
}

// 具体策略A：加法
public class OperationAdd implements Strategy {
    @Override
    public int doOperation(int num1, int num2) {
        return num1 + num2;
    }
}

// 具体策略B：减法
public class OperationSubtract implements Strategy {
    @Override
    public int doOperation(int num1, int num2) {
        return num1 - num2;
    }
}

// 具体策略C：乘法
public class OperationMultiply implements Strategy {
    @Override
    public int doOperation(int num1, int num2) {
        return num1 * num2;
    }
}

// 上下文类
public class Context {
    private Strategy strategy; // 持有策略对象的引用
    
    // 设置策略
    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }
    
    // 执行策略
    public int executeStrategy(int num1, int num2) {
        return strategy.doOperation(num1, num2);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 创建上下文对象
        Context context = new Context();
        
        // 使用加法策略
        context.setStrategy(new OperationAdd());
        System.out.println("10 + 5 = " + context.executeStrategy(10, 5));
        
        // 使用减法策略
        context.setStrategy(new OperationSubtract());
        System.out.println("10 - 5 = " + context.executeStrategy(10, 5));
        
        // 使用乘法策略
        context.setStrategy(new OperationMultiply());
        System.out.println("10 * 5 = " + context.executeStrategy(10, 5));
    }
}
```

## 实际应用示例：排序算法策略

下面是一个实际应用的例子，展示如何使用策略模式实现不同的排序算法：

```java
import java.util.Arrays;

// 排序策略接口
public interface SortingStrategy {
    void sort(int[] array); // 排序方法
    String getName(); // 获取策略名称
}

// 具体策略：冒泡排序
public class BubbleSortStrategy implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // 交换元素
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }
    
    @Override
    public String getName() {
        return "冒泡排序";
    }
}

// 具体策略：快速排序
public class QuickSortStrategy implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        quickSort(array, 0, array.length - 1);
    }
    
    private void quickSort(int[] array, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(array, low, high);
            quickSort(array, low, pivotIndex - 1);
            quickSort(array, pivotIndex + 1, high);
        }
    }
    
    private int partition(int[] array, int low, int high) {
        int pivot = array[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (array[j] <= pivot) {
                i++;
                // 交换元素
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        // 交换pivot
        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        return i + 1;
    }
    
    @Override
    public String getName() {
        return "快速排序";
    }
}

// 具体策略：插入排序
public class InsertionSortStrategy implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        int n = array.length;
        for (int i = 1; i < n; i++) {
            int key = array[i];
            int j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
    }
    
    @Override
    public String getName() {
        return "插入排序";
    }
}

// 上下文类：排序上下文
public class SortingContext {
    private SortingStrategy strategy; // 持有排序策略对象的引用
    
    // 设置排序策略
    public void setStrategy(SortingStrategy strategy) {
        this.strategy = strategy;
    }
    
    // 执行排序
    public void sortArray(int[] array) {
        if (strategy == null) {
            throw new IllegalStateException("排序策略未设置");
        }
        
        System.out.println("使用" + strategy.getName() + "进行排序");
        
        // 复制数组以便显示排序前后的对比
        int[] arrayCopy = Arrays.copyOf(array, array.length);
        
        // 记录排序前的数组
        System.out.println("排序前: " + Arrays.toString(arrayCopy));
        
        // 执行排序
        long startTime = System.currentTimeMillis();
        strategy.sort(arrayCopy);
        long endTime = System.currentTimeMillis();
        
        // 记录排序后的数组和执行时间
        System.out.println("排序后: " + Arrays.toString(arrayCopy));
        System.out.println("排序耗时: " + (endTime - startTime) + "ms");
    }
}

// 客户端：排序演示
public class SortingDemo {
    public static void main(String[] args) {
        // 创建排序上下文
        SortingContext context = new SortingContext();
        
        // 创建测试数组
        int[] array1 = {64, 34, 25, 12, 22, 11, 90};
        int[] array2 = {38, 27, 43, 3, 9, 82, 10};
        int[] array3 = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1}; // 逆序数组
        
        // 测试不同的排序策略
        System.out.println("=== 测试冒泡排序 ===");
        context.setStrategy(new BubbleSortStrategy());
        context.sortArray(array1);
        
        System.out.println("\n=== 测试快速排序 ===");
        context.setStrategy(new QuickSortStrategy());
        context.sortArray(array2);
        
        System.out.println("\n=== 测试插入排序 ===");
        context.setStrategy(new InsertionSortStrategy());
        context.sortArray(array3);
        
        // 演示在运行时切换策略
        System.out.println("\n=== 在运行时切换策略 ===");
        int[] array4 = {5, 2, 9, 1, 5, 6};
        
        // 先使用冒泡排序
        context.setStrategy(new BubbleSortStrategy());
        context.sortArray(array4);
        
        // 再使用快速排序
        System.out.println("\n切换到快速排序:");
        context.setStrategy(new QuickSortStrategy());
        context.sortArray(array4);
    }
}
```

## 实际应用示例：支付策略

下面是另一个实际应用的例子，展示如何使用策略模式实现不同的支付方式：

```java
// 支付策略接口
public interface PaymentStrategy {
    void pay(double amount); // 支付方法
    String getPaymentType(); // 获取支付类型
}

// 具体策略：信用卡支付
public class CreditCardPayment implements PaymentStrategy {
    private String cardNumber; // 卡号
    private String cardholderName; // 持卡人姓名
    private String cvv; // 安全码
    private String expiryDate; // 过期日期
    
    public CreditCardPayment(String cardNumber, String cardholderName, String cvv, String expiryDate) {
        this.cardNumber = cardNumber;
        this.cardholderName = cardholderName;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("使用信用卡支付 ¥" + amount);
        System.out.println("卡号: " + maskCardNumber(cardNumber));
        System.out.println("持卡人: " + cardholderName);
        System.out.println("信用卡支付处理中...");
        System.out.println("信用卡支付成功！");
    }
    
    private String maskCardNumber(String cardNumber) {
        // 隐藏卡号，只显示最后4位
        if (cardNumber.length() <= 4) {
            return cardNumber;
        }
        String masked = "*" .repeat(cardNumber.length() - 4);
        return masked + cardNumber.substring(cardNumber.length() - 4);
    }
    
    @Override
    public String getPaymentType() {
        return "信用卡支付";
    }
}

// 具体策略：支付宝支付
public class AlipayPayment implements PaymentStrategy {
    private String accountId; // 支付宝账户ID
    
    public AlipayPayment(String accountId) {
        this.accountId = accountId;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("使用支付宝支付 ¥" + amount);
        System.out.println("支付宝账户: " + accountId);
        System.out.println("生成支付宝二维码...");
        System.out.println("请使用支付宝扫描二维码完成支付");
        System.out.println("支付宝支付成功！");
    }
    
    @Override
    public String getPaymentType() {
        return "支付宝支付";
    }
}

// 具体策略：微信支付
public class WechatPayPayment implements PaymentStrategy {
    private String openId; // 微信用户ID
    
    public WechatPayPayment(String openId) {
        this.openId = openId;
    }
    
    @Override
    public void pay(double amount) {
        System.out.println("使用微信支付 ¥" + amount);
        System.out.println("微信用户: " + openId);
        System.out.println("调用微信支付接口...");
        System.out.println("请在微信中确认支付");
        System.out.println("微信支付成功！");
    }
    
    @Override
    public String getPaymentType() {
        return "微信支付";
    }
}

// 上下文类：支付上下文
public class PaymentContext {
    private PaymentStrategy strategy; // 持有支付策略对象的引用
    private double amount; // 支付金额
    
    // 设置支付策略
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }
    
    // 设置支付金额
    public void setAmount(double amount) {
        this.amount = amount;
    }
    
    // 执行支付
    public void executePayment() {
        if (strategy == null) {
            throw new IllegalStateException("支付策略未设置");
        }
        
        System.out.println("准备支付 ¥" + amount);
        System.out.println("选择的支付方式: " + strategy.getPaymentType());
        
        // 执行支付
        strategy.pay(amount);
        
        System.out.println("交易完成！\n");
    }
}

// 订单类
public class Order {
    private String orderId; // 订单ID
    private double amount; // 订单金额
    private PaymentContext paymentContext; // 支付上下文
    
    public Order(String orderId, double amount) {
        this.orderId = orderId;
        this.amount = amount;
        this.paymentContext = new PaymentContext();
        this.paymentContext.setAmount(amount);
    }
    
    // 支付订单
    public void pay(PaymentStrategy paymentStrategy) {
        System.out.println("处理订单: " + orderId);
        paymentContext.setPaymentStrategy(paymentStrategy);
        paymentContext.executePayment();
    }
}

// 客户端：支付演示
public class PaymentDemo {
    public static void main(String[] args) {
        // 创建订单
        Order order1 = new Order("ORD-1001", 999.0);
        Order order2 = new Order("ORD-1002", 499.5);
        Order order3 = new Order("ORD-1003", 1299.99);
        
        // 创建支付策略
        PaymentStrategy creditCardPayment = new CreditCardPayment(
                "1234567890123456", "张三", "123", "12/25");
        PaymentStrategy alipayPayment = new AlipayPayment("zhangsan@alipay.com");
        PaymentStrategy wechatPayPayment = new WechatPayPayment("wxuser123456");
        
        // 使用不同的支付方式支付订单
        System.out.println("=== 订单1支付 ===");
        order1.pay(creditCardPayment);
        
        System.out.println("=== 订单2支付 ===");
        order2.pay(alipayPayment);
        
        System.out.println("=== 订单3支付 ===");
        order3.pay(wechatPayPayment);
        
        // 演示相同订单使用不同的支付方式
        System.out.println("=== 订单1改用微信支付 ===");
        order1.pay(wechatPayPayment);
    }
}
```

## 优缺点

### 优点

- **开闭原则**：添加新的算法不需要修改现有代码，只需要添加新的策略类
- **避免条件语句**：消除了大量的条件判断语句
- **运行时切换**：可以在运行时动态地切换算法
- **代码复用**：算法可以被多个客户端复用
- **单一职责原则**：每个策略类只负责一个算法的实现

### 缺点

- **客户端需要了解所有策略**：客户端需要知道所有的策略类，以便选择合适的策略
- **增加了类的数量**：每个算法都需要一个对应的策略类，增加了系统中类的数量
- **策略之间的通信**：不同策略之间无法共享数据，除非通过外部上下文

## 与其他模式的关系

- **策略模式与工厂模式**：工厂模式用于创建对象，策略模式用于封装算法
- **策略模式与状态模式**：策略模式中，客户端主动选择策略；状态模式中，状态的切换由对象内部决定
- **策略模式与模板方法模式**：策略模式定义了算法的接口，模板方法模式定义了算法的骨架

## 总结

策略模式是一种强大的行为型设计模式，它允许在运行时动态地选择算法的实现。策略模式通过将算法封装在独立的策略类中，实现了算法的定义与使用分离，符合开闭原则和单一职责原则。策略模式在实际应用中广泛用于排序算法选择、支付方式选择、日志级别设置等场景。使用策略模式需要注意控制策略类的数量，避免系统变得过于复杂。