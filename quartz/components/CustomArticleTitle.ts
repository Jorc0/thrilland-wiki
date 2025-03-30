import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"

export const CustomArticleTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  // Si el título está en el frontmatter, no mostramos nada
  if (fileData.frontmatter?.title) {
    return null
  }

  return {
    component: "header",
    props: {
      className: `article-title ${displayClass ?? ""}`,
      children: [
        {
          component: "div",
          props: {
            className: "article-title-contents",
            children: [
              {
                component: "h1",
                props: {
                  children: fileData.frontmatter?.title || fileData.slug
                }
              }
            ]
          }
        }
      ]
    }
  }
}

CustomArticleTitle.css = `
.article-title {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.article-title-contents {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.article-title h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--dark);
}
` 