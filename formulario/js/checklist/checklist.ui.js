// =========================================
// RENDER CHECKLIST
// =========================================

export function renderChecklist(
    contenedor,
    checklist
){

    contenedor.innerHTML = "";

    checklist.forEach(equipo => {

        contenedor.innerHTML += `

        <div class="accordion-item border rounded mb-3">

            <!-- HEADER -->

            <h2 class="accordion-header">

                <button
                    class="accordion-button collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#equipo_${equipo.id}">

                    ${equipo.equipo}

                </button>

            </h2>

            <!-- BODY -->

            <div
                id="equipo_${equipo.id}"
                class="accordion-collapse collapse">

                <div class="accordion-body">

                    ${equipo.items.map((item, index) => {

                        return `

                        <div class="border rounded p-3 mb-3 bg-light-subtle">

                            <!-- LABEL -->

                            <label class="fw-semibold mb-2 d-block">

                                ${item.label}

                            </label>

                            ${renderCampo(
                                item,
                                equipo.id,
                                index
                            )}

                            <!-- OBSERVACIÓN -->

                            <textarea
                                class="form-control mt-2"
                                rows="2"
                                placeholder="Observación"></textarea>

                        </div>

                        `;

                    }).join("")}

                </div>

            </div>

        </div>

        `;

    });

}

// =========================================
// RENDER CAMPOS
// =========================================

function renderCampo(
    item
){

    // =====================================
    // NUMBER
    // =====================================

    if(item.tipo === "number"){

        return `

        <div class="input-group">

            <input
                type="number"
                class="form-control checklist-check"
                placeholder="${item.placeholder || ''}">

            <span class="input-group-text">

                ${item.unidad || ''}

            </span>

        </div>

        `;
    }

    // =====================================
    // SELECT
    // =====================================

    if(item.tipo === "select"){

        return `

        <select
            class="form-select checklist-check">

            <option value="">
                Seleccione
            </option>

            ${item.opciones.map(op => `

                <option value="${op}">
                    ${op}
                </option>

            `).join("")}

        </select>

        `;
    }

    return "";

}