import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { useEffect, useState } from "preact/hooks"

interface Options {
  links: Record<string, string>
  // El contador usa una solución sin clave API por defecto
  useVisitCounter?: boolean
  counterNamespace?: string
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const [visitas, setVisitas] = useState<number | null>(null)
    const useCounter = opts?.useVisitCounter ?? true
    const namespace = opts?.counterNamespace ?? "thrilland-wiki"

    useEffect(() => {
      if (!useCounter) return
      
      // Solución simple de contador local - más privada y sin depender de API externa
      try {
        // Obtener conteo actual
        const storageKey = `${namespace}-visits`
        const currentCount = parseInt(localStorage.getItem(storageKey) || "0")
        
        // Comprobar si ya se visitó hoy
        const lastVisitKey = `${namespace}-last-visit`
        const lastVisit = localStorage.getItem(lastVisitKey)
        const today = new Date().toDateString()
        
        if (lastVisit !== today) {
          // Si es la primera visita del día, incrementar contador
          const newCount = currentCount + 1
          localStorage.setItem(storageKey, newCount.toString())
          localStorage.setItem(lastVisitKey, today)
          setVisitas(newCount)
        } else {
          // Si ya visitó hoy, mostrar contador actual
          setVisitas(currentCount)
        }
      } catch (e) {
        console.warn("No se pudo acceder a localStorage para el contador", e)
        setVisitas(null)
      }
    }, [])

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        {visitas !== null && <p>👀 {visitas.toLocaleString()} visitas</p>}
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
