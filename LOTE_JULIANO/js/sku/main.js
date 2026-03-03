// js/sku/main.js
import {initQRProduccion } from "./produccionSKU.js";
import { initImprimirQR } from "./generarQR.js";
import { generarPdfEtiqueta } from "./pdfEtiqueta.js";

import { guardarProduccion } from "../connection_db/firebaseSKU.js";
import { materiales } from "./datos.js";

document.getElementById("btnDescargarPDF").addEventListener("click", async () => {
  const codigo = document.getElementById("codigo").value.trim();

  if (!codigo) {
    alert("Debes ingresar un SKU");
    return;
  }

  const producto = materiales.find(m => m.material === codigo || m.sku === codigo);

  if (!producto) {
    alert("SKU no encontrado");
    return;
  }

  const hoy = new Date();
  const venc = new Date(hoy);
  venc.setMonth(venc.getMonth() + 18);

  const data = {
    sku: producto.sku,
    material: producto.material,
    descripcion: producto.texto,
    marca: producto.marca,
    pacas: producto.pacas,
    unidades: producto.unidades,
    fechaProduccion: hoy.toLocaleDateString("es-CO"),
    fechaVencimiento: venc.toLocaleDateString("es-CO"),
  };

  const id = await guardarProduccion(data);

  if (id) {
    await generarPdfEtiqueta();
  }
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