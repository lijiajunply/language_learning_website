# 享元模式 (Flyweight Pattern)

## 概述

享元模式是一种结构型设计模式，它通过共享对象来减少内存使用和提高性能。享元模式将对象的内部状态分为内部状态（intrinsic）和外部状态（extrinsic），内部状态是可以共享的，外部状态是不可共享的。

享元模式的核心思想是复用现有的对象，而不是创建新的对象，特别是当系统中存在大量相似对象时。通过共享相同或相似的对象，可以显著减少内存使用和提高系统性能。

## 核心要点

- **对象共享**：通过共享相同或相似的对象来减少内存使用
- **状态分离**：将对象的状态分为内部状态（可共享）和外部状态（不可共享）
- **享元工厂**：负责创建和管理享元对象
- **内部状态**：存储在享元对象内部，不会随环境变化而变化，可以共享
- **外部状态**：取决于对象的使用环境，不能共享，通常由客户端保存

## 应用场景

- **大量相似对象**：当系统中存在大量相似对象，占用大量内存时
- **对象大部分状态可共享**：当对象的大部分状态可以共享，只有少数状态需要外部传入时
- **性能优化**：当系统因为创建大量对象而导致性能下降时
- **内存优化**：当系统因为内存占用过高而需要优化时

## 结构

享元模式包含以下角色：

1. **享元接口（Flyweight）**：定义享元对象的接口，声明可以接受外部状态的方法
2. **具体享元（Concrete Flyweight）**：实现享元接口，存储内部状态
3. **非共享具体享元（Unshared Concrete Flyweight）**：实现享元接口，但不共享
4. **享元工厂（Flyweight Factory）**：负责创建和管理享元对象
5. **客户端（Client）**：使用享元对象，维护享元对象的外部状态

## 实现示例

### 1. 基本享元模式实现

```java
// 享元接口
public interface Flyweight {
    void operation(String extrinsicState); // 接受外部状态
}

// 具体享元类
public class ConcreteFlyweight implements Flyweight {
    private String intrinsicState; // 内部状态，可共享
    
    public ConcreteFlyweight(String intrinsicState) {
        this.intrinsicState = intrinsicState;
        System.out.println("创建具体享元对象，内部状态: " + intrinsicState);
    }
    
    @Override
    public void operation(String extrinsicState) {
        System.out.println("使用享元对象 - 内部状态: " + intrinsicState + ", 外部状态: " + extrinsicState);
    }
}

// 非共享具体享元类
public class UnsharedConcreteFlyweight implements Flyweight {
    private String allState; // 包含所有状态，不可共享
    
    public UnsharedConcreteFlyweight(String allState) {
        this.allState = allState;
        System.out.println("创建非共享具体享元对象，状态: " + allState);
    }
    
    @Override
    public void operation(String extrinsicState) {
        System.out.println("使用非共享享元对象 - 状态: " + allState + ", 外部状态: " + extrinsicState);
    }
}

// 享元工厂类
public class FlyweightFactory {
    private Map<String, Flyweight> flyweights = new HashMap<>(); // 存储享元对象
    
    // 获取享元对象
    public Flyweight getFlyweight(String key) {
        // 如果享元对象已存在，则直接返回
        if (flyweights.containsKey(key)) {
            System.out.println("复用享元对象: " + key);
            return flyweights.get(key);
        }
        
        // 如果享元对象不存在，则创建一个新的享元对象
        Flyweight flyweight = new ConcreteFlyweight(key);
        flyweights.put(key, flyweight);
        return flyweight;
    }
    
    // 获取享元对象数量
    public int getFlyweightCount() {
        return flyweights.size();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        // 创建享元工厂
        FlyweightFactory factory = new FlyweightFactory();
        
        // 获取享元对象
        Flyweight flyweight1 = factory.getFlyweight("A");
        Flyweight flyweight2 = factory.getFlyweight("B");
        Flyweight flyweight3 = factory.getFlyweight("A"); // 复用已创建的A
        Flyweight flyweight4 = factory.getFlyweight("C");
        
        // 使用享元对象，传入外部状态
        flyweight1.operation("外部状态1");
        flyweight2.operation("外部状态2");
        flyweight3.operation("外部状态3"); // 与flyweight1是同一个对象
        flyweight4.operation("外部状态4");
        
        // 验证flyweight1和flyweight3是否为同一个对象
        System.out.println("\nflyweight1 和 flyweight3 是否为同一个对象: " + (flyweight1 == flyweight3));
        
        // 获取享元对象数量
        System.out.println("享元对象数量: " + factory.getFlyweightCount());
        
        // 创建非共享具体享元对象
        UnsharedConcreteFlyweight unsharedFlyweight = new UnsharedConcreteFlyweight("非共享状态");
        unsharedFlyweight.operation("外部状态5");
    }
}
```

## 实际应用示例：文本编辑器字符渲染

下面是一个实际应用的例子，展示如何使用享元模式实现文本编辑器的字符渲染：

```java
// 字符享元接口
public interface CharacterFlyweight {
    void display(int fontSize, String color); // 显示字符，接受字体大小和颜色（外部状态）
}

// 具体字符享元类
public class ConcreteCharacterFlyweight implements CharacterFlyweight {
    private char character; // 字符（内部状态，可共享）
    
    public ConcreteCharacterFlyweight(char character) {
        this.character = character;
        System.out.println("创建字符享元: '" + character + "'");
    }
    
    @Override
    public void display(int fontSize, String color) {
        System.out.println("显示字符 '" + character + "' - 字体大小: " + fontSize + ", 颜色: " + color);
    }
}

// 字符享元工厂类
public class CharacterFlyweightFactory {
    private Map<Character, CharacterFlyweight> flyweights = new HashMap<>(); // 存储字符享元
    
    // 获取字符享元
    public CharacterFlyweight getCharacter(char c) {
        // 如果字符享元已存在，则直接返回
        if (flyweights.containsKey(c)) {
            return flyweights.get(c);
        }
        
        // 如果字符享元不存在，则创建一个新的字符享元
        CharacterFlyweight flyweight = new ConcreteCharacterFlyweight(c);
        flyweights.put(c, flyweight);
        return flyweight;
    }
    
    // 获取享元对象数量
    public int getFlyweightCount() {
        return flyweights.size();
    }
}

// 文本编辑器类
public class TextEditor {
    private CharacterFlyweightFactory factory; // 字符享元工厂
    private List<CharacterFormat> characters = new ArrayList<>(); // 存储带有格式的字符
    
    public TextEditor() {
        this.factory = new CharacterFlyweightFactory();
    }
    
    // 添加字符
    public void addCharacter(char c, int fontSize, String color) {
        // 获取字符享元
        CharacterFlyweight flyweight = factory.getCharacter(c);
        // 存储字符格式信息（外部状态）
        characters.add(new CharacterFormat(flyweight, fontSize, color));
    }
    
    // 显示文本
    public void displayText() {
        System.out.println("\n显示文本:");
        for (CharacterFormat format : characters) {
            format.display();
        }
        
        System.out.println("\n不同字符数量: " + factory.getFlyweightCount());
        System.out.println("总字符数量: " + characters.size());
    }
    
    // 字符格式类，存储外部状态
    private class CharacterFormat {
        private CharacterFlyweight flyweight;
        private int fontSize; // 字体大小（外部状态）
        private String color; // 颜色（外部状态）
        
        public CharacterFormat(CharacterFlyweight flyweight, int fontSize, String color) {
            this.flyweight = flyweight;
            this.fontSize = fontSize;
            this.color = color;
        }
        
        public void display() {
            flyweight.display(fontSize, color);
        }
    }
}

// 客户端：文本编辑器用户
public class TextEditorClient {
    public static void main(String[] args) {
        // 创建文本编辑器
        TextEditor editor = new TextEditor();
        
        // 编辑文本 "HELLO WORLD"
        String text = "HELLO WORLD";
        int[] fontSizes = {12, 14, 16, 18, 20, 12, 14, 16, 18, 20, 22};
        String[] colors = {"black", "red", "blue", "green", "purple", "black", "red", "blue", "green", "purple", "orange"};
        
        System.out.println("编辑文本: " + text);
        
        // 添加字符并设置格式
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            editor.addCharacter(c, fontSizes[i % fontSizes.length], colors[i % colors.length]);
        }
        
        // 再次添加相同的文本，但格式不同
        System.out.println("\n再次添加相同的文本，但格式不同...");
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            editor.addCharacter(c, 24 - fontSizes[i % fontSizes.length], colors[(i + 2) % colors.length]);
        }
        
        // 显示文本
        editor.displayText();
        
        // 说明：虽然总共有22个字符，但由于共享，实际只创建了10个不同的字符享元对象
        // (H, E, L, L, O, 空格, W, O, R, L, D) 中 L 和 O 重复
    }
}
```

## 优缺点

### 优点

- **减少内存使用**：通过共享相同或相似的对象，显著减少内存使用
- **提高性能**：减少对象创建和销毁的开销，提高系统性能
- **适合处理大量相似对象**：特别适合处理大量相似对象的场景
- **内部状态和外部状态分离**：内部状态可共享，外部状态由客户端管理，灵活性高

### 缺点

- **增加系统复杂度**：需要将对象的状态分为内部状态和外部状态
- **需要管理享元对象**：需要一个享元工厂来创建和管理享元对象
- **可能导致线程安全问题**：如果内部状态可变，可能会导致线程安全问题
- **外部状态管理**：客户端需要管理外部状态，增加了客户端的复杂性

## 享元模式的优化

1. **懒加载**：享元对象在第一次使用时才创建，而不是提前创建
2. **弱引用**：使用弱引用来存储享元对象，当没有其他引用时可以被垃圾回收器回收
3. **工厂池大小限制**：限制享元工厂中对象的数量，避免内存溢出
4. **线程安全考虑**：如果在多线程环境中使用，需要确保享元工厂的线程安全

## 总结

享元模式是一种用于优化内存使用和提高性能的结构型设计模式，它通过共享相同或相似的对象来减少内存使用。享元模式将对象的状态分为内部状态（可共享）和外部状态（不可共享），内部状态存储在享元对象中，外部状态由客户端维护。享元模式特别适合处理大量相似对象的场景，如文本编辑器的字符渲染、图形界面中的控件等。使用享元模式需要注意内部状态的不可变性，以避免线程安全问题。