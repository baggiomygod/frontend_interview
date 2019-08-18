## HelloWorld

### 假设条件

1. 假设工具已准备好，并清楚各种工具的用法。如果不了解，前往传送门： [入坑指南：装备篇](../1-装备篇/0-README.md)    
2. 假设你熟知html、css和js的基础知识。
3. 假设你工作目录在以下位置：D:/work

### 使用cui初始化一个vue项目

#### 打开命令行

打开资源管理器，前往工作目录：D:/work

鼠标右键打开git bash

#### 全局安装CUI

在git bash中，通过yarn 安装一个全局组件CUI。

输入以下命令

```
yarn global add cui-template
```

想了解CUI是什么？前往传送门：[CUI](../../2-挖坑造轮子/cui/0-README.md)   

#### 初始化项目

创建项目目录

在git bash 中，输入以下命令（#为注释，命令行中不会产生效果）：


```
# 1. 创建项目目录：vuetest
mkdir vuetest
# 2. 进入vuetest目录
cd vuetest
# 3. 安装vue-console类型的模板
cui init vue-console
# 4. 
```

#### 