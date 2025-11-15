// ------------------------------------------------------
// MÓDULO: GRÁFICO REAL DE MANTENIMIENTOS POR PLANTA VS EQUIPOS
// ------------------------------------------------------
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "../firebase.js";

let chartPlantaVsEquipo = null;
let modalGrafico = null;

export async function verGraficoPlantaVsEquipo() {
    const canvas = document.getElementById("graficoPlantaVsEquipo");
    if (!canvas) return console.error("❌ No existe el canvas #graficoPlantaVsEquipo");

    const ctx = canvas.getContext("2d");
    if (!ctx) return console.error("❌ No se pudo obtener el contexto 2D del canvas");

    // 🧹 Destruir SOLO este gráfico
    if (chartPlantaVsEquipo) chartPlantaVsEquipo.destroy();

    const snapshot = await getDocs(collection(db, "mantenimientos"));
    const registros = snapshot.docs.map(doc => doc.data());

    if (registros.length === 0) {
        alert("No hay datos registrados aún.");
        return;
    }

    const contadores = {};
    registros.forEach(reg => {
        const planta = reg.planta?.trim() || "Sin Planta";
        const equipo = reg.equipo?.trim() || "Sin Equipo";

        if (!contadores[planta]) contadores[planta] = new Set();
        contadores[planta].add(equipo);
    });

    const labels = Object.keys(contadores);
    const valores = Object.values(contadores).map(set => set.size);

    chartPlantaVsEquipo = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Número de equipos por planta",
                data: valores,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });

    if (!modalGrafico) {
        modalGrafico = new bootstrap.Modal(document.getElementById("modalGrafico"));
    }
}
