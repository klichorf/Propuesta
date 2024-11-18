document.addEventListener('DOMContentLoaded', function() {
    // Opciones para Tempus Dominus
    const options = {
        display: {
            inline: true, // Muestra el calendario directamente
            components: {
                clock: false, // Desactiva el reloj
                calendar: true // Activa el calendario
            },
        },
        defaultDate: new Date(), // Configura la fecha predeterminada como la actual
        useCurrent: false, // No selecciona automáticamente la fecha actual
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
});

// Función para obtener la fecha actual
function fechaActual() {
    return new Date(); // Devolver la fecha actual
}
// Función para calcular el día juliano
function obtenerDiaJuliano(fecha) {
    const inicioAño = new Date(fecha.getFullYear(), 0, 1); // 1 de enero del mismo año
    const diferencia = fecha - inicioAño; // Diferencia en milisegundos
    const unDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    return Math.floor(diferencia / unDia) + 1; // +1 porque el día 1 de enero es el día 1
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


// Funciones para manejar los dropdowns del navbar
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}
// Funciones para manejar los dropdowns (si aplica)
function toggleDropdown(submenuId) {
    const submenu = document.getElementById(submenuId);
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
}
function toggleSubmenu() {
    const submenu = document.getElementById('ajustes-submenu');
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
}




