const bebidas ={
  
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
      { codigo: "BE-BOMA-02", nombre: "Bomba alimentación aseo" },
      { codigo: "BE-BOMC-03", nombre: "Bomba rinser carbonatado" },
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





}

export {bebidas}