import { listarActivos, crearActivo, actualizarActivo, eliminarActivo } from "./activosService.js";
import { subirAOneDriveConProgreso } from "../services/onedrive/onedrive.js";
import { normalizarUrlSharePoint } from "../services/onedrive/sharepointUrls.js";
import { mostrarToast } from "../toast.js";
import { sanitize, convertirArchivoABase64 } from "../botones/utils.js";
import { datosPlantas } from "../selects.js";

const campos = [
  "planta",
  "area",
  "codigo",
  "centroCosto",
  "localizacion",
  "maquinaEquipo",
  "marca",
  "modelo",
  "serial",
  "descripcionBasica",
  "valorReposicionLinea",
  "valorReposicionTotal"
];

let activos = [];
let fotoSeleccionada = null;
let fotoActual = null;

export function initActivosApp() {
  const form = $("formActivo");
  if (!form) return;

  form.addEventListener("submit", guardarActivo);
  $("btnLimpiarActivo")?.addEventListener("click", limpiarFormulario);
  $("btnQuitarFoto")?.addEventListener("click", quitarFoto);
  $("fotoActivo")?.addEventListener("change", manejarFoto);
  $("buscarActivo")?.addEventListener("input", renderActivos);
  $("filtroPlanta")?.addEventListener("change", renderActivos);
  $("btnRecargarActivos")?.addEventListener("click", cargarActivos);
  initSelectoresEquipo();

  window.editarActivo = editarActivo;
  window.eliminarActivo = confirmarEliminarActivo;

  cargarActivos();
}

async function cargarActivos() {
  setEstado("Cargando activos...");
  try {
    activos = await listarActivos();
    renderActivos();
    setEstado(`${activos.length} activos cargados`);
  } catch (error) {
    console.error("Error cargando activos:", error);
    mostrarToast("No se pudieron cargar los activos", "danger");
    setEstado("Error cargando activos");
  }
}

async function guardarActivo() {
  const id = $("activoId").value;
  const data = obtenerDatosFormulario();

  if (!validarDatos(data, Boolean(id))) return;

  const btn = $("btnGuardarActivo");
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Guardando`;
  mostrarProgreso("Preparando activo...", 5);

  try {
    if (fotoSeleccionada) {
      mostrarProgreso("Subiendo foto a SharePoint...", 15);
      const foto = await subirFotoActivo(data, fotoSeleccionada);
      Object.assign(data, foto);
    } else if (fotoActual) {
      Object.assign(data, fotoActual);
    }

    if (id) {
      await actualizarActivo(id, data);
      mostrarToast("Activo actualizado correctamente", "success");
    } else {
      await crearActivo(data);
      mostrarToast("Activo creado correctamente", "success");
    }

    mostrarProgreso("Completado", 100);
    limpiarFormulario();
    await cargarActivos();
  } catch (error) {
    console.error("Error guardando activo:", error);
    mostrarToast("No se pudo guardar el activo", "danger");
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-save"></i> Guardar`;
    setTimeout(ocultarProgreso, 600);
  }
}

function obtenerDatosFormulario() {
  return campos.reduce((data, id) => {
    const inputId = id === "area" ? "areaActivo" : id;
    data[id] = $(inputId).value.trim();
    return data;
  }, {});
}

function validarDatos(data, editando) {
  for (const campo of campos) {
    if (!data[campo]) {
      mostrarToast("Completa todos los campos del activo", "warning");
      $((campo === "area" ? "areaActivo" : campo))?.focus();
      return false;
    }
  }

  if (!editando && !fotoSeleccionada) {
    mostrarToast("Toma o selecciona la foto del activo", "warning");
    return false;
  }

  return true;
}

async function subirFotoActivo(data, file) {
  const extension = obtenerExtension(file.name, file.type);
  const serial = limpiarSegmento(data.codigo || data.serial || data.maquinaEquipo || "activo");
  const nombreArchivo = sanitize(`${serial}_${Date.now()}.${extension}`);
  const rutaCarpeta = `Documentos/PLANTA/${sanitize(data.planta)}/ACTIVOS/IMAGENES`;
  const base64 = await convertirArchivoABase64(file);

  const resultado = await subirAOneDriveConProgreso(nombreArchivo, rutaCarpeta, base64, (porcentaje) => {
    mostrarProgreso(`Subiendo foto a SharePoint: ${Math.min(porcentaje, 99)}%`, Math.min(porcentaje, 99));
  });

  if (!resultado.ok || !resultado.url) {
    throw new Error(resultado.mensaje || "SharePoint no devolvio URL de la foto");
  }

  return {
    fotoUrlSharePoint: normalizarUrlSharePoint(resultado.url),
    fotoNombreSharePoint: nombreArchivo,
    fotoRutaSharePoint: rutaCarpeta
  };
}

function manejarFoto(event) {
  const [file] = event.target.files || [];
  fotoSeleccionada = file || null;

  if (!file) {
    actualizarPreview("");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => actualizarPreview(reader.result);
  reader.readAsDataURL(file);
  $("fotoActual").textContent = file.name;
}

function editarActivo(id) {
  const activo = activos.find((item) => item.id === id);
  if (!activo) return;

  $("activoId").value = activo.id;
    campos.forEach((campo) => {
    if (campo === "area") return;
    $(campo).value = activo[campo] || "";
  });
  $("areaActivo").value = activo.area || activo.areaActivo || "";
  cargarEquiposPorArea();
  $("maquinaEquipo").value = activo.maquinaEquipo || "";
  $("codigo").value = activo.codigo || obtenerCodigoEquipoSeleccionado() || "";

  fotoSeleccionada = null;
  fotoActual = {
    fotoUrlSharePoint: activo.fotoUrlSharePoint || "",
    fotoNombreSharePoint: activo.fotoNombreSharePoint || "",
    fotoRutaSharePoint: activo.fotoRutaSharePoint || ""
  };

  actualizarPreview("");
  $("fotoActual").textContent = activo.fotoNombreSharePoint
    ? `Foto actual: ${activo.fotoNombreSharePoint}`
    : "Sin foto guardada";
  $("modoFormulario").textContent = "Editando";
  $("modoFormulario").className = "badge text-bg-warning";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function confirmarEliminarActivo(id) {
  const activo = activos.find((item) => item.id === id);
  const nombre = activo?.maquinaEquipo || activo?.serial || id;

  if (!confirm(`¿Eliminar el activo ${nombre}? La foto en SharePoint no se elimina automáticamente.`)) return;

  try {
    await eliminarActivo(id);
    mostrarToast("Activo eliminado de Firebase", "success");
    await cargarActivos();
    if ($("activoId").value === id) limpiarFormulario();
  } catch (error) {
    console.error("Error eliminando activo:", error);
    mostrarToast("No se pudo eliminar el activo", "danger");
  }
}

function quitarFoto() {
  fotoSeleccionada = null;
  fotoActual = null;
  $("fotoActivo").value = "";
  actualizarPreview("");
  $("fotoActual").textContent = "";
}

function limpiarFormulario() {
  $("formActivo").reset();
  $("activoId").value = "";
  $("fotoActivo").value = "";
  fotoSeleccionada = null;
  fotoActual = null;
  actualizarPreview("");
  $("fotoActual").textContent = "";
  $("modoFormulario").textContent = "Nuevo";
  $("modoFormulario").className = "badge text-bg-primary";
  limpiarSeleccionEquipo();
}

function renderActivos() {
  const tbody = $("tablaActivos");
  const sinActivos = $("sinActivos");
  const filtroPlanta = $("filtroPlanta")?.value || "TODAS";
  const busqueda = ($("buscarActivo")?.value || "").trim().toLowerCase();

  const filtrados = activos.filter((activo) => {
    const coincidePlanta = filtroPlanta === "TODAS" || activo.planta === filtroPlanta;
    const texto = [
      activo.codigo,
      activo.area,
      activo.centroCosto,
      activo.localizacion,
      activo.maquinaEquipo,
      activo.marca,
      activo.modelo,
      activo.serial,
      activo.descripcionBasica
    ].join(" ").toLowerCase();
    return coincidePlanta && (!busqueda || texto.includes(busqueda));
  });

  tbody.innerHTML = filtrados.map((activo) => crearFila(activo)).join("");
  sinActivos.classList.toggle("d-none", filtrados.length > 0);
}

function crearFila(activo) {
  const fotoUrl = normalizarUrlSharePoint(activo.fotoUrlSharePoint || activo.rutaFotoSharePoint || activo.fotoRutaSharePoint || "");

  return `
    <tr>
      <td>${esc(activo.planta)}</td>
      <td>${esc(activo.codigo)}</td>
      <td>${esc(activo.centroCosto)}</td>
      <td>${esc(activo.localizacion)}</td>
      <td>${esc(activo.maquinaEquipo)}</td>
      <td>${esc(activo.marca)}</td>
      <td>${esc(activo.modelo)}</td>
      <td>${esc(activo.serial)}</td>
      <td>${fotoUrl ? `<a class="btn btn-sm btn-outline-primary" href="${fotoUrl}" target="_blank" rel="noopener">Ver foto</a>` : "-"}</td>
      <td>
        <div class="d-flex gap-1">
          <button type="button" class="btn btn-sm btn-outline-secondary" title="Editar" onclick="editarActivo('${activo.id}')"><i class="bi bi-pencil"></i></button>
          <button type="button" class="btn btn-sm btn-outline-danger" title="Eliminar" onclick="eliminarActivo('${activo.id}')"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `;
}

function actualizarPreview(src) {
  const preview = $("previewFoto");
  preview.src = src || "";
  preview.classList.toggle("d-none", !src);
}

function mostrarProgreso(texto, porcentaje) {
  const overlay = $("loaderOverlay2");
  const label = $("loaderProgress2");
  const fill = document.querySelector(".progressBar2-fill");
  if (overlay) overlay.classList.add("active");
  if (label) label.textContent = texto;
  if (fill) fill.style.width = `${porcentaje}%`;
}

function ocultarProgreso() {
  const overlay = $("loaderOverlay2");
  const fill = document.querySelector(".progressBar2-fill");
  if (overlay) overlay.classList.remove("active");
  if (fill) fill.style.width = "0%";
}

function setEstado(texto) {
  const estado = $("estado");
  if (estado) estado.textContent = texto;
}

function initSelectoresEquipo() {
  $("planta")?.addEventListener("change", () => {
    cargarAreasPorPlanta();
    limpiarSeleccionEquipo();
  });

  $("areaActivo")?.addEventListener("change", cargarEquiposPorArea);
  $("maquinaEquipo")?.addEventListener("change", () => {
    $("codigo").value = obtenerCodigoEquipoSeleccionado();
  });
}

function cargarAreasPorPlanta() {
  const planta = $("planta").value;
  const areaSelect = $("areaActivo");
  if (!areaSelect) return;

  areaSelect.innerHTML = `<option value="">Seleccione un área...</option>`;
  Object.keys(datosPlantas[planta] || {}).forEach((area) => {
    const opt = document.createElement("option");
    opt.value = area;
    opt.textContent = area;
    areaSelect.appendChild(opt);
  });
}

function cargarEquiposPorArea() {
  const planta = $("planta").value;
  const area = $("areaActivo").value;
  const equipoSelect = $("maquinaEquipo");
  if (!equipoSelect) return;

  equipoSelect.innerHTML = `<option value="">Seleccione un equipo...</option>`;
  const equipos = datosPlantas[planta]?.[area] || [];

  equipos.forEach((equipo) => {
    const opt = document.createElement("option");
    if (typeof equipo === "string") {
      opt.value = equipo;
      opt.textContent = equipo;
    } else {
      opt.value = equipo.nombre;
      opt.textContent = equipo.nombre;
      opt.dataset.codigo = equipo.codigo;
    }
    equipoSelect.appendChild(opt);
  });

  $("codigo").value = obtenerCodigoEquipoSeleccionado();
}

function obtenerCodigoEquipoSeleccionado() {
  return $("maquinaEquipo")?.selectedOptions?.[0]?.dataset?.codigo || "";
}

function limpiarSeleccionEquipo() {
  const equipoSelect = $("maquinaEquipo");
  if (equipoSelect) equipoSelect.innerHTML = `<option value="">Seleccione un área...</option>`;
  $("codigo").value = "";
}

function limpiarSegmento(valor) {
  return sanitize(valor).replace(/\//g, "_").replace(/\s+/g, "_");
}

function obtenerExtension(nombre, tipo) {
  const desdeNombre = String(nombre || "").split(".").pop();
  if (desdeNombre && desdeNombre !== nombre) return desdeNombre.toLowerCase();
  if (tipo === "image/png") return "png";
  if (tipo === "image/webp") return "webp";
  return "jpg";
}

function esc(valor) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function $(id) {
  return document.getElementById(id);
}








