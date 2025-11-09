// -------------------------
// MÓDULO QR / BARCODE
// -------------------------

let lastQR = ""; // guardamos el último código escaneado

function initQRBarcode() {
    const qrModalEl = document.getElementById("modalQR");
    const qrElementId = "QR";       // div donde se muestra la cámara
    const inputCodigo = document.getElementById("codigo");
    const btnQR = document.getElementById("btnQR");

    if (!qrModalEl || !qrElementId || !btnQR || !inputCodigo) return;

    let html5QrCode = null;
    const bootstrapModal = new bootstrap.Modal(qrModalEl);

    // Abrir modal al hacer clic
    btnQR.addEventListener("click", () => bootstrapModal.show());

    // Iniciar cámara cuando se abre modal
    qrModalEl.addEventListener("shown.bs.modal", () => {
        if (typeof Html5Qrcode === "undefined") {
            console.error("html5-qrcode no cargado. Verifica el CDN.");
            return;
        }

        html5QrCode = new Html5Qrcode(qrElementId);

        Html5Qrcode.getCameras()
            .then(devices => {
                if (!devices || !devices.length) {
                    alert("No se detectó ninguna cámara.");
                    return;
                }

                const cameraId = devices[0].id;

                html5QrCode.start(
                    cameraId,
                    { fps: 10, qrbox: 250, formatsToSupport: [Html5QrcodeSupportedFormats.ALL_FORMATS] },
                    decodedText => {
                        // Solo procesar si cambió
                        if (decodedText !== lastQR) {
                            lastQR = decodedText;
                            inputCodigo.value = decodedText;
                        }
                        // Opcional: cerrar modal automáticamente
                        html5QrCode.stop().then(() => bootstrapModal.hide());
                    },
                    errorMessage => {
                        // Ignorar errores de frame
                    }
                );
            })
            .catch(err => console.error("Error al obtener cámaras:", err));
    });

    // Detener cámara si se cierra modal
    qrModalEl.addEventListener("hidden.bs.modal", () => {
        if (html5QrCode) {
            html5QrCode.stop().catch(() => {});
        }
    });
}

// -------------------------
// EXPORTAR
// -------------------------
export { initQRBarcode, lastQR };

