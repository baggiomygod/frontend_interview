class Grid {
    static origin = { x: 0, y: 0 }

    scale: number

    constructor(scale: number) {
        this.scale = scale
    }

    claculateFromOrigin(potion: { x: number, y: number }) {
        let xDist = potion.x - Grid.origin.x
        let yDist = potion.y - Grid.origin.y
        return {
            xDist,
            yDist,
        }
    }
}