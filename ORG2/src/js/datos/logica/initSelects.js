import { datosPlantas } from '../datosPlantas.js';
import { supervisores } from '../supervisores.js';
import { hayDatosPosterioresAlActivo } from '../../estadoInforme.js';

function confirmarCambioUbicacion() {
  const hayDatos = hayDatosPosterioresAlActivo();

  console.log('¿Hay datos posteriores?', hayDatos);

  if (!hayDatos) {
    return true;
  }

  const confirmar = window.confirm('OK');

  return confirmar;
}

function initSelects() {
  const plantaSelect = document.getElementById('planta');
  const areaSelect = document.getElementById('area');
  const equipoSelect = document.getElementById('equipo');
  const supervisorLabel = document.getElementById('supervisor');

  if (!plantaSelect || !areaSelect || !equipoSelect) return;

  let plantaAnterior = plantaSelect.value || '';
  let areaAnterior = areaSelect.value || '';

  plantaSelect.addEventListener('change', () => {
    const planta = plantaSelect.value;

    if (plantaAnterior && plantaAnterior !== planta && !confirmarCambioUbicacion()) {
      plantaSelect.value = plantaAnterior;
      return;
    }

    plantaAnterior = planta;
    areaAnterior = '';

    areaSelect.innerHTML = '<option disabled selected>Seleccione un área</option>';
    equipoSelect.innerHTML = '<option disabled selected>Seleccione un equipo</option>';

    Object.keys(datosPlantas[planta] || {}).forEach((area) => {
      const opt = document.createElement('option');
      opt.value = area;
      opt.textContent = area;
      areaSelect.appendChild(opt);
    });

    if (supervisorLabel) supervisorLabel.textContent = supervisores[planta] || 'No asignado';
    window.dispatchEvent(new CustomEvent('activo:no-encontrado', { detail: { motivo: 'cambio-planta' } }));
  });

  areaSelect.addEventListener('change', () => {
    const area = areaSelect.value;

    if (areaAnterior && areaAnterior !== area && !confirmarCambioUbicacion()) {
      areaSelect.value = areaAnterior;
      return;
    }

    areaAnterior = area;
    const equipos = datosPlantas[plantaSelect.value]?.[area] || [];
    equipoSelect.innerHTML = '<option disabled selected>Seleccione un equipo</option>';

    equipos.forEach((eq) => {
      const opt = document.createElement('option');
      opt.value = eq.codigo;
      opt.textContent = eq.nombre;
      equipoSelect.appendChild(opt);
    });

    window.dispatchEvent(new CustomEvent('activo:no-encontrado', { detail: { motivo: 'cambio-area' } }));
  });
}

export { initSelects };
