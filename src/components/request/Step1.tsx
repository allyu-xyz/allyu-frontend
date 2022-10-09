import bill from 'assets/bill.png'
import Image from 'next/image'
import { RequestProps } from 'pages/request'

export default function Step1(props: RequestProps) {
  const options = ['5', '10', '20', '50', '100', '500']

  return (
    <div className="grid w-full gap-8">
      <h2 className="text-center font-secondary text-4xl">Choose your bill denomination</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, i) => (
          <div
            key={`opt_${i}`}
            className="cursor-pointer"
            onClick={() => {
              props.setData({ ...props.data, amountPerBill: option })
              props.setStep(props.step + 1)
            }}
          >
            <div className="relative h-[115px] w-full">
              <Image src={bill} alt={`$${option} bill`} layout="fill" objectFit="cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
