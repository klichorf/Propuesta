import { obtenerRegistros } from "./obtenerRegistros.js";
import { mostrarToast } from "../toast.js";
import { normalizarUrlSharePoint } from "../services/onedrive/sharepointUrls.js";

export async function abrirDetalleIntervencion(id) {
    if (!id) {
        mostrarToast("No se encontro el ID del informe.", "warning");
        return;
    }

    try {
        const registros = await obtenerRegistros();
        const registro = registros.find((item) => item.id === id);

        if (!registro) {
            mostrarToast(`No se encontro el informe con ID: ${id}`, "warning");
            return;
        }

        const urlInforme = normalizarUrlSharePoint(registro.urlSharePoint || registro.rutaArchivo);

        if (!urlInforme) {
            mostrarToast(
                "Este informe todavia no tiene enlace de SharePoint guardado. Vuelve a compartirlo para registrar la URL.",
                "warning"
            );
            return;
        }

        window.open(urlInforme, "_blank", "noopener,noreferrer");
    } catch (error) {
        console.error("Error al abrir informe de SharePoint:", error);
        mostrarToast("No se pudo abrir el informe en SharePoint.", "danger");
    }
}
