// =====================================================
// UI DEL LOGIN Y SESION
// =====================================================

export function mostrarSaludo(nombre) {

    console.log("👤 Nombre recibido en mostrarSaludo:", nombre);

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

   const partes = String(nombre || "")
    .trim()
    .split(/\s+/);

// Apellido 1 + Apellido 2 + Primer nombre + Segundo nombre
const nombres = partes.length >= 4
    ? partes.slice(2).join(" ")
    : partes.join(" ");

elemento.textContent =
    `${nombres} ${"..."} ${saludo} 👋  `;

    
}


export function mostrarAplicacion(loginScreen, appContent) {

    if (loginScreen) {

        loginScreen.style.display =
            "none";

    }

    if (appContent) {

        appContent.style.display =
            "block";

    }
}


export function mostrarLogin(loginScreen, appContent) {

    if (loginScreen) {

        loginScreen.style.display =
            "flex";

    }

    if (appContent) {

        appContent.style.display =
            "none";

    }
}


export function limpiarUsuarioActual(usuarioActual) {

    if (usuarioActual) {

        usuarioActual.textContent =
            "";

    }
}


export function mostrarBotonCerrarSesionActivo(btnCerrarSesion) {

    if (!btnCerrarSesion) {
        return;
    }

    btnCerrarSesion.disabled = false;

    btnCerrarSesion.innerHTML = `
                       <i class="bi bi-door-open"></i>
                    `;
}


export function mostrarBotonCerrarSesionInactivo(btnCerrarSesion) {

    if (!btnCerrarSesion) {
        return;
    }

    btnCerrarSesion.disabled =
        false;

    btnCerrarSesion.innerHTML = `
                        <i class="bi bi-box-arrow-right"></i>
                    `;
}


export function prepararBotonLogin(btnLogin) {

    btnLogin.disabled =
        true;

    btnLogin.textContent =
        "Verificando...";
}


export function restaurarBotonLogin(btnLogin) {

    btnLogin.disabled =
        false;

    btnLogin.textContent =
        "Iniciar sesión";
}


export function limpiarErrorLogin(loginError) {

    loginError.style.display =
        "none";

    loginError.textContent =
        "";
}


export function mostrarErrorLogin(loginError, error) {

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
}


export function prepararBotonConfirmarCierre(btnConfirmarCerrarSesion) {

    btnConfirmarCerrarSesion.disabled = true;

    btnConfirmarCerrarSesion.innerHTML = `
                <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true">
                </span>
                Cerrando...
            `;
}


export function restaurarBotonConfirmarCierre(btnConfirmarCerrarSesion) {

    btnConfirmarCerrarSesion.disabled = false;

    btnConfirmarCerrarSesion.innerHTML = `
                <i class="bi bi-box-arrow-right me-1"></i>
                Cerrar sesión
            `;
}
