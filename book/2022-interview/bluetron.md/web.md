1. 手写promise √
2. rsa加密128 256区别 √
3. 做过哪些性能优化，HTTP: √
4. http验证包完整性
5. TCP/IP UDP区别√
6. UDP实现可靠传输怎么做√
7. 前端缓存有哪些 √

# 手写promise

**使用Promise**
```
 const p = new PromiseAsync((resolve, reject) => {
      setTimeout(() => {resolve('success')}, 1000)
      
    }).then(
      (data) => {console.log('1', data)},
      (err) => {console.log('2', err)}
    )
```

**自己实现Promise.js**
```
// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

/**
 * 执行顺序是：
 * 1. 初始化 constructor： 
 *          this.status = PENDING, 
 *          this.value
 *          this.reason
 *          resolve
 *          reject
 * 2. 执行new Promise(executor)传入的回调函数 executor
 * 3. 如果executor内是个异步函数
 * 4. 执行then函数，判断如果状态还是pending，将异步回调函数保存到onResolvedCb数组
 * 5. 异步回调执行时，执行resolve() 将pending状态改为fulfilled，然后遍历执行onResolvedCb内的函数
 * 
 * reject同then
 */
class PromiseAsync {
  constructor(executor) {
    // 默认状态为 PENDING
    this.status = PENDING;
    // 存放成功状态的值，默认为 undefined
    this.value = undefined;
    // 存放失败状态的值，默认为 undefined
    this.reason = undefined;

    this.onResolvedCb = [] // 存放成功的回调
    this.onRejectedCb = [] // 存放失败的回调

    // 调用此方法就是成功
    let resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCb.forEach(fn=>fn());
      }
    } 

    // 调用此方法就是失败
    let reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次将对应的函数执行
        this.onRejectedCb.forEach(fn=>fn());
      }
    }

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者  
      executor(resolve,reject)
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error)
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if(this.status === PENDING){
      this.onResolvedCb.push(() => {
        onFulfilled(this.value)
      })

      this.onRejectedCb.push(() => {
        onRejected(this.raason)
      })
  }
}
}

```

#### 说明：
从调用自定义promise的执行过程
1. 初始化 constructor： 
		        this.status = PENDING, 
		         this.value
		         this.reason
		         resolve
		         reject
		         ...
2. 执行`new Promise(executor)`传入的回调函数 `executor()`
3. 如果`executor`内是个异步函数
4. 执行then函数，判断如果状态还是`pending`，将异步回调函数保存到`onResolvedCb`数组
5. 异步回调执行时，执行`resolve()` 将pending状态改为`fulfilled`，然后遍历执行`onResolvedCb`内的函数

> reject实行过程同then的过程


# 2. rsa加密128 256区别

1. 秘钥长度不同
2. 256位加密安全性更高，计算量更大

# 3. 做过哪些性能优化，HTTP， js, 打包，性能: 
## 1. HTTP:
1. ETag: 根据标记
2. Last-Modified & If-Modified-Since： 根据时间
3. Expires和Max-Age： 保存时间

### 1. 强制缓存：Expires和Max-Age：

直接缓存至浏览器中，不会再次向服务器发送请.

服务器与浏览器约定一个缓存的最大存活时间。在这期间浏览器不再就该资源像服务端发送请求


node 实现，在返回投中设置：Cache-Control或Expires
```
   // 10s 表示当前时间 + 10s，属于相对时间 (用于新版浏览器)
   res.setHeader('Cache-Control', 'max-age=10'); 
   
   // 设置 绝对时间 (用于旧版浏览器或IE老版本 或 http1.0)
   // 设置header的值只能是数字，字符串或数组，不能为对象，new Date()返回的是对象，所以需要转一下。
   res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString());
```

### 2. 协商缓存： Last-Modified & If-Modified-Since

也叫协商缓存，客服各执一份文件修改时间，相互对比，若相同用客户端缓存

浏览器首次请求资源时，服务器会将缓存标识(文件修改时间)与资源一同返回给浏览
再次请求时，客户端请求头会携带缓存标识(If-Modified-Since)，并在服务端对比两个时间
若相等这返回304,
若不相等，返回新的内容

```
    // no-cache: 需要使用对比缓存验证数据,会向服务器发送请求，且数据会存到浏览器的缓存中 
   res.setHeader('Cache-Control', 'no-cache'); 
   
   // 设置响应头，文件的最后修改时间
   res.setHeader('Last-Modified',ctime)
```

**对比缓存的问题**
- 可能修改了时间，但是内容没有改变
- 同一文件位于多个CDN上，显然时间会不一样
- 服务器的最后修改时间不一定准确

### 3. ETag缓存： ETag和If-None-Match

Etag：为解决对比缓存存在的一些问题，客服各执一份文件签名，相互对比，若相同用客户端缓存

每次文件改变生成一个新的hash值，只要hash没变就使用缓存

```
 res.setHeader('Etag',etag
```

**HTTP 缓存优化与NGINX**
  ```
      location ~ .*\.(html)$ {
            try_files $uri $uri/ =404;
            root /data/web/default;
            add_header Cache-Control no-cache;
    }

    location ~* \.(gif|jpg|png)$ {
        expires 30d;
    }

    location / {
          try_files $uri $uri/ =404;
          root /data/web/default;
          add_header Cache-Control private;
    }
  ```

## 2. 服务端渲染

加快首屏渲染速度

## 3. 使用iconfont代替图标

不用向服务器请求资源

## 4. 文件压缩
webpack:
- UglifyPlugin: js
- MiniCssExtractPlugin: css
- HtmlWebpacPlugin: html
- GZip: Accept-Encoding: gzip, nginx配置
- 图片压缩
- 图片延时加载：`<img src="" loading="lazy" >  根据网络环境，初次加载的图片数不同
- 用css效果代替图片，如有些大屏设计会提供的阴影背景图或渐变色的背景图，这些都可以用css实现
- vue react 按需加载：
    - vue： 路由懒加载：const componets = () => import('../components/ImportFuncDemo1')
    - reat: Suspense-等待效果, React.lazy()-异步组件
- 条件判断多的时候使用 `switch` 而不是`if else`
- for 循环性能优化：
  - 保存length值
  - 达夫设备：减少循环次数(一次循环中多次操作，以减少循环次数)
  - 较长的for循环，尽量使用原生for循环，不要使用第三方库的循环会影响性能

# TCP UDP 区别
TCP 是基于连接的通信，需要先建立连接（通过三次握手）

UDP 无连接通信，不需要事先建立连接，发送端想发送就可以发送。不属于连接协议，具有资源消耗少，处理速度快的优点，所以通常音频，视频和普通数据在传送时，使用UDP较多，因为即使丢失少量的包，也不会对接受结果产生较大的影响。
# 6. UDP实现可靠传输怎么做

传输层无法保证数据的可靠传输，只能通过应用层来实现了。实现的方式可以参照tcp可靠性传输的方式，只是实现不在传输层，实现转移到了应用层。

开源程序实现：
- 1、RUDP（Reliable User Datagram Protocol）
- 2、RTP（Real Time Protocol）
- 3、UDT（UDP-based Data Transfer Protocol）
# 7. 前端缓存有哪些
HTTP:
  1. 强制缓存 Expires & Max-Age：
  2. 协商缓存 Last-Modified & If-Modified-Since
  3. 标记或摘要缓存 ETag & If-None-Match
浏览器：
  1. cookie
  2. sessionStorage
  3. localStorage
