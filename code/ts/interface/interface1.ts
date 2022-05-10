// 如果可能存在其他额外属性
interface IProps {
    color: string
    size?: number

    [propName: string]: any // 索引签名
}


// 函数类型
interface ISearchFunc {
    (a: string, b: number): boolean
}

let mySearch: ISearchFunc
mySearch = function (a: string, b: number) {
    return false
}

// 可索引类型
interface IStringArray {
    [index: number]: string | number
}

let myArray: IStringArray
myArray = ['a', 2, 3, false]

// 只读 数字索引
interface IReadOnlyStringArray {
    readonly [index: number]: string
}

let x: IReadOnlyStringArray = ['x', 'y']