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
    <button
      disabled={disabled}
      onClick={onClick}
      className="rounded-md bg-primary px-5 py-3 text-lg font-bold font-normal outline-none transition-colors duration-200 hover:bg-blue-50"
    >
      {children}
    </button>
  )
}
