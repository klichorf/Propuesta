// Función para agregar evento click a las filas
function addClickEventToRow(row) {
    row.addEventListener('click', function () { // Añade un evento de clic en la fila
        const checkbox = this.querySelector('input[type="checkbox"]'); // Selecciona la casilla de verificación dentro de la fila
        const circle = this.querySelector('span'); // Selecciona el círculo dentro de la fila
        if (checkbox) { // Si hay un checkbox
            checkbox.checked = !checkbox.checked; // Cambia el estado del checkbox (marcado/no marcado)
            console.log('Checkbox nuevo estado:', checkbox.checked); // Muestra el nuevo estado en la consola
            // Cambia las clases del círculo según el estado del checkbox
            circle.classList.toggle('green-circle', checkbox.checked); // Añade la clase 'green-circle' si está marcado
            circle.classList.toggle('red-circle', !checkbox.checked); // Agrega la clase 'red-circle' si no está marcado
            // Calcula la duración total cada vez que se cambia el estado
            calculateTotalDuration();
        }
    });
}