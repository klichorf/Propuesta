// Cargar Google Charts una sola vez con todos los paquetes necesarios
google.charts.load("current", { packages: ['corechart', 'timeline', 'bar'] });

// Establecer una única función de callback para dibujar todos los gráficos
google.charts.setOnLoadCallback(initCharts);


// Función debounce para limitar la frecuencia de redibujado durante el resize
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
function initCharts() {
    console.log('Inicializando gráficos...'); // Mensaje al iniciar la función
    drawColumnChart();
    console.log('Gráfico de columnas dibujado'); // Confirmación tras dibujar el gráfico de columnas

    drawTimelineChart();
    console.log('Gráfico de la línea de tiempo dibujado'); // Confirmación tras dibujar el gráfico de la línea de tiempo

   
    // Agregar listener para redibujar los gráficos al cambiar el tamaño de la ventana

    window.addEventListener('resize', debounce(drawCharts, 150));
}


// Función para dibujar todos los gráficos
function drawCharts() {
    drawColumnChart();
    drawTimelineChart();
    drawScatterChart()

}

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
function calcularFechaVencimiento(dias) {
    const fechaHoy = fechaActual();
    const milisegundosPorDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const fechaVencimiento = new Date(fechaHoy.getTime() + (dias * milisegundosPorDia)); // Sumar días
    return fechaVencimiento;
}

// Función para mostrar la hora, el día juliano y la fecha de vencimiento
function mostrarHoraYDia(maquina) {
    const fechaHoy = fechaActual();
    const diaJuliano = obtenerDiaJuliano(fechaHoy);

    // Formato de la hora actual
    const horas = String(fechaHoy.getHours()).padStart(2, '0');
    const minutos = String(fechaHoy.getMinutes()).padStart(2, '0');
    const horaFormateada = `${horas}:${minutos}`;

    // Año simplificado (últimos dos dígitos)
    const añoSimplificado = String(fechaHoy.getFullYear()).slice(-2);

    // Calcular la fecha de vencimiento 540 días después de la fecha actual
    const fechaVencimiento = calcularFechaVencimiento(540);
    const diaVencimiento = String(fechaVencimiento.getDate()).padStart(2, '0');
    const mesVencimiento = fechaVencimiento.toLocaleString('default', { month: 'short' }).toUpperCase();
    const añoVencimiento = String(fechaVencimiento.getFullYear()).slice(-2);

    const fechaExpiracion = `${diaVencimiento} ${mesVencimiento} ${añoVencimiento}`;

    // Construir el formato final
    const formatoFinal = `L${diaJuliano} ${maquina} ${añoSimplificado} ${horaFormateada} EXP: ${fechaExpiracion}`;

    // Actualizar el contenido del DOM
    document.getElementById("resultado").textContent = formatoFinal;
}

// Función para actualizar la hora en tiempo real (cada segundo)
function actualizarHora() {
    const maquina = "03"; // Reemplazar con el valor de tu máquina
    mostrarHoraYDia(maquina); // Llama a la función para actualizar el DOM
}

// Llamar a actualizarHora cada segundo para mantener la hora y fecha actualizada
setInterval(actualizarHora, 1000);

// Llamada inicial para mostrar la información al cargar la página
actualizarHora();

// Llamar a la función para mostrar la hora, el día juliano y el formato personalizado
mostrarHoraYDia("04"); // Cambia el número de la máquina según corresponda

// Actualizar la hora cada segundo
setInterval(actualizarHora, 1000);



// Función para dibujar el gráfico de columnas// Función para dibujar el gráfico de columnas
// Función para dibujar el gráfico de columnas
function drawColumnChart() {
    let metaPorHora = 6300; // Meta de producción por hora
    let data = google.visualization.arrayToDataTable([
        ["Hora", "Unidades producidas", { role: "style" }, { role: "annotation" }],
        ["06:00 AM", 5000, (5000 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (5000 / metaPorHora * 100).toFixed(2) + "%"],  // Producción por debajo del 85%
        ["07:00 AM", 7000, (7000 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (7000 / metaPorHora * 100).toFixed(2) + "%"],  // Producción por encima del 85%
        ["08:00 AM", 6200, (6200 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (6200 / metaPorHora * 100).toFixed(2) + "%"],  // Producción cerca del 85%
        ["09:00 AM", 8000, (8000 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (8000 / metaPorHora * 100).toFixed(2) + "%"],  // Producción por encima del 85%
        ["10:00 AM", 4500, (4500 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (4500 / metaPorHora * 100).toFixed(2) + "%"],  // Producción por debajo del 85%
        ["11:00 AM", 6300, (6300 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (6300 / metaPorHora * 100).toFixed(2) + "%"],  // Producción al 100%
        ["12:00 PM", 4000, (4000 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (4000 / metaPorHora * 100).toFixed(2) + "%"],  // Producción por debajo del 85%
        ["01:00 PM", 7500, (7500 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (7500 / metaPorHora * 100).toFixed(2) + "%"],  // Producción por encima del 85%
        ["02:00 PM", 6500, (6500 / metaPorHora * 100) < 85 ? "red" : "#76A7FA", (6500 / metaPorHora * 100).toFixed(2) + "%"]   // Producción por encima del 85%
    ]);

    let view = new google.visualization.DataView(data);
    view.setColumns([0, 1, 2, 3]);  // Mantener las columnas de la tabla

    let options = {
        title: "",
        titleTextStyle: {
            fontSize: 18,
            bold: true,
            alignment: 'center'
        },
        width: '80%',
        height: 300, // Altura fija; puedes ajustarla si lo deseas
        bar: { groupWidth: "75%" },
        legend: { position: "none" },
        chartArea: { width: '85%', height: '60%' }, // Ajusta el área del gráfico
        hAxis: {
            title: '',
            textStyle: {
                fontSize: 12
            },
            titleTextStyle: {
                bold: true,
                italic: false
            }
        },
        vAxis: {
            title: 'OEE',
            minValue: 0,
            textStyle: {
                fontSize: 12
            },
            titleTextStyle: {
                bold: true,
                italic: false
            }
        }
    };

    let chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}



// Cargar la API de Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawScatterChart);

function drawScatterChart() {
    // Datos de ejemplo con una referencia de 250g
    let data = google.visualization.arrayToDataTable([
        ['Hora', 'Peso (g)', { role: 'style' }, { role: 'annotation' }],
        ['06:00 AM', 245, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '245g'],
        ['07:00 AM', 252, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '252g'],
        ['08:00 AM', 249, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '249g'],
        ['09:00 AM', 253, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '253g'],
        ['10:00 AM', 246, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '246g'],
        ['11:00 AM', 250, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '250g'],
        ['12:00 PM', 255, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '255g'],
        ['01:00 PM', 248, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '248g'],
        ['02:00 PM', 251, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '251g']
    ]);

    // Opciones de configuración para el gráfico
    let options = {

        width: '80%',
        height: 300,
        legend: 'none',
        chartArea: {
            width: '80%',
            height: '70%',

 
     
            
        },

        vAxis: {
            title: 'Peso (g)',
            minValue: 240, //peso minimo 
            maxValue: 260,  // peso maximo
            gridlines: { count: 5 }, // Líneas de referencia en el eje vertical
            textStyle: {
                fontSize: 12
            },
            titleTextStyle: {
                bold: true,
                italic: false,
                color: '#a51717' //color rojo
            }
        },
        series: {
            0: {
                color: '#76A7FA',   // Color de la línea y los puntos
                lineWidth: 2,       // Ancho de la línea
                pointSize: 7,       // Tamaño de los puntos
                pointShape: 'circle',
                visibleInLegend: true
            }
        },
        trendlines: { // Línea de tendencia (promedio)
            0: {
                type: 'linear',
                color: 'green',
                lineWidth: 2,
                opacity: 0.9,
                showR2: true, // Mostrar valor R2 en la leyenda
                visibleInLegend: true
            }
        },

    };

    // Crear el gráfico de líneas y dibujarlo
    let chart = new google.visualization.LineChart(document.getElementById('scatterchart_values'));
    chart.draw(data, options);
}



// Funciones para manejar el sidebar
function openSidebar() {
    console.log('Abriendo el sidebar'); // Consola al abrir el sidebar
    document.getElementById("mySidebar").style.width = "370px";
    // Contraer todos los submenús al abrir el sidebar
    document.querySelectorAll('.submenu').forEach(function (submenu) {
        submenu.style.display = 'none';
    });

    // Asegurarse de que todas las cards estén ocultas
    document.querySelectorAll('.card').forEach(function (card) {
        card.style.display = 'none';
    });

    // Si es necesario, también puedes resetear el contador de clics y la selección previa
    contadorClics = 0;
    ultimoItemClicado = null;

}

// Función para cerrar el sidebar y deshabilitar el botón Justificar
function closeSidebar() {
    console.log('Cerrando el sidebar'); // Consola al cerrar el sidebar
    document.getElementById("mySidebar").style.width = "0";

    // Deshabilitar el botón Justificar al cerrar el sidebar
    document.getElementById('btn-justificar-1').disabled = true;
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



document.addEventListener('DOMContentLoaded', function () {
    // Añadir eventos a filas existentes
    document.querySelectorAll('.clickable-row').forEach(addClickEventToRow); // Agrega eventos de clic a las filas que ya existen

    // Lógica para el botón "Justificar"
    document.getElementById('justificar-btn').addEventListener('click', function () {
        console.log('Botón "Justificar" clickeado'); // Muestra un mensaje en la consola cuando se clickea
        const checkboxes = document.querySelectorAll('.clickable-row input[type="checkbox"]'); // Selecciona todos los checkboxes de las filas
        let isChecked = false; // Variable para verificar si algún checkbox está marcado
        checkboxes.forEach(function (checkbox) { // Registrar cada checkbox
            console.log('Checkbox estado:', checkbox.checked); // Muestra el estado de cada checkbox en la consola
            if (checkbox.checked) { // Si el checkbox está marcado
                isChecked = true; // Cambia el valor de isChecked a true
            }
        });
        // Si hay un checkbox marcado, abre el sidebar; Si no, cierra la barra lateral y muestra una alerta
        if (isChecked) {
            console.log('Una opción ha sido seleccionada, abriendo sidebar...');
            openSidebar();
        } else {
            console.log('Ninguna opción seleccionada.');
            closeSidebar();
            showCustomAlert();
        }
        // Actualizar duración total cada vez que se haga clic en el botón
        calculateTotalDuration();
    });

    // Añadir eventos a los checkboxes
    document.querySelectorAll('.clickable-row input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            console.log('Checkbox en la fila clickeado, actualizando duración total...');
            calculateTotalDuration(); // Actualiza la duración total al cambiar el estado del checkbox
        });
    });
});

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


// Función para habilitar o deshabilitar el botón Justificar
function actualizarEstadoBoton() {
    const botonJustificar = document.getElementById('btn-justificar-1');
    const seleccionada = document.querySelector('#alarmas-submenu .opcion-seleccionada');
    botonJustificar.disabled = !seleccionada;
}

// Función para mostrar la opción seleccionada
function mostrarSeleccionAlarma(texto, elemento) {
    // Actualizar el texto de la selección debajo del espacio para comentarios
    document.getElementById('seleccion-alarma-texto').innerText = texto;

    // Cambiar el mensaje a "Opción seleccionada"
    document.getElementById('seleccion-mensaje').innerText = "Opción seleccionada";

    // Remover la clase 'opcion-seleccionada' de cualquier opción previamente seleccionada
    document.querySelectorAll('#alarmas-submenu .empacadora-submenu-item').forEach(function (item) {
        item.classList.remove('opcion-seleccionada');
    });

    // Agregar la clase 'opcion-seleccionada' al elemento que fue clicado
    elemento.classList.add('opcion-seleccionada');

    // Actualizar el estado del botón Justificar
    actualizarEstadoBoton();

    // Actualizar el contenido del modal con la opción seleccionada
    document.querySelector('#justificarModal .modal-header h5').innerText = `${texto}`;

}


// Función para mostrar el modal
function mostrarModal() {
    const modal = document.getElementById('justificarModal');
    if (modal) {
        // Mostrar el modal y configurar para que no se cierre al hacer clic fuera o presionar "Esc"
        $(modal).modal({
            backdrop: 'static',  // Evita cerrar el modal al hacer clic fuera de él
            keyboard: false      // Evita cerrar el modal al presionar "Esc"
        });
    }
}



// Asigna el evento onclick al botón Justificar
document.getElementById('btn-justificar-1').addEventListener('click', mostrarModal);

// Variable para contar el número de clics en el mismo item
let contadorClics = 0;
let ultimoItemClicado = null;  // Variable para rastrear el último elemento clicado

// Agrega eventos de clic para cada opción del submenú
document.querySelectorAll('#alarmas-submenu .empacadora-submenu-item').forEach(function (item) {
    item.addEventListener('click', function () {
        // Verifica si el item clicado es el mismo que el último clicado
        if (ultimoItemClicado === this) {
            // Incrementa el contador de clics si es el mismo item
            contadorClics++;
        } else {
            // Si es un nuevo item, resetea el contador y actualiza el último item clicado
            contadorClics = 1;
            ultimoItemClicado = this;
        }

        // Solo realiza la acción si se han hecho 3 clics consecutivos en el mismo item
        if (contadorClics === 3) {
            // Obtiene el texto del ítem clicado
            let itemText = this.innerText.trim();

            // Según el ítem, abre el modal adecuado
            if (itemText === 'Tolva 1') {
                $('#modal-tolva1').modal('show');
            } else if (itemText === 'Tolva 2') {
                $('#modal-tolva2').modal('show');
            } else if (itemText === 'Doble descarga') {
                $('#modal-doble-descarga').modal('show');
            }
            // Añade más condiciones según los otros ítems del submenú

            // Resetea el contador de clics y el último item clicado después de mostrar el modal
            contadorClics = 0;
            ultimoItemClicado = null;
        }

        // Llama a la función para mostrar la alarma seleccionada (opcional)
        mostrarSeleccionAlarma(this.innerText, this);
    });
});



// Función para limpiar la selección y contraer los submenús y cards
function limpiarSeleccion() {
    // Restablecer el mensaje a "Seleccione una opción" y "Ninguna opción seleccionada"
    document.getElementById('seleccion-mensaje').innerText = "Seleccione una opción:";
    document.getElementById('seleccion-alarma-texto').innerText = "Ninguna opción seleccionada";

    // Remover la clase 'opcion-seleccionada' de cualquier opción previamente seleccionada
    document.querySelectorAll('#alarmas-submenu .empacadora-submenu-item').forEach(function (item) {
        item.classList.remove('opcion-seleccionada');
    });

    // Contraer todos los submenús
    document.querySelectorAll('.submenu').forEach(function (submenu) {
        submenu.style.display = 'none';
    });

    // Ocultar todas las cards activas (alertas)
    document.querySelectorAll('.card').forEach(function (card) {
        card.style.display = 'none';
    });
}

// Evento para cerrar las cards cuando se hace clic en el botón "Cerrar"
document.querySelectorAll('.cerrar-card').forEach(function (button) {
    button.addEventListener('click', function () {
        // Oculta la card actual
        this.closest('.card').style.display = 'none';
    });
});


