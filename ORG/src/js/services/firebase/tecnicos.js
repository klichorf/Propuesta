// ======================================================
// TÉCNICOS DEL SISTEMA
// CORREO FIREBASE → NOMBRE DEL TÉCNICO
// ======================================================

const tecnicosPorCorreo = {

    // =====================================================
    // TÉCNICOS
    // =====================================================

    "klichorf123@hotmail.com":
        "JORGE LEONARDO RODRIGUEZ",

    "klichorf123@gmail.com":
        "PINEDA AGUDELO YONATAN STIVEN",

    "gchaparro@organizacioncardenas.com.co":
        "GERARDO MARIÑO",

    "lgrodriguez@organizacioncardenas.com.co":
        "NESTOR LEONARDO RODRIGUEZ",

    "yspineda@organizacioncardenas.com.co":
        "PINEDA AGUDELO YONATAN STIVEN",

    "ascuervo@organizacioncardenas.com.co":
        "ANGELO STIVEN CUERVO BELTRAN"

};


// ======================================================
// OBTENER TÉCNICO POR CORREO
// ======================================================

export function obtenerNombreTecnico(correo) {

    return tecnicosPorCorreo[
        correo?.trim().toLowerCase()
    ] || null;

}