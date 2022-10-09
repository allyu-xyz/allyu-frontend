import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import Modal from 'components/ui/Modal'
import useEthereum from 'hooks/useEthereum'
import party from 'party-js'
import type { DynamicSourceType } from 'party-js/lib/systems/sources'
import { useRef, useState } from 'react'
import { Bill } from 'types/types'
import { hash } from 'utils/hash'
import { useAccount, useBalance } from 'wagmi'

export default function FundModal({
  bill,
  isOpen,
  setIsOpen
}: {
  bill: Bill
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { allyu, dai } = useEthereum()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { address } = useAccount()
  const { data: balance } = useBalance({
    addressOrName: address
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.includes(' ')) return
    setCode(value)
  }

  const handleSubmit = async () => {
    if (!code) return
    if (!address) {
      setError('Wallet not connected')
      return
    }

    if (balance?.value.lt(bill.value)) {
      setError('Insufficient funds')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const codeHash = `0x${hash(code)}`

      await dai.approve(address, bill.value)
      await allyu.fund(bill.id, bill.value, codeHash)

      setIsSuccess(true)
      if (containerRef.current) {
        party.confetti(containerRef.current as DynamicSourceType, {
          count: 250,
          spread: 20
        })
      }
    } catch (e) {
      console.error(e)
      setError('Something went wrong')
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setCode('')
    setIsSuccess(false)
    setIsLoading(false)
    setError('')
  }

  const formComponent = (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h3 className="font-secondary text-2xl">Fund your bill</h3>
        <p className="text-sm">
          Please enter a secret code. Once the transaction is completed, write it down on your paper
          bill.
        </p>
      </div>
      <Input
        onChange={handleChange}
        value={code}
        className="w-full border-b-2 border-dotted border-black pb-1 text-center font-secondary text-6xl"
      />
      <div>
        <Button onClick={handleSubmit} className="w-full">
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
        <p className="mt-3 text-center text-sm font-bold text-red">{error}</p>
      </div>
    </div>
  )

  const successComponent = (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h3 className="font-secondary text-2xl">Your bill has been funded!</h3>
        <p className="text-sm">
          Please write down the secret code on your paper bill. After that, you can start using it
          as a payment method.
        </p>
      </div>
      <div className="text-center font-secondary text-6xl">{code}</div>
    </div>
  )

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div ref={containerRef}>{isSuccess ? successComponent : formComponent}</div>
    </Modal>
  )
}
