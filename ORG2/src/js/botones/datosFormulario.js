import { limpiarOperador } from '../firmas/firmas.js';
import { limpiarFotos } from '../fotografias/estadoFotos.js';
import { auth } from '../services/firebase/auth.js';

// ======================================================
// OBTENER DATOS DEL FORMULARIO
// ======================================================

export function obtenerDatosFormulario() {
  const usuario = auth.currentUser;

  if (!usuario) {
    throw new Error('No existe una sesión autenticada.');
  }

  return {
    codigo: document.getElementById('codigo').value,
    planta: document.getElementById('planta').value.trim(),
    area: document.getElementById('area').value.trim(),
    equipo: document.getElementById('equipo').value.trim(),
    equipoNombre:
      document.getElementById('equipo')?.selectedOptions?.[0]?.textContent?.trim() || '',
    fechaInicio: document.getElementById('fechaInicio').value,
    fechaFin: document.getElementById('fechaFin').value,
    tiempo: document.getElementById('tiempo')?.value?.trim() || '',
    tipoMantenimiento: document.getElementById('tipoMantenimiento').value.trim(),
    ejecutor: document.getElementById('ejecutor').value,
    danos: document.getElementById('danos').value,
    trabajo: document.getElementById('trabajo').value,
    repuestos: document.getElementById('repuestos').value,
    usuarioId: usuario.uid,
    usuarioEmail: usuario.email?.trim().toLowerCase() || '',
    timestamp: new Date().toISOString(),
  };
}

// ======================================================
// LIMPIAR FORMULARIO
// ======================================================

export function limpiarFormulario() {
  console.log('🧹 Limpiando formulario...');

  // ==================================================
  // 1. RESET GENERAL DEL FORMULARIO
  // ==================================================

  const formulario = document.getElementById('formulario');

  if (formulario) {
    formulario.reset();
  }

  // ==================================================
  // 2. SELECTS
  // ==================================================

  ['planta', 'area', 'equipo'].forEach((id) => {
    const select = document.getElementById(id);
    if (select) {
      select.selectedIndex = 0;
    }
  });

  // ==================================================
  // 3. OPERADOR
  // ==================================================

  limpiarOperador();

  // ==================================================
  // 4. FOTOS
  // ==================================================

  limpiarFotos();

  const thumbs = document.getElementById('thumbs');
  thumbs?.replaceChildren();

  const contadorFotos = document.getElementById('contadorFotos');
  if (contadorFotos) {
    contadorFotos.textContent = '0';
  }

  // ==================================================
  // 5. INPUTS DE ARCHIVOS
  // ==================================================

  document.querySelectorAll('#formulario input[type="file"]').forEach((input) => {
    input.value = '';
  });

  // ==================================================
  // 6. FOTO DEL ACTIVO
  // ==================================================

  const vistaFotoActivo = document.getElementById('vistaFotoActivo');
  const imagenActivo = document.getElementById('imagenActivoSeleccionado');
  const skeletonFotoActivo = document.getElementById('skeletonFotoActivo');

  if (imagenActivo) {
    imagenActivo.onload = null;
    imagenActivo.onerror = null;
    imagenActivo.removeAttribute('src');
    imagenActivo.classList.add('d-none');
  }

  vistaFotoActivo?.classList.add('d-none');
  skeletonFotoActivo?.classList.add('d-none');

  // ==================================================
  // 7. ESTADO E INFORMACIÓN DE LA FOTO
  // ==================================================

  const estadoFotoActivo = document.getElementById('estadoFotoActivo');
  const infoEquipo = document.getElementById('infoEquipoFoto');
  const infoUbicacion = document.getElementById('infoUbicacionFoto');

  if (estadoFotoActivo) {
    estadoFotoActivo.textContent = 'FOTO DEL ACTIVO';
  }

  if (infoEquipo) {
    infoEquipo.textContent = 'Equipo seleccionado';
  }

  if (infoUbicacion) {
    infoUbicacion.textContent = 'Activo de mantenimiento';
  }

  // ==================================================
  // 8. ENLACE DE FOTO
  // ==================================================

  const linkFotoActivo = document.getElementById('linkFotoActivo');

  if (linkFotoActivo) {
    linkFotoActivo.removeAttribute('href');
    linkFotoActivo.classList.add('d-none');
  }

  // ==================================================
  // 9. VOLVER ARRIBA
  // ==================================================

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  console.log('✅ Formulario completamente limpiado');
  console.log('✍️ Firma del técnico conservada');
  console.log('🔒 Operador y validación limpiados');
}
