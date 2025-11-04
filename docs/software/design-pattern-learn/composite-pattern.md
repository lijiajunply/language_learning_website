# 组合模式 (Composite Pattern)

## 概述

组合模式是一种结构型设计模式，它允许将对象组合成树形结构来表示"部分-整体"的层次结构。组合模式使得客户端可以统一地处理单个对象和对象组合，无需关心处理的是单个对象还是组合对象。

组合模式的核心思想是将对象组织成树形结构，使得客户端可以统一地操作树中的节点，而无需区分节点是叶子节点还是组合节点。这种设计使得系统更加灵活，易于扩展。

## 核心要点

- **树形结构**：将对象组织成树形结构
- **统一接口**：为单个对象和组合对象提供统一的接口
- **递归组合**：组合对象可以包含其他组合对象或单个对象
- **客户端透明**：客户端无需区分单个对象和组合对象

## 应用场景

- **树形结构表示**：当需要表示对象的部分-整体层次结构时
- **统一操作**：当需要客户端统一处理单个对象和组合对象时
- **递归组合**：当对象可以递归地组合成更复杂的结构时
- **组件化系统**：当系统采用组件化设计，组件可以嵌套组合时

## 结构

组合模式包含以下角色：

1. **组件（Component）**：定义所有对象共有的接口，可以是抽象类或接口
2. **叶子节点（Leaf）**：实现Component接口，表示树形结构中的叶子节点，没有子节点
3. **组合节点（Composite）**：实现Component接口，表示树形结构中的组合节点，可以包含子节点
4. **客户端（Client）**：使用Component接口来操作对象

## 实现示例

### 1. 基本组合模式实现

```java
// 组件接口
public abstract class Component {
    protected String name;
    
    public Component(String name) {
        this.name = name;
    }
    
    // 添加子组件
    public abstract void add(Component component);
    
    // 移除子组件
    public abstract void remove(Component component);
    
    // 获取子组件
    public abstract Component getChild(int index);
    
    // 显示组件结构
    public abstract void display(int depth);
}

// 叶子节点
public class Leaf extends Component {
    public Leaf(String name) {
        super(name);
    }
    
    @Override
    public void add(Component component) {
        // 叶子节点不能添加子节点，抛出异常
        throw new UnsupportedOperationException("叶子节点不能添加子节点");
    }
    
    @Override
    public void remove(Component component) {
        // 叶子节点不能移除子节点，抛出异常
        throw new UnsupportedOperationException("叶子节点不能移除子节点");
    }
    
    @Override
    public Component getChild(int index) {
        // 叶子节点没有子节点，返回null
        return null;
    }
    
    @Override
    public void display(int depth) {
        // 显示叶子节点，前面添加depth个'-'
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            sb.append("-");
        }
        System.out.println(sb.toString() + name);
    }
}

// 组合节点
public class Composite extends Component {
    private List<Component> children = new ArrayList<>();
    
    public Composite(String name) {
        super(name);
    }
    
    @Override
    public void add(Component component) {
        children.add(component);
    }
    
    @Override
    public void remove(Component component) {
        children.remove(component);
    }
    
    @Override
    public Component getChild(int index) {
        if (index >= 0 && index < children.size()) {
            return children.get(index);
        }
        return null;
    }
    
    @Override
    public void display(int depth) {
        // 显示当前组合节点
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            sb.append("-");
        }
        System.out.println(sb.toString() + name);
        
        // 递归显示所有子节点
        for (Component child : children) {
            child.display(depth + 2);
        }
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 创建根节点
        Composite root = new Composite("根节点");
        
        // 创建一级子节点
        Composite branch1 = new Composite("一级分支1");
        Composite branch2 = new Composite("一级分支2");
        
        // 创建叶子节点
        Leaf leaf1 = new Leaf("叶子节点1");
        Leaf leaf2 = new Leaf("叶子节点2");
        Leaf leaf3 = new Leaf("叶子节点3");
        Leaf leaf4 = new Leaf("叶子节点4");
        
        // 构建树形结构
        root.add(branch1);
        root.add(branch2);
        root.add(leaf1);
        
        branch1.add(leaf2);
        branch1.add(leaf3);
        
        branch2.add(leaf4);
        
        // 显示树形结构
        System.out.println("树形结构:");
        root.display(1);
        
        // 移除节点
        System.out.println("\n移除一级分支1后:");
        root.remove(branch1);
        root.display(1);
    }
}
```

### 2. 安全式组合模式实现

上面的例子是透明式组合模式的实现，它在Component中定义了所有操作，包括添加和删除子节点。另一种实现方式是安全式组合模式，它只在Composite中定义添加和删除子节点的操作：

```java
// 安全式组件接口，不包含管理子节点的方法
public interface Component {
    void display(int depth);
}

// 安全式叶子节点
public class Leaf implements Component {
    private String name;
    
    public Leaf(String name) {
        this.name = name;
    }
    
    @Override
    public void display(int depth) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            sb.append("-");
        }
        System.out.println(sb.toString() + name);
    }
}

// 安全式组合节点，包含管理子节点的方法
public class Composite implements Component {
    private String name;
    private List<Component> children = new ArrayList<>();
    
    public Composite(String name) {
        this.name = name;
    }
    
    public void add(Component component) {
        children.add(component);
    }
    
    public void remove(Component component) {
        children.remove(component);
    }
    
    public Component getChild(int index) {
        if (index >= 0 && index < children.size()) {
            return children.get(index);
        }
        return null;
    }
    
    @Override
    public void display(int depth) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            sb.append("-");
        }
        System.out.println(sb.toString() + name);
        
        for (Component child : children) {
            child.display(depth + 2);
        }
    }
}

// 安全式客户端
public class Client {
    public static void main(String[] args) {
        // 创建根节点
        Composite root = new Composite("根节点");
        
        // 创建一级子节点
        Composite branch1 = new Composite("一级分支1");
        Composite branch2 = new Composite("一级分支2");
        
        // 创建叶子节点
        Leaf leaf1 = new Leaf("叶子节点1");
        Leaf leaf2 = new Leaf("叶子节点2");
        Leaf leaf3 = new Leaf("叶子节点3");
        Leaf leaf4 = new Leaf("叶子节点4");
        
        // 构建树形结构
        root.add(branch1);
        root.add(branch2);
        root.add(leaf1);
        
        branch1.add(leaf2);
        branch1.add(leaf3);
        
        branch2.add(leaf4);
        
        // 显示树形结构
        System.out.println("树形结构:");
        root.display(1);
    }
}
```

## 实际应用示例：公司组织结构系统

下面是一个实际应用的例子，展示如何使用组合模式实现公司组织结构系统：

```java
// 组件接口：公司成员
public abstract class CompanyMember {
    protected String name;
    protected String position;
    protected double salary;
    
    public CompanyMember(String name, String position, double salary) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
    
    // 添加成员
    public abstract void addMember(CompanyMember member);
    
    // 移除成员
    public abstract void removeMember(CompanyMember member);
    
    // 获取成员
    public abstract CompanyMember getMember(int index);
    
    // 显示成员信息
    public abstract void display(int depth);
    
    // 计算薪资
    public abstract double calculateSalary();
}

// 叶子节点：普通员工
public class Employee extends CompanyMember {
    public Employee(String name, String position, double salary) {
        super(name, position, salary);
    }
    
    @Override
    public void addMember(CompanyMember member) {
        throw new UnsupportedOperationException("普通员工不能添加成员");
    }
    
    @Override
    public void removeMember(CompanyMember member) {
        throw new UnsupportedOperationException("普通员工不能移除成员");
    }
    
    @Override
    public CompanyMember getMember(int index) {
        return null;
    }
    
    @Override
    public void display(int depth) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            sb.append("  ");
        }
        System.out.println(sb.toString() + "- " + name + " (" + position + "): ¥" + salary);
    }
    
    @Override
    public double calculateSalary() {
        return salary;
    }
}

// 组合节点：部门经理
public class Manager extends CompanyMember {
    private List<CompanyMember> members = new ArrayList<>();
    private double bonus; // 奖金
    
    public Manager(String name, String position, double salary, double bonus) {
        super(name, position, salary);
        this.bonus = bonus;
    }
    
    @Override
    public void addMember(CompanyMember member) {
        members.add(member);
    }
    
    @Override
    public void removeMember(CompanyMember member) {
        members.remove(member);
    }
    
    @Override
    public CompanyMember getMember(int index) {
        if (index >= 0 && index < members.size()) {
            return members.get(index);
        }
        return null;
    }
    
    @Override
    public void display(int depth) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            sb.append("  ");
        }
        System.out.println(sb.toString() + "+ " + name + " (" + position + "): ¥" + salary + " + 奖金: ¥" + bonus);
        
        // 递归显示所有下属
        for (CompanyMember member : members) {
            member.display(depth + 1);
        }
    }
    
    @Override
    public double calculateSalary() {
        double totalSalary = salary + bonus;
        // 计算所有下属的薪资
        for (CompanyMember member : members) {
            totalSalary += member.calculateSalary();
        }
        return totalSalary;
    }
}

// 客户端：公司组织结构系统
public class CompanyStructureSystem {
    public static void main(String[] args) {
        // 创建公司高层
        Manager ceo = new Manager("张三", "CEO", 100000, 50000);
        
        // 创建部门经理
        Manager rdManager = new Manager("李四", "研发部经理", 50000, 20000);
        Manager marketingManager = new Manager("王五", "市场部经理", 45000, 18000);
        Manager hrManager = new Manager("赵六", "人力资源部经理", 40000, 15000);
        
        // 创建普通员工
        Employee rd1 = new Employee("钱七", "高级开发工程师", 30000);
        Employee rd2 = new Employee("孙八", "开发工程师", 25000);
        Employee rd3 = new Employee("周九", "测试工程师", 20000);
        
        Employee marketing1 = new Employee("吴十", "市场专员", 18000);
        Employee marketing2 = new Employee("郑十一", "销售经理", 22000);
        
        Employee hr1 = new Employee("陈十二", "招聘专员", 15000);
        
        // 构建组织结构
        ceo.addMember(rdManager);
        ceo.addMember(marketingManager);
        ceo.addMember(hrManager);
        
        rdManager.addMember(rd1);
        rdManager.addMember(rd2);
        rdManager.addMember(rd3);
        
        marketingManager.addMember(marketing1);
        marketingManager.addMember(marketing2);
        
        hrManager.addMember(hr1);
        
        // 显示公司组织结构
        System.out.println("公司组织结构:");
        ceo.display(0);
        
        // 计算公司薪资总额
        double totalSalary = ceo.calculateSalary();
        System.out.println("\n公司薪资总额: ¥" + totalSalary);
        
        // 计算研发部薪资总额
        double rdSalary = rdManager.calculateSalary();
        System.out.println("研发部薪资总额: ¥" + rdSalary);
    }
}
```

## 优缺点

### 优点

- **统一接口**：为单个对象和组合对象提供统一的接口，使客户端可以统一处理
- **树形结构表示**：方便表示对象的部分-整体层次结构
- **递归组合**：支持递归组合，可以构建任意复杂的树形结构
- **易于扩展**：新增组件类型不需要修改现有代码，符合开闭原则

### 缺点

- **设计复杂**：使得设计变得更加抽象，增加了系统的理解难度
- **限制类型**：可能会限制容器中的组件类型，需要进行类型检查
- **性能问题**：对于非常大的树形结构，递归操作可能会导致性能问题

## 透明式与安全式组合模式比较

| 特性 | 透明式组合模式 | 安全式组合模式 |
|------|--------------|--------------|
| 接口统一性 | 所有组件都有相同的接口 | 组合节点有额外的管理子节点的方法 |
| 客户端使用 | 简单，无需区分叶子节点和组合节点 | 复杂，需要区分叶子节点和组合节点 |
| 安全性 | 不安全，叶子节点实现了不必要的方法 | 安全，只有组合节点实现管理子节点的方法 |
| 代码复杂度 | 较低，接口定义统一 | 较高，需要更多的类型转换和检查 |

## 总结

组合模式是一种强大的结构型设计模式，它允许将对象组合成树形结构来表示"部分-整体"的层次结构。组合模式使得客户端可以统一地处理单个对象和对象组合，无需关心处理的是单个对象还是组合对象。组合模式有两种实现方式：透明式和安全式。透明式组合模式在组件接口中定义了所有操作，包括添加和删除子节点；安全式组合模式只在组合节点中定义这些操作。在实际应用中，组合模式常用于文件系统、公司组织结构、UI组件树等需要表示层次结构的场景。