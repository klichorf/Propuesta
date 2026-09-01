// ------------------------------------------------------
// ARCHIVO:
// ORG\src\js\botones\compartir\firebaseCompartir.js
//
// RESPONSABILIDAD:
// Gestionar las operaciones de Firebase relacionadas
// con el proceso de compartir un mantenimiento.
//
// RELACIONES:
//
// 1. firebase.js
//    → ORG\src\js\services\firebase\firebase.js
//
// 2. utils.js
//    → ORG\src\js\botones\utils.js
//
// 3. sharePointUrls.js
//    → ORG\src\js\services\onedrive\sharepointUrls.js
//
// RELACIÓN:
//
// compartir.js
//      ↓
// firebaseCompartir.js
//      ├── firebase.js
//      ├── utils.js
//      └── sharePointUrls.js
// ------------------------------------------------------

import {
    guardarMantenimiento,
    actualizarMantenimiento,
    eliminarMantenimiento,
} from "../../services/firebase/firebase.js";

import { FirebaseError } from "../utils.js";

import { normalizarUrlSharePoint } from "../../services/onedrive/sharepointUrls.js";

// ------------------------------------------------------
// GUARDAR MANTENIMIENTO
// ------------------------------------------------------

export async function guardarCompartir(data) {
    console.log("🔥 [FIREBASE] Guardando mantenimiento...");

    const id = await guardarMantenimiento(data);

    if (!id) {
        throw new FirebaseError();
    }

    console.log("✅ [FIREBASE] Mantenimiento guardado:", id);

    return id;
}

// ------------------------------------------------------
// ACTUALIZAR MANTENIMIENTO
// ------------------------------------------------------

export async function actualizarCompartir(
    idMantenimiento,
    resultado,
    nombreArchivo,
    rutaCarpeta,
) {
    console.log("🔥 [FIREBASE] Actualizando mantenimiento...");

    await actualizarMantenimiento(idMantenimiento, {
        urlSharePoint: normalizarUrlSharePoint(resultado.url),

        nombreArchivoSharePoint: nombreArchivo,

        rutaCarpetaSharePoint: rutaCarpeta,

        accionSharePoint: resultado.accion || "subido",
    });

    console.log("✅ [FIREBASE] Mantenimiento actualizado");
}

// ------------------------------------------------------
// ELIMINAR MANTENIMIENTO
// ------------------------------------------------------

export async function eliminarCompartir(idMantenimiento) {
    if (!idMantenimiento) {
        return;
    }

    console.log("🗑️ [FIREBASE] Eliminando registro:", idMantenimiento);

    await eliminarMantenimiento(idMantenimiento);

    console.log("✅ [FIREBASE] Registro eliminado");
}
