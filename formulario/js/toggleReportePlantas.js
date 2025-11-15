export function toggleReportePlantas() {

    const btnReporte = document.getElementById("btnReportePlantas");
    const modalEl = document.getElementById("modalReportePlantas");

    if (!btnReporte || !modalEl) return;

    let modal = bootstrap.Modal.getInstance(modalEl);

    // 👉 si no existe instancia, se crea
    if (!modal) {
        modal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    }

    btnReporte.addEventListener("click", () => {

        const estaAbierto = modalEl.classList.contains("show");

        if (estaAbierto) {
            modal.hide(); // cerrar
        } else {
            modal.show(); // abrir
        }
    });
}
