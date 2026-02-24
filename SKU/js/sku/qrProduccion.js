import { buscarMaterial, mostrarInfo } from "./funciones.js";
import { mostrarToast } from "../toast.js";

export async function initQRProduccion() {
  const btnQR = document.getElementById("btnQR");
  const qrModal = document.getElementById("QR-modal");
  const closeQR = document.getElementById("closeQR");

  const inputCodigo = document.getElementById("codigo");
  const inputLote = document.getElementById("inputLote");   // 👈 casilla del lote
  const labelLote = document.getElementById("labelLote");
  const labelLoteValor = document.getElementById("labelLoteValor");

  let html5QrCode = null;

  btnQR.addEventListener("click", async () => {
    qrModal.style.display = "block";
    closeQR.classList.remove("d-none");

    if (!html5QrCode) {
      html5QrCode = new Html5Qrcode("QR");
    }

    await html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        let data;

        // 👉 El QR viene como JSON
        try {
          data = JSON.parse(decodedText);
        } catch (e) {
          mostrarToast("QR inválido", "danger");
          return;
        }

        const { sku, lote } = data;

        if (!sku || !lote) {
          mostrarToast("QR incompleto", "danger");
          return;
        }

        // ✅ SKU al input
        inputCodigo.value = sku;

        // ✅ Buscar info del material

        document.dispatchEvent(new CustomEvent("sku:scan", { detail: sku }));

        // ✅ Guardar lote en su casilla
        inputLote.value = lote;

        // ✅ Mostrar lote en label
        labelLoteValor.textContent = lote;
        labelLote.style.display = "block";

        mostrarToast(`QR leído ✔️ Lote: ${lote}`, "success");

        html5QrCode.stop();
        qrModal.style.display = "none";
        closeQR.classList.add("d-none");
      }
    );
  });

  closeQR.addEventListener("click", async () => {
    if (html5QrCode) await html5QrCode.stop();
    qrModal.style.display = "none";
    closeQR.classList.add("d-none");
  });
}