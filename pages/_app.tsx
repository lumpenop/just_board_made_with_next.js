import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from "../components/nav.bar";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div>
        <NavBar />
        <Component {...pageProps} />
      </div>
  )
}
