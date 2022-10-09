export default function Input({
  onChange,
  value
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return <input onChange={onChange} value={value} />
}
