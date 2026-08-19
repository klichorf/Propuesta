import {
    checklistData
}
from "./checklist.data.js";

import {
    renderChecklist
}
from "./checklist.ui.js";

import {
    actualizarProgreso
}
from "./checklist.progress.js";

// =========================================
// INIT CHECKLIST
// =========================================

export function initChecklist(){

    const contenedor =
    document.getElementById(
        "contenedorChecklist"
    );

    const plantaSelect =
    document.getElementById(
        "plantaChecklist"
    );

    if(
        !contenedor ||
        !plantaSelect
    ){

        console.warn(
            "Checklist no encontrado"
        );

        return;
    }

    // =====================================
    // FECHA
    // =====================================

    inicializarFecha();

    // =====================================
    // CAMBIO DE PLANTA
    // =====================================

    plantaSelect.addEventListener(
        "change",
        () => {

            const planta =
            plantaSelect.value;

            const equipos =
            checklistData[planta] || [];

            renderChecklist(
                contenedor,
                equipos
            );

            actualizarProgreso();

        }
    );

    // =====================================
    // EVENTOS CHECK
    // =====================================

    document.addEventListener(
        "input",
        e => {

            if(
                e.target.classList.contains(
                    "checklist-check"
                )
            ){

                actualizarProgreso();

            }

        }
    );

}

// =========================================
// FECHA + SEMANA
// =========================================

function inicializarFecha(){

    const fechaInput =
    document.getElementById(
        "fechaActual"
    );

    const semanaInput =
    document.getElementById(
        "semanaActual"
    );

    const hoy =
    new Date();

    // FECHA

    fechaInput.value =
    hoy.toLocaleDateString(
        "es-CO"
    );

    // SEMANA

    const inicioAño =
    new Date(
        hoy.getFullYear(),
        0,
        1
    );

    const dias =
    Math.floor(
        (
            hoy - inicioAño
        ) / 86400000
    );

    const semana =
    Math.ceil(
        (
            dias +
            inicioAño.getDay() +
            1
        ) / 7
    );

    semanaInput.value =
    `Semana ${semana}`;

}