'use client'
import { useEffect, useState } from "react"
import { scrollSepolia } from "viem/chains"

export default function Page() { 

  const [winner, setWinner] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [score, setScore] = useState<{ player: number }>({ player: 0 })

  const [playerHand, setPlayerHand] = useState<{rank: string, suit: string}[]>([])
  const [dealerHand, setDealerHand] = useState<{rank: string, suit: string}[]>([])

  useEffect(() => {
    const initGame = async () => {
      const response = await fetch('/api')
      const data = await response.json()
      setPlayerHand(data.playerHand)
      setDealerHand(data.dealerHand)
      setMessage(data.message)
      setScore(data.score)
    }
    initGame()
  }, [])

  async function handleHit() {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: "hit" })
    })
    const data = await response.json()
    setPlayerHand(data.playerHand)
    setDealerHand(data.dealerHand)
    setMessage(data.message)
    setScore(data.score)
  }

  async function handleStand() {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: "stand" })
    })
    const data = await response.json()
    setPlayerHand(data.playerHand)
    setDealerHand(data.dealerHand)
    setMessage(data.message)
    setScore(data.score)
  }

  async function handleReset() {
    const response = await fetch('/api', {method: 'GET'})
    const data = await response.json()
    setPlayerHand(data.playerHand)
    setDealerHand(data.dealerHand)
    setMessage(data.message)
    setScore(data.score)
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-400">
      <h1 className="my-4 text-4xl bold">Welcome the black jack game!!</h1>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl bold">Score: {score.player}</h2>
        <h2 className={
          `text-2xl bold ${message.includes("Player wins") ? "text-green-500" : 
            message.includes("Dealer wins") ? "text-red-500" : 
            message.includes("tie") ? "text-yellow-500" : ""}`
        }>{message}</h2>
      </div>
      <div>
        dealer hand:
        <div className="flex flex-row gap-2">
          {
            dealerHand.map((card, index) => 
              <div className="h-42 w-28 border-black border-1 flex flex-col justify-between rounded-sm bg-white" key={index}>
                <h2 className="self-start text-2xl pt-3 pl-3">{card.rank}</h2>
                <h2 className="self-center text-3xl">{card.suit}</h2>
                <h2 className="self-end text-2xl pb-3 pr-3">{card.rank}</h2>
              </div>
            )
          }
        </div>
      </div>

      <div>
        Player hand hand:
        <div className="flex flex-row gap-2">
          {
            playerHand.map((card, index) => 
              <div className="h-42 w-28 border-black border-1 flex flex-col justify-between rounded-sm bg-white" key={index}>
                <h2 className="self-start text-2xl pt-3 pl-3">{card.rank}</h2>
                <h2 className="self-center text-3xl">{card.suit}</h2>
                <h2 className="self-end text-2xl pb-3 pr-3">{card.rank}</h2>
              </div>
            )
          }
        </div>
      </div>
      <div className="flex flex-row gap-2 mt-4">
        <button onClick={handleHit} className="p-1 bg-amber-300 rounded-lg"> hit </button>
        <button onClick={handleStand} className="p-1 bg-amber-300 rounded-lg"> stand </button>
        <button onClick={handleReset} className="p-1 bg-amber-300 rounded-lg"> reset </button>
      </div>
    </div>
  )
}