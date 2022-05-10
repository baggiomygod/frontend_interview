/**
 * 当需要修改静态成员时
 */

class Greeter {
    static standardGreeting = 'greet'
    name: string

    constructor(name: string) {
        this.name = name
    }
}

// greeterMaker 是一个新的构造函数，并且修改了静态属性
const greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'new greet'

// 用新的构造函数 创建实例
let newGreet = new greeterMaker('pack')
 