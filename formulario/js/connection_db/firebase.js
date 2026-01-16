// ------------------------------------------------------
// CONEXIÓN A FIREBASE FIRESTORE
// ------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { mostrarToast } from "../toast.js";

const firebaseConfig = {
  apiKey: "AIzaSyCw3FKL-oI5czKoO0ybIoLPQPYOhADEEG8",
  authDomain: "your-style-97bde.firebaseapp.com",
  projectId: "your-style-97bde",
  storageBucket: "your-style-97bde.appspot.com",
  messagingSenderId: "729078067097",
  appId: "1:729078067097:web:d249f1d11b87c42947ed08",
  measurementId: "G-FGNLSNKKNB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let guardando = false;

// ------------------------------------------------------
// CREAR MANTENIMIENTO
// ------------------------------------------------------
export async function guardarMantenimiento(data) {
  if (guardando) return null;

  guardando = true;
  try {
    const ref = await addDoc(collection(db, "mantenimientos"), data);
    return ref.id;
  } catch (error) {
    console.error("❌ Error Firebase:", error);
    mostrarToast("Error al guardar mantenimiento", "danger");
    return null;
  } finally {
    setTimeout(() => (guardando = false), 1500);
  }
}

// ------------------------------------------------------
// ACTUALIZAR MANTENIMIENTO
// ------------------------------------------------------
export async function actualizarMantenimiento(id, data) {
  try {
    await updateDoc(doc(db, "mantenimientos", id), data);
  } catch (error) {
    console.error("❌ Error al actualizar:", error);
  }
}
