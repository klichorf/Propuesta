// connection_db/firebaseSKU.js
import { materiales } from "../sku/datos.js";
import { db } from "./firebase.js"; // 👈 ajusta la ruta si tu archivo se llama diferente
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { mostrarToast } from "../toast.js";
import { generarLoteLocal } from "../sku/lote.js";

let guardando = false;

export function buscarMaterial(codigo) {
  return materiales.find(m =>
    m.material === codigo.trim() ||
    m.sku === codigo.trim()
  );
}

export function mostrarInfo(material) {
  const contenedor = document.getElementById("infoMaterial");

  if (!material) {
    contenedor.classList.remove("d-none");
    contenedor.classList.replace("alert-info", "alert-danger");
    contenedor.innerHTML = "❌ SKU / Material no encontrado";
    return;
  }

  document.getElementById("m_material").textContent = material.material;
  document.getElementById("m_texto").textContent = material.texto;
  document.getElementById("m_subgrupo").textContent = material.subgrupo;
  document.getElementById("m_presentacion").textContent = material.presentacion;
  document.getElementById("m_sku").textContent = material.sku;
  document.getElementById("m_marca").textContent = material.marca;
  document.getElementById("m_pacas").textContent = material.pacas;
  document.getElementById("m_unidades").textContent = material.unidades;

  contenedor.classList.remove("d-none", "alert-danger");
  contenedor.classList.add("alert-info");
}



/**
 * Actualiza un registro de producción por id (opcional)
 */
export async function actualizarProduccion(id, data) {
  try {
    await updateDoc(doc(db, "lote", id), data);
    mostrarToast("✏️ Producción actualizada", "info");
  } catch (error) {
    console.error("❌ Error al actualizar:", error);
    mostrarToast("Error al actualizar producción", "danger");
  }
}




// js/connection_db/firebaseSKU.js

export async function guardarProduccion(data) {
  if (guardando) return null;

  guardando = true;
  try {
    const lote = await generarLoteLocal(); // asegúrate que esta función exista

    const ref = await addDoc(collection(db, "lote"), {
      ...data,
      lote,
      fecha: serverTimestamp()
    });

    mostrarToast(`✅ Producción guardada (Lote ${lote})`, "success");
    return ref.id;

  } catch (error) {
    console.error("❌ Error Firebase:", error);
    mostrarToast("Error al guardar producción", "danger");
    return null;

  } finally {
    setTimeout(() => (guardando = false), 1200);
  }
}

