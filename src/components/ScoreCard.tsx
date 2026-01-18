type ScoreCardProps = {
    players: string[]
    addRound: () => void
    scoreState: number[][]
    scoreUpdate: (event: any, roundIndex: number, playerIndex: number) => void
    totals: number[]
}

function ScoreCard(props: ScoreCardProps) {
    return (
        <div className="center fit-content mt-40 pb-50">
            <h2>Scores</h2>
            <button className="mb-10" onClick={props.addRound}>Add Round</button>
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
                                <td>{`Round ${y + 1}`}</td>
                                {row.map((value, x) => {
                                    return (
                                        <td key={`td-${y}-${x}`} className="relative">
                                            <input 
                                                id={`input-${y}-${x}`} 
                                                type="number" 
                                                step="1" 
                                                min="0" 
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

export default ScoreCard