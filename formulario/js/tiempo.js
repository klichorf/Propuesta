// ------------------------------------------------------
// MÓDULO: CÁLCULO DEL TIEMPO ENTRE FECHAS
// ------------------------------------------------------
export function initTiempo() {
  const fi = document.getElementById("fechaInicio");
  const ff = document.getElementById("fechaFin");
  const campoTiempo = document.getElementById("tiempo");

  function calcTiempo() {
    if (!fi.value || !ff.value) return;
    const inicio = new Date(fi.value);
    const fin = new Date(ff.value);

    if (fin > inicio) {
      const diffMin = (fin - inicio) / 60000;
      const horas = Math.floor(diffMin / 60);
      const minutos = Math.floor(diffMin % 60);
      campoTiempo.value = `${horas}h ${minutos}m`;
    }
  }

  fi.addEventListener("change", calcTiempo);
  ff.addEventListener("change", calcTiempo);
}
