document.addEventListener('DOMContentLoaded', function() {
    // Opciones para Tempus Dominus
    const options = {
        display: {
            inline: true, // Muestra el calendario directamente
            icons: {
                previous: 'fa-solid fa-chevron-left',
                next: 'fa-solid fa-chevron-right',
            }
        },
        defaultDate: new Date(), // Configura la fecha predeterminada como la actual
    };

    // Inicializar Tempus Dominus directamente en el contenedor
    const datePickerElement = document.getElementById('datepicker');
    new tempusDominus.TempusDominus(datePickerElement, options);

    // Evento para manejar cambios de fecha
    datePickerElement.addEventListener('change.td', function(event) {
        const selectedDate = event.detail.date;
        actualizarHora(selectedDate); // Llamar a la función con la fecha seleccionada
    });

    // Llamada inicial para mostrar la información al cargar la página con la fecha actual
    actualizarHora();

    // Actualizar la hora cada minuto
    setInterval(actualizarHora, 60000); // Actualiza la hora cada 60000 milisegundos (1 minuto)
});

// Función para obtener la fecha actual
function fechaActual() {
    return new Date(); // Devolver la fecha actual
}

function obtenerDiaJuliano(fecha) {
    const inicioAño = new Date(fecha.getFullYear(), 0, 0); // Primer día del año de la fecha seleccionada
    const diferencia = fecha - inicioAño;
    const unDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const diaJuliano = Math.floor(diferencia / unDia);
    return String(diaJuliano).padStart(3, '0'); // Asegurar que tenga 3 dígitos
}

// Función para calcular una fecha de vencimiento sumando días
function calcularFechaVencimiento(fechaBase, dias) {
    const milisegundosPorDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const fechaVencimiento = new Date(fechaBase.getTime() + (dias * milisegundosPorDia)); // Sumar días a la fecha base
    return fechaVencimiento;
}

// Función para mostrar la hora, el día juliano y la fecha de vencimiento
function mostrarHoraYDia(maquina, fechaSeleccionada) {
    const fechaHoy = fechaActual();
    const diaJulianoHoy = obtenerDiaJuliano(fechaHoy);
    const diaJulianoSeleccionado = obtenerDiaJuliano(fechaSeleccionada);

    // Formato de la hora actual
    const horas = String(fechaHoy.getHours()).padStart(2, '0');
    const minutos = String(fechaHoy.getMinutes()).padStart(2, '0');
    const horaFormateada = `${horas}:${minutos}`;

    // Año simplificado (últimos dos dígitos)
    const añoSimplificado = String(fechaHoy.getFullYear()).slice(-2);

    // Calcular la fecha de vencimiento 540 días después de la fecha seleccionada
    const fechaVencimiento = calcularFechaVencimiento(fechaSeleccionada, 540);
    const diaVencimiento = String(fechaVencimiento.getDate()).padStart(2, '0');
    const mesVencimiento = fechaVencimiento.toLocaleString('default', { month: 'short' }).toUpperCase();
    const añoVencimiento = String(fechaVencimiento.getFullYear()).slice(-2);
    const fechaExpiracion = `${diaVencimiento} ${mesVencimiento} ${añoVencimiento}`;

    // Verificar si la fecha seleccionada es anterior a la actual
    let diaJulianoFinal;
    if (fechaSeleccionada < fechaHoy) {
        diaJulianoFinal = diaJulianoHoy; // Mantener el día juliano actual
    } else {
        diaJulianoFinal = diaJulianoSeleccionado; // Actualizar al día juliano de la fecha seleccionada
    }

    // Construir el formato final
    const formatoFinal = `LOTE : L${diaJulianoFinal} ${maquina} ${añoSimplificado} ${horaFormateada} EXP: ${fechaExpiracion}`;

    // Actualizar el contenido del DOM
    document.getElementById("resultado").textContent = formatoFinal;
}

function actualizarHora(fechaSeleccionada = fechaActual()) {
    const fechaHoy = fechaActual();
    const datePickerInput = document.querySelector('#resultado'); // Seleccionar el contenedor con el ID 'resultado'

    // Ignorar la hora, minutos y segundos al comparar las fechas
    const soloFechaHoy = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth(), fechaHoy.getDate());
    const soloFechaSeleccionada = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), fechaSeleccionada.getDate());

    // Comparar solo las fechas (sin la hora)
    if (soloFechaSeleccionada < soloFechaHoy) {
        datePickerInput.style.backgroundColor = "#df0885"; // Fondo rojo para fechas pasadas
        datePickerInput.style.color = "white"; // Letra blanca para mayor contraste con fondo rojo
    } else if (soloFechaSeleccionada > soloFechaHoy) {
        datePickerInput.style.backgroundColor = "#09ff1d"; // Fondo verde para fechas futuras
        datePickerInput.style.color = "black"; // Letra negra para mayor contraste con fondo verde
    } else {
        datePickerInput.style.backgroundColor = "#020f35"; // Fondo por defecto para la fecha actual
        datePickerInput.style.color = "white"; // Letra blanca para mayor contraste con fondo azul oscuro
    }

    const maquina = "03";
    mostrarHoraYDia(maquina, fechaSeleccionada);
}



