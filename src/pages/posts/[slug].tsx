import { GetStaticProps } from 'next'
import * as React from 'react'
import Layout from '../../components/Layout'
import { getAllPostPaths, getPostBySlug } from '../../libs/api'

const BlogPost = ({ postData }: { postData: PostData }) => {
  return (
    <Layout>
      <article
        className='blog-post'
        itemScope
        itemType='http://schema.org/Article'
      >
        <header>
          <h1>{postData.title}</h1>
        </header>
        <section>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </section>
        <footer>Footer goes here</footer>
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
  const postData = await getPostBySlug(params?.slug as string)
  return {
    props: {
      postData,
    },
  }
}

export default BlogPost
