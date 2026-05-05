// ------------------------------------------------------
// MÓDULO PRINCIPAL: INICIALIZACIÓN
// ------------------------------------------------------

import { initFotos } from "./fotos.js";
import { initFirmas } from "./firmas.js";
import { generarPDF } from "./pdf.js";
import { validarFormulario } from "./validarFormulario.js";
import { initSelects } from "./initSelects.js";
import { initTiempo } from "./tiempo.js";
import { cargarRepuestos } from "./repuestos.js";
import { initBuscadorRepuestos } from "./buscadorRepuestos.js";
import { initBuscadorHerramientas } from "./buscadorHerramintas.js";
import { initQRScanner } from "./qr.js";
import { generarReportePlantas } from "./reporte/reportePlantas.js";
import { toggleReportePlantas } from "./reporte/toggleReportePlantas.js";
import { initFiltrosReporte } from "./reporte/filtrosReporte.js";
import { initBotonGraficoPrincipal } from "./charts/botonGrafico.js";
import { initBotones } from "./botones/botones.js";
import { obtenerRegistros } from "./reporte/obtenerRegistros.js";
import { generarHojaDeVida } from "./lifesheet/generarHojaDeVida.js";
import { generarReporteIntervenciones } from "./reporte/reporteIntervenciones.js";
import { initFiltrosIntervenciones } from "./reporte/filtrosIntervenciones.js";
import { cambiarEstado, eliminarCronograma } from "./cronograma/cronograma.js";
import { initCronograma, initEventosCronograma } from "./cronograma/uiCronograma.js";

// hacer accesible desde botones HTML
window.iniciar = async (id) => {
    await cambiarEstado(id, "EN_PROCESO");
    await initCronograma();
};

window.finalizar = async (id) => {
    await cambiarEstado(id, "FINALIZADO");
    await initCronograma();
};

window.eliminarCrono = async (id) => {
    await eliminarCronograma(id);
    await initCronograma();
};

// ------------------------------------------------------
// HACER DISPONIBLE abrirHojaDeVida() PARA LOS BOTONES
// ------------------------------------------------------


window.abrirHojaDeVida = async function (btn) {
    const planta = btn.dataset.planta;
    const area = btn.dataset.area;
    const equipo = btn.dataset.equipo;

    try {
        const registros = await obtenerRegistros();
        generarHojaDeVida(registros, planta, area, equipo);
    } catch (err) {
        console.error("Error al abrir hoja de vida:", err);
    }
};
// ------------------------------------------------------
// INICIALIZACIÓN AL CARGAR EL DOM
// ------------------------------------------------------





document.addEventListener("DOMContentLoaded", async () => {
    console.log("➡️ INICIANDO DOMContentLoaded - Inicialización");

    // ------------------------------------------------------
    // LISTA DE INICIALIZACIONES
    // ------------------------------------------------------
    const inicializaciones = [
        { fn: initFotos, name: "initFotos" },
        { fn: initFirmas, name: "initFirmas" },
        { fn: initSelects, name: "initSelects" },
        { fn: initTiempo, name: "initTiempo" },
        { fn: cargarRepuestos, name: "cargarRepuestos" },
        { fn: initBuscadorRepuestos, name: "initBuscadorRepuestos" },
        { fn: initBuscadorHerramientas, name: "initBuscadorHerramientas" },
        { fn: initQRScanner, name: "initQRScanner" },
        { fn: () => initBotones(validarFormulario, generarPDF), name: "initBotones" },
        { fn: () => initFiltrosReporte(), name: "initFiltrosReporte" },
        { fn: () => toggleReportePlantas(generarReportePlantas), name: "toggleReportePlantas" },
        { fn: () => toggleReportePlantas(generarReporteIntervenciones), name: "toggleReporteIntervenciones" },
        { fn: () => initFiltrosIntervenciones(), name: "initFiltrosIntervenciones" },
        { fn: () => initCronograma(), name: "initCronograma" },
        { fn: () => initEventosCronograma(), name: "initEventosCronograma" },
    ];

    // ------------------------------------------------------
    // EJECUTAR INICIALIZACIONES CON LOGS DE DEPURACIÓN
    // ------------------------------------------------------
    for (const { fn, name } of inicializaciones) {
        try {
            console.log(`🔹 Inicializando ${name}...`);
            await fn(); // 🔹 Usamos await por si la función es async
            console.log(`✅ ${name} inicializado`);
        } catch (e) {
            console.error(`⛔ Error en ${name}:`, e);
        }
    }

        initBotonGraficoPrincipal();


});
