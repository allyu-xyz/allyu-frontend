import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-between">
        <Link href="/">
          <a>Allyu</a>
        </Link>
        <div>
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
