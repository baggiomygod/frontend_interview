// 继承
interface Shape {
    color: string
}
interface Size {
    size: number
}
interface Square extends Shape, Size {
    length: number
}

let s = {} as Square
s.color = 'red'
s.length = 2

let s2:Square = {
    color: 'blue',
    length: 2,
    size: 1
}


// 混合类型

interface Counter {
    (start: number): string
    name: string
    age: number
    reset(): void
}

function getCounter(): Counter {
    const counter = (function (start: number){}) as Counter
    counter.name = 'c'
    counter.age = 1
    counter.reset = () => {}
    return counter
}


class Control {
    private state: any
}

// 接口继承类，会继承私有成员state
interface SelectableControl extends Control {
    select()
}

// 直接继承类
class TextBox extends Control {
    select() {}
}

// 继承类后实现接口
// Button 继承了Control 有state, 可以实现SelectableControl
class Button extends Control implements SelectableControl {
    select() {}
}

// 直接实现接口
// 报错，因为没有继承Control,不包含私有成员state
class ImgC implements SelectableControl {
    select() {}
}