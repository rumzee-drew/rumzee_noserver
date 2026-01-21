import { useState, useMemo } from 'react'
import NewGamePopup from './components/NewGamePopup'
import { Hand } from './models/types'
import { Phase10Hands } from './models/constants'
import HandCard from './components/HandCard'
import ScoreCard from './components/ScoreCard'

function App() {
  const [players, setPlayers] = useState<string[]>()
  const [newGameVisible, setNewGameVisible] = useState(false)
  const [hands,] = useState<Hand[]>(Phase10Hands)
  const [handState, setHandState] = useState<boolean[][]>([[]])
  const [scores, setScores] = useState<number[][]>()
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
    setNewGameVisible(true)
  }

  const closePopup = () => {
    setNewGameVisible(false)
  }

  const createGame = (players: string[]) => {
    setPlayers(players)
    setScores([new Array(players.length).fill(null)])
    setHandState(new Array(hands.length).fill(new Array(players.length).fill(false)))
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
      const tempScores: number[][] = [...scores]
      tempScores.push(new Array(players.length).fill(null))
      setScores(tempScores)
    }
  }

  const scoreUpdate = (event: any, roundIndex: number, playerIndex: number) => {
    if (scores) {
      const val:number = Number(event.target.value);
      const tempScore: number[][] = [...scores]
      const tempRow = tempScore[roundIndex]
      tempRow[playerIndex] = val as number
      tempScore[roundIndex] = tempRow
      console.log(tempScore)
      setScores(tempScore)
    }
  }

  return (
    <>
      <h1 className="rainbow-border">
        ♣ Rumzee ♠
      </h1>
      <button className='center mb-30' onClick={openPopup}>New Game</button>
      {newGameVisible && (
        <NewGamePopup
          onClose={closePopup}
          onSubmit={createGame}>
        </NewGamePopup>
      )}
      {players && hands && !newGameVisible && (
        <HandCard 
          players={players} 
          hands={hands} 
          handState={handState} 
          cellToggle={cellToggle}>
        </HandCard>
      )}
      {players && scores && totals &&!newGameVisible && (
        <ScoreCard 
          players={players}
          scoreState={scores}
          scoreUpdate={scoreUpdate}
          totals={totals}
          addRound={addRound}>
        </ScoreCard>
      )}
    </>
  )
}

export default App
