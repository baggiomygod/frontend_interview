function createElement(vnode) {
    const {tag, attrs = {}, children = []} = vnode

    // 创建元素
    const elem = document.createElement(tag)
    // 设置属性
    for (const attrName in attrs) {
        if (attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName])
        }
    }

    // 子元素
    children.forEach((item) => {
        ele.appendChild(createElement(item))
    })
    return elem
}