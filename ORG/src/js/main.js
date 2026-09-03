// ------------------------------------------------------
// MÓDULO PRINCIPAL: INICIALIZACIÓN
// ------------------------------------------------------

import { initFotos } from "./fotos.js";
import {
    initFirmas,
    actualizarTecnicoPorCorreo
} from "./firmas.js";

import { generarPDF } from "./pdf.js";
import { validarFormulario } from "./validación/validarFormulario.js";
import {
    iniciarValidacionTiempoReal
} from "./validación/validacionTiempoReal.js";
import { initSelects } from "./initSelects.js";
import { initTiempo } from "./tiempo.js";
import { cargarRepuestos } from "./repuestos.js";
import { initBuscadorRepuestos } from "./buscadorRepuestos.js";
import { initQRScanner } from "./qr.js";
import { toggleReportePlantas } from "./reporte/toggleReportePlantas.js";
import { initFiltrosReporte } from "./reporte/filtrosReporte.js";
import { initBotonGraficoPrincipal } from "./charts/botonGrafico.js";
import { initBotones } from "./botones/botones.js";
import { obtenerRegistros } from "./reporte/obtenerRegistros.js";
import { generarHojaDeVida } from "./lifesheet/generarHojaDeVida.js";
import { initFiltrosIntervenciones } from "./reporte/filtrosIntervenciones.js";
import {
    cambiarEstado,
    eliminarCronograma
} from "./cronograma/cronograma.js";
import {
    initCronograma,
    initEventosCronograma
} from "./cronograma/uiCronograma.js";
import { initCodigoActivo } from "./codigoActivo.js";
import {
    initFotoActivoSeleccionado
} from "./activos/fotoActivoUI.js";

import {
    abrirDetalleIntervencion
} from "./reporte/detalleIntervencion.js";


// ------------------------------------------------------
// CONTROL GLOBAL DE FOCO EN MODALES BOOTSTRAP
// ------------------------------------------------------

function configurarFocoModales() {

    document.querySelectorAll(".modal").forEach(modal => {

        // Evita registrar el evento más de una vez
        if (modal.dataset.focoConfigurado === "true") {
            return;
        }

        modal.dataset.focoConfigurado = "true";

        // --------------------------------------------------
        // ANTES DE OCULTAR EL MODAL
        // --------------------------------------------------

        modal.addEventListener("hide.bs.modal", () => {

            const elementoActivo = document.activeElement;

            // Si el elemento enfocado pertenece al modal,
            // quitamos el foco antes de que Bootstrap
            // coloque aria-hidden="true".

            if (
                elementoActivo &&
                modal.contains(elementoActivo)
            ) {
                elementoActivo.blur();
            }
        });
    });
}


// ------------------------------------------------------
// FUNCIONES DISPONIBLES DESDE HTML
// ------------------------------------------------------

window.iniciar = async (id) => {

    await cambiarEstado(id, "EN_PROCESO");
    await initCronograma();

};


window.finalizar = async (id) => {

    await cambiarEstado(id, "FINALIZADO");
    await initCronograma();

};


window.eliminarCrono = async (id) => {

    await eliminarCronograma(id);
    await initCronograma();

};


window.abrirDetalle = abrirDetalleIntervencion;


// ------------------------------------------------------
// HACER DISPONIBLE abrirHojaDeVida()
// PARA LOS BOTONES HTML
// ------------------------------------------------------

window.abrirHojaDeVida = async function (btn) {

    const planta = btn.dataset.planta;
    const area = btn.dataset.area;
    const equipo = btn.dataset.equipo;

    try {

        const registros = await obtenerRegistros();

        generarHojaDeVida(
            registros,
            planta,
            area,
            equipo
        );

    } catch (error) {

        console.error(
            "❌ Error al abrir hoja de vida:",
            error
        );
    }
};


// ------------------------------------------------------
// INICIALIZACIÓN DE LA APLICACIÓN
// ------------------------------------------------------

export async function inicializarAplicacion(correoUsuario = "") {

    console.log(
        "➡️ INICIANDO APLICACIÓN - Inicialización"
    );

    // --------------------------------------------------
    // CONFIGURAR FOCO DE LOS MODALES
    // --------------------------------------------------

    configurarFocoModales();


    // --------------------------------------------------
    // INICIALIZACIONES PRINCIPALES
    // --------------------------------------------------

    await Promise.all([

        initFotos(),

        initFirmas(correoUsuario),

        initSelects(),

        initTiempo(),

        cargarRepuestos(),

        initBuscadorRepuestos(),

        initQRScanner(),

        initBotones(
            validarFormulario,
            generarPDF
        ),

        initFiltrosReporte(),

        toggleReportePlantas(),

        initFiltrosIntervenciones(),

        initCronograma(),

        initEventosCronograma(),

        initCodigoActivo(),

        initFotoActivoSeleccionado()

    ]);


    iniciarValidacionTiempoReal();


    // --------------------------------------------------
    // GRÁFICO PRINCIPAL
    // --------------------------------------------------

    initBotonGraficoPrincipal();


    console.log(
        "✅ APLICACIÓN COMPLETAMENTE INICIALIZADA"
    );
}


// ------------------------------------------------------
// ACTUALIZAR TÉCNICO AL CAMBIAR DE CUENTA
// ------------------------------------------------------

export function actualizarTecnico(correoUsuario) {

    actualizarTecnicoPorCorreo(
        correoUsuario
    );

}
