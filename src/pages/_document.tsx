import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&family=Mulish:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="Allyu" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Allyu is the first crypto-backed cash" />
        <meta property="og:url" content="https://www.allyu.xyz" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
