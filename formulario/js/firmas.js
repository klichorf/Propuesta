// ------------------------------------------------------
// GESTIÓN DE FIRMAS (EJECUTOR Y SUPERVISOR)
// ------------------------------------------------------
let sigEjecutorData = null;
let sigCoordinadorData = null;

// ------------------------------------------------------
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ------------------------------------------------------
export function initFirmas() {
    // Inicializa las dos firmas cuando se cargue el DOM
    initFirma("sigEjecutor");
    initFirma("sigCoordinador");

    // Vincula los botones de limpieza a la función limpiarFirma
    const btnEjecutor = document.querySelector("#sigEjecutor + button");
    const btnCoordinador = document.querySelector("#sigCoordinador + button");

    if (btnEjecutor) btnEjecutor.addEventListener("click", () => limpiarFirma("sigEjecutor"));
    if (btnCoordinador) btnCoordinador.addEventListener("click", () => limpiarFirma("sigCoordinador"));
}

// ------------------------------------------------------
// FUNCIÓN PARA CREAR UNA FIRMA EN UN CANVAS
// ------------------------------------------------------
function initFirma(id) {
    const c = document.getElementById(id);
    if (!c) return;

    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);

    let dibujando = false;
    let lx, ly;

    function pos(e) {
        const r = c.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
        return { x, y };
    }

    c.addEventListener("pointerdown", (e) => {
        dibujando = true;
        ({ x: lx, y: ly } = pos(e));
    });

    c.addEventListener("pointermove", (e) => {
        if (!dibujando) return;
        const { x, y } = pos(e);
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
        lx = x;
        ly = y;
    });

    window.addEventListener("pointerup", () => (dibujando = false));
}

// ------------------------------------------------------
// FUNCIÓN PARA LIMPIAR UNA FIRMA
// ------------------------------------------------------
export function limpiarFirma(id) {
    const c = document.getElementById(id);
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    if (id === "sigEjecutor") sigEjecutorData = null;
    if (id === "sigCoordinador") sigCoordinadorData = null;
}

// ------------------------------------------------------
// EXPORTAR LAS FIRMAS PARA USAR EN OTROS MÓDULOS
// ------------------------------------------------------
export { sigEjecutorData, sigCoordinadorData };
