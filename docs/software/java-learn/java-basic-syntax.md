# **第一章：Java 基础语法**

## **1.1 变量与数据类型**

### **1.1.1 变量**

变量是存储数据的容器，在 Java 中必须先声明变量，然后才能使用。变量的声明方式如下：

```java
数据类型 变量名 = 值;
```

示例：

```java
int age = 25;  // 声明整数变量
double price = 99.99;  // 声明浮点数变量
char grade = 'A';  // 声明字符变量
boolean isJavaFun = true;  // 声明布尔变量

```

Java 变量可以分为：

- 局部变量：定义在方法内部，方法执行时才会生效，方法结束后销毁。

- 成员变量（实例变量）：定义在类中，属于对象，实例化对象后才会分配内存。

- 静态变量（类变量）：使用 static 关键字定义，属于类而不是对象，所有对象共享。

示例：

```java
public class Example {
    int instanceVar = 10; // 实例变量
    static int staticVar = 20; // 静态变量

    public void method() {
        int localVar = 30; // 局部变量
        System.out.println(localVar);
    }
}
```

### **1.1.2 数据类型**

Java 是 **强类型语言**，变量必须指定类型。数据类型分为 **基本类型** 和 **引用类型**。

#### **（1）基本类型（Primitive Types）**

Java 有 8 种基本数据类型：

| 数据类型 | 大小 | 默认值 | 取值范围 | 
| -- | -- | -- | -- |
| byte | 1 字节 | 0 | -128 ~ 127 | 
| short | 2 字节 | 0 | -32,768 ~ 32,767 | 
| int | 4 字节 | 0 | -2³¹ ~ 2³¹-1 | 
| long | 8 字节 | 0L | -2⁶³ ~ 2⁶³-1 | 
| float | 4 字节 | 0.0f | 约 ±3.4E38 | 
| double | 8 字节 | 0.0 | 约 ±1.8E308 | 
| char | 2 字节 | '\u0000' | 0 ~ 65535（Unicode） | 
| boolean | 1 字节 | false | true 或 false | 


示例：

```java
byte a = 127;
int b = 1000;
long c = 100000L;
float d = 3.14f;
double e = 2.718;
char f = 'J';
boolean g = true;
```

#### **（2）引用类型（Reference Types）**

引用类型存储的是对象的引用，而不是值本身，主要包括：

- 类（Class）：通过 new 关键字创建对象，例如 String、Scanner。

- 数组（Array）：一组相同类型的数据，例如 int[] arr = new int[10];。

- 接口（Interface）：定义方法但不实现，可用于多态。

示例：

```java
String name = "Java";  // String 是引用类型
int[] numbers = {1, 2, 3};  // 数组
Example obj = new Example();  // 类的对象
```

## **1.2 运算符**

Java 提供多种运算符，可用于数学计算、逻辑判断等。

### **1.2.1 算术运算符**

| 运算符 | 说明 | 示例 | 
| -- | -- | -- |
| + | 加法 | a + b | 
| - | 减法 | a - b | 
| * | 乘法 | a * b | 
| / | 除法（整数除法时取整） | a / b | 
| % | 取模（余数） | a % b | 


示例：

```java
int a = 10, b = 3;
System.out.println(a + b);  // 13
System.out.println(a - b);  // 7
System.out.println(a * b);  // 30
System.out.println(a / b);  // 3 (整数除法)
System.out.println(a % b);  // 1
```

### **1.2.2 逻辑运算符**

| 运算符 | 说明 | 示例 | 
| -- | -- | -- |
| && | 逻辑与 | a > 0 && b < 10 | 
| || | 逻辑或 | a < 0 && b > 10 | 
| ! | 逻辑非 | !(a > 0) | 


示例：

```java
boolean x = true, y = false;
System.out.println(x && y); // false
System.out.println(x || y); // true
System.out.println(!x);     // false
```

### **1.2.3 位运算符**

| 运算符 | 说明 | 示例 | 
| -- | -- | -- |
| & | 按位与 | a & b | 
| | | | | 按位或 | 
| ^ | 按位异或 | a ^ b | 
| ~ | 按位取反 | ~a | 
| << | 左移 | a << 2 | 
| >> | 右移 | a >> 2 | 


示例：

```java
int a = 5, b = 3;
System.out.println(a & b);  // 1
System.out.println(a | b);  // 7
System.out.println(a ^ b);  // 6
System.out.println(~a);     // -6
System.out.println(a << 1); // 10
System.out.println(a >> 1); // 2
```

## **1.3 类型转换**

Java 中支持 **自动类型转换** 和 **强制类型转换**。

### **1.3.1 自动类型转换**

小范围的数据类型可以自动转换为大范围：

| 低 → 高 | 
| -- |
| byte | 


示例：

```java
int a = 100;
double b = a;  // 自动转换为 double
System.out.println(b);  // 100.0
```

### **1.3.2 强制类型转换**

大范围数据转换为小范围时，需要强制转换：

```java
double x = 10.99;
int y = (int) x;  // 强制转换
System.out.println(y);  // 10
```

注意：

- 强制转换可能会导致数据丢失，如 10.99 变成 10。

- 布尔类型 boolean 不能与数值类型转换。

## **总结**

- Java 变量分为 **基本类型** 和 **引用类型**。

- 运算符包括 **算术运算、逻辑运算、位运算**。

- Java 支持 **自动类型转换** 和 **强制类型转换**，但强制转换可能导致数据丢失。