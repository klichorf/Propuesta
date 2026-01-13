import { datosPlantas, supervisores } from "./selects.js";
import { cambiarFondo } from "./cambiarFondo.js";

function initSelects() {
  const plantaSelect = document.getElementById("planta");
  const areaSelect = document.getElementById("area");
  const equipoSelect = document.getElementById("equipo");
  const supervisorLabel = document.getElementById("supervisor");

  if (!plantaSelect || !areaSelect || !equipoSelect) return;

  // -------------------- PLANTA --------------------
  plantaSelect.addEventListener("change", () => {
    const planta = plantaSelect.value;

    areaSelect.innerHTML =
      "<option disabled selected>Seleccione un área</option>";
    equipoSelect.innerHTML =
      "<option disabled selected>Seleccione un equipo</option>";

    Object.keys(datosPlantas[planta] || {}).forEach((area) => {
      const opt = document.createElement("option");
      opt.value = area;
      opt.textContent = area;
      areaSelect.appendChild(opt);
    });

    cambiarFondo(planta); 

    if (supervisorLabel) {
      supervisorLabel.textContent =
        "👤 Supervisor: " + (supervisores[planta] || "No asignado");
    }
  });

  // -------------------- ÁREA --------------------
  areaSelect.addEventListener("change", () => {
    const equipos =
      datosPlantas[plantaSelect.value]?.[areaSelect.value] || [];

    equipoSelect.innerHTML =
      "<option disabled selected>Seleccione un equipo</option>";

    equipos.forEach((eq) => {
      const opt = document.createElement("option");
      opt.value = eq.codigo;
      opt.textContent = `${eq.nombre}`;
      equipoSelect.appendChild(opt);
    });
  });
}

export { initSelects };
