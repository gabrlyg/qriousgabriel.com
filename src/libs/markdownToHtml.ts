import { remark } from 'remark'
import html from 'remark-html'
const prism = require('remark-prism')

const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism, { transformInlineCode: true })
    .process(markdown)
  return result.toString()
}

export default markdownToHtml
