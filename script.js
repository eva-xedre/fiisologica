// JavaScript mínimo para la web de Fisiológica.
// OWNER: mantenga este archivo ligero. Añada aquí solo funcionalidades básicas si son necesarias.

// Actualizar el año actual en el pie de página
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

// Menú de navegación móvil sencillo
const navToggle = document.querySelector(".nav-toggle");
const mainMenu = document.getElementById("menu-principal");

if (navToggle && mainMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
