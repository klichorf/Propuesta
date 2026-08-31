function initCodigoActivo() {

    const equipoSelect = document.getElementById("equipo");
    const codigoInput = document.getElementById("codigo");

    if (!equipoSelect || !codigoInput) {
        console.error("❌ [CÓDIGO] No se encontró #equipo o #codigo");
        return;
    }

    console.log("🟢 [CÓDIGO] initCodigoActivo iniciado");


    equipoSelect.addEventListener("change", () => {

        // El value del select equipo contiene el código
        const codigo = equipoSelect.value;

        console.log("🔽 [EQUIPO] Equipo seleccionado");
        console.log("   Código obtenido:", codigo);


        // Evitar actualizar innecesariamente
        if (codigoInput.value === codigo) {
            console.log("ℹ️ [CÓDIGO] El código ya es el mismo");
            return;
        }


        // ----------------------------------------------
        // CARGAR CÓDIGO AUTOMÁTICAMENTE
        // ----------------------------------------------

        codigoInput.value = codigo;

        console.log(
            "📝 [CÓDIGO] Código cargado automáticamente:",
            codigo
        );


        // ----------------------------------------------
        // 🔥 AVISAR A LA VALIDACIÓN
        // ----------------------------------------------

        codigoInput.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );


        console.log(
            "🟢 [CÓDIGO] Evento input enviado"
        );

        console.log(
            "   is-invalid:",
            codigoInput.classList.contains("is-invalid")
        );

    });

}

export { initCodigoActivo };