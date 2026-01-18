import { Hand } from "./types"

export const Colors = {
    default: 'text-white',
    purple: 'text-purple'
} as const

export const Phase10Hands = [
    new Hand('AAA + BBB', Colors.default), 
    new Hand('AAA + ABCD', Colors.default), 
    new Hand('AAAA + ABCD', Colors.default),
    new Hand('ABCDEFG', Colors.default),
    new Hand('ABCDEFGH', Colors.default),
    new Hand('ABCDEFGHI', Colors.default),
    new Hand('AAAA + BBBB', Colors.default),
    new Hand('7 CARDS', Colors.purple),
    new Hand('AAAAA + BB', Colors.default),
    new Hand('AAAAA + BBB', Colors.default),
 ]