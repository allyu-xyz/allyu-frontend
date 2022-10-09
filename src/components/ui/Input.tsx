export default function Input({
  onChange,
  value,
  className
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}) {
  return (
    <input
      onChange={onChange}
      value={value}
      className={`bg-transparent outline-none ${className}`}
    />
  )
}
