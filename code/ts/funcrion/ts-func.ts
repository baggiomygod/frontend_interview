interface ICard {
    suit: string
    card: number
}

interface IDeck {
    suits: string[]
    cards: number[]
    createCardPicker(this: IDeck): () => ICard
}

let deck: IDeck = {
    suits: ['headers', 'clibe', 'ss'],
    cards: [1,2,3],
    createCardPicker: function(this: IDeck) {
        return () => {
            return {
                suit: this.suits[1],
                card: 1
            }
        }
    }
}