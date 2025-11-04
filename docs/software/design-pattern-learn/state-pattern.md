# 状态模式 (State Pattern)

## 概述

状态模式是一种行为型设计模式，它允许对象在内部状态发生变化时改变其行为。对象看起来好像修改了它的类，因为它的行为会随着其状态的改变而改变。

状态模式的核心思想是将对象的状态封装为独立的类，每个状态类实现特定状态下的行为。当对象的状态发生变化时，它会切换到对应的状态对象，从而改变其行为方式。

## 核心要点

- **状态封装**：将不同状态的行为封装到单独的状态类中
- **行为切换**：通过切换状态对象来改变对象的行为
- **状态转换**：状态转换可以在状态类内部或上下文类中控制
- **单一职责**：每个状态类只负责处理一种状态下的行为
- **消除条件语句**：用多态替代复杂的条件判断语句

## 应用场景

- **对象行为随状态改变**：当一个对象的行为取决于其当前状态，并且需要在运行时根据状态改变行为
- **复杂条件语句**：当对象的行为包含大量与状态相关的条件判断语句
- **状态转换明确**：当对象的状态转换关系比较明确且可预测
- **有限状态机**：实现有限状态机（FSM）的场景
- **工作流引擎**：实现业务流程中的状态转换和行为控制

## 结构

状态模式包含以下角色：

1. **上下文（Context）**：维护一个指向当前状态对象的引用，并将与状态相关的操作委托给当前状态对象
2. **状态（State）**：定义所有具体状态的共同接口
3. **具体状态（Concrete State）**：实现状态接口，定义特定状态下的行为，并处理状态转换

## 实现示例

### 1. 基本状态模式实现

```java
// 状态接口
public interface State {
    // 处理请求的方法
    void handle(Context context);
    // 获取状态名称
    String getStateName();
}

// 上下文类
public class Context {
    private State currentState; // 当前状态
    private String name; // 上下文名称
    private int count = 0; // 状态转换计数
    
    public Context(String name) {
        this.name = name;
        // 默认初始状态为状态A
        this.currentState = new ConcreteStateA();
        System.out.println("创建上下文 '" + name + "'，初始状态为: " + currentState.getStateName());
    }
    
    // 设置当前状态
    public void setState(State state) {
        if (this.currentState != state) {
            this.currentState = state;
            this.count++;
            System.out.println("上下文 '" + name + "' 状态变更为: " + state.getStateName() + 
                             "，转换计数: " + count);
        }
    }
    
    // 获取当前状态
    public State getState() {
        return currentState;
    }
    
    // 处理请求（委托给当前状态）
    public void request() {
        System.out.println("上下文 '" + name + "' 收到请求，当前状态: " + currentState.getStateName());
        currentState.handle(this);
    }
    
    // 获取上下文名称
    public String getName() {
        return name;
    }
    
    // 获取状态转换计数
    public int getCount() {
        return count;
    }
    
    @Override
    public String toString() {
        return "Context{name='" + name + "', state=" + currentState.getStateName() + ", count=" + count + "}";
    }
}

// 具体状态A
public class ConcreteStateA implements State {
    @Override
    public void handle(Context context) {
        System.out.println("状态A 处理请求");
        // 状态转换：从A转换到B
        System.out.println("触发状态转换：A -> B");
        context.setState(new ConcreteStateB());
    }
    
    @Override
    public String getStateName() {
        return "ConcreteStateA";
    }
    
    @Override
    public String toString() {
        return getStateName();
    }
}

// 具体状态B
public class ConcreteStateB implements State {
    @Override
    public void handle(Context context) {
        System.out.println("状态B 处理请求");
        // 状态转换：从B转换到C
        System.out.println("触发状态转换：B -> C");
        context.setState(new ConcreteStateC());
    }
    
    @Override
    public String getStateName() {
        return "ConcreteStateB";
    }
    
    @Override
    public String toString() {
        return getStateName();
    }
}

// 具体状态C
public class ConcreteStateC implements State {
    @Override
    public void handle(Context context) {
        System.out.println("状态C 处理请求");
        // 状态转换：从C转换回A，形成一个循环
        System.out.println("触发状态转换：C -> A");
        context.setState(new ConcreteStateA());
    }
    
    @Override
    public String getStateName() {
        return "ConcreteStateC";
    }
    
    @Override
    public String toString() {
        return getStateName();
    }
}

// 客户端
public class StatePatternDemo {
    public static void main(String[] args) {
        // 创建上下文
        Context context = new Context("示例上下文");
        System.out.println("\n===== 状态模式演示 =====\n");
        
        // 执行多次请求，观察状态转换
        for (int i = 1; i <= 5; i++) {
            System.out.println("\n----- 请求 #" + i + " -----");
            context.request();
            System.out.println("当前上下文状态: " + context);
        }
        
        // 创建第二个上下文进行对比
        System.out.println("\n----- 创建第二个上下文 -----");
        Context context2 = new Context("对比上下文");
        
        // 直接设置状态（外部控制状态转换）
        System.out.println("\n----- 外部控制状态转换 -----");
        context2.setState(new ConcreteStateC());
        context2.request();
        
        System.out.println("\n===== 演示结束 =====");
        System.out.println("第一个上下文最终状态: " + context);
        System.out.println("第二个上下文最终状态: " + context2);
    }
}
```

### 2. 复杂状态机实现

下面是一个更复杂的状态机实现，展示如何处理更复杂的状态转换逻辑：

```java
import java.util.HashMap;
import java.util.Map;

// 事件类型枚举
enum EventType {
    EVENT_A, EVENT_B, EVENT_C, EVENT_D
}

// 状态接口
public interface State {
    // 获取状态名称
    String getStateName();
    // 处理特定事件
    State handleEvent(EventType event);
    // 进入状态时的行为
    void onEntry();
    // 退出状态时的行为
    void onExit();
}

// 上下文类（状态机）
public class StateMachine {
    private String name; // 状态机名称
    private State currentState; // 当前状态
    private Map<String, State> states = new HashMap<>(); // 所有可能的状态
    private int transitionCount = 0; // 状态转换计数
    
    public StateMachine(String name) {
        this.name = name;
        System.out.println("创建状态机: " + name);
    }
    
    // 添加状态
    public void addState(State state) {
        states.put(state.getStateName(), state);
        System.out.println("添加状态到状态机: " + state.getStateName());
    }
    
    // 设置初始状态
    public void setInitialState(String stateName) {
        if (states.containsKey(stateName)) {
            this.currentState = states.get(stateName);
            System.out.println("设置初始状态: " + stateName);
            currentState.onEntry(); // 执行进入状态行为
        } else {
            throw new IllegalArgumentException("状态不存在: " + stateName);
        }
    }
    
    // 处理事件
    public void handleEvent(EventType event) {
        System.out.println("\n状态机 '" + name + "' 处理事件: " + event + ", 当前状态: " + currentState.getStateName());
        
        // 处理事件，获取下一个状态
        State nextState = currentState.handleEvent(event);
        
        // 如果状态发生变化
        if (nextState != null && nextState != currentState) {
            // 退出当前状态
            currentState.onExit();
            
            // 转换到新状态
            this.currentState = nextState;
            this.transitionCount++;
            System.out.println("状态转换: " + nextState.getStateName() + ", 转换计数: " + transitionCount);
            
            // 进入新状态
            currentState.onEntry();
        } else if (nextState == null) {
            System.out.println("此事件在当前状态下没有定义转换");
        } else {
            System.out.println("状态未发生变化");
        }
    }
    
    // 获取当前状态
    public State getCurrentState() {
        return currentState;
    }
    
    // 获取状态转换计数
    public int getTransitionCount() {
        return transitionCount;
    }
    
    // 获取状态机名称
    public String getName() {
        return name;
    }
    
    @Override
    public String toString() {
        return "StateMachine{name='" + name + "', currentState=" + 
               (currentState != null ? currentState.getStateName() : "null") + ", transitionCount=" + 
               transitionCount + ", stateCount=" + states.size() + "}";
    }
}

// 具体状态：待机状态
public class StandbyState implements State {
    @Override
    public String getStateName() {
        return "StandbyState";
    }
    
    @Override
    public State handleEvent(EventType event) {
        switch (event) {
            case EVENT_A:
                System.out.println("待机状态下收到事件A，转换到运行状态");
                return new RunningState();
            case EVENT_B:
                System.out.println("待机状态下收到事件B，转换到暂停状态");
                return new PausedState();
            default:
                System.out.println("待机状态下忽略事件: " + event);
                return this; // 状态不变
        }
    }
    
    @Override
    public void onEntry() {
        System.out.println("进入待机状态: 系统初始化完成，等待启动命令");
    }
    
    @Override
    public void onExit() {
        System.out.println("退出待机状态: 开始执行任务");
    }
}

// 具体状态：运行状态
public class RunningState implements State {
    private int executionCount = 0;
    
    @Override
    public String getStateName() {
        return "RunningState";
    }
    
    @Override
    public State handleEvent(EventType event) {
        switch (event) {
            case EVENT_B:
                System.out.println("运行状态下收到事件B，转换到暂停状态");
                return new PausedState();
            case EVENT_C:
                System.out.println("运行状态下收到事件C，转换到完成状态");
                return new CompletedState();
            case EVENT_D:
                System.out.println("运行状态下收到事件D，转换到错误状态");
                return new ErrorState();
            default:
                System.out.println("运行状态下忽略事件: " + event);
                return this; // 状态不变
        }
    }
    
    @Override
    public void onEntry() {
        executionCount++;
        System.out.println("进入运行状态: 开始执行任务，执行次数: " + executionCount);
    }
    
    @Override
    public void onExit() {
        System.out.println("退出运行状态: 任务执行中断或完成");
    }
    
    public int getExecutionCount() {
        return executionCount;
    }
}

// 具体状态：暂停状态
public class PausedState implements State {
    private long pauseStartTime;
    
    @Override
    public String getStateName() {
        return "PausedState";
    }
    
    @Override
    public State handleEvent(EventType event) {
        switch (event) {
            case EVENT_A:
                System.out.println("暂停状态下收到事件A，恢复到运行状态");
                return new RunningState();
            case EVENT_C:
                System.out.println("暂停状态下收到事件C，转换到完成状态");
                return new CompletedState();
            default:
                System.out.println("暂停状态下忽略事件: " + event);
                return this; // 状态不变
        }
    }
    
    @Override
    public void onEntry() {
        pauseStartTime = System.currentTimeMillis();
        System.out.println("进入暂停状态: 任务执行暂停");
    }
    
    @Override
    public void onExit() {
        long pausedTime = System.currentTimeMillis() - pauseStartTime;
        System.out.println("退出暂停状态: 继续执行任务，暂停时长: " + pausedTime + "ms");
    }
}

// 具体状态：完成状态
public class CompletedState implements State {
    @Override
    public String getStateName() {
        return "CompletedState";
    }
    
    @Override
    public State handleEvent(EventType event) {
        switch (event) {
            case EVENT_A:
                System.out.println("完成状态下收到事件A，重置到待机状态");
                return new StandbyState();
            default:
                System.out.println("完成状态下忽略事件: " + event);
                return this; // 状态不变
        }
    }
    
    @Override
    public void onEntry() {
        System.out.println("进入完成状态: 任务执行成功完成");
    }
    
    @Override
    public void onExit() {
        System.out.println("退出完成状态: 准备开始新任务");
    }
}

// 具体状态：错误状态
public class ErrorState implements State {
    private String errorMessage = "未知错误";
    
    public ErrorState() {
        // 默认构造函数
    }
    
    public ErrorState(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    
    @Override
    public String getStateName() {
        return "ErrorState";
    }
    
    @Override
    public State handleEvent(EventType event) {
        switch (event) {
            case EVENT_A:
                System.out.println("错误状态下收到事件A，重置到待机状态");
                return new StandbyState();
            case EVENT_D:
                System.out.println("错误状态下收到事件D，尝试恢复到运行状态");
                return new RunningState();
            default:
                System.out.println("错误状态下忽略事件: " + event);
                return this; // 状态不变
        }
    }
    
    @Override
    public void onEntry() {
        System.out.println("进入错误状态: " + errorMessage);
    }
    
    @Override
    public void onExit() {
        System.out.println("退出错误状态: 错误已处理或重置");
    }
    
    public String getErrorMessage() {
        return errorMessage;
    }
}

// 客户端：复杂状态机演示
public class ComplexStateMachineDemo {
    public static void main(String[] args) {
        // 创建状态机
        StateMachine stateMachine = new StateMachine("工作流状态机");
        
        // 添加所有可能的状态
        stateMachine.addState(new StandbyState());
        stateMachine.addState(new RunningState());
        stateMachine.addState(new PausedState());
        stateMachine.addState(new CompletedState());
        stateMachine.addState(new ErrorState());
        
        System.out.println("\n===== 复杂状态机演示 =====\n");
        
        // 设置初始状态
        stateMachine.setInitialState("StandbyState");
        
        // 模拟事件序列
        System.out.println("\n----- 正常工作流程 -----");
        stateMachine.handleEvent(EventType.EVENT_A); // 待机 -> 运行
        stateMachine.handleEvent(EventType.EVENT_B); // 运行 -> 暂停
        stateMachine.handleEvent(EventType.EVENT_A); // 暂停 -> 运行
        stateMachine.handleEvent(EventType.EVENT_C); // 运行 -> 完成
        
        System.out.println("\n----- 重置流程 -----");
        stateMachine.handleEvent(EventType.EVENT_A); // 完成 -> 待机
        
        System.out.println("\n----- 错误处理流程 -----");
        stateMachine.handleEvent(EventType.EVENT_A); // 待机 -> 运行
        stateMachine.handleEvent(EventType.EVENT_D); // 运行 -> 错误
        stateMachine.handleEvent(EventType.EVENT_A); // 错误 -> 待机
        
        System.out.println("\n----- 异常事件处理 -----");
        stateMachine.handleEvent(EventType.EVENT_D); // 待机状态下忽略此事件
        
        System.out.println("\n===== 状态机最终状态 =====");
        System.out.println(stateMachine);
    }
}
```

## 实际应用示例：订单状态管理系统

下面是一个订单状态管理系统的实际应用示例，展示如何使用状态模式实现电商系统中的订单状态管理：

```java
import java.util.*;
import java.text.SimpleDateFormat;

// 订单事件枚举
enum OrderEvent {
    CREATE,
    PAY,
    SHIP,
    DELIVER,
    CANCEL,
    REFUND,
    COMPLETE
}

// 订单状态接口
public interface OrderState {
    // 获取状态名称
    String getStateName();
    // 获取状态描述
    String getDescription();
    // 处理事件
    OrderState handleEvent(OrderContext context, OrderEvent event);
    // 进入状态时的行为
    void onEntry(OrderContext context);
    // 退出状态时的行为
    void onExit(OrderContext context);
    // 获取此状态下可执行的事件列表
    List<OrderEvent> getAvailableEvents();
}

// 订单上下文类
public class OrderContext {
    private String orderId; // 订单ID
    private OrderState currentState; // 当前状态
    private BigDecimal totalAmount; // 订单总金额
    private String customerId; // 客户ID
    private Date createTime; // 创建时间
    private Date lastUpdateTime; // 最后更新时间
    private List<OrderHistory> history = new ArrayList<>(); // 订单历史
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
    public OrderContext(String orderId, String customerId, BigDecimal totalAmount) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.createTime = new Date();
        this.lastUpdateTime = new Date();
        
        // 初始状态为待支付
        this.currentState = new PendingPaymentState();
        
        System.out.println("创建订单: " + orderId);
        System.out.println("  客户ID: " + customerId);
        System.out.println("  总金额: " + totalAmount);
        System.out.println("  创建时间: " + dateFormat.format(createTime));
        
        // 记录初始状态
        addHistory("订单创建", "初始状态: " + currentState.getStateName());
        currentState.onEntry(this);
    }
    
    // 处理事件
    public void handleEvent(OrderEvent event) {
        System.out.println("\n订单 '" + orderId + "' 处理事件: " + event + ", 当前状态: " + currentState.getStateName());
        
        // 检查事件是否可用
        List<OrderEvent> availableEvents = currentState.getAvailableEvents();
        if (!availableEvents.contains(event)) {
            System.out.println("错误: 当前状态 '" + currentState.getStateName() + "' 下不能执行事件 '