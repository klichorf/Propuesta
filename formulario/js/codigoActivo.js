function initCodigoActivo() {

    const equipoSelect = document.getElementById("equipo");
    const codigoInput = document.getElementById("codigo");

    equipoSelect.addEventListener("change", () => {

        const codigo = equipoSelect.value;

        // evitar actualizar innecesariamente
        if (codigoInput.value === codigo) return;

        codigoInput.value = codigo;

        codigoInput.dispatchEvent(new Event("input"));

    });

}

export { initCodigoActivo };