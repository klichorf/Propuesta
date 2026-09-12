// ------------------------------------------------------
// GESTIÓN DEL OPERADOR
// ------------------------------------------------------

import {
    validarOperador,
} from "../services/firebase/operadores.js";

import {
    mostrarLoadercompartir,
    ocultarLoadercompartir,
} from "../services/onedrive/loader.js";

import {
    establecerOperadorValidado,
    limpiarEstadoOperador,
} from "./firmasEstado.js";

import {
    cargarImagenEnCanvas,
    limpiarCanvas,
} from "./firmasCanvas.js";

import {
    cargarFirmaPersona,
} from "./firmaTecnico.js";

import {
    construirUrlFirma,
} from "./firmasUtils.js";

const firmasBaseUrl =
    new URL("../../assets/firmas/", import.meta.url).href;

// ======================================================
// VALIDAR OPERADOR
// ======================================================

export async function validarOperadorFormulario() {

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

    const nombre =
        document.getElementById(
            "nombreOperador"
        );

    if (!cedulaInput || !passwordInput) {
        return;
    }

    const cedula =
        cedulaInput.value.trim();

    const password =
        passwordInput.value;

    if (!cedula || !password) {

        mostrarEstado(
            "Digite la cédula y la contraseña.",
            "danger"
        );

        bloquearFirma();

        return;
    }

    mostrarLoaderValidacion();

    if (btn) {
        btn.disabled = true;

        btn.innerHTML = `
      <span
        class="spinner-border spinner-border-sm"
        aria-hidden="true">
      </span>
    `;
    }

    try {

        const operador =
            await validarOperador(
                cedula,
                password
            );

        if (!operador) {

            limpiarEstadoOperador();

            if (nombre) {
                nombre.textContent = "";
            }

            limpiarCanvas(
                "sigCoordinador"
            );

            bloquearFirma();

            mostrarEstado(
                "Cédula o contraseña incorrecta.",
                "danger"
            );

            return;
        }

        establecerOperadorValidado(
            operador
        );

        console.log(
            "✅ Operador autorizado:",
            operador.nombre
        );

        if (nombre) {
            nombre.textContent =
                operador.nombre;
        }

        mostrarEstado(
            "Operador validado correctamente.",
            "success"
        );

        await cargarFirmaOperador(
            operador,
            "sigCoordinador"
        );

        desbloquearFirma();

        passwordInput.value = "";

    } catch (error) {

        console.error(
            "❌ Error validando operador:",
            error
        );

        limpiarEstadoOperador();

        bloquearFirma();

        mostrarEstado(
            "No fue posible validar el operador.",
            "danger"
        );

    } finally {

        ocultarLoadercompartir();

        if (btn) {

            btn.disabled = false;

            btn.innerHTML = `
        <i class="bi bi-fingerprint fs-5"></i>
      `;
        }
    }
}

// ======================================================
// CARGAR FIRMA OPERADOR
// ======================================================

async function cargarFirmaOperador(
    operador,
    idCanvas
) {

    if (operador?.firma) {

        const url =
            construirUrlFirma(
                operador.firma,
                firmasBaseUrl
            );

        return cargarImagenEnCanvas(
            url,
            idCanvas,
            operador.firma
        );
    }

    return cargarFirmaPersona(
        operador?.nombre,
        idCanvas
    );
}

// ======================================================
// MOSTRAR ESTADO
// ======================================================

function mostrarEstado(
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

    estado.textContent = mensaje;

    estado.className =
        `small mb-3 text-${tipo}`;
}

// ======================================================
// LOADER
// ======================================================

function mostrarLoaderValidacion() {

    const texto =
        document.getElementById(
            "loaderProgress2"
        );

    if (texto) {
        texto.textContent =
            "Validando operador...";
    }

    mostrarLoadercompartir();
}

// ======================================================
// BLOQUEAR FIRMA
// ======================================================

export function bloquearFirma() {

    const canvas =
        document.getElementById(
            "sigCoordinador"
        );

    const btn =
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

    if (btn) {
        btn.disabled = true;
    }
}

// ======================================================
// DESBLOQUEAR FIRMA
// ======================================================

function desbloquearFirma() {

    const canvas =
        document.getElementById(
            "sigCoordinador"
        );

    const btn =
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

    if (btn) {
        btn.disabled = false;
    }
}

// ======================================================
// LIMPIAR OPERADOR
// ======================================================

export function limpiarOperador() {

    limpiarEstadoOperador();

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
        cedula.value = "";
    }

    if (password) {

        password.value = "";
        password.type = "password";
    }

    if (nombre) {
        nombre.textContent = "";
    }

    mostrarEstado("", "muted");

    limpiarCanvas(
        "sigCoordinador"
    );

    bloquearFirma();
}

// ======================================================
// MOSTRAR / OCULTAR PASSWORD
// ======================================================

export function alternarPassword() {

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
        button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";

        if (icon) {
            icon.className =
                "bi bi-eye-slash";
        }

    } else {

        input.type = "password";

        if (icon) {
            icon.className =
                "bi bi-eye";
        }
    }
}