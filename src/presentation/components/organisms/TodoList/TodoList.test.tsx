/**
 * TodoList organism integration tests — render items, empty state
 *
 * @ layer integration (component)
 * @ runner bun run vitest run src/presentation/components/organisms/TodoList/TodoList.test.tsx
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { TodoList } from './TodoList';

import type { Todo } from '@/types';

describe('TodoList', () => {
    const mockOnToggle = () => {};
    const mockOnDelete = () => {};

    it('renders all todo items from the array', () => {
        const todos: Todo[] = [
            { id: '1', text: 'First task', completed: false, createdAt: new Date() },
            { id: '2', text: 'Second task', completed: true, createdAt: new Date() },
            { id: '3', text: 'Third task', completed: false, createdAt: new Date() },
        ];
        render(<TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        expect(screen.getByText('First task')).toBeInTheDocument();
        expect(screen.getByText('Second task')).toBeInTheDocument();
        expect(screen.getByText('Third task')).toBeInTheDocument();
    });

    it('renders exactly 3 TodoItem components for a 3-item array', () => {
        const todos: Todo[] = [
            { id: '1', text: 'A', completed: false, createdAt: new Date() },
            { id: '2', text: 'B', completed: false, createdAt: new Date() },
            { id: '3', text: 'C', completed: false, createdAt: new Date() },
        ];
        render(<TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        // Each item has a checkbox + text + button
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(3);
    });

    it('displays empty state message when todos is empty', () => {
        render(<TodoList todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });

    it('renders correct number of items with varying completed states', () => {
        const todos: Todo[] = [
            { id: '1', text: 'Done task', completed: true, createdAt: new Date() },
            { id: '2', text: 'Pending task', completed: false, createdAt: new Date() },
        ];
        render(<TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(2);
        expect(screen.getByText('Done task')).toBeInTheDocument();
        expect(screen.getByText('Pending task')).toBeInTheDocument();
    });
});
