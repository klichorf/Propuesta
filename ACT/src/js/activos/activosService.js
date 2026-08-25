import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "../services/firebase/firebase.js";

const COLECCION_ACTIVOS = "activos";

export async function listarActivos() {
  const snapshot = await getDocs(collection(db, COLECCION_ACTIVOS));
  return snapshot.docs
    .map((documento) => ({ id: documento.id, ...documento.data() }))
    .sort((a, b) => String(b.actualizadoEn || b.creadoEn || "").localeCompare(String(a.actualizadoEn || a.creadoEn || "")));
}

export async function crearActivo(data) {
  const ahora = new Date().toISOString();
  const ref = await addDoc(collection(db, COLECCION_ACTIVOS), {
    ...data,
    creadoEn: ahora,
    actualizadoEn: ahora
  });
  return ref.id;
}

export async function actualizarActivo(id, data) {
  await updateDoc(doc(db, COLECCION_ACTIVOS, id), {
    ...data,
    actualizadoEn: new Date().toISOString()
  });
}

export async function eliminarActivo(id) {
  await deleteDoc(doc(db, COLECCION_ACTIVOS, id));
}

