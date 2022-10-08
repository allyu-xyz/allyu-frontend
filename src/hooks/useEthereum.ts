import { getGoerliSdk } from '@dethcrypto/eth-sdk-client'
import { useProvider, useSigner } from 'wagmi'

export default function useEthereum() {
  const provider = useProvider()
  const { data: signer } = useSigner()
  const signerOrProvider = signer || provider

  const { dai, allyu } = getGoerliSdk(signerOrProvider)

  return {
    dai,
    allyu
  }
}
