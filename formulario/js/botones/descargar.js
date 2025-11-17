// ------------------------------------------------------
// MÓDULO: DESCARGAR PDF
// ------------------------------------------------------

export function initDescargar(validarFormulario, generarPDF) {
    const btnDescargar = document.getElementById("btnDescargar");

    if (!btnDescargar) return;

    btnDescargar.addEventListener("click", async () => {
        if (!validarFormulario()) return;

        const file = await generarPDF();
        const a = document.createElement("a");

        a.href = URL.createObjectURL(file);
        a.download = "informe_mantenimiento.pdf";
        a.click();
    });
}
