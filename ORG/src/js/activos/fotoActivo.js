/* =====================================================
   MOSTRAR SKELETON
   ===================================================== */

export function mostrarSkeletonFoto() {

    const contenedor =
        document.getElementById("vistaFotoActivo");

    const skeleton =
        document.getElementById("skeletonFotoActivo");

    const imagen =
        document.getElementById("imagenActivoSeleccionado");

    const contenedorImagen =
        document.querySelector(".contenedor-imagen-activo");


    // Mostrar sección completa
    contenedor?.classList.remove("d-none");


    // Mostrar skeleton
    skeleton?.classList.remove("d-none");


    // Ocultar imagen
    imagen?.classList.add("d-none");


    // IMPORTANTE:
    // ocultar el contenedor vacío mientras carga
    contenedorImagen?.classList.add("d-none");
}


/* =====================================================
   OCULTAR SKELETON
   ===================================================== */

export function ocultarSkeletonFoto() {

    const skeleton =
        document.getElementById("skeletonFotoActivo");

    skeleton?.classList.add("d-none");
}


/* =====================================================
   MOSTRAR TÍTULO
   ===================================================== */

export function mostrarTituloFoto() {

    const contenedor =
        document.getElementById("vistaFotoActivo");

    const estado =
        document.getElementById("estadoFotoActivo");


    contenedor?.classList.remove("d-none");


    if (estado) {

        estado.textContent =
            "FOTO DEL ACTIVO";
    }
}


/* =====================================================
   MOSTRAR ESTADO
   ===================================================== */

export function mostrarEstadoFoto(mensaje) {

    const contenedor =
        document.getElementById("vistaFotoActivo");

    const estado =
        document.getElementById("estadoFotoActivo");


    contenedor?.classList.remove("d-none");


    if (estado) {

        estado.textContent =
            mensaje;
    }
}


/* =====================================================
   LIMPIAR FOTO DEL ACTIVO
   ===================================================== */

export function limpiarFotoActivo() {

    const contenedor =
        document.getElementById("vistaFotoActivo");

    const estado =
        document.getElementById("estadoFotoActivo");

    const imagen =
        document.getElementById("imagenActivoSeleccionado");

    const link =
        document.getElementById("linkFotoActivo");

    const contenedorImagen =
        document.querySelector(".contenedor-imagen-activo");


    // Ocultar sección completa
    contenedor?.classList.add("d-none");


    // Ocultar skeleton
    ocultarSkeletonFoto();


    // Ocultar contenedor de imagen
    contenedorImagen?.classList.add("d-none");


    // Restaurar título
    if (estado) {

        estado.textContent =
            "FOTO DEL ACTIVO";
    }


    // Limpiar imagen
    if (imagen) {

        imagen.onload = null;
        imagen.onerror = null;

        imagen.removeAttribute("src");

        imagen.classList.add("d-none");
    }


    // Limpiar enlace
    if (link) {

        link.removeAttribute("href");

        link.classList.add("d-none");
    }
}


/* =====================================================
   CARGAR IMAGEN
   ===================================================== */

export function cargarImagen(
    urlImagen,
    urlVista
) {

    return new Promise((resolve, reject) => {

        const imagen =
            document.getElementById(
                "imagenActivoSeleccionado"
            );

        const link =
            document.getElementById(
                "linkFotoActivo"
            );

        const contenedorImagen =
            document.querySelector(
                ".contenedor-imagen-activo"
            );


        /* -------------------------------------------------
           VALIDAR ELEMENTO
           ------------------------------------------------- */

        if (!imagen) {

            reject(
                new Error(
                    "No existe #imagenActivoSeleccionado"
                )
            );

            return;
        }


        /* -------------------------------------------------
           CONFIGURAR ENLACE
           ------------------------------------------------- */

        if (link && urlVista) {

            link.href =
                urlVista;

            link.classList.remove("d-none");
        }


        /* -------------------------------------------------
           MOSTRAR ESTADO DE CARGA
           ------------------------------------------------- */

        mostrarTituloFoto();

        mostrarSkeletonFoto();


        /* -------------------------------------------------
           CARGA PREVIA DE IMAGEN
           ------------------------------------------------- */

        const imagenTemporal =
            new Image();


        imagenTemporal.onload = () => {

            /* ---------------------------------------------
               ASIGNAR IMAGEN
               --------------------------------------------- */

            imagen.src =
                urlImagen;


            /* ---------------------------------------------
               OCULTAR SKELETON
               --------------------------------------------- */

            ocultarSkeletonFoto();


            /* ---------------------------------------------
               MOSTRAR IMAGEN
               --------------------------------------------- */

            imagen.classList.remove("d-none");


            /* ---------------------------------------------
               MOSTRAR CONTENEDOR
               --------------------------------------------- */

            contenedorImagen?.classList.remove(
                "d-none"
            );


            resolve();
        };


        /* -------------------------------------------------
           ERROR DE CARGA
           ------------------------------------------------- */

        imagenTemporal.onerror = () => {

            ocultarSkeletonFoto();


            imagen.classList.add(
                "d-none"
            );


            // Mantener oculto el contenedor
            contenedorImagen?.classList.add(
                "d-none"
            );


            reject(
                new Error(
                    "No se pudo cargar la imagen"
                )
            );
        };


        /* -------------------------------------------------
           INICIAR CARGA
           ------------------------------------------------- */

        imagenTemporal.src =
            urlImagen;
    });
}