import '../styles/globals.css'
import { Roboto } from '@next/font/google';
import Navbar from '../components/navbar';


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
