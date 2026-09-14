import { collection, getDocs } from
    "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "../services/firebase/firebase.js";

let activosCache = null;

export async function obtenerActivos() {

    if (activosCache) {
        return activosCache;
    }

    const snapshot = await getDocs(
        collection(db, "activos")
    );

    activosCache = snapshot.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
    }));

    return activosCache;
}