// ------------------------------------------------------
// VALIDACIÓN DE FIRMAS
// ------------------------------------------------------

export function tieneFirma(canvas) {
    if (!canvas) {
        console.warn("⚠️ [FIRMA] Canvas no encontrado");
        return false;
    }

    const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
    });

    if (!ctx) {
        console.error(`❌ [FIRMA] No se pudo obtener contexto 2D: ${canvas.id}`);
        return false;
    }

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    for (let i = 0; i < pixels.length; i += 4) {
        const rojo = pixels[i];
        const verde = pixels[i + 1];
        const azul = pixels[i + 2];

        if (rojo !== 255 || verde !== 255 || azul !== 255) {
            return true;
        }
    }

    return false;
}

export function validarFirma(idCanvas, nombre) {
    const canvas = document.getElementById(idCanvas);

    if (!canvas) {
        console.warn(`⚠️ [FIRMA] No existe #${idCanvas}`);

        return {
            valida: true,
            elemento: null,
            faltante: false,
        };
    }

    const valida = tieneFirma(canvas);

    if (valida) {
        canvas.classList.remove("border-danger");
    } else {
        canvas.classList.add("border-danger");
    }

    return {
        valida,
        elemento: canvas,
        faltante: !valida,
        nombre,
    };
}

export function configurarValidacionFirma(idCanvas) {
    const canvas = document.getElementById(idCanvas);

    if (!canvas) {
        console.warn(`⚠️ [FIRMA] No existe #${idCanvas}`);
        return;
    }

    if (canvas.dataset.validacionConfigurada === "true") {
        return;
    }

    canvas.dataset.validacionConfigurada = "true";

    const revisarFirma = () => {
        setTimeout(() => {
            if (tieneFirma(canvas)) {
                canvas.classList.remove("border-danger");
            }
        }, 30);
    };

    canvas.addEventListener("mouseup", revisarFirma);
    canvas.addEventListener("touchend", revisarFirma);
}
