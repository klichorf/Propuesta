// ------------------------------------------------------
// MÓDULO: ESCANEAR QR Y BARCODES
// ------------------------------------------------------
export function initQRBarcode() {
    const btnQR = document.getElementById("btnQR");
    const modalQR = document.getElementById("modalQR");
    const videoQR = document.getElementById("videoQR");

    if (!btnQR || !modalQR || !videoQR) return;

    const modal = new bootstrap.Modal(modalQR);
    let html5QrCode;

    btnQR.addEventListener("click", async () => {
        modal.show();

        // Nueva instancia de Html5Qrcode
        html5QrCode = new Html5Qrcode(videoQR.id);

        try {
            const cameras = await Html5Qrcode.getCameras();
            if (!cameras || cameras.length === 0) {
                alert("No se encontró ninguna cámara disponible.");
                return;
            }

            const cameraId = cameras[0].id;

            const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                formatsToSupport: [
                    Html5QrcodeSupportedFormats.QR_CODE,
                    Html5QrcodeSupportedFormats.CODE_128,
                    Html5QrcodeSupportedFormats.CODE_39,
                    Html5QrcodeSupportedFormats.EAN_13,
                    Html5QrcodeSupportedFormats.EAN_8,
                    Html5QrcodeSupportedFormats.UPC_A,
                    Html5QrcodeSupportedFormats.UPC_E
                ]
            };

            // Inicia escaneo de QR y barcodes
            await html5QrCode.start(
                cameraId,
                config,
                (decodedText, decodedResult) => {
                    try {
                        const data = JSON.parse(decodedText);
                        if (data.codigo) document.getElementById("codigo").value = data.codigo;
                        if (data.planta) document.getElementById("planta").value = data.planta;
                        if (data.area) document.getElementById("area").value = data.area;
                        if (data.equipo) document.getElementById("equipo").value = data.equipo;
                    } catch {
                        document.getElementById("codigo").value = decodedText.trim();
                    } finally {
                        html5QrCode.stop().then(() => modal.hide());
                    }
                },
                (errorMessage) => {
                    // Ignorar errores de lectura continua
                }
            );
        } catch (err) {
            alert("No se pudo acceder a la cámara. Se requiere permiso.");
            console.error(err);
        }

        // Apagar cámara al cerrar el modal
        modalQR.addEventListener("hidden.bs.modal", () => {
            html5QrCode?.stop().catch(() => {});
        }, { once: true });
    });
}


