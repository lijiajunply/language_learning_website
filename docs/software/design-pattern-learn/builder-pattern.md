# 建造者模式 (Builder Pattern)

## 概述

建造者模式是一种创建型设计模式，它允许通过一系列步骤创建复杂对象，并且可以使用相同的创建代码生成不同类型和表示的对象。

建造者模式特别适用于创建那些包含多个组成部分的复杂对象，这些对象的创建需要多个步骤，而且这些步骤的顺序可能会影响最终对象的表示。建造者模式将对象的构建与表示分离，使同样的构建过程可以创建不同的表示。

## 核心要点

- **分步构建**：通过多个步骤构建复杂对象
- **构建与表示分离**：构建过程与最终对象的表示分离
- **控制构建过程**：可以精确控制对象的构建过程
- **参数校验**：可以在构建过程中进行参数校验
- **可变参数**：支持构建包含可选参数的复杂对象

## 应用场景

- **创建复杂对象**：当对象包含多个组成部分，且创建过程复杂时
- **对象表示多样化**：当需要使用相同的构建过程创建不同表示的对象时
- **参数验证**：当需要在创建对象前进行参数验证时
- **不可变对象创建**：当需要创建不可变对象，且对象包含多个可选参数时
- **流式API**：当需要提供流畅的API进行对象构建时

## 结构

建造者模式包含以下角色：

1. **产品（Product）**：最终构建的复杂对象
2. **建造者（Builder）**：定义创建产品各个部分的抽象接口
3. **具体建造者（Concrete Builder）**：实现Builder接口，负责具体产品的构建
4. **指挥者（Director）**：协调构建过程，按特定顺序调用Builder的方法（可选）

## 实现示例

### 1. 基本建造者模式实现

```java
// 产品类：汽车
public class Car {
    private String brand;
    private String model;
    private int year;
    private String color;
    private boolean hasGPS;
    private boolean hasLeatherSeats;
    
    // 私有构造函数，只允许Builder创建实例
    private Car(Builder builder) {
        this.brand = builder.brand;
        this.model = builder.model;
        this.year = builder.year;
        this.color = builder.color;
        this.hasGPS = builder.hasGPS;
        this.hasLeatherSeats = builder.hasLeatherSeats;
    }
    
    // Builder内部类
    public static class Builder {
        private String brand; // 必需参数
        private String model; // 必需参数
        private int year; // 必需参数
        private String color = "白色"; // 可选参数，有默认值
        private boolean hasGPS = false; // 可选参数，有默认值
        private boolean hasLeatherSeats = false; // 可选参数，有默认值
        
        // 必需参数构造函数
        public Builder(String brand, String model, int year) {
            this.brand = brand;
            this.model = model;
            this.year = year;
        }
        
        // 设置可选参数的方法，返回Builder本身，支持链式调用
        public Builder color(String color) {
            this.color = color;
            return this;
        }
        
        public Builder hasGPS(boolean hasGPS) {
            this.hasGPS = hasGPS;
            return this;
        }
        
        public Builder hasLeatherSeats(boolean hasLeatherSeats) {
            this.hasLeatherSeats = hasLeatherSeats;
            return this;
        }
        
        // 构建Car对象
        public Car build() {
            // 可以在这里进行参数验证
            validate();
            return new Car(this);
        }
        
        // 参数验证方法
        private void validate() {
            if (brand == null || brand.isEmpty()) {
                throw new IllegalArgumentException("品牌不能为空");
            }
            if (model == null || model.isEmpty()) {
                throw new IllegalArgumentException("型号不能为空");
            }
            if (year < 1900 || year > 2100) {
                throw new IllegalArgumentException("年份无效");
            }
        }
    }
    
    // getter方法
    public String getBrand() {
        return brand;
    }
    
    public String getModel() {
        return model;
    }
    
    public int getYear() {
        return year;
    }
    
    public String getColor() {
        return color;
    }
    
    public boolean isHasGPS() {
        return hasGPS;
    }
    
    public boolean isHasLeatherSeats() {
        return hasLeatherSeats;
    }
    
    @Override
    public String toString() {
        return "Car{" +
                "brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", year=" + year +
                ", color='" + color + '\'' +
                ", hasGPS=" + hasGPS +
                ", hasLeatherSeats=" + hasLeatherSeats +
                '}';
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        // 创建基础版汽车
        Car basicCar = new Car.Builder("丰田", "卡罗拉", 2023)
                .build();
        
        // 创建豪华版汽车
        Car luxuryCar = new Car.Builder("奔驰", "S级", 2023)
                .color("黑色")
                .hasGPS(true)
                .hasLeatherSeats(true)
                .build();
        
        // 打印汽车信息
        System.out.println("基础版汽车: " + basicCar);
        System.out.println("豪华版汽车: " + luxuryCar);
    }
}
```

### 2. 使用指挥者的建造者模式

```java
// 产品类：房子
public class House {
    private String foundation;
    private String structure;
    private String roof;
    private String interior;
    private String exterior;
    
    // 私有构造函数，只允许Builder创建实例
    private House(Builder builder) {
        this.foundation = builder.foundation;
        this.structure = builder.structure;
        this.roof = builder.roof;
        this.interior = builder.interior;
        this.exterior = builder.exterior;
    }
    
    // Builder内部类
    public static class Builder {
        private String foundation;
        private String structure;
        private String roof;
        private String interior;
        private String exterior;
        
        // 设置房子各部分的方法
        public Builder buildFoundation(String foundation) {
            this.foundation = foundation;
            return this;
        }
        
        public Builder buildStructure(String structure) {
            this.structure = structure;
            return this;
        }
        
        public Builder buildRoof(String roof) {
            this.roof = roof;
            return this;
        }
        
        public Builder buildInterior(String interior) {
            this.interior = interior;
            return this;
        }
        
        public Builder buildExterior(String exterior) {
            this.exterior = exterior;
            return this;
        }
        
        // 构建House对象
        public House build() {
            return new House(this);
        }
    }
    
    @Override
    public String toString() {
        return "House{" +
                "foundation='" + foundation + '\'' +
                ", structure='" + structure + '\'' +
                ", roof='" + roof + '\'' +
                ", interior='" + interior + '\'' +
                ", exterior='" + exterior + '\'' +
                '}';
    }
}

// 抽象Builder接口
public interface HouseBuilder {
    HouseBuilder buildFoundation(String foundation);
    HouseBuilder buildStructure(String structure);
    HouseBuilder buildRoof(String roof);
    HouseBuilder buildInterior(String interior);
    HouseBuilder buildExterior(String exterior);
    House build();
}

// 具体Builder实现
public class ConcreteHouseBuilder implements HouseBuilder {
    private House.Builder builder = new House.Builder();
    
    @Override
    public HouseBuilder buildFoundation(String foundation) {
        builder.buildFoundation(foundation);
        return this;
    }
    
    @Override
    public HouseBuilder buildStructure(String structure) {
        builder.buildStructure(structure);
        return this;
    }
    
    @Override
    public HouseBuilder buildRoof(String roof) {
        builder.buildRoof(roof);
        return this;
    }
    
    @Override
    public HouseBuilder buildInterior(String interior) {
        builder.buildInterior(interior);
        return this;
    }
    
    @Override
    public HouseBuilder buildExterior(String exterior) {
        builder.buildExterior(exterior);
        return this;
    }
    
    @Override
    public House build() {
        return builder.build();
    }
}

// 指挥者类，控制建造过程
public class HouseDirector {
    private HouseBuilder builder;
    
    public HouseDirector(HouseBuilder builder) {
        this.builder = builder;
    }
    
    // 构建标准房子
    public House buildStandardHouse() {
        return builder
                .buildFoundation("混凝土基础")
                .buildStructure("木质框架")
                .buildRoof("瓦片屋顶")
                .buildInterior("普通装修")
                .buildExterior("普通外墙")
                .build();
    }
    
    // 构建豪华房子
    public House buildLuxuryHouse() {
        return builder
                .buildFoundation("加固混凝土基础")
                .buildStructure("钢筋混凝土框架")
                .buildRoof("金属屋顶")
                .buildInterior("豪华装修")
                .buildExterior("高级外墙")
                .build();
    }
    
    // 构建经济型房子
    public House buildEconomyHouse() {
        return builder
                .buildFoundation("简单基础")
                .buildStructure("简易框架")
                .buildRoof("简易屋顶")
                .buildInterior("简易装修")
                .buildExterior("简易外墙")
                .build();
    }
}

// 客户端使用
public class Client {
    public static void main(String[] args) {
        // 创建Builder
        HouseBuilder builder = new ConcreteHouseBuilder();
        
        // 创建Director
        HouseDirector director = new HouseDirector(builder);
        
        // 构建不同类型的房子
        House standardHouse = director.buildStandardHouse();
        House luxuryHouse = director.buildLuxuryHouse();
        House economyHouse = director.buildEconomyHouse();
        
        // 打印房子信息
        System.out.println("标准房子: " + standardHouse);
        System.out.println("豪华房子: " + luxuryHouse);
        System.out.println("经济型房子: " + economyHouse);
    }
}
```

## 实际应用示例：电脑配置系统

下面是一个实际应用的例子，展示如何使用建造者模式实现电脑配置系统：

```java
// 产品类：电脑
public class Computer {
    private String cpu;
    private String gpu;
    private int ram;
    private int storage;
    private String motherboard;
    private String powerSupply;
    private String coolingSystem;
    private String caseType;
    
    // 私有构造函数
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.gpu = builder.gpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.motherboard = builder.motherboard;
        this.powerSupply = builder.powerSupply;
        this.coolingSystem = builder.coolingSystem;
        this.caseType = builder.caseType;
    }
    
    // Builder内部类
    public static class Builder {
        private String cpu; // 必需参数
        private String gpu; // 必需参数
        private int ram; // 必需参数
        private int storage; // 必需参数
        private String motherboard; // 必需参数
        private String powerSupply = "500W标准电源"; // 可选参数
        private String coolingSystem = "标准散热"; // 可选参数
        private String caseType = "中塔机箱"; // 可选参数
        
        // 必需参数构造函数
        public Builder(String cpu, String gpu, int ram, int storage, String motherboard) {
            this.cpu = cpu;
            this.gpu = gpu;
            this.ram = ram;
            this.storage = storage;
            this.motherboard = motherboard;
        }
        
        // 设置可选参数的方法
        public Builder powerSupply(String powerSupply) {
            this.powerSupply = powerSupply;
            return this;
        }
        
        public Builder coolingSystem(String coolingSystem) {
            this.coolingSystem = coolingSystem;
            return this;
        }
        
        public Builder caseType(String caseType) {
            this.caseType = caseType;
            return this;
        }
        
        // 构建Computer对象
        public Computer build() {
            // 验证配置的兼容性
            validateCompatibility();
            return new Computer(this);
        }
        
        // 验证硬件兼容性
        private void validateCompatibility() {
            // 验证CPU和主板兼容性
            if (cpu.contains("Intel") && !motherboard.contains("Intel")) {
                throw new IllegalArgumentException("Intel CPU需要搭配Intel主板");
            }
            if (cpu.contains("AMD") && !motherboard.contains("AMD")) {
                throw new IllegalArgumentException("AMD CPU需要搭配AMD主板");
            }
            
            // 验证RAM大小
            if (ram < 4 || ram > 128) {
                throw new IllegalArgumentException("RAM大小必须在4GB到128GB之间");
            }
            
            // 验证存储空间
            if (storage < 128 || storage > 16000) {
                throw new IllegalArgumentException("存储空间必须在128GB到16TB之间");
            }
        }
    }
    
    @Override
    public String toString() {
        return "Computer{" +
                "cpu='" + cpu + '\'' +
                ", gpu='" + gpu + '\'' +
                ", ram=" + ram + "GB" +
                ", storage=" + storage + "GB" +
                ", motherboard='" + motherboard + '\'' +
                ", powerSupply='" + powerSupply + '\'' +
                ", coolingSystem='" + coolingSystem + '\'' +
                ", caseType='" + caseType + '\'' +
                '}';
    }
}

// 电脑配置预设类（相当于指挥者）
public class ComputerPresets {
    // 创建游戏电脑
    public static Computer createGamingComputer() {
        return new Computer.Builder(
                "Intel Core i7-12700K",
                "NVIDIA RTX 3080",
                16,
                1000,
                "ASUS ROG Strix Z690-E"
        )
        .powerSupply("850W金牌认证电源")
        .coolingSystem("水冷散热")
        .caseType("全塔游戏机箱")
        .build();
    }
    
    // 创建办公电脑
    public static Computer createOfficeComputer() {
        return new Computer.Builder(
                "Intel Core i5-12400",
                "集成显卡",
                8,
                512,
                "MSI PRO B660M-A"
        )
        .build();
    }
    
    // 创建工作站电脑
    public static Computer createWorkstationComputer() {
        return new Computer.Builder(
                "AMD Ryzen 9 5950X",
                "NVIDIA RTX A5000",
                64,
                2000,
                "ASUS Pro WS X570-ACE"
        )
        .powerSupply("1000W白金认证电源")
        .coolingSystem("专业水冷散热")
        .caseType("工作站机箱")
        .build();
    }
}

// 客户端使用
public class ComputerSystem {
    public static void main(String[] args) {
        // 使用预设配置创建电脑
        Computer gamingPC = ComputerPresets.createGamingComputer();
        Computer officePC = ComputerPresets.createOfficeComputer();
        Computer workstationPC = ComputerPresets.createWorkstationComputer();
        
        System.out.println("游戏电脑配置:");
        System.out.println(gamingPC);
        System.out.println("\n办公电脑配置:");
        System.out.println(officePC);
        System.out.println("\n工作站配置:");
        System.out.println(workstationPC);
        
        // 自定义配置电脑
        System.out.println("\n自定义配置电脑:");
        Computer customPC = new Computer.Builder(
                "AMD Ryzen 7 5800X",
                "AMD RX 6800 XT",
                32,
                2000,
                "MSI MPG X570 Gaming Edge WiFi"
        )
        .powerSupply("750W金牌认证电源")
        .coolingSystem("高性能风冷散热")
        .caseType("中塔RGB机箱")
        .build();
        System.out.println(customPC);
    }
}
```

## 优缺点

### 优点

- **分步构建复杂对象**：通过多个步骤构建复杂对象，使构建过程更加清晰
- **构建与表示分离**：构建过程与最终对象的表示分离，使同样的构建过程可以创建不同的表示
- **参数验证**：可以在构建过程中进行参数验证，确保对象的有效性
- **流式API**：支持链式调用，提供流畅的API进行对象构建
- **不可变对象支持**：适合创建不可变对象，避免对象状态在构建后被修改

### 缺点

- **增加代码复杂度**：需要创建Builder类，增加了代码量
- **学习成本**：对于简单对象，使用建造者模式可能显得过于复杂
- **违反单一职责原则**：Builder类可能承担了构建和验证两个职责

## 与工厂模式的区别

建造者模式与工厂模式的主要区别在于：

1. **构建过程**：建造者模式关注对象的构建过程，工厂模式关注对象的创建
2. **复杂程度**：建造者模式适合创建复杂对象，工厂模式适合创建简单对象
3. **参数数量**：建造者模式适合参数较多的对象，工厂模式适合参数较少的对象
4. **表示多样性**：建造者模式可以创建不同表示的对象，工厂模式通常创建固定表示的对象
5. **构建顺序**：建造者模式可以控制构建顺序，工厂模式通常不关心构建顺序

## 总结

建造者模式是一种强大的创建型设计模式，它通过一系列步骤构建复杂对象，特别适用于创建那些包含多个组成部分的复杂对象。建造者模式将对象的构建与表示分离，使同样的构建过程可以创建不同的表示。在实际应用中，建造者模式广泛用于创建配置复杂的对象，如电脑配置、汽车配置、文档模板等。建造者模式还可以与其他设计模式结合使用，如单例模式、工厂模式等，形成更强大的设计方案。