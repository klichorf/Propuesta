document.addEventListener('DOMContentLoaded', function () {
    const yeminaStatus = document.getElementById('yeminaStatus');
    const additionalInfo = document.getElementById('additionalInfo');
    const datePickerElement = document.getElementById('datepicker');

    // Evento para manejar cambios de fecha desde el calendario
    datePickerElement.addEventListener('change.td', function (event) {
        const selectedDate = event.detail.date || new Date(); // Actualizar fecha seleccionada
        actualizarEstado(selectedDate); // Actualizar el estado automáticamente
    });

    // Llamar a la función cada minuto para actualizar la hora
    setInterval(function () {
        const selectedDate = new Date(); // Puedes usar una fecha seleccionada específica si lo prefieres
        actualizarEstado(selectedDate); // Actualiza el estado cada minuto
    }, 60000); // 60000 ms = 1 minuto

    function actualizarEstado(fechaEmpaque) {
        const fechaVencimiento = calcularFechaVencimiento(fechaEmpaque);
        const numeroSemana = obtenerNumeroSemana(fechaEmpaque);
        // Actualizar fecha de empaque y vencimiento
        yeminaStatus.innerHTML = `${formatearFecha(fechaEmpaque)}<br>Vence:<br>${formatearFecha(fechaVencimiento)}<br>Semana: ${numeroSemana}`;
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
        const diaJuliano = Math.floor(diferencia / unDia);
        return String(diaJuliano).padStart(3, '0'); // Asegurar que tenga 3 dígitos
    }

    function obtenerHoraActual() {
        const ahora = new Date();
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    function obtenerNumeroSemana(fecha) {
        const diaSemana = (fecha.getDay() + 6) % 7; // Ajustar para que la semana comience el lunes (0 = lunes, 6 = domingo)
        const juevesDeSemana = new Date(fecha);
        juevesDeSemana.setDate(fecha.getDate() - diaSemana + 3); // Mover al jueves de la semana actual
    
        // Calcular el primer jueves del año
        const primerJuevesAño = new Date(juevesDeSemana.getFullYear(), 0, 4);
        const inicioSemana1 = new Date(primerJuevesAño);
        inicioSemana1.setDate(primerJuevesAño.getDate() - ((primerJuevesAño.getDay() + 6) % 7)); // Ajustar al lunes de esa semana
    
        // Calcular la diferencia de semanas
        const diff = juevesDeSemana - inicioSemana1;
        const semanas = Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) + 1;
    
        return semanas;
    }
    
});
