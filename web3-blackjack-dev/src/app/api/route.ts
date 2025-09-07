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
    message: string
} = {
    playerHand: [],
    dealerHand: [],
    deck: initialDeck,
    message: ""
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

/// Shuffle the deck
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
            message: gameState.message
        }
    ), {status: 200})
}
