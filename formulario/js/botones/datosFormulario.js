import { limpiarFirma } from "../firmas.js";
import { imagesData } from "../fotos.js";

export function obtenerDatosFormulario() {
  return {
    codigo: document.getElementById("codigo").value,
    planta: document.getElementById("planta").value.trim(),
    area: document.getElementById("area").value.trim(),
    equipo: document.getElementById("equipo").value.trim(),
    fechaInicio: document.getElementById("fechaInicio").value,
    fechaFin: document.getElementById("fechaFin").value,
    tipoMantenimiento: document.getElementById("tipoMantenimiento").value.trim(),
    ejecutor: document.getElementById("ejecutor").value,
    danos: document.getElementById("danos").value,
    trabajo: document.getElementById("trabajo").value,
    herramientas: document.getElementById("herramientas").value,
    repuestos: document.getElementById("repuestos").value,
    timestamp: new Date().toISOString()
  };
}


export function limpiarFormulario() {
  document.getElementById("formulario").reset();
  window.scrollTo({ top: 0, behavior: "smooth" });
  limpiarFirma("sigEjecutor");
  limpiarFirma("sigCoordinador");
  imagesData.length = 0;
  const thumbs = document.getElementById("thumbs");
  if (thumbs) thumbs.innerHTML = "";
}