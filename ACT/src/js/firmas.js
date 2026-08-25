// ------------------------------------------------------
// GESTIÓN DE FIRMAS (EJECUTOR Y SUPERVISOR)
// ------------------------------------------------------
import { firmasPersonas, supervisores } from "./selects.js";

let sigEjecutorData = null;
let sigCoordinadorData = null;

const firmasBaseUrl = new URL("../assets/firmas/", import.meta.url).href;

// ------------------------------------------------------
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ------------------------------------------------------
export function initFirmas() {
    // Inicializa las dos firmas cuando se cargue el DOM
    initFirma("sigEjecutor");
    initFirma("sigCoordinador");

    // Vincula los botones de limpieza a la función limpiarFirma
    const btnEjecutor = document.querySelector("#sigEjecutor")
        ?.parentElement.querySelector(".signature-tools button");
    const btnCoordinador = document.querySelector("#sigCoordinador")
        ?.parentElement.querySelector(".signature-tools button");

    if (btnEjecutor) btnEjecutor.addEventListener("click", () => limpiarFirma("sigEjecutor"));
    if (btnCoordinador) btnCoordinador.addEventListener("click", () => limpiarFirma("sigCoordinador"));

    document.querySelectorAll("[data-signature-target]").forEach((input) => {
        input.addEventListener("change", () => insertarFirma(input));
    });

    const ejecutorSelect = document.getElementById("ejecutor");
    const plantaSelect = document.getElementById("planta");

    ejecutorSelect?.addEventListener("change", () => {
        cargarFirmaPersona(ejecutorSelect.value, "sigEjecutor");
    });

    plantaSelect?.addEventListener("change", () => {
        const supervisor = supervisores[plantaSelect.value] || "";
        cargarFirmaPersona(supervisor, "sigCoordinador");
    });
}

// ------------------------------------------------------
// FUNCIÓN PARA CREAR UNA FIRMA EN UN CANVAS
// ------------------------------------------------------
function initFirma(id) {
    const c = document.getElementById(id);
    if (!c) return;

    // --- ARREGLA EL DESFASE EN PANTALLAS GRANDES ---
    const rect = c.getBoundingClientRect();
    c.width = rect.width;
    c.height = rect.height;

    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);

    let dibujando = false;
    let lx, ly;

function pos(e) {
    const r = c.getBoundingClientRect();

    const scaleX = c.width / r.width;
    const scaleY = c.height / r.height;

    const x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) * scaleX;
    const y = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) * scaleY;

    return { x, y };
}


    c.addEventListener("pointerdown", (e) => {
        dibujando = true;
        ({ x: lx, y: ly } = pos(e));
    });

    c.addEventListener("pointermove", (e) => {
        if (!dibujando) return;
        const { x, y } = pos(e);
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
        lx = x;
        ly = y;
    });

    window.addEventListener("pointerup", () => (dibujando = false));
}

// ------------------------------------------------------
// FUNCIÓN PARA INSERTAR UNA FIRMA DESDE UNA IMAGEN
// ------------------------------------------------------
function insertarFirma(input) {
    const archivo = input.files?.[0];
    const id = input.dataset.signatureTarget;
    const c = document.getElementById(id);

    if (!archivo || !c) return;

    const reader = new FileReader();

    reader.onload = () => {
        const img = new Image();

        img.onload = () => {
            dibujarImagenEnCanvas(c, img);
            c.classList.remove("border-danger");
            actualizarEstadoFirma(id, archivo.name);
        };

        img.src = reader.result;
    };

    reader.readAsDataURL(archivo);
}

function actualizarEstadoFirma(id, nombreArchivo = "") {
    const estado = document.querySelector(`[data-signature-status="${id}"]`);
    if (!estado) return;

    if (!nombreArchivo) {
        estado.textContent = "Puedes firmar o insertar imagen";
        return;
    }

    if (nombreArchivo.startsWith("No se encontró") || nombreArchivo === "Firma no configurada") {
        estado.textContent = nombreArchivo;
        return;
    }

    estado.textContent = `Firma insertada: ${nombreArchivo}`;
}

function cargarFirmaPersona(nombrePersona, idCanvas) {
    const nombreNormalizado = normalizarNombre(nombrePersona);
    const archivoFirma = firmasPersonas[nombreNormalizado];

    if (!archivoFirma) {
        limpiarFirma(idCanvas);
        actualizarEstadoFirma(idCanvas, "Firma no configurada");
        return;
    }

    dibujarFirmaDesdeUrl(`${firmasBaseUrl}${archivoFirma}`, idCanvas, archivoFirma);
}

function dibujarFirmaDesdeUrl(url, idCanvas, nombreArchivo) {
    const c = document.getElementById(idCanvas);
    if (!c) return;

    const img = new Image();

    img.onload = () => {
        dibujarImagenEnCanvas(c, img);
        c.classList.remove("border-danger");
        actualizarEstadoFirma(idCanvas, nombreArchivo);
    };

    img.onerror = () => {
        limpiarFirma(idCanvas);
        actualizarEstadoFirma(idCanvas, `No se encontró: ${nombreArchivo}`);
    };

    img.src = url;
}

function dibujarImagenEnCanvas(c, img) {
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);

    const margen = 12;
    const maxW = c.width - margen * 2;
    const maxH = c.height - margen * 2;
    const escala = Math.min(maxW / img.width, maxH / img.height);
    const ancho = img.width * escala;
    const alto = img.height * escala;
    const x = (c.width - ancho) / 2;
    const y = (c.height - alto) / 2;

    ctx.drawImage(img, x, y, ancho, alto);
}

function normalizarNombre(nombrePersona = "") {
    return nombrePersona.trim().replace(/\s+/g, " ").toUpperCase();
}

// ------------------------------------------------------
// FUNCIÓN PARA LIMPIAR UNA FIRMA
// ------------------------------------------------------
export function limpiarFirma(id) {
    const c = document.getElementById(id);
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    if (id === "sigEjecutor") sigEjecutorData = null;
    if (id === "sigCoordinador") sigCoordinadorData = null;

    const input = document.querySelector(`[data-signature-target="${id}"]`);
    if (input) input.value = "";
    actualizarEstadoFirma(id);
}

// ------------------------------------------------------
// EXPORTAR LAS FIRMAS PARA USAR EN OTROS MÓDULOS
// ------------------------------------------------------
export { sigEjecutorData, sigCoordinadorData };
