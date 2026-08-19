# Formulario de Mantenimiento

Aplicacion web estatica para registrar mantenimientos, generar reportes, consultar cronogramas y trabajar con listas de chequeo.

## Estructura del proyecto

```text
.
├── index.html                 # Pagina principal
├── pages/                     # Paginas secundarias
├── src/
│   ├── assets/images/         # Imagenes, logos y favicons
│   ├── js/                    # Codigo JavaScript modular
│   │   ├── botones/           # Eventos y acciones de botones
│   │   ├── charts/            # Graficos y loaders de reportes visuales
│   │   ├── checklist/         # Modulos de checklist
│   │   ├── config/            # Configuracion compartida
│   │   ├── cronograma/        # Logica y UI del cronograma
│   │   ├── lifesheet/         # Hoja de vida de equipos
│   │   ├── reporte/           # Reportes, filtros y transformaciones
│   │   └── services/          # Integraciones externas
│   │       ├── firebase/
│   │       └── onedrive/
│   └── styles/                # Hojas de estilo propias
├── vendor/                    # Librerias de terceros descargadas
└── archive/                   # Archivos antiguos o no productivos
```

## Convenciones

- Mantener `index.html` como entrada principal.
- Crear nuevas pantallas dentro de `pages/`.
- Guardar imagenes en `src/assets/images/`.
- Poner integraciones externas en `src/js/services/`.
- Evitar rutas quemadas a imagenes dentro de JS; usar `src/js/config/assetPaths.js`.
- Mantener `vendor/` solo para librerias externas, sin codigo propio del proyecto.
- Mantener `archive/` para historicos, pruebas o archivos que no hacen parte del flujo principal.

## Ejecucion local

Este proyecto no requiere compilacion, pero debe abrirse desde un servidor local porque usa modulos JavaScript (`type="module"`).

Opciones recomendadas:

- Ejecutar `iniciar-servidor.bat` y abrir `http://127.0.0.1:5502/index.html`.
- Usar la extension Live Server de VS Code sobre `index.html`.

No abrir `index.html` con doble clic desde `file:///`, porque el navegador bloquea los imports JavaScript por politica CORS.
