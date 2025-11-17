// Función para iniciar la máquina
function startMachine() {
    if (!machineRunning) { // Si la máquina no está en marcha
        let currentTime = new Date(); // Obtiene la hora actual
        if (lastStopTime) { // Si hay una hora de parada anterior
            events.push(['Marcha', lastStopTime, currentTime]); // Añade un evento de paro desde la última parada hasta la hora actual
        }
        lastStartTime = currentTime; // Guarda la hora de inicio
        machineRunning = true; // Marca la máquina como en marcha
        updateChart(); // Actualiza el gráfico
    }
}
// Función para parar la máquina
function stopMachine() {
    if (machineRunning) { // Si la máquina está en marcha
        let stopTime = new Date(); // Obtiene la hora de parada
        machineRunning = false; // Marca la máquina como detenida
        events.push(['Paro', lastStartTime, stopTime]); // Agrega un evento de marcha desde la última hora de inicio hasta la parada
        lastStopTime = stopTime; // Guarda la hora de parada
        updateChart(); // Actualiza el gráfico
        // Cálculo de duración en segundos
        let durationInSeconds = Math.round((stopTime - lastStartTime) / 1000); // Calcula la duración en segundos del último período de marcha
        let table = document.getElementById('justificationsTable').getElementsByTagName('tbody')[0]; // Selecciona la tabla de justificaciones
        let newRow = table.insertRow(); // Crea una nueva fila en la tabla
        newRow.classList.add('clickable-row'); // Añade una clase a la fila para hacerla clicable
        // Añade celdas y datos a la nueva fila
        let optionsCell = newRow.insertCell(0); // Crea una celda para opciones (checkbox y círculo)
        let checkbox = document.createElement('input'); // Crea una casilla de verificación
        checkbox.type = 'checkbox'; // Define el tipo como casilla de verificación
        let circle = document.createElement('span'); // Crea un elemento "span" para el círculo rojo
        circle.classList.add('red-circle'); // Agrega una clase para mostrar el círculo rojo
        optionsCell.appendChild(circle); // Agrega el círculo a la celda
        optionsCell.appendChild(checkbox); // Agrega la casilla de verificación a la celda
        newRow.insertCell(1).innerText = formatTime(lastStartTime); // Agrega la hora de inicio formateada en la segunda celda
        newRow.insertCell(2).innerText = formatTime(stopTime); // Agrega la hora de parada formateada en la tercera celda
        // Si la duración es menor a 60 segundos, muestra el tiempo en segundos
        if (durationInSeconds < 60) {
            newRow.insertCell(3).innerText = durationInSeconds + " SEC"; // Muestra el tiempo en segundos
        } else { // Si la duración es mayor, muestra el tiempo en minutos y segundos
            let minutes = Math.floor(durationInSeconds / 60); // Calcula los minutos
            let seconds = Math.floor(durationInSeconds % 60); // Calcula los segundos restantes
            let formattedSeconds = seconds.toString().padStart(2, '0'); // Formatea los segundos con dos dígitos
            newRow.insertCell(3).innerText = minutes + ":" + formattedSeconds + " MIN"; // Muestra el tiempo en minutos y segundos
        }
        // Añade el evento click a la nueva fila
        addClickEventToRow(newRow); // Llama a la función que añade el evento de click a la fila
    }
}