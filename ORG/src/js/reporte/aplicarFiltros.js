// ------------------------------------------------------
// MÓDULO: APLICAR FILTROS A REGISTROS
// ------------------------------------------------------
// ------------------------------------------------------
// MÓDULO: APLICAR FILTROS A REGISTROS
// ------------------------------------------------------
export function aplicarFiltros(registros, filtros) {

    console.log("➡️ INICIANDO aplicarFiltros()");
    console.log("Registros iniciales:", registros.length);
    console.log("Filtros recibidos:", filtros);

    filtros.forEach(([condicion, fn], index) => {
        console.log(`\n🔵 FILTRO ${index + 1}`);

        console.log("  ➡️ Condición:", condicion);

        if (condicion) {
            console.log("  ✔️ Condición TRUE → Aplicando filtro...");
            const antes = registros.length;

            registros = registros.filter(fn);

            console.log(`  ➡️ Registros antes: ${antes}`);
            console.log(`  ➡️ Registros después: ${registros.length}`);
        } else {
            console.log("  ⛔ Condición FALSE → Filtro no aplicado");
        }
    });

    console.log("\n✅ FINALIZADO aplicarFiltros()");
    console.log("Registros finales:", registros.length);
    console.log("Resultado final:", registros);

    return registros;
}
