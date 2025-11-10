# 贪心

**作者：张帅**

## 概念

贪心算法是一种**在每个步骤选择当前最优解**的算法策略，希望通过**局部最优**的累积达到**全局最优**。它通常**不回溯、不穷举**，只关注眼前的最佳选择，因此不一定可以达到全局最优解。

## 用法

由于贪心算法不一定得到全局最优解，因此我们在考虑使用贪心算法时要思考**能不能通过局部最优解累计取到全局最优解**(一定要慎重)。

贪心是一种思想，对于不同的问题要进行具体的分析，没有具体的代码模板可以使用。

## 例题

[452. 用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)

```cpp
class Solution {
public:
    struct p {
        long long a, b;
    } s[100010];
    static bool cmp(const p& q, const p& w) { return q.b < w.b; }
    int findMinArrowShots(vector<vector<int>>& points) {
        int i = 0;
        int ans = 1;
        int n=points.size();
        for (auto point : points) {
            s[i].a =(long long)point[0];
            s[i].b =(long long)point[1];
            ++i;
        }
        sort(s, s + i , cmp);
        int pos = s[0].b;
        for (int j = 1; j < n; j++) {
            cout<<s[j].a<<' '<<s[j].b<<' ';
            if (s[j].a > pos) {
                pos = s[j].b;
                ++ans;
            }
        }
        return ans;
    }
};
```

[P2240 部分背包问题](https://www.luogu.com.cn/problem/P2240)

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

int n, t;
const int N = 110;

struct Coin
{
        double m, v, avg;
}coins[N];

bool cmp(const Coin &a, const Coin &b)
{
        return a.avg > b.avg;
}

int main()
{
        cin >> n >> t;
        
        for (int i = 1; i <= n; i ++)
        {
                double m, v;
                cin >> m >> v;
                coins[i].m = m;
                coins[i].v = v;
                coins[i].avg = v / m;
        }
        sort(coins + 1, coins + n + 1, cmp);
        
        int i = 1;
        double ans = 0;
        while (i <= n && t > 0)
        {
                // t > coins[i].m  -> coins[i].m
                // t < coins[i].m  -> t 
                ans += coins[i].avg * min((double)t, coins[i].m);
                t -= min((double)t, coins[i].m); // 更新剩余重量 
                i ++;  
        }
        printf("%.2f", ans);
        return 0; 
}
```