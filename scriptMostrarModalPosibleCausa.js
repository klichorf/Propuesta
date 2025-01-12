
// Función para mostrar el modal
function mostrarModal() {
    const modal = document.getElementById('justificarModal');
    if (modal) {
        // Mostrar el modal y configurar para que no se cierre al hacer clic fuera o presionar "Esc"
        $(modal).modal({
            backdrop: 'static',  // Evita cerrar el modal al hacer clic fuera de él
            keyboard: false      // Evita cerrar el modal al presionar "Esc"
        });
    }
}