import { useEffect, useRef } from 'react'
import { useAccount, useNetwork } from 'wagmi'

export default function NetworkListener() {
  const { chain } = useNetwork()
  const currentChain = useRef(chain?.id)

  useEffect(() => {
    if (chain?.id && currentChain.current && chain.id !== currentChain.current) {
      window.location.reload()
    }
  }, [chain])

  return <></>
}
