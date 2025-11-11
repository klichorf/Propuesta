// ------------------------------------------------------
// MÓDULO: CÁLCULO DEL TIEMPO ENTRE FECHAS
// ------------------------------------------------------
export function initTiempo() {
  const fi = document.getElementById("fechaInicio");
  const ff = document.getElementById("fechaFin");
  const campoTiempo = document.getElementById("tiempo");

  if (!fi || !ff || !campoTiempo) {
    console.warn("⚠ initTiempo: algún elemento no se encontró en el DOM");
    return;
  }

  function calcTiempo() {
    if (!fi.value || !ff.value) {
      campoTiempo.value = "";
      return;
    }

    const inicio = new Date(fi.value);
    const fin = new Date(ff.value);

    if (isNaN(inicio) || isNaN(fin)) {
      campoTiempo.value = "";
      return;
    }

    if (fin < inicio) {
      campoTiempo.value = "⚠ Fecha fin anterior a inicio";
      return;
    }

    const diffMin = Math.floor((fin - inicio) / 60000);
    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;
    campoTiempo.value = `${horas}h ${minutos}m`;
  }

  // Detecta cualquier cambio (en tiempo real y al salir del campo)
  fi.addEventListener("input", calcTiempo);
  ff.addEventListener("input", calcTiempo);
  fi.addEventListener("change", calcTiempo);
  ff.addEventListener("change", calcTiempo);

  // Calcula de inmediato si los valores ya existen al cargar
  calcTiempo();
}

