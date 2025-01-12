document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.empacadora-submenu-item, .empacadora-submenu-item-1');
    const mensajeSeleccion = document.getElementById('mensajeSeleccion');
    const botonCancelar = document.querySelector('.btn-secondary'); // Botón "Cancelar"
    
    let seleccionActual = null; // Variable para rastrear la opción seleccionada

    items.forEach(item => {
        item.addEventListener('click', () => {
            // Remover el fondo de todas las opciones
            items.forEach(i => {
                i.style.backgroundColor = '';
                i.style.color = ''; // Restablecer el color del texto
            });

            // Cambiar el fondo de la opción seleccionada
            item.style.backgroundColor = '#007BFF'; // Azul más claro
            item.style.color = 'white'; // Cambiar el texto a blanco para mejor contraste

            // Obtener la categoría
            const categoria = item.dataset.categoria;

            // Comprobar si la categoría existe antes de actualizar el mensaje
            if (categoria) {
                mensajeSeleccion.textContent = `La opción seleccionada es: ${categoria}`;
            } else {
                mensajeSeleccion.textContent = 'Seleccione una posible causa'; // Restablecer si no hay selección
            }

            // Guardar la selección actual
            seleccionActual = item;
        });
    });

    // Acción para el botón "Cancelar"
    botonCancelar.addEventListener('click', () => {
        // Remover selección de todas las opciones
        items.forEach(i => {
            i.style.backgroundColor = '';
            i.style.color = ''; // Restablecer el color del texto
        });

        // Restablecer el mensaje inicial
        mensajeSeleccion.textContent = 'Seleccione una posible causa';

        // Limpiar la selección actual
        seleccionActual = null;
    });
});
