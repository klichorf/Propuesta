// ------------------------------------------------------
// MÓDULO: GESTIÓN DE BOTONES (Descargar / Compartir)
// ------------------------------------------------------
import { guardarMantenimiento } from "./firebase.js";
import { mostrarToast } from "./toast.js";

export function initBotones(validarFormulario, generarPDF) {
    const btnDescargar = document.getElementById("btnDescargar");
    const btnCompartir = document.getElementById("btnCompartir");

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

    if (btnCompartir) {
        btnCompartir.addEventListener("click", async () => {
            if (!validarFormulario()) return;

            btnCompartir.disabled = true;
            btnCompartir.textContent = "Compartiendo...";

            try {
                // 📦 Capturar datos
                const data = {
                    codigo: document.getElementById("codigo").value,
                    planta: document.getElementById("planta").value,
                    area: document.getElementById("area").value,
                    equipo: document.getElementById("equipo").value,
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

                await guardarMantenimiento(data);
                const file = await generarPDF();

                // ⏳ Pequeño retraso para mantener el gesto de usuario
                setTimeout(async () => {
                    try {
                        if (navigator.canShare && navigator.canShare({ files: [file] })) {
                            await navigator.share({
                                title: "Informe de mantenimiento",
                                files: [file],
                            });
                            mostrarToast("✅ Informe compartido exitosamente", "success");
                        } else {
                            mostrarToast("⚠️ Tu navegador no admite compartir archivos.", "warning");
                        }
                    } catch {
                        mostrarToast("❌ Error al compartir el archivo.", "danger");
                    } finally {
                        btnCompartir.disabled = false;
                        btnCompartir.textContent = "Compartir";
                    }
                }, 100);
            } catch {
                mostrarToast("❌ Error al guardar o compartir.", "danger");
                btnCompartir.disabled = false;
                btnCompartir.textContent = "Compartir";
            }
        });
    }
}
