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

export const getPostBySlug = async (slug: string): Promise<PostData> => {
  const fullPath = join(postsDir, `${slug}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContent)

  const contentHtml = await markdownToHtml(content)
  return {
    slug,
    contentHtml,
    ...(data as PostFrontMatter),
  }
}

export const getPostMetaDataBySlug = (slug: string): PostMetadata => {
  const fullPath = join(postsDir, `${slug}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContent)
  return {
    slug,
    ...(data as PostFrontMatter),
  }
}

export const getAllPostsMetaData = (): PostMetadata[] => {
  const posts = getAllPostSlugs()
    .map((slug) => getPostMetaDataBySlug(slug))
    .sort((post0, post1) => (post0.date > post1.date ? -1 : 1))
  return posts
}
