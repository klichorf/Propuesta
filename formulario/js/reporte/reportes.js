import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "../connection_db/firebase.js";

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

    // Limpiar select
    select.innerHTML = '';

    // ✅ Agregar placeholder
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Seleccionar Planta';
    placeholder.selected = true;
    placeholder.disabled = true;
    select.appendChild(placeholder);

    // Agregar opción "Todas" si la quieres
    const todas = document.createElement('option');
    todas.value = 'TODAS';
    todas.textContent = 'TODAS';
    select.appendChild(todas);

    // Agregar plantas únicas
    [...plantasSet].forEach(planta => {
        const option = document.createElement('option');
        option.value = planta;
        option.textContent = planta;
        select.appendChild(option);
    });
}
