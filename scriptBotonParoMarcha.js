// Función para alternar entre marcha y paro de la máquina
function toggleMachine() {
    if (!machineRunning) { // Si la máquina no está en marcha
        startMachine(); // Inicia la máquina
        document.getElementById('toggleBtn').innerText = 'Iniciar'; // Cambia el texto del botón
        document.getElementById('toggleBtn').classList.remove('btn-danger'); // Cambia el estilo del botón
        document.getElementById('toggleBtn').classList.add('btn-success'); // Agrega un estilo de botón de pausa
    } else { // Si la máquina está en marcha
        stopMachine(); // Detiene la máquinaPausar máquina
        document.getElementById('toggleBtn').innerText = 'Parar'; // Cambia el texto del botón
        document.getElementById('toggleBtn').classList.remove('btn-success'); // Cambia el estilo del botón
        document.getElementById('toggleBtn').classList.add('btn-danger'); // Agrega un estilo de botón de inicio
    }
}