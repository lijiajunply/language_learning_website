# 滑动窗口

**作者：张帅**

## 概念

滑动窗口是一种高效的数组/链表遍历技术，通常用于解决子数组或者子序列相关的问题。它的核心思路是：

通过调整窗口的起始和结束位置（而不每次都重新计算），来高效地统计或查找满足条件的区间。

 **关键特点**：

1. 窗口大小固定或可变：

   **固定大小**（如 `长度为k的子数组`）。

   **可变大小**（如 `最短子数组满足某条件`）。

2. 减少重复计算：

   利用已有的计算结果，避免双重循环暴力遍历。

3. 时间复杂度优化：

   通常将O(n²) 优化为 O(n)。

## 用法

本质是使用双指针来进行对两层for循环的替换以此来减小时间复杂度。

指针l，r为两指针，起始点都为0，若不满足条件则r右移；满足情况则让l右移；并记录数据，以此来求满足条件的数组长度的最值问题或固定数组长度的最值问题。 

## 例题实战

[209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int l=0,r=0;
        int ans=0;
        int sum=0;
        int n=nums.size();
        while(r<n){
            sum+=nums[r];
            while(sum>=target){
                if(ans!=0)ans=min(ans,r-l+1);
                else ans=r-l+1;
                sum-=nums[l];
                l++;
            }
            r++;
        }
        return ans;
    }
};
```