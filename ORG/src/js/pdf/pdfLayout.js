// ------------------------------------------------------
// LAYOUT DEL PDF
// ------------------------------------------------------

import { PDF_CONFIG } from "./pdfConfig.js";

import {
    obtenerBase64DesdeUrl
} from "./pdfUtils.js";

import {
    assetPaths
} from "../config/assetPaths.js";


// ======================================================
// CREAR LAYOUT
// ======================================================

export function crearLayout(doc) {

    const W =
        doc.internal.pageSize.getWidth();

    const H =
        doc.internal.pageSize.getHeight();

    const M =
        PDF_CONFIG.margen;

    let y = M;


    // ==================================================
    // ENCABEZADO
    // ==================================================

    async function agregarEncabezado() {

        // ------------------------------------------------
        // LOGO
        // ------------------------------------------------

        const logo =
            await obtenerBase64DesdeUrl(
                assetPaths.images.logo
            );

        const logoW = 60;

        doc.addImage(
            logo,
            "PNG",
            M,
            M,
            logoW,
            40
        );


        // ------------------------------------------------
        // FRANJA ROJA
        // ------------------------------------------------

        doc.setFillColor(
            ...PDF_CONFIG.colores.accent
        );

        doc.rect(
            M + logoW + 10,
            M,
            W - M * 2 - logoW - 10,
            40,
            "F"
        );


        // ------------------------------------------------
        // EMPRESA
        // ------------------------------------------------

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(16);

        doc.setTextColor(
            30,
            30,
            30
        );

        doc.text(
            "ORGANIZACIÓN CÁRDENAS S.A.S",
            W / 2 + 20,
            M - 10,
            {
                align: "center",
            }
        );


        // ------------------------------------------------
        // INFORME
        // ------------------------------------------------

        doc.setFontSize(13);

        doc.setTextColor(
            255,
            255,
            255
        );

        doc.text(
            "INFORME TÉCNICO",
            W / 2 + 20,
            M + 20,
            {
                align: "center",
            }
        );


        // ------------------------------------------------
        // FRANJA BLANCA
        // ------------------------------------------------

        doc.setFillColor(
            255,
            255,
            255
        );

        doc.rect(
            M + logoW + 10,
            M + 30,
            W - M * 2 - logoW - 10,
            20,
            "F"
        );


        // ------------------------------------------------
        // TÍTULO MANTENIMIENTO
        // ------------------------------------------------

        doc.setTextColor(
            0,
            0,
            0
        );

        doc.setFontSize(12);

        doc.text(
            "MANTENIMIENTO",
            W / 2 + 20,
            M + 45,
            {
                align: "center",
            }
        );


        // ------------------------------------------------
        // CÓDIGO
        // ------------------------------------------------

        doc.setFontSize(10);

        doc.setTextColor(
            255,
            255,
            255
        );

        doc.text(
            `Código: ${PDF_CONFIG.codigo}`,
            W - M - 100,
            M + 10
        );

        doc.text(
            `Versión: ${PDF_CONFIG.version}`,
            W - M - 100,
            M + 22
        );
    }


    // ==================================================
    // PIE
    // ==================================================

    function agregarPie() {

        doc.setFont(
            "helvetica",
            "italic"
        );

        doc.setFontSize(9);

        doc.setTextColor(120);

        doc.text(
            `Código: ${PDF_CONFIG.codigo}  |  Versión: ${PDF_CONFIG.version}`,
            W / 2,
            H - 20,
            {
                align: "center",
            }
        );
    }


    // ==================================================
    // NUEVA PÁGINA
    // ==================================================

    async function nuevaPagina(
        continuarTitulo = ""
    ) {

        agregarPie();

        doc.addPage();

        await agregarEncabezado();

        y =
            M +
            PDF_CONFIG.headerHeight;


        // ------------------------------------------------
        // TEXTO DE CONTINUACIÓN
        // ------------------------------------------------

        if (continuarTitulo) {

            doc.setFont(
                "helvetica",
                "italic"
            );

            doc.setFontSize(9);

            doc.setTextColor(
                100,
                100,
                100
            );

            doc.text(
                `Continuación: ${continuarTitulo}`,
                M,
                y
            );

            y += 18;
        }
    }


    // ==================================================
    // GETTERS / SETTERS
    // ==================================================

    function obtenerY() {
        return y;
    }


    function establecerY(valor) {
        y = valor;
    }


    // ==================================================
    // API DEL LAYOUT
    // ==================================================

    return {

        W,
        H,
        M,

        agregarEncabezado,
        agregarPie,
        nuevaPagina,

        obtenerY,
        establecerY,

    };
}