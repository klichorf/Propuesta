// ------------------------------------------------------
// MÓDULO: TOGGLE REPORTE DE PLANTAS
// ------------------------------------------------------

import { mostrarLoader, ocultarLoader } from "../charts/loader.js";

let modalReporteInstancia = null;
let inicializado = false;

export function toggleReportePlantas() {
    if (inicializado) {
        console.warn("⚠️ [REPORTE PLANTAS] Ya estaba inicializado");
        return;
    }

    const btnReporte = document.getElementById("btnReportePlantas");

    const modalEl = document.getElementById("modalReportePlantas");

    if (!btnReporte || !modalEl) {
        console.warn("⛔ [REPORTE PLANTAS] Botón o modal no encontrados");

        return;
    }

    // --------------------------------------------------
    // CREAR MODAL
    // --------------------------------------------------

    modalReporteInstancia = new bootstrap.Modal(modalEl, {
        backdrop: "static",
    });

    // --------------------------------------------------
    // EVENTO: MODAL MOSTRADO
    // --------------------------------------------------

    modalEl.addEventListener("shown.bs.modal", manejarModalMostrado);

    // --------------------------------------------------
    // EVENTO: BOTÓN
    // --------------------------------------------------

    btnReporte.addEventListener("click", manejarClickReporte);

    inicializado = true;

    console.log("✅ [REPORTE PLANTAS] Inicializado correctamente");
}

// ------------------------------------------------------
// EVENTOS
// ------------------------------------------------------

function manejarModalMostrado() {
    ocultarLoader();

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

async function manejarClickReporte() {
    const abierto = document
        .getElementById("modalReportePlantas")
        ?.classList.contains("show");

    try {
        mostrarLoader();

        if (abierto) {
            modalReporteInstancia.hide();
            return;
        }

        modalReporteInstancia.show();
    } catch (error) {
        console.error("❌ [REPORTE PLANTAS] Error:", error);

        ocultarLoader();
    }
}
