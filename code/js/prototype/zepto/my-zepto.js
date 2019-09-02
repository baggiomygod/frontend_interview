(function(window){
    console.log('window:', window)
    var zepto = {}
    function Z(dom, selector) {
        var i, lenn = dom ? dom.length : 0
        for(i = 0; i < lenn; i++){
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }

    zepto.Z = function (dom, selector){
        return new Z(dom, selector)
    }

    // 选择器选中元素并转换为数组；返回Z实例
    zepto.init = function (selector) {
        var dom = Array.from(document.querySelectorAll(selector))
        return zepto.Z(dom, selector)
    }

    // $('#id')最终返回的时new Z() 创建的实例
    var $ = function (selector) {
        return zepto.init(selector)
    }

    window.$ = $
    // $方法上的fn对象存放一系列函数，作为实例的公用函数
    $.fn = {
        css: function () {
            console.log('css方法设置样式')
        },
        html: function(){
            return 'html方法'
        }
    }
    Z.prototype = $.fn
})(window)