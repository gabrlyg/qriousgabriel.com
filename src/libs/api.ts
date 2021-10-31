import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import markdownToHtml from './markdownToHtml'

const postsDir = join(process.cwd(), '_posts')

export const getAllPostSlugs = () => {
  return fs
    .readdirSync(postsDir)
    .filter((path) => path.match(/.*\.md/g))
    .map((path) => path.replace(/\.md$/, ''))
}

export const getAllPostPaths = () =>
  getAllPostSlugs().map((path) => ({
    params: {
      slug: path,
    },
  }))

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const fullPath = join(postsDir, `${slug}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const {
    data: { title, date, description },
    content,
  } = matter(fileContent)

  const contentHtml = await markdownToHtml(content)

  const [previousPost, nextPost] = getPreviousNextPost(
    slug,
    getAllPostsMetaData()
  )

  return {
    slug,
    contentHtml,
    title,
    date: getFormattedDate(date),
    description,
    previousPost,
    nextPost,
  }
}

export const getPostMetaDataBySlug = (slug: string): PostMeta => {
  const fullPath = join(postsDir, `${slug}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const {
    data: { title, date, description },
  } = matter(fileContent)
  return {
    slug,
    title,
    date: getFormattedDate(date),
    description,
  }
}

export const getAllPostsMetaData = (): PostMeta[] => {
  const posts = getAllPostSlugs()
    .map((slug) => getPostMetaDataBySlug(slug))
    .sort((post0, post1) =>
      new Date(post0.date) > new Date(post1.date) ? -1 : 1
    )
  return posts
}

const getPreviousNextPost = (slug: string, posts: PostMeta[]) => {
  const index = posts.findIndex(({ slug: postSlug }) => postSlug === slug)
  return [posts[index + 1] || null, posts[index - 1] || null]
}

const getFormattedDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
