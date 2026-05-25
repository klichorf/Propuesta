// codigoActivo.js

function initCodigoActivo() {

    const equipoSelect = document.getElementById("equipo");
    const codigoInput = document.getElementById("codigo");

    if (!equipoSelect || !codigoInput) return;

    equipoSelect.addEventListener("change", () => {

        // obtener código del equipo seleccionado
        const codigo = equipoSelect.value;

        // actualizar input #activo
        codigoInput.value = codigo;

        // reutilizar lógica existente
        codigoInput.dispatchEvent(new Event("input"));

    });

}

export { initCodigoActivo };