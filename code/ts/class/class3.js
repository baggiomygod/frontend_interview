var passcode = 'secret123456';
var Emplayee = /** @class */ (function () {
    function Emplayee() {
    }

    Object.defineProperty(Emplayee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (name) {
            if (passcode && passcode === 'secret123456') {
                this._fullName = name;
            } else {
                console.log('Error');
            }
        },
        enumerable: true,
        configurable: true
    });
    return Emplayee;
}());
var emp = new Emplayee();
emp.fullName = 'sss';
if (emp.fullName) {
    console.log(emp.fullName);
}
