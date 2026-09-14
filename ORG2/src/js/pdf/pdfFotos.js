// ------------------------------------------------------
// REGISTRO FOTOGRÁFICO
// ------------------------------------------------------

import { imagesData } from "../fotos.js";
import { PDF_CONFIG } from "./pdfConfig.js";

export async function agregarRegistroFotografico(
    doc,
    layout
) {

    if (
        !imagesData ||
        imagesData.length === 0
    ) {
        return;
    }

    const {
        W,
        H,
        M,
        agregarEncabezado,
        agregarPie,
    } = layout;

    doc.addPage();

    await agregarEncabezado();

    let y =
        M +
        PDF_CONFIG.headerHeight;

    // ==================================================
    // TÍTULO
    // ==================================================

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(12);

    doc.setTextColor(
        ...PDF_CONFIG.colores.primary
    );

    doc.text(
        "Registro fotográfico",
        M,
        y
    );

    y += 25;

    // ==================================================
    // CONFIGURACIÓN
    // ==================================================

    const size =
        (W - M * 3) / 2;

    const gap = M;

    let x = M;

    // ==================================================
    // FOTOS
    // ==================================================

    for (
        const imagen
        of imagesData
    ) {

        if (
            x + size >
            W - M
        ) {

            x = M;

            y +=
                size +
                gap;
        }

        if (
            y + size >
            H - 100
        ) {

            agregarPie();

            doc.addPage();

            await agregarEncabezado();

            y =
                M +
                PDF_CONFIG.headerHeight;

            x = M;
        }

        doc.addImage(
            imagen,
            "JPEG",
            x,
            y,
            size,
            size
        );

        x +=
            size +
            gap;
    }

    agregarPie();
}