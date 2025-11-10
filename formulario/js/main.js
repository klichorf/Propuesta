// ------------------------------------------------------
// MÓDULO PRINCIPAL: INICIALIZACIÓN Y EVENTOS
// ------------------------------------------------------
import { initFotos } from "./fotos.js";
import { initFirmas } from "./firmas.js";
import { generarPDF } from "./pdf.js";
import { validarFormulario } from "./validarFormulario.js";
import { initSelects } from "./selects.js";
import { initTiempo } from "./tiempo.js";
import { cargarRepuestos } from "./repuestos.js";
import { initBuscadorRepuestos } from "./buscadorRepuestos.js";
import { initBuscadorHerramientas } from "./buscadorHerramintas.js";
import { initQRScanner } from "./qr.js";

 
document.addEventListener("DOMContentLoaded", () => {
    initFotos();
    initFirmas();
    initSelects();
    initTiempo();
    cargarRepuestos();
    initBuscadorRepuestos();
    initBuscadorHerramientas();
    initQRScanner()

    const btnDescargar = document.getElementById("btnDescargar");
    const btnCompartir = document.getElementById("btnCompartir");

    btnDescargar.addEventListener("click", async () => {
        if (!validarFormulario()) return;
        const file = await generarPDF();
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = "informe_mantenimiento.pdf";
        a.click();
    });

    btnCompartir.addEventListener("click", async () => {
        if (!validarFormulario()) return;
        const file = await generarPDF();
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: "Informe de mantenimiento",
                files: [file],
            });
        } else {
            mostrarAlerta("Tu navegador no admite compartir archivos.", "danger");
        }
    });
});
