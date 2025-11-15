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
import { initBotones } from "./botones.js";
import { verGrafico } from "./grafico.js";
import { generarReportePlantas } from "./reportePlantas.js";
import { cargarPlantasEnFiltro } from "./reportes.js";
import { toggleReportePlantas } from "./toggleReportePlantas.js";   // 👈 NUEVO


document.addEventListener("DOMContentLoaded", () => {

    // Inicializaciones seguras
    try { initFotos(); } catch (e) {}
    try { initFirmas(); } catch (e) {}
    try { initSelects(); } catch (e) {}
    try { initTiempo(); } catch (e) {}
    try { cargarRepuestos(); } catch (e) {}
    try { initBuscadorRepuestos(); } catch (e) {}
    try { initBuscadorHerramientas(); } catch (e) {}
    try { initQRScanner(); } catch (e) {}
    try { initBotones(validarFormulario, generarPDF); } catch (e) {}


    // ------------------------------------------------------
    // BOTÓN PARA VER GRÁFICO
    // ------------------------------------------------------
    const btnGrafico = document.getElementById("btnVerGrafico");
    if (btnGrafico) {
        btnGrafico.addEventListener("click", verGrafico);
    }

    // ------------------------------------------------------
    // 🔹 TOGGLE DEL MODAL DE REPORTES (MODULAR)
    // ------------------------------------------------------
    toggleReportePlantas(generarReportePlantas);

    // ------------------------------------------------------
    // FILTROS DEL REPORTE
    // ------------------------------------------------------
const modalEl = document.getElementById("modalReportePlantas");

modalEl.addEventListener("shown.bs.modal", () => {
    document.getElementById("filtroPlanta").onchange = generarReportePlantas;
    document.getElementById("filtroFechaInicio").onchange = generarReportePlantas;
    document.getElementById("filtroFechaFin").onchange = generarReportePlantas;
});

modalEl.addEventListener("hide.bs.modal", () => {
    document.getElementById("filtroPlanta").onchange = null;
    document.getElementById("filtroFechaInicio").onchange = null;
    document.getElementById("filtroFechaFin").onchange = null;
});


    // ------------------------------------------------------
    // CARGAR PLANTAS AL INICIAR
    // ------------------------------------------------------
    cargarPlantasEnFiltro();
});
