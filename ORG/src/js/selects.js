// -------------------------
// GESTIÓN DE SELECTORES DE PLANTA, ÁREA Y EQUIPO
// -------------------------

// Datos jerárquicos de plantas, áreas y equipos
const datosPlantas = {
  GRANOS: {

    "AREA ESTIBADOR": [
      { codigo: "GR-EST-01", nombre: "Estibador 1" },
      { codigo: "GR-EST-02", nombre: "Estibador 2" },
      { codigo: "GR-EST-03", nombre: "Estibador 3" },
      { codigo: "GR-EST-04", nombre: "Estibador 4" },
      { codigo: "GR-EST-05", nombre: "Estibador 5" }
    ],
    
    "ÁREA DE TOLVAS": [
      { codigo: "GR-TOL-01", nombre: "Tolva alimentacion empacadora 1" },
      { codigo: "GR-TOL-02", nombre: "Tolva alimentacion empacadora 2" },
      { codigo: "GR-TOL-03", nombre: "Tolva alimentacion empacadora 3" },
      { codigo: "GR-TOL-04", nombre: "Tolva alimentacion empacadora 4" },
      { codigo: "GR-TOL-05", nombre: "Tolva alimentacion empacadora 5" },
      { codigo: "GR-ESTR-05", nombre: "Estructura para tolvas de alimentación" },
      { codigo: "GR-PLA-01", nombre: "Plataforma de descargue y alimentación de tolvas" },
      { codigo: "GR-PUE-01", nombre: "Puerta deslizante zona de descargue " },
    ],



    "AREA DE CARGADOR DE BATERIAS": [

      { codigo: "GR-CAR-01", nombre: "Cargador de baterías montacargas 15B" },
      { codigo: "GR-CAR-02", nombre: "Cargador de baterías montacargas 14B" }
    ],


    "ÁREA DE COMPRESORES": [
      { codigo: "GR-COM-01", nombre: "Compresor GA 22" },
      { codigo: "GR-COM-02", nombre: "Compresor GX 11" },
      { codigo: "GR-SEC-01", nombre: "Secador compresor GA 22" },
      { codigo: "GR-SEC-02", nombre: "Secador compresor GX 11" },
      { codigo: "GR-AIR-01", nombre: "Red de aire comprimido" },
      { codigo: "GR-AIR-02", nombre: "Tanque pulmon aire comprimido" },
      { codigo: "GR-ESTR-04", nombre: "Estructura compresores ubicada en Bodega 15" }
    ],


    "VARIOS": [

    { codigo: "GR-MON-01", nombre: "Montacargas eléctrico" },
    { codigo: "GR-FOR-01", nombre: "Cuarto de formatos" },

   

    { codigo: "GR-COD-06", nombre: "Codificador de pedal" },
    { codigo: "GR-COSE-01", nombre: "Cosedora de sacos" },

    { codigo: "GR-ESTR-01", nombre: "Estructura azul de 4 pisos" },
    { codigo: "GR-ESTR-02", nombre: "Estructura amarilla de 4 pisos" },
    { codigo: "GR-ASP-01", nombre: "Aspiradora de limpieza Vaccun Clear" },
    { codigo: "GR-ENV-03", nombre: "Máquina envasadora volumétrica 3 posiciones" }
],


    "AREA ESTANTERIA PRODUCTO TERMINADO": [
      { codigo: "GR-ESTA-01", nombre: "Estantería industrial para almacenaje 1" },
      { codigo: "GR-ESTA-02", nombre: "Estantería industrial para almacenaje 2" },
      { codigo: "GR-ESTA-03", nombre: "Estantería industrial para almacenaje 3" },
      { codigo: "GR-ESTA-04", nombre: "Estantería industrial para almacenaje 4" },
      { codigo: "GR-ESTA-05", nombre: "Estantería industrial para almacenaje 5" },
      { codigo: "GR-ESTA-06", nombre: "Estantería industrial para almacenaje 6" },
      { codigo: "GR-ESTA-07", nombre: "Estantería industrial para almacenaje 7" },
      { codigo: "GR-ESTA-08", nombre: "Estantería industrial para almacenaje 8" },
      { codigo: "GR-ESTA-09", nombre: "Estantería industrial para almacenaje 9" },
      { codigo: "GR-ESTA-10", nombre: "Estantería industrial para almacenaje 10" },
      { codigo: "GR-ESTA-11", nombre: "Estantería industrial para almacenaje 11" },
      { codigo: "GR-ESTA-12", nombre: "Estantería industrial para almacenaje 12" },
      { codigo: "GR-ESTA-13", nombre: "Estantería industrial para almacenaje 13" },
      { codigo: "GR-ESTA-14", nombre: "Estantería industrial para almacenaje 14" },
      { codigo: "GR-ESTA-15", nombre: "Estantería industrial para almacenaje 15" },
      { codigo: "GR-ESTA-16", nombre: "Estantería industrial para almacenaje 16" },
      { codigo: "GR-ESTA-17", nombre: "Estantería industrial para almacenaje 17" },
      { codigo: "GR-ESTA-18", nombre: "Estantería industrial para almacenaje 18" },
      { codigo: "GR-ESTA-19", nombre: "Estantería industrial para almacenaje 19" },
      { codigo: "GR-ESTA-20", nombre: "Estantería industrial para almacenaje 20" },
      { codigo: "GR-ESTA-21", nombre: "Estantería industrial para almacenaje 21" },
      { codigo: "GR-ESTA-22", nombre: "Estantería industrial para almacenaje 22" },
      { codigo: "GR-ESTA-23", nombre: "Estantería industrial para almacenaje 23" },
      { codigo: "GR-ESTA-24", nombre: "Estantería industrial para almacenaje 24" },
      { codigo: "GR-ESTA-25", nombre: "Estantería industrial para almacenaje 25" }

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
      { codigo: "GR-PES-05", nombre: "Multicabezal pesadora máquina TEDMAQ" },
      { codigo: "GR-LIM-01", nombre: "Maquina limpiadora de granos" }
    ],


    "BÁSCULAS": [
      { codigo: "GR-BAS-01", nombre: "Bascula calidad" },
      { codigo: "GR-BAS-02", nombre: "Bascula empacadora 5" },
      { codigo: "GR-BAS-03", nombre: "Bascula ingreso MP" },
      { codigo: "GR-BAS-04", nombre: "Bascula laboratorio" },
      { codigo: "GR-BAS-05", nombre: "Bascula linea 1" },
      { codigo: "GR-BAS-06", nombre: "Bascula linea 2" }
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
      { codigo: "GR-BAN-01", nombre: "Bandas larga linea 1" },
      { codigo: "GR-BAN-02", nombre: "Bandas larga linea 2" },
      { codigo: "GR-BAN-03", nombre: "Banda rapida linea 1" },
      { codigo: "GR-BAN-04", nombre: "Banda rapida linea 2" },
      { codigo: "GR-BAN-05", nombre: "Banda salida INDUMACK linea 1" },
      { codigo: "GR-BAN-06", nombre: "Banda salida INDUMACK linea 2" },
      { codigo: "GR-BAN-07", nombre: "Banda transportadora empaque manual" },
      { codigo: "GR-BAN-08", nombre: "Banda de salida máquina TEDMAQ" },
    ],

    "VIBRADORES Y ZARANDAS": [
      { codigo: "GR-ZAR-01", nombre: "Zaranda 1" },
      { codigo: "GR-ZAR-02", nombre: "Zaranda 2" },
      { codigo: "GR-ZAR-03", nombre: "Zaranda 3" },
      { codigo: "GR-VIB-01", nombre: "Vibrador linea 1" },
      { codigo: "GR-VIB-02", nombre: "Vibrador linea 2" },
      { codigo: "GR-VIB-03", nombre: "Vibrador empacadora 5" },
      { codigo: "GR-CLA-01", nombre: "Clasificadora manual Bodega 15B 1" },
      { codigo: "GR-CLA-02", nombre: "Clasificadora manual Bodega 15B 2" },
      { codigo: "GR-CLA-03", nombre: "Clasificadora manual Bodega 15B 3" }
    ],

    "SELLADO Y SERVICIOS": [
      { codigo: "GR-SELL-01", nombre: "Selladora manual M5" },
      { codigo: "GR-SELL-02", nombre: "Selladora LINEA 2" },
      { codigo: "GR-REF-01", nombre: "Red refrigeracion selladoras" },
      { codigo: "GR-DIS-01", nombre: "Red distribucion de maquinas" },
      { codigo: "GR-ILU-01", nombre: "Iluminacion de maquinas" },

    ],


    "TABLEROS Y SISTEMAS DE CONTROL": [
      { codigo: "GR-TAB-01", nombre: "Tablero electrico principal" },
      { codigo: "GR-TAB-02", nombre: "Tablero electrico compresores" },
      { codigo: "GR-TAB-03", nombre: "Tablero electrico limpiadora de granos" },

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
      { codigo: "GR-LOC-15", nombre: "Cubiertas" },
      { codigo: "GR-LOC-16", nombre: "Pintura de pisos o paredes" },
      { codigo: "GR-LOC-17", nombre: "Cerramiento Bodega 14B" },
      { codigo: "GR-LOC-18", nombre: "Cerramiento Bodega 15B" }
    ],

    "ÁREA DE PESADO": [
      { codigo: "GR-PES-01", nombre: "Máquina pesadora de libras 1 (2do piso, zona edificio)" },
      { codigo: "GR-PES-02", nombre: "Máquina pesadora de libras 2 (2do piso, zona edificio)" },
      { codigo: "GR-PES-03", nombre: "Máquina pesadora de libras 3 (2do piso, zona edificio)" },
      { codigo: "GR-PES-04", nombre: "Máquina pesadora de libras 4 (2do piso, zona edificio)" }
    ],

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

    "Áreas Locativas": [
      { codigo: "AL-LOC-01", nombre: "Portón Ingreso" },
      { codigo: "AL-LOC-02", nombre: "Puerta Ingreso" },
      { codigo: "AL-LOC-03", nombre: "Puerta General" },
      { codigo: "AL-LOC-04", nombre: "Oficinas Piso 1" },
      { codigo: "AL-LOC-05", nombre: "Oficinas Piso 2" },
      { codigo: "AL-LOC-06", nombre: "Poseta Lava Traperos" },
      { codigo: "AL-LOC-07", nombre: "Lavamanos Ingreso Bodega" },
      { codigo: "AL-LOC-08", nombre: "Canaletas Eléctricas" },
      { codigo: "AL-LOC-09", nombre: "Medidores de Energía" },
      { codigo: "AL-LOC-10", nombre: "Medidor de Gas" },
      { codigo: "AL-LOC-11", nombre: "Red de Agua Potable" },
      { codigo: "AL-LOC-12", nombre: "Iluminación de Bodega" },
      { codigo: "AL-LOC-13", nombre: "Red Interna de 110V Admin" },
      { codigo: "AL-LOC-14", nombre: "Medidores de Agua" },
      { codigo: "AL-LOC-15", nombre: "Cubiertas" },
      { codigo: "AL-LOC-16", nombre: "Pintura de Pisos o Paredes" }
    ],

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
      { codigo: "BE-BOM-06", nombre: "Bomba llenado tanque 5000 L" },
      { codigo: "BE-NIT-01", nombre: "Generador de Nitrógeno" },
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
    { codigo: "OF-HOR-01", nombre: "Horno 1" },
    { codigo: "OF-HOR-02", nombre: "Horno 2" },
    { codigo: "OF-HOR-03", nombre: "Horno 3" },
    { codigo: "OF-SEL-01", nombre: "Selladora 1" },
    { codigo: "OF-SEL-02", nombre: "Selladora 2" },
    { codigo: "OF-SEL-03", nombre: "Selladora 3" }
  ],
},


};

// Supervisores por planta
const supervisores = {
  ALIMENTOS: "PINZON GUEVARA WILLIAM ORLANDO",
  ASEO: "OLGA LILIANA BERNAL RODRIGUEZ",
  GRANOS: "LEAL HERRERA JORGE ANDRES",
  BEBIDAS: "HENAO BEDOYA MARIA CRISTINA",
  OFERTAS: "HENAO BEDOYA MARIA CRISTINA",
  LOCATIVOS: "RICARDO ANDRES BEJARANO",
};

// =====================================================
// FIRMAS POR PERSONA
// Los archivos deben estar en:
// src/assets/firmas/
// =====================================================

const firmasPersonas = {

    // =========================
    // PERSONAL YA REGISTRADO
    // =========================

    "JORGE LEONARDO RODRIGUEZ":
        "jorge-leonardo-rodriguez.png",

    "PINEDA AGUDELO YONATAN STIVEN":
        "pineda-agudelo-yonatan-stiven.png",

    "QUEVEDO LADINO MARIO":
        "quevedo-ladino-mario.png",

    "LUIS GABRIEL RODRUIGUEZ":
        "luis-gabriel-rodruiguez.png",

    "NESTOR LEONARDO RODRIGUEZ":
        "nestor-leonardo-rodriguez.png",

    "ESNEIDER QUINTERO LOZANO":
        "esneider-quintero-lozano.png",

    "GERARDO MARIÑO":
        "gerardo-marino.png",

    "ANGELO STIVEN CUERVO BELTRAN":
        "angelo-stiven-cuervo-beltran.png",

    "PINZON GUEVARA WILLIAM ORLANDO":
        "pinzon-guevara-william-orlando.png",

    "OLGA LILIANA BERNAL RODRIGUEZ":
        "olga-liliana-bernal-rodriguez.png",

    "LEAL HERRERA JORGE ANDRES":
        "leal-herrera-jorge-andres.png",

    "HENAO BEDOYA MARIA CRISTINA":
        "henao-bedoya-maria-cristina.png",

    "RICARDO ANDRES BEJARANO":
        "ricardo-andres-bejarano.png",

    "OPERADOR DE PRUEBA":
        "operador-prueba.png",


    // =========================
    // NUEVOS OPERADORES
    // =========================

    "JIMENEZ HERRERA MARTHA MIREYA":
        "jimenez-herrera-martha-mireya.png",

    "RUIZ RUIZ JOHANNA":
        "ruiz-ruiz-johanna.png",

    "QUEVEDO GUZMAN YENNI PAOLA":
        "quevedo-guzman-yenni-paola.png",

    "GUERRERO RAMOS ASTRID YURLEY":
        "guerrero-ramos-astrid-yurley.png",

    "ECHEVERRY BONILLA EDUAR CAMILO":
        "echeverry-bonilla-eduar-camilo.png",

    "BERNAL JIMENEZ OSCAR FABIAN":
        "bernal-jimenez-oscar-fabian.png",

    "ORTEGA OSTIA YUSBELYS":
        "ortega-ostia-yusbelys.png",

    "BEJARANO PEREZ JOSE":
        "bejarano-perez-jose.png",

    "BUITRAGO ORTIZ PABLO ENRIQUE":
        "buitrago-ortiz-pablo-enrique.png",

    "MEDINA MAHECHA JOHN JAIRO":
        "medina-mahecha-john-jairo.png",

    "HERRERA ARDILA LUZ NELLY":
        "herrera-ardila-luz-nelly.png",

    "ALEJO RIVEROS WILLIAM HERNAN":
        "alejo-riveros-william-hernan.png",

    "ESTUPINAN FONSECA JUAN JOAQUIN":
        "estupinan-fonseca-juan-joaquin.png",

    "PIMENTEL CUTIVA HERNAN":
        "pimentel-cutiva-hernan.png",

    "MENDEZ QUEMBA HANS SNEYTHER":
        "mendez-quemba-hans-sneyther.png",

    "RODRIGUEZ JORGE LEONARDO":
        "rodriguez-jorge-leonardo.png",

    "CARDENAS FEO DIANA MARITZA":
        "cardenas-feo-diana-maritza.png",

    "RACINEZ TRIANA MAYLEM":
        "racinez-triana-maylem.png",

    "OSORIO DIAZ JORGE ELIECER":
        "osorio-diaz-jorge-eliecer.png",

    "OBANDO ZAMBRANO CHRISTIAN ALEJANDRO":
        "obando-zambrano-christian-alejandro.png",

    "MARIÑO CHAPARRO GERARDO":
        "marino-chaparro-gerardo.png",

    "CORDOBA MANRIQUE MARIA INES":
        "cordoba-manrique-maria-ines.png",

    "FUQUENE GOMEZ DIANA CRISTINA":
        "fuquene-gomez-diana-cristina.png",

    "PEREZ GOYENECHE ANAYIBI":
        "perez-goyeneche-anayibi.png",

    "ORJUELA PEREZ LEIDY JOHANNA":
        "orjuela-perez-leidy-johanna.png",

    "MARTINEZ CHAVEZ SANDRA PAOLA":
        "martinez-chavez-sandra-paola.png",

    "HERRERA SALGADO YOVANI DE JESUS":
        "herrera-salgado-yovani-de-jesus.png",

    "CHIVATA MALAGON FRANCY ALEJANDRA":
        "chivata-malagon-francy-alejandra.png",

    "GUTIERREZ DUARTE CAROL ANDREA":
        "gutierrez-duarte-carol-andrea.png",

    "MURCIA CASTRO OLGA LUCIA":
        "murcia-castro-olga-lucia.png",

    "GIL GARZON HARVEY DUVAN":
        "gil-garzon-harvey-duvan.png",

    "RUEDA TRIANA SANDRA MILENA":
        "rueda-triana-sandra-milena.png",

    "RUIZ OSPINA ANGIE YULIZA":
        "ruiz-ospina-angie-yuliza.png",

    "TUTALCHA AGUIRRE EVER ALFONSO":
        "tutalcha-aguirre-ever-alfonso.png",

    "MONTENEGRO AMADO CARLOS ANDRES":
        "montenegro-amado-carlos-andres.png",

    "ESPINOSA PLAZAS LUZ MERY":
        "espinosa-plazas-luz-mery.png",

    "ORTIZ RODRIGUEZ JUAN JOSE":
        "ortiz-rodriguez-juan-jose.png",

    "RIVAS ALARCON JOSE HUMBERTO":
        "rivas-alarcon-jose-humberto.png",

    "POVEDA ZAMORA HILLARY KATHERIN":
        "poveda-zamora-hillary-katherin.png",

    "AVILES YANCE DAMIAN ANTONIO":
        "aviles-yance-damian-antonio.png",

    "IRIARTE RODRIGUEZ CARLOS MANUEL":
        "iriarte-rodriguez-carlos-manuel.png",

    "MORA TEJADA MAIRA ANDREA":
        "mora-tejada-maira-andrea.png",

    "DELGADO VERTEL YANEDIS DEL CARMEN":
        "delgado-vertel-yanedis-del-carmen.png",

    "ZAMBRANO VARGAS DIANA LISSETH":
        "zambrano-vargas-diana-lisseth.png",

    "ROBLEDO MOYA MIROSLAINE":
        "robledo-moya-miroslaine.png",

    "VELASCO FORERO DEICY MARIANA":
        "velasco-forero-deicy-mariana.png",

    "GONZALEZ MORILLO ERICA DEL CARMEN":
        "gonzalez-morillo-erica-del-carmen.png",

    "CEBALLOS IMBACHI MAYERLY":
        "ceballos-imbachi-mayerly.png",

    "RODRIGUEZ QUIROGA CARLOS DUVAN":
        "rodriguez-quiroga-carlos-duvan.png",

    "CASTIBLANCO ROMERO AMANDA":
        "castiblanco-romero-amanda.png",

    "MOZO PACHECO CARLOS ARTURO":
        "mozo-pacheco-carlos-arturo.png",

    "SUAREZ GALINDO MARTHA JANNETH":
        "suarez-galindo-martha-janneth.png",

    "PEÑA BLANCA LUCIA":
        "pena-blanca-lucia.png",

    "CASTRO LARA MARTHA NUBIA":
        "castro-lara-martha-nubia.png",

    "HURTADO HURTADO ALEXANDER":
        "hurtado-hurtado-alexander.png",

    "LOPEZ LUIS CLAUDIA MARCELA":
        "lopez-luis-claudia-marcela.png",

    "TORRES BUSTOS JOHN FREDDY":
        "torres-bustos-john-freddy.png",

    "TORDECILLA PERALTA YHEFERSO":
        "tordecilla-peralta-yheferso.png",

    "MARTINEZ JARAMILLO LUIS MIGUEL":
        "martinez-jaramillo-luis-miguel.png",

    "BANQUEZ PEREZ HILARIO JOSE":
        "banquez-perez-hilario-jose.png",

    "RODRIGUEZ YENI BIBIANA":
        "rodriguez-yeni-bibiana.png",

    "ATENCIA DIRO MANUEL":
        "atencia-diro-manuel.png",

    "MENDOZA RODRIGUEZ YERID DANIEL":
        "mendoza-rodriguez-yerid-daniel.png",

    "CEPEDA ANDRADE JESUS DAVID":
        "cepeda-andrade-jesus-david.png",

    "GONZALEZ ABANERO LEONARD DAVID":
        "gonzalez-abanero-leonard-david.png",

    "FRANCO CAMACHO YURY MILENA":
        "franco-camacho-yury-milena.png",

    "PORTACIO ESTOR SARA DANIELA":
        "portacio-estor-sara-daniela.png",

    "DAVILA DURAN AYDA LUZ":
        "davila-duran-ayda-luz.png",

    "NIEBLES NIEBLES LISETH YURANIS":
        "niebles-niebles-liseth-yuranis.png",

    "LOPEZ RUIZ LEIDY PAOLA":
        "lopez-ruiz-leidy-paola.png",

    "SARMIENTO SARMIENTO INGRIS PATRICIA":
        "sarmiento-sarmiento-ingris-patricia.png",

    "RUBIANO GOMEZ LAURA LIZETH":
        "rubiano-gomez-laura-lizeth.png",

    "RIVERA RIVERA ANGIE PAOLA":
        "rivera-rivera-angie-paola.png",

    "RODRIGUEZ JUYO DEISY PAOLA":
        "rodriguez-juyo-deisy-paola.png",

    "QUIÑONEZ CUELLAR JUANITO":
        "quinonez-cuellar-juanito.png",

    "GAVIRIA MENDEZ JULIAN ANDRES":
        "gaviria-mendez-julian-andres.png",

    "CASTRO TRIVIÑO CONSUELO":
        "castro-trivino-consuelo.png",

    "SANCHEZ ORDOÑEZ LEIDY JOHANA":
        "sanchez-ordonez-leidy-johana.png",

    "FLORES AGREDA JOSE RAFAEL":
        "flores-agreda-jose-rafael.png",

    "MARTINEZ MALDONADO LUIS FERNANDO":
        "martinez-maldonado-luis-fernando.png",

    "PADILLA CABALLERO WILVER JOSE":
        "padilla-caballero-wilver-jose.png",

    "BERNAL RODRIGUEZ OLGA LILIANA":
        "bernal-rodriguez-olga-liliana.png",

    "RODRIGUEZ ALARCON LUIS GABRIEL":
        "rodriguez-alarcon-luis-gabriel.png",

    "GALVIS BENAVIDES IVONNE YURANI":
        "galvis-benavides-ivonne-yurani.png",

    "SALAS CARRILLO SORELIS ESTER":
        "salas-carrillo-sorelis-ester.png",

    "FLOREZ SIERRA VICTORIA MARIA":
        "florez-sierra-victoria-maria.png",

    "VARGAS MARIA CLAUDIA":
        "vargas-maria-claudia.png",

    "ORTEGA HERNANDEZ ELIAS DAVID":
        "ortega-hernandez-elias-david.png",

    "MENDEZ CERINZA HEIDY TATIANA":
        "mendez-cerinza-heidy-tatiana.png",

    "FLORIAN ALCENDRA LIZ ELENA":
        "florian-alcendra-liz-elena.png",

    "CUINTACO BENAVIDES NICOLAS":
        "cuintaco-benavides-nicolas.png",

    "PALACIOS VASQUEZ LUIS ENRIQUE":
        "palacios-vasquez-luis-enrique.png",

    "LOPEZ CHAGUALA EDISON ESTID":
        "lopez-chaguala-edison-estid.png",

    "FUENTES MURCIA SOFIA ESPERANZA":
        "fuentes-murcia-sofia-esperanza.png",

    "DELGADO FORERO LAURA GABRIELA":
        "delgado-forero-laura-gabriela.png",

    "CUERVO BELTRAN ANGELO STIVEN":
        "cuervo-beltran-angelo-stiven.png",

    "ULLOA GARZON DANIEL ALEJANDRO":
        "ulloa-garzon-daniel-alejandro.png",

    "SANCHEZ MORALES DIANI LUZ":
        "sanchez-morales-diani-luz.png",

    "ROMERO CORREA ROBERTO LUIS":
        "romero-correa-roberto-luis.png",

    "CARDENAS RINCON CINDY JOHANNA":
        "cardenas-rincon-cindy-johanna.png"

};




// ------------------------------------------------------
// EXPORTACIONES PARA USO EN OTROS MÓDULOS
// ------------------------------------------------------
export { datosPlantas, supervisores, firmasPersonas };
