import * as React from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getAllPostsMetaData } from '../libs/api'

type BlogIndexProps = {
  allPostsMetadata: PostMetadata[]
}

const BlogIndex = ({ allPostsMetadata }: BlogIndexProps) => {
  return (
    <section>
      <ul>
        {allPostsMetadata.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <br />
            {post.date}
          </li>
        ))}
      </ul>
    </section>
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
