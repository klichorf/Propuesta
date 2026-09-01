// ------------------------------------------------------
// ARCHIVO:
// ORG\src\js\botones\compartir\manejarErrorCompartir.js
//
// RESPONSABILIDAD:
// Gestionar los errores ocurridos durante el proceso
// de compartir el mantenimiento.
//
// RELACIONES:
//
// 1. firebaseCompartir.js
//    → Importa:
//    ORG\src\js\botones\compartir\firebaseCompartir.js
//
// 2. utils.js
//    → Importa:
//    ORG\src\js\botones\compartir\utils.js
//
// 3. toast.js
//    → Importa:
//    ORG\src\js\botones\toast.js
//
// FLUJO:
//
// compartir.js
//      ↓
// manejarErrorCompartir.js
//      ├── firebaseCompartir.js
//      ├── utils.js
//      └── toast.js
// ------------------------------------------------------

import { eliminarCompartir } from "./firebaseCompartir.js";

import { SharePointError } from "./../utils.js";

import { mostrarToast } from "./../../toast";

// ------------------------------------------------------
// GESTIONAR ERROR DEL PROCESO DE COMPARTIR
// ------------------------------------------------------

export async function manejarErrorCompartir(error, idMantenimiento) {
    console.error("🔥 [ERROR COMPARTIR] Error detectado:", error);

    console.log(
        "📁 [ERROR COMPARTIR] Archivo:",
        "ORG\\src\\js\\botones\\compartir\\manejarErrorCompartir.js",
    );

    // --------------------------------------------------
    // ERROR DE SHAREPOINT
    // --------------------------------------------------

    if (error instanceof SharePointError && idMantenimiento) {
        console.log("☁️ [ERROR COMPARTIR] Error relacionado con SharePoint");

        console.log(
            "🗑️ [ERROR COMPARTIR] Eliminando registro de Firebase:",
            idMantenimiento,
        );

        await eliminarCompartir(idMantenimiento);

        console.log("✅ [ERROR COMPARTIR] Registro eliminado");

        mostrarToast(
            "❌ Falló la subida a SharePoint. Registro eliminado.",
            "danger",
        );

        return;
    }

    // --------------------------------------------------
    // ERROR GENERAL
    // --------------------------------------------------

    console.log("⚠️ [ERROR COMPARTIR] Error general del proceso");

    mostrarToast("❌ Error al guardar el mantenimiento", "danger");
}
