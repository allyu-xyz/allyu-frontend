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
      const amountToSend = BigNumber.from(numberOfBills).add(props.fee)
      const response = await allyu.requestBills(amountPerBill, numberOfBills, {
        value: amountToSend
      })

      await response.wait()
      props.setStep(props.step + 1)
    } catch (e) {
      console.error(e)
      setError('Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2>Confirm your request</h2>
      <div>
        <div>${totalAmount}</div>
        <div>{`${numberOfBills} bills of $${amountPerBill}`}</div>
      </div>
      <div>
        <Button onClick={onClick}>Confirm request</Button>
        {error && <div>{error}</div>}
      </div>
    </div>
  )
}
