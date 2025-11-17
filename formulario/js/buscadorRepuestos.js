


import { listaRepuestos } from "./repuestos.js";

// ------------------------------------------------------
// FUNCIÓN PRINCIPAL: INICIALIZAR BUSCADOR DE REPUESTOS
// ------------------------------------------------------
export function initBuscadorRepuestos() {
  const input = document.getElementById("buscadorRepuestos");
  const sugerencias = document.getElementById("sugerencias");
  const textarea = document.getElementById("repuestos");
  const categoriaSelect = document.getElementById("categoriaRepuesto");

  if (!input || !sugerencias || !textarea) return;

  // 🔹 Cada vez que el usuario escribe algo...
  input.addEventListener("input", () => {
    const valor = input.value.toLowerCase().trim();
    const categoria = categoriaSelect.value;
    sugerencias.innerHTML = "";

    if (valor.length === 0) return;

    // 🔸 Filtrar lista según la categoría seleccionada
    let repuestosFiltrados = [];

    if (categoria && listaRepuestos[categoria]) {
      repuestosFiltrados = listaRepuestos[categoria];
    } else {
      // Combinar todas las categorías
      repuestosFiltrados = Object.values(listaRepuestos).flat();
    }

    // 🔹 Filtrar por texto ingresado
    const coincidencias = repuestosFiltrados.filter(r =>
      r.toLowerCase().includes(valor)
    );

    // 🔹 Mostrar sugerencias
    coincidencias.slice(0, 5).forEach(item => {
      const div = document.createElement("div");
      div.classList.add("sugerencia-item");
      div.textContent = item;

      div.addEventListener("click", () => {
        textarea.value += (textarea.value ? "\n" : "") + item;
        input.value = "";
        sugerencias.innerHTML = "";
      });

      sugerencias.appendChild(div);
    });
  });

  // 🔹 Ocultar sugerencias al perder el foco
  input.addEventListener("blur", () => {
    setTimeout(() => (sugerencias.innerHTML = ""), 200);
  });

  // 🔹 Limpiar sugerencias si cambia la categoría
  categoriaSelect.addEventListener("change", () => {
    sugerencias.innerHTML = "";
    input.value = "";
  });
}
