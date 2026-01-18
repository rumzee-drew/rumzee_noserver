import { useState } from "react"

type NewGamePopupProps = {
    onClose: () => void
    onSubmit: (players:string[]) => void
}

function NewGamePopup(props: NewGamePopupProps) {
    const [players, setPlayers] = useState<string[]>([''])
    const [errorMessage, setErrorMessage] = useState<string>()

    const submit = () => {
        setErrorMessage('')
        if (!players || players.length == 0) {
            setErrorMessage("You need to set players for the game.")
            return;
        }
        if (players.some(pl => pl === "")) {
            setErrorMessage("Each player must have a name.")
            return;
        }
        props.onSubmit(players)
        props.onClose()
    }  

    const addPlayer = () => {
        setPlayers([...players, ''])
    }

    const nameChange = (event: any, index: number) => {
        const newPlayers = [...players]
        newPlayers[index] = event.target.value
        setPlayers(newPlayers)
    }

    const removePlayer = (index: number) => {
        const newPlayers = [...players]
        newPlayers.splice(index, 1)
        setPlayers(newPlayers)
    }

    return (
        <>
            <div className="dialog-bg" onClick={props.onClose}></div>
            <dialog open={true}>
                <div className="relative">
                    <a className="close-btn" onClick={props.onClose}>X</a>

                    {players.map((player, index) => {
                        return (
                            <div key={`plyrInput-${index}`}>
                                <h4>{`Player ${index + 1} Name:`}</h4>
                                <input id={`name-${index}`} type="text" placeholder="Jane Doe" value={player} onChange={(event) => nameChange(event, index)}></input>
                                <button onClick={() => removePlayer(index)} className="mt-5">Remove Player</button>
                            </div>
                        )
                    })}
                    <div className="mt-40">
                        <button onClick={addPlayer} className="mr-10">Add Player</button>

                        <button onClick={submit}>Start</button>
                        {errorMessage && (
                            <span className="error-red block">{errorMessage}</span>
                        )}
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default NewGamePopup