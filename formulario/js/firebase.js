// ------------------------------------------------------
// CONEXIÓN A FIREBASE FIRESTORE
// ------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { mostrarToast } from "./toast.js";
const firebaseConfig = {
  apiKey: "AIzaSyCw3FKL-oI5czKoO0ybIoLPQPYOhADEEG8",
  authDomain: "your-style-97bde.firebaseapp.com",
  projectId: "your-style-97bde",
  storageBucket: "your-style-97bde.appspot.com",
  messagingSenderId: "729078067097",
  appId: "1:729078067097:web:d249f1d11b87c42947ed08",
  measurementId: "G-FGNLSNKKNB"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// ------------------------------------------------------
// CONTROL DE ENVÍO
// ------------------------------------------------------
let guardando = false;

// ------------------------------------------------------
// FUNCIÓN: Guardar mantenimiento con Toasts
// ------------------------------------------------------
export async function guardarMantenimiento(data) {
  if (guardando) {
    mostrarToast("⏳ Guardando, espera un momento...", "warning");
    return;
  }

  guardando = true; // Bloquea reenvíos
  try {
    const ref = await addDoc(collection(db, "mantenimientos"), data);
    mostrarToast("✅ Mantenimiento guardado con ID: " + ref.id, "success");
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    mostrarToast("Error al guardar los datos", "danger");
  } finally {
    // Liberar bloqueo después de un breve tiempo
    setTimeout(() => {
      guardando = false;
    }, 2000);
  }
}

