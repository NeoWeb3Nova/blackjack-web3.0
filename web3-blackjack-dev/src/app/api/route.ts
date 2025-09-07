import { json } from "stream/consumers";

export interface Card {
    rank: string,
    suit: string
}

const suits = ['♠️', '♥️', '♦️', '♣️']
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const initialDeck = suits.map(suit => ranks.map(rank => ({suit: suit, rank: rank}))).flat()

const gameState: {
    playerHand: Card[],
    dealerHand: Card[],
    deck: Card[],
    message: string, 
    score?: {player: number}
} = {
    playerHand: [],
    dealerHand: [],
    deck: initialDeck,
    message: "",
    score: {player: 0}
};

function getRandomCards(deck: Card[], count: number) {
    const randomIndexSet = new Set<number>()
    while( randomIndexSet.size < count) {
        randomIndexSet.add(Math.floor(Math.random() * deck.length))
    }

    const randomCards = deck.filter((_, index) => randomIndexSet.has(index))
    const remainingDeck = deck.filter((_, index) => !randomIndexSet.has(index))
    return {randomCards, remainingDeck}
}

export function GET() {
    // reset the game GameState
    gameState.playerHand = []
    gameState.dealerHand = []
    gameState.deck = initialDeck    
    gameState.message = ""


    const { randomCards: playerCards, remainingDeck } = getRandomCards(gameState.deck, 2)
    const { randomCards: dealerCards, remainingDeck: finalDeck } = getRandomCards(remainingDeck, 2)
    
    gameState.playerHand = playerCards
    gameState.dealerHand = dealerCards
    gameState.deck = finalDeck
    gameState.message = ""
    return new Response(JSON.stringify(
        {
            playerHand: gameState.playerHand,
            dealerHand: [gameState.dealerHand[0], {rank: "?", suit: "?"} as Card],
            message: gameState.message,
            score: gameState.score
        }
    ), {status: 200})
}

export async function POST(request: Request) {

    const {action} = await request.json()

    switch(action) {
        case "hit":
            const { randomCards: hitCards, remainingDeck } = getRandomCards(gameState.deck, 1)
            gameState.playerHand.push(...hitCards)
            gameState.deck = remainingDeck

            const playerValue = calculateHandValue(gameState.playerHand)
            if (playerValue > 21) {
                gameState.message = "Player busts! Dealer wins."
                gameState.score!.player -= 1;
            } else {
                gameState.message = "Player stands"
            }

            break
        case "stand":
            while(calculateHandValue(gameState.dealerHand) < 17 ) {
                const { randomCards: dealerHitCards, remainingDeck } = getRandomCards(gameState.deck, 1)
                gameState.dealerHand.push(...dealerHitCards)
                gameState.deck = remainingDeck  
            }

            const dealerHandValue = calculateHandValue(gameState.dealerHand)
            if(dealerHandValue  > 21) {
                gameState.message = "Dealer busts! Player wins."
                gameState.score!.player += 100;
            }   
            else if(dealerHandValue === 21) {
                gameState.message = "Dealer hits blackjack! Dealer wins."
                gameState.score!.player -= 1;
            }
            else {
                const playerHandValue = calculateHandValue(gameState.playerHand)
                if (playerHandValue > dealerHandValue) {
                    gameState.message = "Player wins!"
                    gameState.score!.player += 100;
                } else if (playerHandValue < dealerHandValue) {
                    gameState.message = "Dealer wins!"
                    gameState.score!.player -= 1;
                } else {
                    gameState.message = "It's a tie!"
                }
            }
            break
        case "reset":
            gameState.playerHand = []
            gameState.dealerHand = []
            gameState.deck = initialDeck
            gameState.message = ""
            break
        default:
            return new Response(JSON.stringify({message: "Invalid action"}), {status: 400})
    }

    return new Response(JSON.stringify(
        {
            playerHand: gameState.playerHand,
            dealerHand: gameState.message === "" ? [gameState.dealerHand[0], {rank: "?", suit: "?"} as Card] : gameState.dealerHand,
            message: gameState.message,
            score: gameState.score
        }
    ), {status: 200})
}

function calculateHandValue(hand: Card[]): number {
    let value = 0
    let aceCount = 0
    hand.forEach(card => {
        if (card.rank === "A") {
            aceCount += 1
            value += 11
        } else if (["K", "Q", "J"].includes(card.rank)) {
            value += 10
        } else {
            value += parseInt(card.rank)
        }
    })
    while (value > 21 && aceCount > 0) {
        value -= 10
        aceCount -= 1
    }
    return value
}