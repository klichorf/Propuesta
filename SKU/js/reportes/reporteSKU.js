import { db } from "../connection_db/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

export async function descargarExcelPorFecha(fechaInicio, fechaFin) {
  // Crear fechas en hora local (no UTC)
  const [y1, m1, d1] = fechaInicio.split("-").map(Number);
  const [y2, m2, d2] = fechaFin.split("-").map(Number);

  const inicio = new Date(y1, m1 - 1, d1, 0, 0, 0, 0);      // 00:00 local
  const fin    = new Date(y2, m2 - 1, d2, 23, 59, 59, 999); // 23:59 local

  console.log("Filtro desde (local):", inicio.toString());
  console.log("Filtro hasta (local):", fin.toString());

  const q = query(
    collection(db, "sku"),
    where("fecha", ">=", Timestamp.fromDate(inicio)),
    where("fecha", "<=", Timestamp.fromDate(fin))
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    alert("No hay registros en ese rango de fechas");
    return;
  }

  const filas = [];

  snap.forEach(doc => {
    const d = doc.data();
    filas.push({
      Fecha: d.fecha?.toDate().toLocaleString(),
      SKU: d.sku,
      Material: d.material,
      Descripción: d.descripcion,
      Marca: d.marca,
      Pacas: d.pacas,
      Sueltas: d.sueltas,
      Unidades: d.unidades,
      Lote: d.lote
    });
  });

  const ws = XLSX.utils.json_to_sheet(filas);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Ingresos SKU");
  XLSX.writeFile(wb, `reporte_${fechaInicio}_a_${fechaFin}.xlsx`);
}