import { useState, useMemo } from 'react'
import NewGamePopup from './components/NewGamePopup'
import { Game } from './models/types'
import { GamestateCards, Games } from './models/gameConstants'
import CheckCard from './components/CheckCard'
import GenericScoreCard from './components/GenericScoreCard'
import LabeledScoreCard from './components/LabeledScoreCard'

function App() {
  const [players, setPlayers] = useState<string[]>()
  const [popupVisible, setPopupVisible] = useState(false)
  const [game, setGame] = useState<Game>()
  const [handState, setHandState] = useState<boolean[][]>([[]])
  const [scores, setScores] = useState<(number|null)[][]>()
  const totals: number[] | undefined = useMemo(() => {
    if (scores?.[0] && players) {
      const tempTotals: number[] = new Array(players.length).fill(0)
      for (let i = 0; i < players.length; i++) {
        let tmpTotal: number = 0;
        for (let j = 0; j < scores.length; j++) {
          tmpTotal = tmpTotal + (scores[j][i] || 0) as number
        }
        tempTotals[i] = tmpTotal
      }

      return tempTotals
    }
  }, [scores])

  const openPopup = () => {
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupVisible(false)
  }

  const createGame = (players: string[], game: Game) => {
    setPlayers(players)
    setGame(game)
    if (game.gamestateCards.includes(GamestateCards.LabeledScoreCard) && game?.hands?.length)
      setScores(Array.from({length: game?.hands?.length!}, () => new Array(players.length).fill(null)))
    else
      setScores([new Array(players.length).fill(null)])
    setHandState(new Array(game?.hands?.length).fill(new Array(players.length).fill(false)))
  }

  const cellToggle = (handIndex: number, playerIndex: number) => {
    const val:boolean = handState[handIndex][playerIndex]
    const tempHandState = [...handState]
    const tempRow = [...tempHandState[handIndex]]
    tempRow[playerIndex] = !val
    tempHandState[handIndex] = tempRow
    setHandState(tempHandState)
  }

  const addRound = () => {
    if (scores && players) {
      const tempScores: (number|null)[][] = [...scores]
      tempScores.push(new Array(players.length).fill(null))
      setScores(tempScores)
    }
  }

  const scoreUpdate = (event: any, roundIndex: number, playerIndex: number) => {
    if (scores) {
      console.log(`params. targ: ${event.target.value}. roundIndex: ${roundIndex}. playerIndex: ${playerIndex}.`)
      if (!event.target.value || event.target.value == "-") {
        const tempScore: (number|null)[][] = [...scores]
        const tempRow = tempScore[roundIndex]
        tempRow[playerIndex] = null
        tempScore[roundIndex] = tempRow
        setScores(tempScore)
      }
      else if (/\d/.test(event.target.value)) {
        const val:number = Number(event.target.value)
        const tempScore: (number|null)[][] = [...scores]
        const tempRow = tempScore[roundIndex]
        tempRow[playerIndex] = val as number
        tempScore[roundIndex] = tempRow
        setScores(tempScore)
      }
    }
  }

  return (
    <>
      <div className={`flex justify-between align-center w-100 title-container ${game?.rules ? 'mb-20' : 'mb-50'}`}>
        <h1 className="">
          ♣ <span className='molle'>Rumzee</span> ♦
        </h1>
        <div className='color-scheme-2'>
          <button className={``} onClick={openPopup}>New Game</button>
        </div>
      </div>
      {game && game.rules && (
        <div className='rules-container'>
          <h3 className="mb-10">{game.name}</h3>
          <details className='rule-card'>
            <summary><h2>Rules</h2></summary>
            {game.rules.map((rul, index) => {
              return <p key={index}>{rul}</p>
            })}
          </details>
        </div>
      )}
      {game && !game.rules && (
        <div className='mb-70'></div>
      )}
      {popupVisible && (
        <NewGamePopup
          onClose={closePopup}
          onSubmit={createGame}
          games={Games}>
        </NewGamePopup>
      )}
      {players && game && scores && totals && !popupVisible && game.gamestateCards.map((card: string, index: number) => {
        return (
          <div className={`table-container color-scheme-${(index % 2) + 1} ${index+1==game.gamestateCards.length ? 'pb-70' : '' }`}>
            {card === GamestateCards.CheckCard && (
              <CheckCard 
                players={players} 
                hands={game?.hands!} 
                handState={handState} 
                cellToggle={cellToggle}>
              </CheckCard>
            )}
            {card === GamestateCards.GenericScoreCard && (
              <GenericScoreCard 
                players={players}
                scoreState={scores}
                scoreUpdate={scoreUpdate}
                totals={totals}
                addRound={addRound}>
              </GenericScoreCard>
            )}
            {card == GamestateCards.LabeledScoreCard && (
              <LabeledScoreCard
                players={players}
                hands={game?.hands!}
                scoreState={scores}
                scoreUpdate={scoreUpdate}
                totals={totals}>
              </LabeledScoreCard>
            )}
          </div>
        )
      })}
    </>
  )
}

export default App
