# 模板方法模式 (Template Method Pattern)

## 概述

模板方法模式是一种行为型设计模式，它定义了一个算法的骨架，将一些步骤的实现延迟到子类中。模板方法模式让子类可以在不改变算法结构的前提下，重新定义算法中的某些特定步骤。

模板方法模式的核心思想是提取公共行为到父类中，将变化的部分延迟到子类中实现。这种模式是基于继承的代码复用技术，它鼓励开发者使用"组合优于继承"之外的另一种代码组织方式。

## 核心要点

- **算法骨架**：在父类中定义算法的骨架和顺序
- **延迟实现**：将某些具体步骤延迟到子类中实现
- **钩子方法**：提供可选的钩子方法，允许子类决定是否重写
- **代码复用**：将公共代码放在父类中，实现代码复用
- **反向控制**：遵循"好莱坞原则"（不要调用我们，我们会调用你）

## 应用场景

- **算法框架固定**：当一个算法的步骤固定，但某些步骤的具体实现可能不同时
- **代码复用**：当多个类有相同的行为，但在某些特定步骤上有不同的实现时
- **扩展点设计**：当需要为子类提供扩展点，但不允许它们改变算法的整体结构时
- **生命周期方法**：当实现框架的生命周期方法，如初始化、执行、清理等步骤时
- **框架设计**：在框架开发中，定义标准流程，允许用户通过继承和重写扩展功能

## 结构

模板方法模式包含以下角色：

1. **抽象类（Abstract Class）**：定义算法的骨架，包含模板方法和抽象方法
2. **具体类（Concrete Class）**：实现抽象类中定义的抽象方法，完成算法中的特定步骤
3. **模板方法（Template Method）**：定义算法的骨架，调用抽象方法和钩子方法
4. **抽象方法（Abstract Method）**：由子类实现的方法，是算法中必须由子类提供具体实现的步骤
5. **钩子方法（Hook Method）**：在父类中提供默认实现或空实现，子类可以选择性地重写

## 实现示例

### 1. 基本模板方法模式实现

```java
// 抽象类
public abstract class AbstractClass {
    // 模板方法，定义算法的骨架
    public final void templateMethod() {
        // 步骤1：具体方法，由父类实现
        primitiveOperation1();
        
        // 步骤2：抽象方法，由子类实现
        primitiveOperation2();
        
        // 步骤3：钩子方法，子类可选择重写
        hookOperation();
        
        // 步骤4：具体方法，由父类实现
        concreteOperation();
    }
    
    // 具体方法，由父类实现
    private void primitiveOperation1() {
        System.out.println("抽象类实现的操作1");
    }
    
    // 抽象方法，由子类实现
    protected abstract void primitiveOperation2();
    
    // 钩子方法，子类可选择性重写
    protected void hookOperation() {
        // 默认空实现
    }
    
    // 具体方法，由父类实现
    private void concreteOperation() {
        System.out.println("抽象类实现的具体操作");
    }
}

// 具体类A
public class ConcreteClassA extends AbstractClass {
    @Override
    protected void primitiveOperation2() {
        System.out.println("具体类A实现的操作2");
    }
    
    @Override
    protected void hookOperation() {
        System.out.println("具体类A重写了钩子方法");
    }
}

// 具体类B
public class ConcreteClassB extends AbstractClass {
    @Override
    protected void primitiveOperation2() {
        System.out.println("具体类B实现的操作2");
    }
    
    // 不重写钩子方法，使用父类的默认实现
}

// 客户端
public class Client {
    public static void main(String[] args) {
        System.out.println("使用具体类A:");
        AbstractClass classA = new ConcreteClassA();
        classA.templateMethod();
        
        System.out.println("\n使用具体类B:");
        AbstractClass classB = new ConcreteClassB();
        classB.templateMethod();
    }
}
```

## 实际应用示例：数据库操作模板

下面是一个实际应用的例子，展示如何使用模板方法模式实现不同数据库的操作流程：

```java
// 数据库操作抽象类
public abstract class DatabaseOperation {
    // 模板方法，定义数据库操作的标准流程
    public final void execute() {
        // 1. 连接数据库
        connect();
        
        // 2. 开始事务
        beginTransaction();
        
        try {
            // 3. 执行具体操作（子类实现）
            performOperation();
            
            // 4. 提交事务
            commitTransaction();
        } catch (Exception e) {
            // 5. 发生异常时回滚事务
            rollbackTransaction();
            System.out.println("操作失败: " + e.getMessage());
        } finally {
            // 6. 关闭连接
            disconnect();
        }
    }
    
    // 具体方法：连接数据库
    protected void connect() {
        System.out.println("连接到数据库...");
    }
    
    // 具体方法：开始事务
    protected void beginTransaction() {
        System.out.println("开始事务...");
    }
    
    // 抽象方法：执行具体操作，由子类实现
    protected abstract void performOperation() throws Exception;
    
    // 具体方法：提交事务
    protected void commitTransaction() {
        System.out.println("提交事务...");
    }
    
    // 具体方法：回滚事务
    protected void rollbackTransaction() {
        System.out.println("回滚事务...");
    }
    
    // 具体方法：断开连接
    protected void disconnect() {
        System.out.println("断开数据库连接...");
    }
    
    // 钩子方法：记录日志，可以由子类重写
    protected void logOperation(String operation) {
        // 默认实现
        System.out.println("记录操作日志: " + operation);
    }
}

// MySQL数据库操作实现
public class MySQLOperation extends DatabaseOperation {
    private String sql;
    
    public MySQLOperation(String sql) {
        this.sql = sql;
    }
    
    @Override
    protected void performOperation() throws Exception {
        logOperation("MySQL执行SQL: " + sql);
        System.out.println("在MySQL中执行: " + sql);
        // 模拟SQL执行
        if (sql.contains("error")) {
            throw new Exception("MySQL执行出错");
        }
    }
    
    @Override
    protected void connect() {
        System.out.println("连接到MySQL数据库...");
    }
}

// PostgreSQL数据库操作实现
public class PostgreSQLOperation extends DatabaseOperation {
    private String sql;
    
    public PostgreSQLOperation(String sql) {
        this.sql = sql;
    }
    
    @Override
    protected void performOperation() throws Exception {
        logOperation("PostgreSQL执行SQL: " + sql);
        System.out.println("在PostgreSQL中执行: " + sql);
        // 模拟SQL执行
        if (sql.contains("error")) {
            throw new Exception("PostgreSQL执行出错");
        }
    }
    
    @Override
    protected void connect() {
        System.out.println("连接到PostgreSQL数据库...");
    }
    
    @Override
    protected void logOperation(String operation) {
        // 重写钩子方法，使用不同的日志记录方式
        System.out.println("[PostgreSQL日志] " + operation);
    }
}

// 客户端
public class DatabaseClient {
    public static void main(String[] args) {
        System.out.println("=== 执行MySQL查询操作 ===");
        DatabaseOperation mysqlQuery = new MySQLOperation("SELECT * FROM users");
        mysqlQuery.execute();
        
        System.out.println("\n=== 执行PostgreSQL更新操作 ===");
        DatabaseOperation postgresUpdate = new PostgreSQLOperation("UPDATE users SET status='active'");
        postgresUpdate.execute();
        
        System.out.println("\n=== 执行MySQL错误操作 ===");
        DatabaseOperation mysqlError = new MySQLOperation("SELECT * FROM non_existent_table error");
        mysqlError.execute();
    }
}
```

## 实际应用示例：饮料制备模板

下面是另一个实际应用的例子，展示如何使用模板方法模式实现不同饮料的制备流程：

```java
// 饮料制备抽象类
public abstract class BeveragePreparation {
    // 模板方法，定义饮料制备的标准流程
    public final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        
        // 使用钩子方法决定是否需要添加调料
        if (customerWantsCondiments()) {
            addCondiments();
        }
        
        // 钩子方法，子类可以选择性地实现自定义准备步骤
        customPreparation();
        
        System.out.println("饮料准备完成！");
    }
    
    // 具体方法：煮水
    private void boilWater() {
        System.out.println("将水煮沸...");
    }
    
    // 抽象方法：冲泡，由子类实现
    protected abstract void brew();
    
    // 具体方法：倒入杯子
    private void pourInCup() {
        System.out.println("将饮料倒入杯子...");
    }
    
    // 抽象方法：添加调料，由子类实现
    protected abstract void addCondiments();
    
    // 钩子方法：询问顾客是否需要调料
    protected boolean customerWantsCondiments() {
        // 默认返回true
        return true;
    }
    
    // 钩子方法：自定义准备步骤
    protected void customPreparation() {
        // 默认空实现
    }
}

// 咖啡制备实现
public class CoffeePreparation extends BeveragePreparation {
    @Override
    protected void brew() {
        System.out.println("用沸水冲泡咖啡粉...");
    }
    
    @Override
    protected void addCondiments() {
        System.out.println("添加糖和牛奶...");
    }
    
    @Override
    protected boolean customerWantsCondiments() {
        // 咖啡通常需要添加糖和牛奶
        return true;
    }
}

// 茶制备实现
public class TeaPreparation extends BeveragePreparation {
    @Override
    protected void brew() {
        System.out.println("用沸水浸泡茶包...");
    }
    
    @Override
    protected void addCondiments() {
        System.out.println("添加柠檬...");
    }
    
    @Override
    protected boolean customerWantsCondiments() {
        // 茶可能不需要添加柠檬
        return false; // 默认不添加柠檬
    }
    
    @Override
    protected void customPreparation() {
        System.out.println("让茶包在水中浸泡3分钟...");
    }
}

// 绿茶制备实现（带自定义钩子逻辑）
public class GreenTeaPreparation extends BeveragePreparation {
    private boolean addHoney;
    
    public GreenTeaPreparation(boolean addHoney) {
        this.addHoney = addHoney;
    }
    
    @Override
    protected void brew() {
        System.out.println("用70度的热水冲泡绿茶...");
    }
    
    @Override
    protected void addCondiments() {
        if (addHoney) {
            System.out.println("添加蜂蜜...");
        } else {
            System.out.println("添加薄荷...");
        }
    }
    
    @Override
    protected boolean customerWantsCondiments() {
        // 根据构造函数传入的参数决定是否添加调料
        return true; // 绿茶通常会添加一些调料
    }
    
    @Override
    protected void customPreparation() {
        System.out.println("轻摇茶杯，使茶叶充分释放香气...");
        System.out.println("等待2分钟，让绿茶充分冲泡...");
    }
}

// 客户端
public class BeverageClient {
    public static void main(String[] args) {
        System.out.println("=== 准备咖啡 ===");
        BeveragePreparation coffee = new CoffeePreparation();
        coffee.prepareRecipe();
        
        System.out.println("\n=== 准备茶 ===");
        BeveragePreparation tea = new TeaPreparation();
        tea.prepareRecipe();
        
        System.out.println("\n=== 准备加蜂蜜的绿茶 ===");
        BeveragePreparation honeyGreenTea = new GreenTeaPreparation(true);
        honeyGreenTea.prepareRecipe();
        
        System.out.println("\n=== 准备加薄荷的绿茶 ===");
        BeveragePreparation mintGreenTea = new GreenTeaPreparation(false);
        mintGreenTea.prepareRecipe();
    }
}
```

## 优缺点

### 优点

- **代码复用**：将公共代码放在父类中，减少代码重复
- **扩展性好**：子类可以通过重写方法来扩展功能，无需修改父类代码
- **符合开闭原则**：系统对扩展开放，对修改关闭
- **标准化流程**：确保算法的结构不变，只允许修改特定步骤
- **反向控制**：遵循"好莱坞原则"，父类控制子类的调用

### 缺点

- **增加类的数量**：每个不同的实现都需要一个子类，可能导致类爆炸
- **继承的限制**：使用继承关系，可能导致类层次结构复杂
- **子类依赖父类**：子类与父类紧密耦合，父类的修改可能影响所有子类
- **部分方法可能冗余**：子类可能需要实现不需要的抽象方法

## 与其他模式的关系

- **模板方法模式与策略模式**：模板方法模式使用继承来改变算法的特定步骤，而策略模式使用组合来替换整个算法
- **模板方法模式与工厂方法模式**：工厂方法是模板方法的一种特殊形式，用于创建对象
- **模板方法模式与建造者模式**：建造者模式关注对象的组装过程，而模板方法模式关注算法的骨架
- **模板方法模式与迭代器模式**：迭代器模式遍历集合的方式可以看作是一种模板方法

## 总结

模板方法模式是一种通过继承实现代码复用的有效方式，它定义了算法的骨架，将特定步骤的实现延迟到子类中。模板方法模式在框架设计、数据库操作、业务流程处理等场景中广泛应用。

使用模板方法模式时，需要注意以下几点：

1. 合理设计抽象类，识别出算法中的不变部分和变化部分
2. 使用钩子方法提供灵活性，允许子类决定是否重写某些可选步骤
3. 避免类层次结构过于复杂，导致维护困难
4. 遵循单一职责原则，确保每个类只负责一个功能

模板方法模式体现了"不变与变分离"的设计思想，通过将不变的算法骨架放在父类中，将变化的具体实现放在子类中，实现了代码的复用和系统的可扩展性。