// ------------------------------------------------------
// MÓDULO: GENERACIÓN DE PDF
//
// Características:
// - Salto automático de página para textos largos
// - Encabezado reutilizable
// - Pie de página reutilizable
// - Registro fotográfico en páginas independientes
// - Control de espacio para firmas
// - Nombre y cargo real de las personas que firman
// ------------------------------------------------------

import { imagesData } from "./fotos.js";
import { assetPaths } from "./config/assetPaths.js";
import { obtenerDatosFirmas } from "./firmas.js";

// ======================================================
// GENERAR PDF
// ======================================================

export async function generarPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        unit: "pt",
        format: "a4"
    });


    // ==================================================
    // DIMENSIONES
    // ==================================================

    const W =
        doc.internal.pageSize.getWidth();

    const H =
        doc.internal.pageSize.getHeight();

    const M = 50;


    // ==================================================
    // COLORES CORPORATIVOS
    // ==================================================

    const primary = [0, 70, 140];

    const accent = [200, 0, 0];

    const gray = [60, 60, 60];

    const lightGray = [220, 220, 220];


    // ==================================================
    // POSICIÓN VERTICAL
    // ==================================================

    let y = M;


    // ==================================================
    // CONFIGURACIÓN
    // ==================================================

    const HEADER_HEIGHT = 90;

    // Espacio reservado para las firmas
    const SIGNATURE_SPACE = 170;

    // Límite inferior normal del contenido
    const CONTENT_BOTTOM = H - 80;

    // Límite inferior cuando debemos reservar firmas
    const CONTENT_BOTTOM_WITH_SIGNATURES =
        H - SIGNATURE_SPACE;


    // ======================================================
    // ENCABEZADO
    // ======================================================

    async function addEncabezado() {

        const logo =
            await getBase64FromUrl(
                assetPaths.images.logo
            );

        const logoW = 60;


        // --------------------------------------------------
        // LOGO
        // --------------------------------------------------

        doc.addImage(
            logo,
            "PNG",
            M,
            M,
            logoW,
            40
        );


        // --------------------------------------------------
        // RECTÁNGULO ROJO
        // --------------------------------------------------

        doc.setFillColor(
            ...accent
        );

        doc.rect(
            M + logoW + 10,
            M,
            W - M * 2 - logoW - 10,
            40,
            "F"
        );


        // --------------------------------------------------
        // NOMBRE EMPRESA
        // --------------------------------------------------

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

        const nombreEmpresa =
            "ORGANIZACIÓN CÁRDENAS S.A.S";

        doc.text(
            nombreEmpresa,
            W / 2 + 20,
            M - 10,
            {
                align: "center"
            }
        );


        // --------------------------------------------------
        // INFORME TÉCNICO
        // --------------------------------------------------

        doc.setFont(
            "helvetica",
            "bold"
        );

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
                align: "center"
            }
        );


        // --------------------------------------------------
        // FRANJA BLANCA
        // --------------------------------------------------

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


        // --------------------------------------------------
        // MANTENIMIENTO
        // --------------------------------------------------

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
                align: "center"
            }
        );


        // --------------------------------------------------
        // CÓDIGO Y VERSIÓN
        // --------------------------------------------------

        doc.setFontSize(10);

        doc.setTextColor(
            255,
            255,
            255
        );

        doc.text(
            "Código: FO-1600-041",
            W - M - 100,
            M + 10
        );

        doc.text(
            "Versión: 01",
            W - M - 100,
            M + 22
        );
    }


    // ======================================================
    // PIE DE PÁGINA
    // ======================================================

    function addPie() {

        doc.setFont(
            "helvetica",
            "italic"
        );

        doc.setFontSize(9);

        doc.setTextColor(120);

        doc.text(
            "Código: FO-1600-041  |  Versión: 01",
            W / 2,
            H - 20,
            {
                align: "center"
            }
        );
    }


    // ======================================================
    // NUEVA PÁGINA DE CONTENIDO
    // ======================================================

    async function nuevaPaginaContenido(
        continuarTitulo = ""
    ) {

        // Pie de la página anterior
        addPie();

        // Nueva página
        doc.addPage();

        // Encabezado
        await addEncabezado();

        // Nueva posición inicial
        y =
            M +
            HEADER_HEIGHT;


        // --------------------------------------------------
        // TEXTO DE CONTINUACIÓN
        // --------------------------------------------------

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


    // ======================================================
    // ASEGURAR ESPACIO
    // ======================================================

    async function asegurarEspacio(
        alturaNecesaria,
        reservarFirmas = false
    ) {

        const limite =
            reservarFirmas
                ? CONTENT_BOTTOM_WITH_SIGNATURES
                : CONTENT_BOTTOM;


        if (
            y + alturaNecesaria >
            limite
        ) {

            await nuevaPaginaContenido();
        }
    }


    // ======================================================
    // AGREGAR SECCIÓN DE TEXTO
    // ======================================================

    async function addSec(
        titulo,
        txt
    ) {

        if (!txt) {
            return;
        }


        // --------------------------------------------------
        // CONFIGURACIÓN DEL TEXTO
        // --------------------------------------------------

        const lineHeight = 14;


        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(10);


        // --------------------------------------------------
        // DIVIDIR TEXTO EN LÍNEAS
        // --------------------------------------------------

        const lines =
            doc.splitTextToSize(
                String(txt),
                W - M * 2
            );


        // --------------------------------------------------
        // ESPACIO PARA EL TÍTULO
        // --------------------------------------------------

        await asegurarEspacio(
            45,
            true
        );


        // --------------------------------------------------
        // TÍTULO
        // --------------------------------------------------

        y += 10;

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


        // --------------------------------------------------
        // TEXTO
        // --------------------------------------------------

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(10);

        doc.setTextColor(
            ...gray
        );


        let index = 0;


        // --------------------------------------------------
        // PROCESAR LÍNEAS
        // --------------------------------------------------

        while (
            index <
            lines.length
        ) {

            const availableHeight =
                CONTENT_BOTTOM_WITH_SIGNATURES -
                y;


            const maxLines =
                Math.max(
                    1,
                    Math.floor(
                        availableHeight /
                        lineHeight
                    )
                );


            const chunk =
                lines.slice(
                    index,
                    index + maxLines
                );


            // ------------------------------------------------
            // DIBUJAR BLOQUE
            // ------------------------------------------------

            doc.text(
                chunk,
                M,
                y
            );


            y +=
                chunk.length *
                lineHeight;


            index +=
                chunk.length;


            // ------------------------------------------------
            // SI QUEDA TEXTO → NUEVA PÁGINA
            // ------------------------------------------------

            if (
                index <
                lines.length
            ) {

                await nuevaPaginaContenido(
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


        // --------------------------------------------------
        // SEPARADOR
        // --------------------------------------------------

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

        y += 15;
    }




    // ======================================================
    // INICIO DE LA PÁGINA PRINCIPAL
    // ======================================================

    await addEncabezado();

    y += HEADER_HEIGHT;


    // ======================================================
    // DATOS PRINCIPALES
    // ======================================================

    const campos = [

        [
            "Código",
            v("codigo")
        ],

        [
            "Planta",
            v("planta")
        ],

        [
            "Equipo",
            v("equipo")
        ],

        [
            "Fecha Inicio",
            fmtFecha(
                v("fechaInicio")
            )
        ],

        [
            "Fecha Fin",
            fmtFecha(
                v("fechaFin")
            )
        ],

        [
            "Mantenimiento",
            v("tipoMantenimiento")
        ],

        [
            "Técnico",
            v("ejecutor")
        ],

        [
            "Tiempo total",
            v("tiempo")
        ]

    ];


    // ======================================================
    // DIBUJAR DATOS
    // ======================================================

    doc.setFontSize(11);


    for (
        const [k, val]
        of campos
    ) {

        await asegurarEspacio(
            20,
            true
        );


        // --------------------------------------------------
        // NOMBRE DEL CAMPO
        // --------------------------------------------------

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setTextColor(
            ...primary
        );

        doc.text(
            `${k}:`,
            M,
            y
        );


        // --------------------------------------------------
        // VALOR
        // --------------------------------------------------

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setTextColor(
            ...gray
        );

        doc.text(
            String(
                val || "-"
            ),
            M + 130,
            y
        );


        y += 18;
    }


    // ======================================================
    // SEPARADOR
    // ======================================================

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

    y += 20;


    // ======================================================
    // SECCIONES
    // ======================================================

    await addSec(
        "Daños encontrados",
        v("danos")
    );

    await addSec(
        "Trabajo ejecutado",
        v("trabajo")
    );

    await addSec(
        "Repuestos utilizados / recomendados",
        v("repuestos")
    );

    await addSec(
        "Herramientas utilizadas",
        v("herramientas")
    );


    // ======================================================
    // DATOS DE FIRMAS
    // ======================================================
// ======================================================
// DATOS DE LAS PERSONAS QUE FIRMAN
// ======================================================

const datosFirmas =
    obtenerDatosFirmas() || {
        tecnico: {
            nombre: "",
            cargo: ""
        },
        operador: {
            nombre: "",
            cargo: ""
        }
    };


// ======================================================
// TÉCNICO
// ======================================================

const nombreEjecutor =
    datosFirmas.tecnico?.nombre ||
    v("ejecutor") ||
    "-";

const cargoEjecutor =
    datosFirmas.tecnico?.cargo ||
    "Técnico de Mantenimiento";


// ======================================================
// OPERADOR
// ======================================================

const nombreOperador =
    datosFirmas.operador?.nombre ||
    "-";

const cargoOperador =
    datosFirmas.operador?.cargo ||
    "Operador";

    // ======================================================
    // FIRMAS
    // ======================================================

    const sigEjecutor =
        document.getElementById(
            "sigEjecutor"
        );


    const sigCoordinador =
        document.getElementById(
            "sigCoordinador"
        );


    const se =
        sigEjecutor?.toDataURL();


    const sc =
        sigCoordinador?.toDataURL();


    const fw = 150;

    const fh = 70;


    // ------------------------------------------------------
    // COMPROBAR ESPACIO PARA LAS FIRMAS
    // ------------------------------------------------------

    if (
        y + SIGNATURE_SPACE >
        H
    ) {

        await nuevaPaginaContenido();
    }


    const fy =
        H - 150;


    // ======================================================
    // FIRMA DEL TÉCNICO
    // ======================================================

    if (se) {

        doc.addImage(
            se,
            "PNG",
            M,
            fy,
            fw,
            fh
        );
    }


    // ======================================================
    // FIRMA DEL OPERADOR
    // ======================================================

    if (sc) {

        doc.addImage(
            sc,
            "PNG",
            W - M - fw,
            fy,
            fw,
            fh
        );
    }


    // ======================================================
    // NOMBRES
    // ======================================================

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(10);

    doc.setTextColor(
        ...primary
    );


    // ------------------------------------------------------
    // NOMBRE DEL TÉCNICO
    // ------------------------------------------------------

    doc.text(
        nombreEjecutor,
        M + fw / 2,
        fy + fh + 18,
        {
            align: "center"
        }
    );


    // ------------------------------------------------------
    // NOMBRE DEL OPERADOR
    // ------------------------------------------------------

    doc.text(
        nombreOperador,
        W - M - fw / 2,
        fy + fh + 18,
        {
            align: "center"
        }
    );


    // ======================================================
    // CARGOS
    // ======================================================

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(9);

    doc.setTextColor(
        ...gray
    );


    // ------------------------------------------------------
    // CARGO DEL TÉCNICO
    // ------------------------------------------------------

    doc.text(
        cargoEjecutor,
        M + fw / 2,
        fy + fh + 32,
        {
            align: "center"
        }
    );


    // ------------------------------------------------------
    // CARGO DEL OPERADOR
    // ------------------------------------------------------

    doc.text(
        cargoOperador,
        W - M - fw / 2,
        fy + fh + 32,
        {
            align: "center"
        }
    );


    // ======================================================
    // PIE DE PÁGINA
    // ======================================================

    addPie();


    // ======================================================
    // REGISTRO FOTOGRÁFICO
    // ======================================================

    if (
        imagesData.length > 0
    ) {

        // --------------------------------------------------
        // NUEVA PÁGINA
        // --------------------------------------------------

        doc.addPage();

        await addEncabezado();

        y =
            M +
            HEADER_HEIGHT;


        // --------------------------------------------------
        // TÍTULO
        // --------------------------------------------------

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(12);

        doc.setTextColor(
            ...primary
        );

        doc.text(
            "Registro fotográfico",
            M,
            y
        );

        y += 25;


        // --------------------------------------------------
        // CONFIGURACIÓN DE FOTOS
        // --------------------------------------------------

        const size =
            (W - M * 3) / 2;

        const gap =
            M;

        let x =
            M;


        // --------------------------------------------------
        // DIBUJAR FOTOS
        // --------------------------------------------------

        for (
            const img
            of imagesData
        ) {

            // ----------------------------------------------
            // SIGUIENTE FILA
            // ----------------------------------------------

            if (
                x + size >
                W - M
            ) {

                x =
                    M;

                y +=
                    size +
                    gap;
            }


            // ----------------------------------------------
            // COMPROBAR ESPACIO
            // ----------------------------------------------

            if (
                y + size >
                H - 100
            ) {

                addPie();

                doc.addPage();

                await addEncabezado();

                y =
                    M +
                    HEADER_HEIGHT;

                x =
                    M;
            }


            // ----------------------------------------------
            // IMAGEN
            // ----------------------------------------------

            doc.addImage(
                img,
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


        // --------------------------------------------------
        // PIE DE PÁGINA
        // --------------------------------------------------

        addPie();
    }


    // ======================================================
    // EXPORTAR PDF
    // ======================================================

    const blob =
        doc.output("blob");


    return new File(
        [
            blob
        ],
        "informe.pdf",
        {
            type: "application/pdf"
        }
    );


    // ======================================================
    // OBTENER VALOR DEL FORMULARIO
    // ======================================================

    function v(id) {

        const el =
            document.getElementById(id);


        if (!el) {
            return "";
        }


        // --------------------------------------------------
        // SELECT
        // --------------------------------------------------

        if (
            el.tagName ===
            "SELECT"
        ) {

            return (
                el.selectedOptions[0]
                    ?.text ||
                ""
            );
        }


        // --------------------------------------------------
        // INPUT / TEXTAREA
        // --------------------------------------------------

        return el.value;
    }


    // ======================================================
    // FORMATO DE FECHA
    // ======================================================

    function fmtFecha(f) {

        return f
            ? new Date(f)
                .toLocaleString()
                .replace(",", "")
            : "";
    }
}


// ========================================================
// OBTENER LOGO COMO BASE64
// ========================================================

async function getBase64FromUrl(url) {

    const res =
        await fetch(url);


    if (!res.ok) {

        throw new Error(
            `No se pudo cargar el logo: ${res.status}`
        );
    }


    const blob =
        await res.blob();


    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onloadend =
                () =>
                    resolve(
                        reader.result
                    );


            reader.onerror =
                reject;


            reader.readAsDataURL(
                blob
            );
        }
    );
}