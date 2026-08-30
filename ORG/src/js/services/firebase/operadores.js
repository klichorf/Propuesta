// ------------------------------------------------------
// SERVICIO DE OPERADORES
// ------------------------------------------------------

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";


// ======================================================
// GENERAR HASH SHA-256
// ======================================================

export async function generarHash(texto) {

    const encoder = new TextEncoder();

    const data = encoder.encode(texto);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(
            byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
        )
        .join("");
}


// ======================================================
// VALIDAR OPERADOR
// ======================================================

export async function validarOperador(
    cedula,
    password
) {

    const cedulaNormalizada =
        String(cedula)
            .trim();


    if (
        !cedulaNormalizada ||
        !password
    ) {

        return null;

    }


    try {

        console.log(
            "🔎 Buscando operador:",
            cedulaNormalizada
        );


        const consulta =
            query(
                collection(
                    db,
                    "operadores"
                ),
                where(
                    "Cédula",
                    "==",
                    cedulaNormalizada
                )
            );


        const resultado =
            await getDocs(
                consulta
            );


        if (resultado.empty) {

            console.warn(
                "❌ No existe operador con esa cédula"
            );

            return null;

        }


        const documento =
            resultado.docs[0];


        const operador =
            documento.data();


        // ----------------------------------------------
        // VERIFICAR SI ESTÁ ACTIVO
        // ----------------------------------------------

        if (
            operador.Activo !== true
        ) {

            console.warn(
                "⚠️ Operador inactivo"
            );

            return null;

        }


        // ----------------------------------------------
        // GENERAR HASH DE LA CONTRASEÑA INGRESADA
        // ----------------------------------------------

        const hashIngresado =
            await generarHash(
                password
            );


        // ----------------------------------------------
        // COMPARAR HASH
        // ----------------------------------------------

        if (
            hashIngresado !==
            operador.passwordHash
        ) {

            console.warn(
                "❌ Contraseña incorrecta"
            );

            return null;

        }


        console.log(
            "✅ Operador validado:",
            operador.Nombre
        );


        return {

            id: documento.id,

            cedula:
                operador.Cédula,

            nombre:
                operador.Nombre,

            firma:
                operador.Firma,

            uid:
                operador.uid

        };


    } catch (error) {

        console.error(
            "❌ Error validando operador:",
            error
        );

        throw error;

    }

}