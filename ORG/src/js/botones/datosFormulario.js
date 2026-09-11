import { limpiarOperador } from "../firmas.js";
import { imagesData } from "../fotos.js";


// ======================================================
// OBTENER DATOS DEL FORMULARIO
// ======================================================

export function obtenerDatosFormulario() {

    return {
        codigo:
            document.getElementById("codigo").value,

        planta:
            document.getElementById("planta").value.trim(),

        area:
            document.getElementById("area").value.trim(),

        equipo:
            document.getElementById("equipo").value.trim(),

        fechaInicio:
            document.getElementById("fechaInicio").value,

        fechaFin:
            document.getElementById("fechaFin").value,

        tipoMantenimiento:
            document
                .getElementById("tipoMantenimiento")
                .value
                .trim(),

        ejecutor:
            document.getElementById("ejecutor").value,

        danos:
            document.getElementById("danos").value,

        trabajo:
            document.getElementById("trabajo").value,

        repuestos:
            document.getElementById("repuestos").value,

        timestamp:
            new Date().toISOString()
    };
}


// ======================================================
// LIMPIAR FORMULARIO
// ======================================================

export function limpiarFormulario() {

    console.log("🧹 Limpiando formulario...");


    // ==================================================
    // 1. RESET GENERAL DEL FORMULARIO
    // ==================================================

    const formulario =
        document.getElementById("formulario");

    if (formulario) {
        formulario.reset();
    }


    // ==================================================
    // 2. LIMPIAR PLANTA
    // ==================================================

    const planta =
        document.getElementById("planta");

    if (planta) {
        planta.selectedIndex = 0;
    }


    // ==================================================
    // 3. LIMPIAR ÁREA
    // ==================================================

    const area =
        document.getElementById("area");

    if (area) {
        area.selectedIndex = 0;
    }


    // ==================================================
    // 4. LIMPIAR EQUIPO
    // ==================================================

    const equipo =
        document.getElementById("equipo");

    if (equipo) {
        equipo.selectedIndex = 0;
    }


    // ==================================================
    // 5. LIMPIAR OPERADOR
    //
    // IMPORTANTE:
    // - Elimina operador validado
    // - Limpia cédula
    // - Limpia contraseña
    // - Limpia nombre
    // - Limpia mensaje de validación
    // - Limpia firma del operador
    // - Bloquea nuevamente su firma
    //
    // NO toca la firma del técnico.
    // ==================================================

    limpiarOperador();


    // ==================================================
    // 6. FIRMA DEL TÉCNICO
    //
    // NO HACER:
    //
    // limpiarFirma("sigEjecutor");
    //
    // La firma del técnico pertenece al usuario
    // autenticado y debe permanecer disponible para
    // el siguiente mantenimiento.
    // ==================================================


    // ==================================================
    // 7. LIMPIAR FOTOS ADJUNTAS
    // ==================================================

    imagesData.length = 0;

    const thumbs =
        document.getElementById("thumbs");

    if (thumbs) {
        thumbs.innerHTML = "";
    }


    // ==================================================
    // 8. LIMPIAR INPUTS DE ARCHIVOS
    // ==================================================

    document
        .querySelectorAll(
            '#formulario input[type="file"]'
        )
        .forEach(input => {

            input.value = "";

        });


    // ==================================================
    // 9. LIMPIAR FOTO DEL ACTIVO
    // ==================================================

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

        imagenActivo.onload = null;
        imagenActivo.onerror = null;

        imagenActivo.removeAttribute("src");

        imagenActivo.classList.add("d-none");
    }


    if (vistaFotoActivo) {

        vistaFotoActivo.classList.add("d-none");

    }


    if (skeletonFotoActivo) {

        skeletonFotoActivo.classList.add("d-none");

    }


    // ==================================================
    // 10. LIMPIAR TEXTO DEL ESTADO DE FOTO
    // ==================================================

    const estadoFotoActivo =
        document.getElementById(
            "estadoFotoActivo"
        );

    if (estadoFotoActivo) {

        estadoFotoActivo.textContent =
            "FOTO DEL ACTIVO";

    }


    // ==================================================
    // 11. LIMPIAR INFORMACIÓN DE LA FOTO
    // ==================================================

    const infoEquipo =
        document.getElementById(
            "infoEquipoFoto"
        );

    const infoUbicacion =
        document.getElementById(
            "infoUbicacionFoto"
        );

    if (infoEquipo) {

        infoEquipo.textContent =
            "Equipo seleccionado";

    }

    if (infoUbicacion) {

        infoUbicacion.textContent =
            "Activo de mantenimiento";

    }


    // ==================================================
    // 12. LIMPIAR ENLACE DE FOTO
    // ==================================================

    const linkFotoActivo =
        document.getElementById(
            "linkFotoActivo"
        );

    if (linkFotoActivo) {

        linkFotoActivo.removeAttribute("href");

        linkFotoActivo.classList.add("d-none");

    }


    // ==================================================
    // 13. VOLVER ARRIBA
    // ==================================================

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    console.log(
        "✅ Formulario completamente limpiado"
    );

    console.log(
        "✍️ Firma del técnico conservada"
    );

    console.log(
        "🔒 Operador y validación limpiados"
    );
}