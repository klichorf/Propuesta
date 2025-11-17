import { guardarMantenimiento } from "../connection_db/firebase.js";
import { mostrarToast } from "../toast.js";
import { subirAOneDrive } from "../connection_onedrive/onedrive.js";

export function initCompartir(validarFormulario, generarPDF) {
    const btnCompartir = document.getElementById("btnCompartir");

    if (btnCompartir) {
        btnCompartir.addEventListener("click", async () => {
            if (!validarFormulario()) return;

            btnCompartir.disabled = true;
            btnCompartir.textContent = "Compartiendo...";

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

                // 📌 Convertir PDF a Base64
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(",")[1]);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                // 📌 Sanitizar sin eliminar "/"
                const sanitize = str => String(str).replace(/[\\?%*:|"<>]/g, "_");

                // 📌 Rutas correctas como antes
                const nombreArchivo = sanitize(`${planta}_${equipo}_${Date.now()}.pdf`);
                const rutaCarpeta = `EQUIPOS/PLANTA/${sanitize(planta)}/${sanitize(equipo)}`;

                // 📌 Enviar a OneDrive
                const { ok: oneDriveExitoso, url: urlSharePoint } =
                    await subirAOneDrive(nombreArchivo, rutaCarpeta, base64);

                // 📌 Guardar SIEMPRE en Firebase
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

            } catch (error) {
                console.error("🔥 Error general:", error);
                mostrarToast("❌ Error inesperado al guardar o enviar el archivo.", "danger");
            } finally {
                btnCompartir.disabled = false;
                btnCompartir.textContent = "Compartir";
            }
        });
    }
}
