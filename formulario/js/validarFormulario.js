// ------------------------------------------------------
// MÓDULO: VALIDAR FORMULARIO
// ------------------------------------------------------
export function validarFormulario() {
    const campos = [
        "codigo",
        "planta",
        "area",
        "equipo",
        "fechaInicio",
        "fechaFin",
        "tipoMantenimiento",
        "ejecutor",
        "danos",
        "trabajo",
        "repuestos",
        "herramientas",
        "fotos",
    ];

    let faltantes = [];
    let primero = null;

    // 🔹 Limpiar estilos previos
    campos.forEach((id) => {
        const c = document.getElementById(id);
        if (c) {
            c.classList.remove("is-invalid");
            if (c.tagName === "SELECT") c.style.border = "";
        }
    });

    // 🔹 Validar campos vacíos (maneja <input>, <textarea> y <select>)
    campos.forEach((id) => {
        const c = document.getElementById(id);
        if (!c) return;

        let vacio = false;

        if (c.tagName === "SELECT") {
            // Si el valor es vacío o nulo, marcar como inválido
            vacio = !c.value || c.selectedIndex === 0;
        } else {
            vacio = !c.value.trim();
        }

        if (vacio) {
            c.classList.add("is-invalid");
            if (c.tagName === "SELECT") {
                c.style.border = "2px solid #dc3545";
            }
            faltantes.push(id);
            if (!primero) primero = c;
        } else {
            c.classList.remove("is-invalid");
            if (c.tagName === "SELECT") c.style.border = "";
        }
    });

    // 🔹 Verificar firma del ejecutor
    const sig = document.getElementById("sigEjecutor");
    const ctx = sig.getContext("2d", { willReadFrequently: true });
    const pixels = ctx.getImageData(0, 0, sig.width, sig.height).data;
    const hayTinta = pixels.some((v) => v !== 255);

    if (!hayTinta) {
        sig.classList.add("border-danger");
        faltantes.push("firma");
        if (!primero) primero = sig;
    } else {
        sig.classList.remove("border-danger");
    }

    // 🔹 Verificar firma del supervisor
    const sigSupervisor = document.getElementById("sigCoordinador");
    const ctxS = sigSupervisor.getContext("2d", { willReadFrequently: true });
    const pixelsS = ctxS.getImageData(
        0,
        0,
        sigSupervisor.width,
        sigSupervisor.height
    ).data;
    const hayFirmaSupervisor = pixelsS.some((v) => v !== 255);

    if (!hayFirmaSupervisor) {
        sigSupervisor.classList.add("border-danger");
        faltantes.push("firmaSupervisor");
        if (!primero) primero = sigSupervisor;
    } else {
        sigSupervisor.classList.remove("border-danger");
    }

    // 🔹 Mostrar alerta si faltan campos
    if (faltantes.length) {
        mostrarAlerta(
            "⚠️ Debes completar todos los campos obligatorios antes de continuar.",
            "warning"
        );
        primero.scrollIntoView({ behavior: "smooth", block: "center" });
        return false;
    }

    return true;
}

// ------------------------------------------------------
// 🔄 MONITOREAR CAMBIOS EN CAMPOS
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const campos = document.querySelectorAll(
        "#codigo, #planta, #area, #equipo, #fechaInicio, #fechaFin, #tipoMantenimiento, #ejecutor, #danos, #trabajo, #repuestos, #herramientas,#fotos"
 );

    campos.forEach((campo) => {
        // 🔹 INPUT / TEXTAREA
        campo.addEventListener("input", () => {
            if (campo.value.trim()) campo.classList.remove("is-invalid");
        });

        // 🔹 SELECT
        campo.addEventListener("change", () => {
            if (campo.value && campo.selectedIndex > 0) {
                campo.classList.remove("is-invalid");
                if (campo.tagName === "SELECT") campo.style.border = "";
            }
            
        });
    });
});

// ------------------------------------------------------
// ALERTA VISUAL BONITA (Bootstrap)
// ------------------------------------------------------
function mostrarAlerta(mensaje, tipo = "info") {
    let alerta = document.getElementById("alertaFormulario");
    if (!alerta) {
        alerta = document.createElement("div");
        alerta.id = "alertaFormulario";
        alerta.className = `alert alert-${tipo} text-center position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
        alerta.style.zIndex = "1055";
        document.body.appendChild(alerta);
    }

    alerta.textContent = mensaje;
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
}
