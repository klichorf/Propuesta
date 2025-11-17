// Cargar la API de Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawScatterChart);

function drawScatterChart() {
    // Datos de ejemplo con una referencia de 250g
    let data = google.visualization.arrayToDataTable([
        ['Hora', 'Peso (g)', { role: 'style' }, { role: 'annotation' }],
        ['06:00 AM', 245, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '245g'],
        ['07:00 AM', 252, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '252g'],
        ['08:00 AM', 250.1, 'point { size: 5; shape-type: circle; fill-color:#020200 }', '250.1g'],
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

    // Cambiar el color de los puntos y agregar anotaciones
    for (let i = 0; i < data.getNumberOfRows(); i++) {
        let peso = data.getValue(i, 1);
        let color, annotation;

        // Asignar color y anotación basados en el valor del peso
        if (peso > 250.2) {
            color = '#FF0000'; // Rojo para Peso Alto
            annotation = 'Peso Alto';
        } else if (peso < 249.8) {
            color = '#FF0000'; // Rojo para Peso Bajo
            annotation = 'Peso Bajo';
        } else {
            color = '#0000FF'; // Azul para Peso en Rango
            annotation = 'Peso Normal'; // Etiqueta de Peso Normal si está dentro del rango
        }

        // Actualizar el color y la anotación en los datos
        data.setValue(i, 2, `point { size: 5; shape-type: circle; fill-color:${color} }`);
        data.setValue(i, 3, annotation); // Asignar la anotación correspondiente
    }

    // Crear el gráfico de líneas y dibujarlo
    let chart = new google.visualization.LineChart(document.getElementById('scatterchart_values'));
    chart.draw(data, options);

    // Añadir un evento de selección para cuando se haga clic en un punto
    google.visualization.events.addListener(chart, 'select', function () {
        let selection = chart.getSelection();
        if (selection.length > 0) {
            // Obtener el índice de la fila seleccionada
            let row = selection[0].row;
            // Obtener el peso de la fila seleccionada
            let peso = data.getValue(row, 1);

            // Solo cambiar el color si el peso es mayor a 250g o menor a 250g
            if (peso > 250.2 || peso < 249.8) {
                // Cambiar el color del punto seleccionado a rojo
                data.setValue(row, 2, 'point { size: 5; shape-type: circle; fill-color:#FF0000 }'); // Rojo
            } else {
                // No cambiar el color si el peso está en el rango
                return;
            }

            // Redibujar el gráfico con el nuevo color de punto
            chart.draw(data, options);
        }
    });
}
