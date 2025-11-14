
// ------------------------------------------------------
// LLENAR SELECT DE PLANTAS
// ------------------------------------------------------
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "./firebase.js";




export async function cargarPlantasEnFiltro() {
    const select = document.getElementById("filtroPlanta");
    if (!select) return;

    const ref = collection(db, "mantenimientos");
    const snapshot = await getDocs(ref);

    const plantasSet = new Set();

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.planta) plantasSet.add(data.planta.trim());
    });

    // Limpiar excepto "Todas"
    select.innerHTML = `<option value="">Todas</option>`;

    // Agregar plantas encontradas
    [...plantasSet].forEach(planta => {
        select.innerHTML += `<option value="${planta}">${planta}</option>`;
    });
}