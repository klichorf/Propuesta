// ------------------------------------------------------
// MÓDULO PADRE: BOTONES (Descargar + Compartir)
// ------------------------------------------------------

import { initDescargar } from "./descargar.js";
import { initCompartir } from "./compartir.js";   // ✔️ IMPORTA LA FUNCIÓN CORRECTA
import { crearCronograma } from "../cronograma/cronograma.js";


export function initBotones(validarFormulario, generarPDF) {
    initDescargar(validarFormulario, generarPDF);
    initCompartir(validarFormulario, generarPDF); // ✔️ LLAMAS A LA FUNCIÓN IMPORTADA

   
document.getElementById("btnReporteIntervenciones")
    ?.addEventListener("click", async () => {

        console.log("🟢 CLICK REPORTE INTERVENCIONES");

        const { generarReporteIntervenciones } = await import("../reporte/reporteIntervenciones.js");

        await generarReporteIntervenciones(); // 👈 IMPORTANTE (await)
    });

    
async function guardarCronograma() {

    const data = {
        equipo: document.getElementById("equipo").value,
        area: document.getElementById("area").value,
        planta: document.getElementById("planta").value,
        fechaInicio: document.getElementById("fechaInicio").value,
        fechaFin: document.getElementById("fechaFin").value,
        tipo: document.getElementById("tipoMantenimiento").value,
        ejecutor: document.getElementById("ejecutor").value,
        criticidad: "MEDIA"
    };

    const ok = await crearCronograma(data);

    if (ok) {
        alert("✅ Guardado");
    }
}


    

    }



