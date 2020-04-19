let passCode = 'secret123456'

class Emplayee2 {
    private _fullName: string
    get fullName(): string {
        return this._fullName
    }
    set fullName(name: string) {
        if (passCode && passCode === 'secret123456') {
            this._fullName = name
        } else {
            console.log('Error')
        }
    }
}

let emp = new Emplayee2()

emp.fullName = 'sss'
if (emp.fullName) {
    console.log(emp.fullName)
}