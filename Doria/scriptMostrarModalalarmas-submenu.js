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
