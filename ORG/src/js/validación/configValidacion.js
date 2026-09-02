// ------------------------------------------------------
// CONFIGURACIÓN DE VALIDACIÓN
// ------------------------------------------------------

export const CAMPOS_OBLIGATORIOS = [
    "codigo",
    "planta",
    "area",
    "equipo",
    "fechaInicio",
    "fechaFin",
    "tipoMantenimiento",
    "ejecutor",
    "danos",
    "trabajo",
    "repuestos",
];

export const FIRMAS_OBLIGATORIAS = [
    {
        id: "sigEjecutor",
        nombre: "firma",
    },
    {
        id: "sigCoordinador",
        nombre: "firmaSupervisor",
    },
];
