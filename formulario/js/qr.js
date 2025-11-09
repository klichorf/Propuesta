// -------------------------
// MÓDULO QR / SOLO LECTURA
// -------------------------

export function initQRBarcode() {
    const btnQR = document.getElementById("btnQR");
    const qrModalEl = document.getElementById("modalQR");
    const qrDivId = "QR";
    const inputCodigo = document.getElementById("codigo");

    if (!btnQR || !qrModalEl || !inputCodigo) return;

    const bootstrapModal = new bootstrap.Modal(qrModalEl);
    let html5QrCode = null;

    // Abrir modal al hacer clic en el botón
    btnQR.addEventListener("click", () => bootstrapModal.show());

    // Iniciar escaneo al abrir modal
    qrModalEl.addEventListener("shown.bs.modal", () => {
        if (typeof Html5Qrcode === "undefined") {
            console.error("Html5Qrcode no cargado. Verifica el CDN.");
            return;
        }

        html5QrCode = new Html5Qrcode(qrDivId);

        Html5Qrcode.getCameras()
            .then(cameras => {
                if (!cameras || !cameras.length) {
                    alert("No se detectó ninguna cámara.");
                    return;
                }

                const cameraId = cameras[0].id;

                html5QrCode.start(
                    cameraId,
                    { fps: 10, qrbox: 250, formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE] },
                    decodedText => {
                        inputCodigo.value = decodedText; // colocar resultado
                        html5QrCode.stop().then(() => bootstrapModal.hide()); // detener y cerrar
                    },
                    errorMessage => {
                        // ignorar errores de cada frame
                    }
                );
            })
            .catch(err => console.error("Error al obtener cámaras:", err));
    });

    // Detener cámara si se cierra modal
    qrModalEl.addEventListener("hidden.bs.modal", () => {
        if (html5QrCode) html5QrCode.stop().catch(() => {});
    });
}

