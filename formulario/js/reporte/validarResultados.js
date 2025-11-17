// ------------------------------------------------------
// MÓDULO: VALIDAR RESULTADOS DEL REPORTE
// ------------------------------------------------------
// ------------------------------------------------------
// MÓDULO: VALIDAR RESULTADOS DEL REPORTE
// ------------------------------------------------------
export function validarResultados(registros, mensaje, errorId) {
    console.log("➡️ Ejecutando validarResultados()");
    console.log("📦 Registros recibidos:", registros);
    console.log("🔢 Total de registros:", registros?.length);
    console.log("📝 Mensaje de advertencia:", mensaje);
    console.log("🚨 ID de error:", errorId);

    if (registros.length === 0) {
        console.warn("⚠️ No hay registros → mostrando alerta y lanzando error");
        alert(mensaje);
        throw new Error(errorId);
    }

    console.log("✅ validarResultados() completado: hay registros");
}
