# 解释器模式 (Interpreter Pattern)

## 概述

解释器模式是一种行为型设计模式，它定义了一种语言的语法表示，并解释该语言中的表达式。解释器模式用于实现简单的语言解析器、规则引擎或配置文件解析等场景。

解释器模式的核心思想是将语言中的每个语法规则表示为一个对象，然后通过组合这些对象来表示复杂的语法结构。当需要解释一个表达式时，就递归地调用这些对象的解释方法。

## 核心要点

- **语法表示**：将语言的语法规则表示为对象
- **递归解释**：通过递归调用解释方法处理复杂表达式
- **组合模式**：使用组合模式构建抽象语法树
- **易于扩展**：可以方便地添加新的语法规则
- **特定领域语言**：适用于构建简单的特定领域语言(DSL)

## 应用场景

- **简单语言解析**：实现简单的编程语言或脚本语言的解释器
- **规则引擎**：实现业务规则的解析和执行
- **配置文件解析**：解析特定格式的配置文件
- **数学表达式计算**：计算数学表达式的值
- **正则表达式处理**：处理正则表达式的匹配逻辑
- **SQL查询解析**：解析简单的SQL查询语句

## 结构

解释器模式包含以下角色：

1. **抽象表达式（Abstract Expression）**：定义解释器的接口，声明解释操作
2. **终结表达式（Terminal Expression）**：实现与语法中的终结符相关的解释操作
3. **非终结表达式（Non-terminal Expression）**：实现与语法中的非终结符相关的解释操作，通常包含其他表达式
4. **上下文（Context）**：包含解释器之外的一些全局信息
5. **客户端（Client）**：构建表示特定语法规则的抽象语法树，然后调用解释操作

## 实现示例

### 1. 基本解释器模式实现

```java
// 上下文类
public class Context {
    private Map<String, Boolean> variables = new HashMap<>(); // 存储变量值
    
    // 设置变量值
    public void setVariable(String name, boolean value) {
        variables.put(name, value);
    }
    
    // 获取变量值
    public boolean getVariable(String name) {
        Boolean value = variables.get(name);
        if (value == null) {
            throw new IllegalArgumentException("未定义的变量: " + name);
        }
        return value;
    }
    
    // 检查变量是否存在
    public boolean containsVariable(String name) {
        return variables.containsKey(name);
    }
    
    @Override
    public String toString() {
        return "上下文变量: " + variables;
    }
}

// 抽象表达式
public interface Expression {
    boolean interpret(Context context); // 解释操作
}

// 终结表达式：变量表达式
public class VariableExpression implements Expression {
    private String name; // 变量名
    
    public VariableExpression(String name) {
        this.name = name;
    }
    
    @Override
    public boolean interpret(Context context) {
        return context.getVariable(name);
    }
    
    @Override
    public String toString() {
        return name;
    }
}

// 终结表达式：常量表达式
public class ConstantExpression implements Expression {
    private boolean value; // 常量值
    
    public ConstantExpression(boolean value) {
        this.value = value;
    }
    
    @Override
    public boolean interpret(Context context) {
        return value; // 常量值不依赖上下文
    }
    
    @Override
    public String toString() {
        return String.valueOf(value);
    }
}

// 非终结表达式：与表达式
public class AndExpression implements Expression {
    private Expression leftExpression; // 左表达式
    private Expression rightExpression; // 右表达式
    
    public AndExpression(Expression leftExpression, Expression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }
    
    @Override
    public boolean interpret(Context context) {
        // 左右表达式都为真时，结果才为真
        return leftExpression.interpret(context) && rightExpression.interpret(context);
    }
    
    @Override
    public String toString() {
        return "(" + leftExpression + " AND " + rightExpression + ")";
    }
}

// 非终结表达式：或表达式
public class OrExpression implements Expression {
    private Expression leftExpression; // 左表达式
    private Expression rightExpression; // 右表达式
    
    public OrExpression(Expression leftExpression, Expression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }
    
    @Override
    public boolean interpret(Context context) {
        // 左右表达式有一个为真时，结果就为真
        return leftExpression.interpret(context) || rightExpression.interpret(context);
    }
    
    @Override
    public String toString() {
        return "(" + leftExpression + " OR " + rightExpression + ")";
    }
}

// 非终结表达式：非表达式
public class NotExpression implements Expression {
    private Expression expression; // 被否定的表达式
    
    public NotExpression(Expression expression) {
        this.expression = expression;
    }
    
    @Override
    public boolean interpret(Context context) {
        // 返回表达式结果的否定
        return !expression.interpret(context);
    }
    
    @Override
    public String toString() {
        return "NOT (" + expression + ")";
    }
}

// 客户端
public class InterpreterPatternDemo {
    public static void main(String[] args) {
        // 创建上下文
        Context context = new Context();
        
        // 设置变量值
        context.setVariable("x", true);
        context.setVariable("y", false);
        context.setVariable("z", true);
        
        System.out.println("上下文: " + context);
        System.out.println("\n===== 解释器模式演示 =====\n");
        
        // 创建表达式
        // 1. 变量表达式
        Expression x = new VariableExpression("x");
        Expression y = new VariableExpression("y");
        Expression z = new VariableExpression("z");
        
        // 2. 常量表达式
        Expression trueExpr = new ConstantExpression(true);
        Expression falseExpr = new ConstantExpression(false);
        
        // 3. 复合表达式
        Expression andExpr = new AndExpression(x, y); // x AND y
        Expression orExpr = new OrExpression(x, y); // x OR y
        Expression notExpr = new NotExpression(y); // NOT y
        
        // 4. 更复杂的表达式
        Expression complexExpr1 = new AndExpression(orExpr, z); // (x OR y) AND z
        Expression complexExpr2 = new OrExpression(andExpr, new NotExpression(z)); // (x AND y) OR NOT z
        
        // 解释并打印结果
        System.out.println("表达式: " + x);
        System.out.println("结果: " + x.interpret(context));
        System.out.println();
        
        System.out.println("表达式: " + y);
        System.out.println("结果: " + y.interpret(context));
        System.out.println();
        
        System.out.println("表达式: " + andExpr);
        System.out.println("结果: " + andExpr.interpret(context));
        System.out.println();
        
        System.out.println("表达式: " + orExpr);
        System.out.println("结果: " + orExpr.interpret(context));
        System.out.println();
        
        System.out.println("表达式: " + notExpr);
        System.out.println("结果: " + notExpr.interpret(context));
        System.out.println();
        
        System.out.println("表达式: " + complexExpr1);
        System.out.println("结果: " + complexExpr1.interpret(context));
        System.out.println();
        
        System.out.println("表达式: " + complexExpr2);
        System.out.println("结果: " + complexExpr2.interpret(context));
        System.out.println();
        
        // 改变变量值，重新解释
        System.out.println("===== 改变变量值后 =====");
        context.setVariable("y", true);
        context.setVariable("z", false);
        System.out.println("新上下文: " + context);
        System.out.println();
        
        System.out.println("表达式: " + complexExpr1);
        System.out.println("新结果: " + complexExpr1.interpret(context));
        System.out.println();
        
        System.out.println("表达式: " + complexExpr2);
        System.out.println("新结果: " + complexExpr2.interpret(context));
    }
}
```

## 2. 数学表达式计算器实现

下面是一个更实际的例子，展示如何使用解释器模式实现一个简单的数学表达式计算器：

```java
import java.util.*;
import java.util.regex.*;

// 上下文类：数学表达式上下文
public class MathContext {
    private Map<String, Double> variables = new HashMap<>(); // 存储变量值
    
    // 设置变量值
    public void setVariable(String name, double value) {
        variables.put(name, value);
    }
    
    // 获取变量值
    public double getVariable(String name) {
        Double value = variables.get(name);
        if (value == null) {
            throw new IllegalArgumentException("未定义的变量: " + name);
        }
        return value;
    }
    
    // 检查变量是否存在
    public boolean containsVariable(String name) {
        return variables.containsKey(name);
    }
    
    @Override
    public String toString() {
        return "数学上下文: " + variables;
    }
}

// 抽象表达式：数学表达式
public interface MathExpression {
    double interpret(MathContext context); // 解释操作，返回计算结果
}

// 终结表达式：数字表达式
public class NumberExpression implements MathExpression {
    private double value; // 数字值
    
    public NumberExpression(double value) {
        this.value = value;
    }
    
    @Override
    public double interpret(MathContext context) {
        return value; // 数字值不依赖上下文
    }
    
    @Override
    public String toString() {
        return String.valueOf(value);
    }
}

// 终结表达式：变量表达式
public class VariableExpression implements MathExpression {
    private String name; // 变量名
    
    public VariableExpression(String name) {
        this.name = name;
    }
    
    @Override
    public double interpret(MathContext context) {
        return context.getVariable(name);
    }
    
    @Override
    public String toString() {
        return name;
    }
}

// 非终结表达式：加法表达式
public class AddExpression implements MathExpression {
    private MathExpression leftExpression; // 左表达式
    private MathExpression rightExpression; // 右表达式
    
    public AddExpression(MathExpression leftExpression, MathExpression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }
    
    @Override
    public double interpret(MathContext context) {
        return leftExpression.interpret(context) + rightExpression.interpret(context);
    }
    
    @Override
    public String toString() {
        return "(" + leftExpression + " + " + rightExpression + ")";
    }
}

// 非终结表达式：减法表达式
public class SubtractExpression implements MathExpression {
    private MathExpression leftExpression; // 左表达式
    private MathExpression rightExpression; // 右表达式
    
    public SubtractExpression(MathExpression leftExpression, MathExpression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }
    
    @Override
    public double interpret(MathContext context) {
        return leftExpression.interpret(context) - rightExpression.interpret(context);
    }
    
    @Override
    public String toString() {
        return "(" + leftExpression + " - " + rightExpression + ")";
    }
}

// 非终结表达式：乘法表达式
public class MultiplyExpression implements MathExpression {
    private MathExpression leftExpression; // 左表达式
    private MathExpression rightExpression; // 右表达式
    
    public MultiplyExpression(MathExpression leftExpression, MathExpression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }
    
    @Override
    public double interpret(MathContext context) {
        return leftExpression.interpret(context) * rightExpression.interpret(context);
    }
    
    @Override
    public String toString() {
        return "(" + leftExpression + " * " + rightExpression + ")";
    }
}

// 非终结表达式：除法表达式
public class DivideExpression implements MathExpression {
    private MathExpression leftExpression; // 左表达式
    private MathExpression rightExpression; // 右表达式
    
    public DivideExpression(MathExpression leftExpression, MathExpression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }
    
    @Override
    public double interpret(MathContext context) {
        double divisor = rightExpression.interpret(context);
        if (divisor == 0) {
            throw new ArithmeticException("除数不能为零");
        }
        return leftExpression.interpret(context) / divisor;
    }
    
    @Override
    public String toString() {
        return "(" + leftExpression + " / " + rightExpression + ")";
    }
}

// 非终结表达式：幂运算表达式
public class PowerExpression implements MathExpression {
    private MathExpression baseExpression; // 底数表达式
    private MathExpression exponentExpression; // 指数表达式
    
    public PowerExpression(MathExpression baseExpression, MathExpression exponentExpression) {
        this.baseExpression = baseExpression;
        this.exponentExpression = exponentExpression;
    }
    
    @Override
    public double interpret(MathContext context) {
        double base = baseExpression.interpret(context);
        double exponent = exponentExpression.interpret(context);
        return Math.pow(base, exponent);
    }
    
    @Override
    public String toString() {
        return "(" + baseExpression + " ^ " + exponentExpression + ")";
    }
}

// 非终结表达式：括号表达式（包装另一个表达式）
public class ParenthesisExpression implements MathExpression {
    private MathExpression expression; // 内部表达式
    
    public ParenthesisExpression(MathExpression expression) {
        this.expression = expression;
    }
    
    @Override
    public double interpret(MathContext context) {
        return expression.interpret(context);
    }
    
    @Override
    public String toString() {
        return "(" + expression + ")";
    }
}

// 表达式解析器类
public class ExpressionParser {
    // 解析表达式字符串，构建抽象语法树
    public static MathExpression parse(String expression) {
        // 去除所有空格
        expression = expression.replaceAll("\\s+", "");
        try {
            // 使用递归下降解析器解析表达式
            Parser parser = new Parser(expression);
            MathExpression result = parser.parseExpression();
            
            // 确保整个表达式都被解析
            if (parser.currentPosition < expression.length()) {
                throw new IllegalArgumentException("表达式解析错误，未处理的字符: " + expression.substring(parser.currentPosition));
            }
            
            return result;
        } catch (Exception e) {
            throw new IllegalArgumentException("无法解析表达式: " + expression, e);
        }
    }
    
    // 递归下降解析器内部类
    private static class Parser {
        private String expression;
        private int currentPosition;
        
        public Parser(String expression) {
            this.expression = expression;
            this.currentPosition = 0;
        }
        
        // 解析表达式（处理加减法）
        public MathExpression parseExpression() {
            MathExpression left = parseTerm();
            
            while (currentPosition < expression.length()) {
                char operator = peek();
                if (operator == '+' || operator == '-') {
                    consume(); // 消耗运算符
                    MathExpression right = parseTerm();
                    if (operator == '+') {
                        left = new AddExpression(left, right);
                    } else {
                        left = new SubtractExpression(left, right);
                    }
                } else {
                    break;
                }
            }
            
            return left;
        }
        
        // 解析项（处理乘除法）
        public MathExpression parseTerm() {
            MathExpression left = parseFactor();
            
            while (currentPosition < expression.length()) {
                char operator = peek();
                if (operator == '*' || operator == '/') {
                    consume(); // 消耗运算符
                    MathExpression right = parseFactor();
                    if (operator == '*') {
                        left = new MultiplyExpression(left, right);
                    } else {
                        left = new DivideExpression(left, right);
                    }
                } else if (operator == '^') {
                    consume(); // 消耗运算符
                    MathExpression right = parseFactor();
                    left = new PowerExpression(left, right);
                } else {
                    break;
                }
            }
            
            return left;
        }
        
        // 解析因子（处理数字、变量和括号）
        public MathExpression parseFactor() {
            char currentChar = peek();
            
            // 处理负数
            if (currentChar == '-') {
                consume();
                MathExpression factor = parseFactor();
                return new MultiplyExpression(new NumberExpression(-1), factor);
            }
            
            // 处理括号
            if (currentChar == '(') {
                consume(); // 消耗左括号
                MathExpression expr = parseExpression();
                
                // 确保有匹配的右括号
                if (currentPosition >= expression.length() || peek() != ')') {
                    throw new IllegalArgumentException("缺少右括号");
                }
                
                consume(); // 消耗右括号
                return new ParenthesisExpression(expr);
            }
            
            // 处理数字
            if (Character.isDigit(currentChar) || currentChar == '.') {
                return parseNumber();
            }
            
            // 处理变量
            if (Character.isLetter(currentChar)) {
                return parseVariable();
            }
            
            throw new IllegalArgumentException("无法识别的字符: " + currentChar);
        }
        
        // 解析数字
        private MathExpression parseNumber() {
            int startPos = currentPosition;
            boolean hasDecimalPoint = false;
            
            // 收集数字字符
            while (currentPosition < expression.length()) {
                char c = expression.charAt(currentPosition);
                if (Character.isDigit(c)) {
                    currentPosition++;
                } else if (c == '.' && !hasDecimalPoint) {
                    hasDecimalPoint = true;
                    currentPosition++;
                } else {
                    break;
                }
            }
            
            // 确保至少有一个数字
            if (startPos == currentPosition) {
                throw new IllegalArgumentException("无效的数字格式");
            }
            
            // 如果以小数点结尾，添加一个零
            String numStr = expression.substring(startPos, currentPosition);
            if (numStr.endsWith(".")) {
                numStr += "0";
            }
            
            try {
                double value = Double.parseDouble(numStr);
                return new NumberExpression(value);
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("无效的数字格式: " + numStr);
            }
        }
        
        // 解析变量
        private MathExpression parseVariable() {
            int startPos = currentPosition;
            
            // 收集变量名（字母、数字、下划线）
            while (currentPosition < expression.length()) {
                char c = expression.charAt(currentPosition);
                if (Character.isLetterOrDigit(c) || c == '_') {
                    currentPosition++;
                } else {
                    break;
                }
            }
            
            // 确保变量名不为空
            if (startPos == currentPosition) {
                throw new IllegalArgumentException("无效的变量名");
            }
            
            String varName = expression.substring(startPos, currentPosition);
            return new VariableExpression(varName);
        }
        
        // 查看当前字符但不消耗
        private char peek() {
            if (currentPosition >= expression.length()) {
                throw new IllegalArgumentException("表达式意外结束");
            }
            return expression.charAt(currentPosition);
        }
        
        // 消耗当前字符
        private void consume() {
            currentPosition++;
        }
    }
}

// 数学表达式计算器类（客户端使用）
public class MathCalculator {
    private MathContext context;
    
    public MathCalculator() {
        this.context = new MathContext();
    }
    
    // 设置变量值
    public void setVariable(String name, double value) {
        context.setVariable(name, value);
    }
    
    // 获取变量值
    public double getVariable(String name) {
        return context.getVariable(name);
    }
    
    // 计算表达式
    public double calculate(String expression) {
        System.out.println("计算表达式: " + expression);
        System.out.println("上下文: " + context);
        
        // 解析表达式
        MathExpression mathExpression = ExpressionParser.parse(expression);
        System.out.println("解析后的表达式: " + mathExpression);
        
        // 解释并计算结果
        double result = mathExpression.interpret(context);
        System.out.println("计算结果: " + result);
        System.out.println();
        
        return result;
    }
    
    // 获取当前上下文
    public MathContext getContext() {
        return context;
    }
}

// 客户端：数学表达式计算器演示
public class MathCalculatorDemo {
    public static void main(String[] args) {
        // 创建计算器
        MathCalculator calculator = new MathCalculator();
        
        // 设置变量值
        calculator.setVariable("x", 10);
        calculator.setVariable("y", 5);
        calculator.setVariable("z", 2);
        
        System.out.println("===== 数学表达式计算器演示 =====\n");
        
        // 计算简单表达式
        calculator.calculate("2 + 3");
        calculator.calculate("5 - 2");
        calculator.calculate("3 * 4");
        calculator.calculate("10 / 2");
        calculator.calculate("2 ^ 3"); // 2的3次方
        
        // 计算带变量的表达式
        calculator.calculate("x + y");
        calculator.calculate("x * z");
        calculator.calculate("y / z");
        
        // 计算复杂表达式
        calculator.calculate("(x + y) * z");
        calculator.calculate("x * (y + z)");
        calculator.calculate("x * y + z"); // 测试运算符优先级
        calculator.calculate("x + y * z"); // 测试运算符优先级
        
        // 计算更复杂的表达式
        calculator.calculate("(x - y) * (z + 1) / 2");
        calculator.calculate("x^2 + y^2 + z^2"); // x² + y² + z²
        
        // 测试负数
        calculator.calculate("-x + y");
        calculator.calculate("x * (-y)");
        
        // 改变变量值
        System.out.println("===== 改变变量值后 =====");
        calculator.setVariable("x", 20);
        calculator.setVariable("y", 7);
        calculator.setVariable("z", 3);
        
        // 重新计算表达式
        calculator.calculate("x + y * z");
        calculator.calculate("(x - y) / z");
    }
}
```

## 实际应用示例：简单规则引擎

下面是一个实际应用的例子，展示如何使用解释器模式实现一个简单的业务规则引擎：

```java
import java.util.*;
import java.util.regex.*;

// 规则上下文类
public class RuleContext {
    private Map<String, Object> facts = new HashMap<>(); // 存储事实（数据）
    
    // 设置事实
    public void setFact(String name, Object value) {
        facts.put(name, value);
    }
    
    // 获取事实
    @SuppressWarnings("unchecked")
    public <T> T getFact(String name) {
        Object value = facts.get(name);
        if (value == null) {
            throw new IllegalArgumentException("未定义的事实: " + name);
        }
        return (T) value;
    }
    
    // 检查事实是否存在
    public boolean containsFact(String name) {
        return facts.containsKey(name);
    }
    
    // 获取所有事实的字符串表示
    public Map<String, String> getFactsAsString() {
        Map<String, String> result = new HashMap<>();
        facts.forEach((name, value) -> {
            result.put(name, String.valueOf(value));
        });
        return result;
    }
    
    @Override
    public String toString() {
        return "规则上下文: " + getFactsAsString();
    }
}

// 抽象规则表达式
public interface RuleExpression {
    boolean evaluate(RuleContext context); // 评估规则
    String getExpressionString(); // 获取表达式字符串表示
}

// 终结表达式：比较表达式（数值比较）
public class ComparisonExpression implements RuleExpression {
    private String leftOperand; // 左操作数（变量名）
    private String operator; // 运算符
    private Object rightOperand; // 右操作数（常量值）
    
    public ComparisonExpression(String leftOperand, String operator, Object rightOperand) {
        this.leftOperand = leftOperand;
        this.operator = operator;
        this.rightOperand = rightOperand;
    }
    
    @Override
    public boolean evaluate(RuleContext context) {
        Object leftValue = context.getFact(leftOperand);
        
        // 根据运算符执行比较
        switch (operator) {
            case ">":
                return compare(leftValue, rightOperand) > 0;
            case ">=":
                return compare(leftValue, rightOperand) >= 0;
            case "<":
                return compare(leftValue, rightOperand) < 0;
            case "<=":
                return compare(leftValue, rightOperand) <= 0;
            case "==":
                return Objects.equals(leftValue, rightOperand);
            case "!=":
                return !Objects.equals(leftValue, rightOperand);
            default:
                throw new IllegalArgumentException("不支持的运算符: " + operator);
        }
    }
    
    // 比较两个对象
    @SuppressWarnings({"rawtypes", "unchecked"})
    private int compare(Object left, Object right) {
        // 如果左右两边类型相同且实现了Comparable接口
        if (left.getClass().equals(right.getClass()) && left instanceof Comparable) {
            return ((Comparable) left).compareTo(right);
        }
        
        // 尝试将两边转换为数字进行比较
        if (left instanceof Number && right instanceof Number) {
            double leftDouble = ((Number) left).doubleValue();
            double rightDouble = ((Number) right).doubleValue();
            return Double.compare(leftDouble, rightDouble);
        }
        
        // 转换为字符串进行比较
        return left.toString().compareTo(right.toString());
    }
    
    @Override
    public String getExpressionString() {
        return leftOperand + " " + operator + " " + rightOperand;
    }
    
    @Override
    public String toString() {
        return getExpressionString();
    }
}

// 终结表达式：包含表达式（检查集合是否包含元素）
public class ContainsExpression implements RuleExpression {
    private String collectionName; // 集合变量名
    private Object element; // 要检查的元素
    
    public ContainsExpression(String collectionName, Object element) {
        this.collectionName = collectionName;
        this.element = element;
    }
    
    @Override
    @SuppressWarnings("unchecked")
    public boolean evaluate(RuleContext context) {
        Object collection = context.getFact(collectionName);
        
        if (collection instanceof Collection) {
            return ((Collection<Object>) collection).contains(element);
        } else if (collection instanceof Map) {
            return ((Map<Object, Object>) collection).containsValue(element);
        } else if (collection instanceof String && element instanceof String) {
            return ((String) collection).contains((String) element);
        }
        
        throw new IllegalArgumentException(collectionName + " 不是可包含元素的类型: " + collection.getClass());
    }
    
    @Override
    public String getExpressionString() {
        return collectionName + " contains " + element;
    }
    
    @Override
    public String toString() {
        return getExpressionString();
    }
}

// 终结表达式：正则表达式匹配
public class RegexExpression implements RuleExpression {
    private String textVariable; // 文本变量名
    private String pattern; // 正则表达式模式
    
    public RegexExpression(String textVariable, String pattern) {
        this.textVariable = textVariable;
        this.pattern = pattern;
    }
    
    @Override
    public boolean evaluate(RuleContext context) {
        String text = context.getFact(textVariable);
        return Pattern.matches(pattern, text);
    }
    
    @Override
    public String getExpressionString() {
        return textVariable + " matches '" + pattern + "'";
    }
    
    @Override
    public String toString() {
        return getExpressionString();
    }
}

// 非终结表达式：逻辑与表达式
public class AndExpression implements RuleExpression {
    private List<RuleExpression> expressions = new ArrayList<>(); // 子表达式列表
    
    public AndExpression(RuleExpression... expressions) {
        this.expressions.addAll(Arrays.asList(expressions));
    }
    
    // 添加表达式
    public void addExpression(RuleExpression expression) {
        expressions.add(expression);
    }
    
    @Override
    public boolean evaluate(RuleContext context) {
        // 所有子表达式都必须为真
        for (RuleExpression expression : expressions) {
            if (!expression.evaluate(context)) {
                return false;
            }
        }
        return true;
    }
    
    @Override
    public String getExpressionString() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < expressions.size(); i++) {
            if (i > 0) {
                sb.append(" AND ");
            }
            sb.append(expressions.get(i).getExpressionString());
        }
        return "(" + sb.toString() + ")";
    }
    
    @Override
    public String toString() {
        return getExpressionString();
    }
}

// 非终结表达式：逻辑或表达式
public class OrExpression implements RuleExpression {
    private List<RuleExpression> expressions = new ArrayList<>(); // 子表达式列表
    
    public OrExpression(RuleExpression... expressions) {
        this.expressions.addAll(Arrays.asList(expressions));
    }
    
    // 添加表达式
    public void addExpression(RuleExpression expression) {
        expressions.add(expression);
    }
    
    @Override
    public boolean evaluate(RuleContext context) {
        // 只要有一个子表达式为真
        for (RuleExpression expression : expressions) {
            if (expression.evaluate(context)) {
                return true;
            }
        }
        return false;
    }
    
    @Override
    public String getExpressionString() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < expressions.size(); i++) {
            if (i > 0) {
                sb.append(" OR ");
            }
            sb.append(expressions.get(i).getExpressionString());
        }
        return "(" + sb.toString() + ")";
    }
    
    @Override
    public String toString() {
        return getExpressionString();
    }
}

// 非终结表达式：逻辑非表达式
public class NotExpression implements RuleExpression {
    private RuleExpression expression; // 被否定的表达式
    
    public NotExpression(RuleExpression expression) {
        this.expression = expression;
    }
    
    @Override
    public boolean evaluate(RuleContext context) {
        return !expression.evaluate(context);
    }
    
    @Override
    public String getExpressionString() {
        return "NOT (" + expression.getExpressionString() + ")";
    }
    
    @Override
    public String toString() {
        return getExpressionString();
    }
}

// 规则类
public class Rule {
    private String name; // 规则名称
    private String description; // 规则描述
    private RuleExpression condition; // 规则条件
    private List<Action> actions = new ArrayList<>(); // 规则动作
    
    public Rule(String name, String description, RuleExpression condition) {
        this.name = name;
        this.description = description;
        this.condition = condition;
    }
    
    // 添加动作
    public Rule addAction(Action action) {
        actions.add(action);
        return this; // 支持链式调用
    }
    
    // 执行规则
    public boolean execute(RuleContext context) {
        System.out.println("执行规则: " + name);
        System.out.println("规则描述: " + description);
        System.out.println("规则条件: " + condition.getExpressionString());
        
        boolean conditionMet = condition.evaluate(context);
        System.out.println("条件评估结果: " + conditionMet);
        
        if (conditionMet) {
            // 执行所有动作
            for (Action action : actions) {
                action.execute(context);
            }
        }
        
        System.out.println("规则执行完成: " + name + "\n");
        return conditionMet;
    }
    
    // getter方法
    public String getName() { return name; }
    public String getDescription() { return description; }
    public RuleExpression getCondition() { return condition; }
    public List<Action> getActions() { return new ArrayList<>(actions); }
    
    @Override
    public String toString() {
        return "规则[name='" + name + "', description='" + description + "', condition=" + condition + "]";
    }
}

// 动作接口
public interface Action {
    void execute(RuleContext context);
    String getActionString();
}

// 具体动作：设置事实值
public class SetFactAction implements Action {
    private String factName; // 事实名称
    private Object value; // 要设置的值
    
    public SetFactAction(String factName, Object value) {
        this.factName = factName;
        this.value = value;
    }
    
    @Override
    public void execute(RuleContext context) {
        System.out.println("  执行动作: 设置 " + factName + " = " + value);
        context.setFact(factName, value);
    }
    
    @Override
    public String getActionString() {
        return "set " + factName + " = " + value;
    }
}

// 具体动作：添加消息
public class AddMessageAction implements Action {
    private String messageKey; // 消息键
    private String message; // 消息内容
    
    public AddMessageAction(String messageKey, String message) {
        this.messageKey = messageKey;
        this.message = message;
    }
    
    @Override
    @SuppressWarnings("unchecked")
    public void execute(RuleContext context) {
        System.out.println("  执行动作: 添加消息 - " + message);
        
        // 获取或创建消息列表
        List<String> messages;
        if (context.containsFact(messageKey)) {
            messages = context.getFact(messageKey);
        } else {
            messages = new ArrayList<>();
            context.setFact(messageKey, messages);
        }
        
        messages.add(message);
    }
    
    @Override
    public String getActionString() {
        return "add message to " + messageKey + ": \"" + message + "\"";
    }
}

// 规则引擎类
public class RuleEngine {
    private List<Rule> rules = new ArrayList<>(); // 规则列表
    
    // 添加规则
    public RuleEngine addRule(Rule rule) {
        rules.add(rule);
        return this; // 支持链式调用
    }
    
    // 执行所有规则
    public int executeAll(RuleContext context) {
        System.out.println("===== 开始执行规则引擎 =====");
        System.out.println("上下文状态: " + context);
        System.out.println("规则数量: " + rules.size());
        System.out.println();
        
        int firedRules = 0; // 触发的规则数量
        
        // 按顺序执行每个规则
        for (Rule rule : rules) {
            if (rule.execute(context)) {
                firedRules++;
            }
        }
        
        System.out.println("===== 规则引擎执行完成 =====");
        System.out.println("触发的规则数量: " + firedRules);
        System.out.println("最终上下文状态: " + context);
        System.out.println();
        
        return firedRules;
    }
    
    // 获取规则数量
    public int getRuleCount() {
        return rules.size();
    }
    
    // 清除所有规则
    public void clearRules() {
        rules.clear();
    }
    
    // 获取所有规则
    public List<Rule> getRules() {
        return new ArrayList<>(rules);
    }
}

// 客户端：规则引擎演示
public class RuleEngineDemo {
    public static void main(String[] args) {
        // 创建规则引擎
        RuleEngine engine = new RuleEngine();
        
        // 创建规则1：VIP客户折扣规则
        Rule vipDiscountRule = new Rule(
            "VIP_DISCOUNT",
            "VIP客户购买金额大于1000元享受9折优惠",
            new AndExpression(
                new ComparisonExpression("isVIP", "==", true),
                new ComparisonExpression("purchaseAmount", ">", 1000)
            )
        );
        vipDiscountRule.addAction(new SetFactAction("discountRate", 0.9));
        vipDiscountRule.addAction(new AddMessageAction("notifications", "VIP客户专享9折优惠"));
        
        // 创建规则2：普通客户折扣规则
        Rule regularDiscountRule = new Rule(
            "REGULAR_DISCOUNT",
            "普通客户购买金额大于2000元享受95折优惠",
            new AndExpression(
                new ComparisonExpression("isVIP", "==", false),
                new ComparisonExpression("purchaseAmount", ">", 2000)
            )
        );
        regularDiscountRule.addAction(new SetFactAction("discountRate", 0.95));
        regularDiscountRule.addAction(new AddMessageAction("notifications", "普通客户大额订单95折优惠"));
        
        // 创建规则3：新客户首单优惠
        Rule newCustomerRule = new Rule(
            "NEW_CUSTOMER",
            "新客户首单享受85折优惠",
            new ComparisonExpression("isNewCustomer", "==", true)
        );
        newCustomerRule.addAction(new SetFactAction("discountRate", 0.85));
        newCustomerRule.addAction(new AddMessageAction("notifications", "新客户首单85折特惠"));
        
        // 创建规则4：促销活动规则
        Rule promotionRule = new Rule(
            "PROMOTION",
            "促销期间所有订单享受98折优惠",
            new ComparisonExpression("isPromotion", "==", true)
        );
        promotionRule.addAction(new SetFactAction("hasPromotion", true));
        
        // 创建规则5：最终折扣计算规则
        Rule finalDiscountRule = new Rule(
            "FINAL_DISCOUNT",
            "根据各种条件计算最终折扣价格",
            new OrExpression(
                new ComparisonExpression("discountRate", "!=", null),
                new ComparisonExpression("hasPromotion", "==", true)
            )
        );
        // 注意：在实际应用中，这个动作可能需要更复杂的计算逻辑
        finalDiscountRule.addAction(new SetFactAction("finalPrice", "需要在运行时计算"));
        finalDiscountRule.addAction(new AddMessageAction("notifications", "已应用所有适用折扣"));
        
        // 添加规则到引擎
        engine.addRule(vipDiscountRule)
              .addRule(regularDiscountRule)
              .addRule(newCustomerRule)
              .addRule(promotionRule)
              .addRule(finalDiscountRule);
        
        System.out.println("===== 规则引擎演示 =====\n");
        
        // 测试场景1：VIP客户大额订单
        System.out.println("===== 测试场景1：VIP客户大额订单 =====");
        RuleContext context1 = new RuleContext();
        context1.setFact("isVIP", true);
        context1.setFact("isNewCustomer", false);
        context1.setFact("purchaseAmount", 1500.0);
        context1.setFact("isPromotion", true);
        context1.setFact("notifications", new ArrayList<String>());
        
        engine.executeAll(context1);
        
        // 测试场景2：普通客户小额订单
        System.out.println("===== 测试场景2：普通客户小额订单 =====");
        RuleContext context2 = new RuleContext();
        context2.setFact("isVIP", false);
        context2.setFact("isNewCustomer", false);
        context2.setFact("purchaseAmount", 800.0);
        context2.setFact("isPromotion", true);
        context2.setFact("notifications", new ArrayList<String>());
        
        engine.executeAll(context2);
        
        // 测试场景3：新客户订单
        System.out.println("===== 测试场景3：新客户订单 =====");
        RuleContext context3 = new RuleContext();
        context3.setFact("isVIP", false);
        context3.setFact("isNewCustomer", true);
        context3.setFact("purchaseAmount", 500.0);
        context3.setFact("isPromotion", false);
        context3.setFact("notifications", new ArrayList<String>());
        
        engine.executeAll(context3);
    }
}
```

## 优缺点

### 优点

- **易于实现简单的语言**：可以方便地实现简单的语言解析器或规则引擎
- **扩展性好**：可以方便地添加新的语法规则和解释器
- **组合性强**：可以通过组合简单的表达式来构建复杂的表达式
- **清晰的结构**：使用面向对象的方式表示语法规则，结构清晰
- **灵活性高**：可以根据需要动态构建表达式树

### 缺点

- **复杂度高**：对于复杂的语法，实现和维护解释器模式可能变得非常复杂
- **性能问题**：递归解释可能导致性能问题，特别是对于复杂的表达式
- **难以调试**：递归的解释过程可能难以调试和跟踪
- **不适合复杂语言**：对于复杂的编程语言，解释器模式可能不是最佳选择

## 与其他模式的关系

- **解释器模式与组合模式**：都使用树形结构来表示对象的组合，但解释器模式关注的是解释和执行，组合模式关注的是对象的组合结构
- **解释器模式与访问者模式**：都可以用于遍历和处理树形结构，但访问者模式更关注于操作的分离，解释器模式更关注于语言的解释
- **解释器模式与工厂方法模式**：工厂方法模式可以用来创建解释器对象
- **解释器模式与策略模式**：都可以封装算法，但策略模式关注的是算法的选择，解释器模式关注的是语言的解释

## 总结

解释器模式是一种用于实现简单语言解析器或规则引擎的行为型设计模式。它将语言中的每个语法规则表示为一个对象，然后通过组合这些对象来表示复杂的语法结构。解释器模式特别适用于需要实现简单的特定领域语言(DSL)、规则引擎、配置文件解析等场景。在使用解释器模式时，需要注意对于复杂的语法，可能会导致实现和维护变得非常复杂，此时可能需要考虑使用其他方法，如编译器生成工具或更专业的解析器生成器。