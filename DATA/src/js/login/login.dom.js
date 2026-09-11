import { DOM_IDS } from "../config/domIds.js";


// =====================================================
// ELEMENTOS DEL DOM DEL LOGIN
// =====================================================

export function obtenerElementosLogin() {

    const ids = DOM_IDS.auth;

    return {
        loginScreen: document.getElementById(ids.loginScreen),
        appContent: document.getElementById(ids.appContent),
        loginForm: document.getElementById(ids.loginForm),
        loginEmail: document.getElementById(ids.loginEmail),
        loginPassword: document.getElementById(ids.loginPassword),
        loginError: document.getElementById(ids.loginError),
        btnLogin: document.getElementById(ids.btnLogin),
        usuarioActual: document.getElementById(ids.usuarioActual),
        btnCerrarSesion: document.getElementById(ids.btnCerrarSesion),
        modalCerrarSesion: document.getElementById(ids.modalCerrarSesion),
        btnConfirmarCerrarSesion: document.getElementById(
            ids.btnConfirmarCerrarSesion
        )
    };
}


// =====================================================
// CONTROL DE FOCO DEL MODAL CERRAR SESION
// =====================================================

export function configurarFocoModalCerrarSesion(
    modalCerrarSesion,
    btnCerrarSesion
) {

    if (!modalCerrarSesion) {
        return;
    }

    // Cuando Bootstrap termine de cerrar el modal,
    // devolvemos el foco al boton que lo abrio.
    modalCerrarSesion.addEventListener(
        "hidden.bs.modal",
        () => {

            if (btnCerrarSesion) {

                btnCerrarSesion.focus();

            }

        }
    );
}
