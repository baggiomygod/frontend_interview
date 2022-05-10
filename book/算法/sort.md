[js中排序的几种方法](https://www.cnblogs.com/chenhuichao/p/13528620.html)
[十大经典排序算法（动图演示）](https://www.cnblogs.com/onepixel/articles/7674659.html)


# 1. 冒泡

- 时间复杂度： O(n) ~ O(n²)
- 空间复杂度： O(1)

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。 

1.1 算法描述
比较相邻的元素。如果第一个比第二个大，就交换它们两个；
对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
针对所有的元素重复以上的步骤，除了最后一个；
重复步骤1~3，直到排序完成。
**sort()实现**
```
  const arr = [9,8,7,6,43,2,1]
  arr.sort((pre, next) => {
    return pre - next
  })
```

**js 实现**
```
let b=0//设置用来调换位置的值
const arr=[1,9,33,2,5,34,23,98,14]//冒泡排序

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
```

**动图演示**

![image]('./../imgs/bubble.gif)

# 2. 选择排序
规律：通过比较首先选出最小的数放在第一个位置上，然后在其余的数中选出次小数放在第二个位置上,依此类推,直到所有的数成为有序序列。

1. 选择排序是不稳定的排序算法，
  
  直接选择排序算法,不稳定性,举个简单的例子,就知道它是否稳定..例如:(7) 2 5 9 3 4 [7] 1...当我们利用直接选择排序算法进行排序时候,(7)和1调换,(7)就跑到了[7]的后面了,原来的次序改变了,这样就不稳定了.

2. 时间复杂度O(n²)


```
<!-- java   -->
public static void slectionSort(int[] arr) {
  for (int i = 0; i < arr.length; i++) {
    int min = i
    for (int j = i + 1, j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j
      }
    }
    if (min != i) {
      // 交换
      const tmp = arr[i]
      arr[i] = arr[min]
      arr[min] = tmp
    }
  }
}

<!-- js -->
function swap(arr, a, b){
  const tmp = arr[a]
  arr[a] = arr[b]
  arr[b] = tmp
}
function selectionSort(arr){
  const newArr = arr.slice()
  const len = newArr.length
  for (let i = 0; i< len; i++){
    let min = i // 保存最小下标
    for(let j = i+1; j<len; j++){
      if (newArr[min] > newArr[j]) { // 当前小于基准的值时，将最小值设为当前下标，然后继续向后比较，知道最后
        min = j
      }
    }

    // 判断最小值下标是否改变，如果是交换位置
    if (i !== min) {
      swap(newArr, i, min)
    }
  }
  return newArr
}
```

**动图演示**
![image](./imgs/selection.gif)
# 3. 快速排序

1. 先从数列中取出一个数作为基准数
2. 将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边
3. 再对左右区间重复第二步，直到各区间只有一个数
```
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
```

# 4. 插入排序 时间复杂度：`O(n) ~ O(n²)` ,空间复杂度：`O(1)`
1. 从第一个元素开始，该元素可以认为已经被排序；
2.取出下一个元素，在已经排序的元素序列中从后向前扫描；
3.如果该元素（已排序）大于新元素，将该元素移到下一位置；
4.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
5.将新元素插入到该位置后；
6.重复步骤2~5。

```
function insertSort(arr){
    console.log('输入:', arr)
    let len = arr.length
    let preIndex, current
    let compareRound = 0
    let switchCount = 0
    // 从第二个开始
    for(let i = 1; i<len; i++){
        preIndex = i - 1 // 与前一个对比
        current = arr[i]
        compareRound++
        // 当前一个比当前值大，将前一个的值放到数组当前下标的位置，
        // 继续向前比较
        while(preIndex >=0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
            switchCount++
        }
        // 当对比到最前面的一个时或前一个值不大于current时，跳出while循环，将current的值放到相应位置
        // 由于上此次比较已'--'，这里是current 和前一个比较，所以要 + 1,即将current当到一轮比较完的最终位置
        arr[preIndex + 1] = current
    }
    console.log('对比轮次：', compareRound)
    console.log('交换位置次数：', switchCount)
    return arr
}

const newArr = insertSort([4,2,6,2,4,6,7,8,2,2,8])
console.log('排序后结果:', newArr)

```
输入:,[4,2,6,2,4,6,7,8,2,2,8]
对比轮次：,10
交换位置次数：,16
排序后结果:,[2,2,2,2,4,4,6,6,7,8,8]
# 5. 希尔排序

# 6. 归并排序

# 7. 堆排序

# 8. 计数排序


## 8.1 桶排序（计数排序升级版）*

# 9. 基数排序