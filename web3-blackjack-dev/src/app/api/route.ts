import { json } from "stream/consumers";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { AwsCredentialIdentity } from "@aws-sdk/types";

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

const DefaultScore = { player: "alpha" };

export async function GET() {
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
    const data = await getPlayerScore(DefaultScore.player.toString());
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
  const { action } = await request.json();

  switch (action) {
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
    await savePlayerScore(
      DefaultScore.player.toString(),
      gameState.score?.player ?? 0
    );
  } catch (error) {
    console.error("Error in main_demo:", error);
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
