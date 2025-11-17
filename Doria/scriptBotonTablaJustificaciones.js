document.addEventListener('DOMContentLoaded', function () {
    // Añadir eventos a filas existentes
    document.querySelectorAll('.clickable-row').forEach(addClickEventToRow); // Agrega eventos de clic a las filas que ya existen
    // Lógica para el botón "Justificar"
    document.getElementById('justificar-btn').addEventListener('click', function () {
        console.log('Botón "Justificar" clickeado'); // Muestra un mensaje en la consola cuando se clickea
        const checkboxes = document.querySelectorAll('.clickable-row input[type="checkbox"]'); // Selecciona todos los checkboxes de las filas
        let isChecked = false; // Variable para verificar si algún checkbox está marcado
        checkboxes.forEach(function (checkbox) { // Registrar cada checkbox
            console.log('Checkbox estado:', checkbox.checked); // Muestra el estado de cada checkbox en la consola
            if (checkbox.checked) { // Si el checkbox está marcado
                isChecked = true; // Cambia el valor de isChecked a true
            }
        });
        // Si hay un checkbox marcado, abre el sidebar; Si no, cierra la barra lateral y muestra una alerta
        if (isChecked) {
            console.log('Una opción ha sido seleccionada, abriendo sidebar...');
            openSidebar();
        } else {
            console.log('Ninguna opción seleccionada.');
            closeSidebar();
            showCustomAlert();
        }
        // Actualizar duración total cada vez que se haga clic en el botón
        calculateTotalDuration();
    });
    // Añadir eventos a los checkboxes
    document.querySelectorAll('.clickable-row input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            console.log('Checkbox en la fila clickeado, actualizando duración total...');
            calculateTotalDuration(); // Actualiza la duración total al cambiar el estado del checkbox
        });
    });
});
