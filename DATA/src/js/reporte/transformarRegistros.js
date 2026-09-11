// ------------------------------------------------------
// TRANSFORMAR REGISTROS (NORMALIZAR DATOS)
// ------------------------------------------------------

import { clasificarIntervencion } from "./clasificarIntervencion.js";

export function transformarRegistros(registros) {

    return registros.map(r => {

        const minutos = (
            new Date(r.fechaFin) - new Date(r.fechaInicio)
        ) / 60000;

        return {
            planta: r.planta,
            area: r.area,
            equipo: r.equipo,
            codigo: r.codigo,
            id: r.id,

            fecha: r.fechaInicio.split("T")[0],
            minutos,

            tipoIntervencion: clasificarIntervencion(
                r.tipoMantenimiento + " " + r.area
            ),

            ejecutor: r.ejecutor,
            trabajo: r.trabajo
        };
    });
}