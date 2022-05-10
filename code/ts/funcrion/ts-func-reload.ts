/**
 * 重载
 * 使函数参数和返回值可以定义几种不同的类型
 */

function pickcard(x: number): string
function pickcard(x: string): number

function pickcard(x): any {
    if (typeof x === 'number') {
        return 'sss'
    } else if (typeof x === 'string') {
        return 123
    }
}

pickcard(123)
pickcard('123')
pickcard({a: 1})
