"use client";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";

// Ronin Saigon Testnet definition (matching wagmi.ts)
const roninSaigonTestnet = {
  id: 2021,
  name: 'Ronin Saigon Testnet',
} as const;

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

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [isSigned, setIsSigned] = useState(false);

  // 获取当前网络名称
  const getCurrentNetworkName = () => {
    switch (chainId) {
      case mainnet.id:
        return "Ethereum Mainnet";
      case sepolia.id:
        return "Sepolia Testnet";
      case roninSaigonTestnet.id:
        return "Ronin Saigon Testnet";
      default:
        return `Chain ${chainId}`;
    }
  };

  // 监听网络变化，重置签名状态
  useEffect(() => {
    if (isConnected && isSigned) {
      // 网络变化时重置签名状态，要求重新认证
      setIsSigned(false);
      // 清理游戏状态
      setPlayerHand([]);
      setDealerHand([]);
      setMessage("");
      setScore({ player: 0 });
      setWinner("");
    }
  }, [chainId]);

  // 监听钱包连接状态变化，断开时重置所有状态
  useEffect(() => {
    if (!isConnected) {
      setIsSigned(false);
      // 清理游戏状态
      setPlayerHand([]);
      setDealerHand([]);
      setMessage("");
      setScore({ player: 0 });
      setWinner("");
    }
  }, [isConnected]);

  const isGameOver =
    message.includes("wins") ||
    message.includes("busts") ||
    message.includes("tie");

  useEffect(() => {
    // 只有在钱包连接且签名成功后才初始化游戏
    if (isConnected && isSigned) {
      const initGame = async () => {
        const response = await fetch("/api");
        const data = await response.json();
        setPlayerHand(data.playerHand);
        setDealerHand(data.dealerHand);
        setMessage(data.message);
        setScore(data.score);
      };
      initGame();
    }
  }, [isConnected, isSigned]);

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
    if (!address || !isConnected) return;

    const messageToSign = `Authenticate as ${address}`;
    try {
      const signature = await signMessageAsync({ message: messageToSign });
      if (signature) {
        setIsSigned(true);
        console.log("Signed successfully:", signature);
      }
    } catch (err) {
      console.error("Signing failed:", err);
    }
  }

  function handleDisconnect() {
    disconnect();
    setIsSigned(false);
    // 清理游戏状态
    setPlayerHand([]);
    setDealerHand([]);
    setMessage("");
    setScore({ player: 0 });
    setWinner("");
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-400">
      <div className="mt-8">
        <ConnectButton
          chainStatus="icon"
          showBalance={true}
          accountStatus="address"
        />
      </div>
      
      {isConnected && !isSigned && (
        <div className="flex flex-col items-center mt-8">
          <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
            🌐 Current Network: <strong>{getCurrentNetworkName()}</strong>
          </div>
          <p className="text-lg mb-4">Please sign the message to authenticate and access the game</p>
          <button
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleSign}
          >
            Sign with your wallet
          </button>
        </div>
      )}

      {!isConnected && (
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Blackjack Game!</h1>
          <p className="text-lg">Please connect your wallet to start playing</p>
        </div>
      )}

      {isConnected && isSigned && (
        <>
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ Wallet connected and authenticated on <strong>{getCurrentNetworkName()}</strong>
          </div>
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
        </>
      )}
    </div>
  );
}
