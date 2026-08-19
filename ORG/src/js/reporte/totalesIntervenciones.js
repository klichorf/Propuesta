// ------------------------------------------------------
// CALCULAR TOTALES
// ------------------------------------------------------

export function calcularTotalMinutos(lista) {
    return lista.reduce((total, r) => total + r.minutos, 0);
}

export function calcularTotalHoras(minutos) {
    return (minutos / 60).toFixed(2);
}