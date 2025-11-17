// ------------------------------------------------------
// MÓDULO: GESTIÓN DE BOTONES (Descargar / Compartir)
// ------------------------------------------------------
import { guardarMantenimiento } from "./firebase.js";
import { mostrarToast } from "./toast.js";

export function initBotones(validarFormulario, generarPDF) {
    const btnDescargar = document.getElementById("btnDescargar");
    const btnCompartir = document.getElementById("btnCompartir");

    // ------------------------------------------------------
    // 🔹 DESCARGAR PDF LOCALMENTE
    // ------------------------------------------------------
    if (btnDescargar) {
        btnDescargar.addEventListener("click", async () => {
            if (!validarFormulario()) return;
            const file = await generarPDF();
            const a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = "informe_mantenimiento.pdf";
            a.click();
        });
    }

    // ------------------------------------------------------
    // 🔹 COMPARTIR / GUARDAR EN FIREBASE Y ONEDRIVE
    // ------------------------------------------------------
    if (btnCompartir) {
        btnCompartir.addEventListener("click", async () => {
            if (!validarFormulario()) return;

            btnCompartir.disabled = true;
            btnCompartir.textContent = "Compartiendo...";

            try {
                // 📦 Datos del formulario
                const planta = document.getElementById("planta").value.trim();
                const equipo = document.getElementById("equipo").value.trim();
                const area = document.getElementById("area").value.trim();

                if (!planta || !equipo) {
                    mostrarToast("⚠️ Debes seleccionar la planta y el equipo.", "warning");
                    btnCompartir.disabled = false;
                    btnCompartir.textContent = "Compartir";
                    return;
                }

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

                // 🔹 Generar PDF
                const file = await generarPDF();

                // 🔹 Convertir PDF a Base64
                const base64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(",")[1]);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                // 🔹 Sanitizar ruta y nombre de archivo
                const sanitize = str => str.replace(/[\\/?%*:|"<>]/g, "_");
                const nombreArchivo = sanitize(`${planta}_${equipo}_${Date.now()}.pdf`);
                const rutaCarpeta = sanitize(`EQUIPOS/PLANTA_${planta}/${equipo}`);

                let oneDriveExitoso = false;

                // 🔹 Enviar a Power Automate (OneDrive)
                try {
                    const response = await fetch(
                        "https://defaultbfe754eff26f45e7a1813f5c911075.cd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1985990ce0344ac9ab6d7222e0f90f61/triggers/manual/paths/invoke?api-version=2024-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=e_nfxYAhkqaQAn9RzEgXDnaH2AOefsXGPnRPEwjtr4I",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                nombreArchivo,
                                rutaCarpeta,
                                contenidoBase64: base64
                            })
                        }
                    );

                    if (!response.ok) {
                        const textoError = await response.text();
                        throw new Error(`HTTP ${response.status}: ${textoError}`);
                    }

                    oneDriveExitoso = true;
                } catch (err) {
                    console.error("❌ Error al enviar a Power Automate:", err);
                    mostrarToast(
                        "⚠️ No se pudo enviar a OneDrive. Se guardará solo en Firebase.",
                        "warning"
                    );
                }

                // 🔹 Guardar siempre en Firebase
                await guardarMantenimiento({
                    ...data,
                    rutaArchivo: `${rutaCarpeta}/${nombreArchivo}`,
                    urlSharePoint: oneDriveExitoso
                        ? `https://orgcardenas-my.sharepoint.com/:f:/g/personal/jrodriguez_organizacioncardenas_com_co/EkKSzBYCyptNvoTPD19Pnu4BTvY2R1pW-1s1FdsBUDPNIg${rutaCarpeta}/${nombreArchivo}`
                        : "Error al enviar a OneDrive"
                });

                mostrarToast(
                    oneDriveExitoso
                        ? "✅ Archivo enviado y guardado correctamente"
                        : "⚠️ Guardado solo en Firebase (revisar OneDrive)",
                    oneDriveExitoso ? "success" : "warning"
                );
            } catch (error) {
                console.error("🔥 Error general en la operación:", error);
                mostrarToast("❌ Error inesperado al guardar o enviar el archivo.", "danger");
            } finally {
                btnCompartir.disabled = false;
                btnCompartir.textContent = "Compartir";
            }
        });
    }
}
