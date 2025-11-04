# 递归

**作者：张帅**

## 概念  

递归是一种通过函数调用自身来解决问题的编程技巧，它将问题分解为更小的同类子问题，直到达到一个可以直接解决的基础条件。

  简而言之，递归可以理解为函数自己调用自己。

  那么问题来了，如果函数反复调用自己，那就会陷入一个死循环，进去就出不来了。因此我们要设置一个函数返回的条件，即当满足当前条件时，我们就可以让函数结束。

  深度优先搜索就是递归的一种（代码如下）。

```c++
void dfs(int x)
{
    visited[x] = 1; //dfs中只需要开头写一个v[x]=1 后面for循环遍历路径不用v[x]=1
    for (int i = 0; i < edge[x].size(); i ++)
    {
        int next_node = edge[x][i];
        if (visted[next_node]) continue;
        dfs(next_node);
}
```

  那么为什么这个深度优先搜索程序没有终止条件呢？

  **答**：如果我们不想要在二叉树中搜索到具体的某一个值，只是想把一颗二叉树从根节点遍历完，我们就不需要设置终止条件，当函数遍历完二叉树会因为搜索不到新的结点而被迫终止；如果我们想要在二叉树中搜索到具体的某一个值，我们就可以在原程序基础上加一个条件判断即可，代码如下：

```c++
void dfs(int x)
{	if(bl==true||x==target){
    bl=1;
    return ;
	};
    visited[x] = 1; //dfs中只需要开头写一个v[x]=1 后面for循环遍历路径不用v[x]=1
    for (int i = 0; i < edge[x].size(); i ++)
    {
        int next_node = edge[x][i];
        if (visted[next_node]) continue;
        dfs(next_node);
}
```

## 例题

[P10448 组合型枚举](https://www.luogu.com.cn/problem/P10448)

```c++
#include <iostream>

using namespace std;
const int N=55;
int path[N];
int n,m;

void dfs(int cnt,int last){
	if(cnt==m+1){
	for(int i=1;i<=m;++i){
		cout<<path[i]<<' ';
	}	
	cout<<endl;
	return ;
	}
	for(int i=last;i<=n;++i){
		path[cnt]=i;
		dfs(cnt+1,i+1);
	}
}

int main(){
cin>>n>>m;	
	dfs(1,1);
	return 0;
}
```

#### [B3622 枚举子集](https://www.luogu.com.cn/problem/B3622)

```c++
#include <iostream>

using namespace std;
int n;
char path[12]; 
void dfs(int cnt){
	if(cnt==n){
		for(int i=0;i<n;i++)cout<<path[i];
		cout<<endl;
		return ; 
	}
	char tem=path[cnt];
	path[cnt]='N';
	dfs(cnt+1);
	path[cnt]=tem;
	path[cnt]='Y';
	dfs(cnt+1);
	path[cnt]=tem;
}
int main(){
	cin>>n;
	dfs(0); 
	return 0;
} 
```

