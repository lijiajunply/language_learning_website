# 哈希表

| **集合**           | **底层实现** | **是否有序** | **数值是否可以重复** | **能否更改数值** | **查询效率** | **增删效率** |
| ------------------ | ------------ | ------------ | -------------------- | ---------------- | ------------ | ------------ |
| std::set           | 红黑树       | 有序         | 否                   | 否               | O(log n)     | O(log n)     |
| std::multiset      | 红黑树       | 有序         | 是                   | 否               | O(logn)      | O(logn)      |
| std::unordered_set | 哈希表       | 无序         | 否                   | 否               | O(1)         | O(1)         |
| **映射**           | **底层实现** | **是否有序** | **数值是否可以重复** | **能否更改数值** | **查询效率** | **增删效率** |
| std::map           | 红黑树       | key有序      | key不可重复          | key不可修改      | O(logn)      | O(logn)      |
| std::multimap      | 红黑树       | key有序      | key可重复            | key不可修改      | O(log n)     | O(log n)     |
| std::unordered_map | 哈希表       | key无序      | key不可重复          | key不可修改      | O(1)         | O(1)         |

上述图标中只有unordered_map和unordered_set两种集合的底层实现是使用了哈希表,我们主要来学习这两种集合。

map,multimap,unordered_map其实写的时候只有定义不太一样，其他用法都一致。（主要区别在查询效率和增删效率）。

set,multiset,unordered_set同理。



## **unordered_map**

定义：

unordered_map<key,val>m; // 定义了一个unordered_map类型的变量m。

unordered_map 是存储 <key, value> 键值对 的关联式容器，其允许通过keys快速的索引到与其对应的value。

使用

m.size() //元素个数          

m.empty()//是否为空

m.clear()//清空

m.begin()//首迭代器

m.end()//尾迭代器

详细使用方法：[【C++】unordered_map 容器的最全解析（什么是unordered_map?unordered_map的常用接口有那些？）_unorderedmap-CSDN博客](https://blog.csdn.net/weixin_45031801/article/details/142033774?ops_request_misc=%7B%22request%5Fid%22%3A%2217a777185907d4434bc03453ae261d55%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=17a777185907d4434bc03453ae261d55&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-142033774-null-null.142^v102^control&utm_term=unordered_map&spm=1018.2226.3001.4187)

算法实战中unordered_map经常起到记录变量是否出现以及出现次数

例如：

```c++
#include <iostream>
#include <unordered_map>

using namespace std;
const int N=1e3+3;
int a[N];
int n;
unordered_map<int,int>m;
int main(){
	cin>>n;
	for(int i=1;i<=n;++i){
	cin>>a[i];
	m[a[i]]++;
	}
	return 0;
} 
```

## **unordered_set**

定义：

```cpp
const int N=1e3+3;

unordered_set<key>s[N];  //定义一个unordered_set类型的变量s 
```

其他用法可参考：[C++总结(7)：STL无序容器之unordered_set、unordered_map、unordered_multiset、unordered_multimap详解_无序互异容器-CSDN博客](https://blog.csdn.net/tilblackout/article/details/134172656?ops_request_misc=%7B%22request%5Fid%22%3A%22053cb80fbc60d34cc2fc0550c489cd3e%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=053cb80fbc60d34cc2fc0550c489cd3e&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-134172656-null-null.142^v102^control&utm_term=unordered_set&spm=1018.2226.3001.4187)

算法实战：

[P3879 [TJOI2010] 阅读理解](https://www.luogu.com.cn/problem/P3879)

```c++
#include <iostream>
#include <unordered_set>
#include <cstring> 

using namespace std;
const int N=1e5+3;
unordered_set<string>m[N];
int n,l,mm;
  
int main(){
cin>>n;
for(int i=1;i<=n;++i){
 	cin>>l;
 	while(l--){
 		string s;
 		cin>>s;
 		m[i].insert(s);
	}
} 
cin>>mm;
while(mm--){
 	string s;
		cin>>s;
 	for(int i=1;i<=n;++i){
 		if(m[i].find(s)!=m[i].end())cout<<i<<' ';  
	} 
	cout<<endl;
}	
 	return 0;
}
```

