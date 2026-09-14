// =====================================================
// ESTADO DEL INFORME
// Mantiene la navegación desacoplada de la limpieza de datos.
// =====================================================

let informeModificado = false;

export function initEstadoInforme() {
  const formulario = document.getElementById('formulario');
  if (!formulario || formulario.dataset.estadoInformeConfigurado === 'true') {
    return;
  }

  formulario.dataset.estadoInformeConfigurado = 'true';

  const marcar = (event) => {
    // Los cambios provocados por la propia aplicación también forman
    // parte del estado real del informe y no deben borrar información.
    if (event?.target?.id === 'codigo') {
      informeModificado = true;
      return;
    }
    informeModificado = true;
  };

  formulario.addEventListener('input', marcar);
  formulario.addEventListener('change', marcar);

  document.addEventListener('foto:agregada', () => {
    informeModificado = true;
  });

  document.addEventListener('firma:cambiada', () => {
    informeModificado = true;
  });
}

export function marcarInformeModificado() {
  informeModificado = true;
}

export function marcarInformeLimpio() {
  informeModificado = false;
}

export function hayCambiosInforme() {
  return informeModificado;
}

export function hayDatosPosterioresAlActivo() {
  const ids = [
    'tipoMantenimiento',
    'fechaInicio',
    'fechaFin',
    'danos',
    'trabajo',
    'repuestos',
    'cedulaOperador',
    'passwordOperador',
  ];

  let hayDatos = false;

  ids.forEach((id) => {
    const element = document.getElementById(id);
    const value = element?.value?.trim() ?? '';

    console.log(`[${id}] =>`, JSON.stringify(value));

    if (value !== '') {
      hayDatos = true;
    }
  });

  console.log('RESULTADO FINAL:', hayDatos);

  return hayDatos;
}
