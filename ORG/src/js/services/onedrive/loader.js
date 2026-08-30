// ------------------------------------------------------
// MÓDULO: LOADER GLOBAL
// ------------------------------------------------------
export function mostrarLoadercompartir() {
    const overlay = document.getElementById("loaderOverlay2");
    overlay.classList.add("active");
}

export function ocultarLoadercompartir() {
    const overlay = document.getElementById("loaderOverlay2");
    overlay.classList.remove("active");
}
