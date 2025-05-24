# **第十一章：元编程（反射与注解）**

## **11.1 反射机制**

反射机制是 Java 的一项强大特性，它允许在运行时检查类、方法、字段等信息，甚至可以在运行时动态地创建对象、调用方法、修改字段值等。

### **11.1.1 Class 类**

Class 类是反射机制的核心，它表示了类的元数据。在 Java 中，每个类都有一个 Class 对象，它包含了类的所有信息。

```java
Class<?> clazz = String.class;  // 获取 String 类的 Class 对象
System.out.println(clazz.getName());  // 输出：java.lang.String

```

### **11.1.2 Method 类**

Method 类表示类中的方法。通过反射可以动态调用方法。

```java
Class<?> clazz = String.class;
try {
    Method method = clazz.getMethod("toUpperCase");  // 获取 String 类的 toUpperCase 方法
    String str = "hello";
    String result = (String) method.invoke(str);  // 动态调用 toUpperCase 方法
    System.out.println(result);  // 输出：HELLO
} catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
    e.printStackTrace();
}

```

### **11.1.3 Field 类**

Field 类表示类中的字段。通过反射可以动态访问和修改字段的值。

```java
class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
}

Class<?> clazz = Person.class;
try {
    Field field = clazz.getDeclaredField("name");
    field.setAccessible(true);  // 允许访问私有字段
    Person person = new Person("Alice");
    String name = (String) field.get(person);  // 获取 name 字段的值
    System.out.println(name);  // 输出：Alice
} catch (NoSuchFieldException | IllegalAccessException e) {
    e.printStackTrace();
}

```

## **11.2 动态代理**

动态代理是 Java 提供的一种机制，允许在运行时创建代理对象，代理对象可以将方法调用委托给目标对象。Java 提供了两种方式来实现动态代理：JDK 动态代理和 CGLIB 代理。

### **11.2.1 JDK 动态代理**

JDK 动态代理基于接口实现，代理对象必须实现接口。java.lang.reflect.Proxy 类和 InvocationHandler 接口是 JDK 动态代理的核心。

```java
interface HelloService {
    void sayHello(String name);
}

class HelloServiceImpl implements HelloService {
    @Override
    public void sayHello(String name) {
        System.out.println("Hello, " + name);
    }
}

class MyInvocationHandler implements InvocationHandler {
    private Object target;
    
    public MyInvocationHandler(Object target) {
        this.target = target;
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Before method call");
        Object result = method.invoke(target, args);
        System.out.println("After method call");
        return result;
    }
}

public class JDKProxyExample {
    public static void main(String[] args) {
        HelloService helloService = new HelloServiceImpl();
        HelloService proxy = (HelloService) Proxy.newProxyInstance(
            HelloService.class.getClassLoader(),
            new Class<?>[] { HelloService.class },
            new MyInvocationHandler(helloService)
        );
        proxy.sayHello("Alice");
    }
}

```

**输出：**

```
Before method call
Hello, Alice
After method call

```

### **11.2.2 CGLIB 代理**

CGLIB (Code Generation Library) 通过继承目标类来实现动态代理，不要求目标类实现接口。CGLIB 比 JDK 动态代理更强大，但它需要对目标类进行字节码增强。

```java
class HelloService {
    public void sayHello(String name) {
        System.out.println("Hello, " + name);
    }
}

class MyMethodInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("Before method call");
        Object result = proxy.invokeSuper(obj, args);
        System.out.println("After method call");
        return result;
    }
}

public class CGLIBProxyExample {
    public static void main(String[] args) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(HelloService.class);
        enhancer.setCallback(new MyMethodInterceptor());
        
        HelloService proxy = (HelloService) enhancer.create();
        proxy.sayHello("Alice");
    }
}

```

**输出：**

```
Before method call
Hello, Alice
After method call

```

## **11.3 注解（Annotation）**

注解是 Java 提供的一种元数据机制，用于给程序元素（类、方法、字段等）添加信息。注解本身不直接影响程序的执行，但可以通过工具或框架进行处理。

### **11.3.1 定义和使用注解**

注解通过 @ 符号定义，可以应用于类、方法、字段等。自定义注解可以通过 @interface 关键字来定义。

```java
@interface MyAnnotation {
    String value() default "default value";
}

@MyAnnotation(value = "Hello World")
public class MyClass {
    @MyAnnotation
    public void myMethod() {
        System.out.println("Method executed");
    }
}

```

### **11.3.2 注解的元注解**

Java 提供了几种元注解，用于注解其他注解的定义。常用的元注解有：

- @Retention：指定注解的保留策略，决定注解在编译后是否可用。

- @Target：指定注解可以应用于哪些程序元素。

- @Documented：表示该注解应包含在 Javadoc 中。

- @Inherited：指示该注解可以被子类继承。

```java
@Retention(RetentionPolicy.RUNTIME)  // 在运行时保留
@Target(ElementType.METHOD)  // 只允许用于方法
@interface MyRuntimeAnnotation {
    String description() default "Default description";
}

```

## **总结**

- 反射机制：通过反射，Java 程序能够在运行时动态地获取类的信息，并进行修改。Class、Method、Field 是反射的核心类。

- 动态代理：动态代理允许我们在运行时创建代理对象，JDK 动态代理通过接口实现，而 CGLIB 代理则通过继承目标类实现。

- 注解：注解是一种元数据机制，可以用于给类、方法等元素添加额外信息，常用于框架设计和代码生成等场景。通过元注解可以控制注解的生命周期和使用场景。

掌握 Java 的反射机制、动态代理和注解，可以帮助你更好地理解框架设计，并在实际开发中灵活应用这些特性。