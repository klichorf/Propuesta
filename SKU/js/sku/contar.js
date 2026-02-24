// js/sku/contar.js
let unidadesPorPaca = 0;
let produccion = {
  pacas: 0,
  sueltas: 0,
  total: 0
};

export function setUnidadesPorPaca(valor) {
  unidadesPorPaca = Number(valor) || 0;
}

export function calcularProduccion(pacas, sueltas = 0) {
  produccion.pacas = Math.max(0, Number(pacas) || 0);
  produccion.sueltas = Math.max(0, Number(sueltas) || 0);
  produccion.total = (produccion.pacas * unidadesPorPaca) + produccion.sueltas;
  return produccion.total;
}

export function getProduccionData() {
  return produccion;
}
