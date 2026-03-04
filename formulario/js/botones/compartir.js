import { guardarMantenimiento } from "../connection_db/firebase.js";
import { mostrarToast } from "../toast.js";
import { subirAOneDriveConProgreso } from "../connection_onedrive/onedrive.js";
import { limpiarFirma } from "../firmas.js";
import { imagesData } from "../fotos.js";
import {
  mostrarLoadercompartir,
  ocultarLoadercomoartir
} from "../connection_onedrive/loader.js";

export function initCompartir(validarFormulario, generarPDF) {
  const btnCompartir = document.getElementById("btnCompartir");
  if (!btnCompartir) return;

  btnCompartir.addEventListener("click", async () => {
    if (!validarFormulario()) return;

    btnCompartir.disabled = true;
    btnCompartir.textContent = "Compartiendo...";
    mostrarLoadercompartir();

    const loaderTexto = document.getElementById("loaderProgress2");

    try {
      // --------------------------------------------------
      // 1️⃣ DATOS DEL FORMULARIO
      // --------------------------------------------------
      const planta = document.getElementById("planta").value.trim();
      const equipo = document.getElementById("equipo").value.trim();
      const area = document.getElementById("area").value.trim();
      const tipoMantenimiento = document
        .getElementById("tipoMantenimiento")
        .value.trim();

      const data = {
        codigo: document.getElementById("codigo").value,
        planta,
        area,
        equipo,
        fechaInicio: document.getElementById("fechaInicio").value,
        fechaFin: document.getElementById("fechaFin").value,
        tipoMantenimiento,
        ejecutor: document.getElementById("ejecutor").value,
        danos: document.getElementById("danos").value,
        trabajo: document.getElementById("trabajo").value,
        herramientas: document.getElementById("herramientas").value,
        repuestos: document.getElementById("repuestos").value,
        timestamp: new Date().toISOString()
      };

      // --------------------------------------------------
      // 2️⃣ GENERAR PDF
      // --------------------------------------------------
      if (loaderTexto) loaderTexto.textContent = "Generando PDF...";
      const file = await generarPDF();
      const base64 = await convertirArchivoABase64(file);

      // --------------------------------------------------
      // 3️⃣ NOMBRE Y RUTA DEL ARCHIVO
      // --------------------------------------------------
      const sanitize = str =>
        String(str).replace(/[\\?%*:|"<>]/g, "_");

      const nombreArchivo = sanitize(
        `${tipoMantenimiento}_${Date.now()}.pdf`
      );

      const rutaCarpeta = `Documentos/PLANTA/EQUIPOS/${sanitize(planta)}/${sanitize(equipo)}`;

      // --------------------------------------------------
      // 4️⃣ SUBIR A SHAREPOINT (PRIMERO)
      // --------------------------------------------------
      if (loaderTexto) loaderTexto.textContent = "Preparando...";

      const resultado = await subirAOneDriveConProgreso(
        nombreArchivo,
        rutaCarpeta,
        base64,
        porcentaje => {
          if (loaderTexto) {
            loaderTexto.textContent = `Subiendo a SharePoint: ${porcentaje}%`;
          }

          const fill = document.querySelector(".progressBar2-fill");
          if (fill) fill.style.width = `${porcentaje}%`;
        }
      );

      if (!resultado?.ok || !resultado?.url) {
        throw new Error("sharepoint-fallo");
      }

      // --------------------------------------------------
      // 5️⃣ GUARDAR EN FIREBASE (DESPUÉS)
      // --------------------------------------------------
      const idMantenimiento = await guardarMantenimiento({
        ...data,
        rutaArchivo: `${rutaCarpeta}/${nombreArchivo}`,
        urlSharePoint: resultado.url
      });

      if (!idMantenimiento) {
        throw new Error("firebase-fallo");
      }

      mostrarToast(
        `✅ Mantenimiento guardado correctamente · ID: ${idMantenimiento}`,
        "success"
      );

      // --------------------------------------------------
      // 6️⃣ LIMPIEZA FINAL
      // --------------------------------------------------
      document.getElementById("formulario").reset();
      window.scrollTo({ top: 0, behavior: "smooth" });

      limpiarFirma("sigEjecutor");
      limpiarFirma("sigCoordinador");

      imagesData.length = 0;
      const thumbs = document.getElementById("thumbs");
      if (thumbs) thumbs.innerHTML = "";

    } catch (error) {
      console.error("🔥 Error:", error);

      if (error.message === "sharepoint-fallo") {
        mostrarToast("❌ Error al subir el archivo a SharePoint", "danger");
      } else {
        mostrarToast("❌ Error al guardar el mantenimiento", "danger");
      }

    } finally {
      btnCompartir.disabled = false;
      btnCompartir.textContent = "Compartir";
      ocultarLoadercomoartir();
    }
  });
}

// --------------------------------------------------
// UTILIDAD: CONVERTIR ARCHIVO A BASE64
// --------------------------------------------------
function convertirArchivoABase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
