// ------------------------------------------------------
// GENERAR RESUMEN POR TIPO DE INTERVENCIÓN
// ------------------------------------------------------

export function generarResumenIntervenciones(registros) {

    const resumen = {
        CRONOGRAMA: [],
        DIARIA: [],
        PREVENTIVA: [] ,// 🔥 NUEVO
        CORRECTIVA: [],
        LOCATIVA: []
    };

    registros.forEach(r => {
        if (resumen[r.tipoIntervencion]) {
            resumen[r.tipoIntervencion].push(r);
        }
    });

    return resumen;
}