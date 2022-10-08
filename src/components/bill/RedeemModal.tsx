import { Bill } from 'types/types'

export default function RedeemModal({
  bill,
  isOpen,
  setIsOpen
}: {
  bill: Bill
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
    <div>
      <h3>Fund your bill</h3>
    </div>
  )
}
