// ------------------------------------------------------
// MÓDULO PRINCIPAL: INICIALIZACIÓN
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
import { initBotones } from "./botones.js"; // 👈 nuevo módulo

document.addEventListener("DOMContentLoaded", () => {
    try { initFotos(); } catch(e) {}
    try { initFirmas(); } catch(e) {}
    try { initSelects(); } catch(e) {}
    try { initTiempo(); } catch(e) {}
    try { cargarRepuestos(); } catch(e) {}
    try { initBuscadorRepuestos(); } catch(e) {}
    try { initBuscadorHerramientas(); } catch(e) {}
    try { initQRScanner(); } catch(e) {}
    try { initBotones(validarFormulario, generarPDF); } catch(e) {}
});
