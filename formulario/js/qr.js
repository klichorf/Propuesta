export async function initQRScanner() {
    const btnQR = document.getElementById("btnQR");
    const inputCodigo = document.getElementById("codigo");
    const qrDiv = document.getElementById("QR");

    if (!btnQR || !inputCodigo || !qrDiv) return;

    let html5QrScanner = new Html5Qrcode("QR");

    btnQR.addEventListener("click", async () => {
        // Verificar cámaras
        try {
            const devices = await Html5Qrcode.getCameras();
            if (!devices || devices.length === 0) {
                alert("No se detectó ninguna cámara en este dispositivo.");
                return;
            }
        } catch (err) {
            alert("No se pudo acceder a la cámara.");
            return;
        }

        html5QrScanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                inputCodigo.value = decodedText;
                html5QrScanner.stop();
            }
        ).catch(err => {
            console.error(err);
            alert("Error iniciando la cámara.");
        });
    });
}
