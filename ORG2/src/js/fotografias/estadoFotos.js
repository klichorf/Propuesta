let imagesData = [];

export function agregarFoto(imagen) {
  imagesData.push(imagen);
}

export function eliminarFoto(indice) {
  if (indice < 0 || indice >= imagesData.length) {
    return false;
  }

  imagesData.splice(indice, 1);
  return true;
}

export function limpiarFotos() {
  imagesData = [];
}

export function obtenerFotos() {
  return [...imagesData];
}

export function obtenerCantidadFotos() {
  return imagesData.length;
}
