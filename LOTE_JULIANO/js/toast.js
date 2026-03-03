export function mostrarToast(mensaje, tipo = "success") {
  const toast = document.createElement("div");
  toast.className = `toast-personalizado toast-${tipo}`;
  toast.textContent = mensaje;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("visible"), 50);
  setTimeout(() => toast.classList.remove("visible"), 2500);
  setTimeout(() => toast.remove(), 3000);
}