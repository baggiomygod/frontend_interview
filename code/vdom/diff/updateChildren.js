function updateChildren(vnode, newVnode) {
    var childrenArr = vnode.children || []
    var newChildrenArr = newVnode.children || []

    childrenArr.forEach((childVnode, index) => {
        var newChildrenVnode = newChildrenArr[index]
        if (childVnode.tag === newChildrenVnode.tag) {
            // 深层次对比
            updateChildren(childVnode, newChildrenVnode)
        } else {
            replaceNode(childVnode, newChildrenVnode)
        }
    })
}

function replaceNode(vnode, newVnode) {
    var elem = vnode.elem
    var newElem = createElement(newVnode)
    // 替换
}