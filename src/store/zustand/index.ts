/**
 * useTodoStore — Zustand store for Todo list management
 *
 * @ layer store
 */

import { create } from 'zustand';

import type { Todo } from '@/types';

interface TodoState {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],

    addTodo: (todo: Todo) =>
        set((state) => ({
            todos: [...state.todos, todo],
        })),

    toggleTodo: (id: string) =>
        set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        })),

    deleteTodo: (id: string) =>
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
        })),
}));
