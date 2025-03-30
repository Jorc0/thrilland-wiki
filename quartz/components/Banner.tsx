import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/banner.scss"

interface Options {
  title?: string
  subtitle?: string
}

const defaultOptions: Options = {
  title: "Thrilland Wiki",
  subtitle: "Tu guía completa para la aventura"
}

export default ((userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts }
  
  const Banner: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div class={`banner ${displayClass ?? ""}`}>
        <div class="banner-content">
          <img src="./static/logo.png" alt="Thrilland Logo" class="banner-logo" />
          <div class="banner-text">
            <h1>{opts.title}</h1>
            <p>{opts.subtitle}</p>
          </div>
        </div>
      </div>
    )
  }

  Banner.css = style
  return Banner
}) satisfies QuartzComponentConstructor<Options> 