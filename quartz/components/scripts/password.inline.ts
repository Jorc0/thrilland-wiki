const unlockedPages = new Set();

function initProtection() {
  const protectContainer = document.querySelector('.password-protect');
  if (!protectContainer) {
    return;
  }

  const pagePath = window.location.pathname;
  const passwordForm = document.getElementById("password-form");
  const protectedContent = document.getElementById("protected-content");

  if (unlockedPages.has(pagePath)) {
    if (passwordForm) passwordForm.style.display = "none";
    if (protectedContent) protectedContent.style.display = "block";
    return;
  }

  const passwordInput = document.getElementById("password-input");
  const passwordSubmit = document.getElementById("password-submit");

  if (!passwordForm || !protectedContent || !passwordInput || !passwordSubmit) {
    return
  }

  const checkPassword = (e?: Event) => {
    e?.preventDefault() // Evitar que la página se recargue
    if (!(passwordInput instanceof HTMLInputElement)) {
      return;
    }
    const inputPassword = btoa(passwordInput.value)
    const correctPassword = protectContainer.getAttribute('data-password')
    
    if (inputPassword === correctPassword) {
      passwordForm.style.display = "none"
      protectedContent.style.display = "block"
      unlockedPages.add(pagePath);
    } else {
      alert("Contraseña incorrecta")
    }
  }

  // Al cargar, el contenido protegido debe estar oculto por si acaso
  if (protectedContent) protectedContent.style.display = "none";
  if (passwordForm) passwordForm.style.display = "flex";

  passwordForm.onsubmit = checkPassword
}

document.addEventListener('DOMContentLoaded', initProtection);
document.addEventListener("nav", initProtection);

// Vigilar cambios en el DOM y ejecutar la protección cuando sea necesario
const protectionObserver = new MutationObserver(initProtection);
protectionObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// Intentar ejecutar una vez al inicio, por si acaso
initProtection(); 