import { normalizarUrlSharePoint, obtenerUrlArchivoSharePoint } from '../services/onedrive/sharepointUrls.js';

export function coincideActivo(activo, planta, codigoEquipo, nombreEquipo) {
  const codigoSeleccionado = normalizarTexto(codigoEquipo);
  const plantaSeleccionada = normalizarTexto(planta);
  const nombreSeleccionado = normalizarTexto(nombreEquipo);

  const codigos = [activo?.codigo, activo?.codigoEquipo, activo?.serial, activo?.maquinaEquipo, activo?.idActivo]
    .map(normalizarTexto)
    .filter(Boolean);

  // El código del activo es la clave primaria funcional.
  // No obligamos a que la etiqueta de planta de Firestore tenga
  // exactamente la misma escritura que el catálogo local.
  if (codigoSeleccionado && codigos.includes(codigoSeleccionado)) return true;

  const plantaActivo = normalizarTexto(activo?.planta);
  if (plantaActivo !== plantaSeleccionada) return false;

  if (!nombreSeleccionado) return false;

  const nombres = [activo?.equipo, activo?.nombre, activo?.descripcionBasica].map(normalizarTexto).filter(Boolean);

  return nombres.includes(nombreSeleccionado);
}

export function obtenerReferenciaFoto(activo) {
  const candidatos = [
    activo?.fotoUrlSharePoint,
    activo?.rutaFotoSharePoint,
    activo?.fotoRutaSharePoint && activo?.fotoNombreSharePoint
      ? `${activo.fotoRutaSharePoint}/${activo.fotoNombreSharePoint}`
      : '',
    activo?.urlFoto,
    activo?.fotoUrl,
    activo?.imagenUrl,
    activo?.imageUrl,
    activo?.urlImagen,
    activo?.foto,
    activo?.imagen,
  ];

  return candidatos.find((valor) => typeof valor === 'string' && valor.trim())?.trim() || '';
}

export function obtenerUrlsFoto(activo) {
  const referencia = obtenerReferenciaFoto(activo);
  if (!referencia) return { urlVista: '', urlImagen: '' };

  return {
    urlVista: normalizarUrlSharePoint(referencia),
    urlImagen: obtenerUrlArchivoSharePoint(referencia),
  };
}

export function normalizarTexto(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase();
}
