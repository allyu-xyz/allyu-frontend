import Button from 'components/ui/Button'
import Link from 'next/link'
import { RequestProps } from 'pages/request'

export default function Step4(props: RequestProps) {
  return (
    <div>
      <h2>You are all set!</h2>
      <div>Your bills will be sent to Agora Bogota</div>
      <Link href="/">
        <a>
          <Button>Go home</Button>
        </a>
      </Link>
    </div>
  )
}
