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
    "Área Enfardadoras ": 
       [
        "Enfardadora 1",
        "Enfardadora 2",
        "Banda de salida Máquina 1",
        "Banda de salida Máquina 2",
        "Banda de salida Máquina 3",
        "Banda de salida Máquina 4",
        "Banda interconexión 1-2",
        "Banda interconexión 3-4",
        "Banda interconexión Enfardadora 1",
        "Banda interconexión Enfardadora 2",
        "Banda rápida linea 1",
        "Banda rápida linea 2"
      ],    

      "Codificadoras": [
        "tedmaq codificadora ", 
        "tecnopack codificadora",
        "inna 1 codificadora",
        "inna 2 codificadora",
        "rosdan codificadora"
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

   OFERTAS: { 
    "Área de Producción": [
      "Horno 1",
      "Horno 2",
      "Horno 3",
      "Selladora 1",
      "Selladora 2",
      "Selladora 3"
    ]
  },

   LOCATIVOS: { 
    
      "Bodega 14B": ["Planta 1", "Planta 2", "Planta 3"],
      "Bodega 15B": ["Planta 1", "Planta 2", "Planta 3"],
      "Bodega 17B": ["Planta 1", "Planta 2", "Planta 3"],
      "Bodega 18B": ["Planta 1", "Planta 2", "Planta 3"],
      "Bodega 8C":  ["Planta 1", "Planta 2", "Planta 3"]
    
  }
};

// Supervisores por planta
const supervisores = {
    ALIMENTOS: "PINZON GUEVARA WILLIAM ORLANDO",
    ASEO: "RUEDA TOVAR JORGE CRISTIAN",
    GRANOS: "LEAL HERRERA JORGE ANDRES",
    AGUAS: "HENAO BEDOYA MARIA CRISTINA",
    OFERTAS: "HENAO BEDOYA MARIA CRISTINA",
    LOCATIVOS: "RICARDO ANDRES BEJARANO"
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

            OFERTAS:
                "url('https://plus.unsplash.com/premium_photo-1681426730828-bfee2d13861d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332')",
            LOCATIVOS:
                "url('https://images.unsplash.com/photo-1676311396794-f14881e9daaa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')",
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
