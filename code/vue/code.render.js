
// var createCompiler =
// createCompilerCreator(
//     function baseCompile (/* ... */) {
//     // ...
//     var code = generate(ast, options);
//     console.log(code.render)

//     return {
//         // ...
//         render: code.render,
//         }
//     });


/**
 * 源码中console.log(code.render)
 * 打印如下with函数
 * return _c()   // 即返回一个vnode
 */

with (this) {
    return _c(
        'div', 
        { attrs: { "id": "app" } },
        [_c(
            'div',
            [
                _c('input', {
                    directives: [
                        { 
                            name: "model", 
                            rawName: "v-model", 
                            // value读取值，触发defineProperty的get
                            value: (title),  // vm.title--->data.title
                            expression: "title" 
                        }
                    ],
                    domProps: { "value": (title) }, // dom属性
                    on: { // 事件
                        "input": function ($event) { 
                            if ($event.target.composing) return; 
                            title = $event.target.value 
                            }
                        } 
                }),
                _v(" "),
                // vm.add()
                _c('button', { on: { "click": add } }, [_v("submit")])]), _v(" "),
                _c(
                    'div',
                    [
                        _c(
                            'ul', 
                            _l( // v-for
                                (list),
                                function (item) { return _c('li', [_v(_s(item))]) }
                            )
                        )
                    ])
        ])
    }