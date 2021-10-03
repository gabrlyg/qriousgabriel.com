import * as React from "react"
import { Link, useStaticQuery, graphql, PageProps } from "gatsby"

type LayoutProps = {
  location: PageProps["location"]
  title: string
  children: JSX.Element | JSX.Element[]
}

const Layout = ({ location, title, children }: LayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            twitter
            instagram
            github
          }
        }
      }
    }
  `)
  let header: JSX.Element

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <div className="footer-socials">
          <a
            href={`https://www.twitter.com/${data.site.siteMetadata?.social.twitter}`}
          >
            Twitter
          </a>{" "}
          &bull;{" "}
          <a
            href={`https://www.instagram.com/${data.site.siteMetadata?.social.instagram}`}
          >
            Instagram
          </a>{" "}
          &bull;{" "}
          <a
            href={`https://www.github.com/${data.site.siteMetadata?.social.github}`}
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
