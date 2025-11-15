// ------------------------------------------------------
// MÓDULO: GRÁFICO REAL DE MANTENIMIENTOS
// ------------------------------------------------------
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "../firebase.js";

let chartMantenimientos = null;
let modalGrafico = null;

export async function verGrafico() {
    const canvas = document.getElementById("graficoMantenimientos");
    if (!canvas) return console.error("❌ No existe el canvas #graficoMantenimientos");

    const ctx = canvas.getContext("2d");
    if (!ctx) return console.error("❌ No se pudo obtener el contexto 2D del canvas");

    // 🧹 Destruir SOLO este gráfico
    if (chartMantenimientos) chartMantenimientos.destroy();

    const snapshot = await getDocs(collection(db, "mantenimientos"));
    const registros = snapshot.docs.map(doc => doc.data());

    if (registros.length === 0) {
        alert("No hay datos registrados aún.");
        return;
    }

    const contadores = {};
    registros.forEach(reg => {
        const planta = reg.planta?.trim() || "Sin Planta";
        contadores[planta] = (contadores[planta] || 0) + 1;
    });

    const labels = Object.keys(contadores);
    const valores = Object.values(contadores);

    chartMantenimientos = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Número de reportes por planta",
                data: valores,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
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
