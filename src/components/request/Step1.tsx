import { RequestProps } from 'pages/request'

export default function Step1(props: RequestProps) {
  const options = ['5', '10', '20', '50', '100']

  return (
    <div>
      <h2 className="font-secondary">Choose your bill denomination</h2>
      <div>
        {options.map((option, i) => (
          <div
            key={`opt_${i}`}
            className="cursor-pointer"
            onClick={() => {
              props.setData({ ...props.data, amountPerBill: option })
              props.setStep(props.step + 1)
            }}
          >
            ${option}
          </div>
        ))}
      </div>
    </div>
  )
}
