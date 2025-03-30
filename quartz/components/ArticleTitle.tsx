import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function ArticleTitle({ fileData, displayClass }: QuartzComponentProps) {
  // Si el título está en el frontmatter, no mostramos nada
  if (fileData.frontmatter?.title) {
    return null
  }

  return (
    <h1 class={`article-title ${displayClass ?? ""}`}>{fileData.slug}</h1>
  )
}

ArticleTitle.css = `
.article-title {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--dark);
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
