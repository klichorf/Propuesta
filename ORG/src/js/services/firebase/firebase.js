// ------------------------------------------------------
// CONEXIÓN A FIREBASE
// ------------------------------------------------------

import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { mostrarToast } from "../../toast.js";


// =====================================================
// CONFIGURACIÓN FIREBASE
// =====================================================

const firebaseConfig = {

    apiKey: "AIzaSyCw3FKL-oI5czKoO0ybIoLPQPYOhADEEG8",

    authDomain:
        "your-style-97bde.firebaseapp.com",

    projectId:
        "your-style-97bde",

    storageBucket:
        "your-style-97bde.appspot.com",

    messagingSenderId:
        "729078067097",

    appId:
        "1:729078067097:web:d249f1d11b87c42947ed08",

    measurementId:
        "G-FGNLSNKKNB"
};


// =====================================================
// APLICACIÓN PRINCIPAL
// =====================================================

// Si Firebase ya fue inicializado,
// reutilizamos la instancia existente.
//
// Si no existe,
// creamos una nueva.

export const app =
    getApps().length === 0
        ? initializeApp(firebaseConfig)
        : getApp();


// =====================================================
// FIRESTORE
// =====================================================

export const db =
    getFirestore(app);


// =====================================================
// CONTROL DE GUARDADO
// =====================================================

let guardando = false;


// ------------------------------------------------------
// CREAR MANTENIMIENTO
// ------------------------------------------------------

export async function guardarMantenimiento(data) {

    if (guardando) {

        console.warn(
            "⚠️ Ya existe un guardado en proceso"
        );

        return null;
    }


    guardando = true;


    try {

        const ref =
            await addDoc(
                collection(
                    db,
                    "mantenimientos"
                ),
                data
            );


        console.log(
            "✅ Mantenimiento guardado:",
            ref.id
        );


        return ref.id;


    } catch (error) {

        console.error(
            "❌ Error Firebase:",
            error
        );


        mostrarToast(
            "Error al guardar mantenimiento",
            "danger"
        );


        return null;


    } finally {

        setTimeout(
            () => {

                guardando = false;

            },
            1500
        );

    }
}


// ------------------------------------------------------
// ACTUALIZAR MANTENIMIENTO
// ------------------------------------------------------

export async function actualizarMantenimiento(
    id,
    data
) {

    try {

        await updateDoc(
            doc(
                db,
                "mantenimientos",
                id
            ),
            data
        );


        console.log(
            "✅ Mantenimiento actualizado:",
            id
        );


    } catch (error) {

        console.error(
            "❌ Error al actualizar:",
            error
        );

    }

}


// ------------------------------------------------------
// ELIMINAR MANTENIMIENTO
// ------------------------------------------------------

export async function eliminarMantenimiento(
    id
) {

    try {

        await deleteDoc(
            doc(
                db,
                "mantenimientos",
                id
            )
        );


        console.log(
            "🗑️ Mantenimiento eliminado:",
            id
        );


    } catch (error) {

        console.error(
            "❌ Error al eliminar mantenimiento:",
            error
        );

    }

}