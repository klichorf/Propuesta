import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "../connection_db/firebase.js";
import { mostrarLoader, ocultarLoader } from "./loader.js"; // asegúrate de importar

let chartMantenimientos = null;

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
export async function verGrafico() {
    mostrarLoader(); // mostrar loader al iniciar
    try {
        const canvas = document.getElementById("graficoMantenimientos");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Tomar valores de los inputs
        let fechaInicio = document.getElementById("datastart").value;
        let fechaFin = document.getElementById("dataend").value;

        // Si están vacíos, usar mes actual
        if (!fechaInicio || !fechaFin) {
            const hoy = new Date();
            const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

            fechaInicio = fechaInicio || primerDia.toISOString().split("T")[0];
            fechaFin = fechaFin || ultimoDia.toISOString().split("T")[0];

            document.getElementById("datastart").value = fechaInicio;
            document.getElementById("dataend").value = fechaFin;
        }

        const registros = await obtenerRegistrosFiltrados(fechaInicio, fechaFin);

        if (chartMantenimientos) chartMantenimientos.destroy();

        if (registros.length === 0) {
            alert("No hay registros válidos en el rango seleccionado.");
            return;
        }

        // 🗓 Meses y plantas
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril",
            "Mayo", "Junio", "Julio", "Agosto",
            "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const plantas = ["GRANOS", "ASEO", "ALIMENTOS", "AGUAS", "OFERTAS", "LOCATIVOS"];
        const colores = [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)"
        ];

        // Crear estructura mes→planta→cantidad
        const datos = {};
        meses.forEach(m => {
            datos[m] = {};
            plantas.forEach(p => datos[m][p] = 0);
        });

        // Contabilizar mantenimientos filtrados
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

        // Renderizar gráfico
        chartMantenimientos = new Chart(ctx, {
            type: "bar",
            data: {
                labels: plantas,
                datasets: [{
                    label: "Mantenimientos",
                    data: plantas.map(p => meses.reduce((acc, m) => acc + datos[m][p], 0)),
                    backgroundColor: colores
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    x: { beginAtZero: true, ticks: { stepSize: 1 } },
                    y: { beginAtZero: true, ticks: { autoSkip: false } }
                }
            }
        });
    } finally {
        ocultarLoader(); // siempre ocultar loader al terminar
    }
}

// Evento para filtrar manualmente
document.getElementById("btnFiltrarMantenimientos").addEventListener("click", verGrafico);
