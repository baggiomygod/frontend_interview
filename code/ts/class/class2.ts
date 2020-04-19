// 如果protected作用在constructor上 该类只允许被继承，不是直接被调用创建实例
class Person {
    private name: string
    // 只允许被继承
    protected constructor(name: string) {
        this.name = name
    }
}

class Man extends Person {
    constructor(name: string) {
        super(name)
    }
}
    
let man = new Man('a')

// 父类构造函数（constructor）受保护，不能直接调用，只能在被子类继承
let p = new Person('p') 
