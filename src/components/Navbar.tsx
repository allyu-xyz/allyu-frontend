import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'
import Logo from './Logo'

export default function Navbar() {
  return (
    <header>
      <div className="container-content flex h-[80px] items-center justify-between">
        <Link href="/">
          <a>
            <div className="flex items-center space-x-2">
              <Logo className="w-[50px]" />
              <span className="font-secondary text-3xl leading-none">ALLYU</span>
            </div>
          </a>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/request">
            <a className="flex h-[42px] items-center justify-center rounded-md bg-white/25 px-4 font-secondary transition-colors duration-200 hover:scale-[1.025] hover:bg-white/30">
              <span>Request bills</span>
            </a>
          </Link>
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  )
}
