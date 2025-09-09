import { json } from "stream/consumers";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { AwsCredentialIdentity } from "@aws-sdk/types";
import { verifyMessage } from "viem";
import jwt from "jsonwebtoken";

// AWS Configuration
const awsConfig: {
  region: string;
  credentials: AwsCredentialIdentity;
} = {
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "your-access-key-id",
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY || "your-secret-access-key",
  },
};

// Define the player score interface
interface PlayerScore {
  Player: string;
  Score: number;
  GamesPlayed: number;
  LastPlayed: string;
}

// Initialize DynamoDB client with configuration
const client = new DynamoDBClient(awsConfig);
const docClient = DynamoDBDocumentClient.from(client);

// Table configuration
const TABLE_NAME = "BlackJack";

// Function to add or update a player's score
async function savePlayerScore(player: string, score: number): Promise<void> {
  try {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        Player: player,
        Score: score,
        GamesPlayed: 1,
        LastPlayed: new Date().toISOString(),
      },
    });

    await docClient.send(command);
    console.log(`Successfully saved score for player: ${player}`);
  } catch (error) {
    console.error("Error saving player score:", error);
    throw error;
  }
}

// Function to increment a player's score and games played
async function updatePlayerScore(
  player: string,
  scoreIncrement: number
): Promise<void> {
  try {
    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { Player: player },
      UpdateExpression:
        "SET Score = Score + :score, GamesPlayed = GamesPlayed + :inc, LastPlayed = :date",
      ExpressionAttributeValues: {
        ":score": scoreIncrement,
        ":inc": 1,
        ":date": new Date().toISOString(),
      },
    });

    await docClient.send(command);
    console.log(`Successfully updated score for player: ${player}`);
  } catch (error) {
    console.error("Error updating player score:", error);
    throw error;
  }
}

// Function to get a player's score
async function getPlayerScore(player: string): Promise<PlayerScore | null> {
  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { Player: player },
    });

    const response = await docClient.send(command);
    console.log(`Successfully got score for player: ${player}`);
    return response.Item as PlayerScore | null;
  } catch (error) {
    console.error("Error getting player score:", error);
    throw error;
  }
}

// Example usage
async function main_demo() {
  try {
    // Save new player score
    await savePlayerScore("player1", 100);

    // Update existing player score
    await updatePlayerScore("player1", 50);

    // Get player score
    const playerScore = await getPlayerScore("player1");
    console.log("Player score:", playerScore);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

export interface Card {
  rank: string;
  suit: string;
}

const suits = ["♠️", "♥️", "♦️", "♣️"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const initialDeck = suits
  .map((suit) => ranks.map((rank) => ({ suit: suit, rank: rank })))
  .flat();

const gameState: {
  playerHand: Card[];
  dealerHand: Card[];
  deck: Card[];
  message: string;
  score?: { player: number };
} = {
  playerHand: [],
  dealerHand: [],
  deck: initialDeck,
  message: "",
  score: { player: 0 },
};

function getRandomCards(deck: Card[], count: number) {
  const randomIndexSet = new Set<number>();
  while (randomIndexSet.size < count) {
    randomIndexSet.add(Math.floor(Math.random() * deck.length));
  }

  const randomCards = deck.filter((_, index) => randomIndexSet.has(index));
  const remainingDeck = deck.filter((_, index) => !randomIndexSet.has(index));
  return { randomCards, remainingDeck };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");
  if (!address) {
    return new Response(JSON.stringify({ message: "No address provided" }), {
      status: 400,
    });
  }
  console.log("Game start for address:", address);

  // reset the game GameState
  gameState.playerHand = [];
  gameState.dealerHand = [];
  gameState.deck = initialDeck;
  gameState.message = "";

  const { randomCards: playerCards, remainingDeck } = getRandomCards(
    gameState.deck,
    2
  );
  const { randomCards: dealerCards, remainingDeck: finalDeck } = getRandomCards(
    remainingDeck,
    2
  );

  gameState.playerHand = playerCards;
  gameState.dealerHand = dealerCards;
  gameState.deck = finalDeck;
  gameState.message = "";

  try {
    const data = await getPlayerScore(address);
    if (data) {
      gameState.score = { player: data.Score };
    } else {
      gameState.score = { player: 0 };
    }
  } catch (error) {
    console.error("Error fetching player score:", error);
    gameState.score = { player: 0 };
    return new Response(
      JSON.stringify({
        message: "Error fetching player score from AWS database",
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      playerHand: gameState.playerHand,
      dealerHand: [gameState.dealerHand[0], { rank: "?", suit: "?" } as Card],
      message: gameState.message,
      score: gameState.score,
    }),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body) {
    return new Response(JSON.stringify({ message: "No action provided" }), {
      status: 400,
    });
  }

  const { action, address, message, signature } = body;

  // 对于认证操作，跳过JWT验证
  if (action === "auth") {
    // 认证操作不需要JWT验证，直接进入switch语句
  } else {
    // 验证 JWT
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "No token provided" }), {
        status: 401,
      });
    }

    const token = authHeader.split(" ")[1];
    
    // 检查 token 是否存在
    if (!token || token === "null" || token === "undefined") {
      return new Response(JSON.stringify({ message: "Invalid token format" }), {
        status: 401,
      });
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key-for-development";
      const data = jwt.verify(token, JWT_SECRET) as {address: string};
      
      if (!data.address || data.address.toLowerCase() !== address?.toLowerCase()) {
        return new Response(JSON.stringify({ message: "Token address mismatch" }), {
          status: 401,
        });
      }
      console.log("Token is valid for address:", data.address);
    } catch (error) {
      console.error("JWT verification failed:", error);
      return new Response(JSON.stringify({ message: "Invalid or expired token" }), {
        status: 401,
      });
    }
  }

  if (!action) {
    return new Response(JSON.stringify({ message: "No action provided" }), {
      status: 400,
    });
  }

  // 对于需要保存分数的操作，验证address是否存在
  if ((action === "hit" || action === "stand") && !address) {
    return new Response(JSON.stringify({ message: "Address is required for game actions" }), {
      status: 400,
    });
  }

  switch (action) {
    case "auth":
      // Authentication logic would go here
      console.log("Auth attempt from address:", address);
      console.log("With signature:", signature);
      const isValid = await verifyMessage({
        message: message,
        signature: signature,
        address: address,
      }).catch((e) => {
        console.error("Error verifying message:", e);
        return false;
      });
      if (isValid) {
        const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key-for-development";
        const token = jwt.sign(
          { address: address },
          JWT_SECRET
        );
        console.log("Generated JWT:", token);

        return new Response(JSON.stringify({ message: "Auth successful", jsonwebtoken: token }), {
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ message: "Auth failed" }), {
          status: 401,
        });
      }
    case "hit":
      const { randomCards: hitCards, remainingDeck } = getRandomCards(
        gameState.deck,
        1
      );
      gameState.playerHand.push(...hitCards);
      gameState.deck = remainingDeck;

      const playerValue = calculateHandValue(gameState.playerHand);
      if (playerValue > 21) {
        gameState.message = "Player busts! Dealer wins.";
        gameState.score!.player -= 100;
      } else {
        gameState.message = "Player stands";
      }

      break;
    case "stand":
      while (calculateHandValue(gameState.dealerHand) < 17) {
        const { randomCards: dealerHitCards, remainingDeck } = getRandomCards(
          gameState.deck,
          1
        );
        gameState.dealerHand.push(...dealerHitCards);
        gameState.deck = remainingDeck;
      }

      const dealerHandValue = calculateHandValue(gameState.dealerHand);
      if (dealerHandValue > 21) {
        gameState.message = "Dealer busts! Player wins.";
        gameState.score!.player += 100;
      } else if (dealerHandValue === 21) {
        gameState.message = "Dealer hits blackjack! Dealer wins.";
        gameState.score!.player -= 100;
      } else {
        const playerHandValue = calculateHandValue(gameState.playerHand);
        if (playerHandValue > dealerHandValue) {
          gameState.message = "Player wins!";
          gameState.score!.player += 100;
        } else if (playerHandValue < dealerHandValue) {
          gameState.message = "Dealer wins!";
          gameState.score!.player -= 100;
        } else {
          gameState.message = "It's a tie!";
        }
      }
      break;
    case "reset":
      gameState.playerHand = [];
      gameState.dealerHand = [];
      gameState.deck = initialDeck;
      gameState.message = "";
      break;
    default:
      return new Response(JSON.stringify({ message: "Invalid action" }), {
        status: 400,
      });
  }

  try {
    // 只有在有有效地址时才保存分数
    if (address && address.trim()) {
      await savePlayerScore(
        address,
        gameState.score?.player ?? 0
      );
    } else {
      console.warn("No valid address provided, skipping score save");
    }
  } catch (error) {
    console.error("Error saving player score:", error);
    gameState.score = { player: 0 };
  }

  return new Response(
    JSON.stringify({
      playerHand: gameState.playerHand,
      dealerHand:
        gameState.message === ""
          ? [gameState.dealerHand[0], { rank: "?", suit: "?" } as Card]
          : gameState.dealerHand,
      message: gameState.message,
      score: gameState.score,
    }),
    { status: 200 }
  );
}

function calculateHandValue(hand: Card[]): number {
  let value = 0;
  let aceCount = 0;
  hand.forEach((card) => {
    if (card.rank === "A") {
      aceCount += 1;
      value += 11;
    } else if (["K", "Q", "J"].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  });
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount -= 1;
  }
  return value;
}
