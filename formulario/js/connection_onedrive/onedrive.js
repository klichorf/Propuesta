// ------------------------------------------------------
// MÓDULO: SUBIDA A ONEDRIVE VIA POWER AUTOMATE
// ------------------------------------------------------

import { mostrarToast } from "../toast.js";

export async function subirAOneDrive(nombreArchivo, rutaCarpeta, base64) {
    try {
        const response = await fetch(
            "https://defaultbfe754eff26f45e7a1813f5c911075.cd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1985990ce0344ac9ab6d7222e0f90f61/triggers/manual/paths/invoke?api-version=2024-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=e_nfxYAhkqaQAn9RzEgXDnaH2AOefsXGPnRPEwjtr4I",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombreArchivo, rutaCarpeta, contenidoBase64: base64 })
            }
        );

        if (!response.ok) {
            const texto = await response.text();
            console.error("❌ Respuesta no OK de Power Automate:", texto);
            throw new Error(texto);
        }

        const json = await response.json();

        // 🔹 Construir URL final tal como espera Firebase
        const baseUrl = "https://orgcardenas-my.sharepoint.com/:f:/g/personal/jrodriguez_organizacioncardenas_com_co/EkKSzBYCyptNvoTPD19Pnu4BTvY2R1pW-1s1FdsBUDPNIg";
        let urlSharePoint = json?.Path
            ? `${baseUrl}${rutaCarpeta}/${nombreArchivo}`
            : "Error al enviar a OneDrive";

        const ok = urlSharePoint !== "Error al enviar a OneDrive";

        if (!ok) mostrarToast("⚠️ No se encontró Path en la respuesta de OneDrive.", "warning");

        return { ok, url: urlSharePoint };

    } catch (err) {
        console.error("❌ Error OneDrive:", err);
        mostrarToast("⚠️ No se pudo enviar a OneDrive.", "warning");
        return { ok: false, url: "Error al enviar a OneDrive" };
    }
}
