import { guardarMantenimiento, actualizarMantenimiento } from "../connection_db/firebase.js";
import { mostrarToast } from "../toast.js";
import { subirAOneDriveConProgreso } from "../connection_onedrive/onedrive.js";
import { limpiarFirma } from "../firmas.js";
import { imagesData } from "../fotos.js";
import { mostrarLoadercompartir, ocultarLoadercomoartir } from "../connection_onedrive/loader.js";

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
      // DATOS DEL FORMULARIO
      // --------------------------------------------------
      const planta = document.getElementById("planta").value.trim();
      const equipo = document.getElementById("equipo").value.trim();
      const area = document.getElementById("area").value.trim();
      const tipoMantenimiento = document.getElementById("tipoMantenimiento").value.trim();

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
      // 1️⃣ CREAR REGISTRO EN FIREBASE
      // --------------------------------------------------
      const idMantenimiento = await guardarMantenimiento(data);

      if (!idMantenimiento) {
        throw new Error("No se pudo crear el mantenimiento");
      }

      // --------------------------------------------------
      // 2️⃣ GENERAR PDF
      // --------------------------------------------------
      if (loaderTexto) loaderTexto.textContent = "Generando PDF...";
      const file = await generarPDF();

      // Convertir a Base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // --------------------------------------------------
      // 3️⃣ RUTAS Y NOMBRE DEL ARCHIVO
      // --------------------------------------------------
      const sanitize = str => String(str).replace(/[\\?%*:|"<>]/g, "_");

      const nombreArchivo = sanitize(
        `${planta}/${equipo}/${tipoMantenimiento}_${idMantenimiento}.pdf`
      );

      const rutaCarpeta = `EQUIPOS/PLANTA/${sanitize(planta)}/${sanitize(equipo)}`;

      // --------------------------------------------------
      // 4️⃣ SUBIR A ONEDRIVE CON PROGRESO
      // --------------------------------------------------
      if (loaderTexto) loaderTexto.textContent = "Subiendo a OneDrive...";

      const limiteTiempo = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout-onedrive")), 15000)
      );

      const resultado = await Promise.race([
        subirAOneDriveConProgreso(
          nombreArchivo,
          rutaCarpeta,
          base64,
          porcentaje => {
            if (loaderTexto)
              loaderTexto.textContent = `Subiendo a OneDrive: ${porcentaje}%`;

            const fill = document.querySelector(".progressBar2-fill");
            if (fill) fill.style.width = `${porcentaje}%`;
          }
        ),
        limiteTiempo
      ]);

      // --------------------------------------------------
      // 5️⃣ ACTUALIZAR FIREBASE CON ARCHIVO
      // --------------------------------------------------
      await actualizarMantenimiento(idMantenimiento, {
        rutaArchivo: `${rutaCarpeta}/${nombreArchivo}`,
        urlSharePoint: resultado.url
      });

      mostrarToast(
        `✅ Mantenimiento guardado correctamente · ID: ${idMantenimiento}`,
        "success"
      );

      // --------------------------------------------------
      // LIMPIEZA
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
      mostrarToast("❌ Error al guardar o subir el archivo", "danger");
    } finally {
      btnCompartir.disabled = false;
      btnCompartir.textContent = "Compartir";
      ocultarLoadercomoartir();
    }
  });
}
