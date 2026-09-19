let indicePendiente = null;

export function inicializarModalEliminarFoto(onConfirmar) {
  const botonConfirmar = document.getElementById('btnConfirmarEliminarFoto');

  if (!botonConfirmar) return;

  botonConfirmar.addEventListener('click', () => {
    if (indicePendiente === null) {
      return;
    }

    onConfirmar(indicePendiente);

    indicePendiente = null;

    cerrarModal();
  });
}

export function solicitarEliminacionFoto(indice) {
  indicePendiente = indice;

  const modal = obtenerModal();

  if (!modal) return;

  modal.show();
}

function obtenerModal() {
  const elemento = document.getElementById('modalEliminarFoto');

  if (!elemento || !window.bootstrap) {
    return null;
  }

  return bootstrap.Modal.getOrCreateInstance(elemento);
}

function cerrarModal() {
  const modal = obtenerModal();

  modal?.hide();
}
