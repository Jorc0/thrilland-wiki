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
          // Para carpetas, usar emoji basado en el nombre
          let folderIcon = "📁"
          const folderName = node.displayName.toLowerCase()
          
          if (folderName === "rangos") folderIcon = "👑"
          else if (folderName === "comunidad") folderIcon = "👥"
          else if (folderName === "guias-avanzadas") folderIcon = "📚"
          else if (folderName === "guia-nuevos-jugadores") folderIcon = "🌟"
          else if (folderName === "economia") folderIcon = "💰"
          else if (folderName === "protecciones") folderIcon = "🛡️"
          else if (folderName === "eventos") folderIcon = "🎉"
          else if (folderName === "pvp-combate") folderIcon = "⚔️"
          else if (folderName === "misiones") folderIcon = "📋"
          else if (folderName === "caracteristicas-especiales") folderIcon = "✨"
          else if (folderName === "crafteos") folderIcon = "⚒️"
          else if (folderName === "historia") folderIcon = "📖"
          
          node.displayName = `${folderIcon} ${node.displayName}`
        } else {
          // Para archivos
          if (node.displayName === "index.md") {
            node.displayName = "📑 Inicio"
          } else {
            let icon = "📄"
            const fileName = node.displayName.toLowerCase()
            
            // Asignar iconos basados en el nombre del archivo
            if (fileName.includes("reglas")) icon = "📜"
            else if (fileName.includes("comandos")) icon = "⌨️"
            else if (fileName.includes("rangos")) icon = "👑"
            else if (fileName.includes("economia")) icon = "💰"
            else if (fileName.includes("pvp")) icon = "⚔️"
            else if (fileName.includes("crafteos")) icon = "⚒️"
            else if (fileName.includes("misiones")) icon = "📋"
            else if (fileName.includes("eventos")) icon = "🎉"
            else if (fileName.includes("guia")) icon = "📚"
            
            const title = node.data?.title
            node.displayName = `${icon} ${title || node.displayName.replace(".md", "")}`
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
      useSavedState: false,
      mapFn: (node) => {
        if (node.isFolder) {
          // Para carpetas, usar emoji basado en el nombre
          let folderIcon = "📁"
          const folderName = node.displayName.toLowerCase()
          
          if (folderName === "rangos") folderIcon = "👑"
          else if (folderName === "comunidad") folderIcon = "👥"
          else if (folderName === "guias-avanzadas") folderIcon = "📚"
          else if (folderName === "guia-nuevos-jugadores") folderIcon = "🌟"
          else if (folderName === "economia") folderIcon = "💰"
          else if (folderName === "protecciones") folderIcon = "🛡️"
          else if (folderName === "eventos") folderIcon = "🎉"
          else if (folderName === "pvp-combate") folderIcon = "⚔️"
          else if (folderName === "misiones") folderIcon = "📋"
          else if (folderName === "caracteristicas-especiales") folderIcon = "✨"
          else if (folderName === "crafteos") folderIcon = "⚒️"
          else if (folderName === "historia") folderIcon = "📖"
          
          node.displayName = `${folderIcon} ${node.displayName}`
        } else {
          // Para archivos
          if (node.displayName === "index.md") {
            node.displayName = "📑 Inicio"
          } else {
            let icon = "📄"
            const fileName = node.displayName.toLowerCase()
            
            // Asignar iconos basados en el nombre del archivo
            if (fileName.includes("reglas")) icon = "📜"
            else if (fileName.includes("comandos")) icon = "⌨️"
            else if (fileName.includes("rangos")) icon = "👑"
            else if (fileName.includes("economia")) icon = "💰"
            else if (fileName.includes("pvp")) icon = "⚔️"
            else if (fileName.includes("crafteos")) icon = "⚒️"
            else if (fileName.includes("misiones")) icon = "📋"
            else if (fileName.includes("eventos")) icon = "🎉"
            else if (fileName.includes("guia")) icon = "📚"
            
            const title = node.data?.title
            node.displayName = `${icon} ${title || node.displayName.replace(".md", "")}`
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
