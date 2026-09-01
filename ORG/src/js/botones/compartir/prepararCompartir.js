// ------------------------------------------------------
// ARCHIVO:
// ORG\src\js\botones\compartir\datosCompartir.js
//
// RESPONSABILIDAD:
// Preparar los datos necesarios para compartir
// el mantenimiento.
//
// RELACIONES:
//
// 1. datosFormulario.js
//    → ORG\src\js\botones\compartir\datosFormulario.js
//
// 2. utils.js
//    → ORG\src\js\botones\utils.js
//
// FLUJO:
//
// compartir.js
//      ↓
// datosCompartir.js
//      ├── datosFormulario.js
//      └── utils.js
//
// FUNCIONES:
//
// prepararDatosCompartir()
//      → Obtiene los datos del formulario
//      → Genera el nombre base
//
// construirRutaSharePoint()
//      → Construye la ruta de SharePoint
//
// construirNombreArchivo()
//      → Construye el nombre final del PDF
// ------------------------------------------------------

import {
    obtenerDatosFormulario
} from "./../datosFormulario.js";

import {
    sanitize
} from "../utils.js";


// ------------------------------------------------------
// PREPARAR DATOS
// ------------------------------------------------------

export function prepararDatosCompartir() {

    console.log(
        "📋 [DATOS COMPARTIR] Preparando datos..."
    );

    const data =
        obtenerDatosFormulario();

    const nombreBase =
        sanitize(
            data.tipoMantenimiento
        );

    console.log(
        "✅ [DATOS COMPARTIR] Datos preparados"
    );

    return {
        data,
        nombreBase
    };
}


// ------------------------------------------------------
// CONSTRUIR RUTA SHAREPOINT
// ------------------------------------------------------

export function construirRutaSharePoint(data) {

    const ruta =
        `Documentos/PLANTA/${sanitize(data.planta)}/EQUIPOS/${sanitize(data.equipo)}/INFORMES DE MANTENIMIENTO`;

    console.log(
        "📁 [DATOS COMPARTIR] Ruta SharePoint:",
        ruta
    );

    return ruta;
}


// ------------------------------------------------------
// CONSTRUIR NOMBRE DEL ARCHIVO
// ------------------------------------------------------

export function construirNombreArchivo(
    tipoMantenimiento,
    idMantenimiento
) {

    const nombre =
        sanitize(
            `${tipoMantenimiento}_${idMantenimiento}.pdf`
        );

    console.log(
        "📄 [DATOS COMPARTIR] Nombre archivo:",
        nombre
    );

    return nombre;
}