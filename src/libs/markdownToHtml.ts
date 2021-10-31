import { remark } from 'remark'
import remarkHtml from 'remark-html'

const markdownToHtml = async (markdown: any) => {
  const result = (await remark().use(remarkHtml).process(markdown)).toString()
  return result
}

export default markdownToHtml
