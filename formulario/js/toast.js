// ------------------------------------------------------
// MÓDULO: Toasts personalizados (Bootstrap 5)
// ------------------------------------------------------
export function mostrarToast(mensaje, tipo = "info") {
  // Crear contenedor si no existe
  let contenedor = document.getElementById("toastContainer");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "toastContainer";
    contenedor.className = "toast-container position-fixed top-0 end-0 p-3";
    document.body.appendChild(contenedor);
  }

  // Crear el toast
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${tipo} border-0 shadow`;
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${mensaje}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  // Mostrar el toast
  contenedor.appendChild(toast);
  const toastBootstrap = new bootstrap.Toast(toast, { delay: 4000 });
  toastBootstrap.show();

  // Eliminarlo al cerrarse
  toast.addEventListener("hidden.bs.toast", () => toast.remove());
}
