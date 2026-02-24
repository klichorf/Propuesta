import { materiales } from "./datos.js";
import { guardarProduccion } from "../connection_db/firebaseSKU.js";

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
  const infopacas = document.getElementById("infopacas")


  const btnGuardar = document.getElementById("btnGuardarProduccion");

  if (!inputCodigo || !material || !descripcion || !marca || !presentacion || !btnGuardar || !inputPacas || !inputSueltas || !inputTotal) {
    console.warn("⚠️ Producción SKU: faltan elementos en el DOM");
    return;
  }

  function buscarYMostrar(codigo) {
    materialActual = materiales.find(m => m.material === codigo.trim());

    if (!materialActual) {
      material.value = "";
      descripcion.value = "";
      marca.value = "";
      presentacion.value = "";
      inputTotal.value = "";
      infoUnidades.value="";
      infopacas.value="";      
      btnGuardar.disabled = true;
      return;
    }

    material.value = materialActual.material;
    descripcion.value = materialActual.texto;
    marca.value = materialActual.marca;
    presentacion.value = materialActual.presentacion;
    infoUnidades.value = materialActual.unidades;
    infopacas.value = materialActual.pacas
    btnGuardar.disabled = false;

    calcularTotal();
  }

  function calcularTotal() {
    if (!materialActual) return;

    const pacas = Math.max(0, Number(inputPacas.value) || 0);
    const sueltas = Math.max(0, Number(inputSueltas.value) || 0);

    const unidadesPorPaca = materialActual.unidades; // 25 o 48 según material
    const total = (pacas * unidadesPorPaca) + sueltas;

    inputTotal.value = total;
  }

  inputCodigo.addEventListener("input", () => {
    buscarYMostrar(inputCodigo.value);
  });

  document.addEventListener("sku:scan", (e) => {
    buscarYMostrar(e.detail);
  });

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

    alert("✅ Producción guardada");
  });
}  