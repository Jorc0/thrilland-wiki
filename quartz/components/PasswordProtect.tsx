import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { htmlToJsx } from "../util/jsx"
// @ts-ignore
import script from "./scripts/password.inline"
import fs from "fs"
import path from "path"

// Leer contraseñas desde el archivo local
let passwords: Record<string, string> = {}
try {
  const filePath = path.join(process.cwd(), "passwords.json")
  if (fs.existsSync(filePath)) {
    passwords = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  } else {
    // Si el archivo no existe, intenta usar secretos de entorno (para GitHub Actions)
    if (process.env.PASSWORDS_JSON) {
      passwords = JSON.parse(process.env.PASSWORDS_JSON)
    }
  }
} catch (e) {
  // No hacer nada en caso de error, simplemente no habrá contraseñas
}

interface PasswordProtectOptions {
  enabled: boolean
}

const defaultOptions: PasswordProtectOptions = {
  enabled: true,
}

export default ((userOpts?: Partial<PasswordProtectOptions>) => {
  const options: PasswordProtectOptions = { ...defaultOptions, ...userOpts }

  function PasswordProtect(props: QuartzComponentProps) {
    const { fileData, tree } = props
    const shouldProtect = fileData.frontmatter?.passwordprotect === true
    const passwordId = fileData.frontmatter?.password_id as string | undefined
    
    // Obtener la contraseña desde el ID
    const password = passwordId ? passwords[passwordId] : undefined
    const passwordStr = password ? String(password).trim() : ""

    if (!shouldProtect || !passwordStr) {
      // Renderiza el contenido normalmente si no está protegido
      return <article class="popover-hint">{htmlToJsx(fileData.filePath!, tree)}</article>
    }

    const b64password = Buffer.from(passwordStr, 'utf-8').toString('base64')

    return (
      <div class="password-protect" data-password={b64password}>
        <form id="password-form" class="password-form">
          <input type="password" id="password-input" placeholder="Introduce la contraseña" autocomplete="off" />
          <button id="password-submit" type="submit">Acceder</button>
        </form>
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

  PasswordProtect.afterDOMLoaded = script
  return PasswordProtect
}) satisfies QuartzComponentConstructor
