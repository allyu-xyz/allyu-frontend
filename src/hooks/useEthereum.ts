import { getGoerliSdk, getOptimismSdk, getPolygonMumbaiSdk } from '@dethcrypto/eth-sdk-client'
import { useNetwork, useProvider, useSigner } from 'wagmi'

export default function useEthereum() {
  const provider = useProvider()
  const { chain } = useNetwork()
  const { data: signer } = useSigner()
  const signerOrProvider = signer || provider
  const isConnected = !!signerOrProvider

  const goerliSdk = getGoerliSdk(signerOrProvider)
  const optimismSdk = getOptimismSdk(signerOrProvider)
  const polygonMumbaiSdk = getPolygonMumbaiSdk(signerOrProvider)

  const sdk = chain?.id
    ? {
        [5]: goerliSdk,
        [10]: optimismSdk,
        [80001]: polygonMumbaiSdk
      }[chain.id] || goerliSdk
    : goerliSdk

  return {
    isConnected,
    dai: sdk.dai,
    allyu: sdk.allyu
  }
}
