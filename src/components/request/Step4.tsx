import Button from 'components/ui/Button'
import { ETHERSCAN_URL } from 'config'
import Image from 'next/image'
import { RequestProps } from 'pages/request'
import party from 'party-js'
import type { DynamicSourceType } from 'party-js/lib/systems/sources'
import { useEffect, useRef } from 'react'
import { BillValue } from 'types/types'
import { getBillImage } from 'utils/images'

export default function Step4(props: RequestProps) {
  const { numberOfBills, amountPerBill } = props.data

  const billsArray = new Array(parseInt(numberOfBills)).fill('')
  const txLink = `${ETHERSCAN_URL}/tx/${props.transaction?.transactionHash}`
  const particlesRef = useRef<HTMLDivElement>(null)
  const billImage = getBillImage(amountPerBill as BillValue)

  useEffect(() => {
    if (particlesRef.current) {
      party.confetti(particlesRef.current as DynamicSourceType, {
        count: 250,
        spread: 20
      })
    }
  }, [particlesRef])

  return (
    <div className="grid gap-12">
      <div className="grid gap-6">
        <div ref={particlesRef}>
          <h2 className="mb-2 text-center font-secondary text-6xl">You are all set!</h2>
          <div className="text-lg font-light">
            Your bills will soon arrive to your designated pickup zone
          </div>
        </div>
        <a target="_blank" rel="noreferrer" href={txLink}>
          <Button>View transaction</Button>
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {billsArray.map((_, i) => (
          <div key={`img_bill_${i}`} className="relative h-[120px] w-full">
            <Image src={billImage} alt="" layout="fill" />
          </div>
        ))}
      </div>
    </div>
  )
}
