// ------------------------------------------------------
// CREAR OPERADORES EN FIRESTORE
// ------------------------------------------------------

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";


// ======================================================
// GENERAR HASH SHA-256
// ======================================================

async function generarHash(texto) {

    const encoder = new TextEncoder();

    const data = encoder.encode(texto);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


// ======================================================
// LISTA COMPLETA DE OPERADORES
// ======================================================

const operadores = [

    // ==================================================
    // REGISTRO 1
    // ==================================================

    {
        numero: 1,
        nif: "52664635",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "JIMENEZ HERRERA MARTHA MIREYA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },


    // ==================================================
    // PLANTA GRANOS
    // ==================================================

    {
        numero: 9,
        nif: "6765717",
        contratacion: "OCSAS",
        division: "DIV PLANTA GRANOS FUNZA",
        sede: "PLANTAS FUNZA",
        nombre: "BUITRAGO ORTIZ PABLO ENRIQUE",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL GRANO MOD",
        area: "AUXILIAR DE GRANOS",
        denominacionPosicion: "OPERARIO CALIFICADO PLANTA GRANOS",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 11,
        nif: "53164933",
        contratacion: "OCSAS",
        division: "DIV PLANTA GRANOS FUNZA",
        sede: "PLANTAS FUNZA",
        nombre: "HERRERA ARDILA LUZ NELLY",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL GRANO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO ESPECIALISTA",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 13,
        nif: "4208344",
        contratacion: "OCSAS",
        division: "DIV PLANTA GRANOS FUNZA",
        sede: "PLANTAS FUNZA",
        nombre: "ESTUPINAN FONSECA JUAN JOAQUIN",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL GRANO MOI",
        area: "AUXILIAR DE GRANOS",
        denominacionPosicion: "OPERARIO ESPECIALISTA",
        cargo: "OPERARIO ESPECIALISTA",
        estado: "ACTIVO"
    },


    // ==================================================
    // PLANTA BEBIDAS
    // ==================================================

    {
        numero: 20,
        nif: "1073236030",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA BEBIDAS",
        sede: "PLANTAS FUNZA",
        nombre: "OSORIO DIAZ JORGE ELIECER",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL BEBIDAS MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },


    // ==================================================
    // PLANTA ALIMENTOS
    // ==================================================

    {
        numero: 23,
        nif: "39819161",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "CORDOBA MANRIQUE MARIA INES",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 24,
        nif: "1073232628",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "FUQUENE GOMEZ DIANA CRISTINA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 25,
        nif: "35394568",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "PEREZ GOYENECHE ANAYIBI",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 26,
        nif: "1073504063",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "ORJUELA PEREZ LEIDY JOHANNA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 27,
        nif: "52664438",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "MARTINEZ CHAVEZ SANDRA PAOLA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 28,
        nif: "1005438068",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "HERRERA SALGADO YOVANI DE JESUS",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 29,
        nif: "52499163",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "CHIVATA MALAGON FRANCY ALEJANDRA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 30,
        nif: "1074344593",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "GUTIERREZ DUARTE CAROL ANDREA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 31,
        nif: "1074558546",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "MURCIA CASTRO OLGA LUCIA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 32,
        nif: "11446145",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "GIL GARZON HARVEY DUVAN",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 33,
        nif: "52663718",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "RUEDA TRIANA SANDRA MILENA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 34,
        nif: "1105790502",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "RUIZ OSPINA ANGIE YULIZA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 35,
        nif: "1088651051",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "TUTALCHA AGUIRRE EVER ALFONSO",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 36,
        nif: "1016029773",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "MONTENEGRO AMADO CARLOS ANDRES",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO ESPECIALISTA",
        cargo: "OPERARIO ESPECIALISTA",
        estado: "ACTIVO"
    },

    {
        numero: 37,
        nif: "1073527476",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "ESPINOSA PLAZAS LUZ MERY",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO ESPECIALISTA",
        cargo: "OPERARIO ESPECIALISTA",
        estado: "ACTIVO"
    },

    {
        numero: 38,
        nif: "85153488",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "ORTIZ RODRIGUEZ JUAN JOSE",
        designacion: "GERENCIA LOGISTICA",
        gerencia: "DIRECCIÓN LOGÍSTICA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOI",
        area: "OPERARIOS",
        denominacionPosicion: "AUX DE LOGISTICA",
        cargo: "AUXILIAR LOGISTICO",
        estado: "ACTIVO"
    },

    {
        numero: 39,
        nif: "79349859",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "RIVAS ALARCON JOSE HUMBERTO",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOI",
        area: "OPERARIOS",
        denominacionPosicion: "MECANICO",
        cargo: "MECANICO",
        estado: "ACTIVO"
    },

    {
        numero: 40,
        nif: "79494675",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "PINZON GUEVARA WILLIAM ORLANDO",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOI",
        area: "OPERARIOS",
        denominacionPosicion: "SUPERVISOR PLANTA ALIMENTOS",
        cargo: "SUPERVISOR PRODUCCION",
        estado: "ACTIVO"
    },

    {
        numero: 41,
        nif: "1007569648",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "POVEDA ZAMORA HILLARY KATHERIN",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },


    // ==================================================
    // PLANTA ASEO
    // ==================================================

    {
        numero: 53,
        nif: "7220420",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ASEO",
        sede: "PLANTAS FUNZA",
        nombre: "MOZO PACHECO CARLOS ARTURO",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL DE ASEO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 54,
        nif: "52326252",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ASEO",
        sede: "PLANTAS FUNZA",
        nombre: "SUAREZ GALINDO MARTHA JANNETH",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL DE ASEO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 55,
        nif: "1074414373",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ASEO",
        sede: "PLANTAS FUNZA",
        nombre: "PEÑA BLANCA LUCIA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL DE ASEO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 56,
        nif: "52745842",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ASEO",
        sede: "PLANTAS FUNZA",
        nombre: "CASTRO LARA MARTHA NUBIA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL DE ASEO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 57,
        nif: "10277716",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ASEO",
        sede: "PLANTAS FUNZA",
        nombre: "HURTADO HURTADO ALEXANDER",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL DE ASEO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO ESPECIALIZADO",
        cargo: "OPERARIO ESPECIALIZADO",
        estado: "ACTIVO"
    },

    {
        numero: 58,
        nif: "1073230819",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ASEO",
        sede: "PLANTAS FUNZA",
        nombre: "LOPEZ LUIS CLAUDIA MARCELA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL DE ASEO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO ESPECIALIZADO",
        cargo: "OPERARIO ESPECIALIZADO",
        estado: "ACTIVO"
    },

    {
        numero: 59,
        nif: "80654745",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ASEO",
        sede: "PLANTAS FUNZA",
        nombre: "TORRES BUSTOS JOHN FREDDY",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL DE ASEO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO ESPECIALIZADO",
        cargo: "OPERARIO ESPECIALIZADO",
        estado: "ACTIVO"
    },

    {
        numero: 60,
        nif: "1007934570",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA ASEO",
        sede: "PLANTAS FUNZA",
        nombre: "TORDECILLA PERALTA YHEFERSO",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL DE ASEO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO ESPECIALIZADO",
        cargo: "OPERARIO ESPECIALIZADO",
        estado: "ACTIVO"
    },


    // ==================================================
    // TEMPORALES - ALIMENTOS
    // ==================================================

    {
        numero: 69,
        nif: "1013619839",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "FRANCO CAMACHO YURY MILENA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 70,
        nif: "1102574090",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "PORTACIO ESTOR SARA DANIELA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },


    // ==================================================
    // PLANTA BEBIDAS
    // ==================================================

    {
        numero: 76,
        nif: "1073523801",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA BEBIDAS",
        sede: "PLANTAS FUNZA",
        nombre: "RIVERA RIVERA ANGIE PAOLA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL AGUAS MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO AGUA",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 79,
        nif: "94384625",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA BEBIDAS",
        sede: "PLANTAS FUNZA",
        nombre: "QUIÑONEZ CUELLAR JUANITO",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL BEBIDAS MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 80,
        nif: "1010068103",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA BEBIDAS",
        sede: "PLANTAS FUNZA",
        nombre: "GAVIRIA MENDEZ JULIAN ANDRES",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL BEBIDAS MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 81,
        nif: "39743391",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA BEBIDAS",
        sede: "PLANTAS FUNZA",
        nombre: "CASTRO TRIVIÑO CONSUELO",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL BEBIDAS MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 82,
        nif: "1070971744",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA BEBIDAS",
        sede: "PLANTAS FUNZA",
        nombre: "SANCHEZ ORDOÑEZ LEIDY JOHANA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL BEBIDAS MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO CALIFICADO",
        cargo: "OPERARIO CALIFICADO",
        estado: "ACTIVO"
    },

    {
        numero: 83,
        nif: "1082746705",
        contratacion: "OCSAS",
        division: "DIVISION PLANTA BEBIDAS",
        sede: "PLANTAS FUNZA",
        nombre: "FLORES AGREDA JOSE RAFAEL",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "DIRECTO",
        subDivision: "PL BEBIDAS MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO ESPECIALISTA",
        cargo: "OPERARIO ESPECIALISTA",
        estado: "ACTIVO"
    },


    // ==================================================
    // TÉCNICOS / TEMPORALES
    // ==================================================

    {
        numero: 88,
        nif: "1073503512",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "RODRIGUEZ ALARCON LUIS GABRIEL",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "TECNICO DE MANTENIMIENTO II",
        cargo: "TECNICO DE MANTENIMIENTO II",
        estado: "ACTIVO"
    },

    {
        numero: 89,
        nif: "1073153454",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "GALVIS BENAVIDES IVONNE YURANI",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 90,
        nif: "1082928238",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "SALAS CARRILLO SORELIS ESTER",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 91,
        nif: "1043641903",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "FLOREZ SIERRA VICTORIA MARIA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 92,
        nif: "1007669006",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "VARGAS MARIA CLAUDIA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 93,
        nif: "1073809519",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "ORTEGA HERNANDEZ ELIAS DAVID",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 94,
        nif: "1000787836",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "MENDEZ CERINZA HEIDY TATIANA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 95,
        nif: "1004319101",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "FLORIAN ALCENDRA LIZ ELENA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 99,
        nif: "1013103302",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "FUENTES MURCIA SOFIA ESPERANZA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 100,
        nif: "1003510366",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "DELGADO FORERO LAURA GABRIELA",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "OPERARIO",
        cargo: "OPERARIO",
        estado: "ACTIVO"
    },

    {
        numero: 101,
        nif: "1016070310",
        contratacion: "ACTIVOS",
        division: "DIVISION PLANTA ALIMENTOS",
        sede: "PLANTAS FUNZA",
        nombre: "CUERVO BELTRAN ANGELO STIVEN",
        designacion: "GERENCIA PLANTAS",
        gerencia: "DIRECCIÓN DE MANUFACTURA",
        tipoContrato: "TEMPORAL",
        subDivision: "PL ALIMENTO MOD",
        area: "OPERARIOS",
        denominacionPosicion: "TECNICO DE MANTENIMIENTO II",
        cargo: "TECNICO DE MANTENIMIENTO II",
        estado: "ACTIVO"
    }

];


// ======================================================
// CREAR OPERADORES
// ======================================================

async function crearOperadores() {

    console.log("========================================");
    console.log("🚀 INICIANDO CREACIÓN DE OPERADORES");
    console.log("========================================");

    console.log(
        `👥 Total de registros: ${operadores.length}`
    );


    try {

        let creados = 0;


        // ==============================================
        // RECORRER OPERADORES
        // ==============================================

        for (const operador of operadores) {

            console.log("");
            console.log(
                `🔎 Procesando N° ${operador.numero}: ${operador.nombre}`
            );


            // ==========================================
            // CONTRASEÑA
            // ==========================================
            //
            // Últimos 4 dígitos del NIF
            //
            // Se mantiene como STRING para conservar
            // ceros iniciales.
            //
            // Ejemplo:
            // 7220420 → 0420
            // ==========================================

            const password =
                operador.nif.slice(-4);


            console.log(
                `🔑 Contraseña inicial: ${password}`
            );


            // ==========================================
            // GENERAR HASH
            // ==========================================

            const passwordHash =
                await generarHash(password);


            // ==========================================
            // DATOS FIRESTORE
            // ==========================================

            const datos = {

                // --------------------------------------
                // LOGIN
                // --------------------------------------

                "Cédula": operador.nif,

                "Nombre": operador.nombre,

                "Activo": true,

                "passwordHash": passwordHash,


                // --------------------------------------
                // INFORMACIÓN DE PERSONAL
                // --------------------------------------

                "N°": operador.numero,

                "NIF": operador.nif,

                "CONTRATACION":
                    operador.contratacion,

                "Texto de división de personal":
                    operador.division,

                "SEDE":
                    operador.sede,

                "Número de personal":
                    operador.nombre,

                "DESIGNACION":
                    operador.designacion,

                "GERENCIA":
                    operador.gerencia,

                "TIPO DE CONTRATO":
                    operador.tipoContrato,

                "Txt.subd.pers.":
                    operador.subDivision,

                "Denom.área personal":
                    operador.area,

                "Denominación de posiciones":
                    operador.denominacionPosicion,

                "CARGO ACTUAL":
                    operador.cargo,

                "ESTADO":
                    operador.estado
            };


            // ==========================================
            // GUARDAR EN FIRESTORE
            // ==========================================

            const documento = await addDoc(
                collection(db, "operadores"),
                datos
            );


            creados++;


            // ==========================================
            // RESULTADO
            // ==========================================

            console.log(
                `✅ CREADO correctamente`
            );

            console.log(
                `   N°: ${operador.numero}`
            );

            console.log(
                `   Cédula: ${operador.nif}`
            );

            console.log(
                `   Nombre: ${operador.nombre}`
            );

            console.log(
                `   Contraseña: ${password}`
            );

            console.log(
                `   ID Firestore: ${documento.id}`
            );
        }


        // ==============================================
        // FINAL
        // ==============================================

        console.log("");
        console.log("========================================");
        console.log("🎉 PROCESO FINALIZADO");
        console.log("========================================");

        console.log(
            `✅ Operadores creados: ${creados}`
        );

        console.log(
            `📊 Total esperado: ${operadores.length}`
        );


    } catch (error) {

        console.error("");
        console.error(
            "❌ ERROR CREANDO OPERADORES"
        );

        console.error(error);
    }
}


// ======================================================
// EJECUTAR
// ======================================================

crearOperadores();