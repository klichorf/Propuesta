// ------------------------------------------------------
// MÓDULO: FILTROS DEL REPORTE
// ------------------------------------------------------
import { generarReportePlantas } from "./reportePlantas.js";
import { cargarPlantasEnFiltro } from "./reportes.js";

export function initFiltrosReporte() {
    console.group("%c➡️ INICIANDO initFiltrosReporte()", "color: blue; font-weight: bold;");

    const modalEl = document.getElementById("modalReportePlantas");
    if (!modalEl) {
        console.warn("%c⛔ Modal #modalReportePlantas no encontrado", "color: red; font-weight: bold;");
        console.groupEnd();
        return;
    }

    console.log("%c🔹 Configurando eventos del modal...", "color: purple; font-weight: bold;");

    // Al abrir el modal → cargar plantas
    modalEl.addEventListener("show.bs.modal", () => {
        console.log("%c📂 Evento show.bs.modal → cargando plantas en filtro", "color: teal;");
        cargarPlantasEnFiltro();
    });

    // Cuando se muestra el modal → asignar onchange a los filtros
    modalEl.addEventListener("shown.bs.modal", () => {
        console.log("%c📌 Evento shown.bs.modal → asignando onchange a los filtros", "color: green; font-weight: bold;");
        document.getElementById("filtroPlanta").onchange = () => {
            console.log("%c🔹 Filtro 'Planta' cambiado", "color: orange;");
            generarReportePlantas();
        };
        document.getElementById("filtroFechaInicio").onchange = () => {
            console.log("%c🔹 Filtro 'Fecha Inicio' cambiado", "color: orange;");
            generarReportePlantas();
        };
        document.getElementById("filtroFechaFin").onchange = () => {
            console.log("%c🔹 Filtro 'Fecha Fin' cambiado", "color: orange;");
            generarReportePlantas();
        };
    });

    // Al cerrar el modal → quitar onchange para no duplicar eventos
    modalEl.addEventListener("hide.bs.modal", () => {
        console.log("%c❌ Evento hide.bs.modal → removiendo onchange de los filtros", "color: red; font-weight: bold;");
        document.getElementById("filtroPlanta").onchange = null;
        document.getElementById("filtroFechaInicio").onchange = null;
        document.getElementById("filtroFechaFin").onchange = null;
    });

    console.groupEnd();
}
