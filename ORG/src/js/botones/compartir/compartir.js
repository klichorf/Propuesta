import { mostrarToast } from "../../toast.js";

import {
    mostrarLoadercompartir,
    ocultarLoadercompartir,
} from "../../services/onedrive/loader.js";


import { SharePointError } from "./../../botones/utils.js";
 "./utils.js";

import { limpiarFormulario } from "./../../botones/datosFormulario.js";

import {
    prepararDatosCompartir,
    construirRutaSharePoint,
    construirNombreArchivo,
} from "./prepararCompartir.js";

import {
    guardarCompartir,
    actualizarCompartir,
    eliminarCompartir,
} from "./firebaseCompartir.js";

import { prepararDocumento } from "./documentoCompartir.js";

import { subirDocumentoCompartir } from "./sharepointCompartir.js";

export function initCompartir(validarFormulario, generarPDF) {
    const btnCompartir = document.getElementById("btnCompartir");

    if (!btnCompartir) {
        console.error("❌ [COMPARTIR] No existe #btnCompartir");

        return;
    }

    btnCompartir.addEventListener("click", async () => {
        console.log("🟣 [COMPARTIR] Click en Compartir");

        // ------------------------------------------
        // VALIDACIÓN
        // ------------------------------------------

        if (!validarFormulario()) {
            console.log("🔴 [COMPARTIR] Formulario inválido");

            return;
        }

        // ------------------------------------------
        // PREPARAR INTERFAZ
        // ------------------------------------------

        btnCompartir.disabled = true;
        btnCompartir.textContent = "Compartiendo...";

        mostrarLoadercompartir();

        await new Promise((resolve) => requestAnimationFrame(resolve));

        const loaderTexto = document.getElementById("loaderProgress2");

        const fill = document.querySelector(".progressBar2-fill");

        let idMantenimiento = null;

        try {
            // --------------------------------------
            // 1. DATOS
            // --------------------------------------

            const { data } = prepararDatosCompartir();

            // --------------------------------------
            // 2. FIREBASE
            // --------------------------------------

            actualizarTexto(loaderTexto, "Guardando información...");

            idMantenimiento = await guardarCompartir(data);

            // --------------------------------------
            // 3. PDF
            // --------------------------------------

            actualizarTexto(loaderTexto, "Generando PDF...");

            const base64 = await prepararDocumento(generarPDF);

            // --------------------------------------
            // 4. RUTA Y NOMBRE
            // --------------------------------------

            const nombreArchivo = construirNombreArchivo(
                data.tipoMantenimiento,
                idMantenimiento,
            );

            const rutaCarpeta = construirRutaSharePoint(data);

            // --------------------------------------
            // 5. SHAREPOINT
            // --------------------------------------

            actualizarTexto(loaderTexto, "Subiendo a SharePoint...");

            const resultado = await subirDocumentoCompartir(
                nombreArchivo,
                rutaCarpeta,
                base64,
                (porcentaje) => actualizarProgreso(loaderTexto, fill, porcentaje),
            );

            // --------------------------------------
            // 6. FIREBASE FINAL
            // --------------------------------------

            actualizarTexto(loaderTexto, "Finalizando...");

            await actualizarCompartir(
                idMantenimiento,
                resultado,
                nombreArchivo,
                rutaCarpeta,
            );

            // --------------------------------------
            // 7. FINALIZAR
            // --------------------------------------

            if (fill) {
                fill.style.width = "100%";
            }

            actualizarTexto(loaderTexto, "Completado");

            console.log("🎉 [COMPARTIR] Proceso completado");

            await esperar(700);

            mostrarToast(
                `✅ Mantenimiento guardado correctamente · ID: ${idMantenimiento}`,
                "success",
            );

            limpiarFormulario();
        } catch (error) {
            await manejarError(error, idMantenimiento);
        } finally {
            btnCompartir.disabled = false;

            btnCompartir.textContent = "Compartir";

            ocultarLoadercompartir();
        }
    });
}

// ======================================================
// FUNCIONES AUXILIARES
// ======================================================

function actualizarTexto(elemento, texto) {
    if (elemento) {
        elemento.textContent = texto;
    }
}

function actualizarProgreso(loaderTexto, fill, porcentaje) {
    const progreso = Math.min(porcentaje, 99);

    console.log(`📊 [COMPARTIR] Progreso: ${progreso}%`);

    actualizarTexto(loaderTexto, `Subiendo a SharePoint: ${progreso}%`);

    if (fill) {
        fill.style.width = `${progreso}%`;
    }
}

function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function manejarError(error, idMantenimiento) {
    console.error("🔥 [COMPARTIR] Error:", error);

    if (error instanceof SharePointError && idMantenimiento) {
        await eliminarCompartir(idMantenimiento);

        mostrarToast(
            "❌ Falló la subida a SharePoint. Registro eliminado.",
            "danger",
        );

        return;
    }

    mostrarToast("❌ Error al guardar el mantenimiento", "danger");
}
