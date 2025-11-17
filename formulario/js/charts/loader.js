// ------------------------------------------------------
// MÓDULO: LOADER GLOBAL
// ------------------------------------------------------
export function mostrarLoader() {
    const overlay = document.getElementById("loaderOverlay");
    overlay.classList.add("active");
}

export function ocultarLoader() {
    const overlay = document.getElementById("loaderOverlay");
    overlay.classList.remove("active");
}
