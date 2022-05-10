/**
 * 泛型类型
 */

function indentity<T>(arg: T): T {
    return arg
}

// 泛型函数 <T>(arg: T) => T 这块是泛型类型部分
let myIden: <T>(arg: T) => T = indentity
// 对象字面量形式
let myIden2: { <T>(arg: T): T } = indentity

//  泛型接口， T作为接口参数
interface GenericIndentityFn<T> {
    (arg: T): T
}

// 使用时可以传入类型的参数
let myIden3: GenericIndentityFn<number> = indentity
