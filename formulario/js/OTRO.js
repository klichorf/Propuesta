export function initQRScanner() {
    const btnQR = document.getElementById("btnQR");
    const qrModal = document.getElementById("QR-modal");
    const closeBtn = document.getElementById("closeQR");
    const inputCodigo = document.getElementById("codigo");
    const qrDiv = document.getElementById("QR");

    if (!btnQR || !qrModal || !closeBtn || !inputCodigo || !qrDiv) return;

    let html5QrScanner = new Html5Qrcode("QR");
    let scannerRunning = false;

    btnQR.addEventListener("click", async () => {
        try {
            const devices = await Html5Qrcode.getCameras();
            if (!devices || devices.length === 0) {
                alert("No se detectó ninguna cámara.");
                return;
            }
        } catch {
            alert("No se pudo acceder a la cámara.");
            return;
        }

        // Mostrar modal
        qrModal.classList.add("show");

        html5QrScanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                inputCodigo.value = decodedText;
                stopScanner();
            }
        ).then(() => {
            scannerRunning = true;
        }).catch(err => {
            alert("Error iniciando la cámara.");
            console.error(err);
            stopScanner();
        });
    });

    closeBtn.addEventListener("click", () => {
        stopScanner();
    });

    function stopScanner() {
        if (scannerRunning) {
            html5QrScanner.stop().catch(()=>{});
            scannerRunning = false;
        }
        // Ocultar modal
        qrModal.classList.remove("show");
    }
}
