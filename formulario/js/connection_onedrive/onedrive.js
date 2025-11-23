

export function subirAOneDriveConProgreso(nombreArchivo, rutaCarpeta, base64, onProgress) {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        const url = "https://defaultbfe754eff26f45e7a1813f5c911075.cd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1985990ce0344ac9ab6d7222e0f90f61/triggers/manual/paths/invoke?api-version=2024-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=e_nfxYAhkqaQAn9RzEgXDnaH2AOefsXGPnRPEwjtr4I";

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
                const rutaReal = xhr.responseText.trim();
                resolve({
                    ok: true,
                    url: `https://orgcardenas-my.sharepoint.com/:f:/g/personal/jrodriguez_organizacioncardenas_com_co/Eo33syZaKEZEnhN3aaEHRRwBUFS-AawZ_s13Zys03BKWVA?e=7Qjvci${rutaReal}`
                });
            } else {
                resolve({ ok: false, url: "Error al enviar a OneDrive" });
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



