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
        html += `<h4 class="mt-3 text-primary">PLANTA: ${planta}</h4>`;

        Object.keys(reporte[planta]).forEach(area => {
            html += `<h5 class="ms-3 text-success">Área: ${area}</h5>`;

            Object.keys(reporte[planta][area]).forEach(equipo => {

                // 🟦 NOMBRE DEL EQUIPO + BOTÓN HOJA DE VIDA
                html += `
                    <div class="ms-4 mb-2 d-flex align-items-center justify-content-between">
                        <div><strong>Equipo:</strong> ${equipo}</div>

                        <!-- 📄 BOTÓN PARA ABRIR HOJA DE VIDA -->
                        <button 
                            class="btn btn-outline-primary btn-sm"
                            data-planta="${planta}"
                            data-area="${area}"
                            data-equipo="${equipo}"
                            onclick="abrirHojaDeVida(this)">
                            📄 Hoja de Vida
                        </button>
                    </div>
                `;

                // 🟦 REGISTROS DEL EQUIPO
                reporte[planta][area][equipo].forEach(reg => {
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
            });
        });
    });

    contenedor.innerHTML = html;

    console.log("%c✅ HTML del reporte generado y asignado al contenedor", "color: green; font-weight: bold;");
    console.groupEnd();
}
