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


document.addEventListener('DOMContentLoaded', function () {
    const yeminaStatus = document.getElementById('yeminaStatus');
    const additionalInfo = document.getElementById('additionalInfo');
    const datePickerElement = document.getElementById('datepicker');

    // Evento para manejar cambios de fecha desde el calendario
    datePickerElement.addEventListener('change.td', function (event) {
        const selectedDate = event.detail.date || new Date(); // Actualizar fecha seleccionada
        actualizarEstado(selectedDate); // Actualizar el estado automáticamente
    });

    function actualizarEstado(fechaEmpaque) {
        const fechaVencimiento = calcularFechaVencimiento(fechaEmpaque);
        const numeroSemana = obtenerNumeroSemana(fechaEmpaque);
        // Actualizar fecha de empaque y vencimiento
        yeminaStatus.innerHTML = `${formatearFecha(fechaEmpaque)} - Vence: ${formatearFecha(fechaVencimiento)}<br>Semana: ${numeroSemana}`;
        // Actualizar información adicional
        const mesVencimiento = obtenerNombreMesCorto(fechaVencimiento);
        const añoVencimiento = fechaVencimiento.getFullYear();
        const codigoLDR = `LDR ${obtenerUltimoDigitoAño(fechaEmpaque)} ${obtenerDiaJuliano(fechaEmpaque)}`;
        const horaActual = obtenerHoraActual();
        const maquina = "L3"; // Identificación de la máquina

     

        // Actualizar contenido adicional con la semana
        additionalInfo.innerHTML = `${mesVencimiento} ${añoVencimiento}<br>${codigoLDR}<br>${horaActual} ${maquina}`;
    }

    function calcularFechaVencimiento(fechaBase) {
        const fechaVencimiento = new Date(fechaBase);
        fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 2); // Sumar 2 años
        fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 8); // Sumar 8 meses
        return fechaVencimiento;
    }

    function formatearFecha(fecha) {
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses comienzan en 0
        const año = fecha.getFullYear();
        return `${dia}/${mes}/${año}`;
    }

    function obtenerNombreMesCorto(fecha) {
        const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        return meses[fecha.getMonth()];
    }

    function obtenerUltimoDigitoAño(fecha) {
        return String(fecha.getFullYear()).slice(-1);
    }

    function obtenerDiaJuliano(fecha) {
        const inicioAño = new Date(fecha.getFullYear(), 0, 0); // Primer día del año de la fecha seleccionada
        const diferencia = fecha - inicioAño;
        const unDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
        return Math.floor(diferencia / unDia);
    }

    function obtenerHoraActual() {
        const ahora = new Date();
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    // Función para obtener el número de semana
    function obtenerNumeroSemana(fecha) {
        const primerDiaAnio = new Date(fecha.getFullYear(), 0, 1);
        const diasTranscurridos = Math.floor((fecha - primerDiaAnio) / (1000 * 60 * 60 * 24));
        return Math.ceil((diasTranscurridos + 1) / 7);
    }
});
