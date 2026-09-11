import { mostrarLoader, ocultarLoader } from "./loader.js";
import { verGrafico } from "./reportes_plantas.js";
import { verGraficoPlantaVsEquipo } from "./verGraficoPlantaVsEquipo.js";

// ------------------------------------------------------
// MÓDULO: BOTONES DE GRÁFICO
// ------------------------------------------------------
export function initBotonGrafico(idBoton, callback) {
    const btn = document.getElementById(idBoton);
    if (!btn) {
        console.warn(`⛔ Botón #${idBoton} no encontrado`);
        return;
    }
    btn.addEventListener("click", callback);
    console.log(`🔹 Evento agregado al botón ${idBoton}`);
}

let modalGraficoInstancia = null;

export function initBotonGraficoPrincipal() {
    initBotonGrafico("btnVerGrafico", async () => {
        try {
            mostrarLoader();

            // 🟦 Primer gráfico
            await verGrafico();

            // 🟩 Segundo gráfico
            await verGraficoPlantaVsEquipo();

            // 🟡 Abrir modal
            if (!modalGraficoInstancia) {
                const modalEl = document.getElementById("modalGrafico");

                modalGraficoInstancia = new bootstrap.Modal(modalEl);
                modalEl.addEventListener("shown.bs.modal", () => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                });
            }

            modalGraficoInstancia.show();

        } catch (error) {
            console.error(error);
        } finally {
            ocultarLoader();
        }
    });
}
