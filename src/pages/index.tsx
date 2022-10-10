import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BillValue } from 'types/types'
import { getBillImage } from 'utils/images'
import { formatNumber } from 'utils/number'

const Home: NextPage = () => {
  const [count, setCount] = useState(parseInt(new Date().valueOf().toString().slice(-8)))
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setCount((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isMounted) return null

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
  const rowsContainer = useRef<HTMLDivElement>(null)
  const rows = 6
  const columns = 6
  const rowHeight = '132'
  const rowPositions = ['0', '-220', '-10', '-300', '-100', '-200']

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

  const moveRows = () => {
    const container = rowsContainer.current
    if (!container) return

    container.childNodes.forEach((child, i) => {
      const row = child as HTMLDivElement
      const position = rowPositions[i]
      if (position) {
        row.style.transform = `translateX(${position}px)`
      }
    })
  }

  const addBill = () => {
    const container = rowsContainer.current
    if (!container) return

    const randomIndex = Math.floor(Math.random() * billValues.length)
    const newBill = billValues[randomIndex]
    const newBills = [...randomBills]

    for (let i = 0; i < randomBills.length; i++) {
      if (i === 0) {
        newBills[i].unshift(newBill)
      } else {
        const lastPrevCol = newBills[i - 1].pop()!
        newBills[i].unshift(lastPrevCol)

        if (i === randomBills.length - 1) {
          newBills[i].pop()!
        }
      }
    }

    setRandomBills(newBills)
  }

  useLayoutEffect(() => {
    generateRandomBills()
  }, [])

  useLayoutEffect(() => {
    if (rowsContainer.current && randomBills[0]?.length === columns) {
      moveRows()
    }
  }, [randomBills, rowsContainer])

  useEffect(() => {
    if (rowsContainer.current && randomBills.length > 0) {
      addBill()
    }
  }, [count, rowsContainer])

  return (
    <div ref={rowsContainer} className=" grid gap-4 overflow-hidden pb-20">
      {randomBills.map((row, i) => (
        <div key={`row-${i}`} className={`relative h-[${rowHeight}px]`}>
          <div className={`absolute flex items-center`}>
            {row.map((col, j) => (
              <div
                key={`bill_${i}_${j}`}
                className={`m3-4 relative mr-4 aspect-[2.44] h-[${rowHeight}px]`}
              >
                {<Image src={getBillImage(col)} alt="" layout="fill" />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const BillsGrid2 = () => {
  const [randomBills, setRandomBills] = useState<BillValue[]>([])
  const billsContainer = useRef<HTMLDivElement>(null)

  const ROWS = 6
  const COLUMNS = 6
  const TOTAL_BILLS = ROWS * COLUMNS
  const rowPositions = ['-150', '-220', '-10', '-300', '-100', '-200']

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

    for (let i = 0; i < TOTAL_BILLS; i++) {
      const randomIndex = Math.floor(Math.random() * billValues.length)
      const bill = billValues[randomIndex]
      bills.push(bill)
    }

    setRandomBills(bills)
  }

  const moveRows = () => {
    const container = billsContainer.current
    if (!container) return

    container.childNodes.forEach((child, i) => {
      const row = child as HTMLDivElement
      const position = rowPositions[i]
      if (position) {
        row.style.transform = `translateX(${position}px)`
      }
    })
  }

  useLayoutEffect(() => {
    generateRandomBills()
  }, [])

  useLayoutEffect(() => {
    if (billsContainer.current && randomBills.length > 0) {
      moveRows()
    }
  }, [randomBills, billsContainer])

  return (
    <div ref={billsContainer} className={` grid gap-4 grid-cols=${COLUMNS} overflow-hidden pb-20`}>
      {randomBills.map((row, i) => (
        <div key={`row-${i}`} className="relative h-[132px]">
          <div className={`absolute flex items-center`}>
            {row.map((col, j) => (
              <div key={`bill_${i}_${j}`} className="m3-4 relative mr-4 aspect-[2.44] h-[132px]">
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
