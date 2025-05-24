# **第四章：面向对象编程基础**

## **4.1 类与对象**

**类（Class）** 是 Java 中定义对象的蓝图或模板，它描述了对象的状态（属性）和行为（方法）。**对象（Object）** 是类的实例，通过类来创建和操作。

### **4.1.1 类的定义**

类的定义包括类名、成员变量（属性）、构造方法、成员方法等。

```java
public class Car {
    // 属性（成员变量）
    String brand;
    String model;
    int year;

    // 方法（成员方法）
    public void drive() {
        System.out.println("The car is driving.");
    }
}

```

### **4.1.2 创建对象**

通过 new 关键字创建类的对象：

```java
public class Main {
    public static void main(String[] args) {
        // 创建 Car 类的对象
        Car myCar = new Car();
        myCar.brand = "Toyota";
        myCar.model = "Camry";
        myCar.year = 2020;

        System.out.println("Car brand: " + myCar.brand);
        myCar.drive();
    }
}

```

在这个例子中，myCar 就是 Car 类的一个对象，我们可以通过它来访问 Car 类的属性和方法。

## **4.2 构造方法**

构造方法是一个特殊的方法，用于初始化新创建的对象。当我们创建一个对象时，构造方法会自动被调用。

### **4.2.1 构造方法的定义**

构造方法的基本形式如下：

```java
public class Car {
    String brand;
    String model;

    // 构造方法
    public Car(String brand, String model) {
        this.brand = brand;  // 使用 this 关键字来区分成员变量和参数
        this.model = model;
    }
}

```

### **4.2.2 构造方法的调用**

创建对象时，构造方法会被调用：

```java
public class Main {
    public static void main(String[] args) {
        // 调用带参构造方法
        Car myCar = new Car("Toyota", "Corolla");
        System.out.println("Car brand: " + myCar.brand);
    }
}

```

### **4.2.3 默认构造方法**

如果类没有显式定义构造方法，Java 编译器会提供一个默认的无参构造方法：

```java
public class Car {
    String brand;
    String model;

    // 如果没有定义构造方法，Java 会提供一个默认的无参构造方法
}

```

## **4.3 this 关键字**

this 是 Java 中的一个引用变量，指向当前对象的引用。它用于区分类的成员变量与方法的参数，或者在构造方法中引用当前对象。

### **4.3.1 在构造方法中使用 this**

当参数名称与成员变量名称相同时，this 可以帮助我们明确区分：

```java
public class Car {
    String brand;
    String model;

    public Car(String brand, String model) {
        this.brand = brand;  // this.brand 是类的成员变量，brand 是参数
        this.model = model;  // this.model 是类的成员变量，model 是参数
    }
}

```

### **4.3.2 在方法中使用 this**

this 还可以用于在方法中引用当前对象：

```java
public class Car {
    String brand;
    String model;

    public void showInfo() {
        System.out.println("Car brand: " + this.brand); // this 代表当前对象
    }
}

```

## **4.4 访问控制（Access Control）**

Java 中的访问控制是通过关键字来管理类、方法、属性等的访问权限，主要有 private、public、protected 和 **default（无修饰符）**。

### **4.4.1 public 关键字**

public 修饰的类、方法或变量可以被任何其他类访问，不受访问限制。

```java
public class Car {
    public String brand;  // 任何类都能访问
}

```

### **4.4.2 private 关键字**

private 修饰的成员变量或方法只能在类内部访问，外部无法直接访问。

```java
public class Car {
    private String brand;  // 只能在 Car 类内部访问

    public void setBrand(String brand) {
        this.brand = brand;  // 通过公有方法访问
    }

    public String getBrand() {
        return this.brand;  // 通过公有方法获取值
    }
}

```

### **4.4.3 protected 关键字**

protected 修饰的成员变量或方法可以在同一包内的其他类或所有子类中访问。

```java
public class Car {
    protected String brand;  // 同一包内或子类可以访问
}

```

### **4.4.4 default（无修饰符）**

没有修饰符时，成员变量或方法的访问权限是默认的，只有同一包内的类能够访问。

```java
public class Car {
    String brand;  // 默认访问权限，只能在同一包内访问
}

```

## **总结**

- 类与对象：类是对象的模板，通过类创建对象，实例化后才能操作。

- 构造方法：用于初始化对象的属性，支持默认构造和带参构造。

- this 关键字：引用当前对象的实例，通常用于区分成员变量与参数。

- 访问控制：通过 private、public、protected 和默认修饰符控制类成员的访问权限，确保封装性和数据安全。

理解和掌握面向对象编程的基础概念对于 Java 编程至关重要，它是实现代码模块化、复用性和可维护性的关键。