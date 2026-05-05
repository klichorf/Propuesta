export function mostrarReporteIntervenciones({ resumen, totales }) {

    const contenedor = document.getElementById("contenidoReporteIntervenciones");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const tipos = ["CRONOGRAMA", "DIARIA", "PREVENTIVA", "CORRECTIVA", "LOCATIVA"];

    tipos.forEach(tipo => {

        let lista = resumen[tipo] || [];

        // 🔹 ordenar por fecha
        lista = lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        const total = totales[tipo] || { minutos: 0, horas: 0 };

        // ============================
        // 🔥 SOLO PARA CRONOGRAMA
        // ============================
        if (tipo === "CRONOGRAMA") {

            // 🔹 totales por tipo
            const totalPreventivo = (resumen["PREVENTIVA"] || [])
                .reduce((sum, i) => sum + i.minutos, 0);

            const totalCorrectivo = (resumen["CORRECTIVA"] || [])
                .reduce((sum, i) => sum + i.minutos, 0);

            const totalLocativo = (resumen["LOCATIVA"] || [])
                .reduce((sum, i) => sum + i.minutos, 0);

            const totalGeneral = totalPreventivo + totalCorrectivo + totalLocativo;

            // 🔹 cumplimiento (ejemplo: preventivo vs total)
            const cumplimiento = totalGeneral > 0
                ? ((totalPreventivo / totalGeneral) * 100).toFixed(1)
                : 0;

            const html = `
                <div class="mb-4">
                    <h5 class="text-primary fw-bold">
                        ${tipo}
                    </h5>

                    <div class="table-responsive">
                        <table class="table table-bordered text-center">
                            <thead class="table-dark">
                                <tr>
                                    <th>Tipo</th>
                                    <th>Total Min</th>
                                    <th>Total Horas</th>
                                    <th>Cumplimiento %</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-success">
                                    <td>PREVENTIVO</td>
                                    <td>${totalPreventivo}</td>
                                    <td>${(totalPreventivo / 60).toFixed(2)}</td>
                                    <td>${cumplimiento}%</td>
                                </tr>

                                <tr class="table-danger">
                                    <td>CORRECTIVO</td>
                                    <td>${totalCorrectivo}</td>
                                    <td>${(totalCorrectivo / 60).toFixed(2)}</td>
                                    <td>-</td>
                                </tr>

                                <tr class="table-warning">
                                    <td>MEJORA (LOCATIVO)</td>
                                    <td>${totalLocativo}</td>
                                    <td>${(totalLocativo / 60).toFixed(2)}</td>
                                    <td>-</td>
                                </tr>

                                <tr class="table-primary fw-bold">
                                    <td>TOTAL</td>
                                    <td>${totalGeneral}</td>
                                    <td>${(totalGeneral / 60).toFixed(2)}</td>
                                    <td>100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            contenedor.innerHTML += html;

            return; // 🔴 importante: no sigue con tabla normal
        }

        // ============================
        // 🔹 TABLAS NORMALES
        // ============================
        const html = `
            <div class="mb-4">
                <h5 class="text-primary fw-bold">
                    ${tipo} (${lista.length})
                </h5>

                <p class="text-muted">
                    Total: ${total.minutos} min (${total.horas} h)
                </p>

                <div class="table-responsive">
                    <table class="table table-sm table-bordered table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Fecha</th>
                                <th>ID</th>
                                <th>Equipo</th>
                                <th>Área</th>
                                <th>Min</th>
                                <th>Ejecutor</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${lista.map(r => `
                                <tr style="cursor:pointer"
                                    onclick="abrirDetalle('${r.id}')">

                                    <td>${r.fecha}</td>
                                    <td>${r.id || "-"}</td>
                                    <td>${r.equipo}</td>
                                    <td>${r.area}</td>
                                    <td>${Math.round(r.minutos)}</td>
                                    <td>${r.ejecutor}</td>

                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        contenedor.innerHTML += html;
    });

    // 🔹 total general
    const totalRegistros = tipos.reduce(
        (acc, t) => acc + (resumen[t]?.length || 0),
        0
    );

    document.getElementById("totalIntervenciones").textContent = totalRegistros;
}