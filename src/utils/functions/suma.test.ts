import { describe, it, expect } from 'vitest';

import { suma } from './suma';

describe('suma', () => {
    it('should add two positive numbers correctly', () => {
        const result = suma({ a: 2, b: 3 });
        expect(result).toBe(5);
    });

    it('should add two negative numbers correctly', () => {
        const result = suma({ a: -2, b: -3 });
        expect(result).toBe(-5);
    });

    it('should add positive and negative numbers correctly', () => {
        const result = suma({ a: 5, b: -3 });
        expect(result).toBe(2);
    });

    it('should handle zero values', () => {
        expect(suma({ a: 0, b: 5 })).toBe(5);
        expect(suma({ a: 3, b: 0 })).toBe(3);
        expect(suma({ a: 0, b: 0 })).toBe(0);
    });

    it('should handle decimal numbers', () => {
        const result = suma({ a: 1.5, b: 2.5 });
        expect(result).toBe(4);
    });
});
