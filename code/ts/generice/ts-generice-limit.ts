/**
 * 泛型约束
 */

 interface Lengthwise {
     length: number
 }

 // 用接口约束泛型变量
 function logIden<T extends Lengthwise> (arg: T): T {
     console.log(arg.length)
     return arg
 }


 // <T, k extends keyof T>, 约束第二个参数是第一个参数的key
 function getProperty<T, K extends keyof T>(obj: T, key: K){
    return obj[key]
 }

 let sObj = {a:1 , b:2, c:3}

 getProperty(sObj, 'a')
 getProperty(sObj, 'm') // m不是sObj的属性

// 传入一个类的实例，返回一个实例
function create<T>(c: {new(): T}): T {
    return new c()
 }

 /**
  * 高级
  */
class Animal{
    numLen: number
}
class Beekeeper {
    nametag: string
}
class Bee extends Animal {
    keeper: Beekeeper
}
  function createInstance<T extends Animal>(c: new() => T): T {
    return new c()
  }

  createInstance(Bee).keeper.nametag