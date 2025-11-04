# 栈与队列

**作者：张帅**

栈和队列的区别是栈是先进后出，队列是先进先出。

## 栈

栈就像一个很窄的瓶子，要想拿出最里面的物体，就要先拿出外边的物体。

```c++
#include <iostream>
#include <stack>

int main(){
stack<int> stk; // 栈的定义
stk.empty();    // 返回类型为bool类型 若stk为空，则返回1，否则返回0。
stk.top();      // 返回栈顶的元素。
stk.pop();      // 将栈顶的元素进行出栈操作
stk.push(1);    // 将整数1进行入栈操作。 
return 0;
}
```

## 队列

队列则是像一个很窄的通道，物体只能从入口入，出口出，先进去的自然先出来。

```c++
#include <iostream>
#include <queue>

int main(){
queue<int>q; //定义存储整数类型的队列q
    
q.front()    //返回队头元素
q.end()      //返回队尾元素
q.pop()      //将队头元素进行出队操作
q.push(1)    //队尾加入整数1
}
```

栈和队列的常见基础语法就这么多，遇到的时候要活学活用。

