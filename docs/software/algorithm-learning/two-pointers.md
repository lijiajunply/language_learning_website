# 双指针

**作者：张帅**

## 概念

双指针是一种**用于遍历数组或链表的技巧**。

核心思想是**利用两个指针，在数据结构上移动，高效完成任务。**

利用双指针单层循环来代替双层for循环，根据情况对左右两边的指针进行移动来降低时间复杂度。

滑动窗口其实也是双指针。

## 用法

```cpp
int a[10];
int l=0,r=9;
while(l<r){
if()++l;    //括号中放具体的条件。
else --r;
}
```

## 例题

[167. 两数之和 II](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        vector<vector<int>>ans;
        int r=numbers.size()-1;
        int l=0;
        while(l<r){
            if(numbers[l]==target-numbers[r]){
                return {l+1,r+1};
                ++l;
                --r;
            }
            else if(numbers[l]<target-numbers[r]){
                ++l;
            }
            else --r;
        }
        return {-1,-1};
    }
};
```