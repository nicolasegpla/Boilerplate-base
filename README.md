# 🧱 Boilerplate Base — Frontend

> Your production-ready React + TypeScript launchpad. Clone, install, run, build.

---

## ⚡ 5-Second Quick Start

```bash
git clone <tu-repo> && cd <tu-proyecto>
bun install
bun run dev
```

**That's it.** App runs at `http://localhost:5173`.

---

## 🚨 Regla Obligatoria: Componentes con el Generador + Story Funcional

**Todo componente nuevo se crea con el generador y DEBE tener una story funcional.**

```bash
# Generar un componente átomo
bun run generate Foo presentation/components/atoms
```

Esto crea la carpeta completa: `.tsx` + `.scss` + `.stories.tsx` + `.test.tsx` + barrel export.

**La story es mínima (base mecánico) — completala con la skill `storybook-stories`:**

1. Abrí la `.stories.tsx` generada
2. Consultá la skill `storybook-stories` para mapear props → args
3. Llená `args: {}` con valores sensatos según el tipo de cada prop

> Si editás componentes a mano sin el generador, no siguen los patrones del boilerplate.

---

## 🛠️ Quick Reference

| Necesidad          | Comando                                                                              |
| ------------------ | ------------------------------------------------------------------------------------ |
| Instalar           | `bun install`                                                                        |
| Dev server         | `bun run dev`                                                                        |
| Tests              | `bun run test`                                                                       |
| Generar componente | `bun run generate NombreCarpeta presentation/components/atoms\|molecules\|organisms` |
| Agregar feature    | → [Guide](docs/ADD_FEATURE.md)                                                       |
| Completar story     | → skill `storybook-stories` para args sensatos                                        |
| Lint               | `bun run lint`                                                                       |
| Format             | `bun run format`                                                                     |
| Build              | `bun run build`                                                                      |
| Storybook          | `bun run storybook`                                                                  |

---

## ✨ Stack

- ⚛️ React + Vite + TypeScript
- 🧼 ESLint + Prettier
- 🛆 Barrel exports
- 💅 Sass (design tokens in `_variables.scss`)
- 📚 Storybook
- 🔋 Zustand 5 (state)
- 🌐 React Router DOM
- 🧪 Vitest (layered testing: store, viewmodels, components, services, utils)

---

## 🧪 Testing

Run all tests:

```bash
bun run test
```

Run tests by layer:

```bash
bun run test:store     # Zustand store tests
bun run test:viewmodels # ViewModel tests
bun run test:components # Component tests
bun run test:services   # Service tests
bun run test:utils      # Utility function tests
```

---

## 🎨 Styling with Sass

Design tokens live in `src/presentation/styles/_variables.scss`:

```scss
@use '@/presentation/styles/variables' as *;

.my-component {
    background: $color-primary;
    padding: $spacing-md;
}
```

---

## 🧱 Adding a New Feature

Read [`docs/ADD_FEATURE.md`](docs/ADD_FEATURE.md) — covers every layer: store → service → viewmodel → components → page → routes → tests.

**Required:** Create components with `bun run generate` (see rule above).

---

## 📂 Project Structure

```
src/
├── app/                    # App shell
├── constants/              # Route paths, storage keys
├── presentation/
│   ├── components/         # atoms → molecules → organisms
│   ├── pages/              # Page containers
│   ├── routes/             # Router config
│   ├── styles/             # _variables, _mixins, _base, _reset
│   └── viewmodels/         # Pure transform functions
├── services/              # API/service layer
├── store/zustand/         # Zustand slices
├── types/                 # Shared TypeScript interfaces
└── utils/                 # Pure utilities
```

---

## 📦 Available Scripts

| Script       | Description              |
| ------------ | ------------------------ |
| `dev`        | Start Vite dev server    |
| `build`      | Production build         |
| `preview`    | Preview production build |
| `lint`       | ESLint                   |
| `lint:fix`   | Auto-fix ESLint          |
| `format`     | Prettier                 |
| `storybook`  | Launch Storybook         |
| `generate`   | Scaffold new component   |
| `test`       | Run all tests            |
| `test:watch` | Watch mode               |

---

> Next: [Add a Feature →](docs/ADD_FEATURE.md)
