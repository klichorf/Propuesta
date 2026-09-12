// ------------------------------------------------------
// FIRMAS DEL PDF
// ------------------------------------------------------

import {
    obtenerDatosFirmas
} from "../firmas/firmas.js";

import { PDF_CONFIG } from "./pdfConfig.js";

export async function agregarFirmas(
    doc,
    layout
) {

    const {
        W,
        H,
        M,
        nuevaPagina,
    } = layout;

    const datos =
        obtenerDatosFirmas() || {
            tecnico: {
                nombre: "",
                cargo: "",
            },

            operador: {
                nombre: "",
                cargo: "",
            },
        };

    const nombreTecnico =
        datos.tecnico?.nombre ||
        "-";

    const cargoTecnico =
        datos.tecnico?.cargo ||
        "Técnico de Mantenimiento";

    const nombreOperador =
        datos.operador?.nombre ||
        "-";

    const cargoOperador =
        datos.operador?.cargo ||
        "Operador";

    const canvasTecnico =
        document.getElementById(
            "sigEjecutor"
        );

    const canvasOperador =
        document.getElementById(
            "sigCoordinador"
        );

    const firmaTecnico =
        canvasTecnico?.toDataURL();

    const firmaOperador =
        canvasOperador?.toDataURL();

    const fw =
        PDF_CONFIG.firmas.width;

    const fh =
        PDF_CONFIG.firmas.height;

    const fy =
        H - 150;

    // ==================================================
    // FIRMAS
    // ==================================================

    if (firmaTecnico) {

        doc.addImage(
            firmaTecnico,
            "PNG",
            M,
            fy,
            fw,
            fh
        );
    }

    if (firmaOperador) {

        doc.addImage(
            firmaOperador,
            "PNG",
            W - M - fw,
            fy,
            fw,
            fh
        );
    }

    // ==================================================
    // NOMBRES
    // ==================================================

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(10);

    doc.setTextColor(
        ...PDF_CONFIG.colores.primary
    );

    doc.text(
        nombreTecnico,
        M + fw / 2,
        fy + fh + 18,
        {
            align: "center",
        }
    );

    doc.text(
        nombreOperador,
        W - M - fw / 2,
        fy + fh + 18,
        {
            align: "center",
        }
    );

    // ==================================================
    // CARGOS
    // ==================================================

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...PDF_CONFIG.colores.gray
    );

    doc.text(
        cargoTecnico,
        M + fw / 2,
        fy + fh + 32,
        {
            align: "center",
        }
    );

    doc.text(
        cargoOperador,
        W - M - fw / 2,
        fy + fh + 32,
        {
            align: "center",
        }
    );
}