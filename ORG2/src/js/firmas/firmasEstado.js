// ------------------------------------------------------
// ESTADO DE FIRMAS
// ------------------------------------------------------

let sigEjecutorData = null;
let sigCoordinadorData = null;
let operadorValidado = null;

// ======================================================
// FIRMAS
// ======================================================

export function obtenerSigEjecutorData() {
    return sigEjecutorData;
}

export function obtenerSigCoordinadorData() {
    return sigCoordinadorData;
}

export function establecerSigEjecutorData(data) {
    sigEjecutorData = data;
}

export function establecerSigCoordinadorData(data) {
    sigCoordinadorData = data;
}

// ======================================================
// OPERADOR
// ======================================================

export function obtenerOperadorValidado() {
    return operadorValidado;
}

export function establecerOperadorValidado(operador) {
    operadorValidado = operador;
}

export function limpiarEstadoOperador() {
    operadorValidado = null;
}

export function operadorEstaValidado() {
    return operadorValidado !== null;
}