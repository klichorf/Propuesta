// js/sku/lote.js
export function obtenerSemanaJuliana(fecha = new Date()) {
  const inicioAnio = new Date(fecha.getFullYear(), 0, 1);
  const dias = Math.floor((fecha - inicioAnio) / (24 * 60 * 60 * 1000));
  return Math.ceil((dias + inicioAnio.getDay() + 1) / 7);
}

export function generarLoteLocal(consecutivo = 1) {
  const hoy = new Date();

  const semana = String(obtenerSemanaJuliana(hoy)).padStart(2, "0");
  const anio = String(hoy.getFullYear()).slice(-1);
  const cc = String(consecutivo).padStart(2, "0");

  return `${semana}${anio}${cc}`;  // ej: 08622
}