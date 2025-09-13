# Blackjack Web3.0

![Blackjack Web3.0 Logo](https://regional-gold-sturgeon.myfilebase.com/ipfs/Qmb7KY9nhcLBvSexVHGtfb5KtnsDjDLesxh624WsV3MyUB)

**A decentralized Blackjack game built on Web3.0 technologies**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)](https://reactjs.org/)
[![Web3.js](https://img.shields.io/badge/web3.js-%5E4.0.0-orange.svg)](https://web3js.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Demo](https://blackjack-web3-demo.vercel.app) • [Documentation](docs/) • [Report Bug](https://github.com/NeoWeb3Nova/blackjack-web3.0/issues) • [Request Feature](https://github.com/NeoWeb3Nova/blackjack-web3.0/issues)

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [API Documentation](#api-documentation)
- [Smart Contract](#smart-contract)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## 🎮 About the Project

Blackjack Web3.0 is a decentralized implementation of the classic Blackjack card game, leveraging blockchain technology to ensure transparency, fairness, and true ownership of digital assets. Players can connect their Web3 wallets, play with cryptocurrency, and earn NFT rewards.

### Why Web3.0 Blackjack?

- **🔒 Provably Fair**: All game logic runs on smart contracts ensuring transparency
- **🎨 NFT Rewards**: Earn unique NFTs based on your gameplay achievements  
- **💰 Crypto Integration**: Play with real cryptocurrency across multiple chains
- **🌐 Decentralized**: No central authority controls the game
- **🎯 Modern UI**: Beautiful, responsive interface with smooth animations

## ✨ Features

### Core Gameplay
- ♠️ **Classic Blackjack Rules** - Standard casino rules with dealer AI
- 🎲 **Provably Fair** - Blockchain-verified randomness
- 💎 **Multi-Chain Support** - Ethereum, Polygon, BSC compatibility
- 🏆 **Achievement System** - Unlock rewards for milestones

### Web3.0 Integration
- 🔗 **Wallet Connection** - MetaMask, WalletConnect, Coinbase Wallet
- 💰 **Cryptocurrency Betting** - ETH, MATIC, BNB support
- 🎨 **NFT Rewards** - Collectible cards and achievements
- 📊 **On-Chain Statistics** - Transparent game history

### Technical Features
- ⚡ **Real-time Updates** - WebSocket connections
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark/Light Mode** - User preference themes
- 🔄 **Auto-save** - Game state persistence

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Next.js** - React framework for production

### Web3.0
- **Web3.js** - Ethereum JavaScript API
- **Ethers.js** - Ethereum wallet implementation
- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development environment

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **WebSocket** - Real-time communication
- **MongoDB** - Document database

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0 or **pnpm** >= 8.0.0
- **Git**
- **MetaMask** browser extension

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NeoWeb3Nova/blackjack-web3.0.git
   cd blackjack-web3.0
   ```

2. **Navigate to the project directory**
   ```bash
   cd web3-blackjack-dev
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_INFURA_ID=your_infura_project_id
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   MONGODB_URI=your_mongodb_connection_string
   CONTRACT_ADDRESS=deployed_contract_address
   PRIVATE_KEY=your_private_key_for_deployment
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Connecting Your Wallet

1. Click "Connect Wallet" in the top navigation
2. Choose your preferred wallet (MetaMask recommended)
3. Approve the connection request
4. Ensure you have sufficient funds for gas fees

### Playing the Game

1. **Place Your Bet**: Choose your bet amount
2. **Deal Cards**: Click "Deal" to start the round
3. **Make Decisions**: Hit, Stand, Double Down, or Split
4. **Win Rewards**: Earn cryptocurrency and potential NFTs

### Earning NFTs

- **First Win**: Welcome NFT card
- **Blackjack**: Special Blackjack achievement NFT
- **Win Streak**: Consecutive wins unlock rare NFTs
- **High Roller**: Large bet amounts earn exclusive cards

## 📚 Game Rules

### Basic Rules
- Goal: Get closer to 21 than the dealer without going over
- Number cards worth face value, face cards worth 10, Aces worth 1 or 11
- Blackjack (21 with first 2 cards) pays 3:2
- Insurance available when dealer shows Ace

### Payouts
| Hand Type | Payout |
|-----------|--------|
| Blackjack | 3:2 |
| Regular Win | 1:1 |
| Insurance | 2:1 |
| Push | Even |

### Special Actions
- **Hit**: Take another card
- **Stand**: Keep current hand
- **Double Down**: Double bet, take one card
- **Split**: Split pairs into two hands
- **Insurance**: Side bet when dealer shows Ace

## 📖 API Documentation

### REST Endpoints

#### Game Operations
```http
POST /api/game/start
Content-Type: application/json

{
  "playerAddress": "0x...",
  "betAmount": "0.1"
}
```

#### Player Statistics
```http
GET /api/player/:address/stats
```

Response:
```json
{
  "totalGames": 150,
  "wins": 75,
  "winRate": 0.5,
  "totalWinnings": "5.75",
  "nftsEarned": 8
}
```

### WebSocket Events

```javascript
// Connect to game updates
socket.on('gameUpdate', (data) => {
  console.log('Game state:', data);
});

// Send player action
socket.emit('playerAction', {
  action: 'hit',
  gameId: 'game_123'
});
```

## 🔗 Smart Contract

### Contract Addresses

| Network | Address |
|---------|---------|
| Ethereum Mainnet | `0x...` |
| Polygon | `0x...` |
| BSC | `0x...` |
| Sepolia (Testnet) | `0x...` |

### Key Functions

```solidity
// Place a bet and start game
function startGame(uint256 betAmount) external payable;

// Player actions during game
function hit(uint256 gameId) external;
function stand(uint256 gameId) external;
function doubleDown(uint256 gameId) external payable;

// Get game state
function getGameState(uint256 gameId) external view returns (GameState);
```

## 📁 Project Structure

```
blackjack-web3.0/
├── web3-blackjack-dev/           # Main project directory
│   ├── src/
│   │   ├── app/                  # Next.js app directory
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── globals.css      # Global styles
│   │   │   ├── providers.tsx    # Context providers
│   │   │   ├── api/             # API routes
│   │   │   ├── debug/           # Debug page
│   │   │   └── showcase/        # Showcase page
│   │   ├── components/          # React components
│   │   │   ├── LuxuryCard.tsx   # Luxury card component
│   │   │   └── SuitIcon.tsx     # Card suit icon
│   │   └── wagmi.ts            # Wagmi configuration
│   ├── public/                  # Static assets
│   │   └── images/
│   │       └── cards/          # Card images
│   ├── package.json            # Dependencies
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── uploadSecretToDON.js    # Chainlink Functions upload script
└── README.md                   # This file
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### Development Process

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

### Code Style

We use:
- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **Conventional Commits** for commit messages

## 🐛 Issues and Support

Found a bug or need help? We're here to help!

- **Bug Reports**: [Create an issue](https://github.com/NeoWeb3Nova/blackjack-web3.0/issues/new?template=bug_report.md)
- **Feature Requests**: [Request a feature](https://github.com/NeoWeb3Nova/blackjack-web3.0/issues/new?template=feature_request.md)
- **Security Issues**: Email security@blackjack-web3.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Project Maintainer**: NeoWeb3Nova

- 🐦 Twitter: [@NeoWeb3Nova](https://twitter.com/NeoWeb3Nova)
- 📧 Email: contact@blackjack-web3.com
- 💬 Discord: [Join our community](https://discord.gg/blackjack-web3)
- 🌐 Website: [blackjack-web3.com](https://blackjack-web3.com)

**Project Link**: [https://github.com/NeoWeb3Nova/blackjack-web3.0](https://github.com/NeoWeb3Nova/blackjack-web3.0)

## 🙏 Acknowledgments

Special thanks to:

- **OpenZeppelin** - For secure smart contract libraries
- **Hardhat** - For excellent development tools
- **Vercel** - For seamless deployment platform
- **MetaMask** - For wallet integration
- **Next.js Community** - For amazing ecosystem
- **All Contributors** - For making this project possible

---

**[⬆ Back to Top](#blackjack-web30)**

Made with ❤️ by the Web3.0 Gaming Community

[![Built with Love](https://img.shields.io/badge/Built%20with-Love-red?style=for-the-badge&logo=heart)](https://github.com/NeoWeb3Nova/blackjack-web3.0)
