// ------------------------------------------------------
// ARCHIVO:
// ORG/src/js/botones/compartir/documentoCompartir.js
//
// RESPONSABILIDAD:
// Generar el PDF y convertirlo a Base64.
//
// RELACIONES:
//
// 1. generarPDF
//    ← Recibido como parámetro desde:
//    ORG\src\js\botones\compartir\compartir.js
//
// 2. convertirArchivoABase64
//    → Importado desde:
//    ORG\src\js\botones\utils.js
//
// FLUJO:
//
// compartir.js
//      ↓
// documentoCompartir.js
//      ↓
// generarPDF()
//      ↓
// convertirArchivoABase64()
//      ↓
// Base64
// ------------------------------------------------------

import { convertirArchivoABase64 } from "../../botones/utils.js";

// ------------------------------------------------------
// GENERAR Y PREPARAR DOCUMENTO
// ------------------------------------------------------

export async function prepararDocumento(generarPDF) {
    console.log("📄 [PDF] Generando documento...");

    const file = await generarPDF();

    console.log("✅ [PDF] Documento generado");

    console.log("🔄 [PDF] Convirtiendo documento...");

    const base64 = await convertirArchivoABase64(file);

    console.log("✅ [PDF] Documento convertido");

    return base64;
}
