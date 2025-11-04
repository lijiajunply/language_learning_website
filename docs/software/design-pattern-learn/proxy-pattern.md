# 代理模式 (Proxy Pattern)

## 概述

代理模式是一种结构型设计模式，它允许你提供一个对象的替代品或占位符。代理控制对原对象的访问，并允许在访问对象前后执行一些操作。

代理模式的核心思想是通过引入一个代理对象来间接地访问目标对象，从而可以在访问目标对象的前后添加额外的逻辑，如权限控制、延迟加载、日志记录等。

## 核心要点

- **间接访问**：通过代理对象间接访问目标对象
- **控制访问**：代理可以控制对目标对象的访问权限
- **附加功能**：在访问目标对象前后添加额外的功能
- **保持接口一致**：代理对象和目标对象实现相同的接口
- **透明性**：客户端不需要知道它是在与代理对象还是目标对象交互

## 应用场景

- **远程代理**：为远程对象提供本地代理
- **虚拟代理**：延迟创建开销很大的对象，直到真正需要时才创建
- **保护代理**：控制对目标对象的访问权限
- **智能引用**：在访问对象时执行一些额外的操作，如计数引用、记录日志等
- **缓存代理**：为频繁访问的对象提供缓存功能

## 结构

代理模式包含以下角色：

1. **抽象主题（Subject）**：定义代理类和真实主题的共同接口
2. **真实主题（Real Subject）**：实现抽象主题接口，是代理对象所代表的真实对象
3. **代理（Proxy）**：实现抽象主题接口，持有一个真实主题对象的引用

## 实现示例

### 1. 基本代理模式实现

```java
// 抽象主题接口
public interface Subject {
    void request(); // 请求方法
}

// 真实主题类
public class RealSubject implements Subject {
    @Override
    public void request() {
        System.out.println("真实主题执行请求");
    }
}

// 代理类
public class Proxy implements Subject {
    private RealSubject realSubject; // 持有真实主题对象的引用
    
    @Override
    public void request() {
        // 在访问真实主题前执行操作
        beforeRequest();
        
        // 如果真实主题对象不存在，则创建它（延迟加载）
        if (realSubject == null) {
            realSubject = new RealSubject();
        }
        
        // 调用真实主题的方法
        realSubject.request();
        
        // 在访问真实主题后执行操作
        afterRequest();
    }
    
    // 访问前的操作
    private void beforeRequest() {
        System.out.println("代理：请求前的预处理");
    }
    
    // 访问后的操作
    private void afterRequest() {
        System.out.println("代理：请求后的后处理");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 使用代理对象
        Subject proxy = new Proxy();
        System.out.println("第一次访问:");
        proxy.request(); // 第一次访问时会创建真实主题对象
        
        System.out.println("\n第二次访问:");
        proxy.request(); // 第二次访问时复用已创建的真实主题对象
    }
}
```

## 代理模式的类型

### 1. 静态代理

静态代理是在编译时就已经确定的代理关系，代理类是手动编写的。

```java
// 抽象主题接口
public interface Image {
    void display(); // 显示图像
}

// 真实主题类：真实图像
public class RealImage implements Image {
    private String filename; // 图像文件名
    
    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk(); // 从磁盘加载图像
    }
    
    private void loadFromDisk() {
        System.out.println("从磁盘加载图像: " + filename);
        // 模拟耗时操作
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public void display() {
        System.out.println("显示图像: " + filename);
    }
}

// 代理类：图像代理（虚拟代理）
public class ImageProxy implements Image {
    private String filename; // 图像文件名
    private RealImage realImage; // 真实图像对象
    
    public ImageProxy(String filename) {
        this.filename = filename;
    }
    
    @Override
    public void display() {
        // 延迟加载：只在真正需要时才创建真实图像对象
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}

// 客户端：图像查看器
public class ImageViewer {
    public static void main(String[] args) {
        System.out.println("创建代理对象:");
        Image image1 = new ImageProxy("风景.jpg"); // 此时不会加载图像
        Image image2 = new ImageProxy("人物.jpg"); // 此时不会加载图像
        
        System.out.println("\n第一次显示图像1:");
        image1.display(); // 第一次显示时才加载图像
        
        System.out.println("\n第二次显示图像1:");
        image1.display(); // 第二次显示时直接复用已加载的图像
        
        System.out.println("\n第一次显示图像2:");
        image2.display(); // 第一次显示时才加载图像
    }
}
```

### 2. 动态代理

动态代理是在运行时动态创建的代理关系，代理类是通过反射机制动态生成的。Java中常用的动态代理有JDK动态代理和CGLIB动态代理。

#### JDK动态代理

JDK动态代理是通过`java.lang.reflect.Proxy`类和`java.lang.reflect.InvocationHandler`接口实现的。

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

// 抽象主题接口
public interface Calculator {
    int add(int a, int b); // 加法
    int subtract(int a, int b); // 减法
    int multiply(int a, int b); // 乘法
    int divide(int a, int b); // 除法
}

// 真实主题类：计算器实现
public class CalculatorImpl implements Calculator {
    @Override
    public int add(int a, int b) {
        return a + b;
    }
    
    @Override
    public int subtract(int a, int b) {
        return a - b;
    }
    
    @Override
    public int multiply(int a, int b) {
        return a * b;
    }
    
    @Override
    public int divide(int a, int b) {
        return a / b;
    }
}

// 调用处理器
public class CalculatorProxyHandler implements InvocationHandler {
    private Object target; // 目标对象
    
    public CalculatorProxyHandler(Object target) {
        this.target = target;
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 记录日志
        System.out.println("[日志] 调用方法: " + method.getName());
        System.out.println("[日志] 参数: " + java.util.Arrays.toString(args));
        
        // 执行前的验证（保护代理）
        if (method.getName().equals("divide")) {
            int divisor = (int) args[1];
            if (divisor == 0) {
                throw new IllegalArgumentException("除数不能为零");
            }
        }
        
        // 记录开始时间
        long startTime = System.currentTimeMillis();
        
        // 调用目标对象的方法
        Object result = method.invoke(target, args);
        
        // 记录结束时间
        long endTime = System.currentTimeMillis();
        
        // 记录结果和执行时间
        System.out.println("[日志] 结果: " + result);
        System.out.println("[日志] 执行时间: " + (endTime - startTime) + "ms");
        
        return result;
    }
}

// 代理工厂
public class ProxyFactory {
    // 创建动态代理对象
    @SuppressWarnings("unchecked")
    public static <T> T createProxy(T target) {
        return (T) Proxy.newProxyInstance(
                target.getClass().getClassLoader(), // 类加载器
                target.getClass().getInterfaces(), // 接口数组
                new CalculatorProxyHandler(target) // 调用处理器
        );
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 创建真实对象
        Calculator calculator = new CalculatorImpl();
        
        // 创建代理对象
        Calculator proxy = ProxyFactory.createProxy(calculator);
        
        // 使用代理对象
        System.out.println("\n执行加法:");
        int addResult = proxy.add(10, 5);
        
        System.out.println("\n执行减法:");
        int subResult = proxy.subtract(10, 5);
        
        System.out.println("\n执行乘法:");
        int mulResult = proxy.multiply(10, 5);
        
        System.out.println("\n执行除法:");
        int divResult = proxy.divide(10, 5);
        
        try {
            System.out.println("\n尝试除以零:");
            proxy.divide(10, 0);
        } catch (Exception e) {
            System.out.println("[异常] " + e.getCause().getMessage());
        }
    }
}
```

## 实际应用示例：远程代理

下面是一个实际应用的例子，展示如何使用代理模式实现远程服务调用：

```java
// 远程服务接口
public interface RemoteService {
    String getData(String id); // 获取数据
    void saveData(String id, String data); // 保存数据
}

// 真实远程服务实现（在远程服务器上运行）
public class RemoteServiceImpl implements RemoteService {
    @Override
    public String getData(String id) {
        System.out.println("远程服务: 获取ID为 " + id + " 的数据");
        // 模拟数据库操作
        return "数据 for " + id;
    }
    
    @Override
    public void saveData(String id, String data) {
        System.out.println("远程服务: 保存ID为 " + id + " 的数据: " + data);
        // 模拟数据库操作
    }
}

// 远程代理类（在本地运行）
public class RemoteServiceProxy implements RemoteService {
    private String remoteServerAddress; // 远程服务器地址
    
    public RemoteServiceProxy(String remoteServerAddress) {
        this.remoteServerAddress = remoteServerAddress;
    }
    
    @Override
    public String getData(String id) {
        System.out.println("代理: 连接到远程服务器 " + remoteServerAddress);
        
        try {
            // 模拟网络通信延迟
            Thread.sleep(500);
            
            // 模拟网络请求
            System.out.println("代理: 发送请求获取数据，ID: " + id);
            
            // 在实际应用中，这里会通过网络发送请求到远程服务器
            // 这里为了演示，直接创建真实服务对象并调用
            RemoteService realService = new RemoteServiceImpl();
            String result = realService.getData(id);
            
            System.out.println("代理: 接收响应数据");
            return result;
        } catch (Exception e) {
            System.out.println("代理: 网络请求失败: " + e.getMessage());
            return null;
        }
    }
    
    @Override
    public void saveData(String id, String data) {
        System.out.println("代理: 连接到远程服务器 " + remoteServerAddress);
        
        try {
            // 模拟网络通信延迟
            Thread.sleep(500);
            
            // 模拟网络请求
            System.out.println("代理: 发送请求保存数据，ID: " + id + ", 数据: " + data);
            
            // 在实际应用中，这里会通过网络发送请求到远程服务器
            // 这里为了演示，直接创建真实服务对象并调用
            RemoteService realService = new RemoteServiceImpl();
            realService.saveData(id, data);
            
            System.out.println("代理: 保存请求已发送");
        } catch (Exception e) {
            System.out.println("代理: 网络请求失败: " + e.getMessage());
        }
    }
}

// 客户端：远程服务使用者
public class RemoteServiceClient {
    public static void main(String[] args) {
        // 创建远程代理对象
        RemoteService proxy = new RemoteServiceProxy("http://remote-server:8080");
        
        // 使用代理对象获取数据
        System.out.println("\n获取数据:");
        String data = proxy.getData("123");
        System.out.println("获取到的数据: " + data);
        
        // 使用代理对象保存数据
        System.out.println("\n保存数据:");
        proxy.saveData("456", "新的数据内容");
    }
}
```

## 优缺点

### 优点

- **保护目标对象**：代理可以控制对目标对象的访问权限
- **增强目标对象**：可以在访问目标对象前后添加额外的功能
- **解耦**：客户端与目标对象之间通过代理进行通信，降低了耦合度
- **延迟加载**：可以实现延迟加载，只有在真正需要时才创建目标对象
- **透明性**：客户端不需要知道它是在与代理对象还是目标对象交互

### 缺点

- **增加系统复杂度**：引入代理类增加了系统的复杂度
- **性能开销**：代理的存在会增加一定的性能开销，特别是动态代理
- **可能导致请求处理速度变慢**：由于在访问目标对象前后添加了额外的逻辑，可能会导致请求处理速度变慢

## 与其他模式的关系

- **代理模式与装饰器模式**：代理模式关注的是控制访问，装饰器模式关注的是动态添加功能
- **代理模式与适配器模式**：代理模式保持接口一致，适配器模式改变接口
- **代理模式与外观模式**：代理模式代表单个对象，外观模式代表整个子系统

## 总结

代理模式是一种强大的结构型设计模式，它通过引入一个代理对象来间接地访问目标对象，从而可以在访问目标对象的前后添加额外的逻辑。代理模式在实际应用中广泛用于远程调用、延迟加载、权限控制、日志记录等场景。代理模式有静态代理和动态代理两种实现方式，其中动态代理更加灵活，可以在运行时动态创建代理对象。使用代理模式需要注意控制性能开销，避免过度使用导致系统复杂度过高。