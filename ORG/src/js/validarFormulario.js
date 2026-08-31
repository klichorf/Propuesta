// ------------------------------------------------------
// MÓDULO: VALIDAR FORMULARIO
// ------------------------------------------------------

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
   
];

console.log("🔵 [VALIDACIÓN] Módulo de validación cargado");
console.log("📋 [VALIDACIÓN] Campos obligatorios:", campos);


// ------------------------------------------------------
// 🔎 COMPROBAR SI EL CAMPO ESTÁ VACÍO
// ------------------------------------------------------

function estaVacio(campo) {

    if (!campo) {
        console.warn("⚠️ [VALIDACIÓN] Campo no encontrado");
        return true;
    }

    if (campo.tagName === "SELECT") {

        const vacio =
            !campo.value ||
            campo.selectedIndex === 0;

        console.log(
            `🔽 [SELECT] ${campo.id} → valor: "${campo.value}", índice: ${campo.selectedIndex}, vacío: ${vacio}`
        );

        return vacio;
    }

    const valor = campo.value.trim();

    const vacio = !valor;

    console.log(
        `📝 [INPUT] ${campo.id} → valor: "${valor}", vacío: ${vacio}`
    );

    return vacio;
}


// ------------------------------------------------------
// 🟢 QUITAR ESTADO INVALIDO
// ------------------------------------------------------

function quitarError(campo) {

    if (!campo) {
        console.warn(
            "⚠️ [VALIDACIÓN] Intentando quitar error de campo inexistente"
        );
        return;
    }

    const teniaError =
        campo.classList.contains("is-invalid");

    campo.classList.remove("is-invalid");

    if (campo.tagName === "SELECT") {
        campo.style.border = "";
    }

    console.log(
        `${teniaError ? "🟢" : "ℹ️"} [VALIDACIÓN] ${campo.id} → error eliminado`
    );

    console.log(
        `   Clase is-invalid: ${campo.classList.contains("is-invalid")}`
    );
}


// ------------------------------------------------------
// 🔴 PONER ESTADO INVALIDO
// ------------------------------------------------------

function ponerError(campo) {

    if (!campo) {
        console.warn(
            "⚠️ [VALIDACIÓN] Intentando marcar campo inexistente"
        );
        return;
    }

    campo.classList.add("is-invalid");

    if (campo.tagName === "SELECT") {
        campo.style.border =
            "2px solid #dc3545";
    }

    console.log(
        `🔴 [VALIDACIÓN] ${campo.id} → marcado como INVALIDO`
    );

    console.log(
        `   Clase is-invalid: ${campo.classList.contains("is-invalid")}`
    );
}


// ------------------------------------------------------
// 🔄 VALIDAR CAMPO INDIVIDUAL
// ------------------------------------------------------

function validarCampo(campo) {

    if (!campo) {
        console.warn(
            "⚠️ [VALIDACIÓN] validarCampo recibió un campo inexistente"
        );
        return false;
    }

    console.log(
        `🔍 [VALIDACIÓN] Revisando campo: ${campo.id}`
    );

    if (estaVacio(campo)) {

        console.log(
            `🔴 [VALIDACIÓN] ${campo.id} está VACÍO`
        );

        ponerError(campo);

        return false;
    }

    console.log(
        `🟢 [VALIDACIÓN] ${campo.id} está COMPLETO`
    );

    quitarError(campo);

    return true;
}


// ------------------------------------------------------
// ✍️ COMPROBAR FIRMA
// ------------------------------------------------------

function tieneFirma(canvas) {

    if (!canvas) {

        console.warn(
            "⚠️ [FIRMA] Canvas no encontrado"
        );

        return false;
    }

    const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
    });

    if (!ctx) {

        console.error(
            `❌ [FIRMA] No se pudo obtener contexto 2D: ${canvas.id}`
        );

        return false;
    }

    const pixels =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;


    for (let i = 0; i < pixels.length; i += 4) {

        const rojo = pixels[i];
        const verde = pixels[i + 1];
        const azul = pixels[i + 2];

        if (
            rojo !== 255 ||
            verde !== 255 ||
            azul !== 255
        ) {

            console.log(
                `🟢 [FIRMA] ${canvas.id} → FIRMA DETECTADA`
            );

            return true;
        }
    }

    console.log(
        `🔴 [FIRMA] ${canvas.id} → SIN FIRMA`
    );

    return false;
}


// ------------------------------------------------------
// 🚨 VALIDAR TODO EL FORMULARIO
// ------------------------------------------------------

export function validarFormulario() {

    console.log("");
    console.log("==========================================");
    console.log("🚨 [VALIDACIÓN] INICIANDO VALIDACIÓN");
    console.log("==========================================");

    let faltantes = [];
    let primero = null;


    // --------------------------------------------------
    // CAMPOS
    // --------------------------------------------------

    campos.forEach((id) => {

        const campo =
            document.getElementById(id);

        if (!campo) {

            console.error(
                `❌ [VALIDACIÓN] No existe el elemento #${id}`
            );

            return;
        }

        console.log(
            `🔎 [VALIDACIÓN] Comprobando #${id}`
        );


        if (!validarCampo(campo)) {

            faltantes.push(id);

            console.log(
                `🔴 [VALIDACIÓN] Falta completar: ${id}`
            );

            if (!primero) {
                primero = campo;

                console.log(
                    `👉 [VALIDACIÓN] Primer campo faltante: ${id}`
                );
            }

        } else {

            console.log(
                `🟢 [VALIDACIÓN] ${id} está correcto`
            );
        }

    });


    // --------------------------------------------------
    // ✍️ FIRMA EJECUTOR
    // --------------------------------------------------

    const sigEjecutor =
        document.getElementById("sigEjecutor");

    console.log(
        "✍️ [FIRMA] Validando firma del ejecutor..."
    );

    if (sigEjecutor) {

        if (!tieneFirma(sigEjecutor)) {

            sigEjecutor.classList.add(
                "border-danger"
            );

            faltantes.push("firma");

            console.log(
                "🔴 [FIRMA] Falta firma del ejecutor"
            );

            if (!primero) {
                primero = sigEjecutor;
            }

        } else {

            sigEjecutor.classList.remove(
                "border-danger"
            );

            console.log(
                "🟢 [FIRMA] Firma del ejecutor correcta"
            );
        }

    } else {

        console.warn(
            "⚠️ [FIRMA] No existe #sigEjecutor"
        );
    }


    // --------------------------------------------------
    // ✍️ FIRMA SUPERVISOR
    // --------------------------------------------------

    const sigSupervisor =
        document.getElementById("sigCoordinador");

    console.log(
        "✍️ [FIRMA] Validando firma del supervisor..."
    );

    if (sigSupervisor) {

        if (!tieneFirma(sigSupervisor)) {

            sigSupervisor.classList.add(
                "border-danger"
            );

            faltantes.push(
                "firmaSupervisor"
            );

            console.log(
                "🔴 [FIRMA] Falta firma del supervisor"
            );

            if (!primero) {
                primero = sigSupervisor;
            }

        } else {

            sigSupervisor.classList.remove(
                "border-danger"
            );

            console.log(
                "🟢 [FIRMA] Firma del supervisor correcta"
            );
        }

    } else {

        console.warn(
            "⚠️ [FIRMA] No existe #sigCoordinador"
        );
    }


    // --------------------------------------------------
    // 📋 RESULTADO DE VALIDACIÓN
    // --------------------------------------------------

    console.log("");
    console.log("==========================================");
    console.log("📋 [VALIDACIÓN] RESULTADO");
    console.log("==========================================");

    console.log(
        "📌 Campos faltantes:",
        faltantes
    );

    console.log(
        "📌 Cantidad de faltantes:",
        faltantes.length
    );

    console.log(
        "📌 Primer campo faltante:",
        primero ? primero.id : "NINGUNO"
    );


    // --------------------------------------------------
    // ⚠️ FORMULARIO INCOMPLETO
    // --------------------------------------------------

    if (faltantes.length > 0) {

        console.warn(
            "⚠️ [VALIDACIÓN] FORMULARIO INCOMPLETO"
        );

        mostrarAlerta(
            "⚠️ Debes completar todos los campos obligatorios antes de continuar.",
            "warning",
        );


        if (primero) {

            console.log(
                `👉 [VALIDACIÓN] Moviendo al campo: ${primero.id}`
            );

            primero.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });


            setTimeout(() => {

                if (
                    primero.tagName === "INPUT" ||
                    primero.tagName === "TEXTAREA" ||
                    primero.tagName === "SELECT"
                ) {

                    primero.focus();

                    console.log(
                        `🎯 [VALIDACIÓN] Focus colocado en: ${primero.id}`
                    );
                }

            }, 400);
        }


        return false;
    }


    console.log(
        "✅ [VALIDACIÓN] FORMULARIO COMPLETO"
    );

    console.log(
        "🚀 [VALIDACIÓN] Se puede continuar"
    );

    console.log("==========================================");

    return true;
}


// ------------------------------------------------------
// 🔄 VALIDACIÓN EN TIEMPO REAL
// ------------------------------------------------------

// ------------------------------------------------------
// 🔄 VALIDACIÓN EN TIEMPO REAL
// ------------------------------------------------------

function iniciarValidacionTiempoReal() {

    console.log("");
    console.log("==========================================");
    console.log("🔵 [VALIDACIÓN] INICIANDO TIEMPO REAL");
    console.log("==========================================");


    const formulario =
        document.getElementById("formulario");


    // --------------------------------------------------
    // 🔎 COMPROBAR FORMULARIO
    // --------------------------------------------------

    if (!formulario) {

        console.error(
            "❌ [VALIDACIÓN] NO SE ENCONTRÓ #formulario"
        );

        return;
    }


    console.log(
        "🟢 [VALIDACIÓN] #formulario encontrado"
    );


    // --------------------------------------------------
    // 🔹 CONFIGURAR CAMPOS
    // --------------------------------------------------

    campos.forEach((id) => {

        const campo =
            document.getElementById(id);


        if (!campo) {

            console.warn(
                `⚠️ [VALIDACIÓN] No existe #${id}`
            );

            return;
        }


        console.log(
            `🔧 [VALIDACIÓN] Listener configurado: #${id}`
        );

    });


    // --------------------------------------------------
    // 📝 INPUT
    // --------------------------------------------------

    formulario.addEventListener(
        "input",
        (evento) => {

            const campo =
                evento.target;


            if (!campo || !campo.id) {
                return;
            }


            if (!campos.includes(campo.id)) {
                return;
            }


            console.log("");
            console.log(
                `📝 [INPUT] Evento recibido: #${campo.id}`
            );

            console.log(
                `   Valor: "${campo.value}"`
            );


            validarCampo(campo);

        }
    );


    // --------------------------------------------------
    // 🔽 CHANGE
    // --------------------------------------------------

    formulario.addEventListener(
        "change",
        (evento) => {

            const campo =
                evento.target;


            if (!campo || !campo.id) {
                return;
            }


            if (!campos.includes(campo.id)) {
                return;
            }


            console.log("");
            console.log(
                `🔽 [CHANGE] Evento recibido: #${campo.id}`
            );

            console.log(
                `   Valor: "${campo.value}"`
            );

            console.log(
                `   Índice: ${campo.selectedIndex}`
            );

            console.log(
                `   is-invalid ANTES:`,
                campo.classList.contains("is-invalid")
            );


            // ------------------------------------------
            // VALIDAR
            // ------------------------------------------

            const resultado =
                validarCampo(campo);


            console.log(
                `   Resultado: ${resultado}`
            );

            console.log(
                `   is-invalid DESPUÉS:`,
                campo.classList.contains("is-invalid")
            );


            if (!campo.classList.contains("is-invalid")) {

                console.log(
                    `🟢 [CHANGE] #${campo.id} → ROJO ELIMINADO`
                );

            } else {

                console.log(
                    `🔴 [CHANGE] #${campo.id} → CONTINÚA INVALIDO`
                );
            }

        }
    );


    // --------------------------------------------------
    // ✍️ FIRMA EJECUTOR
    // --------------------------------------------------

    const sigEjecutor =
        document.getElementById("sigEjecutor");


    if (sigEjecutor) {

        console.log(
            "🟢 [FIRMA] Configurando listener ejecutor"
        );


        const revisarFirma = () => {

            console.log(
                "✍️ [FIRMA] Cambio detectado: ejecutor"
            );


            setTimeout(() => {

                const resultado =
                    tieneFirma(sigEjecutor);


                console.log(
                    `   Firma ejecutor válida: ${resultado}`
                );


                if (resultado) {

                    sigEjecutor.classList.remove(
                        "border-danger"
                    );

                    console.log(
                        "🟢 [FIRMA] Borde rojo ejecutor eliminado"
                    );

                }

            }, 30);
        };


        sigEjecutor.addEventListener(
            "mouseup",
            revisarFirma
        );

        sigEjecutor.addEventListener(
            "touchend",
            revisarFirma
        );

    } else {

        console.warn(
            "⚠️ [FIRMA] No existe #sigEjecutor"
        );
    }


    // --------------------------------------------------
    // ✍️ FIRMA SUPERVISOR
    // --------------------------------------------------

    const sigSupervisor =
        document.getElementById("sigCoordinador");


    if (sigSupervisor) {

        console.log(
            "🟢 [FIRMA] Configurando listener supervisor"
        );


        const revisarFirma = () => {

            console.log(
                "✍️ [FIRMA] Cambio detectado: supervisor"
            );


            setTimeout(() => {

                const resultado =
                    tieneFirma(sigSupervisor);


                console.log(
                    `   Firma supervisor válida: ${resultado}`
                );


                if (resultado) {

                    sigSupervisor.classList.remove(
                        "border-danger"
                    );

                    console.log(
                        "🟢 [FIRMA] Borde rojo supervisor eliminado"
                    );

                }

            }, 30);
        };


        sigSupervisor.addEventListener(
            "mouseup",
            revisarFirma
        );

        sigSupervisor.addEventListener(
            "touchend",
            revisarFirma
        );

    } else {

        console.warn(
            "⚠️ [FIRMA] No existe #sigCoordinador"
        );
    }


    console.log("");
    console.log(
        "✅ [VALIDACIÓN] Listeners configurados correctamente"
    );

    console.log(
        "=========================================="
    );
}


// ------------------------------------------------------
// 🚀 INICIAR VALIDACIÓN
// ------------------------------------------------------
//
// IMPORTANTE:
// No dependemos únicamente de DOMContentLoaded.
// ------------------------------------------------------

if (document.readyState === "loading") {

    console.log(
        "⏳ [VALIDACIÓN] DOM todavía cargando..."
    );

    document.addEventListener(
        "DOMContentLoaded",
        iniciarValidacionTiempoReal
    );

} else {

    console.log(
        "⚡ [VALIDACIÓN] DOM ya estaba cargado. Inicializando ahora..."
    );

    iniciarValidacionTiempoReal();
}

// ------------------------------------------------------
// 🚨 ALERTA
// ------------------------------------------------------

function mostrarAlerta(
    mensaje,
    tipo = "info"
) {

    console.log(
        `🚨 [ALERTA] ${mensaje}`
    );


    let alerta =
        document.getElementById(
            "alertaFormulario"
        );


    if (!alerta) {

        console.log(
            "🆕 [ALERTA] Creando elemento de alerta"
        );


        alerta =
            document.createElement(
                "div"
            );

        alerta.id =
            "alertaFormulario";

        alerta.className =
            `alert alert-${tipo} text-center position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;

        alerta.style.zIndex =
            "1055";

        document.body.appendChild(
            alerta
        );
    }


    alerta.textContent =
        mensaje;

    alerta.style.display =
        "block";


    setTimeout(() => {

        alerta.style.display =
            "none";

    }, 3000);
}