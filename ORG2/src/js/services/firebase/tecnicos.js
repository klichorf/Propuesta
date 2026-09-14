// ======================================================
// TÉCNICOS DEL SISTEMA
// CORREO FIREBASE → DATOS DEL TÉCNICO
// ======================================================

const tecnicosPorCorreo = {

    "klichorf123@hotmail.com": {
        nombre: "JORGE LEONARDO RODRIGUEZ",
        cargo: "TÉCNICO DE MANTENIMIENTO"
    },

    "klichorf123@gmail.com": {
        nombre: "PINEDA AGUDELO YONATAN STIVEN",
        cargo: "TÉCNICO DE MANTENIMIENTO II"
    },

    "gchaparro@organizacioncardenas.com.co": {
        nombre: "GERARDO MARIÑO",
        cargo: "TÉCNICO DE MANTENIMIENTO"
    },

    "lgrodriguez@organizacioncardenas.com.co": {
        nombre: "NESTOR LEONARDO RODRIGUEZ",
        cargo: "TÉCNICO DE MANTENIMIENTO"
    },

    "yspineda@organizacioncardenas.com.co": {
        nombre: "PINEDA AGUDELO YONATAN STIVEN",
        cargo: "TÉCNICO DE MANTENIMIENTO II"
    },

    "ascuervo@organizacioncardenas.com.co": {
        nombre: "ANGELO STIVEN CUERVO BELTRAN",
        cargo: "TÉCNICO DE MANTENIMIENTO"
    }

};


// ======================================================
// OBTENER TÉCNICO POR CORREO
// ======================================================

export function obtenerTecnico(correo) {

    return tecnicosPorCorreo[
        correo?.trim().toLowerCase()
    ] || null;

}


// ======================================================
// COMPATIBILIDAD CON EL CÓDIGO EXISTENTE
// ======================================================

export function obtenerNombreTecnico(correo) {

    return obtenerTecnico(correo)?.nombre || null;

}