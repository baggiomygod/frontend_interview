interface UIElement {
    addClickListener(onClick: (this: void, e: Event) => void): void
}

class Handler {
    type: string

    onClickBad(this: Handler, e: Event) {
        this.type = e.type
    }

    onClickOk = (e: Event) => {
        this.type = e.type
    }
}

let h = new Handler()

let uiEle: UIElement = {
    addClickListener() {

    }
}

// 报错 this:Handler 和 this: void 不匹配
uiEle.addClickListener(h.onClickBad)

// 修改 使用箭头函数
uiEle.addClickListener(h.onClickOk)
