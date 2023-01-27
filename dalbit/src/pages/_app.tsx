import type { AppProps } from 'next/app'
import PageLogo from '../components/PageLogo'
import GlobalStyle from './GlobalStyle'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <GlobalStyle />
  <PageLogo />
  <Component {...pageProps} />
  </>
}
