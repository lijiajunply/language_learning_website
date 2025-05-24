# **第九章：并发与并行**

## **9.1 线程**

在 Java 中，线程是执行并发任务的基本单位。Java 提供了多种方式来创建和管理线程。

### **9.1.1 Thread 类**

Thread 类是 Java 提供的用于创建和管理线程的基本类。可以通过继承 Thread 类并重写 run() 方法来创建自定义的线程。

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}

MyThread thread = new MyThread();
thread.start();  // 启动线程

```

### **9.1.2 Runnable 接口**

Runnable 接口也是一种创建线程的方式。相比于继承 Thread 类，使用 Runnable 接口的好处是可以实现多继承的需求。线程类可以通过 Thread 构造函数接受 Runnable 实现类对象。

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable is running");
    }
}

Thread thread = new Thread(new MyRunnable());
thread.start();

```

## **9.2 线程同步**

在多线程程序中，多个线程可能会同时访问共享资源，导致数据不一致。为了保证线程安全，需要使用同步机制。

### **9.2.1 synchronized 关键字**

synchronized 是 Java 提供的一种锁机制，用于确保某一时刻只有一个线程可以访问某个代码块或方法。synchronized 可以用来修饰方法或代码块。

```java
public synchronized void increment() {
    counter++;
}

```

### **9.2.2 Lock 接口**

相比 synchronized，Lock 提供了更灵活的锁机制。Lock 是一个接口，它有不同的实现类，常用的是 ReentrantLock，可以显式地加锁和解锁。

```java
Lock lock = new ReentrantLock();
lock.lock();
try {
    // 临界区代码
} finally {
    lock.unlock();
}

```

ReentrantLock 提供了比 synchronized 更加细粒度的控制，例如尝试加锁、定时加锁等。

## **9.3 线程池**

线程池用于管理和复用线程，避免了频繁创建和销毁线程带来的性能开销。Java 提供了 Executor 框架来简化线程池的使用。

### **9.3.1 Executor**

Executor 是一个接口，用于管理线程池中的任务。常见的实现类有 ThreadPoolExecutor，它可以灵活配置线程池的大小、队列等参数。

```java
Executor executor = Executors.newFixedThreadPool(5);
executor.execute(new Runnable() {
    @Override
    public void run() {
        System.out.println("Task is executing");
    }
});

```

### **9.3.2 ScheduledExecutorService**

ScheduledExecutorService 是 ExecutorService 的子接口，专门用于执行定时任务和周期性任务。常用的实现类是 ScheduledThreadPoolExecutor。

```java
ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
scheduler.scheduleAtFixedRate(new Runnable() {
    @Override
    public void run() {
        System.out.println("Scheduled task is running");
    }
}, 0, 1, TimeUnit.SECONDS);  // 每秒执行一次

```

## **9.4 并发工具类**

Java 提供了多个并发工具类，它们可以简化并发编程，提升性能和可维护性。

### **9.4.1 Atomic 类**

Atomic 类用于执行原子操作，保证在多线程环境下对共享变量的操作是安全的。常用的 Atomic 类有 AtomicInteger、AtomicLong、AtomicReference 等。

```java
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();  // 原子性地增加

```

### **9.4.2 ConcurrentHashMap**

ConcurrentHashMap 是一个线程安全的哈希映射类，它允许多个线程并发地访问和修改数据。与 Hashtable 不同，ConcurrentHashMap 支持更高效的并发操作。

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("key", 1);
map.put("key", 2);  // 原子性地修改

```

### **9.4.3 CountDownLatch**

CountDownLatch 用于控制一个或多个线程等待直到其他线程完成某些操作。常见应用场景是：等待一组线程完成初始化工作后，再开始执行。

```java
CountDownLatch latch = new CountDownLatch(3);
Thread t1 = new Thread(() -> {
    // 执行任务
    latch.countDown();  // 任务完成时，减少计数器
});
latch.await();  // 主线程等待，直到计数器为 0

```

### **9.4.4 Semaphore**

Semaphore 是一种基于计数信号量的同步工具，它控制访问共享资源的线程数量。Semaphore 通过许可来控制线程的访问，类似于信号灯。

```java
Semaphore semaphore = new Semaphore(2);  // 允许最多 2 个线程访问
semaphore.acquire();  // 获取许可
// 执行任务
semaphore.release();  // 释放许可

```

## **总结**

- 线程：Java 提供了多种方式来创建线程，如继承 Thread 类和实现 Runnable 接口。

- 线程同步：通过 synchronized 和 Lock 来保证线程安全，避免数据竞态。

- 线程池：使用 Executor 框架可以有效管理线程池，减少线程创建销毁的开销。

- 并发工具类：Java 提供了多个并发工具类，如 Atomic、ConcurrentHashMap、CountDownLatch 和 Semaphore，它们简化了并发编程。

并发编程是 Java 中重要的一部分，通过合理使用线程、线程池和并发工具类，能够编写高效、可靠的多线程程序。