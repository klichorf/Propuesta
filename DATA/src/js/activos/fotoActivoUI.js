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
    cargarImagen
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

    const planta =
        document.getElementById("planta")?.value || "";

    const codigoEquipo =
        equipoSelect?.value || "";

    const nombreEquipo =
        equipoSelect
            ?.selectedOptions?.[0]
            ?.textContent || "";


    limpiarFotoActivo();


    if (!planta || !codigoEquipo) {
        return;
    }


    // Mostrar inmediatamente el título
    // y el skeleton

    mostrarTituloFoto();

    mostrarSkeletonFoto();


    try {

        const activos =
            await obtenerActivos();


        const activo =
            activos.find(item =>
                coincideActivo(
                    item,
                    planta,
                    codigoEquipo,
                    nombreEquipo
                )
            );


        if (!activo) {

            ocultarSkeletonFoto();

            mostrarEstadoFoto(
                "No hay foto asociada para este activo."
            );

            return;
        }


        const {
            urlVista,
            urlImagen
        } = obtenerUrlsFoto(activo);


        if (!urlVista || !urlImagen) {

            ocultarSkeletonFoto();

            mostrarEstadoFoto(
                "El activo existe, pero no tiene foto guardada."
            );

            return;
        }


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