// qr.js
export function initQRBarcode() {
    const qrModalEl = document.getElementById("modalQR");
    const qrElementId = "QR";       // div donde se muestra la cámara
    const inputCodigo = document.getElementById("codigo"); // input para el resultado

    let html5QrCode = null;

    // Abrir modal y empezar escaneo
    const bootstrapModal = new bootstrap.Modal(qrModalEl);
    const btnQR = document.getElementById("btnQR");

    btnQR.addEventListener("click", () => {
        bootstrapModal.show();
    });

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
                    { fps: 10, qrbox: 250 },
                    decodedText => {
                        inputCodigo.value = decodedText;
                        // cerrar modal automáticamente
                        html5QrCode.stop().then(() => bootstrapModal.hide());
                    },
                    errorMessage => {
                        // solo consola, no interfiere
                        console.warn("QR no detectado:", errorMessage);
                    }
                );
            })
            .catch(err => console.error("Error al obtener cámaras:", err));
    });

    qrModalEl.addEventListener("hidden.bs.modal", () => {
        if (html5QrCode) {
            html5QrCode.stop().catch(() => {});
        }
    });
}

