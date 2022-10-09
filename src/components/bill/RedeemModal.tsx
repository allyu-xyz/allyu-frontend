import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import Modal from 'components/ui/Modal'
import { ETHERSCAN_URL } from 'config'
import { ContractReceipt } from 'ethers'
import useEthereum from 'hooks/useEthereum'
import party from 'party-js'
import type { DynamicSourceType } from 'party-js/lib/systems/sources'
import { useRef, useState } from 'react'
import { Bill } from 'types/types'
import { useAccount, useSigner } from 'wagmi'

export default function RedeemModal({
  bill,
  setBill,
  isOpen,
  setIsOpen
}: {
  bill: Bill
  setBill: (bill: Bill) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [publicCode, setPublicCode] = useState('')
  const [privateCode, setPrivateCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [transaction, setTransaction] = useState<ContractReceipt | undefined>()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { allyu } = useEthereum()

  const handlePublicCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicCode(e.target.value)
  }

  const handlePrivateCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateCode(e.target.value)
  }

  const handleSubmit = async () => {
    if (!publicCode || !privateCode) return
    if (!signer || !address) {
      setError('Wallet not connected')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const nonce = await signer.getTransactionCount('latest')
      const { maxFeePerGas, maxPriorityFeePerGas } = await signer.getFeeData()
      const gasLimit = await allyu.estimateGas.redeem(bill.id, privateCode, publicCode, address)
      const response = await allyu.redeem(bill.id, privateCode, publicCode, address, {
        nonce,
        gasLimit,
        maxFeePerGas: maxFeePerGas?.add(1000000000),
        maxPriorityFeePerGas: maxPriorityFeePerGas?.add(1000000000)
      })
      const tx = await response.wait()

      setTransaction(tx)
      setBill({ ...bill, isRedeemed: true })
      setIsSuccess(true)
      if (containerRef.current) {
        party.confetti(containerRef.current as DynamicSourceType, {
          count: party.variation.range(100, 200)
        })
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong')
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsSuccess(false)
    setPublicCode('')
    setPrivateCode('')
    setError('')
  }

  const successComponent = (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h3 className="font-secondary text-2xl">Your bill has been redeemed!</h3>
        <p className="text-sm">
          The paper bill has been redeemed and the funds have been transferred to your wallet.
          Please discard this bill as it no longer holds any value.
        </p>
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${ETHERSCAN_URL}/tx/${transaction?.transactionHash}`}
      >
        <Button className="w-full">View transaction</Button>
      </a>
    </div>
  )

  const formComponent = (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h3 className="font-secondary text-2xl">Redeem your bill</h3>
        <p className="text-sm">
          Please scratch the private code on your paper bill. Enter the private code along with the
          public code written on the bill.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Input
            value={publicCode}
            onChange={handlePublicCodeChange}
            className="w-full border-b-2 border-dotted border-black pb-1 text-center font-secondary text-6xl"
          />
          <p className="text-center font-bold">Public code</p>
        </div>
        <div className="grid gap-2">
          <Input
            value={privateCode}
            onChange={handlePrivateCodeChange}
            className="w-full border-b-2 border-dotted border-black pb-1 text-center font-secondary text-6xl"
          />
          <p className="text-center font-bold">Private code</p>
        </div>
      </div>
      <div>
        <Button onClick={handleSubmit} className="w-full">
          {isLoading ? 'Loading...' : 'Redeem'}
        </Button>
        <p className="mt-3 text-center text-sm font-bold text-red">{error}</p>
      </div>
    </div>
  )

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div ref={containerRef}>{isSuccess ? successComponent : formComponent}</div>
    </Modal>
  )
}
