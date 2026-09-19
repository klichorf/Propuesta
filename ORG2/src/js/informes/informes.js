// ------------------------------------------------------
// MÓDULO: INFORMES DEL USUARIO
// ------------------------------------------------------

import { obtenerInformesDelDia, registrarCompartido } from './servicioInformes.js';
import {
  renderizarInformes,
  renderizarCarga,
  renderizarError,
} from './renderInformes.js';
import {
  compartirPorWhatsApp,
  compartirPorCorreo,
} from './compartirResumen.js';
import { mostrarToast } from '../toast.js';

let inicializado = false;
let informesActuales = [];

export function initInformes() {
  if (inicializado) return;

  const pantalla = document.getElementById('pantallaInformes');
  if (!pantalla) {
    console.warn('⚠️ [INFORMES] No existe #pantallaInformes');
    return;
  }

  inicializado = true;

  window.addEventListener('app:navegacion', manejarNavegacion);

  document
    .getElementById('btnActualizarInformes')
    ?.addEventListener('click', cargarInformes);

  document
    .getElementById('listaInformes')
    ?.addEventListener('click', manejarAccionInforme);
}

async function manejarNavegacion(event) {
  const pagina = event.detail?.pagina;

  if (pagina === 'informes') {
    await mostrarInformes();
    return;
  }

  ocultarInformes();
  mostrarFormularioPrincipal();
}

async function mostrarInformes() {
  const formulario = document.getElementById('formulario');
  const pantalla = document.getElementById('pantallaInformes');

  formulario?.classList.add('d-none');
  pantalla?.classList.remove('d-none');

  await cargarInformes();
}

function ocultarInformes() {
  document
    .getElementById('pantallaInformes')
    ?.classList.add('d-none');
}

function mostrarFormularioPrincipal() {
  document
    .getElementById('formulario')
    ?.classList.remove('d-none');
}

async function cargarInformes() {
  const lista = document.getElementById('listaInformes');
  if (!lista) return;

  renderizarCarga(lista);

  try {
    informesActuales = await obtenerInformesDelDia();
    renderizarInformes(informesActuales);
  } catch (error) {
    informesActuales = [];
    console.error('❌ [INFORMES] Error cargando informes:', error);
    renderizarError(lista);
  }
}

async function manejarAccionInforme(event) {
  const boton = event.target.closest('[data-accion-informe]');

  if (!boton) return;

  const informeId = boton.dataset.informeId;
  const accion = boton.dataset.accionInforme;

  const informe = informesActuales.find(
    (item) => item.id === informeId,
  );

  if (!informe) {
    console.warn('⚠️ [INFORMES] No se encontró el informe:', informeId);
    return;
  }

  try {
    let iniciado = false;

    if (accion === 'whatsapp') {
      iniciado = compartirPorWhatsApp(informe);
    } else if (accion === 'correo') {
      iniciado = compartirPorCorreo(informe);
    } else {
      return;
    }

    if (!iniciado) {
      mostrarToast('No se pudo abrir la opción de compartir.', 'warning');
      return;
    }

    await registrarCompartido(informe.id, accion);
    actualizarEstadoCompartidoLocal(informe, accion);
    renderizarInformes(informesActuales);

    const nombreMedio = accion === 'whatsapp' ? 'WhatsApp' : 'correo';

    mostrarToast(
      `Compartir por ${nombreMedio} iniciado.`,
      'success',
    );
  } catch (error) {
    console.error('❌ [INFORMES] Error compartiendo informe:', error);
    mostrarToast(
      'No fue posible registrar la compartición.',
      'danger',
    );
  }
}

function actualizarEstadoCompartidoLocal(informe, medio) {
  const ahora = new Date().toISOString();

  informe.ultimaComparticionAt = ahora;
  informe.ultimoMedioCompartido = medio;

  if (medio === 'whatsapp') {
    informe.compartidoWhatsapp = true;
    informe.compartidoWhatsappAt = ahora;
    return;
  }

  informe.compartidoCorreo = true;
  informe.compartidoCorreoAt = ahora;
}
