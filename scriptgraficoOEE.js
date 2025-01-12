

function drawColumnChart() {
    let metaPorHora = 6300; // Meta de producción por hora (este es el valor estándar, pero puede variar)
    let data = google.visualization.arrayToDataTable([
        ["Hora", "Unidades producidas", { role: "style" }, { role: "annotation" }],
        // Cada fila tiene sus propios valores de producción
        ["06:00 AM", 5000, calculateColor(5000, metaPorHora), calculateOEE(5000, metaPorHora)],
        ["07:00 AM", 7000, calculateColor(7000, metaPorHora), calculateOEE(7000, metaPorHora)],
        ["08:00 AM", 6200, calculateColor(6200, metaPorHora), calculateOEE(6200, metaPorHora)],
        ["09:00 AM", 8000, calculateColor(8000, metaPorHora), calculateOEE(8000, metaPorHora)],
        ["10:00 AM", 4500, calculateColor(4500, metaPorHora), calculateOEE(4500, metaPorHora)],
        ["11:00 AM", 6300, calculateColor(6300, metaPorHora), calculateOEE(6300, metaPorHora)],
        ["12:00 PM", 4000, calculateColor(4000, metaPorHora), calculateOEE(4000, metaPorHora)],
        ["01:00 PM", 7500, calculateColor(7500, metaPorHora), calculateOEE(7500, metaPorHora)],
        ["02:00 PM", 6500, calculateColor(6500, metaPorHora), calculateOEE(6500, metaPorHora)]
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

    // Agregar manejador de clics en las columnas
    google.visualization.events.addListener(chart, 'select', function () {
        let selectedItem = chart.getSelection()[0];
        if (selectedItem) {
            let row = selectedItem.row;
            let produccion = data.getValue(row, 1); // Obtener el valor de producción
            let oee = (produccion / metaPorHora) * 100; // Calcular el OEE

            // Si el OEE es mayor al 100%, mostrar una alerta
            if (oee > 100) {
                alert("¡Alerta! El OEE es mayor al 100%. Esto podría indicar un mal funcionamiento del sensor.");
            }
        }
    });
}

function calculateOEE(produccion, metaPorHora) {
    return ((produccion / metaPorHora) * 100).toFixed(2) + "%";
}

function calculateColor(produccion, metaPorHora) {
    let oee = (produccion / metaPorHora) * 100;
    if (oee > 100) {
        return "yellow";  // OEE mayor a 100%, color amarillo
    } else if (oee < 85) {
        return "red";  // OEE menor a 85%, color rojo
    } else {
        return "#76A7FA";  // OEE entre 85% y 100%, color azul
    }
}