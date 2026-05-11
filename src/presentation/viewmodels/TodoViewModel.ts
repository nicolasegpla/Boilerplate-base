/**
 * TodoViewModel — pure functions that transform raw store/API data into view-ready format
 *
 * @ layer viewmodel
 */

import type { Todo, TodoViewModel } from '@/types';

/**
 * Transforms a raw Todo entity into a view-ready TodoViewModel.
 * - Trims whitespace from text
 * - Formats createdAt as a locale string
 *
 * @param raw - raw Todo from store or service
 * @returns TodoViewModel ready for rendering
 */
export function transform(raw: Todo): TodoViewModel {
    return {
        id: raw.id,
        text: raw.text.trim(),
        completed: raw.completed,
        createdAt: raw.createdAt.toLocaleDateString(),
    };
}

/**
 * Computes completion statistics from an array of todos.
 *
 * @param todos - array of raw Todo entities
 * @returns object with total, completed, and pending counts
 */
export function getStats(todos: Todo[]): {
    total: number;
    completed: number;
    pending: number;
} {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
}
