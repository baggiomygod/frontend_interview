/**
 * 泛型类
 */

 class GenericNumber<T> {
     zeroValue: T
     add: (x: T, y: T) => T
 }

 let myGen = new GenericNumber<number>()

 myGen.zeroValue = 1
 myGen.add = function (x, y) {
     return x + y
 }

 let myStrGen = new GenericNumber<string>()
 myStrGen.zeroValue = 'ss'
 myGen.add = function (x, y) {
    return x + y
}