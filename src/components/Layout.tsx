import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import config from '../../config'

type LayoutProps = {
  children: JSX.Element | JSX.Element[]
}

type HeaderProps = {
  title: string
  isRoot: boolean
}

const Header = ({ title, isRoot }: HeaderProps) => {
  return (
    <header className='global-header'>
      {isRoot ? (
        <h1 className='main-heading'>
          <Link href='/'>
            <a href='/'>{title}</a>
          </Link>
        </h1>
      ) : (
        <Link href='/'>
          <a className='header-link-home' href='/'>
            {title}
          </a>
        </Link>
      )}
    </header>
  )
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter()
  const isRoot = pathname === '/'
  return (
    <React.Fragment>
      <Head>
        <title>{config.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='global-wrapper'>
        <Header isRoot={isRoot} title={config.title} />
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
