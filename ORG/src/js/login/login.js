import {
    iniciarSesion,
    observarSesion,
    configurarPersistencia,
    cerrarSesion
} from "../services/firebase/auth.js";

import {
    limpiarFormulario
} from "../botones/datosFormulario.js";

import {
    mostrarLoadercompartir,
    ocultarLoadercompartir
} from "../../js/services/onedrive/loader.js";

import {
    obtenerNombreTecnico
} from "../services/firebase/tecnicos.js";


// =====================================================
// ELEMENTOS DEL DOM
// =====================================================

const loginScreen =
    document.getElementById("loginScreen");

const appContent =
    document.getElementById("appContent");

const loginForm =
    document.getElementById("loginForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const loginError =
    document.getElementById("loginError");

const btnLogin =
    document.getElementById("btnLogin");

const usuarioActual =
    document.getElementById("usuarioActual");

const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");


// =====================================================
// MODAL CERRAR SESIÓN
// =====================================================

const modalCerrarSesion =
    document.getElementById("modalCerrarSesion");

const btnConfirmarCerrarSesion =
    document.getElementById("btnConfirmarCerrarSesion");


// =====================================================
// CONTROL DE FOCO DEL MODAL CERRAR SESIÓN
// =====================================================

if (modalCerrarSesion) {




    // Cuando Bootstrap termine de cerrar el modal,
    // devolvemos el foco al botón que lo abrió.

    modalCerrarSesion.addEventListener(
        "hidden.bs.modal",
        () => {

            if (btnCerrarSesion) {

                btnCerrarSesion.focus();

            }

        }
    );

}


// =====================================================
// INICIAR AUTENTICACIÓN
// =====================================================

async function iniciarAutenticacion() {

    mostrarLoadercompartir();

    try {

        await configurarPersistencia();

        observarSesion(async (user) => {

            // =================================================
            // USUARIO AUTENTICADO
            // =================================================

            if (user) {

                console.log(
                    "✅ Usuario autenticado:",
                    user.email
                );


                // ---------------------------------------------
                // RESTAURAR BOTÓN CERRAR SESIÓN
                // ---------------------------------------------

                if (btnCerrarSesion) {

                    btnCerrarSesion.disabled = false;

                    btnCerrarSesion.innerHTML = `
                       <i class="bi bi-door-open"></i>
                    `;

                }


                // ---------------------------------------------
                // MOSTRAR USUARIO
                // ---------------------------------------------
                const nombreTecnico =
                obtenerNombreTecnico(user.email);
                if (usuarioActual) {

                    mostrarSaludo(
                nombreTecnico || user.email
                    );
                }


                // ---------------------------------------------
                // OCULTAR LOGIN
                // ---------------------------------------------

                if (loginScreen) {

                    loginScreen.style.display =
                        "none";

                }


                // ---------------------------------------------
                // MOSTRAR APLICACIÓN
                // ---------------------------------------------

                if (appContent) {

                    appContent.style.display =
                        "block";

                }


                // =================================================
                // CARGAR APLICACIÓN SOLO UNA VEZ
                // =================================================

                if (!window.__APP_CARGADA__) {

                    window.__APP_CARGADA__ = true;

                    try {

                        const {
                            inicializarAplicacion
                        } = await import("../main.js");


                        await inicializarAplicacion(
                            user.email
                        );


                        console.log(
                            "✅ Aplicación cargada correctamente"
                        );

                        ocultarLoadercompartir();

                    } catch (error) {

                        console.error(
                            "❌ Error cargando la aplicación:",
                            error
                        );

                        ocultarLoadercompartir();

                    }

                }

                // =================================================
                // LA APLICACIÓN YA ESTÁ CARGADA
                // SOLO ACTUALIZAMOS EL TÉCNICO
                // =================================================

                else {

                    try {

                        const {
                            actualizarTecnico
                        } = await import("../main.js");


                        if (
                            typeof actualizarTecnico ===
                            "function"
                        ) {

                            actualizarTecnico(
                                user.email
                            );


                            console.log(
                                "🔄 Técnico actualizado por cambio de cuenta"
                            );

                        }

                    } catch (error) {

                        console.error(
                            "❌ Error actualizando técnico:",
                            error
                        );

                    }

                }

            }

            // =================================================
            // USUARIO NO AUTENTICADO
            // =================================================

            else {

                console.log(
                    "🔒 Usuario no autenticado"
                );


                // ---------------------------------------------
                // LIMPIAR FORMULARIO
                // ---------------------------------------------

                try {

                    limpiarFormulario();

                    console.log(
                        "🧹 Formulario limpiado"
                    );

                } catch (error) {

                    console.error(
                        "❌ Error limpiando formulario:",
                        error
                    );

                }


                // ---------------------------------------------
                // LIMPIAR USUARIO
                // ---------------------------------------------

                if (usuarioActual) {

                    usuarioActual.textContent =
                        "";

                }


                // ---------------------------------------------
                // RESTAURAR BOTÓN
                // ---------------------------------------------

                if (btnCerrarSesion) {

                    btnCerrarSesion.disabled =
                        false;

                    btnCerrarSesion.innerHTML = `
                        <i class="bi bi-box-arrow-right"></i>
                    `;

                }


                // ---------------------------------------------
                // MOSTRAR LOGIN
                // ---------------------------------------------

                if (loginScreen) {

                    loginScreen.style.display =
                        "flex";

                }


                // ---------------------------------------------
                // OCULTAR APLICACIÓN
                // ---------------------------------------------

                if (appContent) {

                    appContent.style.display =
                        "none";

                }


                // ---------------------------------------------
                // OCULTAR LOADER
                // ---------------------------------------------

                ocultarLoadercompartir();

            }

        });

    } catch (error) {

        console.error(
            "❌ Error inicializando autenticación:",
            error
        );

    }

}


// =====================================================
// OBTENER SALUDO SEGÚN LA HORA
// =====================================================

function obtenerSaludo() {

    const hora = new Date().getHours();

    if (hora >= 5 && hora < 12) {
        return "Buenos días";
    }

    if (hora >= 12 && hora < 19) {
        return "Buenas tardes";
    }

    return "Buenas noches";
}


// =====================================================
// LOGIN
// =====================================================

loginForm?.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        loginError.style.display =
            "none";

        loginError.textContent =
            "";


        btnLogin.disabled =
            true;

        btnLogin.textContent =
            "Verificando...";


        try {

            await iniciarSesion(
                loginEmail.value.trim(),
                loginPassword.value
            );


            console.log(
                "✅ Inicio de sesión correcto"
            );

        } catch (error) {

            console.error(
                "❌ Error de login:",
                error
            );


            loginError.style.display =
                "block";


            switch (error.code) {

                case "auth/invalid-credential":

                    loginError.textContent =
                        "Correo o contraseña incorrectos.";

                    break;


                case "auth/user-disabled":

                    loginError.textContent =
                        "Este usuario está deshabilitado.";

                    break;


                case "auth/too-many-requests":

                    loginError.textContent =
                        "Demasiados intentos. Intenta nuevamente más tarde.";

                    break;


                default:

                    loginError.textContent =
                        "No fue posible iniciar sesión.";

            }

        } finally {

            btnLogin.disabled =
                false;

            btnLogin.textContent =
                "Iniciar sesión";

        }

    }
);


// =====================================================
// BOTÓN CERRAR SESIÓN
// =====================================================

// IMPORTANTE:
// Este botón YA NO cierra directamente.
// Primero abre el modal.

btnCerrarSesion?.addEventListener(
    "click",
    () => {

        if (!modalCerrarSesion) {

            console.error(
                "❌ No existe el modal #modalCerrarSesion"
            );

            return;

        }


        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalCerrarSesion
            );


        modal.show();

    }
);


// =====================================================
// CONFIRMAR CERRAR SESIÓN
// =====================================================

btnConfirmarCerrarSesion?.addEventListener(
    "click",
    async () => {

        try {

            // ---------------------------------------------
            // DESHABILITAR BOTÓN
            // ---------------------------------------------

            btnConfirmarCerrarSesion.disabled = true;

            btnConfirmarCerrarSesion.innerHTML = `
                <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true">
                </span>
                Cerrando...
            `;


            // ---------------------------------------------
            // CERRAR MODAL PRIMERO
            // ---------------------------------------------

            if (modalCerrarSesion) {

                const modal =
                    bootstrap.Modal.getInstance(
                        modalCerrarSesion
                    );

                modal?.hide();

            }


            // ---------------------------------------------
            // ESPERAR A QUE BOOTSTRAP TERMINE DE CERRAR
            // ---------------------------------------------

            await new Promise(resolve => {

                if (!modalCerrarSesion) {

                    resolve();
                    return;

                }

                modalCerrarSesion.addEventListener(
                    "hidden.bs.modal",
                    resolve,
                    { once: true }
                );

            });


            // ---------------------------------------------
            // CERRAR SESIÓN EN FIREBASE
            // ---------------------------------------------

            await cerrarSesion();

            console.log(
                "🔒 Sesión cerrada"
            );


        } catch (error) {

            console.error(
                "❌ Error cerrando sesión:",
                error
            );

        } finally {

            // ---------------------------------------------
            // RESTAURAR BOTÓN
            // ---------------------------------------------

            btnConfirmarCerrarSesion.disabled = false;

            btnConfirmarCerrarSesion.innerHTML = `
                <i class="bi bi-box-arrow-right me-1"></i>
                Cerrar sesión
            `;

        }

    }
);


// =====================================================
// INICIAR
// =====================================================

iniciarAutenticacion();


// =====================================================
// MOSTRAR SALUDO SEGÚN LA HORA
// =====================================================

export function mostrarSaludo(nombre) {

    const elemento =
        document.getElementById("usuarioActual");

    if (!elemento) return;

    const hora =
        new Date().getHours();

    let saludo;

    if (hora >= 5 && hora < 12) {

        saludo = "Buenos días";

    } else if (hora >= 12 && hora < 18) {

        saludo = "Buenas tardes";

    } else {

        saludo = "Buenas noches";

    }

    const primerNombre =
        String(nombre || "")
            .trim()
            .split(" ")[0];

    elemento.textContent =
        `👋 ${saludo} ,  ${primerNombre}`;
}