import * as React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import '@fontsource/merriweather'
import '@fontsource/montserrat'
import '@fontsource/inconsolata'
import { GlobalStyle, Normalize, PrismTheme } from '@styles'
import { lightTheme } from '@themes'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Normalize />
      <PrismTheme />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
