import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzComponent } from "./quartz/components/types"
import { jsx } from "preact/jsx-runtime"

const Banner = () => {
  return {
    component: jsx("div", {
      className: "banner",
      children: jsx("img", {
        src: "/static/logo.png",
        alt: "Thrilland Logo"
      })
    }),
    css: `
      .banner {
        width: 100%;
        background: linear-gradient(135deg, var(--light) 0%, var(--secondary) 100%);
        padding: 1rem;
        margin-bottom: 1rem;
        text-align: center;
      }
      
      .banner img {
        max-width: 200px;
        height: auto;
        margin: 0 auto;
        display: block;
      }
    `
  }
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
  ],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        repo: 'Jorc0/quartz',
        repoId: 'R_kgDOOOChkw',
        category: 'General',
        categoryId: 'DIC_kwDOOOChk84Cob6F',
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jorc0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.Explorer({
      title: "Explorador",
      folderClickBehavior: "link",
      folderDefaultState: "open",
      useSavedState: false,
      mapFn: (node) => {
        if (node.isFolder) {
          // Para carpetas, usar emoji del index.md si existe, o un placeholder temporal
          const folderIcon = node.data?.emoji || "📁"
          node.displayName = `${folderIcon} ${node.displayName}`
        } else {
          // Para archivos
          if (node.displayName === "index.md") {
            node.displayName = "📑 Inicio"
          } else {
            // Usar el emoji definido en el frontmatter del archivo, o un emoji por defecto si no está definido
            const emoji = node.data?.emoji || "📄"
            const title = node.data?.title
            node.displayName = `${emoji} ${title || node.displayName.replace(".md", "")}`
            // Eliminar el título del contenido si existe
            if (node.data?.content) {
              node.data.content = node.data.content.replace(/^# .*\n/, '')
            }
          }
        }
        return node
      },
      sortFn: (a, b) => {
        // Colocar index.md primero en cada carpeta
        if (a.displayName.includes("📑 Inicio")) return -1
        if (b.displayName.includes("📑 Inicio")) return 1
        
        // Luego ordenar carpetas y archivos
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (!a.isFolder && b.isFolder) {
          return 1
        } else {
          return -1
        }
      },
      filterFn: (node) => {
        // Solo excluir archivos con tag específico
        return !node.data?.tags?.includes("explorerexclude")
      },
      order: ["filter", "map", "sort"]
    }),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: {
          drag: true,
          zoom: true,
          depth: 1,
          scale: 1.3,
          repelForce: 0.5,
          centerForce: 0.3,
          linkDistance: 30,
          fontSize: 0.6,
          opacityScale: 1,
          removeTags: [],
          showTags: true,
          enableRadial: false,
        },
        globalGraph: {
          drag: true,
          zoom: true,
          depth: -1,
          scale: 0.9,
          repelForce: 0.5,
          centerForce: 0.3,
          linkDistance: 30,
          fontSize: 0.6,
          opacityScale: 1,
          removeTags: [],
          showTags: true,
          enableRadial: true,
        },
      }),
      condition: (page) => {
        // Mostrar el gráfico si showGraph no está definido o es true
        return page.frontmatter?.showGraph !== false;
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "Explorador",
      folderClickBehavior: "link",
      folderDefaultState: "open",
      useSavedState: false,
      mapFn: (node) => {
        if (node.isFolder) {
          // Para carpetas, usar emoji del index.md si existe, o un placeholder temporal
          const folderIcon = node.data?.emoji || "📁"
          node.displayName = `${folderIcon} ${node.displayName}`
        } else {
          // Para archivos
          if (node.displayName === "index.md") {
            node.displayName = "📑 Inicio"
          } else {
            // Usar el emoji definido en el frontmatter del archivo, o un emoji por defecto si no está definido
            const emoji = node.data?.emoji || "📄"
            const title = node.data?.title
            node.displayName = `${emoji} ${title || node.displayName.replace(".md", "")}`
            // Eliminar el título del contenido si existe
            if (node.data?.content) {
              node.data.content = node.data.content.replace(/^# .*\n/, '')
            }
          }
        }
        return node
      },
      sortFn: (a, b) => {
        // Colocar index.md primero en cada carpeta
        if (a.displayName.includes("📑 Inicio")) return -1
        if (b.displayName.includes("📑 Inicio")) return 1
        
        // Luego ordenar carpetas y archivos
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (!a.isFolder && b.isFolder) {
          return 1
        } else {
          return -1
        }
      },
      filterFn: (node) => {
        // Solo excluir archivos con tag específico
        return !node.data?.tags?.includes("explorerexclude")
      },
      order: ["filter", "map", "sort"]
    }),
  ],
  right: [],
}
