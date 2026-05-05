// js/cronograma/cronograma.js

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "../connection_db/firebase.js";

// ------------------------------------------------------
// CREAR (con validación de cruce)
// ------------------------------------------------------
export async function crearCronograma(data) {

    const q = query(
        collection(db, "cronograma_mantenimiento"),
        where("equipo", "==", data.equipo)
    );

    const snapshot = await getDocs(q);

    const inicioNuevo = new Date(data.fechaInicio);
    const finNuevo = new Date(data.fechaFin);

    for (const d of snapshot.docs) {
        const item = d.data();

        const inicio = new Date(item.fechaInicio);
        const fin = new Date(item.fechaFin);

        const seCruza = inicioNuevo < fin && finNuevo > inicio;

        if (seCruza) {
            alert("⚠️ Cruce de horario con otro mantenimiento");
            return false;
        }
    }

    await addDoc(collection(db, "cronograma_mantenimiento"), {
        ...data,
        estado: "PENDIENTE",
        createdAt: new Date()
    });

    return true;
}

// ------------------------------------------------------
// OBTENER
// ------------------------------------------------------
export async function obtenerCronograma() {

    const q = query(
        collection(db, "cronograma_mantenimiento"),
        orderBy("fechaInicio", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// ------------------------------------------------------
// ACTUALIZAR ESTADO
// ------------------------------------------------------
export async function cambiarEstado(id, estado) {
    await updateDoc(doc(db, "cronograma_mantenimiento", id), {
        estado
    });
}

// ------------------------------------------------------
// ELIMINAR
// ------------------------------------------------------
export async function eliminarCronograma(id) {
    if (!confirm("¿Eliminar mantenimiento?")) return;
    await deleteDoc(doc(db, "cronograma_mantenimiento", id));
}