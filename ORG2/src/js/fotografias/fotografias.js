
import { agregarFoto, eliminarFoto as eliminarFotoEstado,
obtenerFotos } from './estadoFotos.js';
import { renderizarFotos } from './renderFotos.js';
import { inicializarModalEliminarFoto } from './modalEliminarFoto.js';
import { fileToDataURL } from './convertirImagen.js';

export function initFotos() {
  const inputFotos = document.getElementById('fotos');
  const inputTomar = document.getElementById('fotosTomar');
  const dropZone = document.getElementById('dropZone');

  if (!inputFotos && !inputTomar && !dropZone) {
    return;
  }

  inicializarModalEliminarFoto(eliminarFoto);

  configurarInput(inputFotos);
  configurarInput(inputTomar);
  configurarDropZone(dropZone);

  renderizarFotos(obtenerFotos());
}

function configurarInput(input) {
  if (!input) return;

  input.addEventListener('change', (event) => {
    procesarFiles(event.target.files);
  });
}

function configurarDropZone(dropZone) {
  if (!dropZone) return;

  configurarEventosDrag(dropZone);

  dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    dropZone.classList.remove('dragover');

    procesarFiles(event.dataTransfer.files);
  });
}

function configurarEventosDrag(dropZone) {
  ['dragenter', 'dragover'].forEach((evento) => {
    dropZone.addEventListener(evento, (event) => {
      event.preventDefault();
      event.stopPropagation();

      dropZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach((evento) => {
    dropZone.addEventListener(evento, (event) => {
      event.preventDefault();
      event.stopPropagation();

      dropZone.classList.remove('dragover');
    });
  });
}

async function procesarFiles(files) {
  const archivos = [...files];

  for (const archivo of archivos) {
    if (!archivo.type.startsWith('image/')) {
      continue;
    }

    const imagen = await fileToDataURL(archivo, 1024);

    agregarFoto(imagen);
  }

  renderizarFotos(obtenerFotos());

  document.dispatchEvent(new CustomEvent('foto:agregada'));
}



function eliminarFoto(indice) {

    const eliminada = eliminarFotoEstado(indice);

    if (!eliminada) {
        return;
    }

    renderizarFotos(obtenerFotos());

    document.dispatchEvent(
        new CustomEvent("foto:eliminada")
    );
}
