// 1. 先从数列中取出一个数作为基准数
// 2. 将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边
// 3. 再对左右区间重复第二步，直到各区间只有一个数
function fastSort(arr){
  if (arr.length <= 1) {
    return arr;
  }

  let pivotIndex = Math.floor(arr.length / 2)
  // [left][pivot][right]
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []

  for (let i = 0; i< arr.length; i++){
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else{
      right.push(arr[i])
    }
  }
  // [[left]][pivot][right]
  return fastSort(left).concat([pivot], fastSort(right))
}