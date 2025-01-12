// Función para actualizar el gráfico
function updateChart() {
    dataTable.removeRows(0, dataTable.getNumberOfRows()); // Elimina todas las filas existentes en la tabla
    dataTable.addRows(events); // Agrega los eventos a la tabla de datos
    // Verifica si la tabla de datos está vacía y agrega un valor inicial por defecto
    if (dataTable.getNumberOfRows() === 0) {
        // Agrega una fila con un valor inicial para evitar que el gráfico esté vacío
        let now = new Date();
        dataTable.addRow(['Marcha', new Date(now.getTime() - 60000), now]); // Marcha por 1 minuto
    }
    chart.draw(dataTable); // Dibuja el gráfico con los nuevos datos
}


let dataTable, chart; // Variables para almacenar la tabla de datos y el gráfico de línea de tiempo
let events = []; // Array para registrar los eventos de marcha y paro de la máquina
let machineRunning = false; // Variable que indica si la máquina está en marcha o no
let lastStartTime; // Almacena la última hora en que la máquina empezó a funcionar
let lastStopTime; // Almacena la última hora en que la máquina se detuvo
// Inicializar el gráfico de línea de tiempo
function drawTimelineChart() {
    let container = document.getElementById('timelinechart_div'); // Selecciona el contenedor del gráfico
    chart = new google.visualization.Timeline(container); // Crea un gráfico de línea de tiempo dentro del contenedor
    dataTable = new google.visualization.DataTable(); // Inicializa la tabla de datos
    // Agrega columnas a la tabla de datos
    dataTable.addColumn({ type: 'string', id: 'Activity' }); // Columna de actividad (Marcha o Paro)
    dataTable.addColumn({ type: 'date', id: 'End' }); // Columna de fin
    dataTable.addColumn({ type: 'date', id: 'Start' }); // Columna de inicio
    updateChart(); // Llama a la función que actualiza el gráfico
    // Agrega un evento al gráfico cuando se selecciona una actividad
    google.visualization.events.addListener(chart, 'select', function () {
        let selection = chart.getSelection(); // Obtiene la selección del gráfico
        if (selection.length > 0) { // Si se ha seleccionado una fila
            let row = selection[0].row; // Identifica la fila seleccionada
            let activity = dataTable.getValue(row, 0); // Obtiene el valor de la actividad (Marcha o Paro)
            // Deselecciona todos los checkboxes y actualiza el círculo de cada fila
            const rows = document.querySelectorAll('.clickable-row');
            rows.forEach(function (row) {
                const checkbox = row.querySelector('input[type="checkbox"]');
                const circle = row.querySelector('span');
                if (checkbox) {
                    checkbox.checked = false; // Deselecciona el checkbox
                    // Cambia las clases del círculo
                    circle.classList.remove('green-circle');
                    circle.classList.add('red-circle');
                }
            });
            if (activity === 'Paro') { // Solo si la actividad es "Paro"
                let start = dataTable.getValue(row, 1); // Obtiene la hora de inicio
                let end = dataTable.getValue(row, 2); // Obtiene la hora de fin
                // Calcula la duración en milisegundos
                let durationMs = end - start;
                // Convierte a minutos y segundos
                let durationMinutes = Math.floor((durationMs / 1000) / 60); // Minutos totales
                let durationSeconds = Math.floor((durationMs / 1000) % 60); // Segundos restantes
                // Muestra la duración en el formato "minutos:segundos"
                document.querySelector('#Duración span').innerText = `${durationMinutes} min ${durationSeconds} s`;
                // Abre la barra lateral para justificación
                openSidebar();
            }
        }
    });
}