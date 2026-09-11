// =========================================
// ACTUALIZAR PROGRESO
// =========================================

export function actualizarProgreso(){

    const campos =
    document.querySelectorAll(
        ".checklist-check"
    );

    let completados = 0;

    campos.forEach(campo => {

        // =================================
        // INPUTS
        // =================================

        if(
            campo.tagName === "INPUT"
        ){

            if(
                campo.value.trim() !== ""
            ){

                completados++;

            }

        }

        // =================================
        // SELECTS
        // =================================

        if(
            campo.tagName === "SELECT"
        ){

            if(
                campo.value !== ""
            ){

                completados++;

            }

        }

    });

    // =====================================
    // TOTAL
    // =====================================

    const porcentaje =
    (
        (
            completados /
            campos.length
        ) * 100
    ).toFixed(0);

    // =====================================
    // TEXTO
    // =====================================

    document.getElementById(
        "txtProgreso"
    ).textContent =
    porcentaje + "%";

    // =====================================
    // BARRA
    // =====================================

    const barra =
    document.getElementById(
        "barraProgreso"
    );

    barra.style.width =
    porcentaje + "%";

    barra.classList.remove(
        "bg-danger",
        "bg-warning",
        "bg-success"
    );

    // =====================================
    // COLORES
    // =====================================

    if(porcentaje < 40){

        barra.classList.add(
            "bg-danger"
        );

    }
    else if(porcentaje < 80){

        barra.classList.add(
            "bg-warning"
        );

    }
    else{

        barra.classList.add(
            "bg-success"
        );

    }

}