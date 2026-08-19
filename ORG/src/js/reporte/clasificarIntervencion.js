// ------------------------------------------------------
// CLASIFICAR TIPO DE INTERVENCIÓN
// ------------------------------------------------------

export function clasificarIntervencion(tipo) {

    if (!tipo) return "OTRO";

    tipo = tipo.toLowerCase();
    
    if (tipo.includes("prevent")) return "PREVENTIVA"; // 🔥 NUEVO
    if (tipo.includes("correct")) return "CORRECTIVA";
    if (tipo.includes("locativ")) return "LOCATIVA";
    if (tipo.includes("diaria")) return "DIARIA";
    

    if (
        tipo.includes("cronograma") ||
        tipo.includes("mejora")
    ) {
        return "CRONOGRAMA";
    }

    return "OTRO";
}