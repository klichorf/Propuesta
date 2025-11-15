
// ------------------------------------------------------
// MÓDULO: BOTONES DE GRÁFICO
// ------------------------------------------------------

// ------------------------------------------------------
// MÓDULO: BOTÓN DE GRÁFICO
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

// ------------------------------------------------------
// INICIALIZACIÓN DEL BOTÓN PRINCIPAL
// ------------------------------------------------------
// ------------------------------------------------------
// INICIALIZACIÓN DEL BOTÓN PRINCIPAL
// ------------------------------------------------------

let modalGraficoInstancia = null;

export function initBotonGraficoPrincipal() {
    initBotonGrafico(
        "btnVerGrafico",
        async () => {

            // 🟦 Primer gráfico
            const m1 = await import("./reportes_plantas.js");
            await m1.verGrafico();

            // 🟩 Segundo gráfico
            const m2 = await import("./verGraficoPlantaVsEquipo.js");
            await m2.verGraficoPlantaVsEquipo();

            // 🟡 Crear instancia SOLO una vez
            if (!modalGraficoInstancia) {
                modalGraficoInstancia = new bootstrap.Modal(
                    document.getElementById("modalGrafico")
                );
            }

            // 👉 Mostrar SIEMPRE que se da clic
            modalGraficoInstancia.show();
        }
    );
}

