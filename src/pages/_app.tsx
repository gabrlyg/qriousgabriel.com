import * as React from 'react'
import type { AppProps } from 'next/app'
import 'typeface-merriweather'
import 'typeface-montserrat'
import GlobalStyle from '@styles/GlobalStyles'
import Normalize from '@styles/Normalize'
import PrismTheme from '@styles/PrismTheme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Normalize />
      <PrismTheme />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default App
