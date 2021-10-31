declare type PostFrontMatter = {
  title: string
  date: string
  description?: string
}
declare type PostMeta = PostFrontMatter & {
  slug: string
}
declare type Post = PostMeta & {
  contentHtml: string
  previousPost?: PostMeta
  nextPost?: PostMeta
}
