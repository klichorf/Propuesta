import { seleccionarPorCodigo } from "./seleccionadorPorCodigo.js";

export function initQRScanner() {
  const btnQR = document.getElementById("btnQR");
  const qrModal = document.getElementById("QR-modal");
  const closeBtn = document.getElementById("closeQR");
  const inputCodigo = document.getElementById("codigo");
  const qrDiv = document.getElementById("QR");

  if (!btnQR || !qrModal || !closeBtn || !inputCodigo || !qrDiv) return;

  const scanner = new Html5Qrcode("QR");
  let activo = false;

  // -------------------- Abrir escáner --------------------
  btnQR.addEventListener("click", async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (!devices.length) {
        alert("No se detectó ninguna cámara.");
        return;
      }
    } catch {
      alert("No se pudo acceder a la cámara.");
      return;
    }

    qrModal.style.display = "block";
    closeBtn.classList.remove("d-none");

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (text) => {
        const codigo = text.trim();
        inputCodigo.value = codigo;

        if (!seleccionarPorCodigo(codigo)) {
          alert("⚠️ Código no registrado");
        }

        detener();
      }
    ).then(() => activo = true)
     .catch(() => detener());
  });

  // -------------------- Cerrar escáner --------------------
  closeBtn.addEventListener("click", detener);

  function detener() {
    if (activo) scanner.stop().catch(() => {});
    activo = false;
    qrModal.style.display = "none";
    closeBtn.classList.add("d-none");
  }

  // -------------------- Digitado manual --------------------
  inputCodigo.addEventListener("change", () => {
    const codigo = inputCodigo.value.trim();
    if (!seleccionarPorCodigo(codigo)) {
      alert("⚠️ Código no registrado");
    }
  });
}
