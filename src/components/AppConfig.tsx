import { getDefaultWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { INFURA_ID } from 'config'
import { ReactNode } from 'react'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [chain.goerli, chain.polygonMumbai, chain.optimism],
  [infuraProvider({ apiKey: INFURA_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Allyu',
  chains
})

const client = createClient({
  autoConnect: true,
  connectors,
  provider
})

const themeValues = lightTheme({ borderRadius: 'small' })

const customTheme = {
  ...themeValues,
  blurs: {
    ...themeValues.blurs,
    modalOverlay: 'blur(4px)'
  },
  colors: {
    ...themeValues.colors,
    accentColor: '#3B8CF0',
    actionButtonBorder: 'transparent',
    actionButtonSecondaryBackground: 'transparent',
    modalTextSecondary: '#B8B3B6',
    accentColorForeground: '#FEFEFE',
    modalBackground: '#FEFEFE',
    modalBorder: 'transparent',
    modalText: '#000505',
    modalBackdrop: 'rgba(239, 238, 233, 0.25)',
    closeButton: '#000505',
    closeButtonBackground: 'transparent'
  },
  fonts: {
    ...themeValues.fonts,
    body: 'Londrina Solid, sans-serif'
  },
  shadows: {
    connectButton: 'none',
    dialog: 'none',
    profileDetailsAction: 'none',
    selectedOption: 'none',
    selectedWallet: 'none',
    walletLogo: 'none'
  }
}

export default function AppConfig({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} theme={customTheme} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
