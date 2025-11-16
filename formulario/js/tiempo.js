// ------------------------------------------------------
// MÓDULO: CÁLCULO AUTOMÁTICO DEL TIEMPO EMPLEADO
// ------------------------------------------------------
export function initTiempo() {
    const fi = document.querySelector('input#fechaInicio[type="datetime-local"]');
    const ff = document.querySelector('input#fechaFin[type="datetime-local"]');
    const campoTiempo = document.getElementById("tiempo");

    if (!fi || !ff || !campoTiempo) return;

    const calcularTiempo = () => {
        if (!fi.value || !ff.value) {
            campoTiempo.value = "";
            return;
        }

        const inicio = new Date(fi.value);
        const fin = new Date(ff.value);

        if (isNaN(inicio) || isNaN(fin)) {
            campoTiempo.value = "";
            return;
        }

        if (fin < inicio) {
            campoTiempo.value = "⚠ Fecha fin anterior a inicio";
            return;
        }

        const diffMin = Math.floor((fin - inicio) / 60000);
        const horas = Math.floor(diffMin / 60);
        const minutos = diffMin % 60;
        campoTiempo.value = `${horas}h ${minutos}m`;
    };

    fi.addEventListener("input", calcularTiempo);
    ff.addEventListener("input", calcularTiempo);
    fi.addEventListener("change", calcularTiempo);
    ff.addEventListener("change", calcularTiempo);

    // Calcular inmediatamente si ya hay valores
    calcularTiempo();
}


