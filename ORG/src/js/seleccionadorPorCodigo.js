import { datosPlantas } from "./selects.js";

let actualizandoSelects = false;

function seleccionarPorCodigo(codigo) {

  // evitar ciclos
  if (actualizandoSelects) return false;

  actualizandoSelects = true;

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

            // solo actualizar si es diferente
            if (equipoSelect.value !== codigo) {
              equipoSelect.value = codigo;
            }

            actualizandoSelects = false;

          }, 50);

        }, 50);

        return true;
      }
    }
  }

  actualizandoSelects = false;
  return false;
}

export { seleccionarPorCodigo };