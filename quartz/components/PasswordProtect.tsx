import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { htmlToJsx } from "../util/jsx"

interface PasswordProtectOptions {
  enabled: boolean
}

const defaultOptions: PasswordProtectOptions = {
  enabled: true,
}

export default ((userOpts?: Partial<PasswordProtectOptions>) => {
  const options: PasswordProtectOptions = { ...defaultOptions, ...userOpts }

  const PasswordProtect: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, tree } = props
    const password = fileData.frontmatter?.password
    const passwordStr = typeof password === "string" ? password : ""

    if (!options.enabled || !passwordStr) {
      // Renderiza el contenido normalmente si no hay contraseña
      return <article class="popover-hint">{htmlToJsx(fileData.filePath!, tree)}</article>
    }

    return (
      <div class="password-protect" data-password={btoa(passwordStr)}>
        <div id="password-form" class="password-form">
          <input type="password" id="password-input" placeholder="Introduce la contraseña" />
          <button id="password-submit">Acceder</button>
        </div>
        <div id="protected-content" class="protected-content" style="display: none;">
          <article class="popover-hint">{htmlToJsx(fileData.filePath!, tree)}</article>
        </div>
      </div>
    )
  }

  PasswordProtect.css = `
    .password-protect {
      width: 100%;
    }
    .password-form {
      display: flex;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    .password-form input {
      padding: 0.5rem;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: var(--bg);
      color: var(--fg);
    }
    .password-form button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: var(--secondary);
      color: var(--fg);
      cursor: pointer;
    }
    .password-form button:hover {
      background: var(--secondary-hover);
    }
  `

  PasswordProtect.afterDOMLoaded = `
    document.addEventListener("nav", () => {
      const passwordForm = document.getElementById("password-form")
      const protectedContent = document.getElementById("protected-content")
      const passwordInput = document.getElementById("password-input") as HTMLInputElement
      const passwordSubmit = document.getElementById("password-submit")

      if (!passwordForm || !protectedContent || !passwordInput || !passwordSubmit) return

      const checkPassword = () => {
        const inputPassword = btoa(passwordInput.value)
        const correctPassword = document.querySelector('.password-protect')?.getAttribute('data-password')
        
        if (inputPassword === correctPassword) {
          passwordForm.style.display = "none"
          protectedContent.style.display = "block"
          localStorage.setItem("page_password_" + window.location.pathname, inputPassword)
        } else {
          alert("Contraseña incorrecta")
        }
      }

      // Check if password es correcta y ya está almacenada
      const storedPassword = localStorage.getItem("page_password_" + window.location.pathname)
      if (storedPassword === document.querySelector('.password-protect')?.getAttribute('data-password')) {
        passwordForm.style.display = "none"
        protectedContent.style.display = "block"
      }

      passwordSubmit.onclick = checkPassword
      passwordInput.onkeypress = (e) => {
        if (e.key === "Enter") {
          checkPassword()
        }
      }
    })
  `

  return PasswordProtect
}) satisfies QuartzComponentConstructor
