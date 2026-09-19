// ------------------------------------------------------
// MÓDULO PRINCIPAL: INICIALIZACIÓN
// ------------------------------------------------------

import { initFotos } from './fotografias/fotografias.js';
import { initFirmas, actualizarTecnicoPorCorreo } from './firmas/firmas.js';
import { generarPDF } from './pdf/pdf.js';
import { validarFormulario } from './validacion/validarFormulario.js';
import { iniciarValidacionTiempoReal } from './validacion/validacionTiempoReal.js';
import { initSelects } from './datos/logica/initSelects.js';
import { initTiempo } from './tiempo.js';
import { cargarRepuestos } from './repuestos.js';
import { initBuscadorRepuestos } from './buscadorRepuestos.js';
import { initQRScanner } from './qr.js';
import { initBotones } from './botones/botones.js';
import { initCodigoActivo } from './codigoActivo.js';
import { initFotoActivoSeleccionado } from './activos/fotoActivoUI.js';

import { initWizard } from './wizard.js';
import { initEstadoInforme } from './estadoInforme.js';
import { initInformes } from './informes/informes.js';

// ------------------------------------------------------
// CONTROL GLOBAL DE FOCO EN MODALES BOOTSTRAP
// ------------------------------------------------------

function configurarFocoModales() {
  document.querySelectorAll('.modal').forEach((modal) => {
    // Evita registrar el evento más de una vez
    if (modal.dataset.focoConfigurado === 'true') {
      return;
    }

    modal.dataset.focoConfigurado = 'true';

    // --------------------------------------------------
    // ANTES DE OCULTAR EL MODAL
    // --------------------------------------------------

    modal.addEventListener('hide.bs.modal', () => {
      const elementoActivo = document.activeElement;

      // Si el elemento enfocado pertenece al modal,
      // quitamos el foco antes de que Bootstrap
      // coloque aria-hidden="true".

      if (elementoActivo && modal.contains(elementoActivo)) {
        elementoActivo.blur();
      }
    });
  });
}

// ------------------------------------------------------
// INICIALIZACIÓN DE LA APLICACIÓN
// ------------------------------------------------------

export async function inicializarAplicacion(correoUsuario = '') {
  console.log('➡️ INICIANDO APLICACIÓN - Inicialización');

  // --------------------------------------------------
  // CONFIGURAR FOCO DE LOS MODALES
  // --------------------------------------------------

  configurarFocoModales();

  initEstadoInforme();
  initInformes();

  // --------------------------------------------------
  // INICIALIZACIONES PRINCIPALES
  // --------------------------------------------------

  await Promise.all([
    initFotos(),

    initFirmas(correoUsuario),

    initSelects(),

    initTiempo(),

    cargarRepuestos(),

    initBuscadorRepuestos(),

    initQRScanner(),

    initBotones(validarFormulario, generarPDF),

    initCodigoActivo(),

    initFotoActivoSeleccionado(),
  ]);

  iniciarValidacionTiempoReal();

  // La capa visual del wizard se inicializa al final para no interferir
  // con los módulos que necesitan el DOM completo visible durante su carga.
  initWizard();

  console.log('✅ APLICACIÓN COMPLETAMENTE INICIALIZADA');
}

// ------------------------------------------------------
// ACTUALIZAR TÉCNICO AL CAMBIAR DE CUENTA
// ------------------------------------------------------

export function actualizarTecnico(correoUsuario) {
  actualizarTecnicoPorCorreo(correoUsuario);
}
