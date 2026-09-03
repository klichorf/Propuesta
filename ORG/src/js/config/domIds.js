// ------------------------------------------------------
// CONTRATOS DE IDS DEL DOM
// ------------------------------------------------------

export const DOM_IDS = Object.freeze({
    auth: Object.freeze({
        loginScreen: "loginScreen",
        appContent: "appContent",
        loginForm: "loginForm",
        loginEmail: "loginEmail",
        loginPassword: "loginPassword",
        loginError: "loginError",
        btnLogin: "btnLogin",
        usuarioActual: "usuarioActual",
        btnCerrarSesion: "btnCerrarSesion",
        modalCerrarSesion: "modalCerrarSesion",
        btnConfirmarCerrarSesion: "btnConfirmarCerrarSesion"
    }),

    formulario: Object.freeze({
        formulario: "formulario",
        codigo: "codigo",
        planta: "planta",
        area: "area",
        equipo: "equipo",
        ejecutor: "ejecutor",
        tipoMantenimiento: "tipoMantenimiento",
        fechaInicio: "fechaInicio",
        fechaFin: "fechaFin",
        tiempo: "tiempo",
        danos: "danos",
        trabajo: "trabajo"
    }),

    repuestos: Object.freeze({
        categoriaRepuesto: "categoriaRepuesto",
        buscadorRepuestos: "buscadorRepuestos",
        sugerencias: "sugerencias",
        repuestos: "repuestos"
    }),

    fotografias: Object.freeze({
        fotosTomar: "fotosTomar",
        fotos: "fotos",
        dropZone: "dropZone",
        thumbs: "thumbs"
    }),

    firmas: Object.freeze({
        nombreTecnicoFirma: "nombreTecnicoFirma",
        sigEjecutor: "sigEjecutor",
        firmaEjecutorArchivo: "firmaEjecutorArchivo",
        btnLimpiarFirmaEjecutor: "btnLimpiarFirmaEjecutor",
        nombreOperador: "nombreOperador",
        cedulaOperador: "cedulaOperador",
        passwordOperador: "passwordOperador",
        btnValidarOperador: "btnValidarOperador",
        estadoOperador: "estadoOperador",
        sigCoordinador: "sigCoordinador",
        firmaCoordinadorArchivo: "firmaCoordinadorArchivo",
        btnLimpiarFirmaCoordinador: "btnLimpiarFirmaCoordinador"
    }),

    reportes: Object.freeze({
        btnVerGrafico: "btnVerGrafico",
        modalGrafico: "modalGrafico",
        totalInformes: "totalInformes",
        datastart: "datastart",
        dataend: "dataend",
        btnFiltrarMantenimientos: "btnFiltrarMantenimientos",
        graficoMantenimientos: "graficoMantenimientos",
        graficoPlantaVsEquipo: "graficoPlantaVsEquipo",
        btnReportePlantas: "btnReportePlantas",
        modalReportePlantas: "modalReportePlantas",
        totalInformesReporte: "totalInformesReporte",
        filtroPlanta: "filtroPlanta",
        filtroFechaInicio: "filtroFechaInicio",
        filtroFechaFin: "filtroFechaFin",
        contenidoReporte: "contenidoReporte",
        btnReporteIntervenciones: "btnReporteIntervenciones",
        modalReporteIntervenciones: "modalReporteIntervenciones",
        totalIntervenciones: "totalIntervenciones",
        filtroPlantaIntervencion: "filtroPlantaIntervencion",
        filtroInicioIntervencion: "filtroInicioIntervencion",
        filtroFinIntervencion: "filtroFinIntervencion",
        contenidoReporteIntervenciones: "contenidoReporteIntervenciones"
    }),

    qr: Object.freeze({
        btnQR: "btnQR",
        qrModal: "QR-modal",
        qr: "QR",
        closeQR: "closeQR"
    }),

    activo: Object.freeze({
        vistaFotoActivo: "vistaFotoActivo",
        estadoFotoActivo: "estadoFotoActivo",
        skeletonFotoActivo: "skeletonFotoActivo",
        imagenActivoSeleccionado: "imagenActivoSeleccionado"
    }),

    loaders: Object.freeze({
        loaderOverlay: "loaderOverlay",
        loaderOverlay2: "loaderOverlay2",
        loaderProgress2: "loaderProgress2"
    })
});
