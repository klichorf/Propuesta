// ------------------------------------------------------
// MÓDULO: RENDERIZADO DE INFORMES
// ------------------------------------------------------

import {
  construirResumenActividades,
  obtenerNombreEquipo,
} from './resumenActividades.js';

const FORMATO_FECHA = new Intl.DateTimeFormat('es-CO', {
  timeZone: 'America/Bogota',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const FORMATO_HORA = new Intl.DateTimeFormat('es-CO', {
  timeZone: 'America/Bogota',
  hour: '2-digit',
  minute: '2-digit',
});

export function renderizarInformes(informes) {
  const lista = document.getElementById('listaInformes');
  const fecha = document.getElementById('fechaInformes');
  const contador = document.getElementById('contadorInformes');

  if (!lista) return;

  const ahora = new Date();

  if (fecha) {
    fecha.textContent = FORMATO_FECHA.format(ahora);
  }

  if (contador) {
    contador.textContent = String(informes.length);
  }

  if (!informes.length) {
    lista.innerHTML = `
      <div class="app-report-empty">
        <div class="app-report-empty-icon">
          <i class="bi bi-file-earmark-text" aria-hidden="true"></i>
        </div>
        <h3>No hay informes hoy</h3>
        <p>Los informes que subas durante el día aparecerán aquí.</p>
      </div>
    `;
    return;
  }

  lista.innerHTML = informes
    .map(crearTarjetaInforme)
    .join('');
}

export function renderizarCarga(lista) {
  lista.innerHTML = `
    <div class="app-report-loading" role="status" aria-live="polite">
      <div class="spinner-border text-primary" aria-hidden="true"></div>
      <span>Cargando informes...</span>
    </div>
  `;
}

export function renderizarError(lista) {
  lista.innerHTML = `
    <div class="alert alert-danger" role="alert">
      No fue posible cargar los informes de hoy.
    </div>
  `;
}

function crearTarjetaInforme(informe) {
  const url = obtenerUrlSegura(informe.urlSharePoint);
  const hora = formatearHora(informe.timestamp);
  const equipo = obtenerNombreEquipo(informe.equipo, informe);
  const tiempoTotal = obtenerTiempoVisual(informe);

  return `
    <article class="app-report-card">
      <div class="app-report-card-header">
        <div>
          <h3 class="app-report-equipo">${escaparHtml(equipo)}</h3>
        </div>
        <span class="app-report-status">
          <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
          Subido
        </span>
      </div>

      <div class="app-report-info">
        <span>
          <i class="bi bi-building" aria-hidden="true"></i>
          ${escaparHtml(informe.planta || 'Sin planta')}
        </span>
        <span>
          <i class="bi bi-grid" aria-hidden="true"></i>
          ${escaparHtml(informe.area || 'Sin área')}
        </span>
        <span>
          <i class="bi bi-tools" aria-hidden="true"></i>
          ${escaparHtml(informe.tipoMantenimiento || 'Sin tipo')}
        </span>
        <span>
          <i class="bi bi-clock" aria-hidden="true"></i>
          ${escaparHtml(tiempoTotal)}
        </span>
      </div>

      <div class="app-report-summary">
        <span class="app-report-summary-title">Resumen de actividades</span>
        <p>${escaparHtml(construirResumenActividades(informe))}</p>
      </div>

      <div class="app-report-card-footer">
        <span class="app-report-technician">
          <i class="bi bi-person" aria-hidden="true"></i>
          ${escaparHtml(informe.ejecutor || 'Técnico')}
        </span>

        ${url ? `
          <a
            class="btn btn-sm btn-outline-primary"
            href="${escaparHtml(url)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver informe
            <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
          </a>
        ` : `
          <span class="app-report-unavailable">Informe no disponible</span>
        `}
      </div>

      <div class="app-report-share-actions">
        <div class="app-report-share-buttons">
          <button
          type="button"
          class="btn btn-sm btn-outline-success"
          data-accion-informe="whatsapp"
          data-informe-id="${escaparHtml(informe.id)}"
          title="Compartir resumen por WhatsApp"
        >
          <i class="bi bi-whatsapp" aria-hidden="true"></i>
          WhatsApp
        </button>

        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          data-accion-informe="correo"
          data-informe-id="${escaparHtml(informe.id)}"
          title="Compartir resumen por correo"
        >
          <i class="bi bi-envelope" aria-hidden="true"></i>
          Correo
        </button>
        </div>

        ${renderizarEstadoCompartido(informe)}
      </div>
    </article>
  `;
}

function renderizarEstadoCompartido(informe) {
  const estados = [];

  if (informe.compartidoWhatsapp) {
    estados.push(`
      <span class="app-report-shared-status">
        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
        Compartido por WhatsApp${formatearHora(informe.compartidoWhatsappAt) ? ` · ${formatearHora(informe.compartidoWhatsappAt)}` : ''}
      </span>
    `);
  }

  if (informe.compartidoCorreo) {
    estados.push(`
      <span class="app-report-shared-status">
        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
        Compartido por correo${formatearHora(informe.compartidoCorreoAt) ? ` · ${formatearHora(informe.compartidoCorreoAt)}` : ''}
      </span>
    `);
  }

  return estados.join('');
}

function obtenerTiempoVisual(informe) {
  const texto = String(informe.tiempo ?? '').trim();

  if (texto && !/fecha fin anterior/i.test(texto)) {
    return texto
      .replace(/(\d+)h\s*(\d+)m/i, '$1 h $2 min')
      .replace(/(\d+)h(?![a-z])/i, '$1 h')
      .replace(/(\d+)m(?![a-z])/i, '$1 min');
  }

  const inicio = new Date(informe.fechaInicio);
  const fin = new Date(informe.fechaFin);

  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime()) || fin < inicio) {
    return 'Tiempo no registrado';
  }

  const minutos = Math.floor((fin - inicio) / 60000);
  const horas = Math.floor(minutos / 60);
  const restantes = minutos % 60;

  if (horas === 0) return `${restantes} min`;
  if (restantes === 0) return `${horas} h`;
  return `${horas} h ${restantes} min`;
}

function formatearHora(timestamp) {
  if (!timestamp) return '';

  try {
    return FORMATO_HORA.format(new Date(timestamp));
  } catch {
    return '';
  }
}

function obtenerUrlSegura(valor) {
  if (!valor) return null;

  try {
    const url = new URL(valor);

    if (url.protocol !== 'https:') {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

function escaparHtml(valor) {
  return String(valor)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
