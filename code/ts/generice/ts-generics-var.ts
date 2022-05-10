/**
 * 泛型变量
 * @param arg
 */
// T 类型变量
function indentity<T>(arg: T): T {
    return arg
}

let output = indentity<string>('wfn')

let output2 = indentity('wfn') // 利用类型推论，判断传入参数的类型

function lengthIndentity<T>(arg: T): T {
    console.log(arg.length) // 报错
    return arg
}

// 修改
function lengthIndentityAry<T>(arg: T[]): T[] {
    console.log(arg.length) // 报错
    return arg
}