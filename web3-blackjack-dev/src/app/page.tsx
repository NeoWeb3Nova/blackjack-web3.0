"use client";
import { use, useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { avalanche, mainnet, sepolia } from "wagmi/chains";


import { createWalletClient, createPublicClient, custom, parseAbi } from "viem"
import { avalancheFuji } from "viem/chains"
import { AnyARecord } from "dns";
import { count } from "console";

// Ronin Saigon Testnet definition (matching wagmi.ts)
const roninSaigonTestnet = {
  id: 2021,
  name: "Ronin Saigon Testnet",
} as const;

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [winner, setWinner] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState<{ player: number } | undefined>({
    player: 0,
  });

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

  const [publicClient, setPublicClient] = useState<any>(null);
  const [walletClient, setWalletClient] = useState<any>(null);

  // 客户端挂载检查
  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (isConnected && isSigned && address) {
      const initGame = async () => {
        try {
          const response = await fetch(`/api?address=${address}`);
          if (!response.ok) {
            console.error("Failed to initialize game:", response.statusText);
            // 设置默认值
            setScore({ player: 0 });
            return;
          }
          const data = await response.json();
          setPlayerHand(data.playerHand || []);
          setDealerHand(data.dealerHand || []);
          setMessage(data.message || "");
          setScore(data.score || { player: 0 });

          // 初始化 walletClient
          if (window.ethereum) {
              setPublicClient(
              createPublicClient({
                chain: avalancheFuji,
                transport: custom(window.ethereum),
              })
            );
            setWalletClient(
              createWalletClient({
                chain: avalancheFuji,
                transport: custom(window.ethereum),
              })
            );
          }
          else {
            console.error("Ethereum provider not found");
          }
        } catch (error) {
          console.error("Error initializing game:", error);
          // 设置默认值
          setPlayerHand([]);
          setDealerHand([]);
          setMessage("");
          setScore({ player: 0 });
        }
      };
      initGame();
    }
  }, [isConnected, isSigned, address]);

  async function handleSentTx() {
    // Example function to demonstrate sending a transaction via viem
    // get constract address and abi from env
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    const contractABI = parseAbi([process.env.NEXT_PUBLIC_CONTRACT_ABI || ""]);

    // Implement transaction sending logic here using viem
    // Before sending a transaction, ensure the user is connected and has signed in and authenticated
    if (!address || !isConnected) {
      console.error("Wallet not connected");
      return;
    }

    // Before sending a transaction, try publicClient to read some data from the contract to ensure connectivity
    if (!contractAddress || !contractABI) {
      console.error("Contract address or ABI not set");
      return;
    }

    // simulater vie publicClient
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'sendRequest',
      args: [[address], address],
      account: address,
    })

    // This is a placeholder and needs to be filled with actual transaction logic
    const txHash = await walletClient.writeContract(request)
    console.log("Transaction sent to contract:", contractAddress, "with hash:", txHash);
  }

  async function handleHit() {
    if (!address) return;
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: JSON.stringify({ action: "hit", address }),
      });
      if (!response.ok) {
        console.error("Hit action failed:", response.statusText);
        return;
      }
      const data = await response.json();
      setPlayerHand(data.playerHand || []);
      setDealerHand(data.dealerHand || []);
      setMessage(data.message || "");
      setScore(data.score || { player: 0 });
    } catch (error) {
      console.error("Error in hit action:", error);
    }
  }

  async function handleStand() {
    if (!address) return;
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: JSON.stringify({ action: "stand", address }),
      });
      if (!response.ok) {
        console.error("Stand action failed:", response.statusText);
        return;
      }
      const data = await response.json();
      setPlayerHand(data.playerHand || []);
      setDealerHand(data.dealerHand || []);
      setMessage(data.message || "");
      setScore(data.score || { player: 0 });
    } catch (error) {
      console.error("Error in stand action:", error);
    }
  }

  async function handleReset() {
    if (!address) return;
    try {
      const response = await fetch(`/api?address=${address}`, {
        method: "GET",
      });
      if (!response.ok) {
        console.error("Reset action failed:", response.statusText);
        return;
      }
      const data = await response.json();
      setPlayerHand(data.playerHand || []);
      setDealerHand(data.dealerHand || []);
      setMessage(data.message || "");
      setScore(data.score || { player: 0 });
    } catch (error) {
      console.error("Error in reset action:", error);
      // 设置默认值作为后备
      setPlayerHand([]);
      setDealerHand([]);
      setMessage("");
      setScore({ player: 0 });
    }
  }

  async function handleSign() {
    if (!address || !isConnected) return;

    const messageToSign = `Authenticate as ${address}`;
    try {
      const signature = await signMessageAsync({ message: messageToSign });
      if (signature) {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "auth",
            address,
            message: messageToSign,
            signature,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Authentication successful:", data);
          setIsSigned(true);
          // Store the JWT for future requests
          localStorage.setItem("jwt", data.jsonwebtoken);
        } else {
          console.error("Authentication failed:", response.statusText);
        }
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

  // 防止水合错误
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-casino-gradient relative overflow-hidden">
      {/* 背景装饰效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-float animation-delay-1"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400/5 rounded-full blur-2xl animate-float animation-delay-2"></div>
      
      <div className="relative z-10 flex flex-col items-center min-h-screen py-8">
        {/* 头部钱包连接区域 */}
        <div className="mb-8 p-1 bg-gold-gradient rounded-2xl shadow-glow-lg animate-glow">
          <div className="bg-green-900 rounded-xl p-2">
            <ConnectButton
              chainStatus="icon"
              showBalance={true}
              accountStatus="address"
            />
          </div>
        </div>

        {/* 未签名状态 */}
        {isConnected && !isSigned && (
          <div className="flex flex-col items-center max-w-md mx-auto">
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-100 rounded-xl shadow-glow float-effect">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl animate-spin-slow">🌐</span>
                <span>Current Network: <strong className="text-yellow-400 gradient-text">{getCurrentNetworkName()}</strong></span>
              </div>
            </div>
            <div className="text-center bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-yellow-400/20 shadow-card hover:shadow-card-hover transition-all duration-500">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 gradient-text">🎰 Authentication Required</h2>
              <p className="text-lg mb-6 text-gray-200">
                Please sign the message to authenticate and access the casino
              </p>
              <button
                className="px-8 py-4 bg-gold-gradient text-black font-bold rounded-xl 
                         hover:scale-105 transform transition-all duration-300 
                         shadow-glow hover:shadow-glow-lg border-2 border-yellow-400 btn-glow"
                onClick={handleSign}
              >
                <span className="flex items-center gap-2">
                  ✍️ Sign with your wallet
                </span>
              </button>
            </div>
          </div>
        )}

        {/* 未连接状态 */}
        {!isConnected && (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-12 border border-yellow-400/30 shadow-glow-lg float-effect">
              <h1 className="text-6xl font-bold mb-6 gradient-text animate-pulse-glow">
                🎰 BLACKJACK CASINO
              </h1>
              <div className="text-2xl text-gray-200 mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="animate-float">🃏</span>
                  <span>Welcome to the Premium Gaming Experience</span>
                  <span className="animate-float animation-delay-3">🃏</span>
                </div>
                <p className="text-lg text-yellow-200">Connect your wallet to enter the casino</p>
              </div>
            </div>
          </div>
        )}

        {/* 游戏主界面 */}
        {isConnected && isSigned && (
          <div className="w-full max-w-6xl mx-auto px-4">
            {/* 状态指示器 */}
            <div className="mb-6 p-4 bg-green-gradient/20 backdrop-blur-sm 
                          border border-green-400/30 text-green-100 rounded-xl shadow-glow-green text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl animate-pulse">✅</span>
                <span>Wallet connected and authenticated on <strong className="text-yellow-400 gradient-text">{getCurrentNetworkName()}</strong></span>
              </div>
            </div>

            {/* 游戏标题 */}
            <h1 className="text-5xl font-bold text-center mb-8 gradient-text animate-shimmer">
              🎰 BLACKJACK CASINO 🎰
            </h1>

            {/* 分数和奖励区域 */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 shadow-glow-lg pulse-glow-effect">
                <h2 className="text-3xl font-bold text-center mb-2">
                  <span className="text-yellow-400">💰 Score: </span>
                  <span className="text-white animate-pulse gradient-text">{score?.player ?? 0}</span>
                </h2>
                <div className="text-sm text-gray-300 text-center mb-4">
                  (Score ≥ 1000 to be eligible for NFT reward)
                </div>
                {(score?.player ?? 0) >= 1000 && (
                  <div className="text-center">
                    <button
                      onClick={handleSentTx}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl 
                               hover:from-purple-500 hover:to-pink-500 transform hover:scale-110 transition-all duration-300 
                               shadow-glow hover:shadow-glow-lg border-2 border-purple-400 animate-pulse-glow btn-glow"
                    >
                      🏆 Claim NFT Reward 🏆
                    </button>
                  </div>
                )}
              </div>
              
              {/* 游戏消息 */}
              {message && (
                <div className="mt-4">
                  <h2 className={`text-3xl font-bold text-center px-6 py-3 rounded-xl backdrop-blur-sm border-2 transition-all duration-500 ${
                    message.includes("Player wins")
                      ? "text-green-400 bg-green-900/30 border-green-400 shadow-glow-green animate-pulse-glow"
                      : message.includes("Dealer wins")
                      ? "text-red-400 bg-red-900/30 border-red-400 shadow-glow-red"
                      : message.includes("tie")
                      ? "text-yellow-400 bg-yellow-900/30 border-yellow-400 shadow-glow"
                      : "text-gray-200 bg-gray-900/30 border-gray-400"
                  }`}>
                    {message.includes("Player wins") && "🎉 "}{message}{message.includes("Player wins") && " 🎉"}
                  </h2>
                </div>
              )}
            </div>

            {/* 游戏区域 */}
            <div className="space-y-8">
              {/* 庄家区域 */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center justify-center gap-2 gradient-text">
                  🎩 Dealer Hand
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {dealerHand.map((card, index) => (
                    <div
                      className="relative h-32 w-24 group cursor-pointer transform transition-all duration-300 hover:scale-110 card-flip"
                      key={index}
                    >
                      <div className="absolute inset-0 bg-gold-gradient rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity glow-effect"></div>
                      <div className="relative h-full w-full bg-white rounded-lg border-2 border-gray-800 flex flex-col justify-between shadow-card group-hover:shadow-card-hover card-inner">
                        <div className="self-start text-xl font-bold pt-2 pl-2 text-black">{card.rank}</div>
                        <div className="self-center text-2xl">{card.suit}</div>
                        <div className="self-end text-xl font-bold pb-2 pr-2 text-black transform rotate-180">{card.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 玩家区域 */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center justify-center gap-2 gradient-text">
                  👤 Player Hand
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {playerHand.map((card, index) => (
                    <div
                      className="relative h-32 w-24 group cursor-pointer transform transition-all duration-300 hover:scale-110 card-flip"
                      key={index}
                    >
                      <div className="absolute inset-0 bg-red-gradient rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity glow-effect"></div>
                      <div className="relative h-full w-full bg-white rounded-lg border-2 border-gray-800 flex flex-col justify-between shadow-card group-hover:shadow-card-hover card-inner">
                        <div className="self-start text-xl font-bold pt-2 pl-2 text-black">{card.rank}</div>
                        <div className="self-center text-2xl">{card.suit}</div>
                        <div className="self-end text-xl font-bold pb-2 pr-2 text-black transform rotate-180">{card.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 游戏按钮 */}
              <div className="flex justify-center gap-6 mt-8">
                {!isGameOver && (
                  <>
                    <button
                      onClick={handleHit}
                      className="px-8 py-4 bg-red-gradient text-white font-bold rounded-xl 
                               hover:scale-105 transform transition-all duration-300 
                               shadow-glow-red hover:shadow-glow-lg border-2 border-red-400 text-xl btn-glow"
                    >
                      🎯 HIT
                    </button>
                    <button
                      onClick={handleStand}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl 
                               hover:scale-105 transform transition-all duration-300 
                               shadow-glow-blue hover:shadow-glow-lg border-2 border-blue-400 text-xl btn-glow"
                    >
                      🛑 STAND
                    </button>
                  </>
                )}
                {isGameOver && (
                  <button
                    onClick={handleReset}
                    className="px-8 py-4 bg-green-gradient text-white font-bold rounded-xl 
                             hover:scale-105 transform transition-all duration-300 
                             shadow-glow-green hover:shadow-glow-lg border-2 border-green-400 text-xl animate-pulse-glow btn-glow"
                  >
                    🔄 PLAY AGAIN
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
