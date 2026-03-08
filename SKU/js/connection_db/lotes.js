import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

export async function buscarLote(lote) {
  const q = query(
    collection(db, "lote"),
    where("lote", "==", lote)
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  let data;
  snap.forEach(doc => {
    data = {
      docId: doc.id,   // 👈 aquí guardas el ID del documento
      ...doc.data()
    };
  });

  return data;
}