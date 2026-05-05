// ------------------------------------------------------
// INICIALIZAR FILTROS DE INTERVENCIONES
// ------------------------------------------------------

import { generarReporteIntervenciones } from "./reporteIntervenciones.js";

export function initFiltrosIntervenciones() {

    console.log("➡️ Inicializando filtros de intervenciones");

    const planta = document.getElementById("filtroPlantaIntervencion");
    const fechaInicio = document.getElementById("filtroInicioIntervencion");
    const fechaFin = document.getElementById("filtroFinIntervencion");

    if (!planta || !fechaInicio || !fechaFin) {
        console.warn("⚠️ Filtros no encontrados en el DOM");
        return;
    }

    // 🔹 evento cambio planta
    planta.addEventListener("change", () => {
        console.log("🔄 Cambio en planta");
        generarReporteIntervenciones();
    });

    // 🔹 evento cambio fecha inicio
    fechaInicio.addEventListener("change", () => {
        console.log("🔄 Cambio en fecha inicio");
        generarReporteIntervenciones();
    });

    // 🔹 evento cambio fecha fin
    fechaFin.addEventListener("change", () => {
        console.log("🔄 Cambio en fecha fin");
        generarReporteIntervenciones();
    });
}