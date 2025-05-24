# **第七章：异常处理**

## **7.1 Java 异常层次结构**

Java 的异常类继承自 Throwable 类，Throwable 类有两个子类：

- Error：表示 Java 虚拟机的错误（如 OutOfMemoryError 等），通常是程序无法恢复的错误。

- Exception：表示程序中可以捕获并处理的异常，分为两种类型：

	- Checked Exception：编译时检查异常，需要在代码中显式处理。

	- Unchecked Exception：运行时异常，不强制要求处理。

异常类的继承层次结构如下：

```
Throwable
   ├── Error
   └── Exception
       ├── IOException
       ├── SQLException
       └── RuntimeException
           ├── NullPointerException
           └── ArithmeticException

```

- Error 类通常由 JVM 抛出，不适合程序员捕获。

- Exception 类是程序员需要处理的异常。

- RuntimeException 是一种 **Unchecked Exception**，编译器不强制要求捕获或处理。

## **7.2 Checked Exception vs. Unchecked Exception**

### **7.2.1 Checked Exception（编译时异常）**

Checked 异常是指编译器要求程序员必须显式处理的异常。这些异常继承自 Exception 类，但不属于 RuntimeException 类。

常见的 Checked 异常有：

- IOException：输入输出操作失败。

- SQLException：SQL 执行错误。

- FileNotFoundException：文件未找到。

例如，如果你调用某个方法，可能会抛出 IOException，编译器会强制要求你处理它。

```java
import java.io.*;

public class CheckedExceptionExample {
    public static void main(String[] args) {
        try {
            FileReader file = new FileReader("nonexistentfile.txt");
        } catch (IOException e) {
            System.out.println("Caught an IOException: " + e.getMessage());
        }
    }
}

```

### **7.2.2 Unchecked Exception（运行时异常）**

Unchecked 异常是指不需要显式捕获的异常，通常是由于程序错误导致的异常。这些异常继承自 RuntimeException 类。

常见的 Unchecked 异常有：

- NullPointerException：空指针异常。

- ArithmeticException：算术运算异常（如除以零）。

- ArrayIndexOutOfBoundsException：数组下标越界。

这些异常通常发生在运行时，编译器不会要求处理它们。

```java
public class UncheckedExceptionExample {
    public static void main(String[] args) {
        int result = 10 / 0;  // 会抛出 ArithmeticException
    }
}

```

## **7.3 try-catch-finally 机制**

### **7.3.1 try-catch 语句**

try 块用于编写可能会抛出异常的代码，catch 块用于捕获异常并进行处理。如果发生异常，catch 块会执行；如果没有异常发生，catch 块会被跳过。

```java
public class TryCatchExample {
    public static void main(String[] args) {
        try {
            int[] arr = new int[2];
            arr[5] = 10;  // 会抛出 ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught an ArrayIndexOutOfBoundsException: " + e.getMessage());
        }
    }
}

```

### **7.3.2 finally 块**

finally 块用于在 try 和 catch 块执行完毕后执行，通常用于资源清理（如关闭文件、数据库连接等）。finally 块总会执行，无论是否有异常发生。

```java
public class FinallyExample {
    public static void main(String[] args) {
        try {
            System.out.println("In try block.");
        } catch (Exception e) {
            System.out.println("In catch block.");
        } finally {
            System.out.println("In finally block.");
        }
    }
}

```

输出：

```
In try block.
In finally block.

```

## **7.4 throws 和 throw 关键字**

### **7.4.1 throw 关键字**

throw 关键字用于抛出一个异常。可以抛出已经创建的异常对象。

```java
public class ThrowExample {
    public static void main(String[] args) {
        try {
            throw new Exception("This is a custom exception.");
        } catch (Exception e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

```

### **7.4.2 throws 关键字**

throws 关键字用于在方法声明中指定该方法可能抛出的异常。throws 后面跟着异常类型，可以指定多个异常。

```java
public class ThrowsExample {
    public static void main(String[] args) {
        try {
            method();
        } catch (Exception e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }

    public static void method() throws Exception {
        throw new Exception("This method throws an exception.");
    }
}

```

## **7.5 自定义异常**

有时需要根据应用程序的需求创建自己的异常类。自定义异常类通常继承 Exception 类或其子类。

### **7.5.1 创建自定义异常**

```java
public class MyCustomException extends Exception {
    public MyCustomException(String message) {
        super(message);  // 调用父类的构造方法
    }
}

public class CustomExceptionExample {
    public static void main(String[] args) {
        try {
            throw new MyCustomException("This is a custom exception.");
        } catch (MyCustomException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

```

### **7.5.2 自定义运行时异常**

如果自定义异常是运行时异常，可以继承 RuntimeException 类。

```java
public class MyRuntimeException extends RuntimeException {
    public MyRuntimeException(String message) {
        super(message);
    }
}

public class RuntimeExceptionExample {
    public static void main(String[] args) {
        throw new MyRuntimeException("This is a runtime exception.");
    }
}

```

## **总结**

- 异常层次结构：Java 的异常层次结构分为 Error 和 Exception，Exception 下还有 Checked Exception 和 Unchecked Exception。

- Checked Exception 和 Unchecked Exception：Checked 异常需要显式处理，Unchecked 异常则不强制要求处理。

- 异常处理机制：使用 try-catch 捕获并处理异常，finally 用于资源清理。

- throws 和 throw 关键字：throw 用于抛出异常，throws 用于声明方法可能抛出的异常。

- 自定义异常：可以自定义异常类，通过继承 Exception 或 RuntimeException 来创建适合自己需求的异常类型。

掌握异常处理是编写健壮 Java 程序的重要部分，它能帮助开发者在运行时捕获和处理错误，从而避免程序崩溃。