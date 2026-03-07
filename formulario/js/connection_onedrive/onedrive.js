// onedrive.js
import { SharePointError } from "../botones/utils.js";

export function subirAOneDriveConProgreso(nombreArchivo, rutaCarpeta, base64, onProgress) {
  return new Promise((resolve, reject) => {
    const url =  "https://defaultbfe754eff26f45e7a1813f5c911075.cd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/3571492a13504bd0aacab318aa16fe32/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FoKG6grOgOJXJBVb_J5qwRSveyaQuGT1tdzguqknVTE";


    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.timeout = 120000; // 2 minutos

    // Progreso inicial
    if (typeof onProgress === "function") {
      onProgress(1);
    }

    // 📊 progreso real de subida
    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const porcentaje = Math.round((event.loaded / event.total) * 100);
      if (typeof onProgress === "function") {
        onProgress(porcentaje);
      }
    };

    // ✔ respuesta del flujo
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let respuesta;
        try {
          respuesta = JSON.parse(xhr.responseText);
        } catch {
          reject(new SharePointError("Respuesta inválida del flujo"));
          return;
        }

        if (respuesta.estado === "ok") {
          resolve({
            ok: true,
            accion: respuesta.accion,
            url: respuesta.url
          });
        } else {
          resolve({
            ok: false,
            mensaje: respuesta.mensaje || "Error en OneDrive"
          });
        }
      } else {
        reject(new SharePointError(`Error HTTP ${xhr.status}`));
      }
    };

    // Manejo de errores
    xhr.onerror = () => reject(new SharePointError("Error de red en la subida"));
    xhr.ontimeout = () => reject(new SharePointError("Tiempo de espera agotado en la subida"));

    // Enviar datos
    const cuerpo = JSON.stringify({ nombreArchivo, rutaCarpeta, contenidoBase64: base64 });
    xhr.send(cuerpo);
  });
}