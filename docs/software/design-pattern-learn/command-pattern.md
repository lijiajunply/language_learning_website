# 命令模式 (Command Pattern)

## 概述

命令模式是一种行为型设计模式，它将请求封装为一个对象，从而使你可以用不同的请求参数化客户端对象，对请求排队或记录请求日志，以及支持可撤销的操作。

命令模式的核心思想是将请求的发起者（调用者）与请求的接收者（执行者）解耦，通过一个命令对象来连接它们。这样，调用者不需要知道接收者的具体实现，只需要知道如何使用命令对象即可。

## 核心要点

- **请求封装**：将请求封装为一个对象
- **解耦调用者和接收者**：调用者不需要知道接收者的具体实现
- **支持可撤销操作**：命令对象可以记录执行状态，支持撤销和重做
- **支持事务**：可以将多个命令组合成一个复合命令，实现事务功能
- **支持队列**：可以将命令放入队列中，按顺序执行

## 应用场景

- **需要将请求的发起者与接收者解耦时**
- **需要支持可撤销操作时**
- **需要支持事务处理时**
- **需要将请求排队或记录请求日志时**
- **需要支持命令宏（将多个命令组合成一个命令）时**

## 结构

命令模式包含以下角色：

1. **命令（Command）**：定义执行操作的接口
2. **具体命令（Concrete Command）**：实现命令接口，持有接收者对象的引用，执行具体的操作
3. **接收者（Receiver）**：执行命令的真正对象，知道如何执行与命令相关的操作
4. **调用者（Invoker）**：持有命令对象的引用，调用命令对象执行请求
5. **客户端（Client）**：创建具体命令对象，并设置其接收者

## 实现示例

### 1. 基本命令模式实现

```java
// 命令接口
public interface Command {
    void execute(); // 执行命令
    void undo(); // 撤销命令
}

// 接收者：灯
public class Light {
    private String location;
    private boolean isOn = false;
    
    public Light(String location) {
        this.location = location;
    }
    
    public void on() {
        isOn = true;
        System.out.println(location + " 的灯已打开");
    }
    
    public void off() {
        isOn = false;
        System.out.println(location + " 的灯已关闭");
    }
    
    public boolean isOn() {
        return isOn;
    }
}

// 接收者：音响
public class Stereo {
    private String location;
    private int volume = 0;
    private boolean isOn = false;
    
    public Stereo(String location) {
        this.location = location;
    }
    
    public void on() {
        isOn = true;
        System.out.println(location + " 的音响已打开");
    }
    
    public void off() {
        isOn = false;
        System.out.println(location + " 的音响已关闭");
    }
    
    public void setCD() {
        System.out.println(location + " 的音响已设置为CD模式");
    }
    
    public void setVolume(int volume) {
        this.volume = volume;
        System.out.println(location + " 的音响音量已设置为 " + volume);
    }
}

// 具体命令：开灯命令
public class LightOnCommand implements Command {
    private Light light; // 持有接收者对象的引用
    
    public LightOnCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.on();
    }
    
    @Override
    public void undo() {
        light.off();
    }
}

// 具体命令：关灯命令
public class LightOffCommand implements Command {
    private Light light; // 持有接收者对象的引用
    
    public LightOffCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.off();
    }
    
    @Override
    public void undo() {
        light.on();
    }
}

// 具体命令：打开音响命令
public class StereoOnWithCDCommand implements Command {
    private Stereo stereo; // 持有接收者对象的引用
    private int previousVolume; // 记录之前的音量，用于撤销
    
    public StereoOnWithCDCommand(Stereo stereo) {
        this.stereo = stereo;
    }
    
    @Override
    public void execute() {
        previousVolume = stereo.getVolume(); // 记录之前的音量
        stereo.on();
        stereo.setCD();
        stereo.setVolume(11); // 设置新的音量
    }
    
    @Override
    public void undo() {
        stereo.off(); // 关闭音响
        // 如果需要恢复到之前的状态，可以：
        // stereo.on();
        // stereo.setVolume(previousVolume);
    }
}

// 具体命令：关闭音响命令
public class StereoOffCommand implements Command {
    private Stereo stereo; // 持有接收者对象的引用
    
    public StereoOffCommand(Stereo stereo) {
        this.stereo = stereo;
    }
    
    @Override
    public void execute() {
        stereo.off();
    }
    
    @Override
    public void undo() {
        stereo.on();
        stereo.setCD();
        stereo.setVolume(11);
    }
}

// 空命令（用于初始化按钮，避免空指针异常）
public class NoCommand implements Command {
    @Override
    public void execute() {
        // 什么都不做
    }
    
    @Override
    public void undo() {
        // 什么都不做
    }
}

// 调用者：遥控器
public class RemoteControl {
    private Command[] onCommands; // 开命令数组
    private Command[] offCommands; // 关命令数组
    private Command undoCommand; // 撤销命令
    private final int SLOTS = 7; // 遥控器有7个按钮槽
    
    public RemoteControl() {
        // 初始化命令数组，使用空命令避免空指针异常
        onCommands = new Command[SLOTS];
        offCommands = new Command[SLOTS];
        
        Command noCommand = new NoCommand();
        for (int i = 0; i < SLOTS; i++) {
            onCommands[i] = noCommand;
            offCommands[i] = noCommand;
        }
        
        undoCommand = noCommand;
    }
    
    // 设置按钮命令
    public void setCommand(int slot, Command onCommand, Command offCommand) {
        if (slot >= 0 && slot < SLOTS) {
            onCommands[slot] = onCommand;
            offCommands[slot] = offCommand;
        }
    }
    
    // 按下开按钮
    public void onButtonWasPushed(int slot) {
        if (slot >= 0 && slot < SLOTS) {
            onCommands[slot].execute();
            undoCommand = onCommands[slot]; // 记录最后一次执行的命令
        }
    }
    
    // 按下关按钮
    public void offButtonWasPushed(int slot) {
        if (slot >= 0 && slot < SLOTS) {
            offCommands[slot].execute();
            undoCommand = offCommands[slot]; // 记录最后一次执行的命令
        }
    }
    
    // 按下撤销按钮
    public void undoButtonWasPushed() {
        undoCommand.undo();
    }
    
    // 打印遥控器状态
    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("\n------ 遥控器 ------\n");
        for (int i = 0; i < SLOTS; i++) {
            stringBuilder.append("[槽 ")
                       .append(i)
                       .append("] ")
                       .append(onCommands[i].getClass().getSimpleName())
                       .append("    ")
                       .append(offCommands[i].getClass().getSimpleName())
                       .append("\n");
        }
        stringBuilder.append("[撤销] ")
                   .append(undoCommand.getClass().getSimpleName())
                   .append("\n");
        return stringBuilder.toString();
    }
}

// 客户端
public class RemoteLoader {
    public static void main(String[] args) {
        // 创建遥控器（调用者）
        RemoteControl remoteControl = new RemoteControl();
        
        // 创建接收者
        Light livingRoomLight = new Light("客厅");
        Light kitchenLight = new Light("厨房");
        Stereo livingRoomStereo = new Stereo("客厅");
        
        // 创建命令，设置接收者
        LightOnCommand livingRoomLightOn = new LightOnCommand(livingRoomLight);
        LightOffCommand livingRoomLightOff = new LightOffCommand(livingRoomLight);
        LightOnCommand kitchenLightOn = new LightOnCommand(kitchenLight);
        LightOffCommand kitchenLightOff = new LightOffCommand(kitchenLight);
        StereoOnWithCDCommand stereoOnWithCD = new StereoOnWithCDCommand(livingRoomStereo);
        StereoOffCommand stereoOff = new StereoOffCommand(livingRoomStereo);
        
        // 设置遥控器按钮的命令
        remoteControl.setCommand(0, livingRoomLightOn, livingRoomLightOff);
        remoteControl.setCommand(1, kitchenLightOn, kitchenLightOff);
        remoteControl.setCommand(2, stereoOnWithCD, stereoOff);
        
        // 打印遥控器状态
        System.out.println(remoteControl);
        
        // 测试按钮功能
        System.out.println("\n--- 测试按钮功能 ---");
        remoteControl.onButtonWasPushed(0); // 打开客厅灯
        remoteControl.offButtonWasPushed(0); // 关闭客厅灯
        remoteControl.onButtonWasPushed(1); // 打开厨房灯
        remoteControl.offButtonWasPushed(1); // 关闭厨房灯
        remoteControl.onButtonWasPushed(2); // 打开客厅音响并播放CD
        remoteControl.offButtonWasPushed(2); // 关闭客厅音响
        
        // 测试撤销功能
        System.out.println("\n--- 测试撤销功能 ---");
        remoteControl.onButtonWasPushed(0); // 打开客厅灯
        remoteControl.undoButtonWasPushed(); // 撤销，关闭客厅灯
        
        remoteControl.onButtonWasPushed(2); // 打开客厅音响并播放CD
        remoteControl.undoButtonWasPushed(); // 撤销，关闭客厅音响
    }
}
```

## 实际应用示例：文本编辑器的操作历史

下面是一个实际应用的例子，展示如何使用命令模式实现文本编辑器的撤销/重做功能：

```java
import java.util.Stack;

// 命令接口
public interface EditorCommand {
    void execute(); // 执行命令
    void undo(); // 撤销命令
}

// 接收者：文本编辑器
public class TextEditor {
    private StringBuilder text = new StringBuilder();
    private int cursorPosition = 0;
    
    // 插入文本
    public void insertText(String textToInsert) {
        text.insert(cursorPosition, textToInsert);
        cursorPosition += textToInsert.length();
        System.out.println("插入文本: \"" + textToInsert + "\"");
        display();
    }
    
    // 删除文本
    public String deleteText(int length) {
        if (length <= 0 || cursorPosition - length < 0) {
            return "";
        }
        
        String deletedText = text.substring(cursorPosition - length, cursorPosition);
        text.delete(cursorPosition - length, cursorPosition);
        cursorPosition -= length;
        System.out.println("删除文本: \"" + deletedText + "\"");
        display();
        return deletedText;
    }
    
    // 设置光标位置
    public void setCursorPosition(int position) {
        if (position >= 0 && position <= text.length()) {
            cursorPosition = position;
            System.out.println("光标位置设置为: " + position);
            display();
        }
    }
    
    // 显示编辑器内容
    public void display() {
        System.out.println("编辑器内容: \"" + text + "\"");
        System.out.println("光标位置: " + cursorPosition);
    }
    
    // 获取文本内容
    public String getText() {
        return text.toString();
    }
    
    // 获取光标位置
    public int getCursorPosition() {
        return cursorPosition;
    }
}

// 具体命令：插入文本命令
public class InsertTextCommand implements EditorCommand {
    private TextEditor editor; // 文本编辑器
    private String textToInsert; // 要插入的文本
    private int position; // 插入位置
    
    public InsertTextCommand(TextEditor editor, String textToInsert) {
        this.editor = editor;
        this.textToInsert = textToInsert;
        this.position = editor.getCursorPosition(); // 记录当前光标位置
    }
    
    @Override
    public void execute() {
        editor.setCursorPosition(position); // 设置光标到插入位置
        editor.insertText(textToInsert); // 插入文本
    }
    
    @Override
    public void undo() {
        // 撤销插入操作，删除刚刚插入的文本
        editor.setCursorPosition(position + textToInsert.length());
        editor.deleteText(textToInsert.length());
    }
}

// 具体命令：删除文本命令
public class DeleteTextCommand implements EditorCommand {
    private TextEditor editor; // 文本编辑器
    private String deletedText; // 被删除的文本
    private int position; // 删除前的光标位置
    
    public DeleteTextCommand(TextEditor editor, int length) {
        this.editor = editor;
        this.position = editor.getCursorPosition(); // 记录删除前的光标位置
        this.deletedText = editor.deleteText(length); // 执行删除操作
    }
    
    @Override
    public void execute() {
        // 再次执行删除操作
        editor.setCursorPosition(position);
        editor.deleteText(deletedText.length());
    }
    
    @Override
    public void undo() {
        // 撤销删除操作，重新插入被删除的文本
        editor.setCursorPosition(position - deletedText.length());
        editor.insertText(deletedText);
    }
}

// 具体命令：移动光标命令
public class MoveCursorCommand implements EditorCommand {
    private TextEditor editor; // 文本编辑器
    private int oldPosition; // 移动前的光标位置
    private int newPosition; // 移动后的光标位置
    
    public MoveCursorCommand(TextEditor editor, int newPosition) {
        this.editor = editor;
        this.oldPosition = editor.getCursorPosition(); // 记录移动前的光标位置
        this.newPosition = newPosition; // 设置新的光标位置
    }
    
    @Override
    public void execute() {
        editor.setCursorPosition(newPosition); // 移动光标
    }
    
    @Override
    public void undo() {
        editor.setCursorPosition(oldPosition); // 恢复到移动前的位置
    }
}

// 调用者：编辑器控制器
public class EditorController {
    private Stack<EditorCommand> undoStack = new Stack<>(); // 撤销栈
    private Stack<EditorCommand> redoStack = new Stack<>(); // 重做栈
    private TextEditor editor; // 文本编辑器
    
    public EditorController(TextEditor editor) {
        this.editor = editor;
    }
    
    // 执行命令
    public void executeCommand(EditorCommand command) {
        command.execute(); // 执行命令
        undoStack.push(command); // 将命令加入撤销栈
        redoStack.clear(); // 清空重做栈
    }
    
    // 撤销命令
    public void undo() {
        if (!undoStack.isEmpty()) {
            EditorCommand command = undoStack.pop(); // 从撤销栈中弹出命令
            command.undo(); // 执行撤销操作
            redoStack.push(command); // 将命令加入重做栈
            System.out.println("撤销操作完成");
        } else {
            System.out.println("没有可撤销的操作");
        }
    }
    
    // 重做命令
    public void redo() {
        if (!redoStack.isEmpty()) {
            EditorCommand command = redoStack.pop(); // 从重做栈中弹出命令
            command.execute(); // 重新执行命令
            undoStack.push(command); // 将命令加入撤销栈
            System.out.println("重做操作完成");
        } else {
            System.out.println("没有可重做的操作");
        }
    }
    
    // 显示编辑历史
    public void displayHistory() {
        System.out.println("\n撤销历史:");
        if (undoStack.isEmpty()) {
            System.out.println("  空");
        } else {
            for (int i = undoStack.size() - 1; i >= 0; i--) {
                System.out.println("  " + (undoStack.size() - i) + ": " + undoStack.get(i).getClass().getSimpleName());
            }
        }
        
        System.out.println("\n重做历史:");
        if (redoStack.isEmpty()) {
            System.out.println("  空");
        } else {
            for (int i = redoStack.size() - 1; i >= 0; i--) {
                System.out.println("  " + (redoStack.size() - i) + ": " + redoStack.get(i).getClass().getSimpleName());
            }
        }
        System.out.println();
    }
}

// 客户端：文本编辑器用户
public class TextEditorDemo {
    public static void main(String[] args) {
        // 创建文本编辑器
        TextEditor editor = new TextEditor();
        // 创建编辑器控制器
        EditorController controller = new EditorController(editor);
        
        // 执行编辑操作
        System.out.println("=== 执行编辑操作 ===");
        controller.executeCommand(new InsertTextCommand(editor, "Hello"));
        controller.executeCommand(new InsertTextCommand(editor, " World"));
        controller.executeCommand(new MoveCursorCommand(editor, 5)); // 移动到"Hello"后
        controller.executeCommand(new InsertTextCommand(editor, ","));
        
        // 显示历史
        controller.displayHistory();
        
        // 执行撤销操作
        System.out.println("=== 执行撤销操作 ===");
        controller.undo(); // 撤销插入逗号
        controller.undo(); // 撤销移动光标
        
        // 显示历史
        controller.displayHistory();
        
        // 执行重做操作
        System.out.println("=== 执行重做操作 ===");
        controller.redo(); // 重做移动光标
        controller.redo(); // 重做插入逗号
        
        // 显示历史
        controller.displayHistory();
        
        // 执行删除操作
        System.out.println("=== 执行删除操作 ===");
        controller.executeCommand(new MoveCursorCommand(editor, 12)); // 移动到末尾
        controller.executeCommand(new DeleteTextCommand(editor, 6)); // 删除"World"
        
        // 显示历史
        controller.displayHistory();
        
        // 执行撤销删除
        System.out.println("=== 撤销删除 ===");
        controller.undo(); // 撤销删除操作
        
        // 最终结果
        System.out.println("\n=== 最终结果 ===");
        editor.display();
    }
}
```

## 优缺点

### 优点

- **解耦调用者和接收者**：调用者不需要知道接收者的具体实现
- **支持可撤销操作**：命令对象可以记录执行状态，支持撤销和重做
- **支持事务**：可以将多个命令组合成一个复合命令，实现事务功能
- **支持队列**：可以将命令放入队列中，按顺序执行
- **符合开闭原则**：添加新的命令不需要修改现有代码

### 缺点

- **增加了类的数量**：每个命令都需要一个对应的命令类，增加了系统中类的数量
- **命令对象可能会占用大量内存**：特别是当系统中有大量命令对象时
- **可能会导致系统变得复杂**：特别是当需要支持多级撤销和重做时

## 与其他模式的关系

- **命令模式与组合模式**：可以使用组合模式创建复合命令
- **命令模式与备忘录模式**：都支持撤销操作，但命令模式关注的是操作的撤销，备忘录模式关注的是状态的恢复
- **命令模式与原型模式**：可以使用原型模式复制命令对象，用于撤销和重做

## 总结

命令模式是一种强大的行为型设计模式，它将请求封装为一个对象，从而使请求的发起者与接收者解耦。命令模式支持可撤销操作、事务处理、请求排队等功能，在实际应用中广泛用于GUI操作、数据库事务、日志记录等场景。使用命令模式需要注意控制命令对象的数量和内存占用，避免系统变得过于复杂。