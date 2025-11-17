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




