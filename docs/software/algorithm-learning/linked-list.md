# 链表

可以把链表想象成一条链子，链子上有许多节点，每个节点有对应的值（value）。

C++标准库中并没有链表，因此我们需要自己来定义。

链表的定义也较为简单，主要通过结构体来实现。（[结构体的详解（想要彻底了解结构体，那么看这一篇就够了！）-CSDN博客](https://blog.csdn.net/2302_80198073/article/details/136918204?ops_request_misc=%7B%22request%5Fid%22%3A%2286a07b5c22172461c03cb1ab0f777e47%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=86a07b5c22172461c03cb1ab0f777e47&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-136918204-null-null.142^v102^control&utm_term=结构体&spm=1018.2226.3001.4187)）

## **定义**

```c++
struct Node
{
    int value; // 数据
    Node *prev, *next;  // 前驱与后驱的指针
}；
```

## **链表的建立**

### 正向建立

```c++
head->next=tail;
while ((scanf_s("%d", &k), k) != 0) {//输入数据 不为零 则继续运行
       stu* p1 = new stu();//开辟内存空间
        if (tail == NULL)tail = p1;//tail为空则让其为头
        else p2->next = p1;//tail 不为空 则继续向后走
        p1->next = NULL;//链尾为空
        p1->val = k;
        scanf_s("%d", &p1->s);//输入数据
        p2 = p1;
}
```

### 反向建立

```c++
for(int i=n-1;i>=1;i--){
        node* p=new node();
        p->next=head;
        p->val=i;
        head=p;
}
```

## 链表的插入

```c++
void insert(Node *p, Node * q)
{
    q -> next = p -> next;
    p -> next = q;
}
```

## 删除下一个结点

```c++
void delete(Node *p)
{
p->value=p->next->value;
p->next=p->next->next;
}
```

```c++
void delete(Node *p)
{
    p->next = p -> next -> next;
}
```

删除下一个结点的代码并不复杂，但是试想如果头结点head有value，但要删除头结点，令人无从下手。

因此在前面定义链表时，我们让head无value，head只是起到一个指针的作用，即head的指向的结点才为真正的头结点，当我们想删除

真正的头结点时，我们只需要删除head的下一个结点，操作较为容易。因此我们在定义链表时常让head无value。



## 代码实战:

[P1996 约瑟夫问题](https://www.luogu.com.cn/problem/P1996)

```c++
#include <iostream>

using namespace std;
int n,m;
struct node{       //结构体的定义
	int val;
	node* next;
};
int main(){
	cin>>n>>m;
	node *head=new node();
	node *tail=head;
	for(int i=n;i>=1;--i){  // 反向建立链表
		node *p=new node();
		p->next=head;
		head->val=i;
		if(i!=1)head=p;
	}
	tail->next=head;        //成为闭环
	int cnt=0;              //记录当前结点的序号数
	int res=0;              //记录当前出列了多少人
	node *cur=head;
	node *last=tail;
	while(res<n){   
		cnt++;              //链表每向后一次，序号数+1 
		if(cnt==m){         //如果序号数符号条件
			cout<<cur->val<<' ';  //先输出当前值
			last->next=cur->next; //删除cur
			cur=cur->next;        //cur向后移动一位
			res++;
			cnt=0;
		}
		else {
			last=last->next;      //cur last均向后移动
			cur=cur->next;
		}
	}
	return 0;
}
```

