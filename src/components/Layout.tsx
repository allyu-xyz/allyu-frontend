import { ReactElement } from 'react'
import Navbar from './Navbar'

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      {children}
    </div>
  )
}
