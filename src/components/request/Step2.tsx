import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import { BigNumber } from 'ethers'
import { RequestProps } from 'pages/request'
import { isValidAmount } from 'utils/number'

export default function Step2(props: RequestProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const isAlreadyFilled = props.data.numberOfBills.length >= 1
    if (isAlreadyFilled && value === '') {
      props.setData({ ...props.data, numberOfBills: '', totalAmount: '' })
      return
    }

    if (value.includes('.') || !isValidAmount(value)) return

    const totalAmount = BigNumber.from(value).mul(props.data.amountPerBill).toString()
    props.setData({ ...props.data, numberOfBills: value, totalAmount })
  }

  return (
    <div className="grid gap-6">
      <h2 className="text-center font-secondary text-4xl">Enter number of bills</h2>
      <div>
        <Input
          onChange={onChange}
          value={props.data.numberOfBills}
          className="w-full border-b-2 border-dotted border-black pb-1 text-center font-secondary text-6xl"
        />
      </div>
      <div>
        <Button
          onClick={() => props.setStep(props.step + 1)}
          disabled={props.data.totalAmount.length === 0}
        >
          Next step
        </Button>
      </div>
    </div>
  )
}
