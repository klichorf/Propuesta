// ------------------------------------------------------
// MÓDULO: GENERACIÓN DE PDF (Versión profesional con segunda hoja para fotos)
// ------------------------------------------------------
import { imagesData } from "./fotos.js";
import { supervisores } from "./selects.js";

export async function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth(),
    H = doc.internal.pageSize.getHeight(),
    M = 50;

  // Colores corporativos
  const primary = [0, 70, 140];
  const accent = [200, 0, 0];
  const gray = [60, 60, 60];
  const lightGray = [220, 220, 220];
  let y = M;

  // ------------------------------------------------------
  // ENCABEZADO (FUNCIÓN REUTILIZABLE)
  // ------------------------------------------------------
  async function addEncabezado() {
    const logo = await getBase64FromUrl("./img/logo.png");
    const logoW = 60;

    doc.addImage(logo, "PNG", M, M, logoW, 40);

    // 🔴 Rectángulo rojo principal
    doc.setFillColor(...accent);
    doc.rect(M + logoW + 10, M, W - M * 2 - logoW - 10, 40, "F");

    // 🟡 Nombre empresa
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
    const nombreEmpresa = "ORGANIZACIÓN CÁRDENAS S.A.S";
    doc.text(nombreEmpresa, W / 2 + 20, M - 10, { align: "center" });

    // 🔹 Texto principal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text("INFORME TÉCNICO", W / 2 + 20, M + 20, { align: "center" });

    // ⚪ Línea blanca inferior
    doc.setFillColor(255, 255, 255);
    doc.rect(M + logoW + 10, M + 30, W - M * 2 - logoW - 10, 20, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("MANTENIMIENTO", W / 2 + 20, M + 45, { align: "center" });

    // Textos derecho
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`Código: FO-1600-041`, W - M - 100, M + 10);
    doc.text(`Versión: 01`, W - M - 100, M + 22);
  }

  // ------------------------------------------------------
  // PIE DE PÁGINA (FUNCIÓN REUTILIZABLE)
  // ------------------------------------------------------
  function addPie() {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Código: FO-1600-041  |  Versión: 01", W / 2, H - 20, {
      align: "center",
    });
  }

  // Dibujar encabezado inicial
  await addEncabezado();
  y += 90;

  // ------------------------------------------------------
  // DATOS PRINCIPALES
  // ------------------------------------------------------
  const campos = [
    ["Código", v("codigo")],
    ["Planta", v("planta")],
    ["Equipo", v("equipo")],
    ["Fecha Inicio", fmtFecha(v("fechaInicio"))],
    ["Fecha Fin", fmtFecha(v("fechaFin"))],
    ["Mantenimiento", v("tipoMantenimiento")],
    ["Técnico", v("ejecutor")],
    ["Tiempo total", v("tiempo")],
  ];

  doc.setFontSize(11);
  for (const [k, val] of campos) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primary);
    doc.text(`${k}:`, M, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(String(val || "-"), M + 130, y);
    y += 18;
  }

  y += 10;
  doc.setDrawColor(...lightGray);
  doc.line(M, y, W - M, y);
  y += 20;

  // ------------------------------------------------------
  // SECCIONES DE TEXTO
  // ------------------------------------------------------
  addSec("Daños encontrados", v("danos"));
  addSec("Trabajo ejecutado", v("trabajo"));
  addSec("Repuestos utilizados / recomendados", v("repuestos"));
  addSec("Herramientas utilizadas", v("herramientas"));

  // ------------------------------------------------------
  // FIRMAS (primera hoja)
  // ------------------------------------------------------
  const se = document.getElementById("sigEjecutor").toDataURL();
  const sc = document.getElementById("sigCoordinador").toDataURL();
  const fw = 150,
    fh = 70,
    fy = H - 150;

  doc.addImage(se, "PNG", M, fy, fw, fh);
  doc.addImage(sc, "PNG", W - M - fw, fy, fw, fh);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...primary);
  doc.text("Técnico de Mantenimiento", M + fw / 2, fy + fh + 18, {
    align: "center",
  });
  doc.text("Supervisor", W - M - fw / 2, fy + fh + 18, { align: "center" });

  const nombreEjecutor = v("ejecutor") || "-";
  const nombreSupervisor =
    supervisores[v("planta").toUpperCase()] || "No asignado";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...gray);
  doc.text(nombreEjecutor, M + fw / 2, fy + fh + 30, { align: "center" });
  doc.text(nombreSupervisor, W - M - fw / 2, fy + fh + 30, { align: "center" });

  // ------------------------------------------------------
  // PIE DE PÁGINA
  // ------------------------------------------------------
  addPie();

  // ------------------------------------------------------
  // NUEVA PÁGINA: REGISTRO FOTOGRÁFICO
  // ------------------------------------------------------
  if (imagesData.length > 0) {
    doc.addPage();
    await addEncabezado();
    y = M + 90;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...primary);
    doc.text("Registro fotográfico", M, y);
    y += 25;

    // ✔ Tamaño grande para 2 fotos por fila
    const size = (W - M * 3) / 2; // calcula tamaño exacto para 2 fotos centradas
    const gap = M; // misma separación que los márgenes

    let x = M;

    // Dibujar imágenes

    for (const img of imagesData) {
      // Si ya dibujaste 2 fotos en esta fila, baja a la siguiente
      if (x + size > W - M) {
        x = M;
        y += size + gap;
      }

      // Evitar que las imágenes se salgan de la página
      if (y + size > H - 100) {
        addPie();
        doc.addPage();
        await addEncabezado();
        y = M + 90;
      }

      doc.addImage(img, "JPEG", x, y, size, size);
      x += size + gap;
    }

    addPie();
  }

  // ------------------------------------------------------
  // EXPORTAR PDF
  // ------------------------------------------------------
  const blob = doc.output("blob");
  return new File([blob], "informe.pdf", { type: "application/pdf" });

  // ------------------------------------------------------
  // FUNCIONES INTERNAS
  // ------------------------------------------------------
function v(id) {
  const el = document.getElementById(id);
  if (!el) return "";
  // Si es un select, tomar el texto de la opción seleccionada
  if (el.tagName === "SELECT") {
    return el.selectedOptions[0]?.text || "";
  }
  return el.value;
}

  function fmtFecha(f) {
    return f ? new Date(f).toLocaleString().replace(",", "") : "";
  }

  function addSec(t, txt) {
    if (!txt) return;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primary);
    doc.text(t, M, (y += 10));
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    const lines = doc.splitTextToSize(txt, W - M * 2);
    doc.text(lines, M, (y += 20));
    y += lines.length * 10 + 10;

    doc.setDrawColor(...lightGray);
    doc.line(M, y, W - M, y);
    y += 15;
  }
}

// ------------------------------------------------------
// FUNCIÓN AUXILIAR PARA OBTENER LOGO
// ------------------------------------------------------
async function getBase64FromUrl(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
