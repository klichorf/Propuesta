// ------------------------------------------------------
// GESTIÓN DE FIRMAS
// ORQUESTADOR PRINCIPAL
// ------------------------------------------------------

import {
    inicializarCanvas,
    limpiarCanvas,
} from "../firmas/firmasCanvas.js";

import {
    cargarTecnicoActual,
    actualizarTecnicoPorCorreo,
} from "../firmas/firmaTecnico.js";

import {
    validarOperadorFormulario,
    alternarPassword,
    limpiarOperador,
    bloquearFirma,
} from "../firmas/firmaOperador.js";

import {
    obtenerOperadorValidado,
} from "../firmas/firmasEstado.js";

import {
    obtenerTecnico,
} from "../services/firebase/tecnicos.js";

import { auth } from "../services/firebase/auth.js";

// ======================================================
// INICIALIZACIÓN
// ======================================================

export function initFirmas() {

    console.log(
        "✍️ Inicializando gestión de firmas..."
    );

    // --------------------------------------------------
    // CANVAS
    // --------------------------------------------------

    inicializarCanvas(
        "sigEjecutor"
    );

    inicializarCanvas(
        "sigCoordinador"
    );

    bloquearFirma();

    // --------------------------------------------------
    // BOTÓN LIMPIAR TÉCNICO
    // --------------------------------------------------

    const btnEjecutor =
        document
            .querySelector("#sigEjecutor")
            ?.parentElement
            .querySelector(
                ".signature-tools button"
            );

    if (btnEjecutor) {

        btnEjecutor.addEventListener(
            "click",
            () => limpiarCanvas(
                "sigEjecutor"
            )
        );
    }

    // --------------------------------------------------
    // BOTÓN LIMPIAR OPERADOR
    // --------------------------------------------------

    const btnCoordinador =
        document.getElementById(
            "btnLimpiarFirmaCoordinador"
        );

    if (btnCoordinador) {

        btnCoordinador.addEventListener(
            "click",
            () => limpiarCanvas(
                "sigCoordinador"
            )
        );
    }

    // --------------------------------------------------
    // TÉCNICO
    // --------------------------------------------------

    cargarTecnicoActual();

    // --------------------------------------------------
    // OPERADOR
    // --------------------------------------------------

    const btnValidar =
        document.getElementById(
            "btnValidarOperador"
        );

    if (btnValidar) {

        btnValidar.addEventListener(
            "click",
            validarOperadorFormulario
        );
    }

    // --------------------------------------------------
    // PASSWORD
    // --------------------------------------------------

    const btnPassword =
        document.getElementById(
            "btnMostrarPasswordOperador"
        );

    if (btnPassword) {

        btnPassword.addEventListener(
            "click",
            alternarPassword
        );
    }

    console.log(
        "✅ Gestión de firmas inicializada"
    );
}

// ======================================================
// LIMPIAR FIRMA
// ======================================================

export function limpiarFirma(id) {
    limpiarCanvas(id);
}

// ======================================================
// LIMPIAR OPERADOR
// ======================================================

export {
    limpiarOperador,
    actualizarTecnicoPorCorreo,
};

// ======================================================
// DATOS PARA PDF
// ======================================================

export function obtenerDatosFirmas() {

    const user =
        auth.currentUser;

    const correo =
        user?.email
            ?.trim()
            .toLowerCase() || "";

    const tecnico =
        obtenerTecnico(correo);

    const nombreTecnico =
        document
            .getElementById(
                "nombreTecnicoFirma"
            )
            ?.textContent
            ?.trim() ||
        tecnico?.nombre ||
        "";

    const cargoTecnico =
        tecnico?.cargo ||
        "Técnico de Mantenimiento";

    const operador =
        obtenerOperadorValidado();

    const nombreOperador =
        document
            .getElementById(
                "nombreOperador"
            )
            ?.textContent
            ?.trim() ||
        operador?.nombre ||
        "";

    const cargoOperador =
        operador?.cargo ||
        "";

    return {

        tecnico: {
            nombre: nombreTecnico,
            cargo: cargoTecnico,
        },

        operador: {
            nombre: nombreOperador,
            cargo: cargoOperador,
        },

    };
}