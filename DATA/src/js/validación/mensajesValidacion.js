// ------------------------------------------------------
// MENSAJES Y FOCO DE VALIDACIÓN
// ------------------------------------------------------

export function mostrarAlerta(mensaje, tipo = "info") {
    let alerta = document.getElementById("alertaFormulario");

    if (!alerta) {
        alerta = document.createElement("div");

        alerta.id = "alertaFormulario";

        alerta.className =
            `alert alert-${tipo} text-center ` +
            "position-fixed top-0 start-50 " +
            "translate-middle-x mt-3 shadow";

        alerta.style.zIndex = "1055";

        document.body.appendChild(alerta);
    }

    alerta.textContent = mensaje;
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
}

export function enfocarPrimerError(elemento) {
    if (!elemento) {
        return;
    }

    elemento.scrollIntoView({
        behavior: "smooth",
        block: "center",
    });

    setTimeout(() => {
        if (
            elemento.tagName === "INPUT" ||
            elemento.tagName === "TEXTAREA" ||
            elemento.tagName === "SELECT"
        ) {
            elemento.focus();
        }
    }, 400);
}

export function mostrarErrores(elemento) {
    mostrarAlerta(
        "⚠️ Debes completar todos los campos obligatorios antes de continuar.",
        "warning",
    );

    enfocarPrimerError(elemento);
}
