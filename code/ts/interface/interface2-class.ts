interface IClock {
    currentTime: Date
    setTime(d: Date)
}

class Clock implements IClock{
    currentTime: Date
    constructor(h: number, m:number) {

    }
    setTime(d: Date) {
        this.currentTime = d
    }
}


// 实例接口
interface IClockInterface {
    tick()
}

// 构造器接口
interface IClockConstructor {
    new(hour: number, mintute: number): IClockInterface
}

class DigtalClock implements IClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log('didadida')
    }
}

class AnalogClock implements IClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log('ddd')
    }
}

function createClock(
    ctor: IClockConstructor,
    hour: number,
    mintute: number): IClockInterface {
        return new ctor(hour, mintute)
}

let dc = createClock(DigtalClock, 1, 2)