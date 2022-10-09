import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import { BigNumber } from 'ethers'
import { RequestProps } from 'pages/request'

export default function Step2(props: RequestProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '' || value.includes('.')) return

    const totalAmount = BigNumber.from(value).mul(props.data.amountPerBill).toString()
    props.setData({ ...props.data, numberOfBills: value, totalAmount })
  }

  return (
    <div>
      <h2>Enter amount of bills</h2>
      <div>
        <Input onChange={onChange} value={props.data.numberOfBills} />
        <p>{`Total amount to issue: $${props.data.totalAmount || '0'}`}</p>
      </div>
      <Button
        onClick={() => props.setStep(props.step + 1)}
        disabled={props.data.totalAmount.length === 0}
      >
        Next
      </Button>
    </div>
  )
}
