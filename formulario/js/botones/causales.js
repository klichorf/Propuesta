import { guardarMantenimiento } from "../connection_db/firebaseOEE.js";
import { mostrarToast } from "../toast.js";
let causalActual = null;

/* -------------------------
   FILTRAR CAUSALES
-------------------------- */
function filtrar() {
  const texto = document.getElementById("buscar").value.toLowerCase();
  document.querySelectorAll(".item").forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(texto)
      ? ""
      : "none";
  });
}

window.filtrar = filtrar;

/* -------------------------
   SELECCIONAR CAUSAL
-------------------------- */
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", () => {
    const descripcion = item.querySelector(".descripcion").innerText;
    const codigo = item.querySelector(".codigo").innerText;

    causalActual = { descripcion, codigo };

    document.getElementById("causalSeleccionada").innerText =
      `${descripcion} (${codigo})`;

    document.getElementById("modal").style.display = "flex";
  });
});

/* -------------------------
   MODAL
-------------------------- */
function cerrarModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("fecha").value = "";
  document.getElementById("duracion").value = "";
}

window.cerrarModal = cerrarModal;

/* -------------------------
   GUARDAR EN FIREBASE
-------------------------- */
async function guardarCausal() {
  const fecha = document.getElementById("fecha").value;
  const duracion = document.getElementById("duracion").value;

  if (!fecha || !duracion) {
    mostrarToast("⚠️ Completa fecha y duración", "warning");
    return;
  }

  if (!causalActual) {
    mostrarToast("❌ No hay causal seleccionada", "danger");
    return;
  }

  const mantenimiento = document.getElementById("mantenimiento").value;

if (!mantenimiento) {
  mostrarToast("⚠️ Selecciona un equipo", "warning");
  return;
}

const data = {
  causal: causalActual,
  fecha,
  duracionMinutos: Number(duracion),
  mantenimiento, // 👈 M1–M5
  creadaEn: new Date()
};


  try {
    const id = await guardarMantenimiento(data);

    mostrarToast("✅ Causal guardada correctamente", "success");
    cerrarModal();

  } catch (error) {
    console.error(error);
    mostrarToast("❌ Error al guardar la causal", "danger");
  }
}




window.guardarCausal = guardarCausal;
