// ------------------------------------------------------
// GENERAR RESUMEN POR TIPO DE INTERVENCIÓN
// ------------------------------------------------------
export function generarResumenIntervenciones(registros) {

    const resumen = {
        CRONOGRAMA: [],
        DIARIA: [],
        PREVENTIVA: [],
        CORRECTIVA: [],
        LOCATIVA: []
    };

    registros.forEach(r => {

        // 🔹 normalizar textos (evita errores por null o minúsculas)
        const area = (r.area || "").toUpperCase();
        const tipo = (r.tipoIntervencion || "").toUpperCase();
        const equipo = (r.equipo || "").toUpperCase();

        // 🔥 DETECCIÓN GENERAL DE LOCATIVOS
        const esLocativo =
            area.includes("LOCAT") ||        // LOCATIVO, LOCATIVA, etc
            tipo === "LOCATIVA" || 
            equipo.includes("LOCAT");        // por si cambia nomenclatura

        if (esLocativo) {
            resumen.LOCATIVA.push(r);
            return;
        }

        // 🔹 resto normal
        if (resumen[tipo]) {
            resumen[tipo].push(r);
        }
    });

    return resumen;
}