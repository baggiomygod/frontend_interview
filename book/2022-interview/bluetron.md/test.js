const PromiseC = require('./promise.js')

const p = new PromiseC((resolve, reject) => {
  resolve(1)
}).then(
  (data) => {console.log('success', data)},
  (err) => {console.log('err', err)}
)
p()