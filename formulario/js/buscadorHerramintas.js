import { listaHerramientas } from "./herramientas.js";

// ------------------------------------------------------
// FUNCIÓN PRINCIPAL: INICIALIZAR BUSCADOR DE HERRAMIENTAS
// ------------------------------------------------------
export function initBuscadorHerramientas() {
  const input = document.getElementById("buscadorHerramientas");
  const sugerencias = document.getElementById("sugerenciasHerramientas");
  const textarea = document.getElementById("herramientas");
  const categoriaSelect = document.getElementById("categoriaHerramientas");

  if (!input || !sugerencias || !textarea) return;

  input.addEventListener("input", () => {
    const valor = input.value.toLowerCase().trim();
    const categoria = categoriaSelect.value;
    sugerencias.innerHTML = "";

    if (valor.length === 0) return;

    let herramientasFiltradas = [];

    if (categoria && listaHerramientas[categoria]) {
      herramientasFiltradas = listaHerramientas[categoria];
    } else {
      herramientasFiltradas = Object.values(listaHerramientas).flat();
    }

    const coincidencias = herramientasFiltradas.filter(h =>
      h.toLowerCase().includes(valor)
    );

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

  input.addEventListener("blur", () => {
    setTimeout(() => (sugerencias.innerHTML = ""), 200);
  });

  categoriaSelect.addEventListener("change", () => {
    sugerencias.innerHTML = "";
    input.value = "";
  });
}
