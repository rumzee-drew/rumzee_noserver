import { Colors } from "./constants"

export class Hand {
    label: string
    color: string

    constructor(label: string, color: string = Colors.default) {
        this.label = label
        this.color = color
    }
}

export class Game {
    name: string
    hands: Hand[] | null
    rules?: string[] | null
    gamestateCards: string[]

    constructor(name: string, hands: Hand[] | null, gamestateCards: string[], rules: string[] | null) {
        this.name = name
        this.hands = hands
        this.gamestateCards = gamestateCards
        this.rules = rules
    }
}