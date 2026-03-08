import { guardarMantenimiento, eliminarMantenimiento } from "../connection_db/firebase.js";
import { mostrarToast } from "../toast.js";
import { subirAOneDriveConProgreso } from "../connection_onedrive/onedrive.js";
import { mostrarLoadercompartir, ocultarLoadercomoartir } from "../connection_onedrive/loader.js";
import { sanitize, convertirArchivoABase64, FirebaseError, SharePointError } from "./utils.js";
import { obtenerDatosFormulario, limpiarFormulario } from "./datosFormulario.js";



export function initCompartir(validarFormulario, generarPDF) {
  const btnCompartir = document.getElementById("btnCompartir");
  if (!btnCompartir) return;

  btnCompartir.addEventListener("click", async () => {
    if (!validarFormulario()) return;

    btnCompartir.disabled = true;
    btnCompartir.textContent = "Compartiendo...";
    mostrarLoadercompartir();

    const loaderTexto = document.getElementById("loaderProgress2");
    const fill = document.querySelector(".progressBar2-fill");

    let idMantenimiento = null;

    try {
      // 1️⃣ Datos del formulario
      const data = obtenerDatosFormulario();

      // 2️⃣ Guardar en Firebase
      idMantenimiento = await guardarMantenimiento(data);
      if (!idMantenimiento) throw new FirebaseError();

      // 3️⃣ Generar PDF
      loaderTexto ? loaderTexto.textContent = "Generando PDF..." : null;
      const file = await generarPDF();
      const base64 = await convertirArchivoABase64(file);

      // 4️⃣ Nombre y ruta
      const nombreArchivo = sanitize(`${data.tipoMantenimiento}_${idMantenimiento}.pdf`);
      const rutaCarpeta = `Documentos/PLANTA/${sanitize(data.planta)}/EQUIPOS/${sanitize(data.equipo)}/INFORMES DE MANTENIMIENTO`;

      // 5️⃣ Subir a SharePoint
      loaderTexto ? loaderTexto.textContent = "Subiendo a SharePoint..." : null;
      const resultado = await subirAOneDriveConProgreso(
        nombreArchivo,
        rutaCarpeta,
        base64,
        (porcentaje) => {
          const progresoVisual = Math.min(porcentaje, 99); // nunca llega a 100 hasta el final
          loaderTexto ? loaderTexto.textContent = `Subiendo a SharePoint: ${progresoVisual}%` : null;
          fill ? fill.style.width = `${progresoVisual}%` : null;
        }
      );

      // ✔ ahora sí termina realmente
      if (resultado.ok && resultado.url) {
        // Mostrar finalización
      loaderTexto ? loaderTexto.textContent = "Finalizando..." : null;
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Mostrar 100%
      fill ? fill.style.width = "100%" : null;
      loaderTexto ? loaderTexto.textContent = "Subiendo a SharePoint: 100%" : null;
      
      // pequeño tiempo para que el usuario lo vea
      await new Promise(resolve => setTimeout(resolve, 500));

      loaderTexto ? loaderTexto.textContent = "Completado" : null;
        
        mostrarToast(`✅ Mantenimiento guardado correctamente · ID: ${idMantenimiento}`, "success");
        limpiarFormulario();
      } else {
        throw new SharePointError();
      }

    } catch (error) {
      console.error("🔥 Error:", error);

      if (error instanceof SharePointError && idMantenimiento) {
        await eliminarMantenimiento(idMantenimiento);
        mostrarToast("❌ Falló la subida a SharePoint. Registro eliminado.", "danger");
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
