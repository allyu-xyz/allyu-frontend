import Image from 'next/image'
import { RequestProps } from 'pages/request'
import { BillValue } from 'types/types'
import { getBillImage } from 'utils/images'

export default function Step1(props: RequestProps) {
  const options = [
    BillValue.Five,
    BillValue.Ten,
    BillValue.Twenty,
    BillValue.Fifty,
    BillValue.OneHundred,
    BillValue.FiveHundred
  ]

  return (
    <div className="grid w-full gap-8">
      <h2 className="text-center font-secondary text-4xl">Choose your bill denomination</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, i) => (
          <div
            key={`opt_${i}`}
            className="group cursor-pointer"
            onClick={() => {
              props.setData({ ...props.data, amountPerBill: option })
              props.setStep(props.step + 1)
            }}
          >
            <div className="relative h-[115px] w-full overflow-hidden transition-transform lg:group-hover:-translate-y-1">
              <Image
                src={getBillImage(option)}
                alt={`$${option} bill`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
