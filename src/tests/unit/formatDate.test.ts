import { describe, it, expect } from 'vitest';
import { formatDate } from '../../utils/formatDate';

describe('formatDate', () => {
    it('formats a Date object correctly', () => {
        const date = new Date('2020-01-30T10:00:00Z');
        expect(formatDate(date)).toBe('January 30, 2020');
    });

    it('formats a date string correctly', () => {
        const dateString = '2025-11-26T10:00:00Z';
        expect(formatDate(dateString)).toBe('November 26, 2025');
    });

    it('throws Error instance for empty input', () => {
        expect(() => formatDate('')).toThrow(Error);
    });
    
    it('throws Error instance for invalid input', () => {
        expect(() => formatDate('invalid-date')).toThrow(Error);
    });
    
    it('handles invalid date input', () => {
       expect(() => formatDate('invalid-date')).toThrowError('Invalid date provided');
   });

   it('handles empty input', () => {
       expect(() => formatDate('')).toThrowError('Invalid date provided');
   });
});