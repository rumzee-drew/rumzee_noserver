import { Hand } from "../models/types"

type LabeledScoreCardProps = {
    players: string[]
    hands: Hand[],
    scoreState: number[][]
    scoreUpdate: (event: any, roundIndex: number, playerIndex: number) => void
    totals: number[]
}

function LabeledScoreCard(props: LabeledScoreCardProps) {
    return (
        <div className="center fit-content">
            <div className="flex w-100 justify-between">
                <h2>Scores</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        {props.players.map((player, index) => {
                            return (<td key={`player-scorecard-${index}`} className="text-center">{player}</td>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.scoreState.map((row, y) => {
                        return (
                            <tr key={`scoreRow-${y}`}>
                                <td>{`${props.hands[y].label}`}</td>
                                {row.map((value, x) => {
                                    return (
                                        <td key={`td-${y}-${x}`} className={`relative wider ${y % 2 == 0 ? 'style-1' : 'style-2'}`}>
                                            <input 
                                                id={`input-${y}-${x}`} 
                                                type="number" 
                                                step="1" 
                                                onInput={(event) => props.scoreUpdate(event, y, x)} 
                                                value={value}/>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    <tr className="border-top">
                        <td>Total</td>
                        {props.totals.map((total) => {
                            return (
                                <td>{total}</td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LabeledScoreCard