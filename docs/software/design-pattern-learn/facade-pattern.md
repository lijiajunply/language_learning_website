# 外观模式 (Facade Pattern)

## 概述

外观模式是一种结构型设计模式，它提供了一个统一的接口，用来访问子系统中的一群接口。外观模式定义了一个高层接口，让子系统更容易使用。

外观模式的核心思想是通过引入一个外观类，将复杂子系统的内部复杂性隐藏起来，为客户端提供一个简单统一的接口。这样，客户端不需要了解子系统的内部细节，只需要与外观类交互即可。

## 核心要点

- **简化接口**：为复杂子系统提供一个简单统一的接口
- **隐藏复杂性**：将子系统的内部复杂性隐藏起来，不让客户端知道
- **降低耦合**：减少客户端与子系统之间的直接耦合
- **符合迪米特法则**：客户端只需要与外观类交互，不需要与子系统的多个类交互

## 应用场景

- **复杂子系统**：当一个子系统非常复杂，有很多相互关联的类时
- **简化使用**：当需要简化客户端对复杂子系统的使用时
- **降低耦合**：当需要降低客户端与子系统之间的耦合度时
- **分层架构**：在分层架构中，为各层提供一个统一的接口

## 结构

外观模式包含以下角色：

1. **外观（Facade）**：提供一个统一的接口，用来访问子系统中的一群接口
2. **子系统类（Subsystem Classes）**：实现子系统的功能，客户可以直接访问子系统类，但通常通过外观类访问

## 实现示例

### 1. 基本外观模式实现

```java
// 子系统类A
class SubSystemA {
    public void operationA() {
        System.out.println("子系统A的操作");
    }
}

// 子系统类B
class SubSystemB {
    public void operationB() {
        System.out.println("子系统B的操作");
    }
}

// 子系统类C
class SubSystemC {
    public void operationC() {
        System.out.println("子系统C的操作");
    }
}

// 子系统类D
class SubSystemD {
    public void operationD() {
        System.out.println("子系统D的操作");
    }
}

// 外观类
public class Facade {
    private SubSystemA subSystemA; // 引用子系统A
    private SubSystemB subSystemB; // 引用子系统B
    private SubSystemC subSystemC; // 引用子系统C
    private SubSystemD subSystemD; // 引用子系统D
    
    public Facade() {
        // 初始化子系统对象
        this.subSystemA = new SubSystemA();
        this.subSystemB = new SubSystemB();
        this.subSystemC = new SubSystemC();
        this.subSystemD = new SubSystemD();
    }
    
    // 提供简化的接口，调用子系统的多个方法
    public void operation1() {
        System.out.println("执行外观操作1:");
        subSystemA.operationA();
        subSystemB.operationB();
        subSystemC.operationC();
    }
    
    // 提供简化的接口，调用子系统的多个方法
    public void operation2() {
        System.out.println("执行外观操作2:");
        subSystemB.operationB();
        subSystemD.operationD();
    }
    
    // 提供简化的接口，调用子系统的多个方法
    public void operation3() {
        System.out.println("执行外观操作3:");
        subSystemA.operationA();
        subSystemC.operationC();
        subSystemD.operationD();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 不使用外观模式时，客户端需要直接与所有子系统交互
        System.out.println("不使用外观模式:");
        SubSystemA subSystemA = new SubSystemA();
        SubSystemB subSystemB = new SubSystemB();
        SubSystemC subSystemC = new SubSystemC();
        subSystemA.operationA();
        subSystemB.operationB();
        subSystemC.operationC();
        
        // 使用外观模式时，客户端只需要与外观类交互
        System.out.println("\n使用外观模式:");
        Facade facade = new Facade();
        facade.operation1(); // 通过外观类调用子系统的多个操作
        
        System.out.println("\n执行其他外观操作:");
        facade.operation2();
        facade.operation3();
    }
}
```

## 实际应用示例：家庭影院系统

下面是一个实际应用的例子，展示如何使用外观模式实现家庭影院系统：

```java
// 子系统类：DVD播放器
class DVDPlayer {
    private String movie;
    
    public void on() {
        System.out.println("DVD播放器已打开");
    }
    
    public void off() {
        System.out.println("DVD播放器已关闭");
    }
    
    public void play(String movie) {
        this.movie = movie;
        System.out.println("正在播放电影：" + movie);
    }
    
    public void pause() {
        System.out.println("电影暂停播放");
    }
    
    public void stop() {
        System.out.println("电影已停止播放");
    }
}

// 子系统类：投影仪
class Projector {
    public void on() {
        System.out.println("投影仪已打开");
    }
    
    public void off() {
        System.out.println("投影仪已关闭");
    }
    
    public void wideScreenMode() {
        System.out.println("投影仪已切换到宽屏模式");
    }
    
    public void normalMode() {
        System.out.println("投影仪已切换到标准模式");
    }
}

// 子系统类：音响系统
class SoundSystem {
    public void on() {
        System.out.println("音响系统已打开");
    }
    
    public void off() {
        System.out.println("音响系统已关闭");
    }
    
    public void setVolume(int volume) {
        System.out.println("音响系统音量已设置为：" + volume);
    }
    
    public void surroundSoundOn() {
        System.out.println("环绕音效已开启");
    }
}

// 子系统类：灯光
class Lights {
    public void dim(int percentage) {
        System.out.println("灯光已调暗至：" + percentage + "%");
    }
    
    public void on() {
        System.out.println("灯光已打开");
    }
}

// 子系统类：爆米花机
class PopcornPopper {
    public void on() {
        System.out.println("爆米花机已打开");
    }
    
    public void off() {
        System.out.println("爆米花机已关闭");
    }
    
    public void pop() {
        System.out.println("正在制作爆米花");
    }
}

// 外观类：家庭影院外观
public class HomeTheaterFacade {
    private DVDPlayer dvdPlayer;      // DVD播放器
    private Projector projector;      // 投影仪
    private SoundSystem soundSystem;  // 音响系统
    private Lights lights;            // 灯光
    private PopcornPopper popper;     // 爆米花机
    
    // 构造函数接收所有子系统组件
    public HomeTheaterFacade(DVDPlayer dvdPlayer, 
                           Projector projector, 
                           SoundSystem soundSystem, 
                           Lights lights, 
                           PopcornPopper popper) {
        this.dvdPlayer = dvdPlayer;
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.lights = lights;
        this.popper = popper;
    }
    
    // 观看电影的简化接口
    public void watchMovie(String movie) {
        System.out.println("准备观看电影...");
        
        // 按顺序调用各个子系统的方法
        popper.on();
        popper.pop();
        
        lights.dim(10); // 调暗灯光到10%
        
        projector.on();
        projector.wideScreenMode();
        
        soundSystem.on();
        soundSystem.setVolume(15);
        soundSystem.surroundSoundOn();
        
        dvdPlayer.on();
        dvdPlayer.play(movie);
        
        System.out.println("电影准备就绪，可以开始观看了！");
    }
    
    // 暂停电影的简化接口
    public void pauseMovie() {
        System.out.println("暂停电影...");
        dvdPlayer.pause();
    }
    
    // 恢复电影播放的简化接口
    public void resumeMovie() {
        System.out.println("继续播放电影...");
        dvdPlayer.play(dvdPlayer.getCurrentMovie()); // 假设DVDPlayer有获取当前电影的方法
    }
    
    // 结束电影观看的简化接口
    public void endMovie() {
        System.out.println("结束观看电影...");
        
        // 按顺序关闭各个子系统
        dvdPlayer.stop();
        dvdPlayer.off();
        
        projector.off();
        
        soundSystem.off();
        
        lights.on(); // 打开灯光
        
        popper.off();
        
        System.out.println("电影观看已结束，所有设备已关闭！");
    }
}

// 为了演示需要，我们需要给DVDPlayer类添加getCurrentMovie方法
class DVDPlayer {
    // 之前的代码...
    private String movie;
    
    // 获取当前电影的方法
    public String getCurrentMovie() {
        return movie;
    }
    
    // 其他方法保持不变...
    // on, off, play, pause, stop等方法
}

// 客户端：家庭影院用户
public class HomeTheaterClient {
    public static void main(String[] args) {
        // 创建所有子系统组件
        DVDPlayer dvdPlayer = new DVDPlayer();
        Projector projector = new Projector();
        SoundSystem soundSystem = new SoundSystem();
        Lights lights = new Lights();
        PopcornPopper popper = new PopcornPopper();
        
        // 创建外观类，将所有子系统组件注入
        HomeTheaterFacade homeTheater = new HomeTheaterFacade(
                dvdPlayer, projector, soundSystem, lights, popper);
        
        // 使用外观类提供的简化接口观看电影
        System.out.println("=== 使用外观模式观看电影 ===");
        homeTheater.watchMovie("星际穿越");
        
        System.out.println("\n=== 暂停电影 ===");
        homeTheater.pauseMovie();
        
        System.out.println("\n=== 继续播放 ===");
        homeTheater.resumeMovie();
        
        System.out.println("\n=== 结束观看 ===");
        homeTheater.endMovie();
        
        /*
        // 如果不使用外观模式，客户端需要直接与所有子系统交互：
        System.out.println("\n=== 不使用外观模式观看电影 ===");
        popper.on();
        popper.pop();
        lights.dim(10);
        projector.on();
        projector.wideScreenMode();
        soundSystem.on();
        soundSystem.setVolume(15);
        soundSystem.surroundSoundOn();
        dvdPlayer.on();
        dvdPlayer.play("星际穿越");
        // ... 等等
        */
    }
}
```

## 优缺点

### 优点

- **简化使用**：为复杂子系统提供了一个简单统一的接口，使客户端更容易使用
- **降低耦合**：减少了客户端与子系统之间的直接耦合，客户端只与外观类交互
- **符合迪米特法则**：客户端不需要了解子系统的内部细节
- **提高灵活性**：子系统内部可以自由变化，只要不影响外观类的接口
- **便于维护**：系统的变化只影响外观类和子系统内部，不影响客户端

### 缺点

- **违反开闭原则**：如果子系统的功能发生变化，可能需要修改外观类
- **过度使用可能导致外观类过于复杂**：如果外观类封装了太多子系统功能，可能会变得过于复杂
- **可能掩盖了子系统的使用灵活性**：外观类提供的简化接口可能会限制对子系统某些功能的使用

## 与其他模式的关系

- **外观模式与适配器模式**：外观模式是为了简化接口，适配器模式是为了转换接口
- **外观模式与单例模式**：外观类通常可以设计为单例模式，因为通常只需要一个外观类实例
- **外观模式与中介者模式**：外观模式关注的是简化客户端与子系统的交互，中介者模式关注的是对象之间的通信

## 总结

外观模式是一种简单而强大的结构型设计模式，它通过提供一个统一的接口，隐藏了子系统的内部复杂性，使客户端更容易使用子系统。外观模式降低了客户端与子系统之间的耦合度，符合迪米特法则。外观模式在实际应用中广泛用于复杂系统的接口简化、分层架构设计等场景。使用外观模式时需要注意不要过度封装，要保留子系统的灵活性，同时也要避免外观类变得过于复杂。