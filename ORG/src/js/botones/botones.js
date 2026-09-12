// ------------------------------------------------------
// MÓDULO PADRE: BOTONES (Descargar + Compartir)
// ------------------------------------------------------

import { initDescargar } from "./descargar.js";
import { initCompartir } from "./compartir/compartir.js";   // ✔️ IMPORTA LA FUNCIÓN CORRECTA



export function initBotones(validarFormulario, generarPDF) {
    initDescargar(validarFormulario, generarPDF);
    initCompartir(validarFormulario, generarPDF); // ✔️ LLAMAS A LA FUNCIÓN IMPORTADA
    }



