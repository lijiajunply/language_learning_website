# Avalonia 概述

**作者：[LuckyFish](https://gitee.com/luckyfishisdashen)**

## 简单介绍

Avalonia 是一个跨平台 UI 框架，支持 .NET Core。其通过Skia 渲染引擎来渲染UI，属于自绘框架。

> [!NOTE]
> 什么是自绘框架？
> 
> 自绘框架是指，使用自己编写的代码来绘制UI界面，而不是使用系统提供的UI控件来绘制。相当于自己重头绘制。

对于 Avalonia 来说，他的侧重点是**桌面端**而非移动端。截至目前(2025年5月29)，Avalonia的移动端还处于预览阶段.

## **一、安装（默认已经安装了dotnet）**

在控制台中输入指令：

`dotnet new install Avalonia.Templates`

现在我们可以试着去创建一个avalonia项目：

`dotnet new avalonia.app -o MyApp`

然后试着运行一下：

`cd MyApp
dotnet run`

![](https://pic2.zhimg.com/80/v2-b10479918eb57ccd8fcf5e1c52da99f5_1440w.webp)

OK！

## **二、配置VS2022和Rider**

为了方面开发，我们还需要配置好VS2022和Rider

### **VS2022:**

[Avalonia for Visual Studio 2022 - Visual Studio Marketplace](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3DAvaloniaTeam.AvaloniaVS)

安装此插件即可

### **Rider:**

这里会稍微有点麻烦。

1.在插件下点击设置选择“管理插件仓库”

![](https://pic3.zhimg.com/80/v2-461efcbef2543c596a53a951d9e46be2_1440w.webp)

插件面板在开始菜单的左下角“配置”里面

2.在完成后出现的新界面中点击“+”，然后将[https://plugins.jetbrains.com/plugins/dev/14839](https://plugins.jetbrains.com/plugins/dev/14839)输入进去，点击确定。

![](https://pic1.zhimg.com/80/v2-bab078cb3c118aca30cee1ae0cf99b5c_1440w.webp)

3.回到插件面板，选择Marketplace，搜索Avalonia,选择AvaloniaRider，安装后重启即可

![](https://pic3.zhimg.com/80/v2-039413a7a16058d5adca234acde11256_1440w.webp)

## **最后**

这一节内容非常简单，那么下一节开始我们将正式开始Avalonia的教学