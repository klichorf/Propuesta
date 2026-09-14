// ------------------------------------------------------
// MÓDULO: DESCARGAR PDF
// ------------------------------------------------------

export function initDescargar(validarFormulario, generarPDF) {
    const btnDescargar = document.getElementById("btnDescargar");
    if (!btnDescargar || btnDescargar.dataset.descargaConfigurada === "true") return;

    btnDescargar.dataset.descargaConfigurada = "true";

    btnDescargar.addEventListener("click", async () => {
        if (btnDescargar.disabled) return;

        const textoOriginal = btnDescargar.innerHTML;

        try {
            if (!validarFormulario()) return;

            btnDescargar.disabled = true;
            btnDescargar.innerHTML = '<i class="bi bi-hourglass-split"></i><span>Generando PDF...</span>';

            const file = await generarPDF();
            if (!(file instanceof Blob)) {
                throw new Error("La generación del PDF no devolvió un archivo válido.");
            }

            const url = URL.createObjectURL(file);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = file.name || "informe_mantenimiento.pdf";
            anchor.style.display = "none";
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();

            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
            btnDescargar.innerHTML = textoOriginal;
        } catch (error) {
            console.error("❌ [DESCARGAR] Error generando PDF:", error);
            if (typeof window.mostrarToast === "function") {
                window.mostrarToast("No fue posible generar el PDF.", "danger");
            } else {
                alert("No fue posible generar el PDF. Revisa la consola para más detalles.");
            }
        } finally {
            btnDescargar.disabled = false;
            btnDescargar.innerHTML = textoOriginal;
        }
    });
}
