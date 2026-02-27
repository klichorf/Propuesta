// js/sku/main.js
import {initQRProduccion } from "./produccionSKU.js";
import { initImprimirQR } from "./generarQR.js";
import { generarPdfEtiqueta } from "./pdfEtiqueta.js";

document.getElementById("btnDescargarPDF").addEventListener("click", () => {
  generarPdfEtiqueta();
});

document.addEventListener("DOMContentLoaded", async () => {
  const inicializaciones = [
    { fn: initQRProduccion, name: "initQRProduccion" },
    { fn: initImprimirQR, name: "initImprimirQR" }
  ];

  for (const { fn, name } of inicializaciones) {
    try {
      await fn();
      console.log(`✅ ${name} listo`);
    } catch (e) {
      console.error(`⛔ Error en ${name}:`, e);
    }
  }
});