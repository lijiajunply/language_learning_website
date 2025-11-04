# 责任链模式 (Chain of Responsibility Pattern)

## 概述

责任链模式是一种行为型设计模式，它允许多个对象处理同一个请求，避免请求的发送者和接收者之间的耦合关系。将这些对象连接成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

责任链模式的核心思想是将请求的处理者组织成一个链式结构，每个处理者都可以决定是处理请求还是将请求传递给链中的下一个处理者。这样可以灵活地动态组织处理流程，并且使处理者和请求发送者解耦。

## 核心要点

- **链式结构**：将多个处理者组成一条链
- **请求传递**：请求沿着链传递，直到有一个处理者处理它
- **解耦设计**：请求的发送者不需要知道哪个处理者会处理请求
- **动态组合**：可以灵活地动态调整处理者的顺序和数量
- **单一责任**：每个处理者只负责自己能处理的请求

## 应用场景

- **请求处理流程可能变化时**：需要动态调整请求的处理流程
- **多个对象可以处理一个请求时**：不确定哪个对象最终会处理请求
- **避免请求的发送者与接收者之间的耦合时**：实现松耦合的设计
- **需要按顺序处理请求时**：如日志系统、异常处理、审批流程等

## 结构

责任链模式包含以下角色：

1. **抽象处理者（Handler）**：定义处理请求的接口，包含一个指向下一个处理者的引用
2. **具体处理者（Concrete Handler）**：实现抽象处理者的接口，处理自己能处理的请求，或将请求传递给下一个处理者
3. **客户端（Client）**：创建处理链，并向链中的第一个处理者提交请求

## 实现示例

### 1. 基本责任链模式实现

```java
// 抽象处理者
public abstract class Handler {
    protected Handler nextHandler; // 下一个处理者
    protected String name; // 处理者名称
    
    public Handler(String name) {
        this.name = name;
    }
    
    // 设置下一个处理者
    public void setNextHandler(Handler nextHandler) {
        this.nextHandler = nextHandler;
    }
    
    // 处理请求
    public abstract void handleRequest(Request request);
    
    // 获取名称
    public String getName() {
        return name;
    }
}

// 请求类
public class Request {
    private String content; // 请求内容
    private RequestLevel level; // 请求级别
    
    public Request(String content, RequestLevel level) {
        this.content = content;
        this.level = level;
    }
    
    // getter方法
    public String getContent() {
        return content;
    }
    
    public RequestLevel getLevel() {
        return level;
    }
    
    @Override
    public String toString() {
        return "请求[内容='" + content + "', 级别=" + level + "]";
    }
}

// 请求级别枚举
public enum RequestLevel {
    LOW,    // 低级请求
    MEDIUM, // 中级请求
    HIGH,   // 高级请求
    CRITICAL // 紧急请求
}

// 具体处理者：低级处理者
public class LowLevelHandler extends Handler {
    public LowLevelHandler(String name) {
        super(name);
    }
    
    @Override
    public void handleRequest(Request request) {
        if (request.getLevel() == RequestLevel.LOW) {
            System.out.println(name + " 处理了 " + request + " (低级处理者只能处理低级请求)");
        } else if (nextHandler != null) {
            System.out.println(name + " 无法处理 " + request + "，将请求传递给 " + nextHandler.getName());
            nextHandler.handleRequest(request);
        } else {
            System.out.println(name + " 无法处理 " + request + "，且没有下一个处理者");
        }
    }
}

// 具体处理者：中级处理者
public class MediumLevelHandler extends Handler {
    public MediumLevelHandler(String name) {
        super(name);
    }
    
    @Override
    public void handleRequest(Request request) {
        if (request.getLevel() == RequestLevel.LOW || request.getLevel() == RequestLevel.MEDIUM) {
            System.out.println(name + " 处理了 " + request + " (中级处理者可以处理低级和中级请求)");
        } else if (nextHandler != null) {
            System.out.println(name + " 无法处理 " + request + "，将请求传递给 " + nextHandler.getName());
            nextHandler.handleRequest(request);
        } else {
            System.out.println(name + " 无法处理 " + request + "，且没有下一个处理者");
        }
    }
}

// 具体处理者：高级处理者
public class HighLevelHandler extends Handler {
    public HighLevelHandler(String name) {
        super(name);
    }
    
    @Override
    public void handleRequest(Request request) {
        if (request.getLevel() == RequestLevel.LOW || 
            request.getLevel() == RequestLevel.MEDIUM || 
            request.getLevel() == RequestLevel.HIGH) {
            System.out.println(name + " 处理了 " + request + " (高级处理者可以处理低、中、高级请求)");
        } else if (nextHandler != null) {
            System.out.println(name + " 无法处理 " + request + "，将请求传递给 " + nextHandler.getName());
            nextHandler.handleRequest(request);
        } else {
            System.out.println(name + " 无法处理 " + request + "，且没有下一个处理者");
        }
    }
}

// 具体处理者：紧急处理者
public class CriticalHandler extends Handler {
    public CriticalHandler(String name) {
        super(name);
    }
    
    @Override
    public void handleRequest(Request request) {
        // 紧急处理者可以处理所有级别的请求
        System.out.println(name + " 处理了 " + request + " (紧急处理者可以处理所有级别的请求)");
    }
}

// 客户端
public class ChainOfResponsibilityDemo {
    public static void main(String[] args) {
        // 创建处理者
        Handler lowHandler = new LowLevelHandler("一线员工");
        Handler mediumHandler = new MediumLevelHandler("部门经理");
        Handler highHandler = new HighLevelHandler("总监");
        Handler criticalHandler = new CriticalHandler("总经理");
        
        // 设置责任链
        lowHandler.setNextHandler(mediumHandler);
        mediumHandler.setNextHandler(highHandler);
        highHandler.setNextHandler(criticalHandler);
        
        System.out.println("===== 责任链模式演示 =====\n");
        
        // 创建不同级别的请求
        Request lowRequest = new Request("普通办公设备故障", RequestLevel.LOW);
        Request mediumRequest = new Request("部门预算申请", RequestLevel.MEDIUM);
        Request highRequest = new Request("重大项目立项", RequestLevel.HIGH);
        Request criticalRequest = new Request("公司危机事件", RequestLevel.CRITICAL);
        
        // 提交请求给责任链
        System.out.println("提交低级请求:");
        lowHandler.handleRequest(lowRequest);
        System.out.println();
        
        System.out.println("提交中级请求:");
        lowHandler.handleRequest(mediumRequest);
        System.out.println();
        
        System.out.println("提交高级请求:");
        lowHandler.handleRequest(highRequest);
        System.out.println();
        
        System.out.println("提交紧急请求:");
        lowHandler.handleRequest(criticalRequest);
        System.out.println();
        
        // 演示直接提交请求给特定处理者
        System.out.println("直接向部门经理提交低级请求:");
        mediumHandler.handleRequest(lowRequest);
        System.out.println();
        
        System.out.println("直接向总监提交紧急请求:");
        highHandler.handleRequest(criticalRequest);
    }
}
```

## 2. 更灵活的责任链实现

下面是一个更灵活的责任链实现，可以动态调整链的结构，并支持更复杂的请求处理逻辑：

```java
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

// 泛型请求接口
public interface Request {
    String getDescription();
}

// 具体请求类
public class ConcreteRequest implements Request {
    private String description;
    private int priority; // 优先级
    private String category; // 类别
    
    public ConcreteRequest(String description, int priority, String category) {
        this.description = description;
        this.priority = priority;
        this.category = category;
    }
    
    @Override
    public String getDescription() {
        return description;
    }
    
    public int getPriority() {
        return priority;
    }
    
    public String getCategory() {
        return category;
    }
    
    @Override
    public String toString() {
        return "请求[描述='" + description + "', 优先级=" + priority + ", 类别='" + category + "']";
    }
}

// 泛型处理者接口
public interface Handler<T extends Request> {
    boolean canHandle(T request);
    void handle(T request);
}

// 具体处理者：优先级处理者
public class PriorityHandler implements Handler<ConcreteRequest> {
    private int minPriority;
    private int maxPriority;
    private String name;
    
    public PriorityHandler(String name, int minPriority, int maxPriority) {
        this.name = name;
        this.minPriority = minPriority;
        this.maxPriority = maxPriority;
    }
    
    @Override
    public boolean canHandle(ConcreteRequest request) {
        return request.getPriority() >= minPriority && request.getPriority() <= maxPriority;
    }
    
    @Override
    public void handle(ConcreteRequest request) {
        System.out.println(name + " 处理了 " + request);
        System.out.println("  处理逻辑：根据优先级 " + request.getPriority() + " 进行处理");
    }
    
    @Override
    public String toString() {
        return name + " (优先级范围: " + minPriority + "-" + maxPriority + ")";
    }
}

// 具体处理者：类别处理者
public class CategoryHandler implements Handler<ConcreteRequest> {
    private String category;
    private String name;
    
    public CategoryHandler(String name, String category) {
        this.name = name;
        this.category = category;
    }
    
    @Override
    public boolean canHandle(ConcreteRequest request) {
        return category.equals(request.getCategory());
    }
    
    @Override
    public void handle(ConcreteRequest request) {
        System.out.println(name + " 处理了 " + request);
        System.out.println("  处理逻辑：根据类别 '" + request.getCategory() + "' 进行专业处理");
    }
    
    @Override
    public String toString() {
        return name + " (类别: '" + category + "')";
    }
}

// 具体处理者：条件处理者
public class ConditionHandler implements Handler<ConcreteRequest> {
    private Predicate<ConcreteRequest> condition;
    private String name;
    
    public ConditionHandler(String name, Predicate<ConcreteRequest> condition) {
        this.name = name;
        this.condition = condition;
    }
    
    @Override
    public boolean canHandle(ConcreteRequest request) {
        return condition.test(request);
    }
    
    @Override
    public void handle(ConcreteRequest request) {
        System.out.println(name + " 处理了 " + request);
        System.out.println("  处理逻辑：根据自定义条件进行处理");
    }
    
    @Override
    public String toString() {
        return name;
    }
}

// 责任链管理器
public class HandlerChain<T extends Request> {
    private List<Handler<T>> handlers = new ArrayList<>();
    private boolean breakOnFirstHandle = true; // 是否在第一个处理者处理后中断
    
    // 添加处理者
    public HandlerChain<T> addHandler(Handler<T> handler) {
        handlers.add(handler);
        return this; // 支持链式调用
    }
    
    // 设置是否在第一个处理者处理后中断
    public HandlerChain<T> setBreakOnFirstHandle(boolean breakOnFirstHandle) {
        this.breakOnFirstHandle = breakOnFirstHandle;
        return this;
    }
    
    // 处理请求
    public boolean process(T request) {
        System.out.println("开始处理请求: " + request);
        boolean handled = false;
        
        for (Handler<T> handler : handlers) {
            if (handler.canHandle(request)) {
                handler.handle(request);
                handled = true;
                if (breakOnFirstHandle) {
                    System.out.println("请求已处理，责任链中断\n");
                    return true;
                }
            } else {
                System.out.println(handler + " 无法处理请求");
            }
        }
        
        if (!handled) {
            System.out.println("请求未被任何处理者处理\n");
        } else {
            System.out.println("请求处理完成\n");
        }
        return handled;
    }
    
    // 清除所有处理者
    public void clear() {
        handlers.clear();
    }
    
    // 获取处理者数量
    public int size() {
        return handlers.size();
    }
    
    // 显示处理者链
    public void displayChain() {
        System.out.println("\n=== 责任链结构 ===");
        for (int i = 0; i < handlers.size(); i++) {
            System.out.println("处理者 " + (i + 1) + ": " + handlers.get(i));
        }
        System.out.println("中断策略: " + (breakOnFirstHandle ? "第一个处理后中断" : "所有可处理者都处理"));
        System.out.println("=================\n");
    }
}

// 客户端：灵活责任链演示
public class FlexibleChainDemo {
    public static void main(String[] args) {
        // 创建处理者
        PriorityHandler lowPriorityHandler = new PriorityHandler("低级处理者", 1, 3);
        PriorityHandler mediumPriorityHandler = new PriorityHandler("中级处理者", 4, 7);
        PriorityHandler highPriorityHandler = new PriorityHandler("高级处理者", 8, 10);
        
        CategoryHandler techHandler = new CategoryHandler("技术处理者", "技术");
        CategoryHandler financeHandler = new CategoryHandler("财务处理者", "财务");
        CategoryHandler hrHandler = new CategoryHandler("人事处理者", "人事");
        
        ConditionHandler specialHandler = new ConditionHandler(
            "特殊处理者", 
            request -> request.getDescription().contains("特殊")
        );
        
        // 创建责任链1：按优先级处理，第一个能处理就中断
        HandlerChain<ConcreteRequest> priorityChain = new HandlerChain<>();
        priorityChain.addHandler(lowPriorityHandler)
                    .addHandler(mediumPriorityHandler)
                    .addHandler(highPriorityHandler)
                    .setBreakOnFirstHandle(true);
        priorityChain.displayChain();
        
        // 创建责任链2：按类别处理，允许多个处理者处理
        HandlerChain<ConcreteRequest> categoryChain = new HandlerChain<>();
        categoryChain.addHandler(techHandler)
                    .addHandler(financeHandler)
                    .addHandler(hrHandler)
                    .addHandler(specialHandler)
                    .setBreakOnFirstHandle(false);
        categoryChain.displayChain();
        
        // 创建责任链3：混合处理，先检查特殊请求，再按优先级处理
        HandlerChain<ConcreteRequest> mixedChain = new HandlerChain<>();
        mixedChain.addHandler(specialHandler)
                 .addHandler(techHandler)
                 .addHandler(mediumPriorityHandler)
                 .setBreakOnFirstHandle(true);
        mixedChain.displayChain();
        
        // 创建不同的请求
        ConcreteRequest lowPriorityRequest = new ConcreteRequest("常规技术支持", 2, "技术");
        ConcreteRequest mediumPriorityRequest = new ConcreteRequest("设备采购申请", 5, "财务");
        ConcreteRequest highPriorityRequest = new ConcreteRequest("服务器故障", 9, "技术");
        ConcreteRequest specialRequest = new ConcreteRequest("特殊项目审批", 6, "财务");
        ConcreteRequest人事Request = new ConcreteRequest("员工招聘计划", 4, "人事");
        
        // 使用优先级责任链处理请求
        System.out.println("\n===== 使用优先级责任链 =====");
        priorityChain.process(lowPriorityRequest);
        priorityChain.process(mediumPriorityRequest);
        priorityChain.process(highPriorityRequest);
        
        // 使用类别责任链处理请求
        System.out.println("\n===== 使用类别责任链 =====");
        categoryChain.process(lowPriorityRequest);
        categoryChain.process(mediumPriorityRequest);
        categoryChain.process(specialRequest); // 同时满足类别和特殊条件
        categoryChain.process(人事Request);
        
        // 使用混合责任链处理请求
        System.out.println("\n===== 使用混合责任链 =====");
        mixedChain.process(lowPriorityRequest);
        mixedChain.process(specialRequest);
        mixedChain.process(mediumPriorityRequest);
    }
}
```

## 实际应用示例：日志记录系统

下面是一个实际应用的例子，展示如何使用责任链模式实现一个灵活的日志记录系统：

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

// 日志级别枚举
public enum LogLevel {
    DEBUG,   // 调试信息
    INFO,    // 一般信息
    WARNING, // 警告信息
    ERROR,   // 错误信息
    FATAL    // 致命错误
}

// 日志消息类
public class LogMessage {
    private LogLevel level;
    private String message;
    private String source;
    private LocalDateTime timestamp;
    
    public LogMessage(LogLevel level, String message, String source) {
        this.level = level;
        this.message = message;
        this.source = source;
        this.timestamp = LocalDateTime.now();
    }
    
    // getter方法
    public LogLevel getLevel() { return level; }
    public String getMessage() { return message; }
    public String getSource() { return source; }
    public LocalDateTime getTimestamp() { return timestamp; }
    
    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        return String.format("[%s] [%s] [%s] %s", 
                timestamp.format(formatter), 
                level, 
                source, 
                message);
    }
}

// 抽象日志处理器
public abstract class LogHandler {
    protected LogHandler nextHandler;
    protected LogLevel minLevel;
    protected String name;
    
    public LogHandler(String name, LogLevel minLevel) {
        this.name = name;
        this.minLevel = minLevel;
    }
    
    // 设置下一个处理器
    public LogHandler setNextHandler(LogHandler nextHandler) {
        this.nextHandler = nextHandler;
        return nextHandler; // 返回下一个处理器以支持链式调用
    }
    
    // 处理日志
    public void handleLog(LogMessage logMessage) {
        if (shouldHandle(logMessage)) {
            processLog(logMessage);
        }
        
        // 无论当前处理器是否处理，都传递给下一个处理器
        if (nextHandler != null) {
            nextHandler.handleLog(logMessage);
        }
    }
    
    // 判断是否应该处理该日志
    protected boolean shouldHandle(LogMessage logMessage) {
        return logMessage.getLevel().ordinal() >= minLevel.ordinal();
    }
    
    // 处理日志的具体方法（由子类实现）
    protected abstract void processLog(LogMessage logMessage);
    
    // 获取处理器名称
    public String getName() {
        return name;
    }
}

// 控制台日志处理器
public class ConsoleLogHandler extends LogHandler {
    public ConsoleLogHandler(LogLevel minLevel) {
        super("控制台日志", minLevel);
    }
    
    @Override
    protected void processLog(LogMessage logMessage) {
        System.out.println("[控制台] " + logMessage);
    }
}

// 文件日志处理器
public class FileLogHandler extends LogHandler {
    private String filePath;
    private List<String> logBuffer = new ArrayList<>(); // 模拟日志文件
    
    public FileLogHandler(String filePath, LogLevel minLevel) {
        super("文件日志", minLevel);
        this.filePath = filePath;
    }
    
    @Override
    protected void processLog(LogMessage logMessage) {
        String logEntry = logMessage.toString();
        logBuffer.add(logEntry);
        System.out.println("[文件: