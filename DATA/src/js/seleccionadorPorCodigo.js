import { datosPlantas } from "./selects.js";

let actualizandoSelects = false;

function seleccionarPorCodigo(codigo) {
  if (actualizandoSelects) return false;

  codigo = codigo.trim();

  if (!codigo) return false;

  actualizandoSelects = true;

  const inputCodigo = document.getElementById("codigo");

  const plantaSelect = document.getElementById("planta");

  const areaSelect = document.getElementById("area");

  const equipoSelect = document.getElementById("equipo");

  // --------------------------------------------------
  // 🔎 BUSCAR CÓDIGO
  // --------------------------------------------------

  for (const planta in datosPlantas) {
    for (const area in datosPlantas[planta]) {
      const equipo = datosPlantas[planta][area].find(
        (e) => e.codigo === codigo,
      );

      if (equipo) {
        // --------------------------------------
        // 🟢 CÓDIGO
        // --------------------------------------

        if (inputCodigo) {
          inputCodigo.value = codigo;

          inputCodigo.dispatchEvent(
            new Event("input", {
              bubbles: true,
            }),
          );
        }

        // --------------------------------------
        // 🟢 PLANTA
        // --------------------------------------

        plantaSelect.value = planta;

        plantaSelect.dispatchEvent(
          new Event("change", {
            bubbles: true,
          }),
        );

        // --------------------------------------
        // 🟢 ÁREA
        // --------------------------------------

        setTimeout(() => {
          areaSelect.value = area;

          areaSelect.dispatchEvent(
            new Event("change", {
              bubbles: true,
            }),
          );

          // ----------------------------------
          // 🟢 EQUIPO
          // ----------------------------------

          setTimeout(() => {
            equipoSelect.value = equipo.codigo;

            equipoSelect.dispatchEvent(
              new Event("change", {
                bubbles: true,
              }),
            );

            actualizandoSelects = false;
          }, 100);
        }, 100);

        return true;
      }
    }
  }

  actualizandoSelects = false;

  return false;
}

export { seleccionarPorCodigo };
