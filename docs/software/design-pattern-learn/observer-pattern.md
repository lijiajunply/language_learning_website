# 观察者模式 (Observer Pattern)

## 概述

观察者模式是一种行为型设计模式，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象，当主题对象状态发生变化时，所有依赖于它的观察者都会得到通知并自动更新。

观察者模式也被称为发布-订阅模式（Publish-Subscribe Pattern），它是松耦合设计的一个典型示例，常用于实现事件处理系统、GUI组件交互、消息队列等场景。

## 核心要点

- **发布-订阅机制**：主题发布通知，观察者订阅并接收通知
- **松耦合**：主题和观察者之间通过抽象接口进行通信，不依赖于具体实现
- **自动更新**：当主题状态变化时，观察者自动更新，无需手动调用
- **一对多关系**：一个主题可以有多个观察者，当主题状态变化时，所有观察者都能接收到通知

## 应用场景

- **GUI组件交互**：按钮点击、文本框内容变化等事件处理
- **事件处理系统**：系统内部的事件分发和处理
- **消息队列**：生产者-消费者模型
- **订阅-推送服务**：新闻订阅、邮件通知等
- **股票行情系统**：当股票价格变动时，通知所有关注该股票的投资者

## 结构

观察者模式包含以下角色：

1. **主题（Subject）**：维护一组观察者，提供添加和删除观察者的接口，以及通知所有观察者的方法
2. **具体主题（Concrete Subject）**：实现主题接口，当状态发生变化时，通知所有注册的观察者
3. **观察者（Observer）**：定义更新接口，当主题状态发生变化时，得到通知并更新
4. **具体观察者（Concrete Observer）**：实现观察者接口，存储与主题相关的状态，当接收到主题的通知时，更新自身状态

## 实现示例

### 1. 主题接口和具体主题

```java
import java.util.ArrayList;
import java.util.List;

// 主题接口
public interface Subject {
    // 注册观察者
    void registerObserver(Observer observer);
    
    // 移除观察者
    void removeObserver(Observer observer);
    
    // 通知所有观察者
    void notifyObservers();
}

// 具体主题
public class ConcreteSubject implements Subject {
    // 存储所有观察者
    private List<Observer> observers = new ArrayList<>();
    
    // 主题状态
    private int state;
    
    @Override
    public void registerObserver(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }
    
    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    @Override
    public void notifyObservers() {
        // 通知所有观察者
        for (Observer observer : observers) {
            observer.update();
        }
    }
    
    // 获取状态
    public int getState() {
        return state;
    }
    
    // 设置状态，状态变化时通知观察者
    public void setState(int state) {
        this.state = state;
        // 状态变化，通知观察者
        notifyObservers();
    }
}
```

### 2. 观察者接口和具体观察者

```java
// 观察者接口
public interface Observer {
    // 更新方法
    void update();
}

// 具体观察者A
public class ConcreteObserverA implements Observer {
    // 引用主题，用于获取状态
    private Subject subject;
    
    // 观察者自身的状态
    private int observerState;
    
    // 构造函数，注册到主题
    public ConcreteObserverA(Subject subject) {
        this.subject = subject;
        // 注册到主题
        subject.registerObserver(this);
    }
    
    @Override
    public void update() {
        // 从主题获取最新状态
        observerState = ((ConcreteSubject) subject).getState();
        System.out.println("观察者A更新状态为: " + observerState);
    }
}

// 具体观察者B
public class ConcreteObserverB implements Observer {
    private Subject subject;
    private int observerState;
    
    public ConcreteObserverB(Subject subject) {
        this.subject = subject;
        subject.registerObserver(this);
    }
    
    @Override
    public void update() {
        observerState = ((ConcreteSubject) subject).getState();
        System.out.println("观察者B更新状态为: " + observerState);
    }
}
```

### 3. 客户端使用

```java
public class Client {
    public static void main(String[] args) {
        // 创建主题
        ConcreteSubject subject = new ConcreteSubject();
        
        // 创建观察者
        ConcreteObserverA observerA = new ConcreteObserverA(subject);
        ConcreteObserverB observerB = new ConcreteObserverB(subject);
        
        // 改变主题状态
        subject.setState(10);
        // 输出:
        // 观察者A更新状态为: 10
        // 观察者B更新状态为: 10
        
        // 再次改变主题状态
        subject.setState(20);
        // 输出:
        // 观察者A更新状态为: 20
        // 观察者B更新状态为: 20
        
        // 移除一个观察者
        subject.removeObserver(observerA);
        
        // 再次改变主题状态
        subject.setState(30);
        // 输出:
        // 观察者B更新状态为: 30
    }
}
```

## 实际应用示例：气象站系统

下面是一个更贴近实际应用的示例，展示如何使用观察者模式实现一个简单的气象站系统：

### 主题和观察者接口

```java
import java.util.ArrayList;
import java.util.List;

// 气象数据主题接口
public interface WeatherDataSubject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// 观察者接口
public interface Observer {
    void update(float temperature, float humidity, float pressure);
}

// 显示元素接口
public interface DisplayElement {
    void display();
}
```

### 具体主题和观察者

```java
// 具体主题：气象数据
public class WeatherData implements WeatherDataSubject {
    private List<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;
    
    public WeatherData() {
        observers = new ArrayList<>();
    }
    
    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }
    
    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }
    
    // 当气象站的数据更新时，调用此方法
    public void measurementsChanged() {
        notifyObservers();
    }
    
    // 设置气象数据
    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }
}

// 具体观察者：当前条件显示器
public class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temperature;
    private float humidity;
    private WeatherDataSubject weatherData;
    
    public CurrentConditionsDisplay(WeatherDataSubject weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }
    
    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }
    
    @Override
    public void display() {
        System.out.println("当前条件: " + temperature + "°C, 湿度: " + humidity + "%");
    }
}

// 具体观察者：统计显示器
public class StatisticsDisplay implements Observer, DisplayElement {
    private float maxTemp = 0.0f;
    private float minTemp = 200;
    private float tempSum = 0.0f;
    private int numReadings = 0;
    
    public StatisticsDisplay(WeatherDataSubject weatherData) {
        weatherData.registerObserver(this);
    }
    
    @Override
    public void update(float temperature, float humidity, float pressure) {
        tempSum += temperature;
        numReadings++;
        
        if (temperature > maxTemp) {
            maxTemp = temperature;
        }
        
        if (temperature < minTemp) {
            minTemp = temperature;
        }
        
        display();
    }
    
    @Override
    public void display() {
        System.out.println("温度统计: 平均=" + (tempSum / numReadings) + ", 最高=" + maxTemp + ", 最低=" + minTemp);
    }
}

// 具体观察者：预测显示器
public class ForecastDisplay implements Observer, DisplayElement {
    private float currentPressure = 1013.25f;
    private float lastPressure;
    
    public ForecastDisplay(WeatherDataSubject weatherData) {
        weatherData.registerObserver(this);
    }
    
    @Override
    public void update(float temperature, float humidity, float pressure) {
        lastPressure = currentPressure;
        currentPressure = pressure;
        display();
    }
    
    @Override
    public void display() {
        System.out.print("天气预报: ");
        if (currentPressure > lastPressure) {
            System.out.println("天气正在好转!");
        } else if (currentPressure == lastPressure) {
            System.out.println("天气将保持不变");
        } else {
            System.out.println("可能会下雨!");
        }
    }
}
```

### 客户端使用

```java
public class WeatherStation {
    public static void main(String[] args) {
        // 创建气象数据主题
        WeatherData weatherData = new WeatherData();
        
        // 创建各种显示组件（观察者）
        CurrentConditionsDisplay currentDisplay = new CurrentConditionsDisplay(weatherData);
        StatisticsDisplay statisticsDisplay = new StatisticsDisplay(weatherData);
        ForecastDisplay forecastDisplay = new ForecastDisplay(weatherData);
        
        // 模拟气象数据更新
        System.out.println("\n气象数据更新 1:");
        weatherData.setMeasurements(27.0f, 65.0f, 1013.1f);
        
        System.out.println("\n气象数据更新 2:");
        weatherData.setMeasurements(28.5f, 70.0f, 1012.2f);
        
        System.out.println("\n气象数据更新 3:");
        weatherData.setMeasurements(26.8f, 60.0f, 1014.3f);
    }
}
```

## 优缺点

### 优点

- **松耦合**：主题和观察者之间通过抽象接口进行通信，不依赖于具体实现
- **符合开闭原则**：新增观察者不需要修改主题代码，只需要实现观察者接口
- **动态订阅**：观察者可以动态地注册和移除
- **集中管理**：主题可以统一管理所有观察者，实现信息的高效传播

### 缺点

- **可能导致内存泄漏**：如果观察者没有正确移除，可能会导致内存泄漏
- **通知顺序不确定**：观察者接收到通知的顺序可能不确定
- **可能导致循环依赖**：如果观察者和主题互相依赖，可能会导致循环依赖
- **性能问题**：如果观察者数量过多，可能会影响通知的性能

## JDK中的观察者模式

Java语言本身提供了对观察者模式的支持，主要通过`java.util.Observable`类和`java.util.Observer`接口实现。不过，这两个类在Java 9中被标记为过时，推荐使用自己实现的观察者模式或使用其他事件处理框架。

以下是使用JDK提供的观察者模式的简单示例：

```java
import java.util.Observable;
import java.util.Observer;

// 主题类，继承Observable
class WeatherData extends Observable {
    private float temperature;
    private float humidity;
    private float pressure;
    
    public void measurementsChanged() {
        setChanged(); // 标记状态已改变
        notifyObservers(); // 通知所有观察者
    }
    
    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }
    
    public float getTemperature() {
        return temperature;
    }
    
    public float getHumidity() {
        return humidity;
    }
    
    public float getPressure() {
        return pressure;
    }
}

// 观察者类，实现Observer接口
class CurrentConditionsDisplay implements Observer {
    private float temperature;
    private float humidity;
    
    @Override
    public void update(Observable o, Object arg) {
        if (o instanceof WeatherData) {
            WeatherData weatherData = (WeatherData) o;
            this.temperature = weatherData.getTemperature();
            this.humidity = weatherData.getHumidity();
            display();
        }
    }
    
    public void display() {
        System.out.println("当前条件: " + temperature + "°C, 湿度: " + humidity + "%");
    }
}

// 客户端使用
public class WeatherStationDemo {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();
        CurrentConditionsDisplay display = new CurrentConditionsDisplay();
        
        weatherData.addObserver(display);
        weatherData.setMeasurements(27.0f, 65.0f, 1013.1f);
    }
}
```

## 总结

观察者模式是一种常用的行为型设计模式，它实现了对象之间一对多的依赖关系，使得当一个对象状态发生变化时，所有依赖于它的对象都会得到通知并自动更新。观察者模式具有松耦合、易扩展的特点，特别适合于实现事件处理系统、GUI组件交互、消息队列等场景。在使用观察者模式时，需要注意避免内存泄漏、循环依赖等问题，确保系统的稳定性和性能。