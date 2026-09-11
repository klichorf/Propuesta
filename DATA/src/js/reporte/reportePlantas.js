// ------------------------------------------------------
// GENERAR REPORTE AGRUPADO POR PLANTA → ÁREA → EQUIPO
// ------------------------------------------------------

import { agruparRegistros } from "./agruparRegistros.js";
import { aplicarFiltros } from "./aplicarFiltros.js";
import { obtenerRegistros } from "./obtenerRegistros.js";
import { validarResultados } from "./validarResultados.js";
import { mostrarReporteEnModal } from "./mostrarReporteEnModal.js";

export async function generarReportePlantas() {

    console.group("%c➡️ INICIANDO generarReportePlantas()", "color: blue; font-weight: bold;");

    const filtroPlanta = document.getElementById("filtroPlanta").value.trim();
    const fechaInicio = document.getElementById("filtroFechaInicio").value;
    const fechaFin = document.getElementById("filtroFechaFin").value;

    console.log("%c📌 Filtros seleccionados:", "color: purple; font-weight: bold;", { filtroPlanta, fechaInicio, fechaFin });

    let registros = await obtenerRegistros();
    console.log(`%c📥 Registros obtenidos: ${registros.length}`, "color: green; font-weight: bold;");

    // Validar que existan datos
    console.groupCollapsed("%c🔹 Validando registros obtenidos...", "color: orange;");
    validarResultados(registros, "No hay datos registrados.", "no-data");
    console.groupEnd();

    // Lista dinámica de filtros
    const filtros = [
        [filtroPlanta !== "" && filtroPlanta !== "TODAS", r => r.planta === filtroPlanta],
        [fechaInicio !== "", r => r.fechaInicio >= fechaInicio],
        [fechaFin !== "", r => r.fechaFin <= fechaFin]
    ];

    console.groupCollapsed("%c🔹 Aplicando filtros...", "color: teal;");
    registros = aplicarFiltros(registros, filtros);
    console.log(`%c📊 Registros después de filtrar: ${registros.length}`, "color: green;");
    console.groupEnd();

    // 👉 ACTUALIZAR CONTADOR DE INFORMES
    document.getElementById("totalInformesReporte").textContent = registros.length;

    // Validar resultados después de filtrar
    console.groupCollapsed("%c🔹 Validando resultados filtrados...", "color: orange;");
    validarResultados(registros, "No hay resultados con los filtros aplicados.", "no-results");
    console.groupEnd();

    // Agrupar los datos
    console.groupCollapsed("%c🔹 Agrupando registros...", "color: brown;");
    const reporte = agruparRegistros(registros);
    console.log("%c📄 REPORTE FINAL:", "color: navy; font-weight: bold;", reporte);
    console.groupEnd();

    // Mostrar en modal
    console.groupCollapsed("%c🔹 Mostrando reporte en modal...", "color: darkgreen;");
    mostrarReporteEnModal(reporte);
    console.groupEnd();

    console.log("%c✅ generarReportePlantas() completado", "color: blue; font-weight: bold;");
    console.groupEnd();
}
