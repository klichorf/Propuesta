// ------------------------------------------------------
// CANVAS DE FIRMAS
// ------------------------------------------------------

import {
    establecerSigEjecutorData,
    establecerSigCoordinadorData,
    operadorEstaValidado,
} from "./firmasEstado.js";

// ======================================================
// INICIALIZAR CANVAS
// ======================================================

export function inicializarCanvas(id) {

    const canvas = document.getElementById(id);

    if (!canvas) {
        console.warn(`⚠️ Canvas ${id} no encontrado`);
        return;
    }

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
    });

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let dibujando = false;
    let lastX = 0;
    let lastY = 0;

    function obtenerPosicion(evento) {

        const r = canvas.getBoundingClientRect();

        const scaleX = canvas.width / r.width;
        const scaleY = canvas.height / r.height;

        return {
            x: (evento.clientX - r.left) * scaleX,
            y: (evento.clientY - r.top) * scaleY,
        };
    }

    canvas.addEventListener("pointerdown", (evento) => {

        if (
            id === "sigCoordinador" &&
            !operadorEstaValidado()
        ) {
            return;
        }

        dibujando = true;

        ({
            x: lastX,
            y: lastY,
        } = obtenerPosicion(evento));
    });

    canvas.addEventListener("pointermove", (evento) => {

        if (!dibujando) {
            return;
        }

        const { x, y } = obtenerPosicion(evento);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.stroke();

        lastX = x;
        lastY = y;
    });

    canvas.addEventListener("pointerup", () => {
        dibujando = false;
    });

    canvas.addEventListener("pointerleave", () => {
        dibujando = false;
    });
}

// ======================================================
// DIBUJAR IMAGEN
// ======================================================

export function dibujarImagenEnCanvas(canvas, imagen) {

    const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
    });

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#fff";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const margen = 12;

    const maxW =
        canvas.width - margen * 2;

    const maxH =
        canvas.height - margen * 2;

    const escala = Math.min(
        maxW / imagen.width,
        maxH / imagen.height
    );

    const ancho =
        imagen.width * escala;

    const alto =
        imagen.height * escala;

    const x =
        (canvas.width - ancho) / 2;

    const y =
        (canvas.height - alto) / 2;

    ctx.drawImage(
        imagen,
        x,
        y,
        ancho,
        alto
    );
}

// ======================================================
// CARGAR IMAGEN EN CANVAS
// ======================================================

export function cargarImagenEnCanvas(
    url,
    idCanvas,
    nombreArchivo
) {

    const canvas =
        document.getElementById(idCanvas);

    if (!canvas) {
        return Promise.resolve(false);
    }

    return new Promise((resolve) => {

        const imagen = new Image();

        imagen.onload = () => {

            dibujarImagenEnCanvas(
                canvas,
                imagen
            );

            canvas.classList.remove(
                "border-danger"
            );

            resolve(true);
        };

        imagen.onerror = () => {

            console.error(
                "❌ No se pudo cargar firma:",
                nombreArchivo
            );

            limpiarCanvas(idCanvas);

            resolve(false);
        };

        imagen.src = url;
    });
}

// ======================================================
// LIMPIAR CANVAS
// ======================================================

export function limpiarCanvas(idCanvas) {

    const canvas =
        document.getElementById(idCanvas);

    if (!canvas) {
        return;
    }

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#fff";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if (idCanvas === "sigEjecutor") {
        establecerSigEjecutorData(null);
    }

    if (idCanvas === "sigCoordinador") {
        establecerSigCoordinadorData(null);
    }
}