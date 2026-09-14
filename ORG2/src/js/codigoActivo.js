// ------------------------------------------------------
// CÓDIGO AUTOMÁTICO DEL ACTIVO
// ------------------------------------------------------

import { hayDatosPosterioresAlActivo } from "./estadoInforme.js";


function initCodigoActivo() {
    const equipoSelect = document.getElementById("equipo");
    const codigoInput = document.getElementById("codigo");

    if (!equipoSelect || !codigoInput) {
        console.error("❌ [CÓDIGO] No se encontró #equipo o #codigo");
        return;
    }

    if (equipoSelect.dataset.codigoConfigurado === "true") return;
    equipoSelect.dataset.codigoConfigurado = "true";

    let codigoAnterior = "";

    equipoSelect.addEventListener("change", () => {
        const codigo = equipoSelect.value?.trim();
        if (!codigo) return;

        if (codigoAnterior && codigoAnterior !== codigo && hayDatosPosterioresAlActivo()) {
            const confirmar = window.confirm(
                "LISTO"
            );

            if (!confirmar) {
                equipoSelect.value = codigoAnterior;
                return;
            }


        }

        codigoAnterior = codigo;
        codigoInput.value = codigo;
        codigoInput.dispatchEvent(new Event("input", { bubbles: true }));

        window.dispatchEvent(new CustomEvent("activo:identificado", {
            detail: {
                codigo,
                planta: document.getElementById("planta")?.value || "",
                area: document.getElementById("area")?.value || "",
                equipo: codigo
            }
        }));
    });
}

export { initCodigoActivo };
