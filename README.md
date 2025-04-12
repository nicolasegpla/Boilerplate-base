# 🧱 Rick Project — Frontend Boilerplate Base

This project is a custom base using React + TypeScript designed to be lightweight, modern, and highly productive from minute one.  
It includes a complete setup with ESLint, Prettier, Barrel Exports, VSCode settings, and Sass for global styling.

---

## 🚀 Features

- ✅ React + Vite + TypeScript
- 🎯 Simple and familiar architecture
- 🧼 ESLint with best practice rules
- 💅 Prettier for automatic formatting
- 📦 Barrel Files support
- 💻 Global styles with Sass
- ⚡ VSCode configured for format-on-save

---

## 📁 Final Project Structure

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

## 🔧 ESLint Configuration

ESLint is configured to work with:

- TypeScript
- React
- Hooks
- Import sorting
- Prettier integration

### 📦 Install Dependencies

```bash
bun add -d eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import \
eslint-plugin-prettier eslint-config-prettier
```

### 📄 `eslint.config.js` (ESM format)

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

## 🎨 Prettier Configuration

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

## 💻 VSCode Setup

Create `.vscode/settings.json`:

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

## 🔀 Available Scripts

```bash
bun run lint        # Run ESLint
bun run lint:fix    # Automatically fix issues
bun run format      # Run Prettier on all files
```

---

## 📦 Alias Configuration in `vite.config.ts`

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

### Example Usage:

```ts
import { App } from '@/app';
import { Button } from '@/presentation/components/atoms';
```

---

## 📦 `package.json` — Description & Commands

This project comes with a clean and minimal `package.json` setup ideal for working with React + TS + Sass.

### 📋 General Info

| Field   | Value  |
| ------- | ------ |
| name    | rick   |
| version | 0.0.0  |
| private | true   |
| type    | module |

### 🔧 Available Scripts

| Script     | Description                             |
| ---------- | --------------------------------------- |
| `dev`      | Starts Vite dev server                  |
| `build`    | Builds TypeScript and bundles with Vite |
| `preview`  | Previews production build               |
| `format`   | Runs Prettier formatting                |
| `lint`     | Runs ESLint                             |
| `lint:fix` | Fixes ESLint issues automatically       |

### 📦 Key Dependencies

- **react / react-dom** → React 19 core
- **sass** → SCSS support

### 🧪 Dev Dependencies

- **eslint + plugins** → Linting & rules
- **prettier + integration** → Formatting
- **@vitejs/plugin-react** → React plugin for Vite
- **typescript + types** → Full TS support

### 🛠 Install with Bun (recommended)

```bash
bun install
```

Or with npm/yarn:

```bash
npm install
# or
yarn install
```

---

## 🧪 How to Use This Boilerplate

### ✅ Recommended: GitHub Template

1. Go to the repo on GitHub.
2. Click the green `Use this template` button.
3. Choose a name for your new repository.
4. Clone it to your local machine:

```bash
git clone https://github.com/your-username/new-project.git
cd new-project
bun install # or npm install / yarn install
bun run dev
```

That’s it! You have a fresh, clean project ready to build on.

---

## 🧐 Conclusion

With this base:

- You get a familiar, clean structure
- Autoformat and linting out of the box
- Ready to scale and ship fast

---

> This is your new launchpad for all frontend projects. Let’s build! 🚀
