
// Función para calcular y mostrar la duración total
function calculateTotalDuration() {
    const rows = document.querySelectorAll('#justificationsTable tbody tr'); // Selecciona todas las filas de la tabla
    let totalSeconds = 0; // Inicializa la duración total en segundos
    rows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]'); // Selecciona el checkbox de la fila
        if (checkbox && checkbox.checked) { // Solo sumar la duración de filas con checkbox marcado
            const durationCell = row.cells[3].innerText; // Obtiene el texto de la celda de duración
            let durationInSeconds = 0;
            // Analiza el texto para obtener la duración en segundos
            if (durationCell.includes("SEC")) {
                durationInSeconds = parseInt(durationCell); // Extrae el valor en segundos
            } else if (durationCell.includes("MIN")) {
                const [minutes, seconds] = durationCell.split(":"); // Separa minutos y segundos
                durationInSeconds = parseInt(minutes) * 60 + parseInt(seconds); // Convierte todo a segundos
            }
            totalSeconds += durationInSeconds; // Suma la duración de la fila
        }
    });
    // Actualiza el elemento de duración total en la interfaz
    document.querySelector('#Duración span').innerText = formatDuration(totalSeconds);
}


// Función para formatear la duración total en un formato legible
function formatDuration(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return minutes + " min " + seconds + " s";
}
// Función para mostrar alerta personalizada
function showCustomAlert() {
    const customAlert = document.getElementById('custom-alert'); // Selecciona el elemento de alerta personalizada
    customAlert.style.display = 'block'; // Muestra el mensaje de alerta
    // Ocultar el mensaje después de 1.5 segundos (opcional)
    setTimeout(() => {
        customAlert.style.display = 'none'; // Oculta el mensaje después de 1.5 segundos
    }, 1500);
}

// Función para formatear la fecha y hora incluyendo los segundos
function formatTime(date) {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    return hours + ':' + minutes + ':' + seconds;
}