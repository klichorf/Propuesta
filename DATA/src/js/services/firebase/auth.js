import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import { app } from "./firebase.js";

// =====================================================
// AUTENTICACIÓN PRINCIPAL
// =====================================================

export const auth = getAuth(app);

// Mantener la sesión iniciada en este navegador
export async function configurarPersistencia() {

    await setPersistence(
        auth,
        browserLocalPersistence
    );

}

// Iniciar sesión principal
export async function iniciarSesion(
    email,
    password
) {

    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

}

// Cerrar sesión principal
export async function cerrarSesion() {

    await signOut(auth);

}

// Detectar sesión principal
export function observarSesion(callback) {

    return onAuthStateChanged(
        auth,
        callback
    );

}