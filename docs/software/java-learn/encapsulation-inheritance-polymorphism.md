# **第五章：封装、继承、多态**

## **5.1 封装（Encapsulation）**

封装是面向对象编程的四大特性之一，它将对象的状态（属性）和行为（方法）包装在一起，对外界隐藏对象的实现细节，只暴露必要的接口。通过封装，可以提高代码的安全性、可维护性和灵活性。

### **5.1.1 访问修饰符**

封装通过访问控制（如 private、public、protected）来实现对对象属性的保护。通常，将类的属性设置为 private，并通过公共的 getter 和 setter 方法来访问或修改这些属性。

```java
public class Person {
    private String name;  // 私有属性

    // 公有的 setter 方法
    public void setName(String name) {
        this.name = name;
    }

    // 公有的 getter 方法
    public String getName() {
        return this.name;
    }
}

```

### **5.1.2 优点**

- 数据保护：通过 setter 和 getter 控制属性的访问，防止非法修改。

- 灵活性：可以在类内部进行修改而不影响外部代码。

- 提高维护性：隐藏内部实现，外部只需要关心如何使用。

## **5.2 继承（Inheritance）**

继承是面向对象编程的另一个重要特性，它允许一个类继承另一个类的属性和方法，增强代码的复用性。

### **5.2.1 继承的基本概念**

Java 中使用 extends 关键字来实现继承，子类继承父类的所有非私有属性和方法，并可以重写父类的方法或添加新的方法。

```java
// 父类（基类）
public class Animal {
    public void eat() {
        System.out.println("This animal eats food.");
    }
}

// 子类（派生类）
public class Dog extends Animal {
    // 子类可以重写父类方法
    @Override
    public void eat() {
        System.out.println("The dog eats bones.");
    }
}

```

### **5.2.2 继承的注意事项**

- Java 中的继承是单继承，一个类只能继承一个直接父类。

- 子类继承父类时，会继承父类的非私有成员，但不能继承父类的构造方法。

## **5.3 方法重写（Overriding）**

方法重写是指在子类中重新定义父类的方法，目的是为了提供不同的实现。重写的方法必须与父类方法具有相同的方法签名（方法名、参数列表）。

### **5.3.1 方法重写的规则**

- 方法名、参数列表必须与父类方法一致。

- 子类重写父类方法时，方法的访问修饰符不能低于父类方法的修饰符。例如，如果父类方法是 public，则子类方法不能是 private。

```java
public class Animal {
    public void sound() {
        System.out.println("Animal makes a sound.");
    }
}

public class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Dog barks.");
    }
}

```

## **5.4 多态（Polymorphism）**

多态是指同一操作作用于不同的对象时，可以产生不同的执行结果。多态分为**编译时多态（静态多态）和运行时多态（动态多态）**。

### **5.4.1 编译时多态（方法重载）**

编译时多态通过方法重载实现，方法重载是指一个类中可以有多个方法，它们具有相同的名字，但参数列表不同。

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }
}

```

### **5.4.2 运行时多态（方法重写）**

运行时多态是通过方法重写来实现的，子类的对象可以覆盖父类的方法，并根据对象的实际类型来执行相应的方法。Java 使用 **父类引用指向子类对象** 来实现运行时多态。

```java
public class Animal {
    public void sound() {
        System.out.println("Animal makes a sound.");
    }
}

public class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Dog barks.");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        animal.sound();  // 输出 "Dog barks."
    }
}

```

在这个例子中，animal 是 Animal 类型的引用，但它指向的是 Dog 类型的对象。因此，调用 sound() 方法时，会调用 Dog 类中的实现。

## **5.5 抽象类与接口（Abstract Classes & Interfaces）**

### **5.5.1 抽象类（Abstract Class）**

抽象类是一个不能直接实例化的类，它通常包含一个或多个抽象方法（没有实现的方法），子类必须重写这些抽象方法才能被实例化。抽象类可以包含已实现的方法。

```java
public abstract class Animal {
    public abstract void sound();  // 抽象方法，没有实现

    public void eat() {
        System.out.println("Animal eats food.");
    }
}

```

### **5.5.2 接口（Interface）**

接口是完全抽象的，它只能包含常量和抽象方法，不能包含实现代码。类通过实现接口来继承接口的方法，并提供方法的具体实现。

```java
public interface Animal {
    void sound();  // 抽象方法，接口中的方法默认是 public abstract
}

public class Dog implements Animal {
    @Override
    public void sound() {
        System.out.println("Dog barks.");
    }
}

```

### **5.5.3 抽象类与接口的区别**

| 特性 | 抽象类 | 接口 | 
| -- | -- | -- |
| 方法 | 可以包含实现的方法 | 只能包含抽象方法 | 
| 构造方法 | 可以有构造方法 | 不能有构造方法 | 
| 多继承 | 不支持多继承 | 支持多继承 | 
| 实现 | 子类通过  | 类通过  | 


## **5.6 Java 的接口与多实现**

Java 不支持类的多继承，但支持接口的多实现。一个类可以实现多个接口。

```java
public interface Animal {
    void sound();
}

public interface Pet {
    void play();
}

public class Dog implements Animal, Pet {
    @Override
    public void sound() {
        System.out.println("Dog barks.");
    }

    @Override
    public void play() {
        System.out.println("Dog plays.");
    }
}

```

在这个例子中，Dog 类实现了两个接口：Animal 和 Pet，因此可以实现它们各自的方法。

## **总结**

- 封装：通过访问修饰符保护对象的属性，控制对数据的访问。

- 继承：子类继承父类的属性和方法，支持代码复用。

- 方法重写：子类重写父类的方法，实现不同的功能。

- 多态：同一方法调用产生不同的行为，包括编译时和运行时多态。

- 抽象类与接口：抽象类提供部分实现，接口只提供方法签名，支持多实现。

理解封装、继承、多态等概念是掌握 Java 面向对象编程的关键。它们是设计灵活、高效、可维护的 Java 应用程序的基础。