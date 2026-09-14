import { obtenerActivos } from "./activosService.js";
import { coincideActivo, obtenerUrlsFoto } from "./activoUtils.js";
import {
    mostrarSkeletonFoto,
    ocultarSkeletonFoto,
    mostrarTituloFoto,
    mostrarEstadoFoto,
    limpiarFotoActivo,
    cargarImagen,
    actualizarInfoFoto
} from "./fotoActivo.js";

let listenerConfigurado = false;
let solicitudFoto = 0;

export function initFotoActivoSeleccionado() {
    if (listenerConfigurado) return;
    listenerConfigurado = true;

    window.addEventListener("activo:identificado", cargarFotoActivoSeleccionado);

    document.getElementById("planta")?.addEventListener("change", () => {
        // El cambio de planta invalida la foto anterior, pero no borra el informe.
        limpiarFotoActivo();
    });

    document.getElementById("area")?.addEventListener("change", () => {
        limpiarFotoActivo();
    });
}

async function cargarFotoActivoSeleccionado(event) {
    const solicitudActual = ++solicitudFoto;
    const plantaSelect = document.getElementById("planta");
    const areaSelect = document.getElementById("area");
    const equipoSelect = document.getElementById("equipo");

    const planta = event?.detail?.planta || plantaSelect?.value || "";
    const codigoEquipo = event?.detail?.codigo || equipoSelect?.value || "";
    const area = event?.detail?.area || areaSelect?.value || "";
    const nombreEquipo = equipoSelect?.selectedOptions?.[0]?.textContent?.trim() || "";

    if (!planta || !codigoEquipo) return;

    limpiarFotoActivo();
    actualizarInfoFoto(nombreEquipo, area, planta);
    mostrarTituloFoto();
    mostrarSkeletonFoto();

    try {
        const activos = await obtenerActivos();
        const activo = activos.find((item) => coincideActivo(item, planta, codigoEquipo, nombreEquipo));

        if (!activo) {
            ocultarSkeletonFoto();
            mostrarEstadoFoto("No hay información de foto asociada a este activo.");
            return;
        }

        if (solicitudActual !== solicitudFoto) return;

        const { urlVista, urlImagen } = obtenerUrlsFoto(activo);
        if (!urlVista || !urlImagen) {
            ocultarSkeletonFoto();
            mostrarEstadoFoto("El activo existe, pero no tiene foto guardada.");
            return;
        }

        await cargarImagen(urlImagen, urlVista);
    } catch (error) {
        console.error("❌ [FOTO ACTIVO] Error cargando foto:", error);
        ocultarSkeletonFoto();
        mostrarEstadoFoto("No se pudo cargar la foto del activo.");
    }
}
