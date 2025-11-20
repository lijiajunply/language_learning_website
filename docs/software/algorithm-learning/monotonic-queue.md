# 单调队列

**作者：张帅**

## 概念

单调队列是一种特殊的队列数据结构，能够高效维护队列元素的单调性（单调递增或单调递减），常用于解决滑动窗口相关的最值问题。

### 核心思想：

​	1.队列中元素按**单调顺序**排列（递增或递减）。

​	2.**淘汰冗余元素**：在插入新元素前，移除队列中破坏单调性的旧元素。

### 与普通队列的区别：

​	1.普通队列：先进先出。

​	2.单调队列：动态维护单调性，可能从**队首或队尾**删除元素。

## 用法

假设要取单调递增队列，我们先遍历数组，记录当前较小的数的下标，如果遇到更小的数，则将队尾的数pop,直到队尾的下标对应的数大于当前遍历的数为止。

数组遍历完成后，队头下标对应的数即为数组元素的最小值。

```cpp
				vector<int>& nums；
				int n = nums.size();
                deque<int> maxq, minq;//递增+递减单调队列
                int ans = 0; 
				for (int r = 0;r < n;r++) {
                        //进元素
                        int x = nums[r];
                        while (!maxq.empty() && x >= nums[maxq.back()]) {
                                maxq.pop_back();
                        }
                        while (!minq.empty() && x <= nums[minq.back()]) {
                                minq.pop_back();
                        }
                        maxq.push_back(r);
                        minq.push_back(r);
     					while(check()){
                            …………
                        }
                }
```

## 例题

[leetcode:239](https://leetcode.cn/problems/sliding-window-maximum/description/?envType=study-plan-v2&envId=top-100-liked)

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
                int n = nums.size();
                vector<int> ans;
                deque<int> q;//新建双端队列，用于维护单调队列
                for (int i = 0;i < n;i++) {
                    //进元素
                        while (!q.empty() && nums[i] >= nums[q.back()]) {//所有的出队操作前一定要判空，防止空指针错误，当队尾元素小于 新元素，为了单调性，所以出队
                                q.pop_back();
                        }
                        q.push_back(i);
                //出元素
                        if (i - q.front() >= k) {//当队首最大值不在定长窗口内，要弹出队首
                                q.pop_front();
                        }
                    //记录答案
                        if (i >= k - 1) {//只有定长滑窗足够长了才记录答案
                                ans.push_back(nums[q.front()]);
                        }
                }
                return ans;
    }
};
```

