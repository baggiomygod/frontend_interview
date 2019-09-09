# async await

async await可以用同步的写法来书写异步函数


## 解答
1. 写法在异步函数中，
```
async function (){
    const res = await fetch()
    console.log(res)
}

```

2. 使用了Promise，并没有和Promise冲突
3. 使用了同步的写法，可以不用写回调函数
4. 但是，改变不了js单线程、异步的本质


## 用generator实现类似async await的功能**
