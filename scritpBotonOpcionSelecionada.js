// Función para habilitar o deshabilitar el botón Justificar
function actualizarEstadoBoton() {
    const botonJustificar = document.getElementById('btn-justificar-1');
    const seleccionada = document.querySelector('#alarmas-submenu .opcion-seleccionada');
    botonJustificar.disabled = !seleccionada;
}