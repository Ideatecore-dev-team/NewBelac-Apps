import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia, liskSepolia } from 'wagmi/chains'
import { 
  // coinbaseWallet, 
  injected, 
  walletConnect
} from 'wagmi/connectors'

export const config = createConfig({
  chains: [
    mainnet, 
    sepolia,
    liskSepolia,
  ],
  connectors: [
    injected(),
    // coinbaseWallet(),

    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "" }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [liskSepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config 
  }
}