# 🎰 Web3.0 Blackjack Casino

**A luxury blockchain-powered Blackjack game with stunning visual design and Web3.0 integration**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC)](https://tailwindcss.com/)
[![Wagmi](https://img.shields.io/badge/Wagmi-latest-green)](https://wagmi.sh/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> **Note**: This is a development version focusing on frontend implementation and Web3 integration. Backend game logic and smart contracts are under development.

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎮 About the Project

Web3.0 Blackjack Casino is a modern implementation of the classic Blackjack card game, featuring luxury casino-style visuals and blockchain integration. The project focuses on delivering an immersive gaming experience with beautifully designed playing cards and seamless Web3 wallet connectivity.

### Key Highlights

- **🎨 Luxury Design**: Gold-green themed playing cards with premium casino aesthetics
- **⚡ Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **� Multi-Chain Support**: Ethereum Mainnet, Sepolia, Avalanche Fuji, Ronin Saigon Testnet
- **📱 Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎯 Web3 Ready**: Integrated with Wagmi and RainbowKit for wallet connections

## ✨ Features

### 🃏 Game Features
- **Classic Blackjack Gameplay** - Traditional 21-point card game rules
- **Luxury Card Design** - Premium gold-green themed playing cards with animations
- **Real-time Game State** - Dynamic game updates and score tracking
- **Responsive UI** - Optimized for all screen sizes

### 🔗 Web3.0 Integration
- **Multi-Wallet Support** - MetaMask and other Web3 wallets via RainbowKit
- **Multi-Chain Support** - Ethereum, Sepolia, Avalanche Fuji, Ronin Saigon
- **Smart Contract Ready** - Prepared for blockchain game logic integration
- **Chainlink Functions** - Integration ready for decentralized randomness

### 🎯 Technical Features
- **Modern Frontend** - Next.js 14 with App Router
- **Type Safety** - Full TypeScript implementation  
- **Styling** - Tailwind CSS with custom animations
- **State Management** - React hooks and context
- **Database Ready** - AWS DynamoDB integration for player scores

## 🛠 Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with concurrent features
- **[TypeScript 5.8.3](https://typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4.1.13](https://tailwindcss.com/)** - Utility-first CSS framework

### Web3.0 Stack
- **[Wagmi](https://wagmi.sh/)** - React hooks for Ethereum
- **[Viem](https://viem.sh/)** - TypeScript interface for Ethereum
- **[RainbowKit](https://rainbowkit.com/)** - Wallet connection UI
- **[Ethers.js 6.15.0](https://ethers.org/)** - Ethereum library

### Backend & Database
- **[AWS DynamoDB](https://aws.amazon.com/dynamodb/)** - NoSQL database for player scores
- **[JWT](https://jwt.io/)** - Authentication tokens
- **[Chainlink Functions](https://chain.link/)** - Decentralized computing (integration ready)

### Development Tools
- **[pnpm](https://pnpm.io/)** - Package manager
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[ESLint](https://eslint.org/)** - Code linting

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommended) or **npm** >= 8.0.0
- **Git**
- **MetaMask** or other Web3 wallet (for testing)

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
   ```

### Environment Setup

1. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure your environment variables**
   ```env
   # AWS Configuration (for player scores)
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   
   # Chainlink Functions (optional)
   PRIVATE_KEY=your_private_key_for_deployment
   
   # Smart Contract (when ready)
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
   NEXT_PUBLIC_CONTRACT_ABI=your_contract_abi
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Connecting Your Wallet

1. Click the "Connect Wallet" button in the top navigation
2. Select your preferred wallet (MetaMask recommended)
3. Approve the connection request in your wallet
4. Sign the authentication message when prompted

### Playing the Game

1. **Connect Wallet** - First connect your Web3 wallet
2. **Start Game** - The game initializes automatically after wallet connection
3. **View Cards** - See your hand and the dealer's cards
4. **Game Actions** - Use Hit, Stand, and other action buttons
5. **Track Score** - Monitor your game score and statistics

### Supported Networks

The application supports the following blockchain networks:
- **Ethereum Mainnet** - For production gameplay
- **Sepolia Testnet** - For testing without real funds
- **Avalanche Fuji** - Avalanche test network
- **Ronin Saigon Testnet** - For gaming-focused testing

## 📁 Project Structure

```
blackjack-web3.0/
├── web3-blackjack-dev/           # Main application directory
│   ├── src/
│   │   ├── app/                  # Next.js 14 app directory
│   │   │   ├── page.tsx         # Main game page
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── globals.css      # Global styles
│   │   │   ├── providers.tsx    # Context providers
│   │   │   ├── api/             # API routes
│   │   │   │   └── route.ts     # Game API and database
│   │   │   ├── debug/           # Debug utilities
│   │   │   │   └── page.tsx     # Debug page
│   │   │   └── showcase/        # Card showcase
│   │   │       └── page.tsx     # Design showcase
│   │   ├── components/          # React components
│   │   │   ├── LuxuryCard.tsx   # Luxury playing card
│   │   │   └── SuitIcon.tsx     # Card suit icons
│   │   └── wagmi.ts            # Wagmi configuration
│   ├── public/                  # Static assets
│   │   └── images/
│   │       └── cards/          # Card images
│   ├── package.json            # Dependencies
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── uploadSecretToDON.js    # Chainlink Functions script
│   ├── LUXURY_CARDS_README.md  # Card design documentation
│   └── README.md              # Project documentation
└── README.md                   # This file
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Development Guidelines

1. **Code Style**: Follow TypeScript and ESLint conventions
2. **Components**: Use functional components with hooks
3. **Styling**: Utilize Tailwind CSS classes
4. **Web3**: Use Wagmi hooks for blockchain interactions
5. **State**: Manage state with React hooks and context

### Key Components

#### LuxuryCard Component
```tsx
import { LuxuryCard } from '@/components/LuxuryCard';

<LuxuryCard
  rank="A"
  suit="♠"
  className="animate-float"
  style={{ animationDelay: '200ms' }}
/>
```

#### Supported Cards
- **Ranks**: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K
- **Suits**: ♠ (Spades), ♥ (Hearts), ♦ (Diamonds), ♣ (Clubs)

### Database Schema (AWS DynamoDB)

```typescript
interface PlayerScore {
  Player: string;        // Wallet address (Primary Key)
  Score: number;         // Player's total score
  GamesPlayed: number;   // Total games played
  LastPlayed: string;    // ISO timestamp of last game
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Set the following in Vercel dashboard:
   - `AWS_REGION`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS` (when available)
   - `NEXT_PUBLIC_CONTRACT_ABI` (when available)

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Basic UI/UX implementation
- [x] Luxury card design system
- [x] Web3 wallet integration
- [x] Multi-chain support
- [x] Player score tracking

### Phase 2: Game Logic (In Progress)
- [ ] Complete Blackjack game implementation
- [ ] Dealer AI logic
- [ ] Game state management
- [ ] Win/loss calculations
- [ ] Betting system

### Phase 3: Blockchain Integration (Planned)
- [ ] Smart contract development
- [ ] On-chain game logic
- [ ] Provably fair randomness
- [ ] Cryptocurrency betting
- [ ] Transaction handling

### Phase 4: Advanced Features (Future)
- [ ] NFT rewards system
- [ ] Tournament mode
- [ ] Leaderboards
- [ ] Social features
- [ ] Mobile app

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Process

1. Check existing [issues](https://github.com/NeoWeb3Nova/blackjack-web3.0/issues)
2. Create an issue for new features or bugs
3. Follow the coding standards
4. Write clear commit messages
5. Update documentation as needed

### Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update README if needed

## 🐛 Issues and Support

Having trouble? We're here to help!

- 🐛 **Bug Reports**: [Create an issue](https://github.com/NeoWeb3Nova/blackjack-web3.0/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](https://github.com/NeoWeb3Nova/blackjack-web3.0/issues/new?template=feature_request.md)
- 💬 **Questions**: [Join discussions](https://github.com/NeoWeb3Nova/blackjack-web3.0/discussions)
- 🔒 **Security**: Email security@example.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 NeoWeb3Nova

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 📞 Contact

**Project Maintainer**: NeoWeb3Nova

- 🐙 **GitHub**: [@NeoWeb3Nova](https://github.com/NeoWeb3Nova)
- 📧 **Email**: contact@example.com
- 🌐 **Project Link**: [https://github.com/NeoWeb3Nova/blackjack-web3.0](https://github.com/NeoWeb3Nova/blackjack-web3.0)

## 🙏 Acknowledgments

Special thanks to the open-source community and these amazing projects:

- **[Next.js](https://nextjs.org/)** - For the amazing React framework
- **[Wagmi](https://wagmi.sh/)** - For excellent Web3 React hooks  
- **[RainbowKit](https://rainbowkit.com/)** - For beautiful wallet connection UI
- **[Tailwind CSS](https://tailwindcss.com/)** - For utility-first CSS framework
- **[Chainlink](https://chain.link/)** - For decentralized oracle services
- **[AWS](https://aws.amazon.com/)** - For cloud infrastructure services
- **All Contributors** - For making this project possible

---

**⭐ Star this repository if you find it useful!**

**[⬆ Back to Top](#-web30-blackjack-casino)**

Made with ❤️ by the Web3.0 Gaming Community
