// ------------------------------------------------------
// MÓDULO: ACCESO A INFORMES DE FIRESTORE
// ------------------------------------------------------

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  serverTimestamp,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js';

import { db } from '../services/firebase/firebase.js';
import { auth } from '../services/firebase/auth.js';

const COLECCION_MANTENIMIENTOS = 'mantenimientos';
const ZONA_HORARIA_COLOMBIA = 'America/Bogota';


export async function registrarCompartido(informeId, medio) {
  const usuario = auth.currentUser;

  if (!usuario) {
    throw new Error('No existe una sesión autenticada.');
  }

  if (!['whatsapp', 'correo'].includes(medio)) {
    throw new Error(`Medio de compartir no válido: ${medio}`);
  }

  const datos = medio === 'whatsapp'
    ? {
        compartidoWhatsapp: true,
        compartidoWhatsappAt: serverTimestamp(),
        ultimoMedioCompartido: 'whatsapp',
        ultimaComparticionAt: serverTimestamp(),
      }
    : {
        compartidoCorreo: true,
        compartidoCorreoAt: serverTimestamp(),
        ultimoMedioCompartido: 'correo',
        ultimaComparticionAt: serverTimestamp(),
      };

  await updateDoc(
    doc(db, COLECCION_MANTENIMIENTOS, informeId),
    datos,
  );
}

export async function obtenerInformesDelDia() {
  const usuario = auth.currentUser;

  if (!usuario) {
    return [];
  }

  const consulta = query(
    collection(db, COLECCION_MANTENIMIENTOS),
    where('usuarioId', '==', usuario.uid),
  );

  const snapshot = await getDocs(consulta);
  const { inicio, fin } = obtenerRangoHoy();

  return snapshot.docs
    .map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }))
    .map(normalizarInforme)
    .filter((informe) => {
      return (
        typeof informe.timestamp === 'string' &&
        informe.timestamp >= inicio &&
        informe.timestamp < fin &&
        Boolean(informe.urlSharePoint)
      );
    })
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

function normalizarInforme(informe) {
  return {
    ...informe,
    timestamp: convertirTimestamp(informe.timestamp),
    compartidoWhatsappAt: convertirTimestamp(informe.compartidoWhatsappAt),
    compartidoCorreoAt: convertirTimestamp(informe.compartidoCorreoAt),
    ultimaComparticionAt: convertirTimestamp(informe.ultimaComparticionAt),
  };
}

function convertirTimestamp(valor) {
  if (typeof valor === 'string') {
    return valor;
  }

  if (valor?.toDate instanceof Function) {
    return valor.toDate().toISOString();
  }

  if (valor?.toMillis instanceof Function) {
    return new Date(valor.toMillis()).toISOString();
  }

  return '';
}

function obtenerRangoHoy() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONA_HORARIA_COLOMBIA,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const valores = Object.fromEntries(
    partes
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, value]),
  );

  const inicioLocal = new Date(
    `${valores.year}-${valores.month}-${valores.day}T00:00:00-05:00`,
  );

  const finLocal = new Date(
    `${valores.year}-${valores.month}-${valores.day}T00:00:00-05:00`,
  );

  finLocal.setUTCDate(finLocal.getUTCDate() + 1);

  return {
    inicio: inicioLocal.toISOString(),
    fin: finLocal.toISOString(),
  };
}
