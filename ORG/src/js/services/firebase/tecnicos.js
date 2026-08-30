// ======================================================
// TÉCNICOS DEL SISTEMA
// CORREO FIREBASE → NOMBRE DEL TÉCNICO
// ======================================================

const tecnicosPorCorreo = {

    "klichorf123@hotmail.com":
        "JORGE LEONARDO RODRIGUEZ",

    "klichorf123@gmail.com":
        "PINEDA AGUDELO YONATAN STIVEN",

    // Agregar aquí los demás técnicos
    //
    // "otrocorreo@empresa.com":
    //     "NOMBRE DEL TECNICO"

};


// ======================================================
// OBTENER TÉCNICO POR CORREO
// ======================================================

export function obtenerNombreTecnico(correo) {

    return tecnicosPorCorreo[
        correo?.trim().toLowerCase()
    ] || null;

}