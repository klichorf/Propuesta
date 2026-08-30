// ------------------------------------------------------
// GESTIÓN DE FIRMAS (EJECUTOR Y SUPERVISOR)
// ------------------------------------------------------

import {
    firmasPersonas,
    supervisores
} from "./selects.js";

let sigEjecutorData = null;
let sigCoordinadorData = null;


// ------------------------------------------------------
// USUARIOS AUTORIZADOS COMO TÉCNICOS
// ------------------------------------------------------

const tecnicosPorCorreo = {

    "klichorf123@hotmail.com":
        "JORGE LEONARDO RODRIGUEZ",

    "klichorf123@gmail.com":
        "PINEDA AGUDELO YONATAN STIVEN",

    // "correo.quevedo@empresa.com":
    //     "QUEVEDO LADINO MARIO",

};

const firmasBaseUrl =
    new URL(
        "../assets/firmas/",
        import.meta.url
    ).href;


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ------------------------------------------------------

export function initFirmas(correoUsuario = "") {

    // Inicializar las dos firmas
    initFirma("sigEjecutor");
    initFirma("sigCoordinador");


    // --------------------------------------------------
    // BOTÓN LIMPIAR FIRMA - EJECUTOR
    // --------------------------------------------------

    const btnEjecutor =
        document
            .querySelector("#sigEjecutor")
            ?.parentElement
            .querySelector(".signature-tools button");


    // --------------------------------------------------
    // BOTÓN LIMPIAR FIRMA - SUPERVISOR
    // --------------------------------------------------

    const btnCoordinador =
        document
            .querySelector("#sigCoordinador")
            ?.parentElement
            .querySelector(".signature-tools button");


    if (btnEjecutor) {

        btnEjecutor.addEventListener(
            "click",
            () => limpiarFirma("sigEjecutor")
        );

    }


    if (btnCoordinador) {

        btnCoordinador.addEventListener(
            "click",
            () => limpiarFirma("sigCoordinador")
        );

    }


    // --------------------------------------------------
    // CARGAR FIRMA DEL TÉCNICO
    // --------------------------------------------------

    const ejecutorSelect =
        document.getElementById("ejecutor");


    ejecutorSelect?.addEventListener(
        "change",
        () => {

            cargarFirmaPersona(
                ejecutorSelect.value,
                "sigEjecutor"
            );

        }
    );


    // --------------------------------------------------
    // CARGAR FIRMA DEL SUPERVISOR
    // --------------------------------------------------

    const plantaSelect =
        document.getElementById("planta");


    plantaSelect?.addEventListener(
        "change",
        () => {

            const supervisor =
                supervisores[
                    plantaSelect.value
                ] || "";

            cargarFirmaPersona(
                supervisor,
                "sigCoordinador"
            );

        }
    );


    // ==================================================
    // 🔐 IDENTIFICAR TÉCNICO SEGÚN USUARIO LOGUEADO
    // ==================================================

    if (correoUsuario) {

        const correoNormalizado =
            correoUsuario
                .trim()
                .toLowerCase();


        const tecnico =
            tecnicosPorCorreo[
                correoNormalizado
            ];


        if (tecnico) {

            console.log(
                "👤 Técnico identificado:",
                tecnico
            );


            if (ejecutorSelect) {

                // Seleccionar automáticamente
                ejecutorSelect.value = tecnico;


                // Cargar firma automáticamente
                cargarFirmaPersona(
                    tecnico,
                    "sigEjecutor"
                );


                // Impedir cambiar el técnico
                ejecutorSelect.disabled = true;

            }

        } else {

            console.warn(
                "⚠️ No existe un técnico asociado al correo:",
                correoUsuario
            );


            if (ejecutorSelect) {

                ejecutorSelect.value = "";
                ejecutorSelect.disabled = true;

            }


            limpiarFirma("sigEjecutor");

        }

    }

}


// ------------------------------------------------------
// ACTUALIZAR TÉCNICO SEGÚN USUARIO LOGUEADO
// ------------------------------------------------------

export function actualizarTecnicoPorCorreo(correoUsuario = "") {

    const ejecutorSelect =
        document.getElementById("ejecutor");

    if (!ejecutorSelect) {
        console.warn(
            "⚠️ No se encontró el selector #ejecutor"
        );
        return;
    }

    const correoNormalizado =
        correoUsuario
            .trim()
            .toLowerCase();

    const tecnico =
        tecnicosPorCorreo[
            correoNormalizado
        ];

    if (tecnico) {

        console.log(
            "👤 Técnico actualizado:",
            tecnico
        );

        // Seleccionar técnico correspondiente
        ejecutorSelect.value = tecnico;

        // Cargar su firma
        cargarFirmaPersona(
            tecnico,
            "sigEjecutor"
        );

        // Bloquear selección manual
        ejecutorSelect.disabled = true;

    } else {

        console.warn(
            "⚠️ No existe técnico asociado al correo:",
            correoUsuario
        );

        ejecutorSelect.value = "";

        ejecutorSelect.disabled = true;

        limpiarFirma("sigEjecutor");

    }

}




// ------------------------------------------------------
// FUNCIÓN PARA CREAR UNA FIRMA EN UN CANVAS
// ------------------------------------------------------

function initFirma(id) {

    const c =
        document.getElementById(id);


    if (!c) return;


    const rect =
        c.getBoundingClientRect();


    c.width =
        rect.width;


    c.height =
        rect.height;


    const ctx =
        c.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );


    ctx.fillStyle =
        "#fff";


    ctx.fillRect(
        0,
        0,
        c.width,
        c.height
    );


    let dibujando = false;

    let lx;
    let ly;


    function pos(e) {

        const r =
            c.getBoundingClientRect();


        const scaleX =
            c.width / r.width;


        const scaleY =
            c.height / r.height;


        const x =
            (
                e.touches
                    ? e.touches[0].clientX
                    : e.clientX
            ) - r.left;


        const y =
            (
                e.touches
                    ? e.touches[0].clientY
                    : e.clientY
            ) - r.top;


        return {
            x: x * scaleX,
            y: y * scaleY
        };
    }


    c.addEventListener(
        "pointerdown",
        (e) => {

            dibujando = true;


            ({
                x: lx,
                y: ly
            } = pos(e));

        }
    );


    c.addEventListener(
        "pointermove",
        (e) => {

            if (!dibujando) return;


            const {
                x,
                y
            } = pos(e);


            ctx.beginPath();

            ctx.moveTo(
                lx,
                ly
            );


            ctx.lineTo(
                x,
                y
            );


            ctx.strokeStyle =
                "#000";


            ctx.lineWidth =
                2;


            ctx.stroke();


            lx = x;
            ly = y;

        }
    );


    window.addEventListener(
        "pointerup",
        () => {

            dibujando = false;

        }
    );
}


// ------------------------------------------------------
// CARGAR FIRMA AUTOMÁTICA
// ------------------------------------------------------

function cargarFirmaPersona(
    nombrePersona,
    idCanvas
) {

    const nombreNormalizado =
        normalizarNombre(
            nombrePersona
        );


    const archivoFirma =
        firmasPersonas[
            nombreNormalizado
        ];


    if (!archivoFirma) {

        limpiarFirma(idCanvas);

        return;
    }


    dibujarFirmaDesdeUrl(
        `${firmasBaseUrl}${archivoFirma}`,
        idCanvas,
        archivoFirma
    );
}


// ------------------------------------------------------
// DIBUJAR FIRMA DESDE URL
// ------------------------------------------------------

function dibujarFirmaDesdeUrl(
    url,
    idCanvas,
    nombreArchivo
) {

    const c =
        document.getElementById(
            idCanvas
        );


    if (!c) return;


    const img =
        new Image();


    img.onload = () => {

        dibujarImagenEnCanvas(
            c,
            img
        );


        c.classList.remove(
            "border-danger"
        );

    };


    img.onerror = () => {

        limpiarFirma(
            idCanvas
        );

    };


    img.src =
        url;
}


// ------------------------------------------------------
// DIBUJAR IMAGEN EN CANVAS
// ------------------------------------------------------

function dibujarImagenEnCanvas(
    c,
    img
) {

    const ctx =
        c.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );


    ctx.clearRect(
        0,
        0,
        c.width,
        c.height
    );


    ctx.fillStyle =
        "#fff";


    ctx.fillRect(
        0,
        0,
        c.width,
        c.height
    );


    const margen = 12;


    const maxW =
        c.width -
        margen * 2;


    const maxH =
        c.height -
        margen * 2;


    const escala =
        Math.min(
            maxW / img.width,
            maxH / img.height
        );


    const ancho =
        img.width * escala;


    const alto =
        img.height * escala;


    const x =
        (c.width - ancho) / 2;


    const y =
        (c.height - alto) / 2;


    ctx.drawImage(
        img,
        x,
        y,
        ancho,
        alto
    );
}


// ------------------------------------------------------
// NORMALIZAR NOMBRE
// ------------------------------------------------------

function normalizarNombre(
    nombrePersona = ""
) {

    return nombrePersona
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();
}


// ------------------------------------------------------
// LIMPIAR FIRMA
// ------------------------------------------------------

export function limpiarFirma(id) {

    const c =
        document.getElementById(id);


    if (!c) return;


    const ctx =
        c.getContext("2d");


    ctx.clearRect(
        0,
        0,
        c.width,
        c.height
    );


    ctx.fillStyle =
        "#fff";


    ctx.fillRect(
        0,
        0,
        c.width,
        c.height
    );


    if (
        id === "sigEjecutor"
    ) {

        sigEjecutorData =
            null;
    }


    if (
        id === "sigCoordinador"
    ) {

        sigCoordinadorData =
            null;
    }
}


// ------------------------------------------------------
// EXPORTAR FIRMAS
// ------------------------------------------------------

export {
    sigEjecutorData,
    sigCoordinadorData
};