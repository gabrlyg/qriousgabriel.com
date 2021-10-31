import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import config from '../../config'

type LayoutProps = {
  children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>{config.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='global-wrapper'>
        <header className='global-header'>
          <h1 className='main-heading'>
            <Link href='/'>
              <a>Qrious Gabriel</a>
            </Link>
          </h1>
        </header>
        <main>{children}</main>
        <footer>
          <div className='footer-socials'>
            <a href={`https://www.twitter.com/${config.social.twitter}`}>
              Twitter
            </a>{' '}
            &bull;{' '}
            <a href={`https://www.instagram.com/${config.social.instagram}`}>
              Instagram
            </a>{' '}
            &bull;{' '}
            <a href={`https://www.github.com/${config.social.github}`}>
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </React.Fragment>
  )
}

export default Layout
