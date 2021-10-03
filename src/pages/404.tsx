import * as React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

type DataProps = {
  site: any
}

const NotFoundPage = ({ data, location }: PageProps<DataProps>) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
