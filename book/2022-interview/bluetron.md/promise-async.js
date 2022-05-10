// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';


/**
 * 执行顺序是：
 * 1. 初始化 constructor： 
 *          this.status = PENDING, 
 *          this.value
 *          ...
 *          resolve
 *          reject
 * 2. 执行new Promise(executor)传入的回调函数 executor
 * 3. 如果executor内是个异步函数,异步函数先将异步回调放入到'异步任务队列'
 * 4. 然后，执行then函数，判断如果状态还是pending，将then成功的执行函数保存到onResolvedCb数组
 * 5. 异步回调函数调执行时，执行resolve() 将pending状态改为fulfilled，然后遍历执行onResolvedCb内的函数
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
