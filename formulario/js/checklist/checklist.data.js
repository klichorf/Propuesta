// =========================================
// CHECKLIST POR PLANTA
// =========================================

export const checklistData = {

    // =====================================
    // BEBIDAS
    // =====================================

    BEBIDAS: [

        {

            id: 1,

            equipo: "COMPRESOR GX11",

            items: [

                {
                    tipo: "number",
                    label: "Verificar presión",
                    placeholder: "12",
                    unidad: "PSI"
                },

                {
                    tipo: "select",
                    label: "Nivel aceite",

                    opciones: [
                        "ALTO",
                        "MEDIO",
                        "BAJO",
                        "MUY BAJO"
                    ]
                },


 

                {
                    tipo: "number",
                    label: "Verificar temperatura",
                    placeholder: "80",
                    unidad: "°C"
                },

                {
                    tipo: "select",
                    label: "Verificar ruido anormal",

                    opciones: [
                        "SI",
                        "NO"
                    ]
                }

            ]

        }

    ],

    // =====================================
    // ASEO
    // =====================================

    ASEO: [

        {

            id: 1,

            equipo: "ENVASADORA 1",

            items: [

                {
                    tipo: "select",
                    label: "Verificar bandas",

                    opciones: [
                        "SI",
                        "NO"
                    ]
                },

                {
                    tipo: "select",
                    label: "Verificar sensores",

                    opciones: [
                        "SI",
                        "NO"
                    ]
                },

                {
                    tipo: "select",
                    label: "Verificar fugas",

                    opciones: [
                        "SI",
                        "NO"
                    ]
                }

            ]

        },

        {

            id: 2,

            equipo: "TANQUE MEZCLA",

            items: [

                {
                    tipo: "number",
                    label: "Temperatura",

                    placeholder: "40",

                    unidad: "°C"
                },

                {
                    tipo: "select",
                    label: "Estado agitador",

                    opciones: [
                        "BUENO",
                        "REGULAR",
                        "MALO"
                    ]
                }

            ]

        }

    ],

    // =====================================
    // ALIMENTOS
    // =====================================

    ALIMENTOS: [

        {

            id: 1,

            equipo: "MOLINO",

            items: [

                {
                    tipo: "number",
                    label: "Temperatura",

                    placeholder: "65",

                    unidad: "°C"
                },

                {
                    tipo: "select",
                    label: "Ruido anormal",

                    opciones: [
                        "SI",
                        "NO"
                    ]
                },

                {
                    tipo: "select",
                    label: "Vibración excesiva",

                    opciones: [
                        "SI",
                        "NO"
                    ]
                }

            ]

        }

    ]

};