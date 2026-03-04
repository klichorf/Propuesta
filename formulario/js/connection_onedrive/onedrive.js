

export function subirAOneDriveConProgreso(nombreArchivo, rutaCarpeta, base64, onProgress) {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        //const url = "https://defaultbfe754eff26f45e7a1813f5c911075.cd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1985990ce0344ac9ab6d7222e0f90f61/triggers/manual/paths/invoke?api-version=2024-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=e_nfxYAhkqaQAn9RzEgXDnaH2AOefsXGPnRPEwjtr4I";
        const url = "https://defaultbfe754eff26f45e7a1813f5c911075.cd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/3571492a13504bd0aacab318aa16fe32/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FoKG6grOgOJXJBVb_J5qwRSveyaQuGT1tdzguqknVTE";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // 📌 Evento de progreso real
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && typeof onProgress === "function") {
                const porcentaje = Math.round((event.loaded / event.total) * 100);
                onProgress(porcentaje);
            }
        };
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let respuesta;

                try {
                    respuesta = JSON.parse(xhr.responseText);
                } catch {
                    reject("Respuesta inválida del flujo");
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
                resolve({ ok: false, mensaje: "Error HTTP" });
            }
        };


        xhr.onerror = () => reject("Error de red en la subida");

        const cuerpo = JSON.stringify({
            nombreArchivo,
            rutaCarpeta,
            contenidoBase64: base64
        });

        xhr.send(cuerpo);
    });
}



