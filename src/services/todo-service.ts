/**
 * TodoService — mock async API layer
 *
 * Simulates CRUD operations with async methods and predictable mock responses.
 * Uses hardcoded data + simulated delay — no real backend required.
 *
 * @ layer service
 */

import type { Todo } from '@/types';

export type TodoCreateInput = string;

const MOCK_TODOS: Todo[] = [
    {
        id: 'mock-1',
        text: 'Learn React with TypeScript',
        completed: true,
        createdAt: new Date('2026-01-01'),
    },
    {
        id: 'mock-2',
        text: 'Set up Vitest testing workspace',
        completed: false,
        createdAt: new Date('2026-01-02'),
    },
    {
        id: 'mock-3',
        text: 'Write TDD tests first',
        completed: false,
        createdAt: new Date('2026-01-03'),
    },
];

/** Simulated network delay in ms */
const SIMULATED_DELAY = 50;

/** Toggle to force service methods to reject */
let simulateFailure = false;

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(): string {
    return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Fetches all todos from the mock store.
 * @returns Promise<Todo[]>
 */
async function getTodos(): Promise<Todo[]> {
    if (simulateFailure) {
        throw new Error('Simulated service failure');
    }
    await delay(SIMULATED_DELAY);
    return [...MOCK_TODOS];
}

/**
 * Creates a new todo with the given text.
 * @param text - the text for the new todo
 * @returns Promise<Todo> — the created todo with generated id
 */
async function createTodo(text: TodoCreateInput): Promise<Todo> {
    if (simulateFailure) {
        throw new Error('Simulated service failure');
    }
    await delay(SIMULATED_DELAY);
    const newTodo: Todo = {
        id: generateId(),
        text,
        completed: false,
        createdAt: new Date(),
    };
    return newTodo;
}

/**
 * Enables or disables simulated failure mode (for testing error paths).
 * @param value — true to force failures, false to恢复正常
 */
function setSimulateFailure(value: boolean): void {
    simulateFailure = value;
}

/**
 * Service object — all methods are async and return Promises.
 * Designed to mirror a real HTTP API contract.
 */
export const todoService = {
    getTodos,
    createTodo,
    setSimulateFailure,
} as const;
