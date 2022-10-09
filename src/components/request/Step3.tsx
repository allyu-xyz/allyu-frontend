import Button from 'components/ui/Button'
import { BigNumber } from 'ethers'
import useEthereum from 'hooks/useEthereum'
import { RequestProps } from 'pages/request'
import { useState } from 'react'
import { useSigner } from 'wagmi'

export default function Step3(props: RequestProps) {
  const { allyu } = useEthereum()
  const { amountPerBill, numberOfBills, totalAmount } = props.data
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    if (isLoading) return

    try {
      if (!props.fee) {
        setError('Failed to estimate request fee')
        return
      }

      setIsLoading(true)
      const amountToSend = BigNumber.from(numberOfBills).mul(props.fee)
      const response = await allyu.requestBills(amountPerBill, numberOfBills, {
        value: amountToSend
      })

      const transaction = await response.wait()
      props.setTransaction(transaction)
      props.setStep(props.step + 1)
    } catch (e) {
      console.error(e)
      setError('Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 font-secondary">
        <div className="text-9xl">${totalAmount}</div>
        <div className="text-3xl">{`${numberOfBills} bills of $${amountPerBill}`}</div>
      </div>
      <div>
        <Button onClick={onClick}>{isLoading ? 'Loading...' : 'Confirm request'}</Button>
        {error && <div className="pt-3 text-red">{error}</div>}
      </div>
    </div>
  )
}
