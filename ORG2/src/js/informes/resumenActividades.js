// ------------------------------------------------------
// MÓDULO: RESUMEN NARRATIVO DE ACTIVIDADES
// ------------------------------------------------------

import { datosPlantas } from '../datos/datosPlantas.js';

export function construirResumenActividades(informe) {
  const equipo = obtenerNombreEquipo(informe.equipo, informe);
  const tipo = normalizarFrase(informe.tipoMantenimiento, 'mantenimiento');
  const causa = limpiarInicioCausa(obtenerTexto(informe.danos));
  const trabajo = limpiarInicioTrabajo(obtenerTexto(informe.trabajo));
  const repuestos = obtenerTexto(informe.repuestos);
  const herramientas = obtenerTexto(informe.herramientas);
  const tiempo = obtenerTiempoTotal(informe);

  const partes = [
    `Se realizó mantenimiento ${tipo.toLowerCase()} en ${equipo}.`,
  ];

  if (causa) {
    partes.push(`La intervención se efectuó debido a ${causa.toLowerCase()}.`);
  }

  if (trabajo) {
    partes.push(`Durante la actividad se realizó ${normalizarAccion(trabajo)}.`);
  }

  partes.push(`El tiempo total de la intervención fue de ${tiempo}.`);
  partes.push(
    repuestos
      ? `Repuestos utilizados: ${repuestos}.`
      : 'No se registraron repuestos.'
  );
  partes.push(
    herramientas
      ? `Herramientas utilizadas: ${herramientas}.`
      : 'No se registraron herramientas.'
  );

  return partes.join(' ');
}

export function obtenerNombreEquipo(valor, informe = {}) {
  const nombreGuardado = String(informe.equipoNombre ?? '').trim();

  if (nombreGuardado) {
    return nombreGuardado;
  }

  const codigo = String(valor ?? '').trim();

  if (!codigo) {
    return 'Equipo no registrado';
  }

  const nombreCatalogo = buscarNombreEnCatalogo(codigo, informe.planta, informe.area);

  if (nombreCatalogo) {
    return nombreCatalogo;
  }

  const coincidencia = codigo.match(/^(.*?)\s*\d+\s*\(([^)]+)\)$/);

  if (coincidencia) {
    return `${coincidencia[1].trim()} ${coincidencia[2].trim()}`.trim();
  }

  return codigo;
}

function buscarNombreEnCatalogo(codigo, planta, area) {
  const equipos = datosPlantas?.[planta]?.[area];

  if (Array.isArray(equipos)) {
    const equipo = equipos.find((item) => item.codigo === codigo);
    if (equipo?.nombre) {
      return equipo.nombre.trim();
    }
  }

  for (const areas of Object.values(datosPlantas ?? {})) {
    for (const lista of Object.values(areas ?? {})) {
      if (!Array.isArray(lista)) continue;

      const equipo = lista.find((item) => item.codigo === codigo);
      if (equipo?.nombre) {
        return equipo.nombre.trim();
      }
    }
  }

  return '';
}

function obtenerTiempoTotal(informe) {
  const tiempoRegistrado = String(informe.tiempo ?? '').trim();

  if (tiempoRegistrado && !/fecha fin anterior/i.test(tiempoRegistrado)) {
    return normalizarTiempo(tiempoRegistrado);
  }

  const inicio = convertirFecha(informe.fechaInicio);
  const fin = convertirFecha(informe.fechaFin);

  if (!inicio || !fin || fin < inicio) {
    return 'tiempo no registrado';
  }

  const minutos = Math.floor((fin - inicio) / 60000);

  return formatearMinutos(minutos);
}

function formatearMinutos(minutos) {
  const total = Math.max(0, minutos);
  const horas = Math.floor(total / 60);
  const minutosRestantes = total % 60;

  if (horas === 0) {
    return `${minutosRestantes} min`;
  }

  if (minutosRestantes === 0) {
    return `${horas} h`;
  }

  return `${horas} h ${minutosRestantes} min`;
}

function normalizarTiempo(valor) {
  return String(valor)
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/(\d+)h\s*(\d+)m/i, '$1 h $2 min')
    .replace(/(\d+)h(?![a-z])/i, '$1 h')
    .replace(/(\d+)m(?![a-z])/i, '$1 min');
}

function convertirFecha(valor) {
  if (!valor) return null;

  const fecha = new Date(valor);

  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function normalizarAccion(texto) {
  const limpio = texto.trim();

  if (/^(se|el|la|los|las)\b/i.test(limpio)) {
    return limpio.charAt(0).toLowerCase() + limpio.slice(1);
  }

  return `${limpio.charAt(0).toLowerCase()}${limpio.slice(1)}`;
}

function limpiarInicioTrabajo(texto) {
  return texto
    .replace(/^se\s+realiz[oó]\s+/i, '')
    .replace(/^se\s+hizo\s+/i, '')
    .replace(/^realizamos\s+/i, '')
    .replace(/^realiz[oó]\s+/i, '')
    .trim();
}

function limpiarInicioCausa(texto) {
  return texto
    .replace(/^debido\s+a\s+/i, '')
    .replace(/^por\s+/i, '')
    .trim();
}

function normalizarFrase(valor, respaldo) {
  const texto = String(valor ?? '').trim();
  return texto || respaldo;
}

function obtenerTexto(valor) {
  return String(valor ?? '').trim();
}
