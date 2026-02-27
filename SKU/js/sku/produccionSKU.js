import { materiales } from "./datos.js";
import { guardarProduccion, obtenerTotalUnidadesPorSKU } from "../connection_db/firebaseSKU.js";

let materialActual = null;

export function initProduccionSKU() {
  const inputCodigo = document.getElementById("codigo");
  const material = document.getElementById("material");
  const descripcion = document.getElementById("descripcion");
  const marca = document.getElementById("marca");
  const presentacion = document.getElementById("presentacion");
  const inputPacas = document.getElementById("pacas");
  const inputSueltas = document.getElementById("sueltas");
  const inputTotal = document.getElementById("totalUnidades");
  const infoUnidades = document.getElementById("infoUnidades");
  const infopacas = document.getElementById("infopacas");
  const totalAcumuladoEl = document.getElementById("totalAcumulado"); // 👈 nuevo

  const btnGuardar = document.getElementById("btnGuardarProduccion");

  if (!inputCodigo || !material || !descripcion || !marca || !presentacion || !btnGuardar) {
    console.warn("⚠️ Producción SKU: faltan elementos en el DOM");
    return;
  }

  async function buscarYMostrar(codigo) {
    materialActual = materiales.find(m =>
      m.material === codigo.trim() ||
      m.sku === codigo.trim()
    );

    if (!materialActual) {
      material.value = "";
      descripcion.value = "";
      marca.value = "";
      presentacion.value = "";
      inputTotal.value = "";
      infoUnidades.value = "";
      infopacas.value = "";
      if (totalAcumuladoEl) totalAcumuladoEl.textContent = "0";
      btnGuardar.disabled = true;
      return;
    }

    material.value = materialActual.material;
    descripcion.value = materialActual.texto;
    marca.value = materialActual.marca;
    presentacion.value = materialActual.presentacion;
    infoUnidades.value = materialActual.unidades;
    infopacas.value = materialActual.pacas;
    btnGuardar.disabled = false;

    calcularTotal();

    // 🔥 CONSULTAR TOTAL ACUMULADO EN FIREBASE
    try {
      const totalAcumulado = await obtenerTotalUnidadesPorSKU(materialActual.sku);
      if (totalAcumuladoEl) {
        totalAcumuladoEl.textContent = totalAcumulado;
      }
    } catch (e) {
      console.error("Error consultando acumulado:", e);
      if (totalAcumuladoEl) totalAcumuladoEl.textContent = "—";
    }
  }

  function calcularTotal() {
    if (!materialActual) return;

    const pacas = Math.max(0, Number(inputPacas.value) || 0);
    const sueltas = Math.max(0, Number(inputSueltas.value) || 0);

    const unidadesPorPaca = materialActual.unidades;
    const total = (pacas * unidadesPorPaca) + sueltas;

    inputTotal.value = total;
  }

  inputCodigo.addEventListener("input", () => buscarYMostrar(inputCodigo.value));
  document.addEventListener("sku:scan", (e) => buscarYMostrar(e.detail));

  inputPacas.addEventListener("input", calcularTotal);
  inputSueltas.addEventListener("input", calcularTotal);

  btnGuardar.addEventListener("click", async () => {
    if (!materialActual) {
      alert("Primero escanea o digita un SKU válido");
      return;
    }

    const total = Number(inputTotal.value);
    if (!total || total <= 0) {
      alert("Ingresa pacas o unidades sueltas válidas");
      return;
    }

    await guardarProduccion({
      material: materialActual.material,
      sku: materialActual.sku,
      descripcion: materialActual.texto,
      marca: materialActual.marca,
      pacas: Number(inputPacas.value) || 0,
      sueltas: Number(inputSueltas.value) || 0,
      unidades: total,
      fecha: new Date()
    });

    inputPacas.value = "";
    inputSueltas.value = "";
    inputTotal.value = "";

    // 🔄 Refrescar acumulado después de guardar
    const nuevoTotal = await obtenerTotalUnidadesPorSKU(materialActual.sku);
    if (totalAcumuladoEl) totalAcumuladoEl.textContent = nuevoTotal;

    // 🧹 LIMPIAR FORMULARIO COMPLETO
    inputCodigo.value = "";
    material.value = "";
    descripcion.value = "";
    marca.value = "";
    presentacion.value = "";
    infoUnidades.value = "";
    infopacas.value = "";
    inputPacas.value = "";
    inputSueltas.value = "";
    inputTotal.value = "";
    btnGuardar.disabled = true;

// 🧼 Limpiar acumulado visual
if (totalAcumuladoEl) totalAcumuladoEl.textContent = "—";

    // (opcional) volver a enfocar el input para el siguiente escaneo
    inputCodigo.focus();

    alert("✅ Producción guardada");
  });
}