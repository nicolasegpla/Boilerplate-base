/**
 * TodoViewModel unit tests — text trimming, date formatting, completion stats
 *
 * @ layer unit (viewmodel)
 * @ runner bun run vitest run src/presentation/viewmodels/TodoViewModel.test.ts
 */

import { describe, it, expect } from 'vitest';

import { transform, getStats } from './TodoViewModel';

import type { Todo } from '@/types';

describe('TodoViewModel', () => {
    describe('transform', () => {
        it('trims whitespace from todo text', () => {
            const raw: Todo = {
                id: '1',
                text: '  Trimmed  ',
                completed: false,
                createdAt: new Date('2026-01-15'),
            };
            const result = transform(raw);
            expect(result.text).toBe('Trimmed');
        });

        it('formats createdAt as a locale date string', () => {
            const raw: Todo = {
                id: '1',
                text: 'Test',
                completed: false,
                createdAt: new Date('2026-01-15'),
            };
            const result = transform(raw);
            expect(typeof result.createdAt).toBe('string');
            expect(result.createdAt.length).toBeGreaterThan(0);
        });

        it('preserves id and completed fields', () => {
            const raw: Todo = {
                id: 'custom-id',
                text: 'Task',
                completed: true,
                createdAt: new Date('2026-01-15'),
            };
            const result = transform(raw);
            expect(result.id).toBe('custom-id');
            expect(result.completed).toBe(true);
        });

        it('handles empty string text', () => {
            const raw: Todo = {
                id: '1',
                text: '   ',
                completed: false,
                createdAt: new Date('2026-01-15'),
            };
            const result = transform(raw);
            expect(result.text).toBe('');
        });

        it('preserves non-empty text as-is', () => {
            const raw: Todo = {
                id: '1',
                text: 'Normal text',
                completed: false,
                createdAt: new Date('2026-01-15'),
            };
            const result = transform(raw);
            expect(result.text).toBe('Normal text');
        });
    });

    describe('getStats', () => {
        it('returns correct total count', () => {
            const todos: Todo[] = [
                { id: '1', text: 'A', completed: false, createdAt: new Date() },
                { id: '2', text: 'B', completed: true, createdAt: new Date() },
                { id: '3', text: 'C', completed: false, createdAt: new Date() },
            ];
            const stats = getStats(todos);
            expect(stats.total).toBe(3);
        });

        it('returns correct completed count', () => {
            const todos: Todo[] = [
                { id: '1', text: 'A', completed: false, createdAt: new Date() },
                { id: '2', text: 'B', completed: true, createdAt: new Date() },
                { id: '3', text: 'C', completed: true, createdAt: new Date() },
            ];
            const stats = getStats(todos);
            expect(stats.completed).toBe(2);
        });

        it('returns correct pending count', () => {
            const todos: Todo[] = [
                { id: '1', text: 'A', completed: false, createdAt: new Date() },
                { id: '2', text: 'B', completed: true, createdAt: new Date() },
            ];
            const stats = getStats(todos);
            expect(stats.pending).toBe(1);
        });

        it('handles empty array', () => {
            const stats = getStats([]);
            expect(stats.total).toBe(0);
            expect(stats.completed).toBe(0);
            expect(stats.pending).toBe(0);
        });

        it('handles all-completed array', () => {
            const todos: Todo[] = [
                { id: '1', text: 'A', completed: true, createdAt: new Date() },
                { id: '2', text: 'B', completed: true, createdAt: new Date() },
            ];
            const stats = getStats(todos);
            expect(stats.total).toBe(2);
            expect(stats.completed).toBe(2);
            expect(stats.pending).toBe(0);
        });

        it('handles all-pending array', () => {
            const todos: Todo[] = [
                { id: '1', text: 'A', completed: false, createdAt: new Date() },
                { id: '2', text: 'B', completed: false, createdAt: new Date() },
            ];
            const stats = getStats(todos);
            expect(stats.total).toBe(2);
            expect(stats.completed).toBe(0);
            expect(stats.pending).toBe(2);
        });
    });
});
