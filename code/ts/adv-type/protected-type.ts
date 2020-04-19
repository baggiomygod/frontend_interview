/**
 * 类型保护
 */

 interface Bird {
    fly()
    layEggs()
 }

 interface Fish {
     swim()
     layEggs()
 }

 function getSmallPet(): Fish | Bird {
    // ...
    let res: Fish | Bird
    return res
 }

 let pet = getSmallPet()

 pet.layEggs()

 pet.swim() // 直接访问会报错
 
 // 断言
 (pet as Fish).swim() 
 (pet as Bird).fly() 

 // 类型保护

 // 1.
 function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
 }

 if (isFish(pet)) {
     pet.swim()
 } else {
     pet.fly()
 }


 // 2. typeof 

function isNumber(x: any): x is number{
    return typeof x === 'number'
}
function isString(s: any): s is string{
    return typeof s === 'string'
}

function padLeft(v: string, p: string | number) {
    // if (isNumber(p)) {
    if (typeof p === 'number') {
        return p + 1
    }
    if (typeof p === 'string') {
        return p + 'string'
    }
}

// 3. instanceof

