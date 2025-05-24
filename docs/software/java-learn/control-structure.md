# **第二章：控制结构**

## **2.1 条件分支**

条件分支结构用于根据不同的条件执行不同的代码块，常见的条件语句有 **if-else** 和 **switch**。

### **2.1.1 if-else 语句**

if 语句根据条件的真假决定是否执行某个代码块，可以使用 else 来处理条件不成立时的情况。else if 可以处理多个条件。

```java
if (条件) {
    // 条件成立时执行的代码
} else {
    // 条件不成立时执行的代码
}

```

示例：

```java
int a = 10;
if (a > 5) {
    System.out.println("a 大于 5");
} else {
    System.out.println("a 小于等于 5");
}

```

#### **嵌套 if 语句**

可以将一个 if 语句放入另一个 if 语句中来处理更复杂的条件。

```java
int a = 10, b = 20;
if (a > b) {
    System.out.println("a 大于 b");
} else if (a == b) {
    System.out.println("a 等于 b");
} else {
    System.out.println("a 小于 b");
}

```

### **2.1.2 switch 语句**

switch 语句用于根据变量的值选择执行不同的代码块，适用于多个条件判断。

```java
switch (表达式) {
    case 常量1:
        // 执行代码
        break;
    case 常量2:
        // 执行代码
        break;
    default:
        // 所有情况都不匹配时执行的代码
}

```

示例：

```java
int day = 3;
switch (day) {
    case 1:
        System.out.println("星期一");
        break;
    case 2:
        System.out.println("星期二");
        break;
    case 3:
        System.out.println("星期三");
        break;
    default:
        System.out.println("未知的星期");
}

```

- break：结束当前 switch 语句，跳出 switch 块。

- default：可选的，表示当没有任何 case 匹配时的默认行为。

## **2.2 循环结构**

循环语句用于重复执行某个代码块，直到满足一定的条件。Java 中有三种常用的循环结构：for、while 和 do-while。

### **2.2.1 for 循环**

for 循环用于已知循环次数的场景。语法结构为：

```java
for (初始化; 条件; 更新) {
    // 循环体
}

```

- 初始化：初始化循环变量。

- 条件：循环继续的条件。

- 更新：每次循环结束时执行的操作（如更新计数器）。

示例：

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);  // 输出 0 到 4
}

```

### **2.2.2 while 循环**

while 循环适用于条件判断在循环开始时决定是否执行。语法结构为：

```java
while (条件) {
    // 循环体
}

```

示例：

```java
int i = 0;
while (i < 5) {
    System.out.println(i);  // 输出 0 到 4
    i++;  // 更新条件
}

```

### **2.2.3 do-while 循环**

do-while 循环与 while 相似，但不同的是它会先执行一次循环体，再进行条件判断，因此至少执行一次。

语法结构为：

```java
do {
    // 循环体
} while (条件);

```

示例：

```java
int i = 0;
do {
    System.out.println(i);  // 输出 0 到 4
    i++;
} while (i < 5);

```

## **2.3 代码块与作用域**

### **2.3.1 代码块**

代码块是用 {} 括起来的一段代码，可以包含多个语句。Java 中常见的代码块有：

- 方法体：定义方法时所写的代码块。

- 循环体：for、while、do-while 循环的代码块。

- 条件语句块：if、switch 语句的代码块。

- 类体：类的成员和方法定义在类体中。

示例：

```java
public class Example {
    public static void main(String[] args) {
        if (true) {
            System.out.println("这是一个条件代码块");
        }
    }
}

```

### **2.3.2 作用域**

作用域是指变量、方法或类可被访问的范围。在 Java 中，作用域决定了变量在哪些地方是可见的。

- 局部变量作用域：在方法、循环体、代码块内声明的变量只能在这些范围内访问。

- 成员变量作用域：定义在类中的变量，可以在类的所有方法中访问。

- 全局作用域（类级别）：类中定义的静态成员变量可以通过类名直接访问。

示例：

```java
public class Example {
    int instanceVar = 10;  // 成员变量

    public void method() {
        int localVar = 5;  // 局部变量
        System.out.println(instanceVar);  // 成员变量可访问
        System.out.println(localVar);  // 局部变量可访问
    }
}

```

### **2.3.3 作用域嵌套**

变量的作用域会受到代码块层次结构的影响。例如，内部代码块中的变量不能在外部代码块中访问。

```java
public class Example {
    public void method() {
        if (true) {
            int innerVar = 100;
            System.out.println(innerVar);  // 可以访问
        }
        System.out.println(innerVar);  // 错误：innerVar 在这里不可见
    }
}

```

## **总结**

- 条件分支：if-else 和 switch 用于根据条件执行不同代码。

- 循环结构：for、while 和 do-while 用于重复执行代码。

- 代码块与作用域：代码块包围的语句，作用域决定变量的可访问范围。