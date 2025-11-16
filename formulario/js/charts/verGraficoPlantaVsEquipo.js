import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "../firebase.js";
import { mostrarLoader, ocultarLoader } from "./loader.js";


let chartPlantaVsEquipo = null;

// Colores por planta
const plantas = ["GRANOS", "ASEO", "ALIMENTOS", "AGUAS", "OFERTAS", "LOCATIVOS"];
const colores = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)"
];

// Función para obtener registros filtrados por fecha
async function obtenerRegistrosFiltrados(fechaInicio, fechaFin) {
    const snapshot = await getDocs(collection(db, "mantenimientos"));
    const registros = snapshot.docs.map(doc => doc.data());

    const inicio = fechaInicio ? new Date(fechaInicio) : null;
    const fin = fechaFin ? new Date(fechaFin) : null;

    return registros.filter(reg => {
        const fechaStr = reg.fechaInicio || reg.fechaFin;
        if (!fechaStr) return false;

        const fechaReg = new Date(fechaStr);
        if (isNaN(fechaReg)) return false;

        if (inicio && fechaReg < inicio) return false;
        if (fin && fechaReg > fin) return false;
        return true;
    });
}

// Función principal para dibujar el gráfico
export async function verGraficoPlantaVsEquipo() {
    mostrarLoader();
    try {
        const canvas = document.getElementById("graficoPlantaVsEquipo");
        if (!canvas) return console.error("❌ No existe el canvas #graficoPlantaVsEquipo");
        const ctx = canvas.getContext("2d");
        if (!ctx) return console.error("❌ No se pudo obtener el contexto 2D");

        let fechaInicio = document.getElementById("fechaInicio").value;
        let fechaFin = document.getElementById("fechaFin").value;

        if (!fechaInicio || !fechaFin) {
            const hoy = new Date();
            fechaInicio = fechaInicio || new Date(hoy.getFullYear(), hoy.getMonth(), 1).toISOString().split("T")[0];
            fechaFin = fechaFin || new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).toISOString().split("T")[0];

            document.getElementById("fechaInicio").value = fechaInicio;
            document.getElementById("fechaFin").value = fechaFin;
        }

        const registros = await obtenerRegistrosFiltrados(fechaInicio, fechaFin);

        if (chartPlantaVsEquipo) chartPlantaVsEquipo.destroy();

        if (registros.length === 0) {
            alert("No hay registros válidos en el rango seleccionado.");
            return;
        }

        const contadores = {};
        registros.forEach(reg => {
            const planta = reg.planta?.trim() || "Sin Planta";
            const equipo = reg.equipo?.trim() || "Sin Equipo";

            if (!contadores[planta]) contadores[planta] = {};
            if (!contadores[planta][equipo]) contadores[planta][equipo] = 0;
            contadores[planta][equipo]++;
        });

        const labels = [];
        const valores = [];
        const backgroundColors = [];

        Object.keys(contadores).forEach(planta => {
            Object.keys(contadores[planta]).forEach(equipo => {
                labels.push(`${planta} - ${equipo}`);
                valores.push(contadores[planta][equipo]);

                const index = plantas.indexOf(planta);
                backgroundColors.push(index !== -1 ? colores[index] : "rgba(200, 200, 200, 0.6)");
            });
        });


        chartPlantaVsEquipo = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    label: "Número de intervenciones por equipo",
                    data: valores,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(c => c.replace("0.6", "1")),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true, ticks: { stepSize: 1 } },
                    y: { ticks: { display: false  }  }
                },
                plugins: {
                    legend: { display: false },
                    datalabels: {
                        color: '#000',
                        anchor: 'center',
                        align: 'right',
                        font: { size: 12 },
                        formatter: (value, context) => {
                            return labels[context.dataIndex].split(' - ')[1]; // solo el nombre del equipo
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] // activar plugin
        });
    } finally {
        ocultarLoader();
    }
}

document.getElementById("btnFiltrarMantenimientos").addEventListener("click", verGraficoPlantaVsEquipo);
