import { getDefaultWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { INFURA_ID } from 'config'
import { ReactElement } from 'react'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [chain.goerli],
  [infuraProvider({ apiKey: INFURA_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
})

const client = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function AppConfig({ children }: { children: ReactElement }) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
