/**
 * 交叉类型
 * 将多个类型合并为一个类型
 * 几种类型之合
 */

 function extend<T, U> (f: T, s: U): T & U{
    let result = {} as T & U
    
    for(let id in f) {
        result[id] = f[id] as any
    }

    for(let id in s) {
        if (!result.hasOwnProperty(id)) {
            result[id] = s[id] as any
        }
    }

     return result
 }


 class Person {
     constructor(public name: string) {}
 }

 interface Loggable {
     log(): void
 }

 class ConsoleLogger implements Loggable {
     log() {
         // ...
     }
 }

 let jim = extend(new Person('jim'), new ConsoleLogger())

 jim.name
 jim.log()