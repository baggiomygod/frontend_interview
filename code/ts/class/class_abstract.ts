abstract class Car {
    name: string
    static year: number
    constructor(name: string) {
        this.name = name
    }
    getBand() {
        return 'BWM'
    }
    getYear() {
        console.log(Car.year)
    }
    // 抽象方法
    abstract getSpeed(): void
}

class BWM extends Car {
    constructor(name) {
        super(name)
    }
    // 实现抽象方法
    getSpeed() {

        console.log(120, Car.year)
    }
    sayName() {
        console.log(123)
    }
}
let bwm = new BWM('car11')

bwm.getBand()
bwm.getSpeed()
// bwm.sayName()