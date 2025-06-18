import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  defaultPassword: string // Contraseña por defecto si no se especifica en el frontmatter
}

const defaultOptions: Options = {
  defaultPassword: "admin123", // ¡Cámbiala en producción!
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  function ProtectedPage({ fileData, displayClass }: QuartzComponentProps) {
    // Detectar si la página debe estar protegida por contraseña
    const isProtected = fileData.frontmatter?.password_encripted === "yes" || fileData.frontmatter?.password_encripted === true
    const slug = fileData.slug
    // Obtener la contraseña específica del archivo o usar la por defecto
    const pagePassword = fileData.frontmatter?.password || opts.defaultPassword

    if (!isProtected) {
      return null // No mostrar nada si la página no está protegida
    }

    return (
      <div id={`protected-${slug}`} class={classNames(displayClass, "protected-container")} data-password={pagePassword}>
        <div class="login-form">
          <h3>Contenido Protegido</h3>
          <p>Esta página está protegida. Por favor, introduce la contraseña para acceder:</p>
          <div class="input-group">
            <input 
              type="password" 
              id={`input-${slug}`} 
              placeholder="Contraseña" 
              autocomplete="current-password"
            />
            <button id={`btn-${slug}`} class="primary">Acceder</button>
          </div>
          <p id={`error-${slug}`} class="error-msg"></p>
        </div>
        <div id={`content-${slug}`} class="hidden-content">
          {/* El contenido real se renderizará aquí */}
        </div>
      </div>
    )
  }

  ProtectedPage.css = `
    .protected-container {
      padding: 2rem;
      font-family: var(--fontSans);
    }
    .login-form {
      background: var(--bg);
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      margin: 0 auto;
    }
    .login-form h3 {
      margin-top: 0;
      color: var(--secondary);
    }
    .input-group {
      display: flex;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    .input-group input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 1rem;
    }
    .input-group button {
      padding: 0.5rem 1rem;
      background: var(--secondary);
      color: var(--bg);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.2s;
    }
    .input-group button:hover {
      background: var(--secondary-hover);
    }
    .hidden-content {
      display: none;
      margin-top: 2rem;
    }
    .error-msg {
      color: var(--error);
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }
  `

  ProtectedPage.afterDOMLoaded = `
    document.addEventListener("nav", () => {
      document.querySelectorAll('[id^="protected-"]').forEach(container => {
        const slug = container.id.replace('protected-', '')
        const input = document.getElementById('input-' + slug) as HTMLInputElement
        const button = document.getElementById('btn-' + slug)
        const error = document.getElementById('error-' + slug)
        const content = document.getElementById('content-' + slug)

        // Verificar si ya está autenticado
        const isAuthenticated = sessionStorage.getItem('auth_' + slug) === 'true'
        if (isAuthenticated) {
          content!.style.display = 'block'
          container.querySelector('.login-form')!.style.display = 'none'
          return
        }

        // Manejar el evento de click
        button?.addEventListener('click', () => {
          // Obtener la contraseña específica de la página desde el atributo data-password
          const pagePassword = container.getAttribute('data-password')
          if (input?.value === pagePassword) {
            content!.style.display = 'block'
            container.querySelector('.login-form')!.style.display = 'none'
            sessionStorage.setItem('auth_' + slug, 'true')
          } else {
            error!.innerText = 'Contraseña incorrecta'
            input!.value = ''
          }
        })

        // Permitir submit con Enter
        input?.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            button?.click()
          }
        })
      })
    })
  `

  return ProtectedPage
}) satisfies QuartzComponentConstructor
