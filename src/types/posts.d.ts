declare type PostFrontMatter = {
  title: string
  date: string
  description?: string
}
declare type PostMetadata = PostFrontMatter & {
  slug: string
}
declare type PostData = PostMetadata & {
  contentHtml: string
  previousPost?: PostMetadata
  nextPost?: PostMetadata
}
