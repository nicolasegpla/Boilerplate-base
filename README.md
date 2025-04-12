# 🧱 Rick Project — Boilerplate Frontend Base

Este proyecto es una base personalizada en React + TypeScript diseñada para ser ligera, moderna y altamente productiva desde el minuto uno.  
Incluye un setup completo con ESLint, Prettier, Barrel Exports, VSCode configurado, y uso de Sass para estilos globales.

---

## 🚀 Características

- ✅ React + Vite + TypeScript
- 🎯 Arquitectura simple y familiar
- 🧼 ESLint con reglas de buenas prácticas
- 💅 Prettier para formateo automático
- 📆 Soporte para Barrel Files
- 💻 Estilos globales con Sass
- ⚡ VSCode configurado para autoformatear al guardar

---

## 📁 Estructura Final del Proyecto

```
.
├── README.md
├── bun.lock
├── eslint.config.js
├── estructura.txt
├── estructuraCompleta.txt
├── index.html
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── app
│   │   ├── App.scss
│   │   ├── App.tsx
│   │   └── index.ts
│   ├── assets
│   │   └── react.svg
│   ├── constants
│   │   └── index.ts
│   ├── index.scss
│   ├── main.tsx
│   ├── presentation
│   │   ├── components
│   │   │   ├── atoms
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── molecules
│   │   │   │   └── index.ts
│   │   │   └── organisms
│   │   │       └── index.ts
│   │   ├── context
│   │   ├── layouts
│   │   │   └── index.ts
│   │   ├── pages
│   │   ├── routes
│   │   ├── styles
│   │   │   ├── _base.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _reset.scss
│   │   │   ├── _variables.scss
│   │   │   └── index.scss
│   │   └── viewmodels
│   │       └── index.ts
│   ├── services
│   │   └── api
│   │       └── index.ts
│   ├── store
│   │   ├── context
│   │   │   └── index.ts
│   │   └── zustand
│   │       └── index.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── index.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🔧 Configuración ESLint

ESLint está configurado para trabajar con:

- TypeScript
- React
- Hooks
- Import sorting
- Integración con Prettier

### 📦 Instalación de dependencias

```bash
bun add -d eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import \
eslint-plugin-prettier eslint-config-prettier
```

### 📄 eslint.config.js (formato ESM)

```js
// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    prettier,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
            prettier: eslintPluginPrettier,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'import/order': [
                'warn',
                {
                    groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                    'newlines-between': 'always',
                },
            ],
            'prettier/prettier': 'error',
            'no-console': 'warn',
            'no-unused-vars': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
```

---

## 🎨 Configuración Prettier

### 📄 `.prettierrc`

```json
{
    "tabWidth": 4,
    "useTabs": false,
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "arrowParens": "always",
    "endOfLine": "auto",
    "printWidth": 100
}
```

### 📄 `.prettierignore`

```
node_modules
dist
build
coverage
*.lock
```

---

## 💻 VSCode configurado

Crea este archivo en `.vscode/settings.json`:

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false,
    "[typescript]": {
        "editor.tabSize": 4
    },
    "[typescriptreact]": {
        "editor.tabSize": 4
    },
    "prettier.tabWidth": 4,
    "prettier.useTabs": false
}
```

---

## 🔀 Scripts disponibles

```bash
bun run lint        # Corre ESLint
bun run lint:fix    # Arregla automáticamente lo que puede
bun run format      # Corre Prettier en todos los archivos
```

---

## 📦 Alias configurado en `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
```

Usás imports así:

```ts
import { App } from '@/app';
import { Button } from '@/presentation/components/atoms';
```

---

## 📦 package.json — Descripción y comandos

Este proyecto tiene una configuración de `package.json` simple pero poderosa para empezar a trabajar con React + TypeScript + Sass y mantener el código limpio.

### 📋 Información general

| Campo   | Valor  |
| ------- | ------ |
| name    | rick   |
| version | 0.0.0  |
| private | true   |
| type    | module |

### 🔧 Scripts disponibles

| Script     | Descripción                                                   |
| ---------- | ------------------------------------------------------------- |
| `dev`      | Inicia el servidor de desarrollo con Vite                     |
| `build`    | Compila TypeScript y genera el build con Vite                 |
| `preview`  | Previsualiza el build generado                                |
| `format`   | Corre Prettier sobre todos los archivos                       |
| `lint`     | Ejecuta ESLint para verificar errores y warnings              |
| `lint:fix` | Ejecuta ESLint y corrige automáticamente los errores posibles |

### 📦 Dependencias destacadas

- **react / react-dom** → Core de la aplicación con React 19
- **sass** → Soporte para SCSS y variables de estilo

### 🧪 DevDependencies destacadas

- **eslint + plugins** → Linting de código moderno y best practices
- **prettier + eslint-plugin-prettier** → Formateo automático con integración
- **@vitejs/plugin-react** → Plugin de Vite para React
- **typescript + @types/** → Tipado y soporte completo de TS

### 🛠 Instalación con Bun (recomendado)

```bash
bun install
```

Si usás npm o yarn:

```bash
npm install
# o
yarn install
```

---

## 🧐 Conclusión

Con esta base:

- Tenés una estructura clara y familiar
- Código limpio desde el minuto uno
- Autoformato y linting integrados
- Preparado para escalar y trabajar cómodo

---

> Esta es tu nueva línea de salida para todos tus proyectos frontend. ¡A partir de acá, a construir sin fricción! 🚀
