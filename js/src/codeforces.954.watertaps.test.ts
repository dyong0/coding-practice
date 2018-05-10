import * as chai from 'chai';
const { expect } = chai;

import { solveProblem } from './codeforces.954.watertaps';

describe('solveProblem', () => {
    it('returns the maximum amount of water of a certain temperature per second', () => {
        const t = 100;
        const A = [3, 10];
        const T = [50, 150];

        expect(solveProblem(t, A, T)).to.eq(6);
    });

    it('returns the maximum amount of water of a certain temperature per second', () => {
        const t = 9;
        const A = [5, 5, 30];
        const T = [6, 6, 10];

        expect(solveProblem(t, A, T)).to.eq(40);
    });

    it('returns 0 if water taps cannot produce water of the target temperature', () => {
        const t = 12;
        const A = [1, 3];
        const T = [10, 15];

        expect(solveProblem(t, A, T)).to.eq(1.666667);
    });
});