// ------------------------------------------------------
// REPORTE AGRUPADO POR PLANTA → ÁREA → EQUIPO
// ------------------------------------------------------
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "./firebase.js";




// ------------------------------------------------------
// REPORTE AGRUPADO CON FILTROS
// ------------------------------------------------------

export async function generarReportePlantas() {

    // ------------------------
    // 1. Leer filtros del usuario
    // ------------------------
    const filtroPlanta = document.getElementById("filtroPlanta").value.trim();
    const fechaInicio = document.getElementById("filtroFechaInicio").value;
    const fechaFin = document.getElementById("filtroFechaFin").value;

    const ref = collection(db, "mantenimientos");
    const snapshot = await getDocs(ref);
    let registros = snapshot.docs.map(doc => doc.data());

    if (registros.length === 0) {
        alert("No hay datos registrados.");
        return;
    }

    // ----------------------------------------------------
    // 2. FILTRO POR PLANTA
    // ----------------------------------------------------
    if (filtroPlanta !== "") {
        registros = registros.filter(r => r.planta === filtroPlanta);
    }

    // ----------------------------------------------------
    // 3. FILTRO POR FECHA (rango)
    // ----------------------------------------------------
    if (fechaInicio !== "") {
        registros = registros.filter(r => r.fechaInicio >= fechaInicio);
    }

    if (fechaFin !== "") {
        registros = registros.filter(r => r.fechaFin <= fechaFin);
    }

    // Si después de filtrar no quedan registros
    if (registros.length === 0) {
        alert("No hay resultados con los filtros aplicados.");
        return;
    }

    // ----------------------------------------------------
    // 4. AGRUPACIÓN: planta → área → equipo
    // ----------------------------------------------------
    const reporte = {};

    registros.forEach(reg => {
        const planta = reg.planta || "SIN PLANTA";
        const area = reg.area || reg["Área de Mezclas"] || "SIN ÁREA";
        const equipo = reg.equipo || "SIN EQUIPO";

        if (!reporte[planta]) reporte[planta] = {};
        if (!reporte[planta][area]) reporte[planta][area] = {};
        if (!reporte[planta][area][equipo]) reporte[planta][area][equipo] = [];

        reporte[planta][area][equipo].push(reg);
    });

    console.log("📄 REPORTE FILTRADO:", reporte);

    

    mostrarReporteEnModal(reporte);
}


// ------------------------------------------------------
// MOSTRAR EL REPORTE EN EL MODAL
// ------------------------------------------------------
function mostrarReporteEnModal(reporte) {

    const contenedor = document.getElementById("contenidoReporte");

    if (!contenedor) {
        console.error("❌ Falta el div #contenidoReporte en tu HTML");
        return;
    }

    let html = "";

    Object.keys(reporte).forEach(planta => {
        html += `<h4 class="mt-3 text-primary">PLANTA: ${planta}</h4>`;

        Object.keys(reporte[planta]).forEach(area => {
            html += `<h5 class="ms-3 text-success">Área: ${area}</h5>`;

            Object.keys(reporte[planta][area]).forEach(equipo => {
                html += `<div class="ms-4 mb-2"><strong>Equipo:</strong> ${equipo}</div>`;

                reporte[planta][area][equipo].forEach(reg => {
                    html += `
                        <div class="ms-5 mb-3 border-start ps-3">
                            <div><b>Tipo:</b> ${reg.tipoMantenimiento}</div>
                            <div><b>Trabajo:</b> ${reg.trabajo}</div>
                            <div><b>Repuestos:</b> ${reg.repuestos}</div>
                            <div><b>Herramientas:</b> ${reg.herramientas}</div>
                            <div><b>Ejecutor:</b> ${reg.ejecutor}</div>
                            <div><b>Inicio:</b> ${reg.fechaInicio}</div>
                            <div><b>Fin:</b> ${reg.fechaFin}</div>
                        </div>
                    `;
                });
            });
        });
    });

    contenedor.innerHTML = html;

    

}

