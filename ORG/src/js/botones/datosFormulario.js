import { limpiarFirma } from "../firmas.js";
import { imagesData } from "../fotos.js";

export function obtenerDatosFormulario() {
  return {
    codigo: document.getElementById("codigo").value,
    planta: document.getElementById("planta").value.trim(),
    area: document.getElementById("area").value.trim(),
    equipo: document.getElementById("equipo").value.trim(),
    fechaInicio: document.getElementById("fechaInicio").value,
    fechaFin: document.getElementById("fechaFin").value,
    tipoMantenimiento: document.getElementById("tipoMantenimiento").value.trim(),
    ejecutor: document.getElementById("ejecutor").value,
    danos: document.getElementById("danos").value,
    trabajo: document.getElementById("trabajo").value,
    herramientas: document.getElementById("herramientas").value,
    repuestos: document.getElementById("repuestos").value,
    timestamp: new Date().toISOString()
  };
}

export function limpiarFormulario() {

    console.log("🧹 Limpiando formulario...");

    // =============================================
    // RESET GENERAL DEL FORMULARIO
    // =============================================

    const formulario =
        document.getElementById("formulario");

    if (formulario) {
        formulario.reset();
    }


    // =============================================
    // LIMPIAR PLANTA
    // =============================================

    const planta =
        document.getElementById("planta");

    if (planta) {
        planta.selectedIndex = 0;
    }


    // =============================================
    // LIMPIAR ÁREA
    // =============================================

    const area =
        document.getElementById("area");

    if (area) {
        area.selectedIndex = 0;
    }


    // =============================================
    // LIMPIAR EQUIPO
    // =============================================

    const equipo =
        document.getElementById("equipo");

    if (equipo) {
        equipo.selectedIndex = 0;
    }


    // =============================================
    // LIMPIAR FIRMAS
    // =============================================

    limpiarFirma("sigEjecutor");
    limpiarFirma("sigCoordinador");


    // =============================================
    // LIMPIAR FOTOS ADJUNTAS
    // =============================================

    imagesData.length = 0;

    const thumbs =
        document.getElementById("thumbs");

    if (thumbs) {
        thumbs.innerHTML = "";
    }


    // =============================================
    // LIMPIAR INPUTS DE ARCHIVOS
    // =============================================

    document
        .querySelectorAll(
            '#formulario input[type="file"]'
        )
        .forEach(input => {

            input.value = "";

        });


    // =============================================
    // LIMPIAR FOTO DEL ACTIVO
    // =============================================

    const vistaFotoActivo =
        document.getElementById(
            "vistaFotoActivo"
        );

    const imagenActivo =
        document.getElementById(
            "imagenActivoSeleccionado"
        );

    const skeletonFotoActivo =
        document.getElementById(
            "skeletonFotoActivo"
        );


    if (imagenActivo) {

        imagenActivo.src = "";

        imagenActivo.removeAttribute("src");

    }


    if (vistaFotoActivo) {

        vistaFotoActivo.classList.add("d-none");

    }


    if (skeletonFotoActivo) {

        skeletonFotoActivo.style.display = "none";

    }


    // =============================================
    // LIMPIAR TEXTO DEL ESTADO
    // =============================================

    const estadoFotoActivo =
        document.getElementById(
            "estadoFotoActivo"
        );

    if (estadoFotoActivo) {

        estadoFotoActivo.textContent =
            "FOTO DEL ACTIVO";

    }


    // =============================================
    // VOLVER ARRIBA
    // =============================================

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    console.log(
        "✅ Formulario completamente limpiado"
    );
}