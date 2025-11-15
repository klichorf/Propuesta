// ------------------------------------------------------
// 🔹 TOGGLE DEL MODAL DE REPORTES
// ------------------------------------------------------
export function toggleReportePlantas() {
    console.group("%c➡️ INICIANDO toggleReportePlantas()", "color: blue; font-weight: bold;");

    const btnReporte = document.getElementById("btnReportePlantas");
    const modalEl = document.getElementById("modalReportePlantas");

    if (!btnReporte || !modalEl) {
        console.warn("%c⛔ Botón o modal no encontrados", "color: red; font-weight: bold;");
        console.groupEnd();
        return;
    }

    // Intentar obtener instancia existente
    let modal = bootstrap.Modal.getInstance(modalEl);
    console.log("%c🔹 Instancia de modal obtenida:", "color: purple;", modal);

    // 👉 si no existe instancia, se crea
    if (!modal) {
        console.log("%c⚡ Creando nueva instancia de modal con backdrop 'static'", "color: teal; font-weight: bold;");
        modal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    }

    // Asignar evento click al botón
    btnReporte.addEventListener("click", () => {
        const estaAbierto = modalEl.classList.contains("show");
        console.log("%c📌 Botón clickeado → Modal abierto:", "color: green;", estaAbierto);

        if (estaAbierto) {
            console.log("%c🔹 Cerrando modal...", "color: orange;");
            modal.hide();
        } else {
            console.log("%c🔹 Abriendo modal...", "color: orange;");
            modal.show();
        }
    });

    console.groupEnd();
}
