import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { htmlToJsx } from "../util/jsx"
// @ts-ignore
import script from "./scripts/password.inline"
import fs from "fs"
import path from "path"

interface PasswordProtectOptions {
  enabled: boolean
}

const defaultOptions: PasswordProtectOptions = {
  enabled: true,
}

// Cargar las contraseñas una sola vez al iniciar
const passwordsFilePath = path.join(process.cwd(), "passwords.json")
let passwords: Record<string, string> = {}
console.log(`\nBuscando archivo de contraseñas...`)
try {
  // Priorizar la variable de entorno para producción
  if (process.env.PASSWORDS_JSON) {
    passwords = JSON.parse(process.env.PASSWORDS_JSON)
    console.log("Contraseñas cargadas correctamente desde la variable de entorno.")
    console.log(`Rutas protegidas: ${Object.keys(passwords).join(", ")}`)
  } 
  // Usar el archivo local para desarrollo
  else if (fs.existsSync(passwordsFilePath)) {
    console.log(`Cargando contraseñas desde: ${passwordsFilePath}`)
    const rawData = fs.readFileSync(passwordsFilePath, "utf-8")
    passwords = JSON.parse(rawData)
    console.log(`Contraseñas cargadas correctamente para las siguientes rutas: ${Object.keys(passwords).join(", ")}`)
  } else {
    console.warn("ADVERTENCIA: No se encontró el archivo passwords.json ni la variable de entorno PASSWORDS_JSON. Las páginas protegidas no funcionarán.")
  }
} catch (e) {
  console.error("ERROR: No se pudo leer o procesar la fuente de contraseñas. Comprueba que el formato JSON es válido.", e)
}

export default ((userOpts?: Partial<PasswordProtectOptions>) => {
  const options: PasswordProtectOptions = { ...defaultOptions, ...userOpts }

  function PasswordProtect(props: QuartzComponentProps) {
    const { fileData, tree } = props
    const slug = fileData.slug

    // La protección se activa con el frontmatter
    const shouldProtect = fileData.frontmatter?.passwordprotect === true

    // Pero la contraseña se obtiene del archivo JSON
    const password = slug ? passwords[slug] : undefined
    const passwordStr = password ? String(password).trim() : ""

    if (!shouldProtect || !passwordStr) {
      // Renderiza el contenido normalmente si no está protegido o no hay contraseña para este slug
      return <article class="popover-hint">{htmlToJsx(fileData.filePath!, tree)}</article>
    }

    return (
      <div class="password-protect" data-password={btoa(passwordStr)}>
        <form id="password-form" class="password-form">
          <input
            type="password"
            id="password-input"
            placeholder="Introduce la contraseña"
            autocomplete="off"
          />
          <button id="password-submit" type="submit">
            Acceder
          </button>
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
