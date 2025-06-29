# **第三章：函数与模块化**

## **3.1 方法**

方法是 Java 中用于组织和封装代码逻辑的基本单位。它包含了函数名、参数、返回类型及方法体，可以重复调用，避免代码的重复编写。

### **3.1.1 方法的定义与调用**

方法的基本定义格式如下：

```java
返回类型 方法名(参数列表) {
    // 方法体
}

```

- 返回类型：指定方法返回的值类型，若无返回值，则为 void。

- 方法名：标识方法的名称，调用时用这个名称来执行相应的功能。

- 参数列表：方法接受的输入数据，可以是零个或多个参数。

示例：

```java
public class Example {
    public static void main(String[] args) {
        // 调用方法
        int result = add(5, 10);
        System.out.println("结果: " + result);
    }

    // 定义方法
    public static int add(int a, int b) {
        return a + b;
    }
}

```

### **3.1.2 方法参数传递**

Java 中方法的参数传递方式是 **值传递**，即传递的是变量的值副本。对于原始类型（如 int、float），传递的是变量的值；对于引用类型（如对象），传递的是对象的引用。

#### **基本类型参数传递**

```java
public static void main(String[] args) {
    int num = 5;
    modifyValue(num); // num 的值传递给方法
    System.out.println("修改后的值: " + num); // 仍然是 5
}

public static void modifyValue(int a) {
    a = 10; // 仅在方法内修改，方法外的 num 不变
}

```

#### **引用类型参数传递**

```java
public static void main(String[] args) {
    StringBuilder str = new StringBuilder("Hello");
    modifyString(str);
    System.out.println(str); // 输出 "Hello World"
}

public static void modifyString(StringBuilder s) {
    s.append(" World"); // 引用类型参数会影响原对象
}

```

### **3.1.3 方法的返回值**

方法可以返回一个值，返回值的类型必须与方法声明的返回类型一致。

```java
public static int multiply(int a, int b) {
    return a * b;  // 返回整数
}

```

如果方法不需要返回值，使用 void 作为返回类型：

```java
public static void printMessage() {
    System.out.println("这是一个无返回值的方法");
}

```

## **3.2 方法重载（Overloading）**

方法重载指的是在同一个类中定义多个同名但参数不同的方法。重载方法的区分是根据参数的数量、类型或顺序。

### **3.2.1 方法重载规则**

- 方法名相同

- 参数列表不同（参数数量、类型、顺序）

- 返回类型可以不同，但不能仅仅依靠返回类型来进行重载区分

示例：

```java
public class Example {
    public static void main(String[] args) {
        System.out.println(add(5, 10));       // 调用 add(int, int)
        System.out.println(add(5.5, 10.5));   // 调用 add(double, double)
    }

    public static int add(int a, int b) {
        return a + b;
    }

    public static double add(double a, double b) {
        return a + b;
    }
}

```

### **3.2.2 方法重载与参数类型不同**

方法重载不仅可以通过参数数量来区分，也可以通过参数的类型来区分。顺序不同也可以构成方法重载。

```java
public class Example {
    public static void main(String[] args) {
        System.out.println(add(5, 10));     // 调用 int, int
        System.out.println(add("Hello", "World")); // 调用 String, String
    }

    public static int add(int a, int b) {
        return a + b;
    }

    public static String add(String a, String b) {
        return a + b;
    }
}

```

## **3.3 代码组织：包（package）与类的封装**

Java 使用 **包（package）** 来组织类和接口，以避免类名冲突并提高代码的可维护性。包也可以控制类的访问权限。

### **3.3.1 包（package）**

包的定义方式如下：

```java
package 包名;

```

定义了包后，可以通过 import 来导入其他包中的类。

示例：

```java
package com.example;  // 包的定义

public class Example {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

```

#### **访问控制修饰符**

- public：公开的，可以被任何其他类访问。

- protected：在同一包中或子类中可访问。

- default（无修饰符）：仅在同一包中可访问。

- private：仅在当前类中可访问。

## **3.4 Java 的 main 方法和程序入口**

在 Java 程序中，main 方法是程序的入口点，程序的执行从 main 方法开始。

### **3.4.1 main 方法的定义**

main 方法的定义格式如下：

```java
public static void main(String[] args) {
    // 程序入口
}

```

- public：表示 main 方法可以被 JVM 调用。

- static：使得 main 方法可以不依赖于类的实例化直接调用。

- void：表示 main 方法没有返回值。

- String[] args：用于接收命令行参数的字符串数组。

示例：

```java
public class Example {
    public static void main(String[] args) {
        System.out.println("Hello, World!");  // 程序入口
    }
}

```

## **总结**

- 方法：用于代码复用和封装逻辑，具有参数传递和返回值的特性。

- 方法重载：允许同名方法根据参数列表的不同进行区分。

- 包与类的封装：通过包组织代码，提高模块化和避免命名冲突。

- main 方法：Java 程序的入口点，JVM 从 main 方法开始执行程序。

掌握方法的基本概念和使用，有助于提高代码的结构化和可维护性，而方法重载、包的使用和 main 方法的正确理解则能帮助开发者构建更灵活和模块化的 Java 应用。