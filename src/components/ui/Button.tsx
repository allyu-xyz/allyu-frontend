import { ReactNode } from 'react'
export default function Button({
  onClick,
  disabled,
  children
}: {
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | undefined) => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
