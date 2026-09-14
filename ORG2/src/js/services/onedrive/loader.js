// ------------------------------------------------------
// MÓDULO: LOADER GLOBAL
// ------------------------------------------------------

export function mostrarLoadercompartir() {

    const overlay =
        document.getElementById("loaderOverlay2");

    if (!overlay) {
        console.error(
            "❌ [LOADER] No existe #loaderOverlay2"
        );
        return;
    }

    console.log(
        "🟢 [LOADER] Mostrando loader"
    );

    overlay.classList.add("active");

    console.log(
        "📌 [LOADER] Clases:",
        overlay.className
    );
}


export function ocultarLoadercompartir() {

    const overlay =
        document.getElementById("loaderOverlay2");

    if (!overlay) {
        console.error(
            "❌ [LOADER] No existe #loaderOverlay2"
        );
        return;
    }

    console.log(
        "🔴 [LOADER] Ocultando loader"
    );

    overlay.classList.remove("active");
}