import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BillValue } from 'types/types'
import { getBillImage } from 'utils/images'
import { formatNumber } from 'utils/number'

const Home: NextPage = () => {
  const [count, setCount] = useState(12089654)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.35) {
        setCount((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>Allyu</title>
        <meta name="description" content="Crypto cash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container-content">
          <div className="mt-12 mb-20 flex items-end font-secondary">
            <h1 className="text-[120px] leading-none">${formatNumber(count)}</h1>
            <span className="ml-3 pb-3.5 text-4xl">in crypto-backed cash</span>
          </div>
        </div>
        <BillsGrid count={count} />
      </main>
    </>
  )
}

const BillsGrid = ({ count }: { count: number }) => {
  const [randomBills, setRandomBills] = useState<BillValue[][]>([])
  const rows = 6
  const columns = 6
  const positions = ['2', '4', '6', '8', '10', '4']

  const billValues = [
    BillValue.Five,
    BillValue.Ten,
    BillValue.Twenty,
    BillValue.Fifty,
    BillValue.OneHundred,
    BillValue.FiveHundred
  ]

  const generateRandomBills = () => {
    const bills = []
    for (let i = 0; i < rows; i++) {
      const col = []

      for (let j = 0; j < columns; j++) {
        const randomIndex = Math.floor(Math.random() * billValues.length)
        const bill = billValues[randomIndex]
        col.push(bill)
      }

      bills.push(col)
    }

    setRandomBills(bills)
  }

  useEffect(() => {
    generateRandomBills()
  }, [])

  return (
    <div className=" grid gap-4 overflow-hidden pb-20">
      {randomBills.map((row, i) => (
        <div key={`row_${i}`} className={`relative h-[130px] -translate-x-[${positions[i]}px]`}>
          <div className={`absolute flex items-center`}>
            {row.map((col, j) => (
              <div key={`bill_${i}_${j}`} className="m3-4 relative mr-4 aspect-[2.44] h-[130px]">
                {<Image src={getBillImage(col)} alt="" layout="fill" />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
