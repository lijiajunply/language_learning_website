# **第六章：静态与内部类**

## **6.1 static 关键字**

static 关键字是 Java 中用于声明静态成员的关键字，表示该成员属于类而非实例。静态成员（变量、方法）在类加载时就已经被初始化，并且所有类的实例共享这部分数据。

### **6.1.1 静态变量**

静态变量是属于类的变量，而不是某个对象实例。所有该类的实例共享同一个静态变量。

```java
public class Counter {
    public static int count = 0;  // 静态变量

    public Counter() {
        count++;  // 每次创建对象，静态变量 count 自增
    }

    public static void displayCount() {
        System.out.println("Total count: " + count);
    }

    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter.displayCount();  // 输出 Total count: 2
    }
}

```

### **6.1.2 静态方法**

静态方法是属于类的方法，不需要实例化对象就可以调用。静态方法只能访问静态变量和调用静态方法，不能直接访问实例变量和实例方法。

```java
public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = Calculator.add(3, 5);  // 直接通过类名调用静态方法
        System.out.println("Result: " + result);  // 输出 Result: 8
    }
}

```

### **6.1.3 静态代码块**

静态代码块在类加载时执行一次，通常用于初始化静态变量。

```java
public class Example {
    static {
        System.out.println("This is a static block.");
    }

    public static void main(String[] args) {
        // 静态代码块会在类加载时执行
    }
}

```

## **6.2 内部类**

内部类是定义在另一个类中的类。内部类的使用可以增加代码的封装性和模块化。Java 中有几种类型的内部类：成员内部类、局部内部类、匿名内部类和静态内部类。

### **6.2.1 成员内部类**

成员内部类是定义在外部类的成员位置上的类，可以访问外部类的所有成员，包括私有成员。

```java
public class Outer {
    private String outerField = "Outer Field";  // 外部类的私有成员

    class Inner {
        public void display() {
            System.out.println(outerField);  // 内部类可以访问外部类的私有成员
        }
    }

    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();  // 创建内部类的对象
        inner.display();  // 输出 Outer Field
    }
}

```

### **6.2.2 局部内部类**

局部内部类是定义在方法或构造函数中的类，只在其所在的代码块中有效。局部内部类不能有访问修饰符。

```java
public class Outer {
    public void method() {
        class Inner {
            public void display() {
                System.out.println("This is a local inner class.");
            }
        }
        Inner inner = new Inner();
        inner.display();
    }

    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.method();  // 调用包含局部内部类的方法
    }
}

```

### **6.2.3 匿名内部类**

匿名内部类是没有名字的内部类。通常用于简化代码，尤其在需要实现接口或继承类时。匿名内部类通常是在方法调用时直接定义并实例化。

```java
public class Example {
    public static void main(String[] args) {
        // 匿名内部类实现接口
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println("Anonymous class running.");
            }
        };
        new Thread(r).start();
    }
}

```

### **6.2.4 静态内部类**

静态内部类是定义为静态的类，它不依赖于外部类的实例。静态内部类只能访问外部类的静态成员。

```java
public class Outer {
    private static String staticField = "Static Field";

    static class Inner {
        public void display() {
            System.out.println(staticField);  // 访问外部类的静态成员
        }
    }

    public static void main(String[] args) {
        Outer.Inner inner = new Outer.Inner();  // 通过外部类名直接访问静态内部类
        inner.display();  // 输出 Static Field
    }
}

```

## **6.3 Lambda 表达式与函数式接口**

Java 8 引入了 Lambda 表达式和函数式接口，以简化代码的编写，特别是在处理集合和并行流时。

### **6.3.1 Lambda 表达式**

Lambda 表达式是一个匿名方法，它可以用来代替匿名内部类。Lambda 表达式的基本语法如下：

```java
(parameters) -> expression

```

一个简单的 Lambda 表达式例子：

```java
public class Main {
    public static void main(String[] args) {
        // 使用 Lambda 表达式实现 Runnable 接口
        Runnable r = () -> System.out.println("Lambda expression running.");
        new Thread(r).start();
    }
}

```

### **6.3.2 函数式接口**

函数式接口是只包含一个抽象方法的接口，可以用来作为 Lambda 表达式的类型。Java 8 中提供了 @FunctionalInterface 注解来标识一个接口为函数式接口。

```java
@FunctionalInterface
public interface Calculator {
    int add(int a, int b);  // 单一抽象方法
}

public class Main {
    public static void main(String[] args) {
        // 使用 Lambda 表达式实现函数式接口
        Calculator calculator = (a, b) -> a + b;
        System.out.println(calculator.add(3, 5));  // 输出 8
    }
}

```

### **6.3.3 常用函数式接口**

Java 8 中提供了一些常见的内置函数式接口，如 Predicate、Function、Consumer 和 Supplier。

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // 使用 Function 接口进行函数式编程
        Function<Integer, Integer> square = x -> x * x;
        System.out.println(square.apply(5));  // 输出 25
    }
}

```

## **总结**

- static 关键字：用于声明静态变量、静态方法和静态代码块，表示它们属于类本身而非实例。

- 内部类：包括成员内部类、局部内部类、匿名内部类和静态内部类，它们提供了更灵活的类结构和封装能力。

- Lambda 表达式：简化了代码，特别是在处理回调和集合操作时，使用 Lambda 表达式可以让代码更加简洁和易读。

- 函数式接口：只包含一个抽象方法的接口，可以用作 Lambda 表达式的类型，Java 8 提供了丰富的内置函数式接口。

通过深入理解 static 和内部类，以及 Lambda 表达式和函数式接口的使用，开发者可以写出更简洁、高效的 Java 代码。