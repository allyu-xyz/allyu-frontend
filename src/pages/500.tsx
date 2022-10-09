import Button from 'components/ui/Button'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const InternalError: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Not found" />
      </Head>
      <div className="flex items-center">
        <div className="container-content pt-36">
          <div className="grid text-center font-secondary">
            <h1 className="text-[200px] leading-none">500</h1>
            <p className="mb-6 text-3xl">Something went wrong</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default InternalError
