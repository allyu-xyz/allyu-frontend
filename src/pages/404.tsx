import Button from 'components/ui/Button'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Not found" />
      </Head>
      <div className="flex items-center">
        <div className="container-content pt-36">
          <div className="grid text-center font-secondary">
            <h1 className="text-[200px] leading-none">404</h1>
            <p className="mb-6 text-2xl">Page not found</p>
            <Link href="/">
              <a>
                <Button>Go home</Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
