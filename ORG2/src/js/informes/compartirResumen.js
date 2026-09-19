// ------------------------------------------------------
// MÓDULO: COMPARTIR RESUMEN DE INFORME
// ------------------------------------------------------

import { construirResumenActividades, obtenerNombreEquipo } from './resumenActividades.js';

const FORMATO_FECHA = new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'long',
    timeStyle: 'short',
});

export { construirResumenActividades };

export function construirMensajeCompartir(informe) {
    const resumen = construirResumenActividades(informe);
    const fecha = formatearFecha(informe.timestamp);
    const equipo = obtenerNombreEquipo(informe.equipo, informe);
    const enlace = obtenerTexto(informe.urlSharePoint, 'No disponible');

    return [
        'INFORME TÉCNICO DE MANTENIMIENTO',
        '',
        `Equipo: ${equipo}`,
        `Planta: ${obtenerTexto(informe.planta, 'Sin planta')}`,
        `Área: ${obtenerTexto(informe.area, 'Sin área')}`,
        `Mantenimiento: ${obtenerTexto(informe.tipoMantenimiento, 'Sin tipo')}`,
        `Técnico: ${obtenerTexto(informe.ejecutor, 'Sin técnico')}`,
        `Fecha: ${fecha}`,
        '',
        'RESUMEN DE ACTIVIDADES',
        resumen,
        '',
        `Informe completo: ${enlace}`,
    ].join('\n');
}

export function compartirPorWhatsApp(informe) {
    const mensaje = construirMensajeCompartir(informe);
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    const ventana = window.open(url, '_blank', 'noopener,noreferrer');

    return Boolean(ventana);
}

export function compartirPorCorreo(informe) {
    const mensaje = construirMensajeCompartir(informe);
    const asunto = `Resumen de mantenimiento - ${obtenerTexto(
        informe.codigo,
        'Informe técnico',
    )}`;

    window.location.href = [
        'mailto:',
        `?subject=${encodeURIComponent(asunto)}`,
        `&body=${encodeURIComponent(mensaje)}`,
    ].join('');

    return true;
}

function formatearFecha(timestamp) {
    if (!timestamp) return 'Fecha no disponible';

    try {
        return FORMATO_FECHA.format(new Date(timestamp));
    } catch {
        return 'Fecha no disponible';
    }
}

function obtenerTexto(valor, respaldo) {
    const texto = String(valor ?? '').trim();
    return texto || respaldo;
}
