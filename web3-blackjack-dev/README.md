# 🎰 Web3.0 Blackjack Casino

一个基于区块链技术的豪华21点游戏，采用现代Web3.0技术栈构建，提供沉浸式的赌场体验。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC)
![Web3](https://img.shields.io/badge/Web3-Enabled-green)

## 🌟 项目特色

### 🎮 游戏特性
- **经典21点规则** - 完整的黑杰克游戏逻辑实现
- **豪华视觉设计** - 金绿色主题的高端赌场风格
- **实时游戏状态** - 动态更新的游戏界面
- **智能计分系统** - 自动计算手牌点数和游戏结果

### 🔗 Web3.0 集成
- **多链支持** - 支持以太坊主网、Sepolia测试网、Ronin Saigon测试网、Avalanche Fuji
- **钱包连接** - 通过RainbowKit集成MetaMask等钱包
- **数字签名认证** - 基于钱包签名的用户身份验证
- **智能合约交互** - 通过Viem进行链上交互
- **NFT奖励系统** - 达到分数门槛可领取NFT奖励

### 🎨 豪华UI设计
- **金色渐变效果** - 高端赌场风格的视觉效果
- **3D扑克牌动画** - 精美的卡牌翻转和悬浮效果
- **响应式布局** - 适配各种设备尺寸
- **动态光效** - 丰富的CSS动画和光影效果

## 🛠️ 技术栈

### 前端技术
- **Next.js 14.2.4** - React全栈框架
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS 4.1.13** - 原子化CSS框架
- **React 18.3.1** - 现代React特性

### Web3.0 技术
- **Wagmi** - React Hooks for Ethereum
- **Viem** - TypeScript接口的以太坊库
- **RainbowKit** - 钱包连接UI组件
- **Ethers.js 6.15.0** - 以太坊JavaScript库

### 后端服务
- **Next.js API Routes** - 服务端API
- **AWS DynamoDB** - NoSQL数据库存储
- **JWT认证** - JSON Web Token身份验证
- **Chainlink Functions** - 去中心化计算服务

### 开发工具
- **TypeScript 5.8.3** - 静态类型检查
- **ESLint** - 代码质量检查
- **PostCSS** - CSS后处理器

## 🚀 快速开始

### 环境要求
- Node.js 18.0+
- pnpm 或 npm
- MetaMask钱包

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/NeoWeb3Nova/blackjack-web3.0.git
cd blackjack-web3.0/web3-blackjack-dev
```

2. **安装依赖**
```bash
pnpm install
# 或
npm install
```

3. **环境配置**
创建 `.env.local` 文件并配置以下变量：
```env
# AWS配置
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# JWT配置
JWT_SECRET=your_jwt_secret_key

# Chainlink Functions配置
ETHEREUM_PROVIDER_AVALANCHEFUJI=your_avalanche_rpc_url
EVM_PRIVATE_KEY=your_private_key
AWS_API_KEY=your_aws_api_key

# 智能合约配置
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_CONTRACT_ABI=your_contract_abi
```

4. **启动开发服务器**
```bash
pnpm dev
# 或
npm run dev
```

5. **访问应用**
打开浏览器访问 `http://localhost:3000`

## 🎯 游戏玩法

### 基础规则
1. **连接钱包** - 使用MetaMask等Web3钱包连接
2. **身份认证** - 通过数字签名完成身份验证
3. **开始游戏** - 系统自动发牌，玩家和庄家各得两张牌
4. **游戏操作**：
   - **HIT** - 要牌（增加一张牌）
   - **STAND** - 停牌（结束回合）
5. **胜负判定**：
   - 点数接近21且不超过21者获胜
   - 超过21点即为爆牌（失败）
   - 庄家必须在17点以下继续要牌

### 计分系统
- **获胜** +100分
- **失败** -100分
- **平局** 0分
- **NFT奖励** 达到1000分可领取

## 📁 项目结构

```
web3-blackjack-dev/
├── src/
│   ├── app/
│   │   ├── globals.css          # 全局样式和动画
│   │   ├── layout.tsx           # 应用布局
│   │   ├── page.tsx             # 主游戏页面
│   │   ├── providers.tsx        # Web3提供者配置
│   │   ├── api/
│   │   │   └── route.ts         # API路由处理
│   │   ├── debug/
│   │   │   └── page.tsx         # 调试页面
│   │   └── showcase/
│   │       └── page.tsx         # 卡牌展示页面
│   ├── components/
│   │   ├── LuxuryCard.tsx       # 豪华扑克牌组件
│   │   └── SuitIcon.tsx         # 花色图标组件
│   └── wagmi.ts                 # Web3配置
├── public/
│   └── images/
│       └── cards/               # 卡牌图片资源
├── package.json                 # 项目依赖
├── tailwind.config.js           # Tailwind配置
├── tsconfig.json               # TypeScript配置
├── next.config.js              # Next.js配置
└── uploadSecretToDON.js        # Chainlink Functions配置
```

## 🎨 设计系统

### 色彩方案
- **主色调**：深绿色赌场背景 (`#0F172A` → `#166534`)
- **金色系**：豪华金色装饰 (`#F59E0B`, `#D4AF37`, `#FFD700`)
- **辅助色**：白色文字、灰色次要信息

### 动画效果
- **浮动动画** - 卡片和装饰元素的上下浮动
- **光晕效果** - 金色发光边框和阴影
- **闪烁动画** - 渐变背景的动态效果
- **悬浮变换** - 鼠标交互的3D变换

### 组件设计
- **LuxuryCard** - 豪华扑克牌组件，支持所有花色和点数
- **SuitIcon** - 可定制的花色图标组件
- **游戏按钮** - 带动画效果的交互按钮

## 🔧 API接口

### 游戏API (`/api`)

#### GET /api
**功能**：初始化游戏
- **参数**：`address` (钱包地址)
- **返回**：初始游戏状态

#### POST /api
**功能**：游戏操作
- **认证**：需要JWT Token
- **操作类型**：
  - `auth` - 身份认证
  - `hit` - 要牌
  - `stand` - 停牌
  - `reset` - 重置游戏

### 数据存储
使用AWS DynamoDB存储玩家数据：
- **表名**：BlackJack
- **主键**：Player (钱包地址)
- **字段**：Score, GamesPlayed, LastPlayed

## 🌐 支持的区块链网络

| 网络 | Chain ID | 状态 | 用途 |
|------|----------|------|------|
| Ethereum Mainnet | 1 | ✅ | 生产环境 |
| Sepolia Testnet | 11155111 | ✅ | 测试环境 |
| Ronin Saigon Testnet | 2021 | ✅ | 游戏专用 |
| Avalanche Fuji | 43113 | ✅ | 开发测试 |

## 🔐 安全特性

### 身份认证
- **钱包签名验证** - 使用viem验证消息签名
- **JWT令牌** - 基于钱包地址生成的会话令牌
- **地址验证** - 确保操作者与签名者一致

### 数据安全
- **环境变量保护** - 敏感配置使用环境变量
- **API权限控制** - 基于JWT的API访问控制
- **输入验证** - 严格的参数验证和错误处理

## 🏆 NFT奖励系统

当玩家分数达到1000分或以上时，可以领取NFT奖励：

1. **资格检查** - 自动检测分数是否达标
2. **合约交互** - 通过智能合约铸造NFT
3. **交易签名** - 用户确认交易并支付Gas费
4. **奖励发放** - NFT自动发送到用户钱包

## 🚀 部署指南

### Vercel部署
1. 将项目推送到GitHub
2. 连接Vercel账户
3. 配置环境变量
4. 自动部署

### 自定义部署
```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start
```

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📝 更新日志

### v1.0.0 (2025-09-12)
- ✨ 完整的Web3.0 21点游戏实现
- 🎨 豪华UI设计系统
- 🔗 多链钱包集成
- 💾 AWS DynamoDB数据存储
- 🏆 NFT奖励系统
- 🔐 安全的身份认证系统

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- **项目所有者**：NeoWeb3Nova
- **仓库地址**：https://github.com/NeoWeb3Nova/blackjack-web3.0
- **问题反馈**：[GitHub Issues](https://github.com/NeoWeb3Nova/blackjack-web3.0/issues)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - 强大的React框架
- [Wagmi](https://wagmi.sh/) - 优秀的React Web3 Hooks
- [RainbowKit](https://www.rainbowkit.com/) - 美观的钱包连接组件
- [Tailwind CSS](https://tailwindcss.com/) - 高效的CSS框架
- [Chainlink](https://chain.link/) - 去中心化预言机网络

---

⭐ **如果这个项目对你有帮助，请给我们一个星标！** ⭐
