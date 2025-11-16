// js/loader.js
export function mostrarLoader() {
    const overlay = document.getElementById("loaderOverlay");
    overlay.classList.add("active");
}

export function ocultarLoader() {
    const overlay = document.getElementById("loaderOverlay");
    overlay.classList.remove("active");
}


// ------------------------------------------------------
// Skeleton Loader (barras brillantes)
// ------------------------------------------------------
export function activarSkeleton(idContenedor) {
    const cont = document.getElementById(idContenedor);
    if (!cont) return;

    cont.innerHTML = `
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
    `;
}

export function desactivarSkeleton(idContenedor) {
    const cont = document.getElementById(idContenedor);
    if (!cont) return;
    cont.innerHTML = "";
}