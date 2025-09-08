"use client";
import { useEffect, useState } from "react";
import { scrollSepolia } from "viem/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";

export default function Page() {
  const [winner, setWinner] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState<{ player: number }>({ player: 0 });

  const [playerHand, setPlayerHand] = useState<
    { rank: string; suit: string }[]
  >([]);
  const [dealerHand, setDealerHand] = useState<
    { rank: string; suit: string }[]
  >([]);

  const {address, isConnected} = useAccount()
  const {isSigned, setIsSigned} = useState(false)
  const {signMessageAsync} = useSignMessage()

  const isGameOver =
    message.includes("wins") ||
    message.includes("busts") ||
    message.includes("tie");

  useEffect(() => {
    const initGame = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      setPlayerHand(data.playerHand);
      setDealerHand(data.dealerHand);
      setMessage(data.message);
      setScore(data.score);
    };
    initGame();
  }, []);

  async function handleHit() {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "hit" }),
    });
    const data = await response.json();
    setPlayerHand(data.playerHand);
    setDealerHand(data.dealerHand);
    setMessage(data.message);
    setScore(data.score);
  }

  async function handleStand() {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "stand" }),
    });
    const data = await response.json();
    setPlayerHand(data.playerHand);
    setDealerHand(data.dealerHand);
    setMessage(data.message);
    setScore(data.score);
  }

  async function handleReset() {
    const response = await fetch("/api", { method: "GET" });
    const data = await response.json();
    setPlayerHand(data.playerHand);
    setDealerHand(data.dealerHand);
    setMessage(data.message);
    setScore(data.score);
  }

  async function handleSign() {
    if(!isConnected) {
      alert("Please connect your wallet first")
      return
    }
    try {
      const from = address
      const to = "0x0000000000000000000000000000000000000000"
      const value = BigInt(0)
      const data = "0x"
      const nonce = await fetch("/api/nonce").then(res => res.json()).then(data => data.nonce)
      const gasLimit = BigInt(21000)
      const gasPrice = BigInt(20000000000)

      const message = `I am signing into the Web3 Blackjack game with nonce: ${nonce}`

      const signature = await signMessageAsync({message})

      const verifyResponse = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({address, signature}),
      })

      const verifyData = await verifyResponse.json()
      if(verifyData.success) {
        alert("Signature verified successfully!")
        setIsSigned(true)
      } else {
        alert("Signature verification failed!")
      }

    } catch (error) {
      console.error("Error signing message:", error)
      alert("Error signing message")
    }
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-400">
      <ConnectButton
        chainStatus="icon"
        showBalance={true}
        accountStatus="address"
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-lg"
        onClick={() => {
          handleSign()
        }}
      >
        Sign with your wallet
      </button>

      <h1 className="my-4 text-4xl bold">Welcome the black jack game!!</h1>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl bold">Score: {score.player}</h2>
        <h2
          className={`text-2xl bold ${
            message.includes("Player wins")
              ? "text-green-500"
              : message.includes("Dealer wins")
              ? "text-red-500"
              : message.includes("tie")
              ? "text-yellow-500"
              : ""
          }`}
        >
          {message}
        </h2>
      </div>
      <div>
        dealer hand:
        <div className="flex flex-row gap-2">
          {dealerHand.map((card, index) => (
            <div
              className="h-42 w-28 border-black border-1 flex flex-col justify-between rounded-sm bg-white"
              key={index}
            >
              <h2 className="self-start text-2xl pt-3 pl-3">{card.rank}</h2>
              <h2 className="self-center text-3xl">{card.suit}</h2>
              <h2 className="self-end text-2xl pb-3 pr-3">{card.rank}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        Player hand hand:
        <div className="flex flex-row gap-2">
          {playerHand.map((card, index) => (
            <div
              className="h-42 w-28 border-black border-1 flex flex-col justify-between rounded-sm bg-white"
              key={index}
            >
              <h2 className="self-start text-2xl pt-3 pl-3">{card.rank}</h2>
              <h2 className="self-center text-3xl">{card.suit}</h2>
              <h2 className="self-end text-2xl pb-3 pr-3">{card.rank}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-2 mt-4">
        {!isGameOver && (
          <>
            <button
              onClick={handleHit}
              className="p-1 bg-amber-300 rounded-lg hover:bg-amber-400"
            >
              {" "}
              hit{" "}
            </button>
            <button
              onClick={handleStand}
              className="p-1 bg-amber-300 rounded-lg hover:bg-amber-400"
            >
              {" "}
              stand{" "}
            </button>
          </>
        )}
        {isGameOver && (
          <button
            onClick={handleReset}
            className="p-1 bg-amber-300 rounded-lg hover:bg-amber-400"
          >
            {" "}
            reset{" "}
          </button>
        )}
      </div>
    </div>
  );
}
