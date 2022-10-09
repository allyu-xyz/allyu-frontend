import { ConnectButton } from '@rainbow-me/rainbowkit'
import logo from 'assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header>
      <div className="container-content flex h-[80px] items-center justify-between">
        <Link href="/">
          <a>
            <div className="flex items-center space-x-2">
              <Image src={logo} alt="Allyu logo" height="55" width="62.83" />
              <span className="font-secondary text-2xl leading-none">ALLYU</span>
            </div>
          </a>
        </Link>
        <div>
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </header>
  )
}
