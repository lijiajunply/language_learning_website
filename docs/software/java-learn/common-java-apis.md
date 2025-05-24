# **第十章：Java 常用 API**

## **10.1 字符串处理**

在 Java 中，字符串是常见的数据类型。Java 提供了丰富的 API 来处理字符串，包括 String、StringBuilder 和 StringBuffer 等类。

### **10.1.1 String 类**

String 是不可变的字符序列。每次对 String 进行修改时，都会创建一个新的字符串对象，因此在频繁修改字符串的情况下，效率较低。

```java
String str = "Hello, World!";
String upperStr = str.toUpperCase();  // 转换为大写

```

### **10.1.2 StringBuilder 与 StringBuffer**

StringBuilder 和 StringBuffer 都是可变的字符序列，提供了对字符串进行修改的能力。它们的区别在于：StringBuffer 是线程安全的，而 StringBuilder 是不安全的，但在单线程情况下性能更好。

- StringBuilder 示例：

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World!");  // 字符串拼接
System.out.println(sb.toString());

```

- StringBuffer 示例：

```java
StringBuffer sbf = new StringBuffer("Hello");
sbf.append(" World!");  // 字符串拼接
System.out.println(sbf.toString());

```

StringBuilder 和 StringBuffer 适合用于字符串拼接、插入和删除等操作。

## **10.2 集合框架**

Java 提供了强大的集合框架，用于存储和操作数据。常见的集合接口包括 List、Set、Map 和 Queue。

### **10.2.1 List**

List 是一个有序集合，允许元素重复。常见的实现类有 ArrayList 和 LinkedList。

- ArrayList 示例：

```java
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Apple");
System.out.println(list);  // 输出：[Apple, Banana, Apple]

```

### **10.2.2 Set**

Set 是一个无序集合，不能包含重复元素。常见的实现类有 HashSet 和 TreeSet。

- HashSet 示例：

```java
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Banana");
set.add("Apple");  // 重复元素不会被添加
System.out.println(set);  // 输出：[Apple, Banana]

```

### **10.2.3 Map**

Map 是一个键值对集合，键是唯一的。常见的实现类有 HashMap 和 TreeMap。

- HashMap 示例：

```java
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 1);
map.put("Banana", 2);
map.put("Orange", 3);
System.out.println(map);  // 输出：{Apple=1, Banana=2, Orange=3}

```

### **10.2.4 Queue**

Queue 是一个先进先出的集合。常见的实现类有 LinkedList 和 PriorityQueue。

- LinkedList 示例：

```java
Queue<String> queue = new LinkedList<>();
queue.add("Apple");
queue.add("Banana");
queue.add("Orange");
System.out.println(queue.poll());  // 输出并移除第一个元素：Apple

```

## **10.3 IO 处理**

Java 提供了丰富的输入输出 (IO) API，用于文件操作和数据处理。

### **10.3.1 File 类**

File 类表示文件和目录的路径。它可以用来创建、删除文件，判断文件是否存在等。

```java
File file = new File("example.txt");
if (file.exists()) {
    System.out.println("文件存在");
} else {
    System.out.println("文件不存在");
}

```

### **10.3.2 BufferedReader 与 BufferedWriter**

BufferedReader 和 BufferedWriter 提供了高效的字符流读写方式，适用于读取和写入文本文件。

- BufferedReader 示例：

```java
BufferedReader reader = new BufferedReader(new FileReader("example.txt"));
String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}
reader.close();

```

- BufferedWriter 示例：

```java
BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"));
writer.write("Hello, World!");
writer.newLine();
writer.close();

```

## **10.4 日期时间**

Java 8 引入了新的日期时间 API，包括 LocalDate、LocalTime 和 DateTimeFormatter 等类，提供了更强大和灵活的日期时间操作能力。

### **10.4.1 LocalDate 与 LocalTime**

LocalDate 表示日期（不含时间），LocalTime 表示时间（不含日期）。它们是不可变的对象。

```java
LocalDate date = LocalDate.of(2023, 3, 2);  // 创建一个特定的日期
LocalTime time = LocalTime.of(14, 30);  // 创建一个特定的时间
System.out.println(date);  // 输出：2023-03-02
System.out.println(time);  // 输出：14:30

```

### **10.4.2 DateTimeFormatter**

DateTimeFormatter 用于格式化和解析日期时间。

```java
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
LocalDate date = LocalDate.now();
String formattedDate = date.format(formatter);  // 格式化日期
System.out.println(formattedDate);  // 输出：2025-03-02

```

DateTimeFormatter 还可以用来解析字符串为日期时间对象。

```java
String dateString = "2025-03-02";
LocalDate parsedDate = LocalDate.parse(dateString, formatter);
System.out.println(parsedDate);  // 输出：2025-03-02

```

## **总结**

- 字符串处理：Java 提供了 String、StringBuilder 和 StringBuffer 来处理字符串，StringBuilder 和 StringBuffer 更适用于频繁修改字符串的情况。

- 集合框架：Java 的集合框架包括 List、Set、Map 和 Queue，这些集合接口提供了丰富的操作数据的能力。

- IO 处理：Java 提供了强大的 IO 类库，如 File、BufferedReader 和 BufferedWriter，用于文件和数据流的读写。

- 日期时间：Java 8 引入了新的日期时间 API，如 LocalDate、LocalTime 和 DateTimeFormatter，使得日期时间的操作更加简洁和灵活。

掌握这些常用的 API 将使得你能够高效地处理 Java 中的常见任务，如字符串操作、集合操作、文件处理和日期时间操作。