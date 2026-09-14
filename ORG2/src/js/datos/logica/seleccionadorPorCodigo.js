import { datosPlantas } from "../datosPlantas.js";
import { hayDatosPosterioresAlActivo } from "../../estadoInforme.js";


let actualizandoSelects = false;

function limpiarSeleccionActivo() {
    const inputCodigo = document.getElementById("codigo");
    const plantaSelect = document.getElementById("planta");
    const areaSelect = document.getElementById("area");
    const equipoSelect = document.getElementById("equipo");

    if (inputCodigo) inputCodigo.value = "";
    if (plantaSelect) plantaSelect.selectedIndex = 0;
    if (areaSelect) areaSelect.selectedIndex = 0;
    if (equipoSelect) equipoSelect.selectedIndex = 0;

    window.dispatchEvent(new CustomEvent("activo:no-encontrado"));
}

function confirmarCambioActivo(nuevoCodigo) {
    const actual = document.getElementById("equipo")?.value?.trim();
    if (!actual || actual === nuevoCodigo) return true;
    if (!hayDatosPosterioresAlActivo()) return true;

    const confirmar = window.confirm(
        "Este informe ya tiene información diligenciada. ¿Deseas cambiar de equipo? Se limpiarán los datos específicos del mantenimiento y podrás comenzar con el nuevo activo."
    );


    return confirmar;
}

function seleccionarPorCodigo(codigo) {
    if (actualizandoSelects) return false;

    codigo = String(codigo || "").trim();
    if (!codigo) return false;

    let encontrado = null;

    for (const planta in datosPlantas) {
        for (const area in datosPlantas[planta]) {
            const equipo = datosPlantas[planta][area].find((item) => item.codigo === codigo);
            if (equipo) {
                encontrado = { planta, area, equipo };
                break;
            }
        }
        if (encontrado) break;
    }

    if (!encontrado) {
        // Si ya existe un activo válido, no lo destruimos por un código
        // temporalmente incorrecto. Solo rechazamos la nueva búsqueda.
        const codigoActual = document.getElementById("equipo")?.value?.trim() || "";
        const inputCodigo = document.getElementById("codigo");
        if (codigoActual && inputCodigo) {
            inputCodigo.value = codigoActual;
        } else {
            limpiarSeleccionActivo();
        }
        window.dispatchEvent(new CustomEvent("activo:no-encontrado", { detail: { codigo } }));
        return false;
    }

    if (!confirmarCambioActivo(codigo)) return false;

    actualizandoSelects = true;

    const inputCodigo = document.getElementById("codigo");
    const plantaSelect = document.getElementById("planta");
    const areaSelect = document.getElementById("area");
    const equipoSelect = document.getElementById("equipo");

    if (inputCodigo) inputCodigo.value = codigo;

    plantaSelect.value = encontrado.planta;
    plantaSelect.dispatchEvent(new Event("change", { bubbles: true }));

    window.setTimeout(() => {
        areaSelect.value = encontrado.area;
        areaSelect.dispatchEvent(new Event("change", { bubbles: true }));

        window.setTimeout(() => {
            equipoSelect.value = encontrado.equipo.codigo;
            equipoSelect.dispatchEvent(new Event("change", { bubbles: true }));

            actualizandoSelects = false;
            window.dispatchEvent(new CustomEvent("activo:identificado", {
                detail: {
                    codigo,
                    planta: encontrado.planta,
                    area: encontrado.area,
                    equipo: encontrado.equipo.codigo
                }
            }));
        }, 80);
    }, 80);

    return true;
}

export { seleccionarPorCodigo };
