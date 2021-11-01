import { GetStaticProps } from 'next'
import Link from 'next/link'
import * as React from 'react'
import styled from 'styled-components'
import Bio from '@components/Bio'
import Layout from '@components/Layout'
import SEO from '@components/SEO'
import { getAllPostPaths, getPostBySlug } from '@libs/api'

const BottomNavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const BottomNav = ({
  previousPost,
  nextPost,
}: {
  previousPost?: PostMeta
  nextPost?: PostMeta
}) => {
  return (
    <nav className={'blog-post-nav'}>
      <BottomNavList>
        <li>
          {previousPost && (
            <Link href={previousPost.slug}>
              <a href={previousPost.slug} rel='prev'>
                ← {previousPost.title}
              </a>
            </Link>
          )}
        </li>
        <li>
          {nextPost && (
            <Link href={nextPost.slug}>
              <a href={nextPost.slug} rel='next'>
                {nextPost.title} →
              </a>
            </Link>
          )}
        </li>
      </BottomNavList>
    </nav>
  )
}

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <Layout>
      <article
        className='blog-post'
        itemScope
        itemType='http://schema.org/Article'
      >
        <SEO title={post.title} description={post.description} />
        <header>
          <h1 itemProp='headline'>{post.title}</h1>
          <p>{post.date}</p>
        </header>
        <section>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </section>
        <hr />
        <footer>
          <Bio />
        </footer>
        <BottomNav previousPost={post.previousPost} nextPost={post.nextPost} />
      </article>
    </Layout>
  )
}

export const getStaticPaths = () => {
  const paths = getAllPostPaths()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params?.slug as string)
  return {
    props: {
      post,
    },
  }
}

export default BlogPost
