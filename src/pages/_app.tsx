type AppProps = {
  Component: any
  pageProps: any
}

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
