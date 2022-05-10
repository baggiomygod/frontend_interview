from typing import List

def selection_sort(arr: List[int]):
  length = len(arr)
  if length <= 1:
    return

  for i in range(length):
    min_index = i
    min_val = arr[i]
    for j in range(i, length):
      if arr[j] < min_val:
        min_val = arr[j]
        min_index = j
    # 交换
    arr[i], arr[min_index] = arr[min_index], arr[i]
  
  print(arr)


selection_sort([17, 56, 71, 38, 61, 62, 48, 28, 57, 42])

