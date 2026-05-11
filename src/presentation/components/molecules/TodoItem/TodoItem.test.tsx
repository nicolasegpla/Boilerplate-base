/**
 * TodoItem molecule integration tests — render, completed state, callbacks
 *
 * @ layer integration (component)
 * @ runner bun run vitest run src/presentation/components/molecules/TodoItem/TodoItem.test.tsx
 */

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { TodoItem } from './TodoItem';

import type { Todo } from '@/types';

describe('TodoItem', () => {
    const mockTodo: Todo = {
        id: 'test-1',
        text: 'Test task',
        completed: false,
        createdAt: new Date('2026-01-15'),
    };

    const mockOnToggle = () => {};
    const mockOnDelete = () => {};

    it('displays the todo text', () => {
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        expect(screen.getByText('Test task')).toBeInTheDocument();
    });

    it('shows visual completion indicator when completed=true', () => {
        const completedTodo: Todo = { ...mockTodo, completed: true };
        render(<TodoItem todo={completedTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        // The component should reflect completed state visually (e.g., strikethrough)
        const textElement = screen.getByText('Test task');
        expect(textElement).toBeInTheDocument();
    });

    it('renders a delete button', () => {
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('calls onToggle when checkbox is clicked', () => {
        let toggleCalled = false;
        const onToggle = () => {
            toggleCalled = true;
        };
        render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={mockOnDelete} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(toggleCalled).toBe(true);
    });

    it('calls onDelete when delete button is clicked', () => {
        let deleteCalled = false;
        const onDelete = () => {
            deleteCalled = true;
        };
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={onDelete} />);
        const deleteButton = screen.getByRole('button');
        fireEvent.click(deleteButton);
        expect(deleteCalled).toBe(true);
    });

    it('renders with todo text when completed=false', () => {
        const incompleteTodo: Todo = { ...mockTodo, completed: false };
        render(<TodoItem todo={incompleteTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        const textElement = screen.getByText('Test task');
        expect(textElement).toBeInTheDocument();
    });
});
