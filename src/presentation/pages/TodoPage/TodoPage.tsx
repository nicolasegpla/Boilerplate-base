/**
 * TodoPage — container that wires Zustand store + TodoService + TodoViewModel
 *
 * @ layer page (container)
 * @ connects to store (useTodoStore)
 * @ connects to service (todoService)
 * @ uses TodoViewModel for data transformation
 */

import React, { useState, useEffect } from 'react';

import { useTodoStore } from '@/store/zustand';
import { todoService } from '@/services/todo-service';
import { getStats } from '@/presentation/viewmodels/TodoViewModel';
import { TodoList } from '@/presentation/components/organisms';
import './todo-page.scss';

export function TodoPage() {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Load initial todos from service on mount
    useEffect(() => {
        setIsLoading(true);
        todoService
            .getTodos()
            .then((rawTodos) => {
                rawTodos.forEach((raw) => {
                    addTodo(raw); // Store holds raw Todo entities with Date
                });
            })
            .finally(() => setIsLoading(false));
    }, [addTodo]);

    const stats = getStats(todos);

    function handleAdd() {
        const text = inputValue.trim();
        if (!text) return;
        // Optimistic: add directly to store (service call optional for demo)
        addTodo({
            id: `todo-${Date.now()}`,
            text,
            completed: false,
            createdAt: new Date(),
        });
        setInputValue('');
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleAdd();
        }
    }

    return (
        <section className="todo-page">
            <h1 className="todo-page__title">Todo List</h1>

            <div className="todo-page__stats">
                {stats.completed}/{stats.total} completed
            </div>

            <div className="todo-page__form">
                <input
                    type="text"
                    className="todo-page__input"
                    placeholder="What needs to be done?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="New todo text"
                />
                <button
                    type="button"
                    className="todo-page__add-btn"
                    onClick={handleAdd}
                    disabled={isLoading}
                >
                    Add
                </button>
            </div>

            {isLoading ? (
                <p className="todo-page__loading">Loading...</p>
            ) : (
                <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
            )}
        </section>
    );
}
