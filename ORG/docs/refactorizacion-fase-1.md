# Refactorizacion fase 1

Este documento registra el inventario inicial para refactorizar el proyecto de forma incremental, sin cambiar el comportamiento funcional.

## Estado actual

- `index.html` contiene la estructura principal de la aplicacion y tiene 1035 lineas.
- Los estilos ya estan separados en `src/styles`.
- La logica JavaScript ya usa modulos ES en `src/js`.
- El punto de entrada cargado por HTML es `src/js/app.js`.
- `src/js/app.js` delega en `src/js/login/login.js` para conservar el flujo actual.
- `src/js/login/login.js` inicializa autenticacion y carga dinamicamente `src/js/main.js` despues de detectar usuario autenticado.
- `src/js/main.js` inicializa las funcionalidades principales de la aplicacion.

## Bloques HTML principales

- Login: `#loginScreen`, `#loginForm`, `#loginEmail`, `#loginPassword`, `#loginError`, `#btnLogin`.
- Contenedor de aplicacion: `#appContent`.
- Encabezado: `.header`.
- Formulario de mantenimiento: `#formulario`.
- Reportes y graficos: `#modalGrafico`, `#modalReportePlantas`, `#modalReporteIntervenciones`.
- Hoja de vida: `#modalHojaVida`.
- QR: `#btnQR`, `#QR-modal`, `#QR`, `#closeQR`.
- Selectores de activo: `#codigo`, `#planta`, `#area`, `#equipo`.
- Fechas y tiempo: `#fechaInicio`, `#fechaFin`, `#tiempo`.
- Repuestos: `#categoriaRepuesto`, `#buscadorRepuestos`, `#sugerencias`, `#repuestos`.
- Fotografias: `#fotosTomar`, `#fotos`, `#dropZone`, `#thumbs`.
- Firmas: `#sigEjecutor`, `#sigCoordinador`, `#btnLimpiarFirmaEjecutor`, `#btnLimpiarFirmaCoordinador`.
- Operador: `#cedulaOperador`, `#passwordOperador`, `#btnValidarOperador`, `#estadoOperador`.
- Loaders: `#loaderOverlay`, `#loaderOverlay2`.
- Cierre de sesion: `#modalCerrarSesion`, `#btnCerrarSesion`, `#btnConfirmarCerrarSesion`.

## Dependencias globales

- Bootstrap se usa desde `window.bootstrap`.
- Chart.js se usa desde `window.Chart`.
- jsPDF se usa desde `window.jspdf`.
- Html5Qrcode se usa desde `window.Html5Qrcode`.
- Firebase se importa desde URLs remotas de Google en varios modulos.

## Funciones expuestas en `window`

Estas funciones se mantienen como contrato publico mientras existan botones o HTML dinamico que dependan de ellas:

- `window.iniciar`
- `window.finalizar`
- `window.eliminarCrono`
- `window.abrirDetalle`
- `window.abrirHojaDeVida`
- `window.filtrar`
- `window.cerrarModal`
- `window.guardarCausal`

## Riesgos detectados

- `loaderOverlay2` estaba duplicado en `index.html`. Se dejo un unico nodo para que `document.getElementById` sea determinista.
- `login.js` lee muchos nodos del DOM al momento de cargar el modulo. Si el HTML se renderiza mas tarde, el login puede fallar.
- `main.js` inicializa muchas funcionalidades en paralelo con `Promise.all`; algunos modulos podrian depender del DOM o de datos que otro modulo prepara.
- Hay un archivo antiguo `src/js/validarFormulario.js` y otro activo `src/js/validación/validarFormulario.js`. Antes de borrar o mover hay que confirmar referencias.
- `firmas.js` es un modulo muy grande y sensible porque mezcla canvas, operador, tecnico, eventos tactiles, archivos y limpieza.
- Varios modulos manipulan el DOM directamente por ID. Cambiar IDs, clases o jerarquia puede romper funcionalidades.

## Cambios estructurales aplicados

- `index.html` ahora carga `src/js/app.js` como punto de entrada.
- `src/js/app.js` delega en `src/js/login/login.js` sin alterar el flujo de autenticacion.
- `src/js/config/domIds.js` documenta los IDs publicos usados por la aplicacion.
- Se elimino el duplicado de `#loaderOverlay2`.
- Se movieron estilos inline menores a CSS:
  - `.qr-section-row` y `.qr-modal-panel` en `src/styles/formulario.css`.
  - `.repuestos-search` y `#sugerencias` en `src/styles/componentes.css`.
- Se limpiaron atributos HTML malformados en labels de filtros y tiempo.

## Orden seguro de refactorizacion

1. Crear una capa de bootstrap sin cambiar el punto de entrada funcional.
2. Inventariar y normalizar contratos DOM publicos.
3. Extraer estilos inline menores a CSS manteniendo selectores actuales.
4. Separar login en piezas internas sin cambiar IDs ni flujo de autenticacion.
5. Dividir `firmas.js` por responsabilidades.
6. Reorganizar reportes, charts y formulario bajo carpetas de feature.
7. Extraer HTML grande a templates solo cuando el orden de inicializacion este estabilizado.

## Reglas para las siguientes fases

- No renombrar IDs ni clases usados por JavaScript sin buscar todas sus referencias.
- No eliminar funciones globales hasta reemplazar sus consumidores.
- No introducir bundler ni dependencias nuevas.
- Verificar en navegador despues de cada fase.
