# 访问者模式 (Visitor Pattern)

## 概述

访问者模式是一种行为型设计模式，它允许你在不修改已有类层次结构的情况下，定义作用于这些类的新操作。这种模式通过将数据结构与数据操作分离，使得操作可以独立变化，同时增加新的操作变得更加容易。

访问者模式的核心思想是将对对象结构中元素的操作封装到一个独立的访问者对象中，而不是将操作分散到各个元素类中。这样，当需要添加新的操作时，只需要创建一个新的访问者类，而不需要修改现有的元素类。

## 核心要点

- **双分派机制**：访问者模式利用双分派机制，根据元素类型和访问者类型决定调用哪个具体方法
- **数据与操作分离**：将数据结构与操作分离，使得操作可以独立变化
- **开闭原则**：添加新操作不需要修改已有元素类，符合开闭原则
- **单一职责**：每个访问者类负责一种操作，符合单一职责原则
- **对象结构稳定**：当对象结构相对稳定，但需要频繁添加新操作时尤为适用

## 应用场景

- **对象结构复杂**：当对象结构包含多种不同类型的元素，且需要对这些元素执行不同的操作
- **操作频繁变化**：当需要在不修改对象结构的情况下，频繁添加新的操作
- **跨类层次操作**：当需要对一个类层次结构中的对象执行操作，而这些操作与对象本身的类关系不大
- **编译器设计**：在编译器设计中用于语法树遍历和代码生成
- **文档解析器**：用于遍历和处理文档结构（如XML、HTML等）
- **报表生成器**：用于从复杂对象结构中生成不同类型的报表

## 结构

访问者模式包含以下角色：

1. **访问者（Visitor）**：定义一个访问每个元素类型的方法，每个方法对应一个具体元素类
2. **具体访问者（Concrete Visitor）**：实现访问者接口，定义对每个元素类型的具体操作
3. **元素（Element）**：定义一个接受访问者的方法，是访问者模式的入口点
4. **具体元素（Concrete Element）**：实现元素接口，接受访问者对象的访问
5. **对象结构（Object Structure）**：存储和管理元素集合，提供遍历元素的方法

## 实现示例

### 1. 基本访问者模式实现

```java
// 访问者接口
public interface Visitor {
    // 访问具体元素A
    void visit(ConcreteElementA element);
    // 访问具体元素B
    void visit(ConcreteElementB element);
}

// 具体访问者A
public class ConcreteVisitorA implements Visitor {
    @Override
    public void visit(ConcreteElementA element) {
        System.out.println("ConcreteVisitorA 访问 ConcreteElementA: " + element.getOperationA());
    }
    
    @Override
    public void visit(ConcreteElementB element) {
        System.out.println("ConcreteVisitorA 访问 ConcreteElementB: " + element.getOperationB());
    }
}

// 具体访问者B
public class ConcreteVisitorB implements Visitor {
    @Override
    public void visit(ConcreteElementA element) {
        System.out.println("ConcreteVisitorB 访问 ConcreteElementA: " + element.getOperationA() + 
                          "，执行特定操作B");
    }
    
    @Override
    public void visit(ConcreteElementB element) {
        System.out.println("ConcreteVisitorB 访问 ConcreteElementB: " + element.getOperationB() + 
                          "，执行特定操作B");
    }
}

// 元素接口
public interface Element {
    // 接受访问者的访问
    void accept(Visitor visitor);
}

// 具体元素A
public class ConcreteElementA implements Element {
    private String operationA;
    
    public ConcreteElementA(String operationA) {
        this.operationA = operationA;
    }
    
    @Override
    public void accept(Visitor visitor) {
        // 调用访问者的visit方法，并传入自己作为参数
        visitor.visit(this);
    }
    
    public String getOperationA() {
        return operationA;
    }
    
    // 元素A特有的操作
    public void specificOperationA() {
        System.out.println("执行 ConcreteElementA 特有的操作");
    }
}

// 具体元素B
public class ConcreteElementB implements Element {
    private String operationB;
    
    public ConcreteElementB(String operationB) {
        this.operationB = operationB;
    }
    
    @Override
    public void accept(Visitor visitor) {
        // 调用访问者的visit方法，并传入自己作为参数
        visitor.visit(this);
    }
    
    public String getOperationB() {
        return operationB;
    }
    
    // 元素B特有的操作
    public void specificOperationB() {
        System.out.println("执行 ConcreteElementB 特有的操作");
    }
}

// 对象结构
public class ObjectStructure {
    private List<Element> elements = new ArrayList<>();
    
    // 添加元素
    public void addElement(Element element) {
        elements.add(element);
    }
    
    // 移除元素
    public void removeElement(Element element) {
        elements.remove(element);
    }
    
    // 接受访问者的访问
    public void accept(Visitor visitor) {
        for (Element element : elements) {
            element.accept(visitor);
        }
    }
    
    // 获取元素数量
    public int getElementCount() {
        return elements.size();
    }
    
    // 获取所有元素
    public List<Element> getElements() {
        return new ArrayList<>(elements);
    }
}

// 客户端
public class VisitorPatternDemo {
    public static void main(String[] args) {
        System.out.println("===== 访问者模式演示 =====\n");
        
        // 创建对象结构
        ObjectStructure objectStructure = new ObjectStructure();
        
        // 添加元素
        ConcreteElementA elementA1 = new ConcreteElementA("A-001");
        ConcreteElementA elementA2 = new ConcreteElementA("A-002");
        ConcreteElementB elementB1 = new ConcreteElementB("B-001");
        ConcreteElementB elementB2 = new ConcreteElementB("B-002");
        
        objectStructure.addElement(elementA1);
        objectStructure.addElement(elementA2);
        objectStructure.addElement(elementB1);
        objectStructure.addElement(elementB2);
        
        System.out.println("创建对象结构，包含 " + objectStructure.getElementCount() + " 个元素");
        
        // 创建访问者A并访问所有元素
        System.out.println("\n----- 使用访问者A访问所有元素 -----");
        ConcreteVisitorA visitorA = new ConcreteVisitorA();
        objectStructure.accept(visitorA);
        
        // 创建访问者B并访问所有元素
        System.out.println("\n----- 使用访问者B访问所有元素 -----");
        ConcreteVisitorB visitorB = new ConcreteVisitorB();
        objectStructure.accept(visitorB);
        
        // 单独访问某个元素
        System.out.println("\n----- 单独访问元素A1 -----");
        elementA1.accept(visitorA);
        elementA1.specificOperationA();
        
        // 移除一个元素后再次访问
        System.out.println("\n----- 移除元素B2后再次访问 -----");
        objectStructure.removeElement(elementB2);
        System.out.println("移除后，对象结构包含 " + objectStructure.getElementCount() + " 个元素");
        objectStructure.accept(visitorA);
        
        System.out.println("\n===== 演示结束 =====");
    }
}
```

### 2. 扩展访问者模式

下面是一个更复杂的访问者模式实现，展示如何支持元素层次结构和累加状态：

```java
import java.util.*;

// 抽象访问者接口
public interface Visitor {
    // 访问叶子节点A
    void visit(LeafNodeA node);
    // 访问叶子节点B
    void visit(LeafNodeB node);
    // 访问组合节点
    void visit(CompositeNode node);
    // 获取访问结果（可选）
    Object getResult();
}

// 具体访问者：打印访问者
public class PrintVisitor implements Visitor {
    private StringBuilder result = new StringBuilder();
    private int indentLevel = 0;
    
    @Override
    public void visit(LeafNodeA node) {
        String indent = " ".repeat(indentLevel * 2);
        result.append(indent).append("LeafNodeA: " + node.getName() + ", Value: " + node.getValue()).append("\n");
        System.out.println(indent + "访问 LeafNodeA: " + node.getName());
    }
    
    @Override
    public void visit(LeafNodeB node) {
        String indent = " ".repeat(indentLevel * 2);
        result.append(indent).append("LeafNodeB: " + node.getName() + ", Count: " + node.getCount()).append("\n");
        System.out.println(indent + "访问 LeafNodeB: " + node.getName());
    }
    
    @Override
    public void visit(CompositeNode node) {
        String indent = " ".repeat(indentLevel * 2);
        result.append(indent).append("CompositeNode: " + node.getName() + " {\n");
        System.out.println(indent + "访问 CompositeNode: " + node.getName() + " {\n");
        
        // 增加缩进级别
        indentLevel++;
        
        // 访问所有子节点
        for (Node child : node.getChildren()) {
            child.accept(this);
        }
        
        // 减少缩进级别
        indentLevel--;
        
        result.append(indent).append("}").append("\n");
        System.out.println(indent + "}");
    }
    
    @Override
    public Object getResult() {
        return result.toString();
    }
}

// 具体访问者：计算访问者
public class CalculateVisitor implements Visitor {
    private int totalValue = 0;
    private int totalCount = 0;
    private int nodeCount = 0;
    
    @Override
    public void visit(LeafNodeA node) {
        totalValue += node.getValue();
        nodeCount++;
        System.out.println("计算 LeafNodeA: " + node.getName() + ", Value: " + node.getValue());
    }
    
    @Override
    public void visit(LeafNodeB node) {
        totalCount += node.getCount();
        nodeCount++;
        System.out.println("计算 LeafNodeB: " + node.getName() + ", Count: " + node.getCount());
    }
    
    @Override
    public void visit(CompositeNode node) {
        nodeCount++;
        System.out.println("计算 CompositeNode: " + node.getName());
        
        // 访问所有子节点
        for (Node child : node.getChildren()) {
            child.accept(this);
        }
    }
    
    @Override
    public Object getResult() {
        Map<String, Integer> result = new HashMap<>();
        result.put("totalValue", totalValue);
        result.put("totalCount", totalCount);
        result.put("nodeCount", nodeCount);
        return result;
    }
}

// 具体访问者：搜索访问者
public class SearchVisitor implements Visitor {
    private String targetName;
    private List<Node> foundNodes = new ArrayList<>();
    
    public SearchVisitor(String targetName) {
        this.targetName = targetName;
    }
    
    @Override
    public void visit(LeafNodeA node) {
        System.out.println("搜索 LeafNodeA: " + node.getName());
        if (node.getName().contains(targetName)) {
            foundNodes.add(node);
            System.out.println("  找到匹配节点: " + node.getName());
        }
    }
    
    @Override
    public void visit(LeafNodeB node) {
        System.out.println("搜索 LeafNodeB: " + node.getName());
        if (node.getName().contains(targetName)) {
            foundNodes.add(node);
            System.out.println("  找到匹配节点: " + node.getName());
        }
    }
    
    @Override
    public void visit(CompositeNode node) {
        System.out.println("搜索 CompositeNode: " + node.getName());
        if (node.getName().contains(targetName)) {
            foundNodes.add(node);
            System.out.println("  找到匹配节点: " + node.getName());
        }
        
        // 搜索所有子节点
        for (Node child : node.getChildren()) {
            child.accept(this);
        }
    }
    
    @Override
    public Object getResult() {
        return foundNodes;
    }
    
    public String getTargetName() {
        return targetName;
    }
}

// 节点接口（元素）
public interface Node {
    // 接受访问者的访问
    void accept(Visitor visitor);
    // 获取节点名称
    String getName();
}

// 叶子节点A
public class LeafNodeA implements Node {
    private String name;
    private int value;
    
    public LeafNodeA(String name, int value) {
        this.name = name;
        this.value = value;
    }
    
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    public int getValue() {
        return value;
    }
    
    @Override
    public String toString() {
        return "LeafNodeA{name='" + name + "', value=" + value + "}";
    }
}

// 叶子节点B
public class LeafNodeB implements Node {
    private String name;
    private int count;
    
    public LeafNodeB(String name, int count) {
        this.name = name;
        this.count = count;
    }
    
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    public int getCount() {
        return count;
    }
    
    @Override
    public String toString() {
        return "LeafNodeB{name='" + name + "', count=" + count + "}";
    }
}

// 组合节点
public class CompositeNode implements Node {
    private String name;
    private List<Node> children = new ArrayList<>();
    
    public CompositeNode(String name) {
        this.name = name;
    }
    
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    // 添加子节点
    public void addChild(Node child) {
        children.add(child);
    }
    
    // 移除子节点
    public void removeChild(Node child) {
        children.remove(child);
    }
    
    // 获取所有子节点
    public List<Node> getChildren() {
        return new ArrayList<>(children);
    }
    
    // 获取子节点数量
    public int getChildCount() {
        return children.size();
    }
    
    @Override
    public String toString() {
        return "CompositeNode{name='" + name + "', childCount=" + children.size() + "}";
    }
}

// 对象结构
public class NodeStructure {
    private List<Node> rootNodes = new ArrayList<>();
    
    // 添加根节点
    public void addRootNode(Node node) {
        rootNodes.add(node);
    }
    
    // 移除根节点
    public void removeRootNode(Node node) {
        rootNodes.remove(node);
    }
    
    // 接受访问者的访问
    public void accept(Visitor visitor) {
        for (Node node : rootNodes) {
            node.accept(visitor);
        }
    }
    
    // 获取根节点数量
    public int getRootNodeCount() {
        return rootNodes.size();
    }
    
    // 获取所有根节点
    public List<Node> getRootNodes() {
        return new ArrayList<>(rootNodes);
    }
}

// 客户端：扩展访问者模式演示
public class ExtendedVisitorPatternDemo {
    public static void main(String[] args) {
        System.out.println("===== 扩展访问者模式演示 =====\n");
        
        // 创建对象结构（树状结构）
        NodeStructure structure = new NodeStructure();
        
        // 创建节点
        CompositeNode root1 = new CompositeNode("Root-1");
        CompositeNode root2 = new CompositeNode("Root-2");
        
        CompositeNode branch1 = new CompositeNode("Branch-1");
        CompositeNode branch2 = new CompositeNode("Branch-2");
        CompositeNode branch3 = new CompositeNode("Branch-3");
        
        LeafNodeA leafA1 = new LeafNodeA("LeafA-1", 10);
        LeafNodeA leafA2 = new LeafNodeA("LeafA-2", 20);
        LeafNodeA leafA3 = new LeafNodeA("LeafA-3", 30);
        
        LeafNodeB leafB1 = new LeafNodeB("LeafB-1", 5);
        LeafNodeB leafB2 = new LeafNodeB("LeafB-2", 15);
        
        // 构建树状结构
        root1.addChild(branch1);
        root1.addChild(branch2);
        root2.addChild(branch3);
        
        branch1.addChild(leafA1);
        branch1.addChild(leafB1);
        branch2.addChild(leafA2);
        branch3.addChild(leafA3);
        branch3.addChild(leafB2);
        
        // 添加根节点到结构中
        structure.addRootNode(root1);
        structure.addRootNode(root2);
        
        System.out.println("创建树形结构，包含 " + structure.getRootNodeCount() + " 个根节点");
        
        // 使用打印访问者
        System.out.println("\n----- 使用打印访问者 -----");
        PrintVisitor printVisitor = new PrintVisitor();
        structure.accept(printVisitor);
        System.out.println("\n打印结果:\n" + printVisitor.getResult());
        
        // 使用计算访问者
        System.out.println("\n----- 使用计算访问者 -----");
        CalculateVisitor calculateVisitor = new CalculateVisitor();
        structure.accept(calculateVisitor);
        Map<String, Integer> calcResult = (Map<String, Integer>) calculateVisitor.getResult();
        System.out.println("\n计算结果:");
        System.out.println("  总Value: " + calcResult.get("totalValue"));
        System.out.println("  总Count: " + calcResult.get("totalCount"));
        System.out.println("  总节点数: " + calcResult.get("nodeCount"));
        
        // 使用搜索访问者
        System.out.println("\n----- 使用搜索访问者查找包含'A'的节点 -----");
        SearchVisitor searchVisitor = new SearchVisitor("A");
        structure.accept(searchVisitor);
        List<Node> foundNodes = (List<Node>) searchVisitor.getResult();
        System.out.println("\n搜索结果:");
        System.out.println("  找到 " + foundNodes.size() + " 个匹配节点:");
        for (Node node : foundNodes) {
            System.out.println("  - " + node);
        }
        
        System.out.println("\n===== 演示结束 =====");
    }
}
```

## 实际应用示例：文档处理系统

下面是一个文档处理系统的实际应用示例，展示如何使用访问者模式处理不同类型的文档元素：

```java
import java.util.*;

// 访问者接口
public interface DocumentVisitor {
    void visit(TextElement text);
    void visit(ImageElement image);
    void visit(TableElement table);
    void visit(ParagraphElement paragraph);
    void visit(Document document);
}

// 具体访问者：导出为HTML
public class HtmlExportVisitor implements DocumentVisitor {
    private StringBuilder html = new StringBuilder();
    
    @Override
    public void visit(TextElement text) {
        html.append("<span style=\"color: ").append(text.getColor())
            .append("; font-size: ").append(text.getFontSize())
            .append("px;\">")
            .append(text.getContent()).append("</span>");
    }
    
    @Override
    public void visit(ImageElement image) {
        html.append("<img src=\"").append(image.getSource())
            .append("\" alt=\"").append(image.getAltText())
            .append("\" width=\"").append(image.getWidth())
            .append("\" height=\"").append(image.getHeight())
            .append("\" />");
    }
    
    @Override
    public void visit(TableElement table) {
        html.append("<table border=\"1\" cellpadding=\"5\" cellspacing=\"0\">");
        
        // 添加表头
        html.append("<thead><tr>");
        for (String header : table.getHeaders()) {
            html.append("<th>").append(header).append("</th>");
        }
        html.append("</tr></thead>");
        
        // 添加表体
        html.append("<tbody>");
        for (List<String> row : table.getRows()) {
            html.append("<tr>");
            for (String cell : row) {
                html.append("<td>").append(cell).append("</td>");
            }
            html.append("</tr>");
        }
        html.append("</tbody>");
        
        html.append("</table>");
    }
    
    @Override
    public void visit(ParagraphElement paragraph) {
        html.append("<p style=\"text-align: ").append(paragraph.getAlignment())
            .append("; margin-bottom: ").append(paragraph.getMarginBottom())
            .append("px;\">");
        
        // 访问段落中的所有子元素
        for (DocumentElement element : paragraph.getElements()) {
            element.accept(this);
        }
        
        html.append("</p>");
    }
    
    @Override
    public void visit(Document document) {
        html.append("<!DOCTYPE html>\n");
        html.append("<html>\n");
        html.append("<head>\n");
        html.append("<title>").append(document.getTitle()).append("</title>\n");
        html.append("</head>\n");
        html.append("<body>\n");
        html.append("<h1>").append(document.getTitle()).append("</h1>\n");
        html.append("<p>Author: ").append(document.getAuthor()).append("</p>\n");
        html.append("<p>Date: ").append(document.getCreationDate()).append("</p>\n");
        
        // 访问文档中的所有元素
        for (DocumentElement element : document.getElements()) {
            element.accept(this);
        }
        
        html.append("</body>\n");
        html.append("</html>");
    }
    
    public String getHtml() {
        return html.toString();
    }
    
    public void reset() {
        html = new StringBuilder();
    }
}

// 具体访问者：导出为纯文本
public class TextExportVisitor implements DocumentVisitor {
    private StringBuilder text = new StringBuilder();
    private static final String NEWLINE = System.lineSeparator();
    
    @Override
    public void visit(TextElement textElement) {
        text.append(textElement.getContent());
    }
    
    @Override
    public void visit(ImageElement image) {
        text.append("[图片: " + image.getAltText() + "]");
    }
    
    @Override
    public void visit(TableElement table) {
        // 简单的表格文本格式化
        int columnCount = table.getHeaders().size();
        int[] columnWidths = new int[columnCount];
        
        // 计算每列的最大宽度
        for (int i = 0; i < columnCount; i++) {
            columnWidths[i] = table.getHeaders().get(i).length();
        }
        
        for (List<String> row : table.getRows()) {
            for (int i = 0; i < Math.min(row.size(), columnCount); i++) {
                columnWidths[i] = Math.max(columnWidths[i], row.get(i).length());
            }
        }
        
        // 生成分隔线
        StringBuilder separator = new StringBuilder();
        for (int width : columnWidths) {
            separator.append("+");
            for (int i = 0; i < width + 2; i++) {
                separator.append("-");
            }
        }
        separator.append("+").append(NEWLINE);
        
        // 添加表头
        text.append(separator);
        text.append("|");
        for (int i = 0; i < columnCount; i++) {
            text.append(" ").append(padRight(table.getHeaders().get(i), columnWidths[i])).append(" |");
        }
        text.append(NEWLINE);
        text.append(separator);
        
        // 添加数据行
        for (List<String> row : table.getRows()) {
            text.append("|");
            for (int i = 0; i < Math.min(row.size(), columnCount); i++) {
                text.append(" ").append(padRight(row.get(i), columnWidths[i])).append(" |");
            }
            text.append(NEWLINE);
        }
        text.append(separator);
    }
    
    // 辅助方法：右填充字符串
    private String padRight(String s, int width) {
        return String.format("%-" + width + "s", s);
    }
    
    @Override
    public void visit(ParagraphElement paragraph) {
        for (DocumentElement element : paragraph.getElements()) {
            element.accept(this);
        }
        text.append(NEWLINE).append(NEWLINE);
    }
    
    @Override
    public void visit(Document document) {
        text.append("===== " + document.getTitle() + " =====").append(NEWLINE);
        text.append("作者: " + document.getAuthor()).append(NEWLINE);
        text.append("日期: " + document.getCreationDate()).append(NEWLINE).append(NEWLINE);
        
        for (DocumentElement element : document.getElements()) {
            element.accept(this);
        }
    }
    
    public String getText() {
        return text.toString();
    }
    
    public void reset() {
        text = new StringBuilder();
    }
}

// 具体访问者：字数统计访问者
public class WordCountVisitor implements DocumentVisitor {
    private int totalWords = 0;
    private int textElementCount = 0;
    private int imageElementCount = 0;
    private int tableElementCount = 0;
    private int paragraphElementCount = 0;
    private Map<String, Integer> wordFrequency = new HashMap<>();
    
    @Override
    public void visit(TextElement text) {
        textElementCount++;
        String content = text.getContent().trim();
        if (!content.isEmpty()) {
            // 简单的单词计数（按空格分割）
            String[] words = content.split("\\s+");
            totalWords += words.length;
            
            // 更新词频统计
            for (String word : words) {
                // 简单的清理，移除标点符号
                String cleanWord = word.replaceAll("[.,;:!?()\"']", "").toLowerCase();
                if (!cleanWord.isEmpty()) {
                    wordFrequency.put(cleanWord, wordFrequency.getOrDefault(cleanWord, 0) + 1);
                }
            }
        }
    }
    
    @Override
    public void visit(ImageElement image) {
        imageElementCount++;
        // 统计图片替代文本中的单词
        String altText = image.getAltText().trim();
        if (!altText.isEmpty()) {
            String[] words = altText.split("\\s+");
            totalWords += words.length;
        }
    }
    
    @Override
    public void visit(TableElement table) {
        tableElementCount++;
        
        // 统计表头中的单词
        for (String header : table.getHeaders()) {
            String[] words = header.trim().split("\\s+");
            totalWords += words.length;
        }
        
        // 统计表格内容中的单词
        for (List<String> row : table.getRows()) {
            for (String cell : row) {
                String[] words = cell.trim().split("\\s+");
                totalWords += words.length;
            }
        }
    }
    
    @Override
    public void visit(ParagraphElement paragraph) {
        paragraphElementCount++;
        // 段落中的单词已经在访问子元素时统计过了
    }
    
    @Override
    public void visit(Document document) {
        // 文档标题和作者信息也计入统计
        String title = document.getTitle().trim();
        if (!title.isEmpty()) {
            String[] words = title.split("\\s+");
            totalWords += words.length;
        }
        
        String author = document.getAuthor().trim();
        if (!author.isEmpty()) {
            String[] words = author.split("\\s+");
            totalWords += words.length;
        }
        
        // 访问所有元素进行统计
        for (DocumentElement element : document.getElements()) {
            element.accept(this);
        }
    }
    
    // 获取统计结果
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalWords", totalWords);
        stats.put("textElementCount", textElementCount);
        stats.put("imageElementCount", imageElementCount);
        stats.put("tableElementCount", tableElementCount);
        stats.put("paragraphElementCount", paragraphElementCount);
        
        // 获取最常用的10个单词
        List<Map.Entry<String, Integer>> sortedWords = new ArrayList<>(wordFrequency.entrySet());
        sortedWords.sort(Map.Entry.<String, Integer>comparingByValue().reversed());
        
        Map<String, Integer> topWords = new LinkedHashMap<>();
        int limit = Math.min(10, sortedWords.size());
        for (int i = 0; i < limit; i++) {
            Map.Entry<String, Integer> entry = sortedWords.get(i);
            topWords.put(entry.getKey(), entry.getValue());
        }
        
        stats.put("topWords", topWords);
        return stats;
    }
    
    public void reset() {
        totalWords = 0;
        textElementCount = 0;
        imageElementCount = 0;
        tableElementCount = 0;
        paragraphElementCount = 0;
        wordFrequency.clear();
    }
}

// 文档元素接口（元素）
public interface DocumentElement {
    void accept(DocumentVisitor visitor);
}

// 文本元素
public class TextElement implements DocumentElement {
    private String content;
    private String color;
    private int fontSize;
    
    public TextElement(String content) {
        this(content, "black", 12);
    }
    
    public TextElement(String content, String color, int fontSize) {
        this.content = content;
        this.color = color;
        this.fontSize = fontSize;
    }
    
    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visit(this);
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public int getFontSize() {
        return fontSize;
    }
    
    public void setFontSize(int fontSize) {
        this.fontSize = fontSize;
    }
    
    @Override
    public String toString() {
        return "TextElement{content='" + content + "', color='" + color + "', fontSize=" + fontSize + "}";
    }
}

// 图片元素
public class ImageElement implements DocumentElement {
    private String source;
    private String altText;
    private int width;
    private int height;
    
    public ImageElement(String source, String altText) {
        this(source, altText, 300, 200);
    }
    
    public ImageElement(String source, String altText, int width, int height) {
        this.source = source;
        this.altText = altText;
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visit(this);
    }
    
    public String getSource() {
        return source;
    }
    
    public void setSource(String source) {
        this.source = source;
    }
    
    public String getAltText() {
        return altText;
    }
    
    public void setAltText(String altText) {
        this.altText = altText;
    }
    
    public int getWidth() {
        return width;
    }
    
    public void setWidth(int width) {
        this.width = width;
    }
    
    public int getHeight() {
        return height;
    }
    
    public void setHeight(int height) {
        this.height = height;
    }
    
    @Override
    public String toString() {
        return "ImageElement{source='" + source + "', altText='" + altText + "', width=" + width + ", height=" + height + "}";
    }
}

// 表格元素
public class TableElement implements DocumentElement {
    private List<String> headers = new ArrayList<>();
    private List<List<String>> rows = new ArrayList<>();
    
    public TableElement(List<String> headers) {
        this.headers = new ArrayList<>(headers);
    }
    
    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visit(this);
    }
    
    // 添加一行数据
    public void addRow(List<String> row) {
        rows.add(new ArrayList<>(row));
    }
    
    // 添加多行数据
    public void addRows(List<List<String>> rows) {
        for (List<String> row : rows) {
            addRow(row);
        }
    }
    
    // 获取表头
    public List<String> getHeaders() {
        return new ArrayList<>(headers);
    }
    
    // 获取所有行
    public List<List<String>> getRows() {
        List<List<String>> result = new ArrayList<>();
        for (List<String> row : rows) {
            result.add(new ArrayList<>(row));
        }
        return result;
    }
    
    // 获取行数
    public int getRowCount() {
        return rows.size();
    }
    
    // 获取列数
    public int getColumnCount() {
        return headers.size();
    }
    
    @Override
    public String toString() {
        return "TableElement{headers=" + headers + ", rowCount=" + rows.size() + ", columnCount=" + headers.size() + "}";
    }
}

// 段落元素（组合元素）
public class ParagraphElement implements DocumentElement {
    private List<DocumentElement> elements = new ArrayList<>();
    private String alignment; // left, center, right, justify
    private int marginBottom;
    
    public ParagraphElement() {
        this("left", 10);
    }
    
    public ParagraphElement(String alignment, int marginBottom) {
        this.alignment = alignment;
        this.marginBottom = marginBottom;
    }
    
    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visit(this);
    }
    
    // 添加子元素
    public void addElement(DocumentElement element) {
        elements.add(element);
    }
    
    // 添加多个子元素
    public void addElements(List<DocumentElement> elements) {
        this.elements.addAll(elements);
    }
    
    // 获取所有子元素
    public List<DocumentElement> getElements() {
        return new ArrayList<>(elements);
    }
    
    // 获取子元素数量
    public int getElementCount() {
        return elements.size();
    }
    
    // 获取对齐方式
    public String getAlignment() {
        return alignment;
    }
    
    public void setAlignment(String alignment) {
        this.alignment = alignment;
    }
    
    // 获取底部边距
    public int getMarginBottom() {
        return marginBottom;
    }
    
    public void setMarginBottom(int marginBottom) {
        this.marginBottom = marginBottom;
    }
    
    @Override
    public String toString() {
        return "ParagraphElement{alignment='" + alignment + "', marginBottom=" + marginBottom + ", elementCount=" + elements.size() + "}";
    }
}

// 文档类（对象结构）
public class Document implements DocumentElement {
    private String title;
    private String author;
    private String creationDate;
    private List<DocumentElement> elements = new ArrayList<>();
    
    public Document(String title, String author) {
        this.title = title;
        this.author = author;
        this.creationDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
    }
    
    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visit(this);
    }
    
    // 添加元素
    public void addElement(DocumentElement element) {
        elements.add(element);
    }
    
    // 添加多个元素
    public void addElements(List<DocumentElement> elements) {
        this.elements.addAll(elements);
    }
    
    // 获取所有元素
    public List<DocumentElement> getElements() {
        return new ArrayList<>(elements);
    }
    
    // 获取元素数量
    public int getElementCount() {
        return elements.size();
    }
    
    // 获取文档标题
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    // 获取作者
    public String getAuthor() {
        return author;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }
    
    // 获取创建日期
    public String getCreationDate() {
        return creationDate;
    }
    
    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
    
    @Override
    public String toString() {
        return "Document{title='" + title + "', author='" + author + "', creationDate='" + creationDate + "', elementCount=" + elements.size() + "}";
    }
}

// 客户端：文档处理系统演示
public class DocumentProcessingSystemDemo {
    public static void main(String[] args) {
        System.out.println("===== 文档处理系统演示 =====\n");
        
        // 创建一个文档
        Document document = new Document("设计模式入门教程", "张三");
        
        // 创建段落1：介绍
        ParagraphElement introParagraph = new ParagraphElement("left", 15);
        introParagraph.addElement(new TextElement("设计模式是软件开发中常用的解决方案，"));
        introParagraph.addElement(new TextElement("它可以帮助我们解决各种常见的设计问题。", "blue", 14));
        
        // 创建段落2：图片
        ParagraphElement imageParagraph = new ParagraphElement("center", 15);
        imageParagraph.addElement(new ImageElement("design-patterns.jpg", "设计模式分类图", 500, 300));
        
        // 创建段落3：表格
        ParagraphElement tableParagraph = new ParagraphElement("left", 15);
        List<String> headers = Arrays.asList("模式名称", "类型", "主要用途");
        TableElement patternTable = new TableElement(headers);
        
        List<List<String>> rows = Arrays.asList(
            Arrays.asList("单例模式", "创建型", "确保一个类只有一个实例"),
            Arrays.asList("工厂方法", "创建型", "定义创建对象的接口"),
            Arrays.asList("适配器模式", "结构型", "将一个类的接口转换成客户希望的接口"),
            Arrays.asList("观察者模式", "行为型", "对象间一对多的依赖关系")
        );
        patternTable.addRows(rows);
        tableParagraph.addElement(patternTable);
        
        // 创建段落4：结论
        ParagraphElement conclusionParagraph = new ParagraphElement("left", 15);
        conclusionParagraph.addElement(new TextElement("通过学习设计模式，我们可以提高代码的可复用性、可维护性和可扩展性。", "green", 16));
        
        // 将所有段落添加到文档
        document.addElement(introParagraph);
        document.addElement(imageParagraph);
        document.addElement(tableParagraph);
        document.addElement(conclusionParagraph);
        
        System.out.println("创建文档: " + document.getTitle());
        System.out.println("作者: " + document.getAuthor());
        System.out.println("创建日期: " + document.getCreationDate());
        System.out.println("元素数量: " + document.getElementCount());
        
        // 使用HTML导出访问者
        System.out.println("\n----- 使用HTML导出访问者 -----");
        HtmlExportVisitor htmlVisitor = new HtmlExportVisitor();
        document.accept(htmlVisitor);
        String htmlContent = htmlVisitor.getHtml();
        System.out.println("HTML导出成功，内容长度: " + htmlContent.length() + " 字符");
        System.out.println("\nHTML内容预览 (前200字符):");
        System.out.println(htmlContent.substring(0, Math.min(200, htmlContent.length())) + "...");
        
        // 使用文本导出访问者
        System.out.println("\n----- 使用文本导出访问者 -----");
        TextExportVisitor textVisitor = new TextExportVisitor();
        document.accept(textVisitor);
        String textContent = textVisitor.getText();
        System.out.println("文本导出成功，内容长度: " + textContent.length() + " 字符");
        System.out.println("\n文本内容:\n" + textContent);
        
        // 使用字数统计访问者
        System.out.println("\n----- 使用字数统计访问者 -----");
        WordCountVisitor wordCountVisitor = new WordCountVisitor();
        document.accept(wordCountVisitor);
        Map<String, Object> statistics = wordCountVisitor.getStatistics();
        
        System.out.println("统计结果:");
        System.out.println("  总字数: " + statistics.get("totalWords"));
        System.out.println("  文本元素数: " + statistics.get("textElementCount"));
        System.out.println("  图片元素数: " + statistics.get("imageElementCount"));
        System.out.println("  表格元素数: " + statistics.get("tableElementCount"));
        System.out.println("  段落元素数: " + statistics.get("paragraphElementCount"));
        System.out.println("  最常用单词:");
        Map<String, Integer> topWords = (Map<String, Integer>) statistics.get("topWords");
        for (Map.Entry<String, Integer> entry : topWords.entrySet()) {
            System.out.println("    - " + entry.getKey() + ": " + entry.getValue() + "次");
        }
        
        System.out.println("\n===== 演示结束 =====");
    }
}
```

## 优缺点

### 优点

- **符合开闭原则**：添加新的操作不需要修改已有元素类，只需添加新的访问者类
- **集中相关操作**：将相关的操作集中在一个访问者类中，而不是分散在各个元素类中
- **双分派机制**：支持动态多态，根据元素类型和访问者类型决定调用哪个方法
- **灵活性高**：可以轻松添加新的操作，而不影响现有的元素类
- **良好的扩展性**：当需要添加新的操作时，不需要修改现有的代码结构

### 缺点

- **对象结构稳定**：当对象结构经常变化时，访问者模式会导致维护困难，因为每次添加新的元素类型都需要修改所有访问者类
- **破坏封装**：访问者模式需要元素类暴露内部状态，以便访问者可以操作它们，这可能会破坏封装性
- **增加复杂性**：引入了额外的访问者类，增加了系统的复杂性
- **学习成本高**：理解双分派机制和访问者模式的工作原理可能需要一定的学习成本

## 与其他模式的关系

- **访问者模式与组合模式**：两者经常结合使用，访问者用于遍历组合结构并对其中的元素执行操作
- **访问者模式与迭代器模式**：迭代器模式用于遍历集合，而访问者模式用于对集合中的元素执行操作
- **访问者模式与观察者模式**：观察者模式关注对象状态变化时的通知，而访问者模式关注对对象执行不同的操作
- **访问者模式与策略模式**：策略模式封装算法，而访问者模式封装对不同类型对象的操作

## 总结

访问者模式是一种强大的设计模式，它通过将数据结构与数据操作分离，使得我们可以在不修改已有类层次结构的情况下添加新的操作。这种模式特别适用于对象结构相对稳定，但需要频繁添加新操作的场景。访问者模式利用双分派机制实现了基于元素类型和访问者类型的动态方法调用，使得系统具有很高的灵活性和扩展性。然而，当对象结构经常变化时，使用访问者模式可能会导致维护困难，因此需要根据具体的应用场景来选择是否使用访问者模式。