# 原型模式 (Prototype Pattern)

## 概述

原型模式是一种创建型设计模式，它允许通过复制现有对象来创建新对象，而不是通过实例化新类。原型模式特别适用于创建复杂对象或初始化成本较高的对象。

原型模式的核心是通过复制现有对象来创建新对象，而无需知道这些对象所属的具体类。这种方式可以大大减少创建新对象所需的时间和资源，特别是当创建对象的过程比较复杂时。

## 核心要点

- **对象复制**：通过复制现有对象创建新对象
- **深拷贝与浅拷贝**：需要区分浅拷贝和深拷贝的实现
- **原型管理器**：可以维护一个原型注册表，用于存储和管理原型对象
- **动态创建**：可以在运行时动态创建和配置对象

## 应用场景

- **创建新对象的成本高**：当创建新对象需要消耗大量资源或时间时
- **需要创建大量相似对象**：当系统需要大量相似对象时，可以通过复制原型对象来创建
- **初始化参数复杂**：当初始化对象需要设置大量参数时
- **避免构造函数的限制**：当需要绕过构造函数的限制创建对象时

## 结构

原型模式包含以下角色：

1. **原型（Prototype）**：声明克隆自己的接口
2. **具体原型（Concrete Prototype）**：实现克隆自己的接口
3. **客户端（Client）**：使用原型对象创建新对象
4. **原型管理器（Prototype Manager）**：管理和存储原型对象的注册表（可选）

## 实现示例

### 1. 基本原型模式实现

```java
// 原型接口
public interface Prototype extends Cloneable {
    Prototype clone();
}

// 具体原型类
public class ConcretePrototype implements Prototype {
    private String name;
    private int value;
    private List<String> list;
    
    public ConcretePrototype(String name, int value) {
        this.name = name;
        this.value = value;
        this.list = new ArrayList<>();
    }
    
    // getter和setter方法
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getValue() {
        return value;
    }
    
    public void setValue(int value) {
        this.value = value;
    }
    
    public List<String> getList() {
        return list;
    }
    
    public void addItem(String item) {
        this.list.add(item);
    }
    
    // 浅拷贝实现
    @Override
    public Prototype clone() {
        try {
            return (Prototype) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    // 深拷贝实现
    public Prototype deepClone() {
        try {
            // 先进行浅拷贝
            ConcretePrototype clone = (ConcretePrototype) super.clone();
            // 对引用类型进行深拷贝
            clone.list = new ArrayList<>(this.list);
            return clone;
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @Override
    public String toString() {
        return "ConcretePrototype{" +
                "name='" + name + '\'' +
                ", value=" + value +
                ", list=" + list +
                '}';
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        // 创建原型对象
        ConcretePrototype prototype = new ConcretePrototype("原型对象", 100);
        prototype.addItem("Item 1");
        
        // 使用浅拷贝创建新对象
        ConcretePrototype clone1 = (ConcretePrototype) prototype.clone();
        clone1.setName("浅拷贝对象");
        clone1.setValue(200);
        clone1.addItem("Item 2"); // 注意：这里修改会影响原型对象的list，因为是浅拷贝
        
        // 使用深拷贝创建新对象
        ConcretePrototype clone2 = (ConcretePrototype) prototype.deepClone();
        clone2.setName("深拷贝对象");
        clone2.setValue(300);
        clone2.addItem("Item 3"); // 这里修改不会影响原型对象的list
        
        // 打印所有对象
        System.out.println("原型对象: " + prototype);
        System.out.println("浅拷贝对象: " + clone1);
        System.out.println("深拷贝对象: " + clone2);
    }
}
```

### 2. 使用原型管理器

```java
// 原型管理器
public class PrototypeManager {
    private Map<String, Prototype> prototypes = new HashMap<>();
    
    // 私有构造函数，实现单例
    private PrototypeManager() {
    }
    
    // 获取单例实例
    public static PrototypeManager getInstance() {
        return SingletonHolder.INSTANCE;
    }
    
    // 单例持有者
    private static class SingletonHolder {
        private static final PrototypeManager INSTANCE = new PrototypeManager();
    }
    
    // 注册原型
    public void registerPrototype(String key, Prototype prototype) {
        prototypes.put(key, prototype);
    }
    
    // 移除原型
    public void unregisterPrototype(String key) {
        prototypes.remove(key);
    }
    
    // 根据key获取克隆对象
    public Prototype clone(String key) {
        Prototype prototype = prototypes.get(key);
        if (prototype != null) {
            return prototype.clone();
        }
        return null;
    }
}

// 客户端使用原型管理器
public class Client {
    public static void main(String[] args) {
        // 获取原型管理器实例
        PrototypeManager manager = PrototypeManager.getInstance();
        
        // 注册原型对象
        ConcretePrototype prototype1 = new ConcretePrototype("产品A", 100);
        prototype1.addItem("特性1");
        manager.registerPrototype("productA", prototype1);
        
        ConcretePrototype prototype2 = new ConcretePrototype("产品B", 200);
        prototype2.addItem("特性2");
        manager.registerPrototype("productB", prototype2);
        
        // 克隆原型对象
        ConcretePrototype clone1 = (ConcretePrototype) manager.clone("productA");
        clone1.setName("产品A-克隆1");
        clone1.addItem("克隆特性1");
        
        ConcretePrototype clone2 = (ConcretePrototype) manager.clone("productB");
        clone2.setName("产品B-克隆1");
        clone2.addItem("克隆特性2");
        
        // 打印所有对象
        System.out.println("原型A: " + prototype1);
        System.out.println("克隆A: " + clone1);
        System.out.println("原型B: " + prototype2);
        System.out.println("克隆B: " + clone2);
    }
}
```

## 实际应用示例：文档模板系统

下面是一个实际应用的例子，展示如何使用原型模式实现文档模板系统：

```java
// 文档接口，继承Cloneable
public interface Document extends Cloneable {
    Document clone();
    void setTitle(String title);
    void setContent(String content);
    void display();
}

// 具体文档类
public class WordDocument implements Document {
    private String title;
    private String content;
    private List<String> images;
    
    public WordDocument() {
        this.title = "未命名文档";
        this.content = "";
        this.images = new ArrayList<>();
        System.out.println("创建新文档，初始化资源");
    }
    
    @Override
    public void setTitle(String title) {
        this.title = title;
    }
    
    @Override
    public void setContent(String content) {
        this.content = content;
    }
    
    public void addImage(String image) {
        this.images.add(image);
    }
    
    @Override
    public Document clone() {
        try {
            // 浅拷贝
            WordDocument clone = (WordDocument) super.clone();
            // 对引用类型进行深拷贝
            clone.images = new ArrayList<>(this.images);
            System.out.println("通过克隆创建文档副本");
            return clone;
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @Override
    public void display() {
        System.out.println("=== 文档信息 ===");
        System.out.println("标题: " + title);
        System.out.println("内容: " + content);
        System.out.println("图片: " + images);
    }
}

// 文档模板管理器
public class DocumentTemplateManager {
    private Map<String, Document> templates = new HashMap<>();
    
    // 注册模板
    public void registerTemplate(String name, Document template) {
        templates.put(name, template);
    }
    
    // 获取模板的克隆
    public Document createDocument(String templateName) {
        Document template = templates.get(templateName);
        if (template != null) {
            return template.clone();
        }
        return null;
    }
}

// 客户端使用
public class DocumentSystem {
    public static void main(String[] args) {
        // 创建模板管理器
        DocumentTemplateManager manager = new DocumentTemplateManager();
        
        // 创建并注册报告模板
        WordDocument reportTemplate = new WordDocument();
        reportTemplate.setTitle("报告模板");
        reportTemplate.setContent("这是一份标准报告模板");
        reportTemplate.addImage("公司Logo");
        manager.registerTemplate("report", reportTemplate);
        
        // 创建并注册合同模板
        WordDocument contractTemplate = new WordDocument();
        contractTemplate.setTitle("合同模板");
        contractTemplate.setContent("这是一份标准合同模板");
        contractTemplate.addImage("合同水印");
        manager.registerTemplate("contract", contractTemplate);
        
        // 使用模板创建文档
        System.out.println("\n创建报告文档:");
        Document report = manager.createDocument("report");
        report.setTitle("季度销售报告");
        report.setContent("2023年第四季度销售情况良好...");
        report.display();
        
        System.out.println("\n创建合同文档:");
        Document contract = manager.createDocument("contract");
        contract.setTitle("软件许可合同");
        contract.setContent("甲方授予乙方软件使用权...");
        contract.display();
        
        // 验证原型是否被正确克隆
        System.out.println("\n验证原型完整性:");
        reportTemplate.display();
        contractTemplate.display();
    }
}
```

## 深拷贝与浅拷贝

在原型模式中，复制对象时需要注意深拷贝和浅拷贝的区别：

1. **浅拷贝**：只复制对象的基本数据类型，对于引用类型，只复制引用，不复制引用指向的对象。
   - Java中的`Object.clone()`方法执行的是浅拷贝。
   - 优点：实现简单，效率高
   - 缺点：可能导致共享引用对象，修改一个对象会影响另一个对象

2. **深拷贝**：复制对象的基本数据类型和引用类型，引用类型会创建新的对象。
   - 需要手动实现，对所有引用类型进行递归拷贝。
   - 优点：保证对象的独立性，修改一个对象不会影响另一个对象
   - 缺点：实现复杂，效率较低

3. **深拷贝实现方式**：
   - 手动实现：对每个引用类型进行递归拷贝
   - 序列化实现：将对象序列化后再反序列化
   - 使用第三方库：如Apache Commons Lang的`SerializationUtils.clone()`

## 优缺点

### 优点

- **减少创建对象的成本**：通过复制现有对象创建新对象，避免了复杂的初始化过程
- **简化对象创建过程**：无需知道对象的具体类型，只需要知道原型对象
- **提高系统性能**：对于创建成本高的对象，使用原型模式可以显著提高性能
- **动态配置**：可以在运行时动态创建和配置对象

### 缺点

- **深拷贝实现复杂**：对于包含复杂引用关系的对象，实现深拷贝比较困难
- **需要修改现有类**：如果现有类没有实现Cloneable接口，需要修改类的定义
- **可能隐藏对象创建细节**：客户端可能不知道对象是如何创建的

## 总结

原型模式是一种灵活的创建型设计模式，它通过复制现有对象来创建新对象，特别适用于创建复杂对象或初始化成本较高的对象。原型模式可以与原型管理器结合使用，形成一个原型注册表，方便管理和创建各种原型对象。在实现原型模式时，需要注意深拷贝和浅拷贝的区别，根据实际需求选择合适的实现方式。原型模式在实际应用中广泛用于文档模板、配置管理、游戏开发等领域。