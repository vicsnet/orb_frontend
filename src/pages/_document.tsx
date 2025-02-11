import { Html, Head, Main, NextScript } from 'next/document'
import Provider from './Provider'

export default function Document() {
  return (
    <Html lang="en" data-theme="chargeasy">
      <Head />
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T6D9NPBP"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
          

        <Main />
          
        <NextScript />
      </body>
    </Html>
  )
}
