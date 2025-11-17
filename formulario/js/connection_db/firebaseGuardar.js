// ------------------------------------------------------
// MÓDULO: GUARDAR INFORME EN FIREBASE
// ------------------------------------------------------

import { guardarMantenimiento } from "./firebase.js";

export async function guardarEnFirebase(data) {
    try {
        await guardarMantenimiento(data);
        return true;

    } catch (err) {
        console.error("🔥 Error guardando en Firebase:", err);
        return false;
    }
}
