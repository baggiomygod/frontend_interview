const arr = [4,3,2,1]

// 实现
function sort(list){
  const newArr = list.slice()
  const len = newArr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (newArr[j] > newArr[j+ 1]) {
        const temp = newArr[j]
        newArr[j] = newArr[j+1]
        newArr[j+1] = temp
      }
    }
  }
  return newArr
}

// 使用Array.prototype.sort
arr.sort((pre, next) => pre - next)