import * as chai from 'chai';
const { expect } = chai;

import { solveProblem } from './codeforces.958.encryption';

describe('solveProblem', () => {
    it('returns the maximum sum of the modulos by p of the sum of every subsequence, where the number of subsequnces is k', () => {
        const A = [3, 4, 7, 2];
        const k = 3;
        const p = 10;

        expect(solveProblem(A, k, p)).to.eq(16);
    });

    it('returns the maximum sum of the modulos by p of the sum of every subsequence, where the number of subsequnces is k', () => {
        const A = [16, 3, 24, 13, 9, 8, 7, 5, 12, 12];
        const k = 5;
        const p = 12;

        expect(solveProblem(A, k, p)).to.eq(37);
    });
});