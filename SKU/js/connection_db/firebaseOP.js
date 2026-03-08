import { db } from "./firebase.js"; 
import { doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { mostrarToast } from "../toast.js";

let guardando = false;

export async function actualizarProduccion(data, docId) {
  if (guardando) return null;
  if (!docId) {
    mostrarToast("❌ No se puede actualizar: no hay documento seleccionado", "danger");
    return null;
  }

  guardando = true;

  try {
    const datosAGuardar = {
      ...data,
      pacas_producir: data.pacas_producir || 0,
      bultos: data.bultos || 0,
      estibas: data.estibas || 0,
      op: data.op || "",
      linea: data.linea || "",
      fecha: serverTimestamp(),
    };

    await updateDoc(doc(db, "lote", docId), datosAGuardar);

    mostrarToast(`✏️ Producción actualizada (Lote ${data.lote || ""})`, "info");
    return docId;

  } catch (error) {
    console.error("❌ Error Firebase:", error);
    mostrarToast("Error al actualizar producción", "danger");
    return null;
  } finally {
    setTimeout(() => (guardando = false), 1200);
  }
}