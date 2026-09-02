// ------------------------------------------------------
// MÓDULO: VALIDAR FORMULARIO
// ------------------------------------------------------

import {
    CAMPOS_OBLIGATORIOS,
    FIRMAS_OBLIGATORIAS,
} from "./configValidacion.js";

import {
    validarCampo,
} from "./estadoValidacion.js";

import {
    validarFirma,
} from "./validacionFirmas.js";

import {
    mostrarErrores,
} from "./mensajesValidacion.js";

// ------------------------------------------------------
// VALIDACIÓN COMPLETA
// ------------------------------------------------------
// Esta función NO se ejecuta al cargar la página.
// Solo se ejecuta cuando Descargar o Compartir la llaman.
// ------------------------------------------------------

export function validarFormulario() {
    const faltantes = [];
    let primero = null;

    for (const id of CAMPOS_OBLIGATORIOS) {
        const campo =
            document.getElementById(id);

        // Conservamos el comportamiento original:
        // un elemento inexistente no se agrega a faltantes.
        if (!campo) {
            console.error(
                `❌ [VALIDACIÓN] No existe el elemento #${id}`
            );
            continue;
        }

        if (!validarCampo(campo)) {
            faltantes.push(id);

            if (!primero) {
                primero = campo;
            }
        }
    }

    for (const firma of FIRMAS_OBLIGATORIAS) {
        const resultado =
            validarFirma(
                firma.id,
                firma.nombre
            );

        if (resultado.faltante) {
            faltantes.push(resultado.nombre);

            if (!primero) {
                primero = resultado.elemento;
            }
        }
    }

    if (faltantes.length > 0) {
        mostrarErrores(primero);
        return false;
    }

    return true;
}
