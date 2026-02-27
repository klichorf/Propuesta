// js/sku/qrProduccion.js
import { generarLoteLocal } from "./lote.js";

let qr = null;

export function initQRProduccion() {
  const inputCodigo = document.getElementById("codigo");
  const inputLote = document.getElementById("inputLote"); // puede ser hidden
  const consecutivoInput = document.getElementById("consecutivoLote");
  const labelLote = document.getElementById("labelLote");
  const labelLoteValor = document.getElementById("labelLoteValor");
  const qrPrint = document.getElementById("qrPrint");
  const btnImprimirQR = document.getElementById("btnImprimirQR");

  if (!inputCodigo || !consecutivoInput || !inputLote || !qrPrint || !btnImprimirQR) {
    console.error("❌ No se encontraron elementos del formulario de QR");
    return;
  }

  // 👉 Llenar el select con 01..99
  consecutivoInput.innerHTML = "";
  for (let i = 1; i <= 99; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = String(i).padStart(2, "0");
    consecutivoInput.appendChild(opt);
  }
  consecutivoInput.value = "1"; // valor por defecto

  function generar() {
    const sku = inputCodigo.value.trim();
    if (!sku) return;

    let consecutivo = parseInt(consecutivoInput.value || "1", 10);
    if (consecutivo < 1) consecutivo = 1;
    if (consecutivo > 99) consecutivo = 99;

    const lote = generarLoteLocal(consecutivo);

    // UI: solo el lote
    inputLote.value = lote;
    labelLoteValor.textContent = lote;
    labelLote.style.display = "block";

    // QR: SKU + LOTE
    const dataQR = JSON.stringify({
      sku,
      lote,
 
    });

    qrPrint.innerHTML = "";

    qr = new window.QRCode(qrPrint, {
      text: dataQR,   // 👈 QR lleva SKU + LOTE
      width: 180,
      height: 180
    });
  }

  consecutivoInput.addEventListener("change", generar);
  inputCodigo.addEventListener("change", generar);

  btnImprimirQR.addEventListener("click", () => {
    window.print();
  });
}