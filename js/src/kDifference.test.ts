import * as chai from 'chai';
import { solveProblem } from './kDifference';
const { expect } = chai;


describe('solveProblem', () => {
    it('arr[] = {1, 5, 3, 4, 2}, k = 3 returns 2', () => {
        expect(solveProblem([1, 5, 3, 4, 2], 3)).eq(2);
    });

    it('arr[] = {8, 12, 16, 4, 0, 20}, k = 4 returns 5', () => {
        expect(solveProblem([8, 12, 16, 4, 0, 20], 4)).eq(5);
    });
});