# 单调栈

**作者：张帅**

## 概念

单调栈是一种特殊的栈结构，用于高效解决一类 **“元素最近邻比较”** 问题。

单调栈维护一个 **栈内元素保持单调性（递增或递减）** 的结构，在每次入栈时动态调整栈内元素。

### 两种单调栈类型

| 类型           | 入栈规则                       | 典型应用场景         |
| -------------- | ------------------------------ | -------------------- |
| **单调递增栈** | 入栈时弹出所有比当前元素大的值 | 寻找下一个更小的元素 |
| **单调递减栈** | 入栈时弹出所有比当前元素小的值 | 寻找下一个更大的元素 |

## 用法

单调递减模板

```cpp
stack<int> st;
for (int i = 0; i < nums.size(); i++) {
    while (!st.empty() && nums[i] > nums[st.top()]) {
        int top_index = st.top();
        st.pop();
    }
    st.push(i); 
}
```

## 例题

[柱状图中的最大矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/description/)

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        //单调栈
        heights.insert(heights.begin(), 0); // 数组头部加入元素0
        heights.push_back(0); // 数组尾部加入元素0
        int n=heights.size();
        stack<int>s;
        s.push(0);
        int ans=0;
        for(int i=0;i<n;i++){
            if(heights[i]>=heights[s.top()])s.push(i);
            else {
                while(!s.empty()&&heights[i]<heights[s.top()]){
                    int mid=s.top();
                    s.pop();
                    if(!s.empty()){
                    int l=s.top();
                    int r=i;
                    int h=heights[mid];
                    int w=r-l-1;
                    ans=max(ans,h*w);
                    }
                }
                s.push(i);
            }
        }
        return ans;
    }
};
```

