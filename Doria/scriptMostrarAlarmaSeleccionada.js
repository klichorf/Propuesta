
// Función para mostrar la opción seleccionada
function mostrarSeleccionAlarma(texto, elemento) {
    // Actualizar el texto de la selección debajo del espacio para comentarios
    document.getElementById('seleccion-alarma-texto').innerText = texto;
    // Cambiar el mensaje a "Opción seleccionada"
    document.getElementById('seleccion-mensaje').innerText = "Opción seleccionada";
    // Remover la clase 'opcion-seleccionada' de cualquier opción previamente seleccionada
    document.querySelectorAll('#alarmas-submenu .empacadora-submenu-item').forEach(function (item) {
        item.classList.remove('opcion-seleccionada');
    });
    // Agregar la clase 'opcion-seleccionada' al elemento que fue clicado
    elemento.classList.add('opcion-seleccionada');
    // Actualizar el estado del botón Justificar
    actualizarEstadoBoton();
    // Actualizar el contenido del modal con la opción seleccionada
    document.querySelector('#justificarModal .modal-header ').innerText = `${texto}`;
}
