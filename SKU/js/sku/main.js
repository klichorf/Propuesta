// js/sku/main.js
import { initProduccionSKU } from "./produccionSKU.js";
import { initQRProduccion } from "./qrProduccion.js";



document.addEventListener("DOMContentLoaded", async () => {

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



import { descargarExcelPorFecha } from "../reportes/reporteSKU.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnDescargarExcel = document.getElementById("btnDescargarExcel");

  if (btnDescargarExcel) {
    btnDescargarExcel.addEventListener("click", async () => {
      const inicio = document.getElementById("fechaInicio").value;
      const fin = document.getElementById("fechaFin").value;

      if (!inicio || !fin) {
        alert("Selecciona un rango de fechas");
        return;
      }

      await descargarExcelPorFecha(inicio, fin);
    });
  }
});