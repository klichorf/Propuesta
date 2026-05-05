// ------------------------------------------------------
// REPORTE COMPLETO DE INTERVENCIONES
// ------------------------------------------------------

import { obtenerRegistros } from "./obtenerRegistros.js";
import { transformarRegistros } from "./transformarRegistros.js";
import { generarResumenIntervenciones } from "./resumenIntervenciones.js";
import { calcularTotalMinutos, calcularTotalHoras } from "./totalesIntervenciones.js";
import { mostrarReporteIntervenciones } from "./mostrarReporteIntervenciones.js";


export async function generarReporteIntervenciones() {

    console.group("📊 REPORTE INTERVENCIONES");

    let registros = await obtenerRegistros();

    console.log("📥 Registros totales:", registros.length);

    // ------------------------------------------------------
    // 🔹 CAPTURAR FILTROS
    // ------------------------------------------------------
    const filtroPlanta = document.getElementById("filtroPlantaIntervencion")?.value;
    const fechaInicio = document.getElementById("filtroInicioIntervencion")?.value;
    const fechaFin = document.getElementById("filtroFinIntervencion")?.value;

    console.log("📌 Filtro planta:", `"${filtroPlanta}"`);
    console.log("📌 Fecha inicio:", fechaInicio);
    console.log("📌 Fecha fin:", fechaFin);

    // 🔍 DEBUG (ver valores reales de planta)
    registros.slice(0, 10).forEach(r => {
        console.log("📄 Registro planta:", `"${r.planta}"`);
    });

    // ------------------------------------------------------
    // 🔹 FILTRAR REGISTROS
    // ------------------------------------------------------
    registros = registros.filter(r => {

        let ok = true;

        const plantaRegistro = (r.planta || "").trim().toUpperCase();
        const plantaFiltro = (filtroPlanta || "").trim().toUpperCase();

        // 🔹 FILTRO PLANTA
        if (plantaFiltro && plantaFiltro !== "TODAS") {
            ok = ok && plantaRegistro === plantaFiltro;
        }

        // 🔹 FILTRO FECHA INICIO
        if (fechaInicio) {
            ok = ok && new Date(r.fechaInicio) >= new Date(fechaInicio);
        }

        // 🔹 FILTRO FECHA FIN
        if (fechaFin) {
            ok = ok && new Date(r.fechaFin) <= new Date(fechaFin);
        }

        return ok;
    });

    console.log("📊 Registros después de filtros:", registros.length);

    // ------------------------------------------------------
    // 🔹 TRANSFORMAR DATOS
    // ------------------------------------------------------
    registros = transformarRegistros(registros);

    // ------------------------------------------------------
    // 🔹 AGRUPAR POR TIPO
    // ------------------------------------------------------
    const resumen = generarResumenIntervenciones(registros);

    // ------------------------------------------------------
    // 🔹 CALCULAR TOTALES
    // ------------------------------------------------------
    const totales = {};

    for (const tipo in resumen) {
        const minutos = calcularTotalMinutos(resumen[tipo]);

        totales[tipo] = {
            minutos,
            horas: calcularTotalHoras(minutos)
        };
    }

    console.log("📊 RESUMEN:", resumen);
    console.log("⏱️ TOTALES:", totales);

    // ------------------------------------------------------
    // 🔹 MOSTRAR REPORTE
    // ------------------------------------------------------
    mostrarReporteIntervenciones({ resumen, totales });

    // ------------------------------------------------------
    // 🔹 ABRIR MODAL
    // ------------------------------------------------------
    const modal = new bootstrap.Modal(
        document.getElementById("modalReporteIntervenciones")
    );

    modal.show();

    console.groupEnd();
}