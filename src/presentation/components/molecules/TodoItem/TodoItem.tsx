/**
 * TodoItem molecule — displays a single todo with toggle and delete actions
 *
 * @ layer molecule (presentational)
 * @ props todo - Todo entity
 * @ props onToggle - callback fired when checkbox is clicked
 * @ props onDelete - callback fired when delete button is clicked
 */

import type { Todo } from '@/types';
import './todo-item.scss';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
            <input
                type="checkbox"
                className="todo-item__checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <span className="todo-item__text">{todo.text}</span>
            <button
                type="button"
                className="todo-item__delete"
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete "${todo.text}"`}
            >
                Delete
            </button>
        </li>
    );
}
