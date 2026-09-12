// ------------------------------------------------------
// UTILIDADES DE FIRMAS
// ------------------------------------------------------

export function normalizarNombre(nombre = "") {
    return String(nombre)
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();
}

export function construirUrlFirma(firma, baseUrl) {

    const firmaTexto = String(firma || "").trim();

    if (
        /^https?:\/\//i.test(firmaTexto) ||
        firmaTexto.startsWith("data:")
    ) {
        return firmaTexto;
    }

    return `${baseUrl}${firmaTexto}`;
}