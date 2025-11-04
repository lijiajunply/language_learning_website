# 动态规划

**作者：张帅**

动态规划有众多分支，可参考[代码随想录](https://programmercarl.com/动态规划理论基础.html)

  动态规划（Dynamic Programming，DP）是运筹学的一个分支，是求解决策过程最优化的过程。

  其基本原理是将大问题分解为小问题，通过保存中间结果来避免重复计算，从而提高算法的效率。

  动态规划的基本过程包括定义子问题，解决子问题，合并子问题的解来求解原问题。动态规划通常采用自底向上的方式进行，通过迭代计算子问题并存储子问题的解，逐步求解更大规模的问题，直到求解出原问题。

## **动态规划算法的设计可以分为如下几个步骤：**

  动态规划算法的基本步骤通常包括：划分阶段、定义状态、建立状态转移方程以及确定边界条件等。

  划分阶段：将问题划分为若干个阶段，每个阶段对应一个决策过程。这些阶段需要满足无后效性，即某个阶段的状态一旦确定，则此后过程的演变不再受此前各种状态及决策的影响。这是动态规划方法应用的前提，也是保证算法有效性的基础。

  定义状态：对每个阶段定义状态变量，状态变量应该能够表示出该阶段所有可能的信息，且能从中推导出下一阶段的状态。在定义状态时，要考虑到问题的具体特征，使得状态变量能够简洁明了地反映问题的本质。

  状态转移方程：根据问题的性质，建立从一个阶段到下一个阶段的递推关系式，即状态转移方程。状态转移方程是动态规划算法的核心部分，它描述了问题在不同阶段之间的转移关系。在建立状态转移方程时，需要仔细分析问题的特征，找到正确的状态转移方式。同时，要注意避免重复计算，提高算法的效率。

  边界条件：确定状态转移方程中的起始状态，即问题的初始条件。

  求解最优解：利用状态转移方程和边界条件，从初始状态开始逐步求解问题，最终得到问题的最优解。在求解过程中，要注意保存中间结果，以便后续使用。

## **实战：**

[P1595 信封问题](https://www.luogu.com.cn/problem/P1595)

当信封数量为n时，我们可以将第n封信放到第i（1 <= i <= n-1）位，若第i封信放到第n位，则有`dp[n-2]`种方法，若第i封信不放到第n位，则有`dp[n-1]`种方法。因此`dp[n]=(n-1)*(dp[n-1]+dp[n-2])；`即是状态转移方程。

```c++

#include <iostream>
#include <algorithm>

using namespace std;
long long dp[21]; //dp[i]的含义为当信封数量为i时的结果数。
int main(){
	int n;
	cin>>n;
    //初始化操作（边界条件）
	dp[1]=0;  
	dp[2]=1;  
	dp[3]=2;
    //进行状态转移
	for(int i=4;i<=20;i++){
		dp[i]=(long long)(i-1)*(dp[i-1]+dp[i-2]); //状态转移方程
	}
	cout<<dp[n]; //输出结果
	return 0;
} 
```

[121. 买卖股票的最佳时机 - 力扣（LeetCode）](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/)

```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n=prices.size();
        int dp=0;          //记录答案
        int mi=prices[0];  //记录遍历到当前的最小价格
        for(int i=1;i<n;++i){
            if(prices[i]>=mi)dp=max(dp,prices[i]-mi); //如果当前价格大于前面的最小价格，尝试更新答案
            mi=min(mi,prices[i]); //尝试更新最小值
        }
        return dp;
    }
};
```

[122. 买卖股票的最佳时机 II - 力扣（LeetCode）](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/solutions/476791/mai-mai-gu-piao-de-zui-jia-shi-ji-ii-by-leetcode-s/)

```c++
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n=prices.size();
        vector<vector<int>>dp(n,vector<int>(2,0)); //dp[i][0]为遍历到下标为i时，手里无股票的最优取值。dp[i][1]为手中有股票的最优取值。
        dp[0][0]=0;           //初始化 手中无股票则为0
        dp[0][1]=-prices[0];  //初始化 手中有股票则减去prices[0]
        for(int i=1;i<n;++i){
            dp[i][0]=max(dp[i-1][0],dp[i-1][1]+prices[i]); //状态转移
            dp[i][1]=max(dp[i-1][1],dp[i-1][0]-prices[i]); //状态转移
        }
        return dp[n-1][0];
    }
};
```

