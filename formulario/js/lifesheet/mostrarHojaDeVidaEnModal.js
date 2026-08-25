export function mostrarHojaDeVidaEnModal(registros, info) {

    const modal = new bootstrap.Modal(document.getElementById("modalHojaVida"));

    // 📌 Datos generales del equipo
    document.getElementById("datosEquipo").innerHTML = `
        <h5 class="fw-bold">${info.equipo}</h5>
        <p class="mb-1"><strong>Planta:</strong> ${info.planta}</p>
        <p class="mb-1"><strong>Área:</strong> ${info.area}</p>
        <p class="mb-1"><strong>Total mantenimientos:</strong> ${registros.length}</p>
        <hr>
    `;

    // 📌 Historial
    const contenedor = document.getElementById("historialMantenimientos");
    contenedor.innerHTML = "";

    if (registros.length === 0) {
        contenedor.innerHTML = `<p class="text-danger fw-semibold">No hay registros para este equipo.</p>`;
        modal.show();
        return;
    }

    registros
        .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio)) // cronológico
        .forEach((r, i) => {

            contenedor.innerHTML += `
                <div class="card mb-3 shadow-sm">
                    <div class="card-body">
                        
                        <h6 class="fw-bold text-primary">#${i + 1} — ${r.tipoMantenimiento}</h6>

                        <p class="mb-1"><strong>Fecha inicio:</strong> ${r.fechaInicio}</p>
                        <p class="mb-1"><strong>Fecha fin:</strong> ${r.fechaFin}</p>
                        <p class="mb-1"><strong>Técnico:</strong> ${r.ejecutor}</p>

                        <p class="mb-1"><strong>Daños encontrados:</strong><br> ${r.danos ?? "—"}</p>
                        <p class="mb-1"><strong>Trabajo realizado:</strong><br> ${r.trabajo ?? "—"}</p>
                        <p class="mb-1"><strong>Repuestos:</strong> ${r.repuestos ?? "—"}</p>
                        <p class="mb-1"><strong>Herramientas:</strong> ${r.herramientas ?? "—"}</p>

                        ${r.rutaArchivo ? `
                            <a href="${r.rutaArchivo}" class="btn btn-sm btn-outline-secondary mt-2" target="_blank">
                                📄 Ver PDF
                            </a>` : ""}
                    </div>
                </div>
            `;
        });

    modal.show();
}
