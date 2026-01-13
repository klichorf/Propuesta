// -------------------------
// GESTIÓN DE SELECTORES DE PLANTA, ÁREA Y EQUIPO
// -------------------------

// Datos jerárquicos de plantas, áreas y equipos
const datosPlantas = {
  GRANOS: {

    "ÁREA DE COMPRESORES": [
      { codigo: "GR-COM-01", nombre: "Compresor GA 22" },
      { codigo: "GR-COM-02", nombre: "Compresor GX 11" },
      { codigo: "GR-SEC-01", nombre: "Secador compresor GA 22" },
      { codigo: "GR-SEC-02", nombre: "Secador compresor GX 11" },
      { codigo: "GR-AIR-01", nombre: "Red de aire comprimido" }
    ],

    "ÁREA DE EMPAQUE": [
      { codigo: "GR-EMP-01", nombre: "Empacadora 1 (Tecnopack)" },
      { codigo: "GR-COD-01", nombre: "Codificador empacadora 1" },
      { codigo: "GR-EMP-02", nombre: "Envasadora 2 (Inna 1)" },
      { codigo: "GR-COD-02", nombre: "Codificador empacadora 2" },
      { codigo: "GR-EMP-03", nombre: "Envasadora 3 (Inna 2)" },
      { codigo: "GR-COD-03", nombre: "Codificador empacadora 3" },
      { codigo: "GR-EMP-04", nombre: "Envasadora 4 (Inna 3)" },
      { codigo: "GR-COD-04", nombre: "Codificador empacadora 4" },
      { codigo: "GR-EMP-05", nombre: "Envasadora 5 (Tedmaq)" },
      { codigo: "GR-COD-05", nombre: "Codificador empacadora 5" },
      { codigo: "GR-LIM-01", nombre: "Maquina limpiadora de granos" }
    ],

    "ÁREA DE TOLVAS": [
      { codigo: "GR-TOL-01", nombre: "Tolva alimentacion empacadora 1" },
      { codigo: "GR-TOL-02", nombre: "Tolva alimentacion empacadora 2" },
      { codigo: "GR-TOL-03", nombre: "Tolva alimentacion empacadora 3" },
      { codigo: "GR-TOL-04", nombre: "Tolva alimentacion empacadora 4" },
      { codigo: "GR-TOL-05", nombre: "Tolva alimentacion empacadora 5" }
    ],

    "ÁREA ENFARDADORAS": [
      { codigo: "GR-ENF-01", nombre: "Enfardadora 1 (Indumak 1)" },
      { codigo: "GR-ENF-02", nombre: "Enfardadora 2 (Indumak 2)" }
    ],

    "TRANSPORTE Y BANDAS": [
      { codigo: "GR-TRA-02", nombre: "Banda transportadora empacadora 2" },
      { codigo: "GR-TRA-03", nombre: "Banda transportadora empacadora 3" },
      { codigo: "GR-INT-01", nombre: "Banda interconexion linea 1" },
      { codigo: "GR-INT-02", nombre: "Banda interconexion linea 2" },
      { codigo: "GR-BAN-01", nombre: "Bandas transportadoras linea 1" },
      { codigo: "GR-BAN-02", nombre: "Bandas transportadoras linea 2" }
    ],

    "VIBRADORES Y ZARANDAS": [
      { codigo: "GR-ZAR-01", nombre: "Zaranda 1" },
      { codigo: "GR-ZAR-02", nombre: "Zaranda 2" },
      { codigo: "GR-ZAR-03", nombre: "Zaranda 3" },
      { codigo: "GR-VIB-01", nombre: "Vibrador linea 1" },
      { codigo: "GR-VIB-02", nombre: "Vibrador linea 2" },
      { codigo: "GR-VIB-03", nombre: "Vibrador empacadora 5" }
    ],

    "SELLADO Y SERVICIOS": [
      { codigo: "GR-SELL-01", nombre: "Selladora manual 1" },
      { codigo: "GR-SELL-02", nombre: "Selladora manual 2" },
      { codigo: "GR-REF-01", nombre: "Red refrigeracion selladoras" },
      { codigo: "GR-DIS-01", nombre: "Red distribucion de maquinas" },
      { codigo: "GR-ILU-01", nombre: "Iluminacion de maquinas" },
      { codigo: "GR-TAB-01", nombre: "Tablero principal" }
    ],

    "LOCATIVO": [
      { codigo: "GR-LOC-01", nombre: "Porton ingreso" },
      { codigo: "GR-LOC-02", nombre: "Puerta ingreso" },
      { codigo: "GR-LOC-03", nombre: "Puerta general" },
      { codigo: "GR-LOC-04", nombre: "Oficinas piso 1" },
      { codigo: "GR-LOC-05", nombre: "Oficinas piso 2" },
      { codigo: "GR-LOC-06", nombre: "Poseta lava traperos" },
      { codigo: "GR-LOC-07", nombre: "Lavamanos ingreso bodega" },
      { codigo: "GR-LOC-08", nombre: "Canaletas electricas / medidores agua" },
      { codigo: "GR-LOC-09", nombre: "Medidores de energia" },
      { codigo: "GR-LOC-10", nombre: "Medidor de gas" },
      { codigo: "GR-LOC-11", nombre: "Red de agua potable" },
      { codigo: "GR-LOC-12", nombre: "Iluminacion de bodega" },
      { codigo: "GR-LOC-13", nombre: "Red interna 110V admin" },
      { codigo: "GR-LOC-14", nombre: "Medidores de agua" },
      { codigo: "GR-LOC-15", nombre: "Cubiertas" }
    ]

  },
ASEO: {
  
    "Área de Discos": [
      { codigo: "AS-ENV-02", nombre: "Envasadora 2 (Discos)" },
      { codigo: "AS-TAN-01", nombre: "Tanque de Mezcla 1" },
      { codigo: "AS-TAN-02", nombre: "Tanque de Mezcla 2" },
      { codigo: "AS-TAN-03", nombre: "Tanque de Mezcla 3" },
      { codigo: "AS-TAN-04", nombre: "Tanque de Mezcla 4" }
    ],

    "Área Doypack": [
      { codigo: "AS-ENV-05", nombre: "Envasadora 5 (Tipo Doypack)" },
      { codigo: "AS-ENV-07", nombre: "Envasadora 7 (Doypack Semiautomática)" },
      { codigo: "AS-ENV-09", nombre: "Envasadora 9 (Sachets)" }
    ],

    "Área de Líquidos": [
      { codigo: "AS-ENV-03", nombre: "Envasadora 3 (Líquidos)" },
      { codigo: "AS-ENV-06", nombre: "Envasadora 6 (Quitamanchas)" },
      { codigo: "AS-TAN-05", nombre: "Tanque de Mezcla 5" },
      { codigo: "AS-TAN-06", nombre: "Tanque de Mezcla 6" },
      { codigo: "AS-TAN-09", nombre: "Tanque de Mezcla 9" }
    ],

    "Área de Viscosos": [
      { codigo: "AS-ENV-01", nombre: "Envasadora 1 (Viscosos)" }
    ],

    "Área de Cremas": [
      { codigo: "AS-MAQ-01", nombre: "Máquina de Cremas" },
      { codigo: "AS-TAN-07", nombre: "Tanque de Mezcla 7 (Cremas)" }
    ],

    "Área Varsol": [
      { codigo: "AS-ENV-04", nombre: "Envasadora 4 (Varsol)" },
      { codigo: "AS-TAN-08", nombre: "Tanque de Mezcla 8 (Varsol)" },
      { codigo: "AS-VEN-01", nombre: "Sistema de Ventilación Varsol" }
    ],

    "Área Hipoclorito": [
      { codigo: "AS-ENV-08", nombre: "Envasadora 8 (Hipoclorito)" },
      { codigo: "AS-TAN-10", nombre: "Tanque de Mezcla 10 (Hipoclorito)" },
      { codigo: "AS-VEN-02", nombre: "Sistema de Ventilación Hipoclorito" }
    ]
  ,


    "Área de Compresores": [
      { codigo: "AS-COM-01", nombre: "Compresor 1" },
      { codigo: "AS-COM-02", nombre: "Compresor 2" },
      { codigo: "AS-SEC-01", nombre: "Secador Compresor 1" },
      { codigo: "AS-SEC-02", nombre: "Secador Compresor 2" }
    ]
  ,

 
    "Locativo": [
      { codigo: "AS-LOC-01", nombre: "Portón Ingreso" },
      { codigo: "AS-LOC-02", nombre: "Puerta Ingreso" },
      { codigo: "AS-LOC-03", nombre: "Puerta General" },
      { codigo: "AS-LOC-04", nombre: "Oficinas Piso 1" },
      { codigo: "AS-LOC-05", nombre: "Oficinas Piso 2" },
      { codigo: "AS-LOC-06", nombre: "Poseta Lava Traperos" },
      { codigo: "AS-LOC-07", nombre: "Lavamanos Ingreso Bodega" },
      { codigo: "AS-LOC-08", nombre: "Canaletas Eléctricas" },
      { codigo: "AS-LOC-09", nombre: "Medidores de Energía" },
      { codigo: "AS-LOC-10", nombre: "Medidor de Gas" },
      { codigo: "AS-LOC-11", nombre: "Red de Agua Potable" },
      { codigo: "AS-LOC-12", nombre: "Iluminación de Bodega" },
      { codigo: "AS-LOC-13", nombre: "Red Interna 110V Admin" },
      { codigo: "AS-LOC-14", nombre: "Medidores de Agua" },
      { codigo: "AS-LOC-15", nombre: "Cubiertas" }
    ]
},




ALIMENTOS: {

  "Área de Compresores": [
    { codigo: "AL-COM-01", nombre: "Compresor Garden Denver" },
    { codigo: "AL-SEC-01", nombre: "Secador de Aire" },
    { codigo: "AL-ASP-01", nombre: "Aspiradora Ciclónica" }
  ],

  "Área de Mezclas": [
    { codigo: "AL-MEZ-01", nombre: "Mezclador Máquina Tecmar" },
    { codigo: "AL-MEZ-02", nombre: "Mezclador Máquina de Sopas" },
    { codigo: "AL-MEZ-03", nombre: "Mezclador Máquina de Gelatinas" },
    { codigo: "AL-MEZ-04", nombre: "Mezclador para Máquina Tecnopack" },
    { codigo: "AL-MEZ-05", nombre: "Mezclador para Máquina Tecnotock" },
    { codigo: "AL-MEZ-06", nombre: "Mezclador Máquina Doypack" },
    { codigo: "AL-MEZ-07", nombre: "Mezclador Máquina Panelada" }
  ],

  "Área de Envasado": [
    { codigo: "AL-LLE-01", nombre: "Envasadora Máquina Tecmar T-30" },
    { codigo: "AL-GEL-01", nombre: "Envasadora de Gelatinas Jumbo" },
    { codigo: "AL-EMB-01", nombre: "Envasadora Tecnopack" },
    { codigo: "AL-EMB-02", nombre: "Envasadora Tecnotock" },
    { codigo: "AL-EMB-03", nombre: "Envasadora Doypack" },
    { codigo: "AL-EMB-04", nombre: "Envasadora de Panelada" },
    { codigo: "AL-EMB-05", nombre: "Envasadora Tedmaq Hojuelas" },
    { codigo: "AL-EMB-06", nombre: "Envasadora Multipack Hojuelas" }
  ],

  "Área de Empaque y Sellado": [
    { codigo: "AL-SOP-01", nombre: "Empacadora de Sopas" },
    { codigo: "AL-SEL-01", nombre: "Selladora Manual 1 Doypack" },
    { codigo: "AL-SEL-02", nombre: "Selladora Manual 2 Doypack" },
    { codigo: "AL-SEL-03", nombre: "Selladora Manual 3 Doypack" },
    { codigo: "AL-SEL-04", nombre: "Selladora Manual 4 Doypack" }
  ],

  "Área de Codificación": [
    { codigo: "AL-COD-01", nombre: "Codificador Máquina Tecmar" },
    { codigo: "AL-COD-02", nombre: "Codificador Máquina de Sopas" },
    { codigo: "AL-COD-03", nombre: "Codificador Máquina de Gelatinas" },
    { codigo: "AL-COD-04", nombre: "Codificador Máquina Tecnopack" },
    { codigo: "AL-COD-05", nombre: "Codificador Máquina Tecnotock" },
    { codigo: "AL-COD-06", nombre: "Codificador Máquina Doypack" },
    { codigo: "AL-COD-07", nombre: "Codificador Máquina de Panelada" },
    { codigo: "AL-COD-08", nombre: "Codificador Tedmaq Hojuelas" },
    { codigo: "AL-COD-09", nombre: "Codificador Multipack Hojuelas" },
    { codigo: "AL-COD-10", nombre: "Codificador Nutrybaby" },
    { codigo: "AL-COD-11", nombre: "Codificador Estuchadora Rotativa" }
  ],

  "Área de Estuchado y Encintado": [
    { codigo: "AL-EST-01", nombre: "Estuchadora Máquina Tecmar EK-160" },
    { codigo: "AL-EST-02", nombre: "Estuchadora de Gelatinas" },
    { codigo: "AL-EST-03", nombre: "Estuchadora Nutrybaby" },
    { codigo: "AL-EST-04", nombre: "Estuchadora Rotativa" },
    { codigo: "AL-ENC-01", nombre: "Encintadora" }
  ],

  "Área de Tolvas": [
    { codigo: "AL-TOL-01", nombre: "Tolva Tedmaq Hojuelas" },
    { codigo: "AL-TOL-02", nombre: "Tolva Multipack Hojuelas" }
  ],

  "Otros Equipos": [
    { codigo: "AL-NOR-01", nombre: "Equipo Nordson" }
  ]

},

  BEBIDAS: {
    "Equipos periféricos": [
      { codigo: "BE-COM-01", nombre: "Compresor GA 26" },
      { codigo: "BE-SEC-01", nombre: "Secador Air Dryer" },
      { codigo: "BE-CAL-01", nombre: "Caldera 30 HP" },
      { codigo: "BE-AMO-01", nombre: "Compresor de amoníaco" },
      { codigo: "BE-BOM-01", nombre: "Bomba centrífuga C216" },
      { codigo: "BE-MOT-01", nombre: "Bomba multietapa 20 HP" },
      { codigo: "BE-OSM-01", nombre: "Ósmosis inversa" },
      { codigo: "BE-GEN-01", nombre: "Generador de ozono" },
      { codigo: "BE-CLO-01", nombre: "Clorinador" },
      { codigo: "BE-MOT-02", nombre: "Bomba multietapa 10 HP" },
      { codigo: "BE-BOM-02", nombre: "Bomba alimentación aseo" },
      { codigo: "BE-BOM-03", nombre: "Bomba rinser carbonatado" },
      { codigo: "BE-BOM-04", nombre: "Bomba alimentación jarabes" },
      { codigo: "BE-BOM-05", nombre: "Bomba llenadora carbonatado" },
      { codigo: "BE-BOM-06", nombre: "Bomba llenado tanque 5000 L" }
    ],

    "Suministro de botella": [
      { codigo: "BE-MES-01", nombre: "Mesa inox" },
      { codigo: "BE-TRA-01", nombre: "Transportador aéreo" },
    ],

    "ESTRELLAS DE TRANSFERENCIA": [
      { codigo: "BE-EST-01", nombre: "Estrella ingreso rinser" },
      { codigo: "BE-EST-02", nombre: "Estrella ingreso llenadora" },
      { codigo: "BE-EST-03", nombre: "Estrella ingreso capsulador" },
      { codigo: "BE-EST-04", nombre: "Estrella salida capsulador" }
    ],

    Rinser: [
      { codigo: "BE-DIS-01", nombre: "Distribuidor de agua" },
      { codigo: "BE-PIN-01", nombre: "Pinzas de sujeción" },
      { codigo: "BE-LEV-01", nombre: "Leva seguidor tumbador" },
      { codigo: "BE-BOM-03", nombre: "Bomba sistema de lavado" },
    ],

    Llenadora: [
      { codigo: "BE-LAM-01", nombre: "Lámpara filtro UV" },
      { codigo: "BE-FIL-01", nombre: "Tren de filtración aire" },
      { codigo: "BE-BOM-02", nombre: "Bomba suministro de agua" },
      { codigo: "BE-SIS-01", nombre: "Sensor de nivel" },
      { codigo: "BE-VAL-01", nombre: "Válvulas de llenado" },
      { codigo: "BE-SIS-02", nombre: "Sistema cilindro elevación" },
      { codigo: "BE-TRA-02", nombre: "Transmisión engranajes" },
      { codigo: "BE-MOT-01", nombre: "Motoreductor" },
      { codigo: "BE-TAB-01", nombre: "Tablero eléctrico" },
    ],

    Capsulador: [
      { codigo: "BE-CAB-01", nombre: "Cabezal roscador" },
      { codigo: "BE-ANT-01", nombre: "Antiguiros" },
      { codigo: "BE-GUI-01", nombre: "Guías de acompañamiento" },
      { codigo: "BE-CHU-01", nombre: "Chuck" },
    ],

    "SISTEMA DE ALIMENTACION DE TAPAS": [
      { codigo: "BE-TOL-01", nombre: "Tolva de tapa" },
      { codigo: "BE-ORI-01", nombre: "Orientador tapa superior" },
      { codigo: "BE-BAJ-01", nombre: "Canal de bajada de tapas" },
      { codigo: "BE-EST-06", nombre: "Estrella de alimentacion tapa" }
    ],

    "ETIQUETADORA": [
      { codigo: "BE-TOR-01", nombre: "Tornillo sin fin" },
      { codigo: "BE-EST-07", nombre: "Estrella ingreso" },
      { codigo: "BE-ALI-01", nombre: "Alisador de etiqueta" },
      { codigo: "BE-SIS-03", nombre: "Sistema de goma" },
      { codigo: "BE-TAM-01", nombre: "Tambor de transferencia" },
      { codigo: "BE-COR-01", nombre: "Sistema de corte" },
      { codigo: "BE-ROD-01", nombre: "Sistema de rodillos locos" },
      { codigo: "BE-POR-01", nombre: "Porta bobina" },
      { codigo: "BE-BAN-01", nombre: "Sistema bandas de transporte" },
      { codigo: "BE-NOR-01", nombre: "Sistema Nordson" },
      { codigo: "BE-ELE-01", nombre: "Tablero electrico" }
    ],

    "TRANSPORTADOR DE BOTELLA": [
      { codigo: "BE-ELE-01", nombre: "Motoreductores" },
      { codigo: "BE-CAD-01", nombre: 'Cadenas "Tabletop"' },
      { codigo: "BE-GUI-01", nombre: "Guias de deslizamiento" },
      { codigo: "BE-CHA-01", nombre: "Chasis" },
      { codigo: "BE-TAB-02", nombre: "Tablero electrico" }
    ],

    "EMPACADORA": [
      { codigo: "BE-COR-01", nombre: "Sistema de corte y sellado" },
      { codigo: "BE-HOR-01", nombre: "Camara termica (horno)" },
      { codigo: "BE-SIS-01", nombre: "Sistema de arrastre" },
      { codigo: "BE-NEU-01", nombre: "Sistema neumatico" },
      { codigo: "BE-SEG-01", nombre: "Sistema de seguridad" },
      { codigo: "BE-BOB-01", nombre: "Desembobinador" }
    ],

    "LOCATIVO": [
      { codigo: "BE-LOC-01", nombre: "Porton ingreso" },
      { codigo: "BE-LOC-02", nombre: "Puerta ingreso" },
      { codigo: "BE-LOC-03", nombre: "Puerta general" },
      { codigo: "BE-LOC-04", nombre: "Oficinas piso 1" },
      { codigo: "BE-LOC-05", nombre: "Oficinas piso 2" },
      { codigo: "BE-LOC-06", nombre: "Poseta lava traperos" },
      { codigo: "BE-LOC-07", nombre: "Lavamanos ingreso bodega" },
      { codigo: "BE-LOC-08", nombre: "Canaletas electricas" },
      { codigo: "BE-LOC-09", nombre: "Medidores de energia" },
      { codigo: "BE-LOC-10", nombre: "Medidor de gas" },
      { codigo: "BE-LOC-11", nombre: "Red de agua potable" },
      { codigo: "BE-LOC-12", nombre: "Iluminacion de bodega" },
      { codigo: "BE-LOC-13", nombre: "Red interna de 110V admin" },
      { codigo: "BE-LOC-14", nombre: "Medidores de agua" },
      { codigo: "BE-LOC-15", nombre: "Cubiertas" }
    ]

  },


  OFERTAS: {
    "Área de Producción": [
      "Horno 1",
      "Horno 2",
      "Horno 3",
      "Selladora 1",
      "Selladora 2",
      "Selladora 3",
    ],
  },

  LOCATIVOS: {
    "Bodega 14B": ["Piso 1", "Piso 2", "Piso 3"],
    "Bodega 15B": ["Piso 1", "Piso 2", "Piso 3"],
    "Bodega 17B": ["Piso 1", "Piso 2", "Piso 3"],
    "Bodega 18B": ["Piso 1", "Piso 2", "Piso 3"],
    "Bodega 19B": ["Piso 1", "Piso 2", "Piso 3"],
    "Bodega 8A": ["Piso 1", "Piso 2", "Piso 3"],
    "Bodega 8C": ["Piso 1", "Piso 2", "Piso 3"],
    "Bodega 5C": ["Piso 1", "Piso 2", "Piso 3"],
  },
};

// Supervisores por planta
const supervisores = {
  ALIMENTOS: "PINZON GUEVARA WILLIAM ORLANDO",
  ASEO: "RUEDA TOVAR JORGE CRISTIAN",
  GRANOS: "LEAL HERRERA JORGE ANDRES",
  BEBIDAS: "HENAO BEDOYA MARIA CRISTINA",
  OFERTAS: "HENAO BEDOYA MARIA CRISTINA",
  LOCATIVOS: "RICARDO ANDRES BEJARANO",
};



// ------------------------------------------------------
// EXPORTACIONES PARA USO EN OTROS MÓDULOS
// ------------------------------------------------------
export { datosPlantas, supervisores };
