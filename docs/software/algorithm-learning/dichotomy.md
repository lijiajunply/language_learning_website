# 二分

**（为防止出错** l**起始值定为**1**）(若有题干出现** **不存在则输出0** **则起始为0)**

**（注意二分的前提是数组有序）**

## **整数二分模版 1**

适用于求满足要求的数中最小的值

```C++
while (l < r)
{
    int mid = (l + r) / 2;
    if (a[mid] >= x) r = mid;
    else l = mid + 1;
}
```

若数组中数均大于目标数，且数组内无目标数，l和r最终落到0

若数组中数均小于目标数，且数组内无目标数，l和r最终落到最后一位

若数组中不存在目标数 l落在目标右侧

## **整数二分模版 2**

适用于求满足要求的树中最大的值

```C++
while (l < r)
{
    int mid = (l + r + 1) / 2;   
    if (a[mid] <= x) l = mid;
    else r = mid - 1; 
}
```

若数组中数均大于目标数，且数组内无目标数，l和r最终落到0

若数组中数均小于目标数，且数组内无目标数，l和r最终落到最后一位

若数组中不存在目标数 l落在目标左侧

## **二分答案**

```C++
while (l < r)
{
    int mid = (l + r) / 2;
    if (check（）) r = mid;  //check()函数为返回值bool类型的函数，根据题目要求进行填写。
    else l = mid + 1;
}
```

**二分搜索实战**

##### [洛谷：P2249 查找](https://www.luogu.com.cn/problem/P2249)

```C++
#include <iostream>
#include <cstdio>
using namespace std;

int n, m;
const int N = 1e6 + 10;
int a[N];

int main()
{       //进行输入
        cin >> n >> m; 
        for (int i = 1; i <= n; i ++) cin >> a[i];
        
        while (m --) //查询m次
        {
                int q;
                cin >> q;
                int l = 1, r = n;
                while (l < r)  //二分模板
                {
                        int mid = (l + r) / 2;
                        if (a[mid] >= q) r = mid;
                        else l = mid + 1;
                }
                if (a[l] == q) printf("%d ",l);
                else printf("-1 "); 
        }
        return 0;
} 
```

注意题目给出的数组是单调的数组，如果数组不单调，则要在二分操作前进行排序（使用sort（）函数即可）

##### 相关题目

##### [Leetcode：35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/description/)

##### [Leetcode：744. 寻找比目标字母大的最小字母](https://leetcode.cn/problems/find-smallest-letter-greater-than-target/description/)

##### [洛谷：P1102 A-B 数对](https://www.luogu.com.cn/problem/P1102)

##### [Leetcode：2300. 咒语和药水的成功对数](https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/)

##### [Leetcode：2563. 统计公平数对的数目](https://leetcode.cn/problems/count-the-number-of-fair-pairs/)

**二分答案实战**

##### [洛谷：B3628 机器猫斗恶龙](https://www.luogu.com.cn/problem/B3628)

```C++
#include <iostream>

using namespace std;

int n;
const int N = 1e5 + 10;
int a[N];

bool check(int x)  //根据题目要求进行check()函数的编写。其实就是对题目过程的模拟，若满足条件返回true,否则返回false。
{
        for (int i = 1; i <= n; i ++)
        {
                x += a[i];  //进行扣血
                if (x <= 0) return false;  //在任意时刻血量不小于等于0
        }
        return true;
}

int main()
{       //数据的输入
        cin >> n;
        for (int i = 1; i <= n; i ++) cin >> a[i];
        int l = 1, r = 1e8;
        while (l < r)  //二分答案的模板
        {
                int mid = (l + r) / 2;
                if (check(mid)) r = mid;
                else l = mid + 1;
        }
        cout << l;   //输出答案
        return 0;
}
```

##### [洛谷：B3627 立方根](https://www.luogu.com.cn/problem/B3627)

##### [洛谷：B3629 吃冰棍](https://www.luogu.com.cn/problem/B3629)

##### [Leetcode：1283. 使结果不超过阈值的最小除数](https://leetcode.cn/problems/find-the-smallest-divisor-given-a-threshold/)

##### [Leetcode：2187. 完成旅途的最少时间](https://leetcode.cn/problems/minimum-time-to-complete-trips/)

##### [洛谷：P2440 木材加工](https://www.luogu.com.cn/problem/P2440)

##### [洛谷：P1873 EKO / 砍树](https://www.luogu.com.cn/problem/P1873)

##### [Leetcode：2226. 每个小孩最多能分到多少糖果](https://leetcode.cn/problems/maximum-candies-allocated-to-k-children/)