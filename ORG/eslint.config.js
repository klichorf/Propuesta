import js from '@eslint/js';

export default [
  // Archivos y carpetas que ESLint no debe revisar
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },

  // Configuración para JavaScript del proyecto
  {
    files: ['**/*.js'],

    ...js.configs.recommended,

    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        Image: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
      },
    },

    rules: {
      // Desactivamos esta regla porque genera demasiados
      // falsos positivos en el código existente del proyecto.
      'no-useless-assignment': 'off',
    },
  },
];
