import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FundModal from '../../components/bill/FundModal'
import RedeemModal from '../../components/bill/RedeemModal'
import Loading from '../../components/Loading'
import Button from '../../components/ui/Button'
import { Bill, BillStatus } from '../../types/types'

const BillPage: NextPage = () => {
  const router = useRouter()
  const { id: billId } = router.query
  const [bill, setBill] = useState<Bill | null>(null)
  const [billEvents, setBillEvents] = useState([])
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false)
  const [isFundModalOpen, setIsFundModalOpen] = useState(false)

  useEffect(() => {
    // get bill from blockchain
    // get bill events (requested, funded, redeemed)
  }, [billId])

  if (!bill) return <Loading />

  const getStatus = (): BillStatus => {
    if (!bill.isFunded) return BillStatus.Unfunded
    if (!bill.isRedeemed) return BillStatus.Funded
    return BillStatus.Redeemed
  }

  const statusStyles = {
    [BillStatus.Unfunded]: 'bg-gray-500',
    [BillStatus.Funded]: 'bg-green-500',
    [BillStatus.Redeemed]: 'bg-red-500'
  }

  const statusButtons = {
    [BillStatus.Unfunded]: <Button onClick={() => setIsFundModalOpen(true)}>Fund bill</Button>,
    [BillStatus.Funded]: <Button onClick={() => setIsRedeemModalOpen(true)}>Redeem bill</Button>,
    [BillStatus.Redeemed]: <Button disabled={true}>Bill redeemed</Button>
  }

  const status = getStatus()

  return (
    <>
      <Head>
        <div>{`Bill #${billId}`}</div>
      </Head>
      <main>
        <div className="flex items-center justify-between">
          <div>{bill.id.padStart(6, '0')}</div>
          <div className={statusStyles[status]}>{status}</div>
        </div>
        <div className="grid gap-2">
          <h1>{bill.value}</h1>
          <div>{statusButtons[status]}</div>
        </div>
        <div>
          <h2>Events</h2>
          <div>
            {billEvents.map((event, i) => (
              <div key={`event_${i}`}></div>
            ))}
          </div>
        </div>
        <FundModal bill={bill} isOpen={isFundModalOpen} setIsOpen={setIsFundModalOpen} />
        <RedeemModal bill={bill} isOpen={isRedeemModalOpen} setIsOpen={setIsRedeemModalOpen} />
      </main>
    </>
  )
}

export default BillPage
