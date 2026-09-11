// ------------------------------------------------------
// MÓDULO: GENERACIÓN DE PDF
// Versión profesional con:
// - Salto automático de página para textos largos
// - Encabezado reutilizable
// - Pie de página reutilizable
// - Registro fotográfico en páginas independientes
// - Control de espacio para firmas
// ------------------------------------------------------

import { imagesData } from "./fotos.js";
import { assetPaths } from "./config/assetPaths.js";

export async function generarPDF() {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  const M = 50;

  // ------------------------------------------------------
  // COLORES CORPORATIVOS
  // ------------------------------------------------------

  const primary = [0, 70, 140];
  const accent = [200, 0, 0];
  const gray = [60, 60, 60];
  const lightGray = [220, 220, 220];

  // Posición vertical actual
  let y = M;

  // ------------------------------------------------------
  // CONFIGURACIÓN DE ESPACIOS
  // ------------------------------------------------------

  const HEADER_HEIGHT = 90;

  // Zona reservada para firmas
  const SIGNATURE_SPACE = 170;

  // Límite normal de contenido
  const CONTENT_BOTTOM = H - 80;

  // Límite cuando todavía necesitamos dejar
  // espacio para las firmas
  const CONTENT_BOTTOM_WITH_SIGNATURES =
    H - SIGNATURE_SPACE;


  // ======================================================
  // ENCABEZADO
  // ======================================================

  async function addEncabezado() {

    const logo = await getBase64FromUrl(
      assetPaths.images.logo
    );

    const logoW = 60;

    // ----------------------------------------------------
    // LOGO
    // ----------------------------------------------------

    doc.addImage(
      logo,
      "PNG",
      M,
      M,
      logoW,
      40
    );

    // ----------------------------------------------------
    // RECTÁNGULO ROJO PRINCIPAL
    // ----------------------------------------------------

    doc.setFillColor(...accent);

    doc.rect(
      M + logoW + 10,
      M,
      W - M * 2 - logoW - 10,
      40,
      "F"
    );

    // ----------------------------------------------------
    // NOMBRE EMPRESA
    // ----------------------------------------------------

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(16);

    doc.setTextColor(
      30,
      30,
      30
    );

    const nombreEmpresa =
      "ORGANIZACIÓN CÁRDENAS S.A.S";

    doc.text(
      nombreEmpresa,
      W / 2 + 20,
      M - 10,
      {
        align: "center"
      }
    );

    // ----------------------------------------------------
    // INFORME TÉCNICO
    // ----------------------------------------------------

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(13);

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.text(
      "INFORME TÉCNICO",
      W / 2 + 20,
      M + 20,
      {
        align: "center"
      }
    );

    // ----------------------------------------------------
    // FRANJA BLANCA
    // ----------------------------------------------------

    doc.setFillColor(
      255,
      255,
      255
    );

    doc.rect(
      M + logoW + 10,
      M + 30,
      W - M * 2 - logoW - 10,
      20,
      "F"
    );

    doc.setTextColor(
      0,
      0,
      0
    );

    doc.setFontSize(12);

    doc.text(
      "MANTENIMIENTO",
      W / 2 + 20,
      M + 45,
      {
        align: "center"
      }
    );

    // ----------------------------------------------------
    // INFORMACIÓN DERECHA
    // ----------------------------------------------------

    doc.setFontSize(10);

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.text(
      "Código: FO-1600-041",
      W - M - 100,
      M + 10
    );

    doc.text(
      "Versión: 01",
      W - M - 100,
      M + 22
    );
  }


  // ======================================================
  // PIE DE PÁGINA
  // ======================================================

  function addPie() {

    doc.setFont(
      "helvetica",
      "italic"
    );

    doc.setFontSize(9);

    doc.setTextColor(120);

    doc.text(
      "Código: FO-1600-041  |  Versión: 01",
      W / 2,
      H - 20,
      {
        align: "center"
      }
    );
  }


  // ======================================================
  // NUEVA PÁGINA DE CONTENIDO
  // ======================================================

  async function nuevaPaginaContenido(
    continuarTitulo = ""
  ) {

    addPie();

    doc.addPage();

    await addEncabezado();

    y = M + HEADER_HEIGHT;

    // ----------------------------------------------------
    // TEXTO DE CONTINUACIÓN
    // ----------------------------------------------------

    if (continuarTitulo) {

      doc.setFont(
        "helvetica",
        "italic"
      );

      doc.setFontSize(9);

      doc.setTextColor(
        100,
        100,
        100
      );

      doc.text(
        `Continuación: ${continuarTitulo}`,
        M,
        y
      );

      y += 18;
    }
  }


  // ======================================================
  // ASEGURAR ESPACIO PARA CONTENIDO
  // ======================================================

  async function asegurarEspacio(
    alturaNecesaria,
    reservarFirmas = false
  ) {

    const limite = reservarFirmas
      ? CONTENT_BOTTOM_WITH_SIGNATURES
      : CONTENT_BOTTOM;

    if (
      y + alturaNecesaria > limite
    ) {

      await nuevaPaginaContenido();
    }
  }


  // ======================================================
  // SECCIÓN DE TEXTO
  // ======================================================

  async function addSec(
    titulo,
    txt
  ) {

    if (!txt) return;

    const lineHeight = 14;

    // ----------------------------------------------------
    // PREPARAR TEXTO
    // ----------------------------------------------------

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(10);

    const lines =
      doc.splitTextToSize(
        String(txt),
        W - M * 2
      );

    // ----------------------------------------------------
    // COMPROBAR ESPACIO PARA TÍTULO
    // ----------------------------------------------------

    await asegurarEspacio(
      45,
      true
    );

    // ----------------------------------------------------
    // TÍTULO
    // ----------------------------------------------------

    y += 10;

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(
      ...primary
    );

    doc.text(
      titulo,
      M,
      y
    );

    y += 20;

    // ----------------------------------------------------
    // TEXTO
    // ----------------------------------------------------

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(10);

    doc.setTextColor(
      ...gray
    );

    let index = 0;

    while (
      index < lines.length
    ) {

      // --------------------------------------------------
      // ESPACIO DISPONIBLE
      // --------------------------------------------------

      const availableHeight =
        CONTENT_BOTTOM_WITH_SIGNATURES - y;

      const maxLines =
        Math.max(
          1,
          Math.floor(
            availableHeight /
            lineHeight
          )
        );

      // --------------------------------------------------
      // TOMAR SOLO LAS LÍNEAS QUE CABEN
      // --------------------------------------------------

      const chunk =
        lines.slice(
          index,
          index + maxLines
        );

      // --------------------------------------------------
      // DIBUJAR BLOQUE
      // --------------------------------------------------

      doc.text(
        chunk,
        M,
        y
      );

      y +=
        chunk.length *
        lineHeight;

      index +=
        chunk.length;

      // --------------------------------------------------
      // SI TODAVÍA QUEDA TEXTO
      // --------------------------------------------------

      if (
        index < lines.length
      ) {

        await nuevaPaginaContenido(
          titulo
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(10);

        doc.setTextColor(
          ...gray
        );
      }
    }

    // ----------------------------------------------------
    // SEPARADOR
    // ----------------------------------------------------

    y += 10;

    doc.setDrawColor(
      ...lightGray
    );

    doc.line(
      M,
      y,
      W - M,
      y
    );

    y += 15;
  }


  // ======================================================
  // PÁGINA PRINCIPAL
  // ======================================================

  await addEncabezado();

  y += HEADER_HEIGHT;


  // ======================================================
  // DATOS PRINCIPALES
  // ======================================================

  const campos = [

    [
      "Código",
      v("codigo")
    ],

    [
      "Planta",
      v("planta")
    ],

    [
      "Equipo",
      v("equipo")
    ],

    [
      "Fecha Inicio",
      fmtFecha(
        v("fechaInicio")
      )
    ],

    [
      "Fecha Fin",
      fmtFecha(
        v("fechaFin")
      )
    ],

    [
      "Mantenimiento",
      v("tipoMantenimiento")
    ],

    [
      "Técnico",
      v("ejecutor")
    ],

    [
      "Tiempo total",
      v("tiempo")
    ]

  ];


  // ------------------------------------------------------
  // DATOS
  // ------------------------------------------------------

  doc.setFontSize(11);

  for (
    const [k, val]
    of campos
  ) {

    await asegurarEspacio(
      20,
      true
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setTextColor(
      ...primary
    );

    doc.text(
      `${k}:`,
      M,
      y
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setTextColor(
      ...gray
    );

    doc.text(
      String(
        val || "-"
      ),
      M + 130,
      y
    );

    y += 18;
  }


  // ------------------------------------------------------
  // SEPARADOR
  // ------------------------------------------------------

  y += 10;

  doc.setDrawColor(
    ...lightGray
  );

  doc.line(
    M,
    y,
    W - M,
    y
  );

  y += 20;


  // ======================================================
  // SECCIONES
  // ======================================================

  await addSec(
    "Daños encontrados",
    v("danos")
  );

  await addSec(
    "Trabajo ejecutado",
    v("trabajo")
  );

  await addSec(
    "Repuestos utilizados / recomendados",
    v("repuestos")
  );

  await addSec(
    "Herramientas utilizadas",
    v("herramientas")
  );


  // ======================================================
  // FIRMAS
  // ======================================================

  // ------------------------------------------------------
  // Asegurar que las firmas tengan una zona limpia
  // ------------------------------------------------------

  if (
    y + SIGNATURE_SPACE >
    H
  ) {

    await nuevaPaginaContenido();
  }


  const sigEjecutor =
    document.getElementById(
      "sigEjecutor"
    );

  const sigCoordinador =
    document.getElementById(
      "sigCoordinador"
    );


  const se =
    sigEjecutor?.toDataURL();

  const sc =
    sigCoordinador?.toDataURL();


  const fw = 150;
  const fh = 70;

  const fy =
    H - 150;


  // ------------------------------------------------------
  // FIRMA TÉCNICO
  // ------------------------------------------------------

  if (se) {

    doc.addImage(
      se,
      "PNG",
      M,
      fy,
      fw,
      fh
    );
  }


  // ------------------------------------------------------
  // FIRMA OPERADOR
  // ------------------------------------------------------

  if (sc) {

    doc.addImage(
      sc,
      "PNG",
      W - M - fw,
      fy,
      fw,
      fh
    );
  }


  // ------------------------------------------------------
  // NOMBRES / CARGOS
  // ------------------------------------------------------

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(10);

  doc.setTextColor(
    ...primary
  );

  doc.text(
    "Técnico de Mantenimiento",
    M + fw / 2,
    fy + fh + 18,
    {
      align: "center"
    }
  );

  doc.text(
    "Operador",
    W - M - fw / 2,
    fy + fh + 18,
    {
      align: "center"
    }
  );


  const nombreEjecutor =
    v("ejecutor") || "-";


  const nombreOperador =
    document
      .getElementById(
        "nombreOperador"
      )
      ?.textContent
      ?.trim() || "-";


  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(9);

  doc.setTextColor(
    ...gray
  );

  doc.text(
    nombreEjecutor,
    M + fw / 2,
    fy + fh + 30,
    {
      align: "center"
    }
  );

  doc.text(
    nombreOperador,
    W - M - fw / 2,
    fy + fh + 30,
    {
      align: "center"
    }
  );


  // ======================================================
  // PIE DE PÁGINA
  // ======================================================

  addPie();


  // ======================================================
  // REGISTRO FOTOGRÁFICO
  // ======================================================

  if (
    imagesData.length > 0
  ) {

    doc.addPage();

    await addEncabezado();

    y =
      M +
      HEADER_HEIGHT;


    // ----------------------------------------------------
    // TÍTULO
    // ----------------------------------------------------

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(12);

    doc.setTextColor(
      ...primary
    );

    doc.text(
      "Registro fotográfico",
      M,
      y
    );

    y += 25;


    // ----------------------------------------------------
    // CONFIGURACIÓN DE FOTOS
    // ----------------------------------------------------

    const size =
      (W - M * 3) / 2;

    const gap = M;

    let x = M;


    // ----------------------------------------------------
    // DIBUJAR FOTOGRAFÍAS
    // ----------------------------------------------------

    for (
      const img
      of imagesData
    ) {

      // --------------------------------------------------
      // CAMBIAR A LA SIGUIENTE FILA
      // --------------------------------------------------

      if (
        x + size >
        W - M
      ) {

        x = M;

        y +=
          size +
          gap;
      }


      // --------------------------------------------------
      // COMPROBAR ESPACIO
      // --------------------------------------------------

      if (
        y + size >
        H - 100
      ) {

        addPie();

        doc.addPage();

        await addEncabezado();

        y =
          M +
          HEADER_HEIGHT;

        x = M;
      }


      // --------------------------------------------------
      // IMAGEN
      // --------------------------------------------------

      doc.addImage(
        img,
        "JPEG",
        x,
        y,
        size,
        size
      );


      x +=
        size +
        gap;
    }


    addPie();
  }


  // ======================================================
  // EXPORTAR PDF
  // ======================================================

  const blob =
    doc.output("blob");


  return new File(
    [
      blob
    ],
    "informe.pdf",
    {
      type: "application/pdf"
    }
  );


  // ======================================================
  // FUNCIONES INTERNAS
  // ======================================================

  function v(id) {

    const el =
      document.getElementById(id);

    if (!el)
      return "";


    // ----------------------------------------------------
    // SELECT
    // ----------------------------------------------------

    if (
      el.tagName ===
      "SELECT"
    ) {

      return (
        el.selectedOptions[0]
          ?.text || ""
      );
    }


    // ----------------------------------------------------
    // INPUT / TEXTAREA
    // ----------------------------------------------------

    return el.value;
  }


  // ======================================================
  // FORMATO DE FECHA
  // ======================================================

  function fmtFecha(f) {

    return f
      ? new Date(f)
        .toLocaleString()
        .replace(",", "")
      : "";
  }
}


// ========================================================
// FUNCIÓN AUXILIAR PARA OBTENER LOGO
// ========================================================

async function getBase64FromUrl(url) {

  const res =
    await fetch(url);

  const blob =
    await res.blob();

  return new Promise(
    (resolve) => {

      const reader =
        new FileReader();

      reader.onloadend =
        () =>
          resolve(
            reader.result
          );

      reader.readAsDataURL(
        blob
      );
    }
  );
}