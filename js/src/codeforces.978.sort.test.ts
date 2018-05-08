import * as chai from 'chai';
const { expect } = chai;

import { solveProblem } from './codeforces.977.sort';

describe('solveProblem', () => {
    it('sorts an unordered sequence into the ordered', () => {
        const A = [4, 8, 6, 3, 12, 9];
        expect(solveProblem(A)).to.deep.eq([9, 3, 6, 12, 4, 8]);
    });
    it('sorts an unordered sequence into the ordered', () => {
        const A = [42, 28, 84, 126];
        expect(solveProblem(A)).to.deep.eq([126, 42, 84, 28]);
    });
    it('sorts an unordered sequence into the ordered', () => {
        const A = [1000000000000000000, 3000000000000000000];
        expect(solveProblem(A)).to.deep.eq([3000000000000000000, 1000000000000000000]);
    });
    it('sorts an unordered sequence into the ordered', () => {
        const A = [3, 1];
        expect(solveProblem(A)).to.deep.eq([3, 1]);
    });
    it('sorts an unordered sequence into the ordered', () => {
        const A = [1, 2];
        expect(solveProblem(A)).to.deep.eq([1, 2]);
    });
    it('sorts an unordered sequence into the ordered', () => {
        const A = [2, 1];
        expect(solveProblem(A)).to.deep.eq([1, 2]);
    });
});