/**
 * TodoService unit tests — mock responses and error handling
 *
 * @ layer unit (service)
 * @ runner bun run vitest run src/services/todo-service.test.ts
 */

import { describe, it, expect } from 'vitest';

import { todoService } from './todo-service';

describe('TodoService', () => {
    describe('getTodos', () => {
        it('returns a promise resolving to an array of todos', async () => {
            const result = await todoService.getTodos();
            expect(Array.isArray(result)).toBe(true);
        });

        it('returns todos with required fields (id, text, completed, createdAt)', async () => {
            const todos = await todoService.getTodos();
            todos.forEach((todo) => {
                expect(todo).toHaveProperty('id');
                expect(todo).toHaveProperty('text');
                expect(todo).toHaveProperty('completed');
                expect(todo).toHaveProperty('createdAt');
            });
        });

        it('returns at least one mock todo', async () => {
            const todos = await todoService.getTodos();
            expect(todos.length).toBeGreaterThan(0);
        });
    });

    describe('createTodo', () => {
        it('returns a promise resolving to a todo with the provided text', async () => {
            const result = await todoService.createTodo('Buy groceries');
            expect(result.text).toBe('Buy groceries');
        });

        it('returns a todo with a generated unique id', async () => {
            const result = await todoService.createTodo('New task');
            expect(typeof result.id).toBe('string');
            expect(result.id.length).toBeGreaterThan(0);
        });

        it('returns a todo with completed=false by default', async () => {
            const result = await todoService.createTodo('Another task');
            expect(result.completed).toBe(false);
        });

        it('returns todos with distinct ids on repeated calls', async () => {
            const todo1 = await todoService.createTodo('Task 1');
            const todo2 = await todoService.createTodo('Task 2');
            expect(todo1.id).not.toBe(todo2.id);
        });
    });

    describe('error simulation', () => {
        it('createTodo rejects with an Error when simulateFailure is true', async () => {
            todoService.setSimulateFailure(true);
            await expect(todoService.createTodo('Will fail')).rejects.toThrow(
                'Simulated service failure'
            );
            // Reset
            todoService.setSimulateFailure(false);
        });

        it('getTodos rejects with an Error when simulateFailure is true', async () => {
            todoService.setSimulateFailure(true);
            await expect(todoService.getTodos()).rejects.toThrow('Simulated service failure');
            // Reset
            todoService.setSimulateFailure(false);
        });
    });
});
