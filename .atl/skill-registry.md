# Skill Registry - Boilerplate-base

## Project Standards

- TypeScript strict patterns (const types, flat interfaces, no any)
- React 18 with Zustand 5 for state management
- Vitest for testing with multiple project layers
- SASS for styling (not Tailwind)

## Available Skills

| Skill      | Trigger                                          | Status       | Compact Rules                                  |
| ---------- | ------------------------------------------------ | ------------ | ---------------------------------------------- |
| typescript | Writing TypeScript - types, interfaces, generics | ✅ ACTIVE    | Const types pattern, flat interfaces, no any   |
| react-19   | React components                                 | ✅ ACTIVE    | No useMemo/useCallback needed (React Compiler) |
| zustand-5  | React state                                      | ✅ ACTIVE    | create<StoreInterface>() pattern               |
| tailwind-4 | Tailwind styling                                 | ⚠️ NOT USED  | Project uses SASS                              |
| pytest     | Python tests                                     | ⚠️ NOT USED  | Not a Python project                           |
| nextjs-15  | Next.js routing                                  | ⚠️ NOT USED  | Vite SPA                                       |
| dotnet     | .NET/C#                                          | ⚠️ NOT USED  |
| go-testing | Go tests                                         | ⚠️ NOT USED  |
| playwright | E2E tests                                        | ✅ AVAILABLE | Available for browser testing                  |
| ai-sdk-5   | AI chat features                                 | ✅ AVAILABLE | Vercel AI SDK patterns                         |
| sdd-\*     | SDD workflow                                     | ✅ AVAILABLE | All SDD phases loaded                          |
| storybook-stories | Creating or editing Storybook stories       | ✅ AVAILABLE | Prop-type mapping, level-based rules, mock conventions |

## Available Commands

- `bun run test` - Run all tests (vitest run)
- `bun run test:watch` - Watch mode
- `bun run test:components` - Component tests only
- `bun run test:viewmodels` - ViewModel tests only
- `bun run test:utils` - Utility tests only
- `bun run test:store` - Store tests only
- `bun run test:services` - Service tests only
- `bun run lint` - ESLint
- `bun run lint:fix` - ESLint fix
- `bun run format` - Prettier
- `bun run build` - TypeScript + Vite build
- `bun run dev` - Dev server
