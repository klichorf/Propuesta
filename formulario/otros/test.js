// Función para obtener la fecha actual
function fechaActual() {
    return new Date(); // Devolver la fecha actual
}

// Función para calcular el día juliano
function obtenerDiaJuliano(fecha) {
    const inicioAño = new Date(fecha.getFullYear(), 0, 1); // 1 de enero del mismo año
    const diferencia = fecha - inicioAño; // Diferencia en milisegundos
    const unDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    return Math.round(diferencia / unDia) + 1; // +1 porque el día 1 de enero es el día 1
}

// Calcular y mostrar la hora y el día actual
function mostrarHoraYDia() {
    const fechaHoy = fechaActual();
    const diaJuliano = obtenerDiaJuliano(fechaHoy);

    // Formato de la hora actual
    const horas = String(fechaHoy.getHours()).padStart(2, '0');
    const minutos = String(fechaHoy.getMinutes()).padStart(2, '0');
    const horaFormateada = `${horas}:${minutos}`;

    // Actualizar el contenido del DOM
    document.getElementById("horaActual").textContent = horaFormateada;
    document.getElementById("diaActual").textContent = `Día Juliano: ${diaJuliano}`;
}

// Llamar a la función para mostrar la hora y el día
mostrarHoraYDia();

function actualizarHora() {
    let ahora = new Date();
    let horas = ahora.getHours().toString().padStart(2, '0');
    let minutos = ahora.getMinutes().toString().padStart(2, '0');
    let segundos = ahora.getSeconds().toString().padStart(2, '0');
    document.getElementById('horaActual').textContent = horas + ':' + minutos + ':' + segundos;
}