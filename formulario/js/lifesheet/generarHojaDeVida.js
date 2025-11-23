import { mostrarHojaDeVidaEnModal } from "./mostrarHojaDeVidaEnModal.js";

// Filtra registros reales del equipo
export function generarHojaDeVida(registros, planta, area, equipo) {
    const lista = registros.filter(r =>
        r.planta === planta &&
        r.area === area &&
        r.equipo === equipo
    );

    mostrarHojaDeVidaEnModal(lista, { planta, area, equipo });
}
