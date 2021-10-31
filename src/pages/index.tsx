import * as React from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getAllPostsMetaData } from '../libs/api'
import Layout from '../components/Layout'
import Bio from '../components/Bio'

type BlogIndexProps = {
  allPostsMetadata: PostMetadata[]
}

const BlogIndex = ({ allPostsMetadata }: BlogIndexProps) => {
  return (
    <Layout>
      <Bio />
      <ol style={{ listStyle: 'none' }}>
        {allPostsMetadata.map((post) => (
          <article
            className='post-list-item'
            itemScope
            itemType='http://schema.org/Article'
          >
            <header>
              <h2>
                <Link href={`/posts/${post.slug}`}>
                  <a itemProp='headline'>{post.title}</a>
                </Link>
              </h2>

              <small>{post.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.description || '',
                }}
                itemProp='description'
              />
            </section>
          </article>
        ))}
      </ol>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsMetadata = getAllPostsMetaData()
  return {
    props: {
      allPostsMetadata,
    },
  }
}

export default BlogIndex
