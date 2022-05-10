# redux connect 
> It does not modify the component class passed to it; instead, it returns a new, connected component class for you to use.

> connenct并不会改变它“连接”的组件，而是提供一个经过包裹的connect新组件。 


```
connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Demo)
```

connect接受四个参数，返回一个接受组件作为参数的`connectHOC`函数,它将传入的`mapStateToProps`和`mapDispatchToProps`与组件的`props`.