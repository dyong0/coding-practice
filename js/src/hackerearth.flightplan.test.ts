import * as chai from 'chai';
const { expect } = chai;

import { solveProblem, Edge } from './hackerearth.flightplan';

describe('solveProblem', () => {
    it('returns the shortest path to the destination from the start', () => {
        const start = 3;
        const dest = 5;
        const edges:Edge[] = [
            [1, 2],
            [1, 3],
            [2, 4],
            [1, 4],
            [2, 5],
        ];

        expect(solveProblem(edges, start, dest)).to.deep.eq([1,2,5]);
    });
});