# 中介者模式 (Mediator Pattern)

## 概述

中介者模式是一种行为型设计模式，它定义了一个对象，用于封装一组对象之间的交互。中介者使各对象之间不需要显式地相互引用，从而降低了它们之间的耦合度，并且可以独立地改变它们之间的交互。

中介者模式的核心思想是通过引入一个中介者对象，将多个对象之间的直接通信转换为通过中介者对象的间接通信，从而减少对象之间的依赖关系，提高系统的可维护性和可扩展性。

## 核心要点

- **集中控制交互**：将对象之间的交互集中到一个中介者对象中
- **降低耦合度**：对象之间不需要直接引用，只需要与中介者通信
- **简化对象协议**：对象只需要与中介者通信，不需要知道其他对象的详细信息
- **独立改变交互**：可以独立地改变对象之间的交互而不影响其他对象

## 应用场景

- **当对象之间存在复杂的交互关系，导致它们之间的依赖关系非常紧密时**
- **当需要避免对象之间的直接引用，从而降低它们之间的耦合度时**
- **当需要集中控制一组对象的交互行为时**
- **当需要将一组对象的交互行为抽象出来，以便独立地改变它们时**

## 结构

中介者模式包含以下角色：

1. **中介者（Mediator）**：定义了对象之间交互的接口
2. **具体中介者（Concrete Mediator）**：实现中介者接口，协调各对象之间的交互
3. **同事类（Colleague）**：定义了与其他对象交互的接口
4. **具体同事类（Concrete Colleague）**：实现同事类接口，通过中介者与其他对象通信

## 实现示例

### 1. 基本中介者模式实现

```java
// 中介者接口
public interface Mediator {
    void register(Colleague colleague); // 注册同事对象
    void relay(Colleague source, String message); // 转发消息
}

// 同事类抽象基类
public abstract class Colleague {
    protected Mediator mediator; // 持有中介者引用
    protected String name; // 同事名称
    
    public Colleague(Mediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }
    
    // 发送消息
    public void send(String message) {
        System.out.println(name + " 发送消息: " + message);
        mediator.relay(this, message); // 通过中介者发送消息
    }
    
    // 接收消息
    public abstract void receive(String message);
    
    // 获取名称
    public String getName() {
        return name;
    }
}

// 具体中介者
public class ConcreteMediator implements Mediator {
    private List<Colleague> colleagues = new ArrayList<>(); // 存储同事对象
    
    @Override
    public void register(Colleague colleague) {
        if (!colleagues.contains(colleague)) {
            colleagues.add(colleague);
        }
    }
    
    @Override
    public void relay(Colleague source, String message) {
        // 向除了发送者之外的所有同事转发消息
        for (Colleague colleague : colleagues) {
            if (colleague != source) {
                colleague.receive(message);
            }
        }
    }
}

// 具体同事类A
public class ConcreteColleagueA extends Colleague {
    public ConcreteColleagueA(Mediator mediator, String name) {
        super(mediator, name);
    }
    
    @Override
    public void receive(String message) {
        System.out.println(name + " 接收消息: " + message);
    }
}

// 具体同事类B
public class ConcreteColleagueB extends Colleague {
    public ConcreteColleagueB(Mediator mediator, String name) {
        super(mediator, name);
    }
    
    @Override
    public void receive(String message) {
        System.out.println(name + " 接收消息: " + message);
    }
}

// 具体同事类C
public class ConcreteColleagueC extends Colleague {
    public ConcreteColleagueC(Mediator mediator, String name) {
        super(mediator, name);
    }
    
    @Override
    public void receive(String message) {
        System.out.println(name + " 接收消息: " + message);
    }
}

// 客户端
public class MediatorPatternDemo {
    public static void main(String[] args) {
        // 创建中介者
        Mediator mediator = new ConcreteMediator();
        
        // 创建同事对象
        Colleague colleagueA = new ConcreteColleagueA(mediator, "同事A");
        Colleague colleagueB = new ConcreteColleagueB(mediator, "同事B");
        Colleague colleagueC = new ConcreteColleagueC(mediator, "同事C");
        
        // 注册同事对象
        mediator.register(colleagueA);
        mediator.register(colleagueB);
        mediator.register(colleagueC);
        
        // 发送消息测试
        System.out.println("=== 测试发送消息 ===");
        colleagueA.send("大家好！");
        System.out.println();
        colleagueB.send("你好，同事A！");
        System.out.println();
        colleagueC.send("大家都在啊！");
    }
}
```

## 2. 通用聊天功能的中介者实现

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 改进的中介者接口
public interface ChatMediator {
    void registerUser(User user); // 注册用户
    void removeUser(User user); // 移除用户
    void sendMessage(String message, User sender); // 发送消息给所有人
    void sendPrivateMessage(String message, User sender, User receiver); // 发送私信
    void sendMessageToGroup(String message, User sender, String groupName); // 发送消息给特定群组
}

// 用户抽象类（同事类）
public abstract class User {
    protected ChatMediator mediator; // 中介者引用
    protected String name; // 用户名
    
    public User(ChatMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }
    
    // 发送消息给所有人
    public void send(String message) {
        System.out.println(name + " 发送消息: " + message);
        mediator.sendMessage(message, this);
    }
    
    // 发送私信
    public void sendPrivate(String message, User receiver) {
        System.out.println(name + " 发送私信给 " + receiver.getName() + ": " + message);
        mediator.sendPrivateMessage(message, this, receiver);
    }
    
    // 发送消息给群组
    public void sendToGroup(String message, String groupName) {
        System.out.println(name + " 发送消息给群组 " + groupName + ": " + message);
        mediator.sendMessageToGroup(message, this, groupName);
    }
    
    // 接收消息
    public abstract void receive(String message, User sender);
    
    // 接收私信
    public abstract void receivePrivate(String message, User sender);
    
    // 获取名称
    public String getName() {
        return name;
    }
}

// 具体中介者：聊天服务器
public class ChatServer implements ChatMediator {
    private Map<String, User> users; // 存储用户
    private Map<String, List<User>> groups; // 存储群组
    
    public ChatServer() {
        users = new HashMap<>();
        groups = new HashMap<>();
    }
    
    @Override
    public void registerUser(User user) {
        if (!users.containsKey(user.getName())) {
            users.put(user.getName(), user);
            System.out.println("用户 " + user.getName() + " 已注册到聊天服务器");
        }
    }
    
    @Override
    public void removeUser(User user) {
        if (users.containsKey(user.getName())) {
            users.remove(user.getName());
            System.out.println("用户 " + user.getName() + " 已从聊天服务器移除");
            
            // 从所有群组中移除该用户
            for (List<User> groupUsers : groups.values()) {
                groupUsers.remove(user);
            }
        }
    }
    
    @Override
    public void sendMessage(String message, User sender) {
        // 向除了发送者之外的所有用户转发消息
        for (User user : users.values()) {
            if (user != sender) {
                user.receive(message, sender);
            }
        }
    }
    
    @Override
    public void sendPrivateMessage(String message, User sender, User receiver) {
        if (users.containsValue(receiver)) {
            receiver.receivePrivate(message, sender);
        } else {
            System.out.println("错误: 接收者 " + receiver.getName() + " 不存在");
        }
    }
    
    @Override
    public void sendMessageToGroup(String message, User sender, String groupName) {
        List<User> groupUsers = groups.get(groupName);
        if (groupUsers != null) {
            // 向群组中的所有用户（除了发送者）转发消息
            for (User user : groupUsers) {
                if (user != sender) {
                    user.receive("[群组 " + groupName + "] " + message, sender);
                }
            }
        } else {
            System.out.println("错误: 群组 " + groupName + " 不存在");
        }
    }
    
    // 创建群组
    public void createGroup(String groupName) {
        if (!groups.containsKey(groupName)) {
            groups.put(groupName, new ArrayList<>());
            System.out.println("群组 " + groupName + " 已创建");
        } else {
            System.out.println("群组 " + groupName + " 已存在");
        }
    }
    
    // 将用户添加到群组
    public void addUserToGroup(User user, String groupName) {
        List<User> groupUsers = groups.get(groupName);
        if (groupUsers != null) {
            if (!groupUsers.contains(user)) {
                groupUsers.add(user);
                System.out.println("用户 " + user.getName() + " 已添加到群组 " + groupName);
            } else {
                System.out.println("用户 " + user.getName() + " 已经在群组 " + groupName + " 中");
            }
        } else {
            System.out.println("错误: 群组 " + groupName + " 不存在");
        }
    }
    
    // 从群组中移除用户
    public void removeUserFromGroup(User user, String groupName) {
        List<User> groupUsers = groups.get(groupName);
        if (groupUsers != null) {
            if (groupUsers.remove(user)) {
                System.out.println("用户 " + user.getName() + " 已从群组 " + groupName + " 移除");
            } else {
                System.out.println("用户 " + user.getName() + " 不在群组 " + groupName + " 中");
            }
        } else {
            System.out.println("错误: 群组 " + groupName + " 不存在");
        }
    }
    
    // 获取用户数量
    public int getUserCount() {
        return users.size();
    }
    
    // 获取群组数量
    public int getGroupCount() {
        return groups.size();
    }
}

// 具体用户类
public class ConcreteUser extends User {
    public ConcreteUser(ChatMediator mediator, String name) {
        super(mediator, name);
    }
    
    @Override
    public void receive(String message, User sender) {
        System.out.println(name + " 收到来自 " + sender.getName() + " 的消息: " + message);
    }
    
    @Override
    public void receivePrivate(String message, User sender) {
        System.out.println(name + " 收到来自 " + sender.getName() + " 的私信: " + message);
    }
}

// 客户端：聊天应用
public class ChatApplication {
    public static void main(String[] args) {
        // 创建聊天服务器（中介者）
        ChatServer chatServer = new ChatServer();
        
        // 创建用户
        User user1 = new ConcreteUser(chatServer, "张三");
        User user2 = new ConcreteUser(chatServer, "李四");
        User user3 = new ConcreteUser(chatServer, "王五");
        User user4 = new ConcreteUser(chatServer, "赵六");
        
        // 注册用户到服务器
        chatServer.registerUser(user1);
        chatServer.registerUser(user2);
        chatServer.registerUser(user3);
        chatServer.registerUser(user4);
        
        System.out.println("\n=== 测试群聊功能 ===");
        user1.send("大家好，今天天气怎么样？");
        System.out.println();
        user2.send("你好，张三！天气很好，阳光明媚。");
        
        System.out.println("\n=== 测试私信功能 ===");
        user3.sendPrivate("你好，李四，下班后有空一起吃饭吗？", user2);
        user2.sendPrivate("好的，下班后在公司楼下等我。", user3);
        
        System.out.println("\n=== 测试群组功能 ===");
        // 创建群组
        chatServer.createGroup("开发组");
        chatServer.createGroup("市场组");
        
        // 添加用户到群组
        chatServer.addUserToGroup(user1, "开发组");
        chatServer.addUserToGroup(user2, "开发组");
        chatServer.addUserToGroup(user3, "市场组");
        chatServer.addUserToGroup(user4, "市场组");
        
        // 发送群组消息
        System.out.println();
        user1.sendToGroup("开发组的同事们，明天上午10点有个会议。", "开发组");
        System.out.println();
        user3.sendToGroup("市场组的同事们，新的营销方案已经准备好了。", "市场组");
        
        // 测试移除用户
        System.out.println("\n=== 测试移除用户 ===");
        chatServer.removeUser(user4);
        
        // 再次发送群组消息
        System.out.println();
        user3.sendToGroup("赵六已经离开群组了。", "市场组");
        
        // 显示统计信息
        System.out.println("\n=== 统计信息 ===");
        System.out.println("当前在线用户数: " + chatServer.getUserCount());
        System.out.println("创建的群组数: " + chatServer.getGroupCount());
    }
}
```

## 实际应用示例：航空交通管制系统

下面是一个实际应用的例子，展示如何使用中介者模式实现航空交通管制系统：

```java
import java.util.HashMap;
import java.util.Map;

// 空中交通管制中介者接口
public interface ATCMediator {
    void registerRunway(Runway runway); // 注册跑道
    void registerFlight(Flight flight); // 注册航班
    boolean isLandingOk(); // 检查是否可以降落
    void setLandingStatus(boolean status); // 设置降落状态
    void showMessage(Flight flight, String message); // 显示消息
    void requestTakeoff(Flight flight); // 请求起飞
    void requestLanding(Flight flight); // 请求降落
    void notifyRunwayFree(Runway runway); // 通知跑道空闲
}

// 航班类（同事类）
public class Flight {
    private String flightNumber; // 航班号
    private ATCMediator mediator; // 中介者引用
    private boolean isFlying = true; // 飞行状态
    
    public Flight(ATCMediator mediator, String flightNumber) {
        this.mediator = mediator;
        this.flightNumber = flightNumber;
    }
    
    // 请求起飞
    public void requestTakeoff() {
        if (!isFlying) {
            System.out.println("航班 " + flightNumber + " 请求起飞");
            mediator.requestTakeoff(this);
        } else {
            System.out.println("航班 " + flightNumber + " 已经在飞行中，无法起飞");
        }
    }
    
    // 请求降落
    public void requestLanding() {
        if (isFlying) {
            System.out.println("航班 " + flightNumber + " 请求降落");
            mediator.requestLanding(this);
        } else {
            System.out.println("航班 " + flightNumber + " 已经在地面，无法降落");
        }
    }
    
    // 起飞
    public void takeoff() {
        isFlying = true;
        System.out.println("航班 " + flightNumber + " 已经起飞");
    }
    
    // 降落
    public void land() {
        isFlying = false;
        System.out.println("航班 " + flightNumber + " 已经降落");
    }
    
    // 收到消息
    public void receiveMessage(String message) {
        System.out.println("航班 " + flightNumber + " 收到消息: " + message);
    }
    
    // 获取航班号
    public String getFlightNumber() {
        return flightNumber;
    }
    
    // 获取飞行状态
    public boolean isFlying() {
        return isFlying;
    }
}

// 跑道类（同事类）
public class Runway {
    private String name; // 跑道名称
    private ATCMediator mediator; // 中介者引用
    private boolean isFree = true; // 空闲状态
    private Flight currentFlight; // 当前使用跑道的航班
    
    public Runway(ATCMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }
    
    // 使用跑道
    public void occupy(Flight flight) {
        if (isFree) {
            isFree = false;
            currentFlight = flight;
            System.out.println("跑道 " + name + " 已被航班 " + flight.getFlightNumber() + " 占用");
        } else {
            System.out.println("跑道 " + name + " 已被占用，无法使用");
        }
    }
    
    // 释放跑道
    public void release() {
        if (!isFree) {
            System.out.println("跑道 " + name + " 已释放，航班 " + currentFlight.getFlightNumber() + " 已离开");
            isFree = true;
            currentFlight = null;
            mediator.notifyRunwayFree(this); // 通知中介者跑道已空闲
        } else {
            System.out.println("跑道 " + name + " 已经空闲");
        }
    }
    
    // 获取跑道名称
    public String getName() {
        return name;
    }
    
    // 获取空闲状态
    public boolean isFree() {
        return isFree;
    }
    
    // 获取当前航班
    public Flight getCurrentFlight() {
        return currentFlight;
    }
}

// 具体中介者：空中交通管制塔
public class ATCTower implements ATCMediator {
    private Map<String, Runway> runways; // 存储跑道
    private Map<String, Flight> flights; // 存储航班
    private boolean landingOk = true; // 降落状态
    private Runway activeRunway; // 当前活动的跑道
    
    public ATCTower() {
        runways = new HashMap<>();
        flights = new HashMap<>();
    }
    
    @Override
    public void registerRunway(Runway runway) {
        runways.put(runway.getName(), runway);
        System.out.println("跑道 " + runway.getName() + " 已注册到空中交通管制塔");
    }
    
    @Override
    public void registerFlight(Flight flight) {
        flights.put(flight.getFlightNumber(), flight);
        System.out.println("航班 " + flight.getFlightNumber() + " 已注册到空中交通管制塔");
    }
    
    @Override
    public boolean isLandingOk() {
        return landingOk;
    }
    
    @Override
    public void setLandingStatus(boolean status) {
        landingOk = status;
    }
    
    @Override
    public void showMessage(Flight flight, String message) {
        System.out.println("空中交通管制塔向航班 " + flight.getFlightNumber() + " 发送消息: " + message);
        flight.receiveMessage(message);
    }
    
    @Override
    public void requestTakeoff(Flight flight) {
        // 查找空闲的跑道
        Runway freeRunway = null;
        for (Runway runway : runways.values()) {
            if (runway.isFree()) {
                freeRunway = runway;
                break;
            }
        }
        
        if (freeRunway != null) {
            // 分配跑道给航班
            freeRunway.occupy(flight);
            activeRunway = freeRunway;
            setLandingStatus(false);
            
            // 通知航班可以起飞
            showMessage(flight, "允许起飞，请使用跑道 " + freeRunway.getName());
            flight.takeoff();
            
            // 模拟起飞后释放跑道
            new Thread(() -> {
                try {
                    Thread.sleep(2000); // 模拟起飞过程
                    freeRunway.release();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }).start();
        } else {
            // 没有空闲跑道，通知航班等待
            showMessage(flight, "所有跑道都在使用中，请等待");
        }
    }
    
    @Override
    public void requestLanding(Flight flight) {
        if (landingOk) {
            // 查找空闲的跑道
            Runway freeRunway = null;
            for (Runway runway : runways.values()) {
                if (runway.isFree()) {
                    freeRunway = runway;
                    break;
                }
            }
            
            if (freeRunway != null) {
                // 分配跑道给航班
                freeRunway.occupy(flight);
                activeRunway = freeRunway;
                setLandingStatus(false);
                
                // 通知航班可以降落
                showMessage(flight, "允许降落，请使用跑道 " + freeRunway.getName());
                flight.land();
                
                // 模拟降落后释放跑道
                new Thread(() -> {
                    try {
                        Thread.sleep(3000); // 模拟降落过程
                        freeRunway.release();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }).start();
            } else {
                // 没有空闲跑道，通知航班等待
                showMessage(flight, "所有跑道都在使用中，请在空中盘旋等待");
            }
        } else {
            // 不允许降落，通知航班等待
            showMessage(flight, "当前不允许降落，请在空中盘旋等待");
        }
    }
    
    @Override
    public void notifyRunwayFree(Runway runway) {
        setLandingStatus(true);
        System.out.println("空中交通管制塔收到通知：跑道 " + runway.getName() + " 已空闲");
        
        // 可以在这里实现调度算法，优先安排等待中的航班
    }
    
    // 获取航班数量
    public int getFlightCount() {
        return flights.size();
    }
    
    // 获取跑道数量
    public int getRunwayCount() {
        return runways.size();
    }
}

// 客户端：航空交通管制系统
public class ATCSimulation {
    public static void main(String[] args) throws InterruptedException {
        // 创建空中交通管制塔（中介者）
        ATCMediator tower = new ATCTower();
        
        // 创建跑道
        Runway runway1 = new Runway(tower, "跑道1");
        Runway runway2 = new Runway(tower, "跑道2");
        
        // 注册跑道
        tower.registerRunway(runway1);
        tower.registerRunway(runway2);
        
        System.out.println();
        
        // 创建航班
        Flight flight1 = new Flight(tower, "CA1234");
        Flight flight2 = new Flight(tower, "MU5678");
        Flight flight3 = new Flight(tower, "CZ9012");
        
        // 注册航班
        tower.registerFlight(flight1);
        tower.registerFlight(flight2);
        tower.registerFlight(flight3);
        
        System.out.println("\n=== 开始模拟 ===");
        
        // 模拟航班1请求降落
        System.out.println("\n--- 航班1请求降落 ---");
        flight1.requestLanding();
        Thread.sleep(1000);
        
        // 模拟航班2请求降落（应该等待）
        System.out.println("\n--- 航班2请求降落 ---");
        flight2.requestLanding();
        Thread.sleep(1000);
        
        // 模拟航班3请求起飞
        System.out.println("\n--- 航班3请求起飞 ---");
        flight3.requestTakeoff();
        
        // 等待一段时间，观察航班活动
        Thread.sleep(5000);
        
        // 再次尝试航班2降落
        System.out.println("\n--- 再次尝试航班2降落 ---");
        flight2.requestLanding();
        
        // 等待模拟完成
        Thread.sleep(4000);
        
        // 显示统计信息
        System.out.println("\n=== 模拟结束 ===");
        System.out.println("航班总数: " + tower.getFlightCount());
        System.out.println("跑道总数: " + tower.getRunwayCount());
    }
}
```

## 优缺点

### 优点

- **降低耦合度**：对象之间不需要直接引用，只需要与中介者通信，从而降低了它们之间的耦合度
- **集中控制交互**：将对象之间的交互集中到一个中介者对象中，便于管理和维护
- **简化对象协议**：对象只需要与中介者通信，不需要知道其他对象的详细信息
- **独立改变交互**：可以独立地改变对象之间的交互而不影响其他对象

### 缺点

- **中介者可能会变得过于复杂**：随着对象数量的增加，中介者的逻辑可能会变得非常复杂
- **中介者成为系统中的关键依赖**：如果中介者出现问题，整个系统的交互都会受到影响
- **可能会导致响应延迟**：所有的交互都需要经过中介者，可能会导致响应延迟

## 与其他模式的关系

- **中介者模式与观察者模式**：观察者模式关注的是一对多的通知机制，而中介者模式关注的是多对多的交互协调
- **中介者模式与外观模式**：两者都简化了系统的交互，但外观模式是为子系统提供一个简单的接口，而中介者模式是为对象之间提供一个协调机制
- **中介者模式与代理模式**：两者都涉及到对象之间的通信，但代理模式是为其他对象提供一个代理，而中介者模式是协调多个对象之间的交互

## 总结

中介者模式是一种有用的行为型设计模式，它通过引入一个中介者对象，将多个对象之间的直接通信转换为通过中介者对象的间接通信，从而降低了对象之间的耦合度。中介者模式特别适用于对象之间存在复杂交互关系的场景，如聊天系统、交通控制系统等。在使用中介者模式时，需要注意避免中介者变得过于复杂，否则可能会导致系统难以维护。