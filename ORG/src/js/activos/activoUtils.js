import {
    normalizarUrlSharePoint,
    obtenerUrlArchivoSharePoint
} from "../services/onedrive/sharepointUrls.js";

export function coincideActivo(
    activo,
    planta,
    codigoEquipo,
    nombreEquipo
) {

    const plantaSeleccionada =
        normalizarTexto(planta);

    const codigoSeleccionado =
        normalizarTexto(codigoEquipo);

    const nombreSeleccionado =
        normalizarTexto(nombreEquipo);


    // ==================================================
    // 1. PRIMERO DEBE COINCIDIR LA PLANTA
    // ==================================================

    const plantaActivo =
        normalizarTexto(activo.planta);

    if (
        plantaActivo !== plantaSeleccionada
    ) {
        return false;
    }


    // ==================================================
    // 2. BUSCAR EL CÓDIGO REAL DEL ACTIVO
    // ==================================================

    const codigos = [

        activo.codigo,

        activo.codigoEquipo,

        activo.serial,

        activo.maquinaEquipo

    ]
        .map(normalizarTexto)
        .filter(Boolean);


    // ==================================================
    // 3. EL CÓDIGO TIENE PRIORIDAD ABSOLUTA
    // ==================================================

    if (codigoSeleccionado) {

        const coincideCodigo =
            codigos.some(
                codigo =>
                    codigo === codigoSeleccionado
            );

        if (coincideCodigo) {
            return true;
        }

        /*
         * IMPORTANTE:
         *
         * Si tenemos un código seleccionado
         * pero este activo no tiene exactamente
         * ese código, NO lo consideramos.
         *
         * Así evitamos:
         *
         * GA22
         * GA22 SECADOR
         * GA22 MOTOR
         * GA22 TRANSPORTADOR
         *
         * mezclándose entre sí.
         */

        return false;
    }


    // ==================================================
    // 4. SOLO SI NO EXISTE CÓDIGO
    //    SE PUEDE COMPARAR EL NOMBRE
    // ==================================================

    if (!nombreSeleccionado) {
        return false;
    }


    const nombres = [

        activo.equipo,

        activo.nombre,

        activo.descripcionBasica

    ]
        .map(normalizarTexto)
        .filter(Boolean);


    // ==================================================
    // 5. NOMBRE EXACTO
    // ==================================================

    return nombres.some(
        nombre =>
            nombre === nombreSeleccionado
    );
}

export function obtenerReferenciaFoto(activo) {

    if (activo.fotoUrlSharePoint) {
        return activo.fotoUrlSharePoint;
    }

    if (activo.rutaFotoSharePoint) {
        return activo.rutaFotoSharePoint;
    }

    if (
        activo.fotoRutaSharePoint &&
        activo.fotoNombreSharePoint
    ) {
        return `${activo.fotoRutaSharePoint}/${activo.fotoNombreSharePoint}`;
    }

    if (activo.fotoRutaSharePoint) {
        return activo.fotoRutaSharePoint;
    }

    return "";
}


export function obtenerUrlsFoto(activo) {

    const referencia =
        obtenerReferenciaFoto(activo);

    if (!referencia) {
        return {
            urlVista: "",
            urlImagen: ""
        };
    }

    return {
        urlVista:
            normalizarUrlSharePoint(referencia),

        urlImagen:
            obtenerUrlArchivoSharePoint(referencia)
    };
}


export function normalizarTexto(valor) {

    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toUpperCase();
}