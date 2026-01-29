import { Hand, Game } from "./types"

export const Colors = {
    default: 'text-white',
    purple: 'text-purple'
} as const

export const Phase10Hands = [
    new Hand('AAA + BBB'), 
    new Hand('AAA + ABCD'), 
    new Hand('AAAA + ABCD'),
    new Hand('ABCDEFG'),
    new Hand('ABCDEFGH'),
    new Hand('ABCDEFGHI'),
    new Hand('AAAA + BBBB'),
    new Hand('7 CARDS ♠'),
    new Hand('AAAAA + BB'),
    new Hand('AAAAA + BBB'),
 ]

 export const TheGameHands = [
    new Hand('AAA + BBB'),
    new Hand('AAA + BCDE♠'),
    new Hand('ABCD♠ + WXYZ♠'),
    new Hand('AAA + BCDEFG♠')
 ]

 export const GamestateCards = {
    CheckCard: 'HandCard',
    GenericScoreCard: 'GenericScoreCard',
    LabeledScoreCard: 'LabeledScoreCard',
  } as const
 
export const Games = [
    new Game('Generic Scorecard', 
        null, 
        [GamestateCards.GenericScoreCard], 
        null),
    new Game('Phase 10', 
        Phase10Hands, 
        [GamestateCards.CheckCard, GamestateCards.GenericScoreCard], 
        ['•2-6 players', 
            '•10 card hands', 
            '•Turn consists of drawing 1 (either from discard or deck), adjusting melds, and finally discarding one card', 
            '•A player cannot create new melds after going down. Can only add to existing melds.', 
            '•A player must have a discard to go out.',
            '•At the end of a round, each card less than 10 is worth five points, each card 10-12 is worth ten points, and each wild is worth twenty points.']),
    new Game('The Game', 
        TheGameHands, 
        [GamestateCards.LabeledScoreCard], 
        ['•2+ players (add a second deck at 4 players)', 
            '•Start with 7 cards.',
            '•Turn consists of drawing (either 2 from deck or 1 from discard), adjusting melds, and finally discarding one card', 
            '•Aces high, 2s and Jokers wild',
            '•No wilds can be used to go down in the first round. A single wild can be used to go down every round afterwards.',
            '•After going down, you can exchange cards in hand for wildcards in melds.',
            '•A player must have a discard to go out.',
            '•At the end of a round, each card less than 10 is worth five points, 10-K is worth 10 points, Aces and 2s are worth 20, and Jokers are worth 40.']),
]