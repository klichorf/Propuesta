// ------------------------------------------------------
// MÓDULO: AGRUPAR REGISTROS POR PLANTA, ÁREA Y EQUIPO
// ------------------------------------------------------
// ------------------------------------------------------
// MÓDULO: AGRUPAR REGISTROS POR PLANTA, ÁREA Y EQUIPO
// ------------------------------------------------------
export function agruparRegistros(registros) {

    console.log("➡️ INICIANDO agruparRegistros()", registros);

    const resultado = registros.reduce((acc, reg, index) => {

        console.log(`\n🔵 Iteración ${index}`);
        console.log("Registro actual:", reg);

        const planta = reg.planta ?? "SIN PLANTA";
        const area = reg.area ?? reg["Área de Mezclas"] ?? "SIN ÁREA";
        const equipo = reg.equipo ?? "SIN EQUIPO";

        console.log("  ➡️ Planta:", planta);
        console.log("  ➡️ Área:", area);
        console.log("  ➡️ Equipo:", equipo);

        // Crear niveles si no existen
        if (!acc[planta]) {
            console.log(`  🏗️ Creando planta '${planta}'`);
            acc[planta] = {};
        }

        if (!acc[planta][area]) {
            console.log(`  🏗️ Creando área '${area}' dentro de '${planta}'`);
            acc[planta][area] = {};
        }

        if (!acc[planta][area][equipo]) {
            console.log(`  🏗️ Creando equipo '${equipo}' dentro de área '${area}'`);
            acc[planta][area][equipo] = [];
        }

        acc[planta][area][equipo].push(reg);
        console.log(`  ✔️ Registro agregado al equipo '${equipo}'`);

        return acc;
    }, {});

    console.log("\n✅ FINALIZADO agruparRegistros()");
    console.log("Resultado final:", resultado);

    return resultado;
}
