import useEthereum from 'hooks/useEthereum'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getBillImage } from 'utils/images'
import FundModal from '../../components/bill/FundModal'
import RedeemModal from '../../components/bill/RedeemModal'
import Button from '../../components/ui/Button'
import Loading from '../../components/ui/Loading'
import { Bill, BillStatus, BillValue } from '../../types/types'

const BillPage: NextPage = () => {
  const router = useRouter()
  const { isConnected, allyu } = useEthereum()
  const { id: billId } = router.query
  const [bill, setBill] = useState<Bill | null>(null)
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false)
  const [isFundModalOpen, setIsFundModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      if (!billId || typeof billId !== 'string' || !isConnected) return

      try {
        const data = await allyu.getOneBillFromBillId(billId)
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
    [BillStatus.Unfunded]: (
      <Button className="w-[150px]" onClick={() => setIsFundModalOpen(true)}>
        Fund bill
      </Button>
    ),
    [BillStatus.Funded]: (
      <Button className="w-[150px]" onClick={() => setIsRedeemModalOpen(true)}>
        Redeem bill
      </Button>
    ),
    [BillStatus.Redeemed]: (
      <Button className="w-[150px]" disabled={true}>
        Bill redeemed
      </Button>
    )
  }

  const status = getStatus()

  return (
    <>
      <Head>
        <title>{`Bill #${billId}`}</title>
      </Head>
      <main className="mb-[80px] flex flex-1 flex-col items-center justify-center">
        <div className="container-content max-w-[480px]">
          <div className="grid gap-12">
            <div className="grid items-center gap-8 text-center">
              <div className="flex items-center justify-between font-secondary ">
                <div className="text-2xl">Bill #{bill.id}</div>
                <div
                  className={`select-none border-2 border-dashed py-1 px-3 text-xl ${statusStyles[status]}`}
                >
                  {status}
                </div>
              </div>
              <h1 className="font-secondary text-8xl">${bill.value}</h1>
              <div>{statusButtons[status]}</div>
            </div>
            <div className="flex justify-center">
              <div className="relative aspect-[2.44] w-full">
                <Image src={getBillImage(bill.value as BillValue)} alt="bill" layout="fill" />
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <FundModal bill={bill} isOpen={isFundModalOpen} setIsOpen={setIsFundModalOpen} />
        <RedeemModal bill={bill} isOpen={isRedeemModalOpen} setIsOpen={setIsRedeemModalOpen} />
      </main>
    </>
  )
}

export default BillPage
