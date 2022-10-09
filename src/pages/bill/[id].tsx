import useEthereum from 'hooks/useEthereum'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FundModal from '../../components/bill/FundModal'
import RedeemModal from '../../components/bill/RedeemModal'
import Button from '../../components/ui/Button'
import Loading from '../../components/ui/Loading'
import { Bill, BillStatus } from '../../types/types'

const BillPage: NextPage = () => {
  const router = useRouter()
  const { isConnected, allyu } = useEthereum()
  const { id: billId } = router.query
  const [bill, setBill] = useState<Bill | null>(null) // todo: uncomment
  const [billEvents, setBillEvents] = useState([])
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false)
  const [isFundModalOpen, setIsFundModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // todo: delete
  // const bill: Bill = {
  //   id: '2',
  //   value: '5',
  //   wordHash: '0x123',
  //   codeHash: '123',
  //   isFunded: true,
  //   isRedeemed: false
  // }

  useEffect(() => {
    const fetch = async () => {
      if (!billId || typeof billId !== 'string' || !isConnected) return

      try {
        // todo: uncomment
        const data = await allyu.getOneBillFromBillId(billId)
        console.log(data)
        // todo: uncomment
        // console.log({
        //   id: data.id.toString(),
        //   value: data.value.toString(),
        //   wordHash: data.wordHash,
        //   codeHash: data.codeHash,
        //   isFunded: data.isFunded,
        //   isRedeemed: data.isRedeemed
        // })
        setBill({
          id: data.id.toString(),
          value: data.value.toString(),
          wordHash: data.wordHash,
          codeHash: data.codeHash,
          isFunded: data.isFunded,
          isRedeemed: data.isRedeemed
        })
      } catch (e) {
        console.error(e)
        setError('Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    fetch()
  }, [billId, isConnected, fetch])

  if (isLoading) return <Loading />
  if (!bill)
    return (
      <div className="flex flex-1 items-center justify-center font-secondary text-3xl ">
        {`Bill #${billId} not found`}
      </div>
    )
  if (error)
    return (
      <div className="flex flex-1 items-center justify-center font-secondary text-3xl ">
        {error}
      </div>
    )

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
        <title>{`Bill #${billId}`}</title>
      </Head>
      <main>
        <div className="container-content">
          <div className="flex items-center justify-between py-3 text-xl">
            <div>Bill #{bill.id}</div>
            <div className={`select-none border-2 border-dashed py-1 px-3 ${statusStyles[status]}`}>
              {status}
            </div>
          </div>
          <div className="grid items-center gap-6 text-center">
            <h1 className="font-secondary text-8xl">${bill.value}</h1>
            <div>{statusButtons[status]}</div>
          </div>
        </div>
        <FundModal bill={bill} isOpen={isFundModalOpen} setIsOpen={setIsFundModalOpen} />
        <RedeemModal bill={bill} isOpen={isRedeemModalOpen} setIsOpen={setIsRedeemModalOpen} />
      </main>
    </>
  )
}

export default BillPage
