import { describe, it, expect } from '@jest/globals';
import uniqueString from '../../utils/uniqueString';

describe('uniqueString', () => {
    it('should return a string of the specified length', () => {
        expect(uniqueString(5).length).toBe(10);
    });
    it('should return a different string each time', () => {
        expect(uniqueString(10)).not.toBe(uniqueString(10));
    });
});