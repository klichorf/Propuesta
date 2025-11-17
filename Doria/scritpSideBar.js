// Funciones para manejar el sidebar
function openSidebar() {
    console.log('Abriendo el sidebar'); // Consola al abrir el sidebar
    document.getElementById("mySidebar").style.width = "370px";
    // Contraer todos los submenús al abrir el sidebar
    document.querySelectorAll('.submenu').forEach(function (submenu) {
        submenu.style.display = 'none';
    });
    // Asegurarse de que todas las cards estén ocultas
    document.querySelectorAll('.card').forEach(function (card) {
        card.style.display = 'none';
    });
    // Si es necesario, también puedes resetear el contador de clics y la selección previa
    contadorClics = 0;
    ultimoItemClicado = null;
}
// Función para cerrar el sidebar y deshabilitar el botón Justificar
function closeSidebar() {
    console.log('Cerrando el sidebar'); // Consola al cerrar el sidebar
    document.getElementById("mySidebar").style.width = "0";
    // Deshabilitar el botón Justificar al cerrar el sidebar
    document.getElementById('btn-justificar-1').disabled = true;
}
