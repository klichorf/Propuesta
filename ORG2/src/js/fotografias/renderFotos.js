import { solicitarEliminacionFoto } from './modalEliminarFoto.js';

export function renderizarFotos(imagesData) {
  const contenedor = document.getElementById('thumbs');
  const contador = document.getElementById('contadorFotos');

  if (!contenedor) return;

  contenedor.replaceChildren();

  imagesData.forEach((src, indice) => {
    const imagen = crearMiniatura(src, indice);

    contenedor.appendChild(imagen);
  });

  actualizarContador(contador, imagesData.length);
}

function crearMiniatura(src, indice) {
  const imagen = document.createElement('img');

  imagen.src = src;
  imagen.className = 'thumb';
  imagen.alt = `Fotografía ${indice + 1}`;

  imagen.addEventListener('click', () => {
    solicitarEliminacionFoto(indice);
  });

  return imagen;
}

function actualizarContador(contador, cantidad) {
  if (!contador) return;

  contador.textContent = String(cantidad);
}
