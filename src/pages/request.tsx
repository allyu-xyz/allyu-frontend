import Step1 from 'components/request/Step1'
import Step2 from 'components/request/Step2'
import Step3 from 'components/request/Step3'
import Step4 from 'components/request/Step4'
import { BigNumberish } from 'ethers'
import useEthereum from 'hooks/useEthereum'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export enum Steps {
  Step1 = 1,
  Step2 = 2,
  Step3 = 3,
  Step4 = 4
}

export interface RequestData {
  amountPerBill: string
  numberOfBills: string
  totalAmount: string
}

export interface RequestProps {
  fee: BigNumberish | undefined
  step: Steps
  setStep: (step: Steps) => void
  data: RequestData
  setData: (data: RequestData) => void
}

const Request: NextPage = () => {
  const { allyu, isConnected } = useEthereum()
  const [fee, setFee] = useState<BigNumberish | undefined>()
  const [step, setStep] = useState(Steps.Step1)
  const [data, setData] = useState<RequestData>({
    amountPerBill: '',
    numberOfBills: '',
    totalAmount: ''
  })

  useEffect(() => {
    const getFee = async () => {
      const feePerBill = await allyu.getFeePerBill()
      setFee(feePerBill.toString())
    }

    if (isConnected) getFee()
  }, [isConnected])

  const stepsComponents = {
    [Steps.Step1]: Step1,
    [Steps.Step2]: Step2,
    [Steps.Step3]: Step3,
    [Steps.Step4]: Step4
  }

  const props: RequestProps = { fee, data, setData, step, setStep }
  const Component = stepsComponents[step]

  return (
    <>
      <Head>
        <title>Request bills</title>
        <meta name="description" content="Request crypto cash" />
      </Head>
      <main>
        {step > 1 && (
          <div onClick={() => setStep(step - 1)} className="cursor-pointer">
            {'Go back'}
          </div>
        )}
        <Component {...props} />
      </main>
    </>
  )
}

export default Request
