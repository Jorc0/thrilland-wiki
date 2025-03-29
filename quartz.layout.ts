import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'Jorc0/quartz',
        // from data-repo-id
        repoId: 'R_kgDOOOChkw',
        // from data-category
        category: 'General',
        // from data-category-id
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
      useSavedState: true,
      mapFn: (node) => {
        // Usar símbolos más simples y añadir espaciado para mejor legibilidad
        if (node.isFolder) {
          node.displayName = "📁 " + node.displayName
        } else {
          node.displayName = "📄 " + node.displayName
        }
        return node
      },
      sortFn: (a, b) => {
        // Primero ordenar carpetas, luego archivos
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
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        scale: 1.3,
        repelForce: 1,
        centerForce: 0.3,
        linkDistance: 50,
        fontSize: 0.8,
        opacityScale: 1,
        removeTags: [],
        showTags: false,
        enableRadial: false,
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 1.1,
        repelForce: 1,
        centerForce: 0.3,
        linkDistance: 50,
        fontSize: 0.8,
        opacityScale: 1,
        removeTags: [],
        showTags: false,
        enableRadial: true,
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
      useSavedState: true,
      mapFn: (node) => {
        // Usar símbolos más simples y añadir espaciado para mejor legibilidad
        if (node.isFolder) {
          node.displayName = "📁 " + node.displayName
        } else {
          node.displayName = "📄 " + node.displayName
        }
        return node
      },
      sortFn: (a, b) => {
        // Primero ordenar carpetas, luego archivos
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
