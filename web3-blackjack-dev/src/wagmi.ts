import { cookieStorage, createConfig, createStorage, http } from 'wagmi'
import { mainnet, sepolia, avalancheFuji } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Ronin Saigon Testnet configuration
const roninSaigonTestnet = {
  id: 2021,
  name: 'Ronin Saigon Testnet',
  network: 'ronin-saigon-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'RON',
    symbol: 'RON',
  },
  rpcUrls: {
    public: { http: ['https://saigon-testnet.roninchain.com/rpc'] },
    default: { http: ['https://saigon-testnet.roninchain.com/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Ronin Explorer', url: 'https://saigon-app.roninchain.com' },
  },
} as const

// Create a single instance of the config
const config = createConfig({
  chains: [mainnet, sepolia, roninSaigonTestnet, avalancheFuji],
  connectors: [
    injected({
      target: 'metaMask',
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [roninSaigonTestnet.id]: http('https://saigon-testnet.roninchain.com/rpc'),
    [avalancheFuji.id]: http()
  },
})

export function getConfig() {
  return config
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
