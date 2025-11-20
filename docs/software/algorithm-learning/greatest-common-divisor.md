# 最小公倍数 最大公约数

**作者：张帅**

## 数学知识

### 最大公约数 gcd

假设有数a,b(a > b 且 ab != 0),求 a b 的最大公约数。

假设a,b的最大公约数为 c，那么 a,b, a mod b是都可以被c整除的，且三者的最大公约数以及两两组合的最大公约数都是c。(证明如下：可以设 a=k·c ,b=l*·c;那么a mod b =(k mod l)·c,因此 a mod b也是 c 的倍数)。

那么 a,b的最大公约数问题可以转变成求b,a mod b的最大公约数。

即**gcd(a,b)=gcd(b,a mod b)**。（mod是取模）。

### 最小公倍数 lcm

最小公倍数即是 ab 的乘积除以它们的最大公约数。即 **lcm(a,b)=a·b/gcd(a,b)**。

## 代码实现

### 最大公约数 gcd

```cpp
int gcd(int a,int b){
return b==0?a:gcd(b,a%b);
}
```

### 最小公倍数 lcm

```cpp
int lcm(int a,int b){
    if(a==0 || b==0)return 0;
    else return a * b / gcd(a,b);
}
```

## 性质

ab=gcd(a,b)·lcm(a,b)

gcd(a,b,c)=gcd(gcd(a,b,),c)

lcm(a,b,c)=lcm(lcm(a,b),c)

**gcd(lcm(a,b),c)=lcm(gcd(a,c),gcd(b,c))**