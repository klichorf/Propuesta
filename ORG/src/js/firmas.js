// ------------------------------------------------------
// GESTIÓN DE FIRMAS
// TÉCNICO + OPERADOR QUE RECIBE
// ------------------------------------------------------

import {
    firmasPersonas,
    supervisores
} from "./selects.js";

import {
    validarOperador
} from "./services/firebase/operadores.js";

import {
    obtenerNombreTecnico
} from "./services/firebase/tecnicos.js";

import {
    auth
} from "./services/firebase/auth.js";


// ======================================================
// VARIABLES
// ======================================================

let sigEjecutorData = null;
let sigCoordinadorData = null;

let operadorValidado = null;


const firmasBaseUrl =
    new URL(
        "../assets/firmas/",
        import.meta.url
    ).href;


// ======================================================
// INICIALIZACIÓN
// ======================================================

export function initFirmas() {

    console.log(
        "✍️ Inicializando gestión de firmas..."
    );


    // --------------------------------------------------
    // FIRMA TÉCNICO
    // --------------------------------------------------

    initFirma(
        "sigEjecutor"
    );


    // --------------------------------------------------
    // FIRMA OPERADOR
    // --------------------------------------------------

    initFirma(
        "sigCoordinador"
    );


    // El canvas del operador comienza bloqueado

    bloquearFirmaOperador();


    // --------------------------------------------------
    // BOTÓN LIMPIAR FIRMA TÉCNICO
    // --------------------------------------------------

    const btnEjecutor =
        document
            .querySelector(
                "#sigEjecutor"
            )
            ?.parentElement
            .querySelector(
                ".signature-tools button"
            );


    if (btnEjecutor) {

        btnEjecutor.addEventListener(
            "click",
            () =>
                limpiarFirma(
                    "sigEjecutor"
                )
        );

    }


    // --------------------------------------------------
    // BOTÓN LIMPIAR FIRMA OPERADOR
    // --------------------------------------------------

    const btnCoordinador =
        document.getElementById(
            "btnLimpiarFirmaCoordinador"
        );


    if (btnCoordinador) {

        btnCoordinador.addEventListener(
            "click",
            () =>
                limpiarFirma(
                    "sigCoordinador"
                )
        );

    }


    // --------------------------------------------------
    // TÉCNICO AUTOMÁTICO
    // --------------------------------------------------

    cargarTecnicoActual();


    // --------------------------------------------------
    // VALIDACIÓN DEL OPERADOR
    // --------------------------------------------------

    const btnValidarOperador =
        document.getElementById(
            "btnValidarOperador"
        );


    if (btnValidarOperador) {

        btnValidarOperador.addEventListener(
            "click",
            validarOperadorDesdeFormulario
        );

    }


    // --------------------------------------------------
    // MOSTRAR / OCULTAR CONTRASEÑA
    // --------------------------------------------------

    const btnMostrarPassword =
        document.getElementById(
            "btnMostrarPasswordOperador"
        );


    if (btnMostrarPassword) {

        btnMostrarPassword.addEventListener(
            "click",
            alternarPasswordOperador
        );

    }


    console.log(
        "✅ Gestión de firmas inicializada"
    );

}


// ======================================================
// TÉCNICO ACTUAL
// ======================================================

function cargarTecnicoActual() {

    const user =
        auth.currentUser;


    if (!user) {

        console.warn(
            "⚠️ No existe usuario autenticado"
        );

        return;

    }


    const correo =
        user.email
            ?.trim()
            .toLowerCase();


    // ----------------------------------------------
    // OBTENER TÉCNICO
    // ----------------------------------------------

    const nombreTecnico =
        obtenerNombreTecnico(
            correo
        );

    if (!nombreTecnico) {

        console.warn(
            "⚠️ No existe técnico asociado al correo:",
            correo
        );

        return;

    }


    console.log(
        "👤 Técnico identificado:",
        nombreTecnico
    );


    const nombreTecnicoFirma =
    document.getElementById("nombreTecnicoFirma");

if (nombreTecnicoFirma) {
    nombreTecnicoFirma.textContent =
        nombreTecnico;
}


    const ejecutorSelect =
        document.getElementById(
            "ejecutor"
        );


    if (ejecutorSelect) {

        ejecutorSelect.value =
            nombreTecnico;
                    ejecutorSelect.disabled = true;


    }


    cargarFirmaPersona(
        nombreTecnico,
        "sigEjecutor"
    );

}


// ======================================================
// VALIDAR OPERADOR DESDE FORMULARIO
// ======================================================

async function validarOperadorDesdeFormulario() {

    const cedulaInput =
        document.getElementById(
            "cedulaOperador"
        );


    const passwordInput =
        document.getElementById(
            "passwordOperador"
        );


    const btn =
        document.getElementById(
            "btnValidarOperador"
        );


    const estado =
        document.getElementById(
            "estadoOperador"
        );


    const nombre =
        document.getElementById(
            "nombreOperador"
        );


    if (
        !cedulaInput ||
        !passwordInput
    ) {

        return;

    }


    const cedula =
        cedulaInput.value.trim();


    const password =
        passwordInput.value;


    // ----------------------------------------------
    // VALIDACIÓN BÁSICA
    // ----------------------------------------------

    if (
        !cedula ||
        !password
    ) {

        mostrarEstadoOperador(
            "Digite la cédula y la contraseña.",
            "danger"
        );

        bloquearFirmaOperador();

        return;

    }


    // ----------------------------------------------
    // DESHABILITAR BOTÓN
    // ----------------------------------------------

    if (btn) {

        btn.disabled = true;

        btn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Validando...
        `;

    }


    try {

        const operador =
            await validarOperador(
                cedula,
                password
            );


        // ------------------------------------------
        // OPERADOR NO VALIDADO
        // ------------------------------------------

        if (!operador) {

            operadorValidado =
                null;


            nombre.textContent =
                "";


            limpiarFirma(
                "sigCoordinador"
            );


            bloquearFirmaOperador();


            mostrarEstadoOperador(
                "Cédula o contraseña incorrecta.",
                "danger"
            );


            return;

        }


        // ------------------------------------------
        // OPERADOR VALIDADO
        // ------------------------------------------

        operadorValidado =
            operador;


        console.log(
            "✅ Operador autorizado:",
            operador.nombre
        );


        // Mostrar nombre

        if (nombre) {

            nombre.textContent =
               operador.nombre;

        }


        mostrarEstadoOperador(
            "Operador validado correctamente.",
            "success"
        );


        // ------------------------------------------
        // CARGAR FIRMA
        // ------------------------------------------

        cargarFirmaPersona(
            operador.nombre,
            "sigCoordinador"
        );


        // ------------------------------------------
        // DESBLOQUEAR CANVAS
        // ------------------------------------------

        desbloquearFirmaOperador();


        // ------------------------------------------
        // LIMPIAR CONTRASEÑA
        // ------------------------------------------

        passwordInput.value =
            "";


    } catch (error) {

        console.error(
            "❌ Error validando operador:",
            error
        );


        operadorValidado =
            null;


        bloquearFirmaOperador();


        mostrarEstadoOperador(
            "No fue posible validar el operador.",
            "danger"
        );


    } finally {

        if (btn) {

            btn.disabled = false;

            btn.innerHTML = `
                <i class="bi bi-fingerprint fs-1"></i>
            
            `;

        }

    }

}


// ======================================================
// MOSTRAR / OCULTAR PASSWORD
// ======================================================

function alternarPasswordOperador() {

    const input =
        document.getElementById(
            "passwordOperador"
        );


    const button =
        document.getElementById(
            "btnMostrarPasswordOperador"
        );


    if (!input || !button) {

        return;

    }


    const icon =
        button.querySelector(
            "i"
        );


    if (
        input.type === "password"
    ) {

        input.type =
            "text";


        if (icon) {

            icon.className =
                "bi bi-eye-slash";

        }

    } else {

        input.type =
            "password";


        if (icon) {

            icon.className =
                "bi bi-eye";

        }

    }

}


// ======================================================
// BLOQUEAR FIRMA OPERADOR
// ======================================================

function bloquearFirmaOperador() {

    const canvas =
        document.getElementById(
            "sigCoordinador"
        );


    const btnLimpiar =
        document.getElementById(
            "btnLimpiarFirmaCoordinador"
        );


    if (canvas) {

        canvas.style.pointerEvents =
            "none";

        canvas.style.opacity =
            "0.55";

        canvas.classList.add(
            "firma-bloqueada"
        );

    }


    if (btnLimpiar) {

        btnLimpiar.disabled =
            true;

    }

}


// ======================================================
// DESBLOQUEAR FIRMA OPERADOR
// ======================================================

function desbloquearFirmaOperador() {

    const canvas =
        document.getElementById(
            "sigCoordinador"
        );


    const btnLimpiar =
        document.getElementById(
            "btnLimpiarFirmaCoordinador"
        );


    if (canvas) {

        canvas.style.pointerEvents =
            "auto";

        canvas.style.opacity =
            "1";

        canvas.classList.remove(
            "firma-bloqueada"
        );

    }


    if (btnLimpiar) {

        btnLimpiar.disabled =
            false;

    }

}


// ======================================================
// ESTADO OPERADOR
// ======================================================

function mostrarEstadoOperador(
    mensaje,
    tipo
) {

    const estado =
        document.getElementById(
            "estadoOperador"
        );


    if (!estado) {

        return;

    }


    estado.textContent =
        mensaje;


    estado.className =
        `small mb-3 text-${tipo}`;

}


// ======================================================
// CREAR CANVAS DE FIRMA
// ======================================================

function initFirma(id) {

    const c =
        document.getElementById(
            id
        );


    if (!c) {

        console.warn(
            `⚠️ Canvas ${id} no encontrado`
        );

        return;

    }


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


    let dibujando =
        false;


    let lx;
    let ly;


    function pos(e) {

        const r =
            c.getBoundingClientRect();


        const scaleX =
            c.width /
            r.width;


        const scaleY =
            c.height /
            r.height;


        const x =
            (
                e.clientX
            ) - r.left;


        const y =
            (
                e.clientY
            ) - r.top;


        return {

            x:
                x * scaleX,

            y:
                y * scaleY

        };

    }


    c.addEventListener(
        "pointerdown",
        (e) => {

            if (
                id === "sigCoordinador" &&
                !operadorValidado
            ) {

                return;

            }


            dibujando =
                true;


            ({
                x: lx,
                y: ly
            } = pos(e));

        }
    );


    c.addEventListener(
        "pointermove",
        (e) => {

            if (!dibujando) {

                return;

            }


            const {
                x,
                y
            } =
                pos(e);


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


            ctx.lineCap =
                "round";


            ctx.stroke();


            lx =
                x;

            ly =
                y;

        }
    );


    c.addEventListener(
        "pointerup",
        () => {

            dibujando =
                false;

        }
    );


    c.addEventListener(
        "pointerleave",
        () => {

            dibujando =
                false;

        }
    );

}


// ======================================================
// CARGAR FIRMA DE PERSONA
// ======================================================

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

        console.warn(
            "⚠️ Firma no encontrada:",
            nombreNormalizado
        );


        limpiarFirma(
            idCanvas
        );


        return;

    }


    dibujarFirmaDesdeUrl(
        `${firmasBaseUrl}${archivoFirma}`,
        idCanvas,
        archivoFirma
    );

}


// ======================================================
// DIBUJAR FIRMA DESDE URL
// ======================================================

function dibujarFirmaDesdeUrl(
    url,
    idCanvas,
    nombreArchivo
) {

    const c =
        document.getElementById(
            idCanvas
        );


    if (!c) {

        return;

    }


    const img =
        new Image();


    img.onload =
        () => {

            dibujarImagenEnCanvas(
                c,
                img
            );


            c.classList.remove(
                "border-danger"
            );

        };


    img.onerror =
        () => {

            console.error(
                "❌ No se pudo cargar firma:",
                nombreArchivo
            );


            limpiarFirma(
                idCanvas
            );

        };


    img.src =
        url;

}


// ======================================================
// DIBUJAR IMAGEN EN CANVAS
// ======================================================

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


    const margen =
        12;


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
        img.width *
        escala;


    const alto =
        img.height *
        escala;


    const x =
        (
            c.width -
            ancho
        ) / 2;


    const y =
        (
            c.height -
            alto
        ) / 2;


    ctx.drawImage(
        img,
        x,
        y,
        ancho,
        alto
    );

}


// ======================================================
// NORMALIZAR NOMBRE
// ======================================================

function normalizarNombre(
    nombrePersona = ""
) {

    return nombrePersona
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();

}


// ======================================================
// LIMPIAR FIRMA
// ======================================================

export function limpiarFirma(id) {

    const c =
        document.getElementById(
            id
        );


    if (!c) {

        return;

    }


    const ctx =
        c.getContext(
            "2d"
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


    if (
        id ===
        "sigEjecutor"
    ) {

        sigEjecutorData =
            null;

    }


    if (
        id ===
        "sigCoordinador"
    ) {

        sigCoordinadorData =
            null;

    }

}


// ======================================================
// LIMPIAR OPERADOR
// ======================================================

export function limpiarOperador() {

    operadorValidado =
        null;


    const cedula =
        document.getElementById(
            "cedulaOperador"
        );


    const password =
        document.getElementById(
            "passwordOperador"
        );


    const nombre =
        document.getElementById(
            "nombreOperador"
        );


    if (cedula) {

        cedula.value =
            "";

    }


    if (password) {

        password.value =
            "";

        password.type =
            "password";

    }


    if (nombre) {

        nombre.textContent =
            "";

    }


    mostrarEstadoOperador(
        "",
        "muted"
    );


    limpiarFirma(
        "sigCoordinador"
    );


    bloquearFirmaOperador();

}




// ------------------------------------------------------
// ACTUALIZAR TÉCNICO SEGÚN CORREO DE FIREBASE
// ------------------------------------------------------

export function actualizarTecnicoPorCorreo(correo) {

    const ejecutorSelect =
        document.getElementById("ejecutor");

    if (!ejecutorSelect) {
        console.warn(
            "⚠️ No se encontró el select #ejecutor"
        );
        return;
    }

    // -----------------------------------------------
    // OBTENER TÉCNICO SEGÚN EL CORREO
    // -----------------------------------------------

    const nombreTecnico =
        obtenerNombreTecnico(correo);

    if (!nombreTecnico) {

        console.warn(
            "⚠️ No existe técnico asociado al correo:",
            correo
        );

        ejecutorSelect.value = "";

        limpiarFirma("sigEjecutor");

        return;
    }

    // -----------------------------------------------
    // SELECCIONAR TÉCNICO INTERNAMENTE
    // -----------------------------------------------

    ejecutorSelect.value =
        nombreTecnico;

    // -----------------------------------------------
    // MOSTRAR NOMBRE DEL TÉCNICO
    // -----------------------------------------------

    const nombreTecnicoFirma =
        document.getElementById(
            "nombreTecnicoFirma"
        );

    if (nombreTecnicoFirma) {

        nombreTecnicoFirma.textContent =
            nombreTecnico;

    }

    // -----------------------------------------------
    // CARGAR FIRMA AUTOMÁTICAMENTE
    // -----------------------------------------------

    cargarFirmaPersona(
        nombreTecnico,
        "sigEjecutor"
    );

    console.log(
        "👤 Técnico identificado:",
        nombreTecnico
    );
}
// ======================================================
// EXPORTAR
// ======================================================

export {
    sigEjecutorData,
    sigCoordinadorData,
};