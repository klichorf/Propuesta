// ------------------------------------------------------
// MÓDULO: Toasts personalizados (Bootstrap 5)
// ------------------------------------------------------
export function mostrarToast(mensaje, tipo = "info") {
  let contenedor = document.getElementById("toastContainer");

  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "toastContainer";
    contenedor.className =
      "toast-container position-fixed bottom-0 start-50 translate-middle-x p-3";
    document.body.appendChild(contenedor);
  }

  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${tipo} border-0 shadow mb-2`;
  toast.role = "alert";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body text-center">${mensaje}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  contenedor.appendChild(toast);

  const toastBootstrap = new bootstrap.Toast(toast, { delay: 5000 });
  toastBootstrap.show();

  toast.addEventListener("hidden.bs.toast", () => toast.remove());
}
