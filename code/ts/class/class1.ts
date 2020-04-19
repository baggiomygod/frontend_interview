/**
 * static
 * public
 * private // 子类中不能访问, 只能在本类内部使用
 * protected // 子类中可以访问
 * readonly 只读
 */
class Animal {
    name: string

    private privateName: string
    protected protectedName: string
    readonly readOnlyName: string
    constructor(name: string) {
        this.name = name
        this.privateName = name + '_p'
        this.protectedName = name + '_pr'
        this.readOnlyName = name + '_readonly'
    }
    move(d: number) {
        console.log('animal moved' + d)
    }
}

class Dog extends Animal {
    speed: number
    constructor(name: string, speed: number = 0) {
        super(name)
        this.speed = speed
    }
    getProtactedName() {
        console.log(this.protectedName)
        // console.log(this.privateName)
    }
    getName(name: string) {
        console.log(name)
    }
    setReadOnlyName() {
        console.log(this.readOnlyName)
        this.readOnlyName = '123' // readOnle
    }
}

class Rhino extends Animal {
    constructor(name: string) {
        super(name)
    }
}

class Cat{
    private name: string
    constructor(name: string) {
        this.name = name
    }
}


let dog = new Dog('lf', 1)
dog.move(1)
dog.getName('meat')
dog.getProtactedName()
// console.log(dog.protectedName)
// console.log(dog.privateName)

let an = new Animal('a')
let ran = new Rhino('r')
let c = new Cat('c')

an = ran
an = c
c = an