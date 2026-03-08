import { buscarLote } from "../connection_db/lotes.js";
import { calcularProduccion } from "./calculosProduccion.js";
import { actualizarProduccion } from "../connection_db/firebaseOP.js";

function obtenerPesoUnidad(descripcion) {

  const match = descripcion.match(/(\d+)\s*G/i);

  if (match) {
    return Number(match[1]); // gramos
  }

  return 0;
}

let materialActual = null;

export function initProduccion() {

  const codigo = document.getElementById("codigo");

  const material = document.getElementById("material");
  const descripcion = document.getElementById("descripcion");
  const marca = document.getElementById("marca");
  const pacas_producir = document.getElementById("pacas_producir");
  const totalUnidades = document.getElementById("totalUnidades");
  const bultos = document.getElementById("bultos");
  const estibas = document.getElementById("estibas");

  const btnGuardar = document.getElementById("btnGuardarProduccion");

  let unidadesPorPaca = 0;

  async function consultarLote() {

    const lote = codigo.value.trim();
    if (!lote) return;

    const data = await buscarLote(lote);

    if (!data) {
      alert("Lote no encontrado");
      return;
    }

    materialActual = data;

    material.value = data.material;
    descripcion.value = data.descripcion;
    marca.value = data.marca;
    unidadesPorPaca = data.unidades;
  }

function calcular() {

  const pacas_producirValor = Number(pacas_producir.value) || 0;

  const unidades = pacas_producirValor * unidadesPorPaca;

  totalUnidades.value = unidades;

  // obtener peso desde la descripción
  const pesoUnidad = obtenerPesoUnidad(descripcion.value);

  const resultado = calcularProduccion(unidades, pesoUnidad);

  bultos.value = resultado.bultos;
  estibas.value = resultado.estibas;
  bultosRestantes.value = resultado.bultosRestantes;

   // Mostrar explicación
  infoCalculo.style.display = "block";

  infoCalculo.innerHTML = `
  <strong>📊 Cálculo automático:</strong><br>
  Peso unidad: ${pesoUnidad} g<br>
  Peso total: ${resultado.pesoTotal.toFixed(2)} kg<br>
  Bultos calculados considerando merma de producción. ${resultado.bultos}<br>
  Distribución: ${resultado.estibas} estibas y ${resultado.bultosRestantes} bultos.
  `;



}
  codigo.addEventListener("change", consultarLote);
  pacas_producir.addEventListener("input", calcular);

  btnGuardar.addEventListener("click", async () => {

    if (!materialActual) {
      alert("Primero escanea un lote");
      return;
    }
await actualizarProduccion({

  op: document.getElementById("op").value,
  linea: document.getElementById("linea").value,

  // producción
  pacas_producir: Number(pacas_producir.value),
  unidades: Number(totalUnidades.value),

  // resultado logístico
  bultos: Number(bultos.value),
  estibas: Number(estibas.value),

  // control
  fecha: new Date()

}, materialActual.docId);

    
  });
}



