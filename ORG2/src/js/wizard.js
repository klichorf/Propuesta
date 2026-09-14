// =====================================================
// WIZARD DE INFORME TÉCNICO
// UX por pasos + navegación sin pérdida de información.
// =====================================================

const STEPS = [
  { label: 'Activo', title: 'Identificación del activo', show: ['activo'] },
  { label: 'Mant.', title: 'Información del mantenimiento', show: ['mantenimiento'] },
  { label: 'Diagnóstico', title: 'Diagnóstico del equipo', show: ['diagnostico'] },
  { label: 'Trabajo', title: 'Trabajo ejecutado', show: ['trabajo'] },
  { label: 'Repuestos', title: 'Repuestos utilizados', show: ['repuestos'] },
  { label: 'Evidencia', title: 'Evidencia del mantenimiento', show: ['evidencia'] },
  { label: 'Firma', title: 'Validación y firmas', show: ['firmas'] },
];

let currentStep = -1; // -1 = Inicio / Nuevo informe
let initialized = false;
let assetIdentified = false;
let assetCode = '';

const state = {
  sections: {},
  maintenanceHeader: null,
  maintenanceKicker: null,
  maintenanceTitle: null,
  finalFieldset: null,
  photoSection: null,
  signaturesSection: null,
  progressCounter: null,
  progressTitle: null,
  progressSteps: [],
  progressLabels: [],
  navigation: null,
  stepHeader: null,
  successBanner: null,
  previousButton: null,
  nextButton: null,
  finalCard: null,
  finalActions: null,
};

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function guardarReferencias() {
  const formulario = document.getElementById('formulario');
  if (!formulario) return false;

  const cards = $all('.app-section-card', formulario);

  state.sections.qr = cards[0] || null;
  state.sections.ubicacion = cards[1] || null;
  state.sections.mantenimiento = $('.app-maintenance-card', formulario);
  state.sections.repuestos = $('.app-parts-card', formulario);
  state.sections.activo = $('#vistaFotoActivo', formulario);

  state.finalFieldset = $('.app-final-fieldset', formulario);
  state.photoSection = $('.app-photo-section', formulario);
  state.signaturesSection = $('.app-signatures-section', formulario);
  state.finalCard = $('.app-final-card', formulario);
  state.finalActions = $('.app-final-actions', formulario);

  state.maintenanceHeader = state.sections.mantenimiento
    ? $('.app-section-header', state.sections.mantenimiento)
    : null;

  if (state.maintenanceHeader) {
    state.maintenanceKicker = $('.app-section-kicker', state.maintenanceHeader);
    state.maintenanceTitle = $('h3', state.maintenanceHeader);
  }

  state.progressCounter = $('.app-progress-counter', formulario);
  state.progressTitle = $('.app-progress-header strong', formulario);
  state.progressSteps = $all('.app-progress-step', formulario);
  state.progressLabels = $all('.app-progress-labels span', formulario);

  return true;
}

function crearCabeceraPaso() {
  if (state.stepHeader) return;

  const formulario = document.getElementById('formulario');
  if (!formulario) return;

  const header = document.createElement('header');
  header.id = 'wizardStepHeader';
  header.className = 'wizard-step-header wizard-hidden';
  header.innerHTML = `
        <button type="button" class="wizard-step-back" id="wizardStepBack" aria-label="Anterior">
            <i class="bi bi-chevron-left" aria-hidden="true"></i>
        </button>
        <div class="wizard-step-heading">
            <strong id="wizardStepTitle">Activo</strong>
            <span id="wizardStepCounter">Paso 1 de 7</span>
        </div>
        <button type="button" class="wizard-step-menu" id="wizardStepMenu" aria-label="Más opciones">
            <i class="bi bi-three-dots" aria-hidden="true"></i>
        </button>
    `;

  const progress = $('.app-progress-card', formulario);
  if (progress?.parentElement) {
    progress.parentElement.insertBefore(header, progress);
  } else {
    formulario.insertBefore(header, formulario.firstElementChild);
  }

  state.stepHeader = header;

  $('#wizardStepBack', header).addEventListener('click', () => {
    if (currentStep <= 0) {
      mostrarInicio({ conservarDatos: true });
      return;
    }
    mostrarPaso(currentStep - 1);
  });
}

function crearBannerActivo() {
  if (state.successBanner) return;

  const activo = state.sections.activo;
  if (!activo) return;

  const banner = document.createElement('div');
  banner.id = 'wizardAssetSuccess';
  banner.className = 'wizard-asset-success wizard-hidden';
  banner.innerHTML = `
        <span class="wizard-success-icon"><i class="bi bi-check-lg"></i></span>
        <div>
            <strong>Activo identificado</strong>
            <small>Se cargó la información del equipo</small>
        </div>
    `;

  activo.parentElement?.insertBefore(banner, activo);
  state.successBanner = banner;
}

function crearNavegacion() {
  if (state.navigation) return;

  const formulario = document.getElementById('formulario');
  if (!formulario) return;

  const navigation = document.createElement('div');
  navigation.id = 'wizardNavigation';
  navigation.className = 'wizard-navigation wizard-hidden';
  navigation.innerHTML = `
        <button type="button" id="wizardPrev" class="wizard-nav-button wizard-nav-button-secondary">
            <i class="bi bi-arrow-left" aria-hidden="true"></i>
            <span>Anterior</span>
        </button>
        <button type="button" id="wizardNext" class="wizard-nav-button wizard-nav-button-primary">
            <span>Continuar</span>
            <i class="bi bi-arrow-right" aria-hidden="true"></i>
        </button>
    `;

  formulario.appendChild(navigation);
  state.navigation = navigation;
  state.previousButton = $('#wizardPrev', navigation);
  state.nextButton = $('#wizardNext', navigation);

  state.previousButton.addEventListener('click', () => {
    if (currentStep <= 0) {
      mostrarInicio({ conservarDatos: true });
      return;
    }
    mostrarPaso(currentStep - 1);
  });

  state.nextButton.addEventListener('click', async () => {
    if (currentStep < 0) return;

    if (currentStep < STEPS.length - 1) {
      mostrarPaso(currentStep + 1);
      return;
    }

    await revisarInforme();
  });

  configurarProgresoInteractivo();
}

function configurarProgresoInteractivo() {
  state.progressSteps.forEach((element, index) => {
    prepararClickPaso(element, index);
  });

  state.progressLabels.forEach((element, index) => {
    prepararClickPaso(element, index);
  });
}

function prepararClickPaso(element, index) {
  if (!element) return;
  element.setAttribute('role', 'button');
  element.setAttribute('tabindex', '0');
  element.setAttribute('aria-label', `Ir al paso ${index + 1}: ${STEPS[index].label}`);
  element.addEventListener('click', () => navegarDesdeProgreso(index));
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navegarDesdeProgreso(index);
    }
  });
}

function navegarDesdeProgreso(index) {
  if (!assetIdentified) {
    mostrarAviso('Primero identifica un activo para iniciar el informe.');
    return;
  }
  mostrarPaso(index);
}

async function revisarInforme() {
  try {
    const { validarFormulario } = await import('./validacion/validarFormulario.js');

    const resultado = validarFormulario();

    console.log('🔎 VALIDACIÓN:', resultado);

    if (!resultado) {
      const paso = detectarPrimerPasoIncompleto();

      if (paso !== null) {
        mostrarPaso(paso);
      }

      return;
    }

    mostrarFinalizacion();
  } catch (error) {
    console.error('❌ [WIZARD] Error validando informe:', error);
    mostrarAviso('No fue posible validar el informe. Intenta nuevamente.');
  }
}

function detectarPrimerPasoIncompleto() {
  const grupos = [
    ['codigo', 'planta', 'area', 'equipo'],
    ['tipoMantenimiento', 'fechaInicio', 'fechaFin'],
    ['danos'],
    ['trabajo'],
    ['repuestos'],
    [],
    ['sigEjecutor', 'sigCoordinador'],
  ];

  for (let i = 0; i < grupos.length; i += 1) {
    if (
      grupos[i].some((id) => {
        const field = document.getElementById(id);
        return field && !field.value?.trim();
      })
    ) {
      return i;
    }
  }

  const canvasTecnico = document.getElementById('sigEjecutor');
  const canvasCoordinador = document.getElementById('sigCoordinador');
  if (!canvasTieneContenido(canvasTecnico) || !canvasTieneContenido(canvasCoordinador)) {
    return 6;
  }

  return null;
}

function canvasTieneContenido(canvas) {
  if (!canvas?.width || !canvas?.height) return false;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return false;
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] !== 255 || pixels[i + 1] !== 255 || pixels[i + 2] !== 255) return true;
  }
  return false;
}

async function mostrarAviso(mensaje) {
  console.info('ℹ️ [WIZARD]', mensaje);
  try {
    const { mostrarToast } = await import('./toast.js');
    mostrarToast(mensaje, 'warning');
  } catch {
    alert(mensaje);
  }
}

function ocultarElemento(elemento) {
  if (!elemento) return;
  elemento.classList.add('wizard-hidden');
}

function mostrarElemento(elemento) {
  if (!elemento) return;
  elemento.classList.remove('wizard-hidden', 'd-none');
}

function configurarResumenActivo() {
  const card = state.sections.activo;
  if (!card) return;

  const titulo = $('#infoEquipoFoto', card);
  const ubicacion = $('#infoUbicacionFoto', card);
  const equipo = $('#equipo')?.selectedOptions?.[0]?.textContent?.trim();
  const planta = $('#planta')?.selectedOptions?.[0]?.textContent?.trim();
  const area = $('#area')?.selectedOptions?.[0]?.textContent?.trim();

  if (titulo && equipo && !/selecciona/i.test(equipo)) titulo.textContent = equipo;
  if (ubicacion) {
    const partes = [];
    if (planta && !/selecciona/i.test(planta)) partes.push(`Planta: ${planta}`);
    if (area && !/selecciona/i.test(area)) partes.push(`Área: ${area}`);
    ubicacion.textContent = partes.join(' · ') || 'Activo de mantenimiento';
  }
}

function mostrarInicio() {
  currentStep = -1;
  ocultarContenidoPrincipal();

  $('.app-welcome')?.classList.remove('wizard-hidden');
  $('.app-progress-card')?.classList.remove('wizard-hidden');
  state.stepHeader?.classList.add('wizard-hidden');
  state.successBanner?.classList.add('wizard-hidden');
  state.navigation?.classList.add('wizard-hidden');

  mostrarElemento(state.sections.qr);
  mostrarElemento(state.sections.ubicacion);
  if (assetIdentified) {
    mostrarElemento(state.sections.activo);
  } else {
    ocultarElemento(state.sections.activo);
  }

  actualizarProgresoInicio();
  configurarEstadoNavegacionInicio();
}

function mostrarPaso(indice) {
  if (!initialized || indice < 0 || indice >= STEPS.length) return;
  if (!assetIdentified) {
    mostrarInicio();
    mostrarAviso('Primero identifica un activo.');
    return;
  }

  currentStep = indice;
  ocultarContenidoPrincipal();

  $('.app-welcome')?.classList.add('wizard-hidden');
  $('.app-progress-card')?.classList.add('wizard-hidden');
  state.stepHeader?.classList.remove('wizard-hidden');
  state.navigation?.classList.remove('wizard-hidden');

  configurarResumenActivo();

  state.successBanner?.classList.toggle('wizard-hidden', indice !== 0);

  if (indice === 0) {
    mostrarElemento(state.sections.activo);
    cargarFotoSiNecesario();
  } else if (indice === 1) {
    configurarMantenimiento(1);
  } else if (indice === 2) {
    configurarMantenimiento(2);
  } else if (indice === 3) {
    configurarMantenimiento(3);
  } else if (indice === 4) {
    mostrarElemento(state.sections.repuestos);
  } else if (indice === 5) {
    configurarEvidencia();
  } else if (indice === 6) {
    configurarFirmas();
  }

  const qrModal = document.getElementById('QR-modal');
  const closeQr = document.getElementById('closeQR');
  if (indice !== 0) {
    ocultarElemento(qrModal);
    ocultarElemento(closeQr);
  }

  actualizarProgreso(indice, STEPS[indice]);
  actualizarNavegacion(indice);
  desplazarAlInicio();
}

function cargarFotoSiNecesario() {
  const codigo = document.getElementById('codigo')?.value?.trim();
  const equipo = document.getElementById('equipo')?.value?.trim();
  if (!codigo || !equipo) return;
  window.dispatchEvent(
    new CustomEvent('activo:identificado', {
      detail: {
        codigo,
        planta: document.getElementById('planta')?.value || '',
        area: document.getElementById('area')?.value || '',
        equipo,
      },
    }),
  );
}

function configurarMantenimiento(step) {
  const card = state.sections.mantenimiento;
  if (!card) return;

  const fechaGrid = $('.app-date-grid', card);
  const tipo = $('.app-maintenance-field', card);
  const tiempo = $('.app-time-card', card);
  const danos = $('#danos', card)?.closest('.app-textarea-field');
  const trabajo = $('#trabajo', card)?.closest('.app-textarea-field');

  mostrarElemento(card);

  mostrarElemento(step === 1 ? fechaGrid : null);
  mostrarElemento(step === 1 ? tipo : null);
  mostrarElemento(step === 1 ? tiempo : null);
  mostrarElemento(step === 2 ? danos : null);
  mostrarElemento(step === 3 ? trabajo : null);

  [
    [fechaGrid, step !== 1],
    [tipo, step !== 1],
    [tiempo, step !== 1],
    [danos, step !== 2],
    [trabajo, step !== 3],
  ].forEach(([element, ocultar]) => {
    if (ocultar) ocultarElemento(element);
  });

  actualizarCabeceraMantenimiento(
    step === 1 ? 'MANTENIMIENTO' : step === 2 ? 'DIAGNÓSTICO' : 'TRABAJO',
    step === 1 ? 'Información del mantenimiento' : step === 2 ? 'Diagnóstico del equipo' : 'Trabajo ejecutado',
  );
}

function actualizarCabeceraMantenimiento(kicker, title) {
  if (state.maintenanceKicker) state.maintenanceKicker.textContent = kicker;
  if (state.maintenanceTitle) state.maintenanceTitle.textContent = title;
}

function restaurarCabeceraMantenimiento() {
  actualizarCabeceraMantenimiento('MANTENIMIENTO', 'Información del trabajo');
}

function configurarEvidencia() {
  if (!state.finalFieldset) return;
  mostrarElemento(state.finalFieldset);
  mostrarElemento(state.photoSection);
  ocultarElemento(state.signaturesSection);
  ocultarFinalizacion();
}

function configurarFirmas() {
  if (!state.finalFieldset) return;

  mostrarElemento(state.finalFieldset);
  ocultarElemento(state.photoSection);
  mostrarElemento(state.signaturesSection);

  // Restaurar cabecera y tarjetas de validación.
  const elementos = state.signaturesSection.querySelectorAll(
    '.app-section-header, .app-signature-card, .app-operator-card',
  );

  elementos.forEach((elemento) => {
    mostrarElemento(elemento);
  });

  // Ocultar pantalla final mientras estamos en el paso de firmas.
  ocultarFinalizacion();
}
function ocultarFinalizacion() {
  ocultarElemento(state.finalCard);
  ocultarElemento(state.finalActions);
}

function mostrarFinalizacion() {
  if (!state.finalFieldset) return;

  ocultarContenidoPrincipal();

  $('.app-welcome')?.classList.add('wizard-hidden');
  $('.app-progress-card')?.classList.add('wizard-hidden');
  state.stepHeader?.classList.add('wizard-hidden');

  mostrarElemento(state.finalFieldset);
  ocultarElemento(state.photoSection);

  // El contenedor debe permanecer visible porque
  // contiene la tarjeta y los botones finales.
  mostrarElemento(state.signaturesSection);

  // Ocultar únicamente el contenido de validación y firmas.
  ocultarContenidoFirmas();

  // Mantener visibles las acciones finales.
  mostrarElemento(state.finalCard);
  mostrarElemento(state.finalActions);

  state.navigation?.classList.add('wizard-hidden');

  if (state.progressCounter) {
    state.progressCounter.textContent = 'Informe listo';
  }
}

function ocultarContenidoFirmas() {
  if (!state.signaturesSection) return;

  const elementos = state.signaturesSection.querySelectorAll(
    '.app-section-header, .app-signature-card, .app-operator-card',
  );

  elementos.forEach((elemento) => {
    ocultarElemento(elemento);
  });
}

function ocultarContenidoPrincipal() {
  ocultarElemento(state.sections.qr);
  ocultarElemento(state.sections.ubicacion);
  ocultarElemento(state.sections.activo);
  ocultarElemento(state.sections.mantenimiento);
  ocultarElemento(state.sections.repuestos);
  ocultarFinalizacion();

  if (state.finalFieldset) ocultarElemento(state.finalFieldset);
  restaurarCabeceraMantenimiento();
}

function actualizarProgresoInicio() {
  if (state.progressCounter) state.progressCounter.textContent = 'Paso 1 de 7';
  if (state.progressTitle) state.progressTitle.textContent = 'Identificación del activo';

  state.progressSteps.forEach((element, i) => {
    element.classList.toggle('active', i === 0);
    element.classList.toggle('current', i === 0);
    element.classList.toggle('completed', false);
  });
  state.progressLabels.forEach((element, i) => {
    element.classList.toggle('active', i === 0);
    element.classList.remove('completed');
  });
}

function actualizarProgreso(indice, step) {
  if (state.progressCounter) state.progressCounter.textContent = `Paso ${indice + 1} de 7`;
  const stepTitle = document.getElementById('wizardStepTitle');
  const stepCounter = document.getElementById('wizardStepCounter');
  if (stepTitle) stepTitle.textContent = step.label === 'Mant.' ? 'Mantenimiento' : step.label;
  if (stepCounter) stepCounter.textContent = `Paso ${indice + 1} de 7`;
  if (state.progressTitle) state.progressTitle.textContent = step.title;

  state.progressSteps.forEach((element, i) => {
    element.classList.toggle('active', i <= indice);
    element.classList.toggle('current', i === indice);
    element.classList.toggle('completed', i < indice);
  });
  state.progressLabels.forEach((element, i) => {
    element.classList.toggle('active', i === indice);
    element.classList.toggle('completed', i < indice);
  });
}

function actualizarNavegacion(indice) {
  if (!state.previousButton || !state.nextButton) return;
  state.previousButton.disabled = false;
  const ultimo = indice === STEPS.length - 1;
  state.nextButton.querySelector('span').textContent = ultimo ? 'Revisar informe' : 'Continuar';
  state.nextButton.querySelector('i').className = ultimo ? 'bi bi-check2-circle' : 'bi bi-arrow-right';
}

function configurarEstadoNavegacionInicio() {
  if (!state.previousButton) return;
  state.previousButton.disabled = true;
}

function desplazarAlInicio() {
  const principal = document.getElementById('contenedorPrincipal');
  principal?.scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function irInicio() {
  if (!initialized) return;
  mostrarInicio();
}

export function resetWizard() {
  if (!initialized) return;

  // Reiniciar estado interno.
  currentStep = -1;
  assetIdentified = false;
  assetCode = '';

  // Ocultar cualquier estado final.
  ocultarFinalizacion();

  // Volver a la pantalla inicial.
  mostrarInicio();

  // Llevar el scroll al principio.
  desplazarAlInicio();

  console.log('🔄 [WIZARD] Informe reiniciado correctamente');
}

export function marcarActivoIdentificado(detail = {}) {
  assetIdentified = true;
  assetCode = detail.codigo || document.getElementById('codigo')?.value?.trim() || '';
  configurarResumenActivo();
}

export function getWizardState() {
  return { currentStep, assetIdentified, assetCode };
}

export function initWizard() {
  if (initialized || !guardarReferencias()) return;

  crearCabeceraPaso();
  crearBannerActivo();
  crearNavegacion();
  initialized = true;

  window.addEventListener('activo:identificado', (event) => {
    marcarActivoIdentificado(event.detail || {});
    if (currentStep === -1) {
      mostrarPaso(0);
    } else if (currentStep === 0) {
      configurarResumenActivo();
    }
  });

  window.addEventListener('activo:no-encontrado', () => {
    assetIdentified = false;
    assetCode = '';
    if (currentStep >= 0) mostrarInicio();
  });

  window.addEventListener('maintenance:reset', resetWizard);
  window.addEventListener('wizard:ir-inicio', irInicio);

  mostrarInicio();
  console.log('✅ [WIZARD] Interfaz de 7 pasos inicializada');
}

function limpiarFormularioCompleto() {
  const formulario = document.getElementById('formulario');

  if (!formulario) return;

  // Limpiar inputs, selects y textareas nativos.
  formulario.reset();

  // Limpiar campos que puedan haber sido modificados
  // mediante JavaScript.
  formulario.querySelectorAll('input, textarea, select').forEach((campo) => {
    if (campo.type === 'checkbox' || campo.type === 'radio') {
      campo.checked = false;
      return;
    }

    if (campo.type === 'file') {
      campo.value = '';
      return;
    }

    if (campo.tagName === 'SELECT') {
      campo.selectedIndex = 0;
      return;
    }

    campo.value = '';
  });

  // Limpiar las firmas en canvas.
formulario.querySelectorAll('canvas').forEach((canvas) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dejar el canvas nuevamente en blanco.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

  // Notificar a los módulos que deben limpiar
  // cualquier estado interno que mantengan.
  window.dispatchEvent(new CustomEvent('formulario:limpiar'));
}
