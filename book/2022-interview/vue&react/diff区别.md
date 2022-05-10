# Vue和React中diff算法区别
vue和react的diff算法，都是**只做同级比较**。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。

- vue比对节点，当节点元素类型相同，但是className不同，**认为是不同类型元素，删除重建**，而**react会认为是同类型节点，只是修改节点属性**

- vue的列表比对，采用从**两端到中间的比对方式**，而react则采用**从左到右依次比对的方式**。
    
    当一个集合，只是把最后一个节点移动到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移动到第一个。总体上，vue的对比方式更高效。

    当节点改变是，react可能效率会低一点

## vue
[vue diff算法](https://juejin.cn/post/6971622260490797069)
- 当Vue中想响应式数据变化的时候，就会触发页面更新函数`updateComponent()`
- 
## react

## 实现一个简单的diff
[实现一个简单的DOM diff算法](https://juejin.cn/post/6844903860444610573)