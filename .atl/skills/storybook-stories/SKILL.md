---
name: storybook-stories
description: Trigger: creating or editing Storybook stories. Governs how AI fills in args for component stories — prop-type mapping, level-based rules, and mock conventions.
disable-model-invocation: false
user-invocable: false
license: MIT
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Purpose

This skill tells the AI how to populate `args` in Storybook stories so components render with sensible defaults. The generator creates empty `args: {}` — this skill fills the gap with type-driven defaults.

## Prop-Type Mapping Table

Use this table to map TypeScript prop types to Storybook arg values:

| Prop Type | Default Value | Notes |
|-----------|---------------|-------|
| `string` | `'Example'` | Full string with context |
| `string?` | `'Example'` | Optional strings still get defaults |
| `boolean` | `false` | Usually off by default |
| `boolean?` | `false` | |
| `number` | `0` | |
| `number?` | `0` | |
| `() => void` | `fn()` | Storybook `fn()` mock |
| `(id: string) => void` | `fn()` | Callback props auto-mocked |
| `(e: MouseEvent) => void` | `fn()` | Event handlers auto-mocked |
| `ComplexObject` | `{ id: '1', name: 'Sample' }` | Minimal mock, match actual shape |
| `ComplexObject?` | `{ id: '1', name: 'Sample' }` | Still provide mock |
| `Array<Something>` | `[]` | Empty arrays usually fine |
| `'option1' \| 'option2'` | `'option1'` | First union value as default |

### Complex Object Mocking

For objects with specific required fields, look at the actual component props and create a minimal mock that satisfies the interface:

```typescript
// If component has: interface Todo { id: string; text: string; completed: boolean }
// Story args: { id: '1', text: 'Sample task', completed: false }
```

## Level-Based Rules

### Atoms (buttons, badges, inputs, labels)

- Apply ALL defaults from prop-type table
- Every prop gets a value — atoms are self-contained
- Example: `Button` (atom) → `args: { label: 'Button' }` — only `label` prop exists; no `variant` or `disabled`

### Molecules (cards, list items, form groups)

- Primitives get defaults
- Callbacks mocked with `fn()`
- Complex objects → minimal mocks matching the interface shape
- Example: `TodoItem` → `args: { todo: { id: '1', text: 'Sample', completed: false }, onToggle: fn() }`

### Organisms (lists, forms, complex layouts)

- **Manual stories preferred** — complexity exceeds auto-generation
- If you must generate: provide guidance only
- Document what props need manual setup rather than guessing

## Concrete Examples

### Button (atom)

```typescript
// Component props: interface ButtonProps { label?: string }

export const Primary: Story = {
    args: {
        label: 'Button',
    },
};

export const CustomLabel: Story = {
    args: {
        label: 'Click me',
    },
};

export const LongLabel: Story = {
    args: {
        label: 'This is a very long button label that wraps',
    },
};
```

### TodoItem (molecule)

```typescript
// Component props: interface TodoItemProps { todo: Todo; onToggle: (id: string) => void; onDelete: (id: string) => void }
// interface Todo { id: string; text: string; completed: boolean }

export const Default: Story = {
    args: {
        todo: { id: '1', text: 'Buy groceries', completed: false },
        onToggle: fn(),
        onDelete: fn(),
    },
};

export const Completed: Story = {
    args: {
        todo: { id: '2', text: 'Walk the dog', completed: true },
        onToggle: fn(),
        onDelete: fn(),
    },
};
```

## Workflow

1. Open the component file (`.tsx`) to read its props interface
2. Map each prop to a story value using the prop-type table
3. For complex objects, create a minimal mock matching the interface
4. Fill `args` with the mapped values
5. Use `fn()` from Storybook for all callback props

## What NOT to do

- Do NOT parse TypeScript compiler output — use the table above
- Do NOT generate mock data beyond minimal shapes
- Do NOT auto-generate organism stories — mark as manual
- Do NOT assume all props are required — use sensible defaults for optionals