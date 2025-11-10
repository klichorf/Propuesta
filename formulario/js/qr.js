export function initQRScanner() {
    const btnQR = document.getElementById("btnQR");
    const qrModal = document.getElementById("QR-modal");
    const closeBtn = document.getElementById("closeQR");
    const inputCodigo = document.getElementById("codigo");
    const qrDiv = document.getElementById("QR");

    if (!btnQR || !qrModal || !closeBtn || !inputCodigo || !qrDiv) return;

    let html5QrScanner = new Html5Qrcode("QR");
    let scannerRunning = false;

    // -------------------- Cambiar icono al hover --------------------
    const icon = closeBtn.querySelector("i");

    closeBtn.addEventListener("mouseenter", () => {
        icon.classList.remove("bi-x-square");
        icon.classList.add("bi-x-circle");
    });

    closeBtn.addEventListener("mouseleave", () => {
        icon.classList.remove("bi-x-circle");
        icon.classList.add("bi-x-square");
    });

    // -------------------- Botón para abrir el QR --------------------
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

    // -------------------- Botón de cerrar --------------------
    closeBtn.addEventListener("click", () => {
        stopScanner();
    });

    function stopScanner() {
        if (scannerRunning) {
            html5QrScanner.stop().catch(()=>{});
            scannerRunning = false;
        }
        qrModal.classList.remove("show");
    }
}
