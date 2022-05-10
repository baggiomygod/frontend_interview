// 规律：通过比较首先选出最小的数放在第一个位置上，然后在其余的数中选出次小数放在第二个位置上,依此类推,直到所有的数成为有序序列。
// 1. 选择排序是不稳定的排序算法，
//   直接选择排序算法,不稳定性,举个简单的例子,就知道它是否稳定..例如:(7) 2 5 9 3 4 [7] 1...当我们利用直接选择排序算法进行排序时候,(7)和1调换,(7)就跑到了[7]的后面了,原来的次序改变了,这样就不稳定了.
// 2. 时间复杂度O(n²)

function swap(arr, a, b){
  const tmp = arr[a]
  arr[a] = arr[b]
  arr[b] = tmp
}
function selectionSort(arr){
  const newArr = arr.slice()
  const len = newArr.length
  for (let i = 0; i< len; i++){
    let minIndex = i // 保存最小下标
    let minVal = newArr[i]
    for(let j = i+1; j<len; j++){
      if (newArr[minIndex] > newArr[j]) { // 当前小于基准的值时，将最小值设为当前下标，然后继续向后比较，知道最后
        minIndex = j
        minVal = arr[j]
      }
    }

    // 判断最小值下标是否改变，如果是交换位置
    if (i !== min) {
      // es6 交换
      [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]]
      // swap(newArr, i, min)
    }
  }
  return newArr
}