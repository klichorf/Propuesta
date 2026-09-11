import { obtenerActivos } from "./activosService.js";

import {
    coincideActivo,
    obtenerUrlsFoto
} from "./activoUtils.js";

import {
    mostrarSkeletonFoto,
    ocultarSkeletonFoto,
    mostrarTituloFoto,
    mostrarEstadoFoto,
    limpiarFotoActivo,
    cargarImagen,
    actualizarInfoFoto
} from "./fotoActivo.js";
export function initFotoActivoSeleccionado() {

    const equipoSelect =
        document.getElementById("equipo");

    const plantaSelect =
        document.getElementById("planta");

    const areaSelect =
        document.getElementById("area");

    if (!equipoSelect || !plantaSelect) {
        return;
    }


    equipoSelect.addEventListener(
        "change",
        cargarFotoActivoSeleccionado
    );


    plantaSelect.addEventListener(
        "change",
        limpiarFotoActivo
    );


    areaSelect?.addEventListener(
        "change",
        limpiarFotoActivo
    );
}


async function cargarFotoActivoSeleccionado() {

    const equipoSelect =
        document.getElementById("equipo");

    const plantaSelect =
        document.getElementById("planta");

    const areaSelect =
        document.getElementById("area");


    const planta =
        plantaSelect?.value || "";

    const codigoEquipo =
        equipoSelect?.value || "";

    const nombreEquipo =
        equipoSelect
            ?.selectedOptions?.[0]
            ?.textContent
            ?.trim() || "";

    const area =
        areaSelect?.value || "";


    /* =================================================
       LIMPIAR FOTO ANTERIOR
       ================================================= */

    limpiarFotoActivo();


    if (!planta || !codigoEquipo) {
        return;
    }


    /* =================================================
       ACTUALIZAR INFORMACIÓN DE LA CARD
       ================================================= */

    actualizarInfoFoto(
        nombreEquipo,
        area,
        planta
    );


    /* =================================================
       MOSTRAR TÍTULO Y SKELETON
       ================================================= */

    mostrarTituloFoto();

    mostrarSkeletonFoto();


    try {

        /* =============================================
           OBTENER ACTIVOS
           ============================================= */

        const activos =
            await obtenerActivos();


        /* =============================================
           BUSCAR ACTIVO
           ============================================= */

        const activo =
            activos.find(item =>
                coincideActivo(
                    item,
                    planta,
                    codigoEquipo,
                    nombreEquipo
                )
            );


        /* =============================================
           ACTIVO NO ENCONTRADO
           ============================================= */

        if (!activo) {

            ocultarSkeletonFoto();

            mostrarEstadoFoto(
                "No hay foto asociada para este activo."
            );

            return;
        }


        /* =============================================
           OBTENER URL DE LA FOTO
           ============================================= */

        const {
            urlVista,
            urlImagen
        } = obtenerUrlsFoto(activo);


        /* =============================================
           FOTO NO DISPONIBLE
           ============================================= */

        if (!urlVista || !urlImagen) {

            ocultarSkeletonFoto();

            mostrarEstadoFoto(
                "El activo existe, pero no tiene foto guardada."
            );

            return;
        }


        /* =============================================
           CARGAR IMAGEN
           ============================================= */

        await cargarImagen(
            urlImagen,
            urlVista
        );


    } catch (error) {

        console.error(
            "Error cargando foto:",
            error
        );


        ocultarSkeletonFoto();


        mostrarEstadoFoto(
            "No se pudo cargar la foto."
        );
    }
}