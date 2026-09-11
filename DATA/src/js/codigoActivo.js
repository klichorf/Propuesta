// ------------------------------------------------------
// MÓDULO: CÓDIGO AUTOMÁTICO DEL ACTIVO
// ------------------------------------------------------

function initCodigoActivo() {
    const equipoSelect = document.getElementById("equipo");
    const codigoInput = document.getElementById("codigo");

    if (!equipoSelect || !codigoInput) {
        console.error(
            "❌ [CÓDIGO] No se encontró #equipo o #codigo"
        );
        return;
    }

    // Evitar registrar el listener más de una vez
    if (equipoSelect.dataset.codigoConfigurado === "true") {
        return;
    }

    equipoSelect.dataset.codigoConfigurado = "true";

    console.log("🟢 [CÓDIGO] Inicializado");

    equipoSelect.addEventListener("change", () => {
        const codigo = equipoSelect.value;

        if (codigoInput.value === codigo) {
            return;
        }

        codigoInput.value = codigo;

        codigoInput.dispatchEvent(
            new Event("input", {
                bubbles: true,
            })
        );
    });
}

export { initCodigoActivo };
