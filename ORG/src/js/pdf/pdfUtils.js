// ------------------------------------------------------
// UTILIDADES PDF
// ------------------------------------------------------

export function obtenerValor(id) {

    const elemento =
        document.getElementById(id);

    if (!elemento) {
        return "";
    }

    if (elemento.tagName === "SELECT") {

        return (
            elemento.selectedOptions[0]?.text ||
            ""
        );
    }

    return elemento.value || "";
}

// ------------------------------------------------------
// FORMATO DE FECHA
// ------------------------------------------------------

export function formatearFecha(fecha) {

    if (!fecha) {
        return "";
    }

    return new Date(fecha)
        .toLocaleString()
        .replace(",", "");
}

// ------------------------------------------------------
// BASE64 DESDE URL
// ------------------------------------------------------

export async function obtenerBase64DesdeUrl(url) {

    const respuesta =
        await fetch(url);

    if (!respuesta.ok) {

        throw new Error(
            `No se pudo cargar el recurso: ${respuesta.status}`
        );
    }

    const blob =
        await respuesta.blob();

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();

            reader.onloadend = () =>
                resolve(reader.result);

            reader.onerror =
                reject;

            reader.readAsDataURL(blob);
        }
    );
}


