export function mostrarSkeletonFoto() {

    const contenedor =
        document.getElementById("vistaFotoActivo");

    const skeleton =
        document.getElementById("skeletonFotoActivo");

    const imagen =
        document.getElementById("imagenActivoSeleccionado");

    contenedor?.classList.remove("d-none");

    skeleton?.classList.remove("d-none");

    imagen?.classList.add("d-none");
}


export function ocultarSkeletonFoto() {

    const skeleton =
        document.getElementById("skeletonFotoActivo");

    skeleton?.classList.add("d-none");
}


export function mostrarTituloFoto() {

    const contenedor =
        document.getElementById("vistaFotoActivo");

    const estado =
        document.getElementById("estadoFotoActivo");

    contenedor?.classList.remove("d-none");

    if (estado) {
        estado.textContent = "FOTO DEL ACTIVO";
    }
}


export function mostrarEstadoFoto(mensaje) {

    const contenedor =
        document.getElementById("vistaFotoActivo");

    const estado =
        document.getElementById("estadoFotoActivo");

    contenedor?.classList.remove("d-none");

    if (estado) {
        estado.textContent = mensaje;
    }
}


export function limpiarFotoActivo() {

    const contenedor =
        document.getElementById("vistaFotoActivo");

    const estado =
        document.getElementById("estadoFotoActivo");

    const imagen =
        document.getElementById("imagenActivoSeleccionado");

    const link =
        document.getElementById("linkFotoActivo");

    contenedor?.classList.add("d-none");

    ocultarSkeletonFoto();

    if (estado) {
        estado.textContent = "FOTO DEL ACTIVO";
    }

    if (imagen) {

        imagen.onload = null;
        imagen.onerror = null;

        imagen.src = "";

        imagen.classList.add("d-none");
    }

    if (link) {

        link.removeAttribute("href");

        link.classList.add("d-none");
    }
}


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

        if (!imagen) {
            reject(
                new Error(
                    "No existe #imagenActivoSeleccionado"
                )
            );

            return;
        }

        if (link && urlVista) {

            link.href = urlVista;

            link.classList.remove("d-none");
        }

        mostrarTituloFoto();

        mostrarSkeletonFoto();

        const imagenTemporal = new Image();

        imagenTemporal.onload = () => {

            imagen.src = urlImagen;

            ocultarSkeletonFoto();

            imagen.classList.remove("d-none");

            resolve();
        };

        imagenTemporal.onerror = () => {

            ocultarSkeletonFoto();

            imagen.classList.add("d-none");

            reject(
                new Error(
                    "No se pudo cargar la imagen"
                )
            );
        };

        imagenTemporal.src = urlImagen;
    });
}