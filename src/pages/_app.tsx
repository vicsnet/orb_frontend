import { AppProps } from 'next/app'
import '../globals.css'
import Provider from './Provider'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
  <Component {...pageProps} />
  <ToastContainer/>
  </Provider>
)
}

export default MyApp
