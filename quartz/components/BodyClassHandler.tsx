import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Este componente necesita pasar el valor de showGraph al script
function BodyClassHandler({ fileData }: QuartzComponentProps) {
  // Pasamos el valor de showGraph a un atributo de datos en el body
  // Usamos un script inline para asegurar que se ejecute antes que otros scripts
  const show = fileData.frontmatter?.showGraph !== false && fileData.frontmatter?.showGraph !== "false";

  const scriptContent = `
    document.body.dataset.showGraph = "${show}";
    if (${show}) {
      document.body.classList.add('show-graph');
      console.log("[BodyClassHandler] Gráfico habilitado para esta página.");
    } else {
      document.body.classList.remove('show-graph');
      console.log("[BodyClassHandler] Gráfico deshabilitado para esta página.");
    }
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

BodyClassHandler.css = `
  /* Asegurar que el script se ejecute */
  body[data-show-graph] {}
`

export default (() => BodyClassHandler) satisfies QuartzComponentConstructor
