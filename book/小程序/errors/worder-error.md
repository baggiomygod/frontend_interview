
# 1. 微信小程序报错

## 1. worker undefiend
微信中使用gif.js时，传入worker的js路径时，运行报以下错误。
```
    worker uncaught third Error 
 module "static/worker/gif.worker.js" is not defined 
 Error: module "static/worker/gif.worker.js" is not defined
    at f (http://127.0.0.1:29580/appservice/__WORKER__/worker.js:5:301776)
    at a (http://127.0.0.1:29580/appservice/__WORKER__/worker.js:5:234084)
    at http://127.0.0.1:29580/appservice/__WORKER__/worker.js:5:234837
    at http://127.0.0.1:29580/appservice/__WORKER__/worker.js:5:93031
    at Array.forEach (<anonymous>)
    at Object.h (http://127.0.0.1:29580/appservice/__WORKER__/worker.js:5:92988)
    at e.onmessage (http://127.0.0.1:29580/appservice/__WORKER__/worker.js:1:2583)(env: Windows,mp,1.06.2206090; lib: 2.22.0)
```

查了很多资料都很好的解决办法，后来看别人的项目发现app.json中需要增加一条配置：

app.json 或者 uniapp项目中是page.json
```
    "workers": "static/worker",
```

这样运行就不会报错

## 2. 通过canvas-id API 获取的ctx实例问题

### 1. ctxdrawImage(video) 不支持video绘制


## 3. gif.js 里有一段检测canvas的代码，小程序里一直报`invalid image`
小程序里CanvasRenderingContext2D 是 undefined 所以传入canvas 一直不成功
```
else if (
					typeof CanvasRenderingContext2D !== "undefined" 
					&& CanvasRenderingContext2D !== null 
					&& image instanceof CanvasRenderingContext2D 
					|| typeof WebGLRenderingContext !== "undefined" 
					&& WebGLRenderingContext !== null 
					&& image instanceof WebGLRenderingContext) {
                       // ...
                    } 
```