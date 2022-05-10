/**
* 1. 从第一个元素开始，该元素可以认为已经被排序；
* 2.取出下一个元素，在已经排序的元素序列中从后向前扫描；
* 3.如果该元素（已排序）大于新元素，将该元素移到下一位置；
* 4.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
* 5.将新元素插入到该位置后；
* 6.重复步骤2~5。
 */
function insertSort(arr){
  let len = arr.length
  let preIndex, current
  for(let i = 1; i < len; i++){
    preIndex = i - 1 // 前一个
    current = arr[i] // 当前
    // 逐个向前比较，如果前一个比当前大，交换位置，继续向前比较，
    // 直到前一个比当前小
    while(preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    // 由于上此次比较已'--'，这里是current 和前一个比较，所以要 + 1,即将current当到一轮比较完的最终位置
    arr[preIndex + 1] = current
  }
  return arr
}