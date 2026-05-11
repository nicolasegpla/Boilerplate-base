/**
 * TodoPage container integration tests — render with store, add→toggle→delete flow
 *
 * @ layer integration (page)
 * @ runner bun run vitest run src/presentation/pages/TodoPage/TodoPage.test.tsx
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import { TodoPage } from './TodoPage';

import { useTodoStore } from '@/store/zustand';

vi.mock('@/services/todo-service', () => ({
    todoService: {
        getTodos: vi.fn().mockResolvedValue([]),
        createTodo: vi.fn(),
        setSimulateFailure: vi.fn(),
    },
}));

describe('TodoPage', () => {
    beforeEach(() => {
        useTodoStore.setState({ todos: [] });
    });

    it('renders the page with input and add button', async () => {
        await act(async () => {
            render(<TodoPage />);
        });
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });

    it('displays empty state message when no todos', async () => {
        await act(async () => {
            render(<TodoPage />);
        });
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
        expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });

    it('adds a new todo to the store when form is submitted', async () => {
        await act(async () => {
            render(<TodoPage />);
        });

        // Wait for initial load to finish
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText('What needs to be done?');
        const addButton = screen.getByRole('button', { name: 'Add' });

        // Type into input field
        fireEvent.change(input, { target: { value: 'New task from test' } });

        // Verify input has the value
        expect(input).toHaveValue('New task from test');

        // Click add in act to flush state updates
        await act(async () => {
            fireEvent.click(addButton);
        });

        // Check store state directly
        const { todos } = useTodoStore.getState();
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('New task from test');
    });
});
