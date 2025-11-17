// Función para limpiar la selección y contraer los submenús y cards
function limpiarSeleccion() {
    // Restablecer el mensaje a "Seleccione una opción" y "Ninguna opción seleccionada"
    document.getElementById('seleccion-mensaje').innerText = "Seleccione una opción:";
    document.getElementById('seleccion-alarma-texto').innerText = "Ninguna opción seleccionada";
    // Remover la clase 'opcion-seleccionada' de cualquier opción previamente seleccionada
    document.querySelectorAll('#alarmas-submenu .empacadora-submenu-item').forEach(function (item) {
        item.classList.remove('opcion-seleccionada');
    });
    // Contraer todos los submenús
    document.querySelectorAll('.submenu').forEach(function (submenu) {
        submenu.style.display = 'none';
    });
    // Ocultar todas las cards activas (alertas)
    document.querySelectorAll('.card').forEach(function (card) {
        card.style.display = 'none';
    });
}
