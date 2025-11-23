import { guardarMantenimiento } from "../connection_db/firebase.js";
import { mostrarToast } from "../toast.js";
import { subirAOneDriveConProgreso } from "../connection_onedrive/onedrive.js";
import { limpiarFirma } from "../firmas.js";
import { imagesData } from "../fotos.js";
import { mostrarLoadercompartir, ocultarLoadercomoartir } from "../connection_onedrive/loader.js";


export function initCompartir(validarFormulario, generarPDF) {
    const btnCompartir = document.getElementById("btnCompartir");

    if (btnCompartir) {
        btnCompartir.addEventListener("click", async () => {
            if (!validarFormulario()) return;

            btnCompartir.disabled = true;
            btnCompartir.textContent = "Compartiendo...";
            mostrarLoadercompartir();

            // 📌 Texto dentro del loader para mostrar progreso
            const loaderTexto = document.getElementById("loaderProgress2");
            if (loaderTexto) loaderTexto.textContent = "Preparando archivo...";

            try {
                // 📌 Tomar valores ANTES
                const planta = document.getElementById("planta").value.trim();
                const equipo = document.getElementById("equipo").value.trim();
                const area = document.getElementById("area").value.trim();

                const data = {
                    codigo: document.getElementById("codigo").value,
                    planta,
                    area,
                    equipo,
                    fechaInicio: document.getElementById("fechaInicio").value,
                    fechaFin: document.getElementById("fechaFin").value,
                    tipoMantenimiento: document.getElementById("tipoMantenimiento").value,
                    ejecutor: document.getElementById("ejecutor").value,
                    danos: document.getElementById("danos").value,
                    trabajo: document.getElementById("trabajo").value,
                    herramientas: document.getElementById("herramientas").value,
                    repuestos: document.getElementById("repuestos").value,
                    timestamp: new Date().toISOString()
                };

                // 📌 Generar PDF
                const file = await generarPDF();

                if (loaderTexto) loaderTexto.textContent = "Convirtiendo archivo...";

                // 📌 Convertir PDF a Base64
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(",")[1]);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                // 📌 Sanitizar sin eliminar "/"
                const sanitize = str => String(str).replace(/[\\?%*:|"<>]/g, "_");

                // 📌 Rutas correctas
                const nombreArchivo = sanitize(`${planta}/${equipo}/${Date.now()}.pdf`);
                const rutaCarpeta = `EQUIPOS/PLANTA/${sanitize(planta)}/${sanitize(equipo)}`;

                // 📌 Subir con PROGRESO REAL
                // ⚠️ Tiempo máximo de espera para OneDrive (mala conexión)
                const limiteTiempo = new Promise((_, reject) => {
                    setTimeout(() => {
                        reject(new Error("timeout-onedrive"));
                    }, 15000); // ⏱️ 15 segundos
                });

                let oneDriveExitoso = false;
                let urlSharePoint = null;

                try {
                    // ⏳ Competencia entre la subida real y el timeout
                    const resultado = await Promise.race([
                        subirAOneDriveConProgreso(
                            nombreArchivo,
                            rutaCarpeta,
                            base64,
                            (porcentaje) => {
                                if (loaderTexto)
                                    loaderTexto.textContent = `Subiendo a OneDrive: ${porcentaje}%`;

                                const fill = document.querySelector(".progressBar2-fill");
                                if (fill) fill.style.width = `${porcentaje}%`;
                            }
                        ),
                        limiteTiempo
                    ]);

                    oneDriveExitoso = resultado.ok;
                    urlSharePoint = resultado.url;

                } catch (error) {
                    if (error.message === "timeout-onedrive") {
                        mostrarToast("⚠️ Mala conexión. Intenta de nuevo.", "danger");
                    } else {
                        mostrarToast("❌ Error al enviar a OneDrive.", "danger");
                    }

                    // 👈 Salir sin eliminar nada ni continuar
                    btnCompartir.disabled = false;
                    btnCompartir.textContent = "Compartir";
                    ocultarLoadercomoartir();
                    return;
                }


                // 📌 Guardar en Firebase
                await guardarMantenimiento({
                    ...data,
                    rutaArchivo: `${rutaCarpeta}/${nombreArchivo}`,
                    urlSharePoint
                });

                mostrarToast(
                    oneDriveExitoso
                        ? "✅ Archivo enviado y guardado correctamente"
                        : "⚠️ Guardado solo en Firebase (revisar OneDrive)",
                    oneDriveExitoso ? "success" : "warning"
                );

                // ------------------------
                // LIMPIEZA DEL FORMULARIO
                // ------------------------

                document.getElementById("supervisor").textContent = "👤 Supervisor:";
                document.getElementById("formulario").reset();
                // 🔥 Desplazar al inicio del formulario
                window.scrollTo({ top: 0, behavior: "smooth" });

                limpiarFirma("sigEjecutor");
                limpiarFirma("sigCoordinador");

                document.getElementById("fotos").value = "";
                document.getElementById("fotosTomar").value = "";
                imagesData.length = 0;

                const thumbs = document.getElementById("thumbs");
                if (thumbs) thumbs.innerHTML = "";

            } catch (error) {
                console.error("🔥 Error general:", error);
                mostrarToast("❌ Error inesperado al guardar o enviar el archivo.", "danger");

            } finally {
                btnCompartir.disabled = false;
                btnCompartir.textContent = "Compartir";
                ocultarLoadercomoartir();
            }
        });
    }
}



