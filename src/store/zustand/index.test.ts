/**
 * useTodoStore unit tests — add, toggle, delete, init state
 *
 * @ layer unit (store)
 * @ runner bun run vitest run src/store/zustand/index.test.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';

import { useTodoStore } from './index';

describe('useTodoStore', () => {
    // Fresh store before each test
    beforeEach(() => {
        useTodoStore.setState({ todos: [] });
    });

    describe('initial state', () => {
        it('todos is an empty array', () => {
            const { todos } = useTodoStore.getState();
            expect(todos).toEqual([]);
        });

        it('does not throw when accessed', () => {
            expect(() => useTodoStore.getState()).not.toThrow();
        });
    });

    describe('addTodo', () => {
        it('adds a todo with correct shape to the store', () => {
            const { addTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Buy milk', completed: false, createdAt: new Date() });

            const { todos } = useTodoStore.getState();
            expect(todos).toHaveLength(1);
            expect(todos[0]).toMatchObject({
                id: '1',
                text: 'Buy milk',
                completed: false,
            });
        });

        it('adds multiple todos', () => {
            const { addTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Task 1', completed: false, createdAt: new Date() });
            addTodo({ id: '2', text: 'Task 2', completed: true, createdAt: new Date() });

            const { todos } = useTodoStore.getState();
            expect(todos).toHaveLength(2);
        });

        it('preserves existing todos when adding new one', () => {
            const { addTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'First', completed: false, createdAt: new Date() });
            addTodo({ id: '2', text: 'Second', completed: false, createdAt: new Date() });

            const { todos } = useTodoStore.getState();
            expect(todos[0].text).toBe('First');
            expect(todos[1].text).toBe('Second');
        });
    });

    describe('toggleTodo', () => {
        it('toggles completed=true to false', () => {
            const { addTodo, toggleTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Task', completed: false, createdAt: new Date() });
            toggleTodo('1');

            expect(useTodoStore.getState().todos[0].completed).toBe(true);
        });

        it('toggles completed=false to true', () => {
            const { addTodo, toggleTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Task', completed: true, createdAt: new Date() });
            toggleTodo('1');

            expect(useTodoStore.getState().todos[0].completed).toBe(false);
        });

        it('leaves other todos unchanged', () => {
            const { addTodo, toggleTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Task 1', completed: false, createdAt: new Date() });
            addTodo({ id: '2', text: 'Task 2', completed: false, createdAt: new Date() });
            toggleTodo('1');

            const { todos } = useTodoStore.getState();
            expect(todos[0].completed).toBe(true);
            expect(todos[1].completed).toBe(false);
        });

        it('does nothing when id does not exist', () => {
            const { addTodo, toggleTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Task 1', completed: false, createdAt: new Date() });
            toggleTodo('non-existent-id');

            const { todos } = useTodoStore.getState();
            expect(todos[0].completed).toBe(false);
        });
    });

    describe('deleteTodo', () => {
        it('removes the todo with given id', () => {
            const { addTodo, deleteTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Task 1', completed: false, createdAt: new Date() });
            addTodo({ id: '2', text: 'Task 2', completed: false, createdAt: new Date() });
            deleteTodo('1');

            const { todos } = useTodoStore.getState();
            expect(todos).toHaveLength(1);
            expect(todos[0].id).toBe('2');
        });

        it('reduces count from 3 to 2', () => {
            const { addTodo, deleteTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Task 1', completed: false, createdAt: new Date() });
            addTodo({ id: '2', text: 'Task 2', completed: false, createdAt: new Date() });
            addTodo({ id: '3', text: 'Task 3', completed: false, createdAt: new Date() });
            deleteTodo('2');

            const { todos } = useTodoStore.getState();
            expect(todos).toHaveLength(2);
        });

        it('does nothing when id does not exist', () => {
            const { addTodo, deleteTodo } = useTodoStore.getState();
            addTodo({ id: '1', text: 'Task 1', completed: false, createdAt: new Date() });
            deleteTodo('non-existent-id');

            const { todos } = useTodoStore.getState();
            expect(todos).toHaveLength(1);
        });
    });
});
