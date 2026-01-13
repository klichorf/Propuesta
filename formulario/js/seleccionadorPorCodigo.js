import { datosPlantas } from "./selects.js";

function seleccionarPorCodigo(codigo) {
  const plantaSelect = document.getElementById("planta");
  const areaSelect = document.getElementById("area");
  const equipoSelect = document.getElementById("equipo");

  for (const planta in datosPlantas) {
    for (const area in datosPlantas[planta]) {
      const equipo = datosPlantas[planta][area].find(
        (e) => e.codigo === codigo
      );

      if (equipo) {
        plantaSelect.value = planta;
        plantaSelect.dispatchEvent(new Event("change"));

        setTimeout(() => {
          areaSelect.value = area;
          areaSelect.dispatchEvent(new Event("change"));

          setTimeout(() => {
            equipoSelect.value = codigo;
          }, 50);
        }, 50);

        return true;
      }
    }
  }
  return false;
}

export { seleccionarPorCodigo };
