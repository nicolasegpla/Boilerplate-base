/**
 * TodoList organism — renders a list of TodoItem molecules + empty state
 *
 * @ layer organism (presentational)
 * @ props todos - array of Todo entities
 * @ props onToggle - callback forwarded to each TodoItem
 * @ props onDelete - callback forwarded to each TodoItem
 */

import { TodoItem } from '@/presentation/components/molecules';
import './todo-list.scss';

interface TodoListProps {
    todos: import('@/types').Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
    if (todos.length === 0) {
        return <p className="todo-list__empty">No todos yet. Add one above!</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>
    );
}
