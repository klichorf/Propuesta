// ------------------------------------------------------
// MÓDULO: GRÁFICO REAL DE MANTENIMIENTOS
// ------------------------------------------------------
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "./firebase.js";

// Instancia global del modal (evita doble inicialización)
let modalGrafico = null;

export async function verGrafico() {

    const canvas = document.getElementById("graficoMantenimientos");

    if (!canvas) {
        console.error("❌ No existe el canvas #graficoMantenimientos");
        return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("❌ No se pudo obtener el contexto 2D del canvas");
        return;
    }

    if (window.chartMantenimiento) {
        window.chartMantenimiento.destroy();
    }

    // ------------------------------------------------------
    // 1️⃣ LEER DATOS REAL DE FIRESTORE
    // ------------------------------------------------------
    const ref = collection(db, "mantenimientos");
    const snapshot = await getDocs(ref);
    const registros = snapshot.docs.map(doc => doc.data());

    if (registros.length === 0) {
        alert("No hay datos registrados aún.");
        return;
    }

    // ------------------------------------------------------
    // 2️⃣ AGRUPAR POR MES
    // ------------------------------------------------------
    const contadores = {
        "01": 0, "02": 0, "03": 0, "04": 0,
        "05": 0, "06": 0, "07": 0, "08": 0,
        "09": 0, "10": 0, "11": 0, "12": 0
    };

    registros.forEach(reg => {

        let fecha = reg.fechaInicio;
        if (!fecha) return;

        // 🟢 Caso A: viene como string → "2025-11-12T15:11"
        if (typeof fecha === "string") {
            // obtener sólo la parte de fecha
            const soloFecha = fecha.split("T")[0];   // "2025-11-12"
            const partes = soloFecha.split("-");

            if (partes.length === 3) {
                const year = Number(partes[0]);
                const month = Number(partes[1]) - 1;
                const day = Number(partes[2]);

                // crear fecha LOCAL (sin convertir a UTC)
                fecha = new Date(year, month, day);
            } else {
                return; // fecha inválida
            }
        }

        // 🟢 Caso B: viene como Timestamp de Firestore
        else if (typeof fecha.toDate === "function") {
            fecha = fecha.toDate();
        }

        // obtener mes (1–12)
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");

        if (contadores[mes] !== undefined) {
            contadores[mes]++;
        }
    });

    const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    const valores = Object.values(contadores);

    // ------------------------------------------------------
    // 3️⃣ CREAR GRÁFICO
    // ------------------------------------------------------
    window.chartMantenimiento = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Mantenimientos por mes",
                data: valores
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });

    // ------------------------------------------------------
    // 4️⃣ MOSTRAR MODAL (solo una vez)
    // ------------------------------------------------------
    if (!modalGrafico) {
        modalGrafico = new bootstrap.Modal(document.getElementById("modalGrafico"));
    }

    // 🧹 LIMPIAR BACKDROPS PEGADOS
    setTimeout(() => {
        document.querySelectorAll(".modal-backdrop").forEach(b => b.remove());
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
    }, 300);

    modalGrafico.show();
}
