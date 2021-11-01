import * as React from 'react'
import Head from 'next/head'
import config from '@config'

const SEO = ({ description, title }: any) => {
  const siteTitle = config.title

  return (
    <Head>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name='description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={siteTitle} />
      <meta property='twitter:card' content='summary' />
      <meta property='twitter:creator' content={config.social.twitter} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <link rel='icon' type='image/png' href='/site-icon.png' />
      <link rel='apple-touch-icon' href='/site-icon.png' />
    </Head>
  )
}
export default SEO
