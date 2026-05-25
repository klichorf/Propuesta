// codigoActivo.js

function initCodigoActivo() {

    const equipoSelect = document.getElementById("equipo");
    const codigoInput = document.getElementById("codigo");

    if (!equipoSelect || !codigoInput) return;

    equipoSelect.addEventListener("change", () => {

        // obtiene el código seleccionado
        const codigoSeleccionado = equipoSelect.value;

        // lo coloca en #activo
        codigoInput.value = codigoSeleccionado;

    });

}

export { initCodigoActivo };