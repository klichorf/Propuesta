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
} from "../services/onedrive/loader.js";

import {
    obtenerNombreTecnico
} from "../services/firebase/tecnicos.js";

import {
    configurarFocoModalCerrarSesion,
    obtenerElementosLogin
} from "./login.dom.js";

import {
    limpiarErrorLogin,
    limpiarUsuarioActual,
    mostrarAplicacion,
    mostrarBotonCerrarSesionActivo,
    mostrarBotonCerrarSesionInactivo,
    mostrarErrorLogin,
    mostrarLogin,
    mostrarSaludo,
    prepararBotonConfirmarCierre,
    prepararBotonLogin,
    restaurarBotonConfirmarCierre,
    restaurarBotonLogin
} from "./login.ui.js";


const {
    loginScreen,
    appContent,
    loginForm,
    loginEmail,
    loginPassword,
    loginError,
    btnLogin,
    usuarioActual,
    btnCerrarSesion,
    modalCerrarSesion,
    btnConfirmarCerrarSesion
} = obtenerElementosLogin();


configurarFocoModalCerrarSesion(
    modalCerrarSesion,
    btnCerrarSesion
);


// =====================================================
// INICIAR AUTENTICACION
// =====================================================

async function iniciarAutenticacion() {

    console.log("🔵 [LOGIN] Mostrando loader inicial");
    mostrarLoadercompartir();

    try {

        await configurarPersistencia();

        observarSesion(async (user) => {

            if (user) {

                await manejarUsuarioAutenticado(user);
                return;

            }

            manejarUsuarioNoAutenticado();

        });

    } catch (error) {

        console.error(
            "❌ Error inicializando autenticación:",
            error
        );

    }

}


// =====================================================
// USUARIO AUTENTICADO
// =====================================================

async function manejarUsuarioAutenticado(user) {

    console.log(
        "✅ Usuario autenticado:",
        user.email
    );

    mostrarBotonCerrarSesionActivo(btnCerrarSesion);

const nombreTecnico =
    obtenerNombreTecnico(user.email);



if (usuarioActual) {

    mostrarSaludo(
        nombreTecnico
    );

}

    mostrarAplicacion(
        loginScreen,
        appContent
    );

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

        return;
    }

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


// =====================================================
// USUARIO NO AUTENTICADO
// =====================================================

function manejarUsuarioNoAutenticado() {

    console.log(
        "🔒 Usuario no autenticado"
    );

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

    limpiarUsuarioActual(usuarioActual);
    mostrarBotonCerrarSesionInactivo(btnCerrarSesion);

    mostrarLogin(
        loginScreen,
        appContent
    );

    ocultarLoadercompartir();
}


// =====================================================
// LOGIN
// =====================================================

loginForm?.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        limpiarErrorLogin(loginError);
        prepararBotonLogin(btnLogin);

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

            mostrarErrorLogin(
                loginError,
                error
            );

        } finally {

            restaurarBotonLogin(btnLogin);

        }

    }
);


// =====================================================
// BOTON CERRAR SESION
// =====================================================

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
// CONFIRMAR CERRAR SESION
// =====================================================

btnConfirmarCerrarSesion?.addEventListener(
    "click",
    async () => {

        try {

            prepararBotonConfirmarCierre(
                btnConfirmarCerrarSesion
            );

            if (modalCerrarSesion) {

                const modal =
                    bootstrap.Modal.getInstance(
                        modalCerrarSesion
                    );

                modal?.hide();

            }

            await esperarCierreModal(
                modalCerrarSesion
            );

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

            restaurarBotonConfirmarCierre(
                btnConfirmarCerrarSesion
            );

        }

    }
);


function esperarCierreModal(modalCerrarSesion) {

    return new Promise(resolve => {

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
}


// =====================================================
// OBTENER PRIMER NOMBRE
// =====================================================

function obtenerPrimerNombre(nombreCompleto) {

    if (!nombreCompleto) {
        return "Usuario";
    }

    const nombre =
        nombreCompleto
            .trim()
            .split(/\s+/)[0];

    return (
        nombre.charAt(0).toUpperCase() +
        nombre.slice(1).toLowerCase()
    );

}


// =====================================================
// INICIAR
// =====================================================

iniciarAutenticacion();


export {
    mostrarSaludo
};
