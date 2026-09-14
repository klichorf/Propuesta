// ------------------------------------------------------
// CONTENIDO DEL PDF
// ------------------------------------------------------

import { PDF_CONFIG } from "./pdfConfig.js";
import { obtenerValor, formatearFecha } from "./pdfUtils.js";

export function crearContenidoPDF(
    doc,
    layout
) {

    const {
        W,
        H,
        M,
        nuevaPagina,
        obtenerY,
        establecerY,
    } = layout;

    const {
        primary,
        gray,
        lightGray,
    } = PDF_CONFIG.colores;

    const limiteContenido =
        H - 80;

    const limiteFirmas =
        H - PDF_CONFIG.signatureSpace;

    // ==================================================
    // ASEGURAR ESPACIO
    // ==================================================

    async function asegurarEspacio(
        altura,
        reservarFirmas = false
    ) {

        const limite =
            reservarFirmas
                ? limiteFirmas
                : limiteContenido;

        if (
            obtenerY() + altura >
            limite
        ) {

            await nuevaPagina();
        }
    }

    // ==================================================
    // DATOS PRINCIPALES
    // ==================================================

    async function agregarDatosPrincipales() {

        const campos = [

            [
                "Código",
                obtenerValor("codigo"),
            ],

            [
                "Planta",
                obtenerValor("planta"),
            ],

            [
                "Equipo",
                obtenerValor("equipo"),
            ],

            [
                "Fecha Inicio",
                formatearFecha(
                    obtenerValor("fechaInicio")
                ),
            ],

            [
                "Fecha Fin",
                formatearFecha(
                    obtenerValor("fechaFin")
                ),
            ],

            [
                "Mantenimiento",
                obtenerValor("tipoMantenimiento"),
            ],

            [
                "Técnico",
                obtenerValor("ejecutor"),
            ],

            [
                "Tiempo total",
                obtenerValor("tiempo"),
            ],
        ];

        doc.setFontSize(11);

        for (const [campo, valor] of campos) {

            await asegurarEspacio(
                20,
                true
            );

            let y =
                obtenerY();

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.setTextColor(
                ...primary
            );

            doc.text(
                `${campo}:`,
                M,
                y
            );

            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.setTextColor(
                ...gray
            );

            doc.text(
                String(valor || "-"),
                M + 130,
                y
            );

            establecerY(
                y + 18
            );
        }

        let y =
            obtenerY();

        y += 10;

        doc.setDrawColor(
            ...lightGray
        );

        doc.line(
            M,
            y,
            W - M,
            y
        );

        establecerY(
            y + 20
        );
    }

    // ==================================================
    // SECCIÓN DE TEXTO
    // ==================================================

    async function agregarSeccion(
        titulo,
        texto
    ) {

        if (!texto) {
            return;
        }

        const lineHeight = 14;

        const lineas =
            doc.splitTextToSize(
                String(texto),
                W - M * 2
            );

        await asegurarEspacio(
            45,
            true
        );

        let y =
            obtenerY() + 10;

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(11);

        doc.setTextColor(
            ...primary
        );

        doc.text(
            titulo,
            M,
            y
        );

        y += 20;

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(10);

        doc.setTextColor(
            ...gray
        );

        establecerY(y);

        let index = 0;

        while (
            index < lineas.length
        ) {

            const disponible =
                limiteFirmas -
                obtenerY();

            const maxLineas =
                Math.max(
                    1,
                    Math.floor(
                        disponible /
                        lineHeight
                    )
                );

            const bloque =
                lineas.slice(
                    index,
                    index + maxLineas
                );

            doc.text(
                bloque,
                M,
                obtenerY()
            );

            establecerY(
                obtenerY() +
                bloque.length *
                lineHeight
            );

            index += bloque.length;

            if (
                index < lineas.length
            ) {

                await nuevaPagina(
                    titulo
                );

                doc.setFont(
                    "helvetica",
                    "normal"
                );

                doc.setFontSize(10);

                doc.setTextColor(
                    ...gray
                );
            }
        }

        establecerY(
            obtenerY() + 25
        );
    }

    return {
        agregarDatosPrincipales,
        agregarSeccion,
    };
}