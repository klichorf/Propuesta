// ------------------------------------------------------
// MÓDULO: GENERACIÓN DE PDF
// ------------------------------------------------------

import { PDF_CONFIG } from "../pdf/pdfConfig.js";

import {
    crearLayout
} from "../pdf/pdfLayout.js";

import {
    crearContenidoPDF
} from "../pdf/pdfContenido.js";

import {
    agregarFirmas
} from "../pdf/pdfFirmas.js";

import {
    agregarRegistroFotografico
} from "../pdf/pdfFotos.js";


import {
    obtenerValor
} from "../pdf/pdfUtils.js";

// ======================================================
// GENERAR PDF
// ======================================================

export async function generarPDF() {

    const { jsPDF } =
        window.jspdf;

    if (!jsPDF) {

        throw new Error(
            "jsPDF no está disponible."
        );
    }

    const doc =
        new jsPDF({
            unit: "pt",
            format: "a4",
        });

    // ==================================================
    // LAYOUT
    // ==================================================

    const layout =
        crearLayout(doc);

    await layout.agregarEncabezado();

    layout.establecerY(
        PDF_CONFIG.margen +
        PDF_CONFIG.headerHeight
    );

    // ==================================================
    // CONTENIDO
    // ==================================================

    const contenido =
        crearContenidoPDF(
            doc,
            layout
        );

    await contenido.agregarDatosPrincipales();

    await contenido.agregarSeccion(
        "Daños encontrados",
        obtenerValor("danos")
    );

    await contenido.agregarSeccion(
        "Trabajo ejecutado",
        obtenerValor("trabajo")
    );

    await contenido.agregarSeccion(
        "Repuestos utilizados ",
        obtenerValor("repuestos")
    );

    await contenido.agregarSeccion(
        "Herramientas utilizadas",
        obtenerValor("herramientas")
    );

    // ==================================================
    // FIRMAS
    // ==================================================

    await agregarFirmas(
        doc,
        layout
    );

    layout.agregarPie();

    // ==================================================
    // FOTOS
    // ==================================================

    await agregarRegistroFotografico(
        doc,
        layout
    );

    // ==================================================
    // EXPORTAR
    // ==================================================

    const blob =
        doc.output("blob");

    return new File(
        [blob],
        "informe.pdf",
        {
            type: "application/pdf",
        }
    );
}