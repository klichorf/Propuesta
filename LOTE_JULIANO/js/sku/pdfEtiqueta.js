import { materiales } from "./datos.js";

export async function generarPdfEtiqueta() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  const W = doc.internal.pageSize.getWidth();
  const M = 40;
  let y = M;

  // Colores
  const rojo = [200, 0, 0];
  const negro = [0, 0, 0];

  // LOGO (izquierda)
  const logo = await getBase64FromUrl("./img/logo.png");
  doc.addImage(logo, "PNG", M, y, 90, 55);

  // === Medidas layout superior ===
  const rightW = 190;                 // ancho fijo caja derecha
  const rightX = W - M - rightW;     // alineada al borde del layout
  const rightY = M - 5;
  const rightH = 65;

  // Caja roja central
  const boxX = M + 100;
  const boxW = rightX - boxX - 10;   // no invade la caja derecha

  doc.setFillColor(...rojo);
  doc.rect(boxX, y, boxW, 40, "F");

  // Título central
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(
    "IDENTIFICACIÓN DE PRODUCTO TERMINADO",
    boxX + boxW / 2,
    y + 25,
    { align: "center" }
  );

  // Franja blanca inferior (LOGÍSTICA)
  doc.setFillColor(255, 255, 255);
  doc.rect(boxX, y + 40, boxW, 25, "F");

  doc.setFontSize(36);
  doc.setTextColor(0, 0, 0);

  const offsetX = 45; // prueba 10, 20, 30 hasta que quede perfecto

doc.text(
  "LOGÍSTICA",
  boxX + boxW / 2 + offsetX,  // 👉 lo mueve a la derecha
  y + 80,
  { align: "center" }
);

  // === Caja derecha (Código / Versión / Actualizado) ===
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...negro);

  const lines = [
    "Código: FO-1700-049",
    "Versión: 01",
    "Actualizado: 19-AGO-25",
  ];

  const paddingTop = 14;
  const gap = (rightH - paddingTop * 2) / (lines.length - 1);

  lines.forEach((t, i) => {
    doc.text(t, rightX + 10, rightY + paddingTop + gap * i);
  });

  // Separación
  y += 100;

  // ===== CÓDIGO =====
  doc.setFillColor(...rojo);
  doc.rect(M, y, W - M * 2, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("CÓDIGO", W / 2, y + 20, { align: "center" });

  y += 70;

  const codigo = v("codigo");
  doc.setFontSize(38);
  doc.setTextColor(0, 0, 0);
  doc.text(codigo || "------", W / 2, y + 20, { align: "center" });

  y += 50;

  // ===== DESCRIPCIÓN =====
  doc.setFillColor(...rojo);
  doc.rect(M, y, W - M * 2, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("DESCRIPCIÓN", W / 2, y + 20, { align: "center" });

  y += 70;

  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);

  const producto = materiales.find(m => m.material === codigo || m.sku === codigo);
  const descripcion = producto?.texto || "SIN DESCRIPCIÓN";

  const descLines = doc.splitTextToSize(descripcion, W - M * 2 - 40);
  doc.text(descLines, W / 2, y, { align: "center" });

  y += descLines.length * 32 + 24;

  // ===== FECHAS / CANTIDAD / LOTE (2x2) =====
  const hoy = new Date();
  const fechaVenc = new Date(hoy);
  fechaVenc.setMonth(fechaVenc.getMonth() + 18);

  const fProd = hoy.toLocaleDateString("es-CO");
  const fVenc = fechaVenc.toLocaleDateString("es-CO");

  const lote =
    document.getElementById("labelLoteValor")?.innerText ||
    document.getElementById("inputLote")?.value ||
    "SIN LOTE";

  const cantidad =
    document.getElementById("cantidad")?.innerText || "105";

  const gridW = W - M * 2;
  const colW = gridW / 2;
  const startY = y;

  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);

  doc.setFont("helvetica", "normal");
  doc.text("Cantidad", M, startY);
  doc.setFont("helvetica", "bold");
  doc.text(cantidad, M, startY + 38);

  doc.setFont("helvetica", "normal");
  doc.text("Fecha Producción", M + colW, startY);
  doc.setFont("helvetica", "bold");
  doc.text(fProd, M + colW, startY + 38);

  doc.setFont("helvetica", "normal");
  doc.text("Fecha Vencimiento", M, startY + 90);
  doc.setFont("helvetica", "bold");
  doc.text(fVenc, M, startY + 130);

  doc.setFont("helvetica", "normal");
  doc.text("Lote", M + colW, startY + 90);
  doc.setFont("helvetica", "bold");
  doc.text(lote, M + colW, startY + 130);

  y += 180;

  // ===== QR =====
  const qrCanvas = document.querySelector("#qrPrint canvas");
  if (qrCanvas) {
    const qrBase64 = qrCanvas.toDataURL("image/png");
    doc.addImage(qrBase64, "PNG", W - M - 150, y - 170, 130, 130);
  }

  doc.save(`Etiqueta_${codigo || "producto"}.pdf`);
}

function v(id) {
  return document.getElementById(id)?.value || "";
}

async function getBase64FromUrl(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}