import { Hand } from "../models/types"

type CheckCardProps = {
    players: string[]
    hands: Hand[]
    handState: boolean[][]
    cellToggle: (handIndex: number, playerIndex: number) => void
}

function CheckCard(props: CheckCardProps) {    
    return (
        <div className="center fit-content">
            <h2>Hands</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        {props.players.map((player, index) => {
                            return (<td key={`player-${index}`} className="text-center">{player}</td>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.hands.map((hand, y) => {
                        return (
                            <tr key={`hand-${y}`}>
                                <td className={`${hand.color}`}>{hand.label}</td>
                                {props.handState[y].map((value, x) => {
                                    return (
                                        <td key={`td-${y}-${x}`} className={`relative ${y % 2 == 0 ? 'style-1' : 'style-2'}`}>
                                            <a onClick={() => props.cellToggle(y, x)}></a>
                                            {value && (
                                                <span className="checkmark">✔&#xFE0E;</span>
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>  
    )
}

export default CheckCard