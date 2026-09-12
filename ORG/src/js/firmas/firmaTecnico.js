// ------------------------------------------------------
// GESTIÓN DE FIRMA DEL TÉCNICO
// ------------------------------------------------------

import {
    obtenerNombreTecnico,
    obtenerTecnico,
} from "../services/firebase/tecnicos.js";

import { auth } from "../services/firebase/auth.js";

import { firmasPersonas } from "../datos/firmasPersonas.js";

import {
    cargarImagenEnCanvas,
    limpiarCanvas,
} from "./firmasCanvas.js";

import { normalizarNombre } from "./firmasUtils.js";

const firmasBaseUrl =
    new URL("../../assets/firmas/", import.meta.url).href;

// ======================================================
// OBTENER TÉCNICO ACTUAL
// ======================================================

export function obtenerTecnicoActual() {

    const user = auth.currentUser;

    if (!user) {
        return null;
    }

    const correo =
        user.email?.trim().toLowerCase();

    return obtenerTecnico(correo);
}

// ======================================================
// CARGAR TÉCNICO
// ======================================================

export async function cargarTecnicoActual() {

    const tecnico =
        obtenerTecnicoActual();

    if (!tecnico) {

        console.warn(
            "⚠️ No existe técnico asociado al usuario"
        );

        return false;
    }

    const nombre =
        tecnico.nombre ||
        obtenerNombreTecnico(
            auth.currentUser?.email
        );

    if (!nombre) {
        return false;
    }

    console.log(
        "👤 Técnico identificado:",
        nombre
    );

    const nombreElemento =
        document.getElementById(
            "nombreTecnicoFirma"
        );

    if (nombreElemento) {
        nombreElemento.textContent = nombre;
    }

    const ejecutor =
        document.getElementById("ejecutor");

    if (ejecutor) {

        ejecutor.value = nombre;
        ejecutor.disabled = true;
    }

    await cargarFirmaPersona(
        nombre,
        "sigEjecutor"
    );

    return true;
}

// ======================================================
// CARGAR FIRMA DE PERSONA
// ======================================================

export function cargarFirmaPersona(
    nombre,
    idCanvas
) {

    const nombreNormalizado =
        normalizarNombre(nombre);

    const archivo =
        firmasPersonas[nombreNormalizado];

    if (!archivo) {

        console.warn(
            "⚠️ Firma no encontrada:",
            nombreNormalizado
        );

        limpiarCanvas(idCanvas);

        return false;
    }

    return cargarImagenEnCanvas(
        `${firmasBaseUrl}${archivo}`,
        idCanvas,
        archivo
    );
}

// ======================================================
// ACTUALIZAR TÉCNICO POR CORREO
// ======================================================

export function actualizarTecnicoPorCorreo(
    correo
) {

    const ejecutor =
        document.getElementById("ejecutor");

    if (!ejecutor) {
        console.warn(
            "⚠️ No se encontró #ejecutor"
        );

        return;
    }

    const tecnico =
        obtenerTecnico(
            correo?.trim().toLowerCase()
        );

    if (!tecnico) {

        console.warn(
            "⚠️ No existe técnico asociado:",
            correo
        );

        ejecutor.value = "";

        limpiarCanvas("sigEjecutor");

        return;
    }

    ejecutor.value = tecnico.nombre;

    const nombreElemento =
        document.getElementById(
            "nombreTecnicoFirma"
        );

    if (nombreElemento) {
        nombreElemento.textContent =
            tecnico.nombre;
    }

    cargarFirmaPersona(
        tecnico.nombre,
        "sigEjecutor"
    );

    console.log(
        "👤 Técnico identificado:",
        tecnico.nombre
    );
}