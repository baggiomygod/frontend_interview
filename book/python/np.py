import numpy as np

a = np.arange(20)
b = a.reshape(4,5)
# print(a)
# print(b.dtype)

# 创建数组

c = np.array([[1.0, 2],[2,4]])
d = np.array([[3.2, 1.5],[2,4]])

print(c * 2)

raw = [0,1,2,3]

e = np.array(raw)
print('e:', e, raw)

z = np.zeros((4, 5), dtype=int)
o = np.ones((4, 5), dtype=int)
em = np.empty((2, 2), dtype=int)

print('zeros:', z)
print('ones:', o)
print('empty:', em)

rand = np.random.rand(5)

print('rand:', rand)

# 数组操作
print('d:', d)
d /= 2
print('d /=2 :', d)

print('np.exp(d):', np.exp(d))