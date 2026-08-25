import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "./services/firebase/firebase.js";
import { normalizarUrlSharePoint, obtenerUrlArchivoSharePoint } from "./services/onedrive/sharepointUrls.js";

let activosCache = null;

export function initFotoActivoSeleccionado() {
    const equipoSelect = document.getElementById("equipo");
    const plantaSelect = document.getElementById("planta");
    const areaSelect = document.getElementById("area");

    if (!equipoSelect || !plantaSelect) return;

    equipoSelect.addEventListener("change", cargarFotoActivoSeleccionado);
    plantaSelect.addEventListener("change", limpiarFotoActivo);
    areaSelect?.addEventListener("change", limpiarFotoActivo);
}

async function cargarFotoActivoSeleccionado() {
    const equipoSelect = document.getElementById("equipo");
    const planta = document.getElementById("planta")?.value || "";
    const codigoEquipo = equipoSelect?.value || "";
    const nombreEquipo = equipoSelect?.selectedOptions?.[0]?.textContent || "";

    limpiarFotoActivo();

    if (!planta || !codigoEquipo) return;

    mostrarEstadoFoto("Buscando foto del activo...");

    try {
        const activos = await obtenerActivos();
        const activo = activos.find((item) => coincideActivo(item, planta, codigoEquipo, nombreEquipo));

        if (!activo) {
            mostrarEstadoFoto("No hay foto asociada para este activo.");
            return;
        }

        const referenciaFoto = obtenerReferenciaFoto(activo);
        const urlVista = normalizarUrlSharePoint(referenciaFoto);
        const urlImagen = obtenerUrlArchivoSharePoint(referenciaFoto);

        if (!urlVista) {
            mostrarEstadoFoto("El activo existe, pero no tiene foto guardada.");
            return;
        }

        mostrarFotoActivo(urlImagen, urlVista, activo);
    } catch (error) {
        console.error("Error cargando foto del activo:", error);
        mostrarEstadoFoto("No se pudo consultar la foto del activo.");
    }
}

async function obtenerActivos() {
    const snapshot = await getDocs(collection(db, "activos"));
    return snapshot.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
}

function coincideActivo(activo, planta, codigoEquipo, nombreEquipo) {
    if (normalizarTexto(activo.planta) !== normalizarTexto(planta)) return false;

    const codigo = normalizarTexto(codigoEquipo);
    const nombre = normalizarTexto(nombreEquipo);
    const candidatos = [
        activo.codigo,
        activo.codigoEquipo,
        activo.serial,
        activo.maquinaEquipo,
        activo.equipo,
        activo.nombre,
        activo.descripcionBasica
    ].map(normalizarTexto);

    const coincideCodigo = candidatos.some((valor) => valor && codigo && valor === codigo);
    if (coincideCodigo) return true;

    return candidatos.some((valor) => valor && nombre && (valor === nombre || valor.includes(nombre) || nombre.includes(valor)));
}

function obtenerReferenciaFoto(activo) {
    if (activo.fotoUrlSharePoint) return activo.fotoUrlSharePoint;
    if (activo.rutaFotoSharePoint) return activo.rutaFotoSharePoint;
    if (activo.fotoRutaSharePoint && activo.fotoNombreSharePoint) {
        return `${activo.fotoRutaSharePoint}/${activo.fotoNombreSharePoint}`;
    }
    if (activo.fotoRutaSharePoint) return activo.fotoRutaSharePoint;
    return "";
}

function mostrarFotoActivo(urlImagen, urlVista, activo) {
    const contenedor = document.getElementById("vistaFotoActivo");
    const estado = document.getElementById("estadoFotoActivo");
    const imagen = document.getElementById("imagenActivoSeleccionado");
    const link = document.getElementById("linkFotoActivo");

    contenedor?.classList.remove("d-none");
    if (estado) estado.textContent = activo.maquinaEquipo || activo.serial || "Foto del activo";

    if (link) {
        link.href = urlVista;
        link.classList.remove("d-none");
    }

    if (!imagen || !urlImagen) return;

    imagen.onload = () => imagen.classList.remove("d-none");
    imagen.onerror = () => {
        imagen.classList.add("d-none");
        if (estado) estado.textContent = "Foto disponible en SharePoint.";
    };
    imagen.src = urlImagen;
}

function limpiarFotoActivo() {
    const contenedor = document.getElementById("vistaFotoActivo");
    const estado = document.getElementById("estadoFotoActivo");
    const imagen = document.getElementById("imagenActivoSeleccionado");
    const link = document.getElementById("linkFotoActivo");

    contenedor?.classList.add("d-none");
    if (estado) estado.textContent = "Foto del activo";
    if (imagen) {
        imagen.onload = null;
        imagen.onerror = null;
        imagen.src = "";
        imagen.classList.add("d-none");
    }
    if (link) {
        link.removeAttribute("href");
        link.classList.add("d-none");
    }
}

function mostrarEstadoFoto(mensaje) {
    const contenedor = document.getElementById("vistaFotoActivo");
    const estado = document.getElementById("estadoFotoActivo");
    contenedor?.classList.remove("d-none");
    if (estado) estado.textContent = mensaje;
}

function normalizarTexto(valor) {
    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toUpperCase();
}




