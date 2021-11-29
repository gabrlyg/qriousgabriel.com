import * as React from 'react'
import type { AppProps } from 'next/app'
import '@fontsource/merriweather'
import '@fontsource/montserrat'
import '@fontsource/inconsolata'
import { GlobalStyle, Normalize, PrismTheme } from '@styles'
import { ThemeProvider } from 'src/providers/ThemeProvider'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Normalize />
      <PrismTheme />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
