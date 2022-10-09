import Logo from 'components/Logo'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-orange">
      <Logo className="w-[80px]" />
      <div className="mt-3 font-secondary text-xl">Loading...</div>
    </div>
  )
}
