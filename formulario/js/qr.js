export function initQRScanner() {
    const btnQR = document.getElementById("btnQR");
    const modalEl = document.getElementById("modalQR");
    const inputCodigo = document.getElementById("codigo");
    const qrDiv = document.getElementById("QR");

    if (!btnQR || !modalEl || !inputCodigo || !qrDiv) return;

    let html5QrScanner = null;

    btnQR.addEventListener("click", () => {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();

        // Limpiar el div QR
        qrDiv.innerHTML = "";

        if (!html5QrScanner) {
            html5QrScanner = new Html5Qrcode("QR");
        }

        // Intentar usar la cámara
        html5QrScanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                inputCodigo.value = decodedText;
                html5QrScanner.stop();
                modal.hide();
            },
            (errorMessage) => {
                // ignoramos errores de lectura en tiempo real
            }
        ).catch(err => {
            console.warn("No hay cámara disponible. Se usará selector de archivo.", err);

            // Alternativa: selector de archivo
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        const result = await Html5Qrcode.scanFile(file, true);
                        inputCodigo.value = result;
                        modal.hide();
                    } catch (err) {
                        console.error("Error leyendo QR desde archivo:", err);
                    }
                }
            };
            fileInput.click();
        });
    });
}
