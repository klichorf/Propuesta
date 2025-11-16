// ------------------------------------------------------
// GRÁFICO MENSUAL POR PLANTA (TODAS LAS PLANTAS)
// ------------------------------------------------------
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "../firebase.js";

let chartMantenimientos = null;

export async function verGrafico() {
    const canvas = document.getElementById("graficoMantenimientos");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartMantenimientos) chartMantenimientos.destroy();

    const snapshot = await getDocs(collection(db, "mantenimientos"));
    const registros = snapshot.docs.map(doc => doc.data());

    if (registros.length === 0) {
        alert("No hay datos registrados.");
        return;
    }

    // 🗓 Meses
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // 🏭 TODAS LAS PLANTAS
    const plantas = ["GRANOS", "ASEO", "ALIMENTOS", "AGUAS", "OFERTAS", "LOCATIVOS"];

    // 🎨 Colores para cada planta (6 colores distintos)
    const colores = [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)"
    ];

    // Crear estructura: mes → planta → cantidad
    const datos = {};
    meses.forEach(m => {
        datos[m] = {};
        plantas.forEach(p => datos[m][p] = 0);
    });

    // Contabilizar mantenimientos
    registros.forEach(reg => {
        const planta = reg.planta?.trim();
        const fechaStr = reg.fechaInicio || reg.fechaFin;

        if (!planta || !fechaStr) return;

        const fecha = new Date(fechaStr);
        if (isNaN(fecha)) return;

        const mes = meses[fecha.getMonth()];
        if (!datos[mes] || datos[mes][planta] === undefined) return;

        datos[mes][planta]++;
    });

    // Construir datasets (una serie por planta)
    const datasets = plantas.map((planta, i) => ({
        label: planta,
        data: meses.map(m => datos[m][planta]),
        backgroundColor: colores[i],
        borderWidth: 1
    }));

    // Renderizar gráfico
    chartMantenimientos = new Chart(ctx, {
        type: "bar",
        data: {
            labels: meses,
            datasets
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
                x: { stacked: false }
            }
        }
    });
}

