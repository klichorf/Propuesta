// ------------------------------------------------------
// VALIDACIÓN EN TIEMPO REAL
// ------------------------------------------------------

import { CAMPOS_OBLIGATORIOS } from "./configValidacion.js";
import { validarCampo } from "./estadoValidacion.js";
import { configurarValidacionFirma } from "./validacionFirmas.js";

function manejarCambioCampo(evento) {
    const campo = evento.target;

    if (!campo || !campo.id) {
        return;
    }

    if (!CAMPOS_OBLIGATORIOS.includes(campo.id)) {
        return;
    }

    validarCampo(campo);
}

export function iniciarValidacionTiempoReal() {
    const formulario = document.getElementById("formulario");

    if (!formulario) {
        console.warn("⚠️ [VALIDACIÓN] NO SE ENCONTRÓ #formulario");
        return;
    }

    // Evita registrar listeners más de una vez.
    if (formulario.dataset.validacionTiempoReal === "true") {
        return;
    }

    formulario.dataset.validacionTiempoReal = "true";

    formulario.addEventListener("input", manejarCambioCampo);

    formulario.addEventListener("change", manejarCambioCampo);

    configurarValidacionFirma("sigEjecutor");
    configurarValidacionFirma("sigCoordinador");

    console.log("✅ [VALIDACIÓN] Validación en tiempo real configurada");
}
