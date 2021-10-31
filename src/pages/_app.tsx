import '../styles/style.css'
import '../styles/normalize.css'
import '../styles/prism-theme.css'
import 'typeface-merriweather'
import 'typeface-montserrat'

type AppProps = {
  Component: any
  pageProps: any
}

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
