import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "./services/firebase/firebase.js";
import {
    normalizarUrlSharePoint,
    obtenerUrlArchivoSharePoint
} from "./services/onedrive/sharepointUrls.js";


// ======================================================
// CACHE DE ACTIVOS
// ======================================================

let activosCache = null;


// ======================================================
// INICIALIZAR
// ======================================================

export function initFotoActivoSeleccionado() {

    const equipoSelect = document.getElementById("equipo");
    const plantaSelect = document.getElementById("planta");
    const areaSelect = document.getElementById("area");

    if (!equipoSelect || !plantaSelect) {
        console.warn(
            "No se encontraron los select equipo o planta."
        );

        return;
    }


    // Cuando cambia el equipo
    equipoSelect.addEventListener(
        "change",
        cargarFotoActivoSeleccionado
    );


    // Cuando cambia la planta
    plantaSelect.addEventListener(
        "change",
        limpiarFotoActivo
    );


    // Cuando cambia el área
    areaSelect?.addEventListener(
        "change",
        limpiarFotoActivo
    );


    console.log(
        "✅ Módulo de foto de activo inicializado"
    );
}


// ======================================================
// CARGAR FOTO DEL ACTIVO SELECCIONADO
// ======================================================

async function cargarFotoActivoSeleccionado() {

    console.log(
        "=========================================="
    );

    console.log(
        "📷 CAMBIO DE EQUIPO"
    );


    const equipoSelect =
        document.getElementById("equipo");


    const planta =
        document.getElementById("planta")?.value || "";


    const codigoEquipo =
        equipoSelect?.value || "";


    const nombreEquipo =
        equipoSelect
            ?.selectedOptions?.[0]
            ?.textContent || "";


    console.log(
        "Planta:",
        planta
    );


    console.log(
        "Código equipo:",
        codigoEquipo
    );


    console.log(
        "Nombre equipo:",
        nombreEquipo
    );


    // ==================================================
    // LIMPIAR FOTO ANTERIOR
    // ==================================================

    limpiarFotoActivo();


    // ==================================================
    // VALIDAR SELECCIÓN
    // ==================================================

    if (!planta || !codigoEquipo) {

        console.log(
            "⚠️ No hay planta o equipo seleccionado."
        );

        return;
    }


    // ==================================================
    // MOSTRAR SKELETON
    // ==================================================

    mostrarSkeletonFoto();


    try {

        // ==================================================
        // OBTENER ACTIVOS
        // ==================================================

        const activos =
            await obtenerActivos();


        console.log(
            "📦 Activos encontrados:",
            activos.length
        );


        // ==================================================
        // BUSCAR ACTIVO
        // ==================================================

        const activo =
            activos.find((item) =>
                coincideActivo(
                    item,
                    planta,
                    codigoEquipo,
                    nombreEquipo
                )
            );


        // ==================================================
        // ACTIVO NO EXISTE
        // ==================================================

        if (!activo) {

            console.log(
                "❌ No se encontró el activo."
            );


            ocultarSkeletonFoto();


            mostrarEstadoFoto(
                "No hay foto asociada para este activo."
            );


            return;
        }


        console.log(
            "✅ Activo encontrado:",
            activo
        );


        // ==================================================
        // OBTENER REFERENCIA DE LA FOTO
        // ==================================================

        const referenciaFoto =
            obtenerReferenciaFoto(activo);


        console.log(
            "📁 Referencia foto:",
            referenciaFoto
        );


        // ==================================================
        // OBTENER URLS
        // ==================================================

        const urlVista =
            normalizarUrlSharePoint(
                referenciaFoto
            );


        const urlImagen =
            obtenerUrlArchivoSharePoint(
                referenciaFoto
            );


        console.log(
            "🔗 URL vista:",
            urlVista
        );


        console.log(
            "🖼️ URL imagen:",
            urlImagen
        );


        // ==================================================
        // VALIDAR URL
        // ==================================================

        if (!urlVista || !urlImagen) {

            console.warn(
                "⚠️ El activo no tiene una URL válida."
            );


            ocultarSkeletonFoto();


            mostrarEstadoFoto(
                "El activo existe, pero no tiene foto guardada."
            );


            return;
        }


        // ==================================================
        // CARGAR FOTO
        // ==================================================

        cargarImagenConSkeleton(
            urlImagen,
            urlVista,
            activo
        );


    } catch (error) {

        console.error(
            "❌ Error cargando foto del activo:",
            error
        );


        ocultarSkeletonFoto();


        mostrarEstadoFoto(
            "No se pudo consultar la foto del activo."
        );

    }
}


// ======================================================
// OBTENER ACTIVOS DESDE FIREBASE
// ======================================================

async function obtenerActivos() {

    // Si ya tenemos los activos en memoria,
    // no volvemos a consultar Firebase.

    if (activosCache) {

        console.log(
            "📦 Usando activos desde cache."
        );

        return activosCache;
    }


    console.log(
        "🔥 Consultando activos en Firebase..."
    );


    const snapshot =
        await getDocs(
            collection(
                db,
                "activos"
            )
        );


    activosCache =
        snapshot.docs.map(
            (documento) => ({
                id: documento.id,
                ...documento.data()
            })
        );


    console.log(
        "🔥 Activos cargados:",
        activosCache.length
    );


    return activosCache;
}


// ======================================================
// COMPARAR ACTIVO
// ======================================================

function coincideActivo(
    activo,
    planta,
    codigoEquipo,
    nombreEquipo
) {

    if (
        normalizarTexto(activo.planta) !==
        normalizarTexto(planta)
    ) {

        return false;
    }


    const codigo =
        normalizarTexto(
            codigoEquipo
        );


    const nombre =
        normalizarTexto(
            nombreEquipo
        );


    const candidatos = [

        activo.codigo,

        activo.codigoEquipo,

        activo.serial,

        activo.maquinaEquipo,

        activo.equipo,

        activo.nombre,

        activo.descripcionBasica

    ].map(normalizarTexto);


    // ==================================================
    // BUSCAR POR CÓDIGO
    // ==================================================

    const coincideCodigo =
        candidatos.some(
            (valor) =>
                valor &&
                codigo &&
                valor === codigo
        );


    if (coincideCodigo) {

        return true;
    }


    // ==================================================
    // BUSCAR POR NOMBRE
    // ==================================================

    return candidatos.some(
        (valor) =>
            valor &&
            nombre &&
            (
                valor === nombre ||
                valor.includes(nombre) ||
                nombre.includes(valor)
            )
    );
}


// ======================================================
// OBTENER REFERENCIA DE FOTO
// ======================================================

function obtenerReferenciaFoto(activo) {

    if (activo.fotoUrlSharePoint) {

        return activo.fotoUrlSharePoint;
    }


    if (activo.rutaFotoSharePoint) {

        return activo.rutaFotoSharePoint;
    }


    if (
        activo.fotoRutaSharePoint &&
        activo.fotoNombreSharePoint
    ) {

        return (
            `${activo.fotoRutaSharePoint}/${activo.fotoNombreSharePoint}`
        );
    }


    if (activo.fotoRutaSharePoint) {

        return activo.fotoRutaSharePoint;
    }


    return "";
}


// ======================================================
// CARGAR IMAGEN
// ======================================================

function cargarImagenConSkeleton(
    urlImagen,
    urlVista,
    activo
) {

    console.log(
        "=========================================="
    );

    console.log(
        "🖼️ INICIANDO CARGA DE IMAGEN"
    );


    console.log(
        "URL imagen:",
        urlImagen
    );


    console.log(
        "URL vista:",
        urlVista
    );


    const contenedor =
        document.getElementById(
            "vistaFotoActivo"
        );


    const estado =
        document.getElementById(
            "estadoFotoActivo"
        );


    const imagen =
        document.getElementById(
            "imagenActivoSeleccionado"
        );


    const link =
        document.getElementById(
            "linkFotoActivo"
        );


    if (!contenedor) {

        console.error(
            "❌ No existe #vistaFotoActivo"
        );

        return;
    }


    if (!imagen) {

        console.error(
            "❌ No existe #imagenActivoSeleccionado"
        );

        return;
    }


    // ==================================================
    // MOSTRAR CONTENEDOR
    // ==================================================

    contenedor.classList.remove(
        "d-none"
    );


    // ==================================================
    // TEXTO
    // ==================================================

    if (estado) {

        estado.textContent =
            "FOTO DEL ACTIVO";
    }


    // ==================================================
    // MOSTRAR SKELETON
    // ==================================================

    mostrarSkeletonFoto();


    // ==================================================
    // OCULTAR IMAGEN ANTERIOR
    // ==================================================

    imagen.classList.add(
        "d-none"
    );


    imagen.onload = null;
    imagen.onerror = null;


    // ==================================================
    // CONFIGURAR ENLACE
    // ==================================================

    if (link && urlVista) {

        link.href =
            urlVista;

        link.classList.remove(
            "d-none"
        );
    }


    // ==================================================
    // CREAR IMAGEN TEMPORAL
    // ==================================================

    const imagenTemporal =
        new Image();


    // ==================================================
    // IMAGEN CARGADA
    // ==================================================

    imagenTemporal.onload =
        function () {

            console.log(
                "✅ IMAGEN CARGADA CORRECTAMENTE"
            );


            console.log(
                "Dimensiones:",
                imagenTemporal.naturalWidth,
                "x",
                imagenTemporal.naturalHeight
            );


            // Colocar URL en imagen visible
            imagen.src =
                urlImagen;


            // Ocultar skeleton
            ocultarSkeletonFoto();


            // Mostrar imagen
            imagen.classList.remove(
                "d-none"
            );


            console.log(
                "✅ FOTO MOSTRADA"
            );
        };


    // ==================================================
    // ERROR
    // ==================================================

    imagenTemporal.onerror =
        function (error) {

            console.error(
                "❌ ERROR CARGANDO IMAGEN"
            );


            console.error(
                "URL:",
                urlImagen
            );


            console.error(
                "Error:",
                error
            );


            ocultarSkeletonFoto();


            imagen.classList.add(
                "d-none"
            );


            if (estado) {

                estado.textContent =
                    "No se pudo cargar la foto del activo.";
            }
        };


    // ==================================================
    // INICIAR CARGA
    // ==================================================

    console.log(
        "⏳ Descargando imagen..."
    );


    imagenTemporal.src =
        urlImagen;
}


// ======================================================
// MOSTRAR SKELETON
// ======================================================

function mostrarSkeletonFoto() {

    const contenedor =
        document.getElementById(
            "vistaFotoActivo"
        );


    const skeleton =
        document.getElementById(
            "skeletonFotoActivo"
        );


    const imagen =
        document.getElementById(
            "imagenActivoSeleccionado"
        );


    // Mostrar contenedor

    contenedor?.classList.remove(
        "d-none"
    );


    // Mostrar skeleton

    skeleton?.classList.remove(
        "d-none"
    );


    // Ocultar imagen

    imagen?.classList.add(
        "d-none"
    );


    console.log(
        "⏳ Skeleton mostrado"
    );
}


// ======================================================
// OCULTAR SKELETON
// ======================================================

function ocultarSkeletonFoto() {

    const skeleton =
        document.getElementById(
            "skeletonFotoActivo"
        );


    skeleton?.classList.add(
        "d-none"
    );


    console.log(
        "✅ Skeleton ocultado"
    );
}


// ======================================================
// LIMPIAR FOTO
// ======================================================

function limpiarFotoActivo() {

    const contenedor =
        document.getElementById(
            "vistaFotoActivo"
        );


    const estado =
        document.getElementById(
            "estadoFotoActivo"
        );


    const imagen =
        document.getElementById(
            "imagenActivoSeleccionado"
        );


    const link =
        document.getElementById(
            "linkFotoActivo"
        );


    // ==================================================
    // OCULTAR CONTENEDOR
    // ==================================================

    contenedor?.classList.add(
        "d-none"
    );


    // ==================================================
    // OCULTAR SKELETON
    // ==================================================

    ocultarSkeletonFoto();


    // ==================================================
    // RESTAURAR TEXTO
    // ==================================================

    if (estado) {

        estado.textContent =
            "FOTO DEL ACTIVO";
    }


    // ==================================================
    // LIMPIAR IMAGEN
    // ==================================================

    if (imagen) {

        imagen.onload = null;

        imagen.onerror = null;

        imagen.src = "";

        imagen.classList.add(
            "d-none"
        );
    }


    // ==================================================
    // LIMPIAR ENLACE
    // ==================================================

    if (link) {

        link.removeAttribute(
            "href"
        );

        link.classList.add(
            "d-none"
        );
    }
}


// ======================================================
// MOSTRAR ESTADO
// ======================================================

function mostrarEstadoFoto(
    mensaje
) {

    const contenedor =
        document.getElementById(
            "vistaFotoActivo"
        );


    const estado =
        document.getElementById(
            "estadoFotoActivo"
        );


    contenedor?.classList.remove(
        "d-none"
    );


    if (estado) {

        estado.textContent =
            mensaje;
    }
}


// ======================================================
// NORMALIZAR TEXTO
// ======================================================

function normalizarTexto(
    valor
) {

    return String(
        valor || ""
    )
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .trim()
        .toUpperCase();
}