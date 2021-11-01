import type { AppProps } from 'next/app'
import '@styles/normalize.css'
import '@styles/style.css'
import '@styles/prism-theme.css'
import 'typeface-merriweather'
import 'typeface-montserrat'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
