// ------------------------------------------------------
// RUTAS DE RECURSOS
// ------------------------------------------------------

const imageUrl = (fileName) =>
    new URL(
        `../../assets/images/${fileName}`,
        import.meta.url
    ).href;

// ------------------------------------------------------
// RECURSOS DE LA APLICACIÓN
// ------------------------------------------------------

export const assetPaths = {

    images: {

        // Logo utilizado en los informes PDF
        logo: imageUrl("logo.png")

    }

};