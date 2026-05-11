# Add a Feature Guide

## 🚨 Regla Obligatoria: Generador + Story Funcional

**Antes de agregar una feature, creá los componentes con el generador.**

```bash
# Para moléculas y organismos nuevos, usá:
bun run generate Foo presentation/components/molecules
bun run generate Foo presentation/components/organisms
```

El generador crea la carpeta completa con `.tsx`, `.scss`, `.stories.tsx`, `.test.tsx` y barrel export.
**No crees componentes a mano** — el generador asegura que todos sigan el mismo patrón.

**Completá la story siempre:** el generador deja `args: {}` vacío. Usá la skill `storybook-stories` para mapear props → args sensatos.

---

## Overview

Cada feature sigue esta arquitectura en capas:

```
store → service → viewmodel → components → page → routes → tests
```

Cada capa es independently testable. La página actúa como **container** que conecta el store y service con los **organisms** y **molecules** presentacionales.

---

## Step 1: Types

---

## Step 1: Types

Define your entity types in `src/types/index.ts`.

```ts
// src/types/index.ts
export interface MyEntity {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export interface MyEntityCreateInput {
    text: string;
}
```

---

## Step 2: Constants

Add route paths and storage keys in `src/constants/index.ts`.

```ts
// src/constants/index.ts
export const ROUTES = {
    HOME: '/',
    MY_FEATURE: '/my-feature',
    UNKNOWN: '*',
} as const;

export const STORAGE_KEYS = {
    MY_FEATURE_STORAGE: 'boilerplate-my-feature',
} as const;
```

---

## Step 3: Service (Mock)

Create a service that simulates async CRUD operations.

**File:** `src/services/my-entity-service.ts`

```ts
export interface MyEntityService {
    getAll(): Promise<MyEntity[]>;
    create(input: MyEntityCreateInput): Promise<MyEntity>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const myEntityService: MyEntityService = {
    async getAll() {
        await delay(100);
        return [];
    },
    async create(input) {
        await delay(100);
        return { id: crypto.randomUUID(), ...input, completed: false, createdAt: new Date() };
    },
};
```

**Test file:** `src/services/my-entity-service.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { myEntityService } from './my-entity-service';

describe('myEntityService', () => {
    it('create returns a new entity with generated id', async () => {
        const result = await myEntityService.create({ text: 'Test' });
        expect(result.id).toBeDefined();
        expect(result.text).toBe('Test');
        expect(result.completed).toBe(false);
    });
});
```

---

## Step 4: Zustand Store

Create a store slice in `src/store/zustand/`.

**File:** `src/store/zustand/useMyEntityStore.ts`

```ts
import { create } from 'zustand';
import type { MyEntity } from '@/types';

interface MyEntityState {
    entities: MyEntity[];
    addEntity: (entity: MyEntity) => void;
    toggleEntity: (id: string) => void;
    deleteEntity: (id: string) => void;
}

export const useMyEntityStore = create<MyEntityState>((set) => ({
    entities: [],
    addEntity: (entity) => set((state) => ({ entities: [...state.entities, entity] })),
    toggleEntity: (id) =>
        set((state) => ({
            entities: state.entities.map((e) =>
                e.id === id ? { ...e, completed: !e.completed } : e
            ),
        })),
    deleteEntity: (id) =>
        set((state) => ({
            entities: state.entities.filter((e) => e.id !== id),
        })),
}));
```

**Test file:** `src/store/zustand/useMyEntityStore.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { useMyEntityStore } from './useMyEntityStore';

describe('useMyEntityStore', () => {
    it('addEntity appends to the list', () => {
        const { addEntity } = useMyEntityStore.getState();
        addEntity({ id: '1', text: 'Test', completed: false, createdAt: new Date() });
        expect(useMyEntityStore.getState().entities).toHaveLength(1);
    });
});
```

---

## Step 5: ViewModel

ViewModels are pure functions that transform raw store data into view-ready format.

**File:** `src/presentation/viewmodels/myEntityViewModel.ts`

```ts
import type { MyEntity, MyEntityViewModel } from '@/types';

export function transformEntity(entity: MyEntity): MyEntityViewModel {
    return {
        ...entity,
        createdAt: entity.createdAt.toISOString(),
    };
}

export function getEntityStats(entities: MyEntity[]) {
    return {
        total: entities.length,
        completed: entities.filter((e) => e.completed).length,
        pending: entities.filter((e) => !e.completed).length,
    };
}
```

**Test file:** `src/presentation/viewmodels/myEntityViewModel.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { transformEntity, getEntityStats } from './myEntityViewModel';

describe('myEntityViewModel', () => {
    it('transformEntity formats createdAt as ISO string', () => {
        const raw = { id: '1', text: 'Test', completed: false, createdAt: new Date('2024-01-01') };
        const result = transformEntity(raw);
        expect(result.createdAt).toBe('2024-01-01T00:00:00.000Z');
    });

    it('getEntityStats computes counts correctly', () => {
        const entities = [
            { id: '1', text: 'A', completed: true, createdAt: new Date() },
            { id: '2', text: 'B', completed: false, createdAt: new Date() },
        ];
        const stats = getEntityStats(entities);
        expect(stats.total).toBe(2);
        expect(stats.completed).toBe(1);
        expect(stats.pending).toBe(1);
    });
});
```

---

## Step 6: Components (Atomic Design)

### ⚠️ Usá el Generador + Completá la Story

```bash
# Para moléculas
bun run generate MyEntityItem presentation/components/molecules

# Para organismos
bun run generate MyEntityList presentation/components/organisms
```

El generador crea la carpeta completa con `.tsx`, `.scss`, `.stories.tsx`, `.test.tsx` + barrel export.
**Luego completá la story:** el `args: {}` queda vacío. Consultá la skill `storybook-stories` para llenarlo con args sensatos.

### Actualizar el Stylesheet

Editá el `.scss` generado para agregar tus estilos:

```scss
// src/presentation/components/molecules/MyEntityItem/my-entity-item.scss
.completed {
    text-decoration: line-through;
}
```

### Actualizar el Componente

Editá el `.tsx` generado con tu lógica:

```tsx
// src/presentation/components/molecules/MyEntityItem/MyEntityItem.tsx
import type { MyEntityViewModel } from '@/types';
import { Button } from '@/presentation/components/atoms';

interface Props {
    entity: MyEntityViewModel;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const MyEntityItem = ({ entity, onToggle, onDelete }: Props) => {
    return (
        <div className={entity.completed ? 'completed' : ''}>
            <span onClick={() => onToggle(entity.id)}>{entity.text}</span>
            <Button onClick={() => onDelete(entity.id)}>Delete</Button>
        </div>
    );
};
```

El barrel `src/presentation/components/molecules/index.ts` ya se actualiza solo cuando usás el generador.

---

## Step 7: Page (Container)

**File:** `src/presentation/pages/MyEntityPage/MyEntityPage.tsx`

```tsx
import { useState } from 'react';
import { useMyEntityStore } from '@/store/zustand/useMyEntityStore';
import { myEntityService } from '@/services/my-entity-service';
import { transformEntity } from '@/presentation/viewmodels/myEntityViewModel';
import { MyEntityList } from '@/presentation/components/organisms';

export function MyEntityPage() {
    const [input, setInput] = useState('');
    const { entities, addEntity, toggleEntity, deleteEntity } = useMyEntityStore();

    const handleAdd = async () => {
        const created = await myEntityService.create({ text: input });
        addEntity(created);
        setInput('');
    };

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <Button onClick={handleAdd}>Add</Button>
            <MyEntityList
                entities={entities.map(transformEntity)}
                onToggle={toggleEntity}
                onDelete={deleteEntity}
            />
        </div>
    );
}
```

---

## Step 8: Routes

**File:** `src/presentation/routes/AppRouter.tsx`

```tsx
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { MyEntityPage } from '@/presentation/pages/MyEntityPage/MyEntityPage';

export function AppRouter() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<MyEntityPage />} />
            <Route path="*" element={<MyEntityPage />} />
        </Routes>
    );
}
```

**Update `src/main.tsx`** to wrap with BrowserRouter:

```tsx
import { BrowserRouter } from 'react-router-dom';
// ...
<BrowserRouter>
    <App />
</BrowserRouter>;
```

**Update `src/app/App.tsx`** to render the router:

```tsx
import { AppRouter } from '@/presentation/routes/AppRouter';

function App() {
    return <AppRouter />;
}
```

---

## Step 9: Add Styles to `_variables.scss`

If you add new design tokens, update `src/presentation/styles/_variables.scss`:

```scss
$color-secondary: #10b981;
$spacing-xl: 2rem;
```

---

## Step 10: Run Tests

```bash
bun run test:services
bun run test:store
bun run test:viewmodels
```

Each layer is independently testable. The page integration test verifies the full flow.

---

## Pattern Summary

| Layer     | File location                                   | Pattern                            |
| --------- | ----------------------------------------------- | ---------------------------------- |
| Types     | `src/types/index.ts`                            | Interfaces exported together       |
| Constants | `src/constants/index.ts`                        | `ROUTES`, `STORAGE_KEYS`           |
| Service   | `src/services/my-service.ts`                    | Async mock, delay, typed           |
| Store     | `src/store/zustand/useMyStore.ts`               | `create<State>()((set) => ...)`    |
| ViewModel | `src/presentation/viewmodels/myVM.ts`           | Pure functions, transform/getStats |
| Molecule  | `src/presentation/components/molecules/MyItem/` | ⚠️ Generated — then edit           |
| Organism  | `src/presentation/components/organisms/MyList/` | ⚠️ Generated — then edit           |
| Page      | `src/presentation/pages/MyPage/`                | Container: store + service + VM    |
| Routes    | `src/presentation/routes/AppRouter.tsx`         | `<Routes>` + `<Route>` elements    |

## ⚡ Quick Commands

```bash
bun install                    # Install dependencies
bun run dev                    # Start dev server
bun run test                       # Run all tests
bun run generate Foo presentation/components/molecules  # Generate component (OBLIGATORY)
bun run lint                   # Lint
bun run format                 # Format
```

---

> Reference: Todo List implementation (PR 2) — full working example of all layers.
