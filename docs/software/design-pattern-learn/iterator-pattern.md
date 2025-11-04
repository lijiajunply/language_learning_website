# 迭代器模式 (Iterator Pattern)

## 概述

迭代器模式是一种行为型设计模式，它提供了一种方法来访问一个容器对象中的各个元素，而又不暴露该对象的内部表示。迭代器模式将遍历逻辑从集合类中分离出来，使集合类更加专注于数据的存储和管理。

迭代器模式的核心思想是提供一个统一的接口，用于遍历不同类型的集合对象，而不需要关心集合对象的具体实现细节。这样，客户端代码就可以使用相同的方式遍历不同类型的集合。

## 核心要点

- **提供统一的遍历接口**：通过迭代器接口，客户端可以以相同的方式遍历不同的集合
- **封装遍历逻辑**：将集合的遍历逻辑封装在迭代器中，而不是集合类本身
- **支持不同的遍历方式**：可以为同一个集合提供不同的迭代器，实现不同的遍历方式
- **解耦集合与遍历**：集合类只负责数据的存储，迭代器负责数据的访问

## 应用场景

- **当需要遍历一个集合对象，但不希望暴露其内部实现时**
- **当需要为不同的集合对象提供统一的遍历接口时**
- **当需要在不修改集合类的情况下，增加新的遍历方式时**
- **当集合类的内部结构复杂，希望简化客户端对集合的访问时**

## 结构

迭代器模式包含以下角色：

1. **迭代器（Iterator）**：定义访问和遍历元素的接口
2. **具体迭代器（Concrete Iterator）**：实现迭代器接口，完成对集合对象的遍历
3. **集合（Aggregate）**：定义创建迭代器对象的接口
4. **具体集合（Concrete Aggregate）**：实现集合接口，创建相应的迭代器对象

## 实现示例

### 1. 基本迭代器模式实现

```java
// 迭代器接口
public interface Iterator<E> {
    boolean hasNext(); // 检查是否还有下一个元素
    E next(); // 获取下一个元素
    default void remove() { // 移除当前元素（默认实现）
        throw new UnsupportedOperationException("不支持删除操作");
    }
}

// 集合接口
public interface Aggregate<E> {
    Iterator<E> createIterator(); // 创建迭代器对象
}

// 具体集合：数组列表
public class ConcreteAggregate<E> implements Aggregate<E> {
    private Object[] elements; // 存储元素的数组
    private int size = 0; // 当前元素个数
    private static final int DEFAULT_CAPACITY = 10; // 默认容量
    
    public ConcreteAggregate() {
        elements = new Object[DEFAULT_CAPACITY];
    }
    
    public ConcreteAggregate(int capacity) {
        elements = new Object[capacity > 0 ? capacity : DEFAULT_CAPACITY];
    }
    
    // 添加元素
    public void add(E element) {
        ensureCapacity(); // 确保数组有足够的空间
        elements[size++] = element;
    }
    
    // 获取元素
    @SuppressWarnings("unchecked")
    public E get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("索引超出范围: " + index);
        }
        return (E) elements[index];
    }
    
    // 获取元素个数
    public int size() {
        return size;
    }
    
    // 确保数组有足够的空间
    private void ensureCapacity() {
        if (size == elements.length) {
            Object[] newElements = new Object[elements.length * 2];
            System.arraycopy(elements, 0, newElements, 0, size);
            elements = newElements;
        }
    }
    
    // 创建迭代器
    @Override
    public Iterator<E> createIterator() {
        return new ConcreteIterator<>();
    }
    
    // 具体迭代器
    private class ConcreteIterator<E> implements Iterator<E> {
        private int cursor = 0; // 当前游标位置
        private int lastRet = -1; // 上一次返回元素的索引
        
        @Override
        public boolean hasNext() {
            return cursor < size; // 检查游标是否小于元素个数
        }
        
        @SuppressWarnings("unchecked")
        @Override
        public E next() {
            if (!hasNext()) {
                throw new NoSuchElementException("没有更多元素");
            }
            lastRet = cursor;
            return (E) elements[cursor++]; // 返回当前元素，并将游标向前移动
        }
        
        @Override
        public void remove() {
            if (lastRet < 0) {
                throw new IllegalStateException("在next()调用之前不能调用remove()");
            }
            
            // 删除lastRet位置的元素
            int numMoved = size - lastRet - 1;
            if (numMoved > 0) {
                System.arraycopy(elements, lastRet + 1, elements, lastRet, numMoved);
            }
            elements[--size] = null; // 释放最后一个位置的引用
            cursor = lastRet; // 更新游标位置
            lastRet = -1; // 重置lastRet
        }
    }
}

// 客户端
public class IteratorPatternDemo {
    public static void main(String[] args) {
        // 创建集合对象
        ConcreteAggregate<String> aggregate = new ConcreteAggregate<>();
        
        // 添加元素
        aggregate.add("元素1");
        aggregate.add("元素2");
        aggregate.add("元素3");
        aggregate.add("元素4");
        aggregate.add("元素5");
        
        // 获取迭代器
        Iterator<String> iterator = aggregate.createIterator();
        
        // 使用迭代器遍历集合
        System.out.println("使用迭代器遍历集合:");
        while (iterator.hasNext()) {
            String element = iterator.next();
            System.out.println(element);
        }
        
        // 测试remove方法
        System.out.println("\n测试remove方法:");
        iterator = aggregate.createIterator();
        while (iterator.hasNext()) {
            String element = iterator.next();
            if (element.equals("元素3")) {
                iterator.remove(); // 删除元素3
                System.out.println("删除了: " + element);
            }
        }
        
        // 再次遍历集合
        System.out.println("\n删除元素后的集合:");
        iterator = aggregate.createIterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        
        // 获取集合大小
        System.out.println("\n集合大小: " + aggregate.size());
    }
}
```

## 2. 双向迭代器实现

```java
// 双向迭代器接口
public interface BidirectionalIterator<E> extends Iterator<E> {
    boolean hasPrevious(); // 检查是否还有前一个元素
    E previous(); // 获取前一个元素
}

// 支持双向迭代的集合接口
public interface BidirectionalAggregate<E> extends Aggregate<E> {
    BidirectionalIterator<E> createBidirectionalIterator(); // 创建双向迭代器
}

// 具体双向集合
public class BidirectionalConcreteAggregate<E> implements BidirectionalAggregate<E> {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_CAPACITY = 10;
    
    public BidirectionalConcreteAggregate() {
        elements = new Object[DEFAULT_CAPACITY];
    }
    
    public BidirectionalConcreteAggregate(int capacity) {
        elements = new Object[capacity > 0 ? capacity : DEFAULT_CAPACITY];
    }
    
    // 添加元素
    public void add(E element) {
        ensureCapacity();
        elements[size++] = element;
    }
    
    // 获取元素
    @SuppressWarnings("unchecked")
    public E get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("索引超出范围: " + index);
        }
        return (E) elements[index];
    }
    
    // 获取元素个数
    public int size() {
        return size;
    }
    
    // 确保容量
    private void ensureCapacity() {
        if (size == elements.length) {
            Object[] newElements = new Object[elements.length * 2];
            System.arraycopy(elements, 0, newElements, 0, size);
            elements = newElements;
        }
    }
    
    // 创建普通迭代器
    @Override
    public Iterator<E> createIterator() {
        return new ConcreteIterator<>();
    }
    
    // 创建双向迭代器
    @Override
    public BidirectionalIterator<E> createBidirectionalIterator() {
        return new BidirectionalConcreteIterator<>();
    }
    
    // 普通迭代器实现（同前面的实现）
    private class ConcreteIterator<E> implements Iterator<E> {
        private int cursor = 0;
        private int lastRet = -1;
        
        @Override
        public boolean hasNext() {
            return cursor < size;
        }
        
        @SuppressWarnings("unchecked")
        @Override
        public E next() {
            if (!hasNext()) {
                throw new NoSuchElementException("没有更多元素");
            }
            lastRet = cursor;
            return (E) elements[cursor++];
        }
        
        @Override
        public void remove() {
            if (lastRet < 0) {
                throw new IllegalStateException("在next()调用之前不能调用remove()");
            }
            
            int numMoved = size - lastRet - 1;
            if (numMoved > 0) {
                System.arraycopy(elements, lastRet + 1, elements, lastRet, numMoved);
            }
            elements[--size] = null;
            cursor = lastRet;
            lastRet = -1;
        }
    }
    
    // 双向迭代器实现
    private class BidirectionalConcreteIterator<E> implements BidirectionalIterator<E> {
        private int cursor = 0; // 当前游标位置
        private int lastRet = -1; // 上一次返回元素的索引
        
        @Override
        public boolean hasNext() {
            return cursor < size;
        }
        
        @SuppressWarnings("unchecked")
        @Override
        public E next() {
            if (!hasNext()) {
                throw new NoSuchElementException("没有更多元素");
            }
            lastRet = cursor;
            return (E) elements[cursor++];
        }
        
        @Override
        public boolean hasPrevious() {
            return cursor > 0;
        }
        
        @SuppressWarnings("unchecked")
        @Override
        public E previous() {
            if (!hasPrevious()) {
                throw new NoSuchElementException("没有更多元素");
            }
            lastRet = --cursor;
            return (E) elements[cursor];
        }
        
        @Override
        public void remove() {
            if (lastRet < 0) {
                throw new IllegalStateException("在next()或previous()调用之前不能调用remove()");
            }
            
            int numMoved = size - lastRet - 1;
            if (numMoved > 0) {
                System.arraycopy(elements, lastRet + 1, elements, lastRet, numMoved);
            }
            elements[--size] = null;
            if (cursor > lastRet) {
                cursor--;
            }
            lastRet = -1;
        }
    }
}

// 双向迭代器演示
public class BidirectionalIteratorDemo {
    public static void main(String[] args) {
        // 创建双向集合
        BidirectionalConcreteAggregate<String> aggregate = new BidirectionalConcreteAggregate<>();
        
        // 添加元素
        aggregate.add("元素1");
        aggregate.add("元素2");
        aggregate.add("元素3");
        aggregate.add("元素4");
        aggregate.add("元素5");
        
        // 获取双向迭代器
        BidirectionalIterator<String> iterator = aggregate.createBidirectionalIterator();
        
        // 正向遍历
        System.out.println("正向遍历:");
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        
        // 反向遍历
        System.out.println("\n反向遍历:");
        while (iterator.hasPrevious()) {
            System.out.println(iterator.previous());
        }
        
        // 混合遍历（先正向，再反向，再正向）
        System.out.println("\n混合遍历:");
        // 正向遍历到第3个元素
        for (int i = 0; i < 3 && iterator.hasNext(); i++) {
            System.out.println("正向: " + iterator.next());
        }
        
        // 反向遍历到第1个元素
        while (iterator.hasPrevious()) {
            System.out.println("反向: " + iterator.previous());
        }
        
        // 再次正向遍历
        System.out.println("\n再次正向遍历:");
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```

## 实际应用示例：员工信息管理系统

下面是一个实际应用的例子，展示如何使用迭代器模式实现员工信息管理系统：

```java
import java.util.HashMap;
import java.util.Map;

// 员工类
public class Employee {
    private String id; // 员工ID
    private String name; // 员工姓名
    private String department; // 部门
    private double salary; // 薪资
    
    public Employee(String id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
    
    // getter方法
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public double getSalary() {
        return salary;
    }
    
    // setter方法
    public void setName(String name) {
        this.name = name;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public void setSalary(double salary) {
        this.salary = salary;
    }
    
    @Override
    public String toString() {
        return "员工{" +
                "ID='" + id + '\'' +
                ", 姓名='" + name + '\'' +
                ", 部门='" + department + '\'' +
                ", 薪资=" + salary +
                '}';
    }
}

// 迭代器接口（针对员工的迭代器）
public interface EmployeeIterator {
    boolean hasNext(); // 检查是否还有下一个员工
    Employee next(); // 获取下一个员工
    void remove(); // 移除当前员工
}

// 员工集合接口
public interface EmployeeAggregate {
    void addEmployee(Employee employee); // 添加员工
    void removeEmployee(String employeeId); // 移除员工
    EmployeeIterator createIterator(); // 创建迭代器
    EmployeeIterator createDepartmentIterator(String department); // 创建按部门过滤的迭代器
}

// 具体员工集合：使用HashMap存储员工
public class EmployeeDirectory implements EmployeeAggregate {
    private Map<String, Employee> employees; // 使用ID作为键，员工对象作为值
    
    public EmployeeDirectory() {
        employees = new HashMap<>();
    }
    
    @Override
    public void addEmployee(Employee employee) {
        employees.put(employee.getId(), employee);
    }
    
    @Override
    public void removeEmployee(String employeeId) {
        employees.remove(employeeId);
    }
    
    @Override
    public EmployeeIterator createIterator() {
        return new AllEmployeeIterator();
    }
    
    @Override
    public EmployeeIterator createDepartmentIterator(String department) {
        return new DepartmentEmployeeIterator(department);
    }
    
    // 获取员工总数
    public int getEmployeeCount() {
        return employees.size();
    }
    
    // 具体迭代器：遍历所有员工
    private class AllEmployeeIterator implements EmployeeIterator {
        private java.util.Iterator<Employee> iterator; // 使用Java内置的Iterator
        private Employee currentEmployee; // 当前员工
        
        public AllEmployeeIterator() {
            iterator = employees.values().iterator();
        }
        
        @Override
        public boolean hasNext() {
            return iterator.hasNext();
        }
        
        @Override
        public Employee next() {
            currentEmployee = iterator.next();
            return currentEmployee;
        }
        
        @Override
        public void remove() {
            if (currentEmployee != null) {
                iterator.remove();
                currentEmployee = null;
            }
        }
    }
    
    // 具体迭代器：按部门过滤员工
    private class DepartmentEmployeeIterator implements EmployeeIterator {
        private String department; // 目标部门
        private Employee[] departmentEmployees; // 存储部门员工的数组
        private int position = 0; // 当前位置
        private int currentIndex = -1; // 当前员工索引
        
        public DepartmentEmployeeIterator(String department) {
            this.department = department;
            // 初始化部门员工数组
            initDepartmentEmployees();
        }
        
        // 初始化部门员工数组
        private void initDepartmentEmployees() {
            // 先计算部门员工数量
            int count = 0;
            for (Employee employee : employees.values()) {
                if (employee.getDepartment().equals(department)) {
                    count++;
                }
            }
            
            // 创建数组并填充
            departmentEmployees = new Employee[count];
            int index = 0;
            for (Employee employee : employees.values()) {
                if (employee.getDepartment().equals(department)) {
                    departmentEmployees[index++] = employee;
                }
            }
        }
        
        @Override
        public boolean hasNext() {
            return position < departmentEmployees.length;
        }
        
        @Override
        public Employee next() {
            if (!hasNext()) {
                throw new NoSuchElementException("没有更多员工");
            }
            currentIndex = position;
            return departmentEmployees[position++];
        }
        
        @Override
        public void remove() {
            if (currentIndex < 0) {
                throw new IllegalStateException("在next()调用之前不能调用remove()");
            }
            
            // 从Map中移除员工
            Employee employeeToRemove = departmentEmployees[currentIndex];
            employees.remove(employeeToRemove.getId());
            
            // 重新初始化部门员工数组
            initDepartmentEmployees();
            
            // 调整位置
            position = currentIndex;
            currentIndex = -1;
        }
    }
}

// 客户端：员工管理系统
public class EmployeeManagementSystem {
    public static void main(String[] args) {
        // 创建员工目录
        EmployeeDirectory directory = new EmployeeDirectory();
        
        // 添加员工
        directory.addEmployee(new Employee("E001", "张三", "开发部", 9000));
        directory.addEmployee(new Employee("E002", "李四", "开发部", 8500));
        directory.addEmployee(new Employee("E003", "王五", "市场部", 7500));
        directory.addEmployee(new Employee("E004", "赵六", "市场部", 7000));
        directory.addEmployee(new Employee("E005", "钱七", "人事部", 8000));
        
        // 遍历所有员工
        System.out.println("=== 所有员工 ===");
        EmployeeIterator allIterator = directory.createIterator();
        while (allIterator.hasNext()) {
            System.out.println(allIterator.next());
        }
        
        // 遍历开发部员工
        System.out.println("\n=== 开发部员工 ===");
        EmployeeIterator devIterator = directory.createDepartmentIterator("开发部");
        while (devIterator.hasNext()) {
            System.out.println(devIterator.next());
        }
        
        // 遍历市场部员工
        System.out.println("\n=== 市场部员工 ===");
        EmployeeIterator marketIterator = directory.createDepartmentIterator("市场部");
        while (marketIterator.hasNext()) {
            System.out.println(marketIterator.next());
        }
        
        // 测试删除功能
        System.out.println("\n=== 测试删除功能 ===");
        devIterator = directory.createDepartmentIterator("开发部");
        while (devIterator.hasNext()) {
            Employee employee = devIterator.next();
            if (employee.getId().equals("E002")) {
                devIterator.remove();
                System.out.println("删除了员工: " + employee.getId());
                break;
            }
        }
        
        // 再次遍历开发部员工
        System.out.println("\n=== 删除后的开发部员工 ===");
        devIterator = directory.createDepartmentIterator("开发部");
        while (devIterator.hasNext()) {
            System.out.println(devIterator.next());
        }
        
        // 获取员工总数
        System.out.println("\n员工总数: " + directory.getEmployeeCount());
    }
}
```

## 优缺点

### 优点

- **提供统一的遍历接口**：客户端可以使用相同的方式遍历不同类型的集合
- **封装遍历逻辑**：将集合的遍历逻辑封装在迭代器中，使集合类更加专注于数据的存储和管理
- **支持不同的遍历方式**：可以为同一个集合提供不同的迭代器，实现不同的遍历方式
- **符合单一职责原则**：集合类负责数据的存储，迭代器负责数据的访问

### 缺点

- **增加了类的数量**：每个集合类可能需要对应多个迭代器类，增加了系统中类的数量
- **可能会增加系统的复杂性**：特别是当需要支持多种遍历方式时
- **对于简单的集合，使用迭代器可能会显得有些繁琐**：例如，对于简单的数组，直接使用for循环可能更加简单

## 与其他模式的关系

- **迭代器模式与工厂方法模式**：集合类创建迭代器的过程可以看作是工厂方法模式的应用
- **迭代器模式与组合模式**：迭代器模式常用于遍历组合模式中的对象树
- **迭代器模式与访问者模式**：两者都可以用于遍历集合，但访问者模式更关注对元素的操作，而迭代器模式更关注遍历本身

## 总结

迭代器模式是一种常用的行为型设计模式，它提供了一种方法来访问一个容器对象中的各个元素，而又不暴露该对象的内部表示。迭代器模式将遍历逻辑从集合类中分离出来，使集合类更加专注于数据的存储和管理。在实际应用中，Java等编程语言的集合框架都内置了对迭代器模式的支持，使得我们可以方便地遍历各种集合对象。