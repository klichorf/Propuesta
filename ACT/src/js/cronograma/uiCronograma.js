import {
    crearCronograma,
    obtenerCronograma,
    cambiarEstado,
    eliminarCronograma
} from "./cronograma.js";

// ------------------------------------------------------
// INIT
// ------------------------------------------------------
export async function initCronograma() {

    const contenedor = document.getElementById("tablaCronograma");
    if (!contenedor) return;

    const data = await obtenerCronograma();

    if (!data.length) {
        contenedor.innerHTML = `<p class="text-muted">Sin cronograma</p>`;
        return;
    }

    contenedor.innerHTML = `
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Equipo</th>
                        <th>Área</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                        <tr>
                            <td>${item.equipo}</td>
                            <td>${item.area}</td>
                            <td>${formatear(item.fechaInicio)}</td>
                            <td>${formatear(item.fechaFin)}</td>
                            <td>${badgeEstado(item.estado)}</td>
                            <td>${acciones(item)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

// ------------------------------------------------------
// GUARDAR
// ------------------------------------------------------
export function initEventosCronograma() {

    document.getElementById("btnGuardarCrono")
        ?.addEventListener("click", async () => {

            const data = {
                equipo: document.getElementById("cronoEquipo").value,
                area: document.getElementById("cronoArea").value,
                fechaInicio: document.getElementById("cronoInicio").value,
                fechaFin: document.getElementById("cronoFin").value,
                tipo: document.getElementById("cronoTipo").value,
                criticidad: document.getElementById("cronoCriticidad").value
            };

            const ok = await crearCronograma(data);

            if (ok) {
                alert("✅ Guardado");
                bootstrap.Modal.getInstance(
                    document.getElementById("modalCronograma")
                ).hide();

                await initCronograma();
            }
        });
}

// ------------------------------------------------------
// UI AUX
// ------------------------------------------------------
function badgeEstado(estado) {
    const colores = {
        PENDIENTE: "bg-secondary",
        EN_PROCESO: "bg-warning text-dark",
        FINALIZADO: "bg-success"
    };

    return `<span class="badge ${colores[estado]}">${estado}</span>`;
}

function acciones(item) {

    if (item.estado === "PENDIENTE") {
        return `
            <button class="btn btn-sm btn-warning"
                onclick="iniciar('${item.id}')">▶</button>

            <button class="btn btn-sm btn-danger"
                onclick="eliminarCrono('${item.id}')">🗑</button>
        `;
    }

    if (item.estado === "EN_PROCESO") {
        return `
            <button class="btn btn-sm btn-success"
                onclick="finalizar('${item.id}')">✔</button>
        `;
    }

    return `<span class="text-success">✔</span>`;
}

function formatear(fecha) {
    return new Date(fecha).toLocaleString();
}