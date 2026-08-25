import { mostrarLoader, ocultarLoader } from "./../charts/loader.js";

let modalReporteInstancia = null;

export function toggleReportePlantas() {
    console.group("%c➡️ INICIANDO toggleReportePlantas()", "color: blue; font-weight: bold;");

    const btnReporte = document.getElementById("btnReportePlantas");
    const modalEl = document.getElementById("modalReportePlantas");

    if (!btnReporte || !modalEl) {
        console.warn("%c⛔ Botón o modal no encontrados", "color: red; font-weight: bold;");
        console.groupEnd();
        return;
    }

    // Crear instancia solo una vez
    if (!modalReporteInstancia) {
        console.log("%c⚡ Creando instancia de modal (una vez)", "color: teal; font-weight: bold;");
        modalReporteInstancia = new bootstrap.Modal(modalEl, { backdrop: "static" });

        // 🔹 Cuando se muestra el modal -> ocultar loader + scroll
        modalEl.addEventListener("shown.bs.modal", () => {
            ocultarLoader();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 🔹 Evento del botón
    btnReporte.addEventListener("click", async () => {
        const abierto = modalEl.classList.contains("show");

        try {
            mostrarLoader();

            if (abierto) {
                modalReporteInstancia.hide();
            } else {
                modalReporteInstancia.show();
            }

        } catch (error) {
            console.error("❌ Error en toggleReportePlantas:", error);
            ocultarLoader();
        }
    });

    console.groupEnd();
}
