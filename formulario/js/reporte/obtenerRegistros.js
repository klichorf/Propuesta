import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "../connection_db/firebase.js";

// ------------------------------------------------------
// MÓDULO: OBTENER REGISTROS DE FIREBASE
// ------------------------------------------------------
export async function obtenerRegistros() {
    console.log("➡️ INICIANDO obtenerRegistros()");

    try {
        console.log("📚 Solicitando documentos de Firestore...");

        const ref = collection(db, "mantenimientos");
        const snapshot = await getDocs(ref);

        console.log("📥 Documentos obtenidos:", snapshot.size);

const registros = snapshot.docs.map(doc => {

    const data = doc.data();

    const registro = {
        id: doc.id, // 👈 AQUÍ ESTÁ LA CLAVE
        ...data
    };

    console.log("🔸 Documento leído:", registro);

    return registro;
});

        console.log("✅ Registros mapeados:", registros.length);
        console.log("📄 Resultado final de obtenerRegistros():", registros);

        return registros;

    } catch (error) {
        console.error("❌ ERROR en obtenerRegistros():", error);
        throw error;
    }
}
