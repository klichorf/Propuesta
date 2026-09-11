// ------------------------------------------------------
// ARCHIVO:
// ORG\src\js\botones\compartir\subirDocumentoCompartir.js
//
// RESPONSABILIDAD:
// Gestionar la subida del documento PDF a SharePoint.
//
// RELACIONES:
//
// 1. onedrive.js
//    → ORG\src\js\services\onedrive\onedrive.js
//
//    Utiliza:
//    subirAOneDriveConProgreso()
//
// FLUJO:
//
// compartir.js
//      ↓
// subirDocumentoCompartir.js
//      ↓
// onedrive.js
//      ↓
// subirAOneDriveConProgreso()
//      ↓
// SharePoint
// ------------------------------------------------------

import { subirAOneDriveConProgreso } from "../../services/onedrive/onedrive.js";

// ------------------------------------------------------
// SUBIR DOCUMENTO
// ------------------------------------------------------

export async function subirDocumentoCompartir(
    nombreArchivo,
    rutaCarpeta,
    base64,
    actualizarProgreso,
) {
    console.log("☁️ [SHAREPOINT] Iniciando subida...");

    console.log("📁 [SHAREPOINT] Archivo:", nombreArchivo);

    console.log("📂 [SHAREPOINT] Ruta:", rutaCarpeta);

    const resultado = await subirAOneDriveConProgreso(
        nombreArchivo,
        rutaCarpeta,
        base64,
        actualizarProgreso,
    );

    console.log("✅ [SHAREPOINT] Resultado:", resultado);

    if (!resultado.ok || !resultado.url) {
        console.error("❌ [SHAREPOINT] No se obtuvo URL");

        throw new Error("La subida a SharePoint falló");
    }

    console.log("🔗 [SHAREPOINT] URL obtenida correctamente");

    return resultado;
}
