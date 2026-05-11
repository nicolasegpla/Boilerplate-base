/**
 * Core type definitions for the Boilerplate Base project.
 *
 * @ Todo — entity interface used across store, service, and viewmodel layers
 * @ TodoCreateInput — input shape for creating a new todo (used by service/VM)
 * @ TodoViewModel — processed todo data ready for rendering
 */

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoCreateInput = string;

export interface TodoViewModel {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
}
