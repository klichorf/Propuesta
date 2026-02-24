// js/sku/main.js
import { initProduccionSKU } from "./produccionSKU.js";
import { initQRProduccion } from "./qrProduccion.js";


document.addEventListener("DOMContentLoaded", async () => {
  console.log("➡️ INICIANDO DOMContentLoaded - SKU");

  const inicializaciones = [
    { fn: initProduccionSKU, name: "initProduccionSKU" },
    { fn: initQRProduccion, name: "initQRProduccion" }
  ];

  for (const { fn, name } of inicializaciones) {
    try {
      console.log(`🔹 Inicializando ${name}`);
      await fn();               // por si alguna es async
      console.log(`✅ ${name} inicializado`);
    } catch (e) {
      console.error(`⛔ Error en ${name}:`, e);
    }
  }
});
