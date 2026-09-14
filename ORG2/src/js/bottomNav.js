import { irInicio, resetWizard } from "./wizard.js";
import { hayCambiosInforme, marcarInformeLimpio } from "./estadoInforme.js";
import { limpiarFormulario } from "./botones/datosFormulario.js";

const nav = document.getElementById("appBottomNav");
const nuevoInforme = document.getElementById("btnNuevoInforme");
const perfilButton = document.getElementById("btnPerfilNav");
const perfilMenu = document.getElementById("perfilMenu");

function cerrarPerfil() {
    if (!perfilMenu || !perfilButton) return;
    perfilMenu.hidden = true;
    perfilButton.setAttribute("aria-expanded", "false");
}

function alternarPerfil() {
    if (!perfilMenu || !perfilButton) return;
    const abierto = !perfilMenu.hidden;
    perfilMenu.hidden = abierto;
    perfilButton.setAttribute("aria-expanded", String(!abierto));
}

perfilButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    alternarPerfil();
});

document.addEventListener("click", (event) => {
    if (!perfilMenu || perfilMenu.hidden) return;
    if (!perfilMenu.contains(event.target) && event.target !== perfilButton) cerrarPerfil();
});

nav?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-bottom-nav]");
    if (!button || button === perfilButton) return;

    const action = button.dataset.bottomNav;

    if (action === "inicio") {
        cerrarPerfil();
        // Inicio es navegación, NO es "nuevo informe".
        // Nunca borra lo que el técnico ya diligenció.
        irInicio();
        actualizarActivo("inicio");
        return;
    }

    if (action === "informes" || action === "activos") {
        cerrarPerfil();
        actualizarActivo(action);
        window.dispatchEvent(new CustomEvent("app:navegacion", { detail: { pagina: action } }));
    }
});

nuevoInforme?.addEventListener("click", () => {
    cerrarPerfil();

    if (hayCambiosInforme()) {
        const confirmar = window.confirm(
            "Tienes un informe en progreso. ¿Deseas descartarlo y comenzar un informe nuevo?"
        );
        if (!confirmar) return;
    }

    limpiarFormulario();
    marcarInformeLimpio();
    resetWizard();
    actualizarActivo("inicio");
});

function actualizarActivo(pagina) {
    nav?.querySelectorAll(".app-bottom-nav-item").forEach((item) => {
        const action = item.dataset.bottomNav;
        const activo = action === pagina;
        item.classList.toggle("active", activo);
        if (activo) item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
    });
}
