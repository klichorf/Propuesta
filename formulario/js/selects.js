// -------------------------
// GESTIÓN DE SELECTORES DE PLANTA, ÁREA Y EQUIPO
// -------------------------

// Datos jerárquicos de plantas, áreas y equipos
const datosPlantas = {
    GRANOS: {
        "Área de Tolvas": [
            "tolvas 1",
            "tolvas 2",
            "tolvas 3",
            "tolvas 4",
            "tolvas 5",
        ],
        "Área de Empaque": ["TEDMAD", "TECNOPACK", "INNA 1", "INNA 2", "ROSDAN"],
        "Área de compresores": [
            "Compresor GA22",
            "Compresor GX11",
            "secador de aire 1",
            "secador de aire 2",
        ],
    },
    ASEO: {
        "Área de Disco": [
            "Laminadora",
            "Cortadora",
            "Tornillo Compactador",
            "Mezcladora",
            "Chiller",
        ],
        "Área Doypack": ["Envasadora", "Dosificadora", "Selladora"],
        "Área Líquidos": [
            "Llenadora de Líquidos",
            "Etiquetadora",
            "Rotativa",
            "Encintadora",
        ],
        "Área Viscosos": [
            "Llenadora de Viscosos",
            "Etiquetadora",
            "Rotativa",
            "Codificadora",
        ],
        "Área de Crema": ["Llenadora de Crema"],
        "Área Varsol": ["Llenadora Varsol", "Etiquetadora", "Codificadora"],
        "Área Hipoclorito": ["Llenadora", "Tapadora"],
        "Área Compresores": ["Compresor GA22", "Compresor GX7"],
    },
    ALIMENTOS: {
        "Área de Envasado": [
            "Envasadora Tecmar",
            "Estuchadora",
            "Encintadora",
            "Envasadora Sopas",
            "Envasadora Gelatinas",
            "Estuchadora de Gelatinas",
            "Envasadora Tecnopack",
            "Envasadora Tecnotock",
            "Selladora Manual",
            "Doypack",
            "Envasadora de Panela",
            "Tedmaq",
            "Multipack",
            "Estuchadora Rotativa",
            "Nutri Baby",
        ],
        "Área de Mezclas": [
            "Ciclón",
            "Mezcladora Tecmar",
            "Mezcladora Sopas",
            "Mezcladora Gelatinas",
            "Mezcladora Tecnopack",
            "Mezcladora Tecnotock",
            "Mezcladora Doypack",
            "Mezcladora Hojuelas",
        ],
        "Área Compresores": ["Compresor GA22", "Compresor GX7"],
    },
    AGUAS: {
        "Área de Empacadora": [
            "Llenadora de Agua",
            "Etiquetadora",
            "Empacadora",
            "Codificadora",
            "Bandas",
            "Posicionador de Botellas",
            "Clorinador",
            "Compresor GA26",
            "Caldera",
            "Bomba de Salida Tanque 20 Mil",
            "Osmosis",
        ],
        "Área de Tanques": [
            "Tanque 50 Mil",
            "Tanque 20 Mil",
            "Tanque 10 Mil",
            "Tanque 5 Mil",
        ],
        "Área de Nitrógeno": ["Tanque de Nitrógeno", "PETAR"],
    },
};

// Supervisores por planta
const supervisores = {
    ALIMENTOS: "PINZON GUEVARA WILLIAM ORLANDO",
    ASEO: "RUEDA TOVAR JORGE CRISTIAN",
    GRANOS: "LEAL HERRERA JORGE ANDRES",
    AGUAS: "HENAO BEDOYA MARIA CRISTINA",
};

// ------------------------------------------------------
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ------------------------------------------------------
function initSelects() {
    const plantaSelect = document.getElementById("planta");
    const areaSelect = document.getElementById("area");
    const equipoSelect = document.getElementById("equipo");

    if (!plantaSelect || !areaSelect || !equipoSelect) return; // evita errores si no existen

    // Cambiar fondo según planta seleccionada
    function cambiarFondo() {
        const contenedor = document.getElementById("contenedorPrincipal");
        const fondos = {
            GRANOS:
                "url('https://mre-site-makro-colombia-test-webapp-slot.azurewebsites.net/imagesProducts/medias/913263_1_239.webp')",
            ASEO: "url('https://organizacioncardenas.com/wp-content/uploads/2022/11/detergentelavado-e1678672244584-793x1024.png')",
            ALIMENTOS:
                "url('img/BUNUELO.png')",
            AGUAS: "url('https://media.surtiplaza.co/dimen/7707335286316.png')",
        };
        contenedor.style.background = fondos[plantaSelect.value] || "#f6f9fc";
    }

    // Mostrar supervisor
    function mostrarSupervisor(planta) {
        const supervisor = supervisores[planta.toUpperCase()] || "No asignado";
        const label = document.getElementById("supervisor");
        if (label) label.textContent = `👤 Supervisor: ${supervisor}`;
    }

    // Evento: cambio de planta
    plantaSelect.addEventListener("change", () => {
        const planta = plantaSelect.value;
        const areas = Object.keys(datosPlantas[planta] || {});
        areaSelect.innerHTML =
            "<option disabled selected>Seleccione un área</option>";
        equipoSelect.innerHTML =
            "<option disabled selected>Seleccione un equipo</option>";
        areas.forEach((a) => {
            const opt = document.createElement("option");
            opt.value = a;
            opt.textContent = a;
            areaSelect.appendChild(opt);
        });
        cambiarFondo();
        mostrarSupervisor(planta);
    });

    // Evento: cambio de área
    areaSelect.addEventListener("change", () => {
        const equipos = datosPlantas[plantaSelect.value]?.[areaSelect.value] || [];
        equipoSelect.innerHTML =
            "<option disabled selected>Seleccione un equipo</option>";
        equipos.forEach((eq) => {
            const opt = document.createElement("option");
            opt.value = eq;
            opt.textContent = eq;
            equipoSelect.appendChild(opt);
        });
    });
}

// ------------------------------------------------------
// EXPORTACIONES PARA USO EN OTROS MÓDULOS
// ------------------------------------------------------
export { initSelects, datosPlantas, supervisores };
