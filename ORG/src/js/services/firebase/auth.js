import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import { app } from "./firebase.js";

export const auth = getAuth(app);

// Mantener la sesión iniciada en este navegador
export async function configurarPersistencia() {
    await setPersistence(auth, browserLocalPersistence);
}

// Iniciar sesión
export async function iniciarSesion(email, password) {
    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
}

// Cerrar sesión
export async function cerrarSesion() {
    await signOut(auth);
}

// Detectar automáticamente si existe una sesión
export function observarSesion(callback) {
    return onAuthStateChanged(auth, callback);
}