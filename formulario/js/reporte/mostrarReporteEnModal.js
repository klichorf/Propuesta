// ------------------------------------------------------
// MOSTRAR REPORTE EN EL MODAL
// ------------------------------------------------------
export function mostrarReporteEnModal(reporte) {
    console.group("%c➡️ INICIANDO mostrarReporteEnModal()", "color: blue; font-weight: bold;");

    const contenedor = document.getElementById("contenidoReporte");
    if (!contenedor) {
        console.error("%c❌ Falta el div #contenidoReporte en tu HTML", "color: red; font-weight: bold;");
        console.groupEnd();
        return;
    }

    console.log("%c🔹 Generando HTML del reporte...", "color: purple;");
    let html = "";

    Object.keys(reporte).forEach(planta => {
        console.groupCollapsed(`%c🏭 Planta: ${planta}`, "color: green; font-weight: bold;");
        html += `<h4 class="mt-3 text-primary">PLANTA: ${planta}</h4>`;

        Object.keys(reporte[planta]).forEach(area => {
            console.groupCollapsed(`%c🟢 Área: ${area}`, "color: teal;");
            html += `<h5 class="ms-3 text-success">Área: ${area}</h5>`;

            Object.keys(reporte[planta][area]).forEach(equipo => {
                console.groupCollapsed(`%c⚙️ Equipo: ${equipo}`, "color: orange;");
                html += `<div class="ms-4 mb-2"><strong>Equipo:</strong> ${equipo}</div>`;

                reporte[planta][area][equipo].forEach(reg => {
                    console.log("%c🔹 Registro:", "color: navy;", reg);

                    html += `
                        <div class="ms-5 mb-3 border-start ps-3">
                            <div><b>Tipo:</b> ${reg.tipoMantenimiento}</div>
                            <div><b>Trabajo:</b> ${reg.trabajo}</div>
                            <div><b>Repuestos:</b> ${reg.repuestos}</div>
                            <div><b>Herramientas:</b> ${reg.herramientas}</div>
                            <div><b>Ejecutor:</b> ${reg.ejecutor}</div>
                            <div><b>Inicio:</b> ${reg.fechaInicio}</div>
                            <div><b>Fin:</b> ${reg.fechaFin}</div>
                        </div>
                    `;
                });

                console.groupEnd(); // Equipo
            });

            console.groupEnd(); // Área
        });

        console.groupEnd(); // Planta
    });

    contenedor.innerHTML = html;

    console.log("%c✅ HTML del reporte generado y asignado al contenedor", "color: green; font-weight: bold;");
    console.groupEnd();
}
