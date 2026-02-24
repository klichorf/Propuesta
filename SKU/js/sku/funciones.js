// js/funciones.js

import { materiales } from "../sku/datos.js";

/**
 * Busca un material por SKU o por código de material
 */
export function buscarMaterial(codigo) {
  if (!codigo) return null;

  const normalizado = codigo.toString().trim();

  return (
    materiales.find(m =>
      m.sku === normalizado || m.material === normalizado
    ) || null
  );
}

/**
 * Muestra la información del material en el formulario
 */
export function mostrarInfo(material) {
  if (!material) {
    console.warn("Material no encontrado");
    limpiarCampos();
    return;
  }

  const $texto = document.getElementById("texto");
  const $marca = document.getElementById("marca");
  const $presentacion = document.getElementById("presentacion");
  const $subgrupo = document.getElementById("subgrupo");
  const $pacas = document.getElementById("pacas");
  const $unidades = document.getElementById("unidades");

  if ($texto) $texto.value = material.texto || "";
  if ($marca) $marca.value = material.marca || "";
  if ($presentacion) $presentacion.value = material.presentacion || "";
  if ($subgrupo) $subgrupo.value = material.subgrupo || "";
  if ($pacas) $pacas.value = material.pacas || "";
  if ($unidades) $unidades.value = material.unidades || "";
}

/**
 * Limpia los campos si no se encuentra el material
 */
function limpiarCampos() {
  const ids = ["texto", "marca", "presentacion", "subgrupo", "pacas", "unidades"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}