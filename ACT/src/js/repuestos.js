// ------------------------------------------------------
// LISTA DE REPUESTOS POR CATEGORÍA
// ------------------------------------------------------
export const listaRepuestos = {
    "Neumáticos": [
        "Manguera neumática 1/4",
        "Válvula solenoide 5/2",
        "Cilindro neumático doble efecto",
        "Regulador de presión",
        "Conector rápido 1/4",
        // 🔹 Racores rectos push-in
        "Racor recto push-in 4 mm * 1/8”",
        "Racor recto push-in 4 mm * 1/4”",
        "Racor recto push-in 6 mm * 1/8”",
        "Racor recto push-in 6 mm * 1/4”",
        "Racor recto push-in 8 mm * 1/8”",
        "Racor recto push-in 8 mm * 1/4”",
        "Racor recto push-in 10 mm * 1/4”",
        "Racor recto push-in 10 mm * 3/8”",
        "Racor recto push-in 12 mm * 3/8”",
        "Racor recto push-in 12 mm * 1/2”",

        // 🔹 Racores codo 90°
        "Racor codo 90° push-in 4 mm * 1/8”",
        "Racor codo 90° push-in 6 mm * 1/8”",
        "Racor codo 90° push-in 6 mm * 1/4”",
        "Racor codo 90° push-in 8 mm * 1/8”",
        "Racor codo 90° push-in 8 mm * 1/4”",
        "Racor codo 90° push-in 10 mm * 1/4”",
        "Racor codo 90° push-in 10 mm * 3/8”",
        "Racor codo 90° push-in 12 mm * 3/8”",
        "Racor codo 90° push-in 12 mm * 1/2”",

        // 🔹 Racores tipo T
        "Racor tipo T push-in 4 mm * 1/8”",
        "Racor tipo T push-in 6 mm * 1/8”",
        "Racor tipo T push-in 6 mm * 1/4”",
        "Racor tipo T push-in 8 mm * 1/8”",
        "Racor tipo T push-in 8 mm * 1/4”",
        "Racor tipo T push-in 10 mm * 1/4”",
        "Racor tipo T push-in 10 mm * 3/8”",
        "Racor tipo T push-in 12 mm * 3/8”",

        // 🔹 Racores tipo Y
        "Racor tipo Y push-in 4 mm * 1/8”",
        "Racor tipo Y push-in 6 mm * 1/8”",
        "Racor tipo Y push-in 6 mm * 1/4”",
        "Racor tipo Y push-in 8 mm * 1/8”",
        "Racor tipo Y push-in 8 mm * 1/4”",
        "Racor tipo Y push-in 10 mm * 1/4”",

        // 🔹 Racores unión recta
        "Racor unión recta 4 mm",
        "Racor unión recta 6 mm",
        "Racor unión recta 8 mm",
        "Racor unión recta 10 mm",
        "Racor unión recta 12 mm",

        // 🔹 Racores reducción (mm a mm)
        "Racor reducción 4 mm a 6 mm",
        "Racor reducción 6 mm a 8 mm",
        "Racor reducción 8 mm a 10 mm",
        "Racor reducción 10 mm a 12 mm",

        // 🔹 Racores espiga
        "Racor espiga 4 mm * 1/8”",
        "Racor espiga 6 mm * 1/8”",
        "Racor espiga 6 mm * 1/4”",
        "Racor espiga 8 mm * 1/8”",
        "Racor espiga 8 mm * 1/4”",
        "Racor espiga 10 mm * 1/4”",
        "Racor espiga 12 mm * 3/8”",

        // 🔹 Racores giratorios
        "Racor recto giratorio 6 mm * 1/8”",
        "Racor recto giratorio 8 mm * 1/4”",
        "Racor codo giratorio 6 mm * 1/8”",
        "Racor codo giratorio 8 mm * 1/4”",
        "Racor codo giratorio 10 mm * 1/4”",

        // 🔹 Racores tapón
        "Tapón push-in 4 mm",
        "Tapón push-in 6 mm",
        "Tapón push-in 8 mm",
        "Tapón push-in 10 mm",
        "Tapón push-in 12 mm"
    ],
    "Eléctricos": [
        "Sensor de proximidad",
        "Relevo térmico",
        "Contactor 24V",
        "Cable eléctrico 12 AWG",
        "Fusible 10A"
    ],
    "Mecánicos": [
        "Banda transportadora",
        "Polea motriz",
        "Eje de transmisión",
        "Guía lineal",
        "Rodillo tensor"
    ],
    "Rodamientos": [
        "Rodamiento 6203 ZZ",
        "Rodamiento 6205 2RS",
        "Buje de bronce",
        "Rodamiento axial",
        "Cojinete lineal"
    ],
    "Tornillería": [
        "Tornillo M6x30",
        "Tuerca M8",
        "Arandela de presión M10",
        "Perno M12x50",
        "Tornillo autorroscante 3/4\""
    ],
    "Lubricantes y sellos": [
        "Grasa industrial",
        "Aceite hidráulico ISO 68",
        "Sellador anaeróbico",
        "Empaque tórico",
        "Cinta teflón"
    ]
};

// ------------------------------------------------------
// FUNCIÓN PARA CARGAR TEXTO BASE EN EL TEXTAREA
// ------------------------------------------------------
export function cargarRepuestos() {
    const textarea = document.getElementById("repuestos");
    if (!textarea) return;

}
