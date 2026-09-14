// ------------------------------------------------------
// ESTADO VISUAL Y VALIDACIÓN DE CAMPOS
// ------------------------------------------------------

export function estaVacio(campo) {
    if (!campo) {
        console.warn("⚠️ [VALIDACIÓN] Campo no encontrado");
        return true;
    }

    if (campo.tagName === "SELECT") {
        return !campo.value || campo.selectedIndex === 0;
    }

    return !campo.value.trim();
}

export function quitarError(campo) {
    if (!campo) {
        console.warn(
            "⚠️ [VALIDACIÓN] Intentando quitar error de campo inexistente",
        );
        return;
    }

    campo.classList.remove("is-invalid");

    if (campo.tagName === "SELECT") {
        campo.style.border = "";
    }
}

export function ponerError(campo) {
    if (!campo) {
        console.warn("⚠️ [VALIDACIÓN] Intentando marcar campo inexistente");
        return;
    }

    campo.classList.add("is-invalid");

    if (campo.tagName === "SELECT") {
        campo.style.border = "2px solid #dc3545";
    }
}

export function validarCampo(campo) {
    if (!campo) {
        console.warn("⚠️ [VALIDACIÓN] validarCampo recibió un campo inexistente");
        return false;
    }

    if (estaVacio(campo)) {
        ponerError(campo);
        return false;
    }

    quitarError(campo);
    return true;
}
